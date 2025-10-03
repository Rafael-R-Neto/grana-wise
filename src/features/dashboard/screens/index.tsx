import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { CategoryName, Transaction, TransactionType } from '../../../@types';
import { Icon } from '../../../shared/components/Icon';
import { CATEGORIES } from '../../../shared/constants/categories';
import { api } from '../../../shared/services/api';
import { useTheme } from '../../../shared/store/theme';

const getMonths = () => {
  const months: Date[] = [];
  const today = new Date();
  today.setDate(1);

  for (let i = 12; i >= 0; i--) {
    months.push(new Date(today.getFullYear(), today.getMonth() - i, 1))
  }

  return months;
}
const MonthNavigator: React.FC<{ selectedMonth: Date, onSelectMonth: (date: Date) => void }> = ({ selectedMonth, onSelectMonth }) => {
  const { colors } = useTheme();
  const months = useMemo(() => getMonths(), []);
  return (
    <View style={styles.monthNavContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthNavScroll}>
        {months.map((month, index) => {
          const isSelected = month.getFullYear() === selectedMonth.getFullYear() && month.getMonth() === selectedMonth.getMonth();

          return (
            <TouchableOpacity key={index} onPress={() => onSelectMonth(month)} style={styles.monthButton}>
              <Text style={[
                styles.monthText,
                { color: isSelected ? colors.primary : colors.textSecondary },
                isSelected && { fontWeight: 'bold' }
              ]}>
                {month.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
};

const CategoryFilter: React.FC<{ selectedCategory: CategoryName | 'all'; onSelectCategory: (category: CategoryName | 'all') => void; }> = ({ selectedCategory, onSelectCategory }) => {
  const { colors } = useTheme();

  const filterCategories = useMemo(() => {
    const all: { id: 'all', name: string, icon: React.FC<any>; color: string } = {
      id: 'all',
      name: 'Todos',
      icon: (props) => <Icon name='grid' {...props} />,
      color: colors.primary
    }

    const otherCategories = Object.entries(CATEGORIES).map(([id, cat]) => ({ id: id as CategoryName, ...cat }));
    return [all, ...otherCategories];
  }, [colors.primary]);

  return (
    <View style={styles.categoryFilterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryFilterScroll}>
        {filterCategories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity key={cat.id} style={styles.categoryFilterButton} onPress={() => onSelectCategory(cat.id)}>
              <View style={[styles.categoryFilterIcon, isSelected ? { borderWidth: 4, borderColor: colors.teal, backgroundColor: cat.color } : { backgroundColor: cat.color }]}>
                <Text style={[
                  styles.categoryFilterText,
                  { color: isSelected ? colors.white : colors.text },
                  isSelected && { fontWeight: '900' }
                ]}>
                  {cat.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const BalanceChart: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const { colors } = useTheme();

  const { income, expenses } = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (t.type === TransactionType.INCOME) acc.income += t.amount;
      else acc.expenses += t.amount;
      return acc;
    }, { income: 0, expenses: 0 });
  }, [transactions]);

  const balance = income - expenses;
  const expensePercentage = income > 0 ? (expenses / income) * 100 : (expenses > 0 ? 100 : 0);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * expensePercentage) / 100;

  return (
    <View style={[styles.chartContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.chartSvgContainer}>
        <Svg width="192" height="192" viewBox="0 0 192 192">
          <G rotation="-90" origin="96, 96">
            <Circle cx="96" cy="96" r={radius} stroke={colors.text} strokeWidth="20" fill="transparent" />
            <Circle
              cx="96" cy="96" r={radius}
              stroke={colors.primaryBrand} strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </G>
        </Svg>
        <View style={styles.chartTextContainer}>
          <Text style={[styles.chartLabel, { color: colors.textSecondary }]}>Balanço</Text>
          <Text style={[styles.chartBalance, { color: colors.text }]}>
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
      </View>
      <View style={styles.chartInfoContainer}>
        <Text style={[styles.chartInfoText, { color: colors.textSecondary }]}>
          Você já gastou <Text style={{ fontWeight: '600', color: colors.primary }}>{Math.round(expensePercentage)}%</Text> das suas receitas
        </Text>
      </View>
      <View style={styles.incomeExpenseContainer}>
        <View>
          <Text style={{ color: colors.textSecondary }}>Receitas</Text>
          <Text style={[styles.moneyText, { color: colors.success }]}>{income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: colors.textSecondary }}>Despesas</Text>
          <Text style={[styles.moneyText, { color: colors.error }]}>{expenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        </View>
      </View>
    </View>
  );
};

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { colors } = useTheme();
  const category = CATEGORIES[transaction.category];
  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? colors.success : colors.error;
  const sign = isIncome ? '+' : '-';

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.itemIconContainer, { backgroundColor: category?.color }]}>
        <Icon name={category?.name} width={24} height={24} stroke={colors.white} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={[styles.itemDescription, { color: colors.text }]}>{transaction.description}</Text>
        <Text style={[styles.itemCategory, { color: colors.textSecondary }]}>{category?.name}</Text>
      </View>
      <View style={styles.itemAmountContainer}>
        <Text style={[styles.itemAmount, { color: amountColor }]}>{sign}{transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        <Text style={[styles.itemDate, { color: colors.textSecondary }]}>{new Date(transaction.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Text>
      </View>
    </View>
  );
};

const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date);
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'all'>('all')
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const data = await api.getTransactions();
      setTransactions(data);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <MonthNavigator selectedMonth={selectedMonth} onSelectMonth={setSelectedMonth} />
      <BalanceChart transactions={transactions} />
      <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <View style={styles.recentTransactionsContainer}>
        <Text style={[styles.recentTransactionsTitle, { color: colors.text }]}>Transações Recentes</Text>
        <View>
          {transactions.slice(0, 5).map(tx => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  chartContainer: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartSvgContainer: {
    position: 'relative',
    width: 192,
    height: 192,
  },
  chartTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLabel: {
    fontSize: 14,
  },
  chartBalance: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartInfoContainer: {
    marginTop: 16,
  },
  chartInfoText: {
    fontSize: 14,
  },
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '100%',
  },
  moneyText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: {
    marginLeft: 16,
    flex: 1,
  },
  itemDescription: {
    fontWeight: '600',
  },
  itemCategory: {
    fontSize: 14,
  },
  itemAmountContainer: {
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 14,
  },
  recentTransactionsContainer: {
    marginTop: 24,
  },
  recentTransactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  monthNavContainer: {
    paddingVertical: 10
  },
  monthNavScroll: {
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  monthButton: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  monthText: {
    fontSize: 18
  },
  categoryFilterContainer: {
    marginTop: 24,
    marginBottom: 8
  },
  categoryFilterScroll: {
    paddingHorizontal: 4,
    alignItems: 'flex-start'
  },
  categoryFilterButton: {
    alignItems: 'center',
    width: 80,
    paddingHorizontal: 4
  },
  categoryFilterIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  categoryFilterText: {
    fontSize: 14,
    textAlign: 'center'
  }
});

export default Dashboard;
