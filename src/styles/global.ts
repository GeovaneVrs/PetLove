import { StyleSheet } from 'react-native';
import { spacing } from '../theme/tokens';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenPadding: {
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
