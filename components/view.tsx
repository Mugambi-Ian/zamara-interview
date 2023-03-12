import { styled, useColorScheme } from 'nativewind';
import React, { FC } from 'react';
import {
  View as _View,
  Text as _Text,
  Image as _Image,
  Pressable as _Pressable,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

export const View = styled(_View);
export const Text = styled(_Text);
export const Image = styled(_Image);
export const Pressable = styled(_Pressable);

export const VectorIcon: FC<{
  darkModeColor: string;
  lightModeColor: string;
  icon: (f: string) => string;
}> = props => {
  const { icon, darkModeColor, lightModeColor } = props;
  const colorScheme = useColorScheme();
  if (colorScheme.colorScheme === 'dark')
    return <SvgXml xml={icon(darkModeColor)} height="100%" width="100%" />;
  return <SvgXml xml={icon(lightModeColor)} height="100%" width="100%" />;
};
