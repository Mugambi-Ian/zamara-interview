/* eslint-disable react/no-array-index-key */
import { styled } from 'nativewind';
import React, { FC } from 'react';
import {
  View as _View,
  Text as _Text,
  TextInput as _TextInput,
  Image as _Image,
  Pressable as _Pressable,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import useAppTheme from '../hooks/useTheme';

export const View = styled(_View);
export const Text = styled(_Text);
export const Image = styled(_Image);
export const TextInput = styled(_TextInput);
export const Pressable = styled(_Pressable);

export const VectorIcon: FC<{
  darkModeColor: string;
  lightModeColor: string;
  icon: (f: string) => string;
}> = props => {
  const { icon, darkModeColor, lightModeColor } = props;
  const { isDark } = useAppTheme();
  if (isDark)
    return <SvgXml xml={icon(darkModeColor)} height="100%" width="100%" />;
  return <SvgXml xml={icon(lightModeColor)} height="100%" width="100%" />;
};

export const printSpace = (len: number) => {
  const x = new Array(len).fill(1);
  return x.map((_, i) => <View className="flex-1" key={`view${i}`} />);
};
