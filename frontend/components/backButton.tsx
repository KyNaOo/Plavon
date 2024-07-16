import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface BackButtonProps {
  href: string;
  color?: string;
  size?: number;
  iconName?: keyof typeof AntDesign.glyphMap;
  style?: ViewStyle;
}

const BackButton: React.FC<BackButtonProps> = ({
  href,
  color = Colors.light.itemBackground,
  size = 30,
  iconName = 'arrowleft',
  style,
}) => {
  return (
    <Link href={href} asChild style={[styles.backButton, style]}>
      <AntDesign name={iconName} size={size} color={color} />
    </Link>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 1,
  },
});

export default BackButton;