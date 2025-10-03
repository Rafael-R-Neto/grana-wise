import React, { JSX } from 'react';
import Svg, { SvgProps } from 'react-native-svg';

export const Icon: React.FC<SvgProps & { name: string }> = ({ name, ...props }) => {
  const iconContent = ICONS[name];
  if (!iconContent) return null;

  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {iconContent}
    </Svg>
  );
};

import { ICONS } from '../../constants/icons';
import * as S from "./styles";
import { IconBoxFamily, IconComponentMap } from "./types";

export type IconBoxProps = {
  icon: IconBoxFamily;
  size?: S.SizeProps;
  color: any
};

const IconBox = ({ icon, color, size = "normal" }: IconBoxProps) => {
  const IconComponent: JSX.ElementType = IconComponentMap[icon.iconName];

  const iconSize = size === "normal" ? 24 : 16;

  return (
    <S.Container size={size}>
      <IconComponent name={icon.name} size={iconSize} color={color} />
    </S.Container>
  );
};

export default IconBox;