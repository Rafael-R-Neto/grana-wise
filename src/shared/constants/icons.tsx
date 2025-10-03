import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export const ICONS: Record<string, typeof FontAwesome5 | typeof MaterialIcons> = {
  alimentacao: <MaterialIcons name='shopping-cart' color={'white'} size={20} />,
  shopping: <FontAwesome5 name="" />,
  transport: <FontAwesome5 name="" />,
  home: <FontAwesome5 name="" />,
  health: <FontAwesome5 name="health" />,
  entertainment: <FontAwesome5 name="" />,
  income: <FontAwesome5 name="money-bill-wave" />,
  other: <FontAwesome5 name="" />,
  plus: <FontAwesome5 name="plus" />,
  grid: <FontAwesome5 name="" />,
};
