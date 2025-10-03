import { SvgProps } from 'react-native-svg';
import { Category } from '../../@types';
import { Icon } from '../components/Icon';
import { palette } from '../theme';

export const CATEGORIES: Record<string, Omit<Category, 'id'>> = {
  food: {
    name: 'Alimentação',
    icon: (props: SvgProps) => <Icon name="alimentacao" {...props} />,
    color: palette.red,
  },
  shopping: {
    name: 'Shopping',
    icon: (props: SvgProps) => <Icon name="shopping" {...props} />,
    color: palette.pink,
  },
  transport: {
    name: 'Transport',
    icon: (props) => <Icon name="transport" {...props} />,
    color: palette.purple,
  },
  home: {
    name: 'Home & Services',
    icon: (props) => <Icon name="home" {...props} />,
    color: palette.blue,
  },
  health: {
    name: 'Health',
    icon: (props) => <Icon name="health" {...props} />,
    color: palette.teal,
  },
  entertainment: {
    name: 'Entertainment',
    icon: (props) => <Icon name="entertainment" {...props} />,
    color: palette.yellow,
  },
  salary: {
    name: 'Salary',
    icon: (props) => <Icon name="income" {...props} />,
    color: palette.green,
  },
  other: {
    name: 'Other',
    icon: (props) => <Icon name="other" {...props} />,
    color: palette.gray500,
  }
};
