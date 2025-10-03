import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { CategoryName, Transaction } from '../../../@types';
import { TransactionType } from '../../../@types';
import { Icon } from '../../../shared/components/Icon';
import { CATEGORIES } from '../../../shared/constants/categories';
import { api } from '../../../shared/services/api';
import { useTheme } from '../../../shared/store/theme';
import { styles } from './styles';

const CategorySelector: React.FC<{
  selectedValue: CategoryName;
  onValueChange: (value: CategoryName) => void;
  transactionType: TransactionType;
}> = ({ selectedValue, onValueChange, transactionType }) => {
  const { colors } = useTheme();
  const s = styles(colors);
  const applicableCategories =
    transactionType === TransactionType.INCOME
      ? Object.entries(CATEGORIES).filter(([id]) => ['salary', 'other'].includes(id))
      : Object.entries(CATEGORIES).filter(([id]) => id !== 'salary');

  return (
    <View>
      <Text style={s.formLabel}>Categoria</Text>
      <View style={s.categoryContainer}>
        {applicableCategories.map(([id, category]) => {
          const isSelected = selectedValue === id;
          const selectedBg = `${colors.primary}33`; // ~20% opacity
          return (
            <TouchableOpacity
              key={id}
              onPress={() => onValueChange(id as CategoryName)}
              style={[
                s.categoryButton,
                { borderColor: isSelected ? colors.primary : colors.border },
                isSelected && { backgroundColor: selectedBg }
              ]}
            >
              <View style={[s.categoryColorDot, { backgroundColor: category.color }]} />
              <Text style={[
                s.categoryText,
                { color: isSelected ? colors.primary : colors.textSecondary }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};


const TransactionForm: React.FC<{ visible: boolean; onSave: () => void; onCancel: () => void; transaction?: Transaction | null }> = ({ visible, onSave, onCancel, transaction }) => {
  const { colors } = useTheme();
  const s = styles(colors);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryName>('food');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);

  useEffect(() => {
    if (visible) {
      if (transaction) {
        setAmount(transaction.amount.toString());
        setDescription(transaction.description);
        setCategory(transaction.category);
        setType(transaction.type);
      } else {
        setAmount('');
        setDescription('');
        setType(TransactionType.EXPENSE);
        setCategory('food');
      }
    }
  }, [transaction, visible]);

  useEffect(() => {
    if (type === TransactionType.INCOME && !['salary', 'other'].includes(category)) {
      setCategory('salary');
    } else if (type === TransactionType.EXPENSE && category === 'salary') {
      setCategory('food');
    }
  }, [type, category]);

  const handleSubmit = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0 || !description.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid amount and description.');
      return;
    }

    const newTransaction = {
      amount: numericAmount, description, category, type,
      date: new Date().toISOString(),
    };

    if (transaction) {
      await api.updateTransaction({ ...newTransaction, id: transaction.id });
    } else {
      await api.addTransaction(newTransaction);
    }
    onSave();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onCancel}>
      <View style={s.modalBackdrop}>
        <View style={s.modalContent}>
          <Text style={s.modalTitle}>{transaction ? 'Editar' : 'Adicionar'} Transação</Text>

          <View style={s.typeSelectorContainer}>
            <TouchableOpacity onPress={() => setType(TransactionType.EXPENSE)} style={[s.typeButton, { borderColor: type === TransactionType.EXPENSE ? colors.primary : colors.border, backgroundColor: type === TransactionType.EXPENSE ? colors.primary : 'transparent' }]}><Text style={{ color: type === TransactionType.EXPENSE ? colors.white : colors.textSecondary }}>Despesa</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setType(TransactionType.INCOME)} style={[s.typeButton, { borderColor: type === TransactionType.INCOME ? colors.success : colors.border, backgroundColor: type === TransactionType.INCOME ? colors.success : 'transparent' }]}><Text style={{ color: type === TransactionType.INCOME ? colors.white : colors.textSecondary }}>Receita</Text></TouchableOpacity>
          </View>

          <View>
            <Text style={s.formLabel}>Valor</Text>
            <TextInput keyboardType="numeric" value={amount} onChangeText={setAmount} placeholder="0,00" placeholderTextColor={colors.textSecondary} style={s.textInput} />
          </View>

          <View>
            <Text style={s.formLabel}>Descrição</Text>
            <TextInput value={description} onChangeText={setDescription} placeholder="ex: Café com amigos" placeholderTextColor={colors.textSecondary} style={s.textInput} />
          </View>

          <CategorySelector selectedValue={category} onValueChange={setCategory} transactionType={type} />

          <View style={s.formActions}>
            <TouchableOpacity onPress={onCancel} style={[s.button, s.cancelButton]}><Text style={{ color: colors.text }}>Cancelar</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[s.button, s.saveButton]}><Text style={{ color: colors.white }}>Salvar</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const FullTransactionItem: React.FC<{ transaction: Transaction; onEdit: (t: Transaction) => void; onDelete: (id: string) => void; }> = ({ transaction, onEdit, onDelete }) => {
  const { colors } = useTheme();
  const s = styles(colors);
  const category = CATEGORIES[transaction.category];
  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? colors.success : colors.error;
  const sign = isIncome ? '+' : '-';

  return (
    <View style={s.fullItemContainer}>
      <View style={[s.itemIconContainer, { backgroundColor: category.color }]}>
        <category.icon width={24} height={24} stroke={colors.white} />
      </View>
      <View style={s.itemDetails}>
        <Text style={s.itemDescription}>{transaction.description}</Text>
        <Text style={s.itemCategory}>{new Date(transaction.date).toLocaleDateString()}</Text>
      </View>
      <View style={s.itemAmountContainer}>
        <Text style={[s.itemAmount, { color: amountColor }]}>{sign}{transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
      </View>
      <View style={s.itemActions}>
        <TouchableOpacity onPress={() => onEdit(transaction)} style={s.actionButton}><Text style={[s.actionText, { color: colors.blue }]}>Editar</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(transaction.id)} style={s.actionButton}><Text style={[s.actionText, { color: colors.error }]}>Deletar</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const TransactionsPage: React.FC = () => {
  const { colors } = useTheme();
  const s = styles(colors);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    const data = await api.getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          await api.deleteTransaction(id);
          fetchTransactions();
        }
      },
    ]);
  };

  return (
    <View style={s.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FullTransactionItem transaction={item} onEdit={handleEdit} onDelete={handleDelete} />}
        contentContainerStyle={s.listContentContainer}
        ListEmptyComponent={<View style={s.emptyComponent}><Text style={{ color: colors.textSecondary }}>Sem transações.</Text></View>}
      />
      <TouchableOpacity
        onPress={() => { setEditingTransaction(null); setShowForm(true); }}
        style={s.fab}
      >
        <Icon name="plus" width={32} height={32} stroke={colors.white} />
      </TouchableOpacity>

      <TransactionForm visible={showForm} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingTransaction(null); }} transaction={editingTransaction} />
    </View>
  );
};

export default TransactionsPage;
