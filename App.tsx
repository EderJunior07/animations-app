import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('screen');

const data = [
  'https://brasilnft.art.br/pytsycky/2021/10/Bored-Ape-8817-PNG.png',
  'https://preview.redd.it/xtlsmae844681.jpg?width=1920&format=pjpg&auto=webp&s=3dec10d1eaf0a5308c4388513ca483d055a39f05',
  'https://einvestidor.estadao.com.br/wp-content/uploads/sites/715/2021/09/boredape_150920212720.jpg',
  'https://techdoxx.com/wp-content/uploads/2021/12/9908fc00-5398-11ec-b7bf-8dded52a981b.jpeg',
  'https://i0.wp.com/www.technollama.co.uk/wp-content/uploads/2021/11/ape.jpg?ssl=1',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: image }}
              style={[StyleSheet.absoluteFillObject, {opacity: opacity}]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        horizontal
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{ width, justifyContent: 'center', alignItems: 'center' }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
