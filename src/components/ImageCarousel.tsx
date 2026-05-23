import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { getPetImageSource } from '../constants/images';

const { width } = Dimensions.get('window');

type Props = {
  images: string[];
  petId: string;
  height?: number;
};

export function ImageCarousel({ images, petId, height = 320 }: Props) {
  const { colors, radius } = useTheme();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<string>>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(i);
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <Image
            source={getPetImageSource(petId, item)}
            style={{ width, height, borderRadius: radius.lg }}
          />
        )}
      />
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === index ? colors.primary : colors.border,
                width: i === index ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: { height: 8, borderRadius: 4 },
});
