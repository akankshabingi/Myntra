import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

// Define types
type ClothingRecommendation = {
  items: string[];
  images: string[];
};

type Recommendations = {
  [key: string]: ClothingRecommendation;
  // @ts-ignore
  Image?: string; // Optional Image field
};

// Function to determine body shape
const determineBodyShape = (
  waist: number,
  hips: number,
  bust: number,
): string => {
  if (waist > hips && bust > hips) {
    return 'Apple Shape';
  }
  if (hips > waist && bust < hips) {
    return 'Pear Shape';
  }
  if (waist === hips && hips === bust) {
    return 'Rectangle Shape';
  }
  if (waist < hips && bust > hips) {
    return 'Inverted Triangle Shape';
  }
  if (waist < hips && bust === hips) {
    return 'Hourglass Shape';
  }
  return 'Undefined Shape';
};

// Clothing recommendations with images
const clothingRecommendations = (shape: string): Recommendations => {
  const recommendations = {
    'Apple Shape': {
      Tops: {
        items: ['V-necks', 'Empire waist tops', 'Structured blazers'],
        images: [
          'https://i.pinimg.com/736x/25/a4/51/25a451812a97a289b6722ef0e03445c6.jpg',
          'https://i.pinimg.com/originals/11/55/b3/1155b392836abde6c166c687bcdebc78.jpg',
          'https://i.pinimg.com/736x/ef/8f/6d/ef8f6d6d7d9b960c2e6e77f69fde0a68.jpg',
        ],
      },
      Bottoms: {
        items: ['High-waisted trousers', 'Bootcut jeans', 'A-line skirts'],
        images: [
          'https://i.pinimg.com/originals/6b/dc/3c/6bdc3c4684bcef7c89a5bdc241d4fe8c.jpg',
          'https://cdn.shopify.com/s/files/1/0302/1304/6410/products/0715202338_1200x1200.jpg?v=1597809367',
          'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/14798938/2021/8/17/95664c4f-d8c0-4758-adef-0fd227e922721629191386488TshirtsTRENDYOLCOLLECTIONWomenTopsTRENDYOLCOLLECTIONWomenDre1.jpg',
        ],
      },
      Dresses: {
        items: ['Wrap dresses', 'Fit-and-flare styles'],
        images: [
          'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/23127374/2023/5/12/e550b00a-80db-4490-bf74-f77314602a381683853732120Satinwrapdress1.jpg',
          'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/productimage/2020/6/17/b688f0e8-21d7-4712-b811-a741b3ec7dbf1592343335148-1.jpg',
        ],
      },
      Accessories: {
        items: ['Statement necklaces'],
        images: [
          'https://tse2.mm.bing.net/th?id=OIP.YEy7SSvpcCFlom3VEGbMngAAAA&pid=Api&P=0&h=180',
        ],
      },
      Image:
        'https://i.pinimg.com/736x/ed/0c/40/ed0c4014cd08cfa2b9368c0802da81b6.jpg',
    },
    'Pear Shape': {
      Tops: {
        items: ['Off-the-shoulder', 'Boat necks', 'Embellished tops'],
        images: [
          'https://i.pinimg.com/originals/e4/f0/8b/e4f08b618f879efe728c223bb815c52f.jpg',
          'https://tse3.mm.bing.net/th?id=OIP.hFzu303rTX9jQ2ItnBq3uwHaLW&pid=Api&P=0&h=180',
        ],
      },
      Bottoms: {
        items: ['A-line skirts', 'Wide-leg trousers'],
        images: [
          'https://i.pinimg.com/736x/7b/67/4a/7b674a79e0cba958521aa5be997ca9f5.jpg',
          'https://i.pinimg.com/originals/25/f0/ff/25f0ff52bed8d47784d58ce45b240cd9.jpg',
        ],
      },
      Dresses: {
        items: ['A-line', 'Fit-and-flare'],
        images: [
          'https://tse1.mm.bing.net/th?id=OIP.N7_rp2JZ_BOSK9ykQjnrSQAAAA&pid=Api&P=0&h=180',
          'https://tse3.mm.bing.net/th?id=OIP.CHxLnB8F4xwXQXxesWTKSgHaI7&pid=Api&P=0&h=180',
        ],
      },
      Accessories: {
        items: ['Belts'],
        images: [
          'https://tse4.mm.bing.net/th?id=OIP.lCiXq-s61Hz-JvkZS-pHJAHaIb&pid=Api&P=0&h=180',
        ],
      },
      Image:
        'https://i.pinimg.com/736x/a4/94/c6/a494c6e92128f71496eeffb829e12cf1.jpg',
    },
    // Add more shapes as needed...
  };

  // @ts-ignore
  return recommendations[shape] || {};
};

const BodyShapeCalculator: React.FC = () => {
  const [waist, setWaist] = useState<string>('');
  const [hips, setHips] = useState<string>('');
  const [bust, setBust] = useState<string>('');
  const [shape, setShape] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Recommendations>({});

  const handleCalculate = () => {
    const calculatedShape = determineBodyShape(
      Number(waist),
      Number(hips),
      Number(bust),
    );
    setShape(calculatedShape);
    setRecommendations(clothingRecommendations(calculatedShape));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Body Shape Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Waist (cm)"
        value={waist}
        onChangeText={setWaist}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Hips (cm)"
        value={hips}
        onChangeText={setHips}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Bust (cm)"
        value={bust}
        onChangeText={setBust}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={handleCalculate} />
      {shape ? (
        <ScrollView style={styles.result}>
          <Text style={styles.resultTitle}>Your Body Shape: {shape}</Text>
          {recommendations.Image && (
            <Image
              source={{uri: recommendations.Image}}
              style={styles.shapeImage}
            />
          )}
          {Object.entries(recommendations).map(([category, recommendation]) => {
            if (typeof recommendation === 'object') {
              const {items, images} = recommendation;
              return (
                <View key={category}>
                  <View style={styles.categoryContainer}>
                    {images && images.length > 0 ? (
                      <Image
                        source={{uri: images[0]}}
                        style={styles.categoryImage}
                      />
                    ) : null}
                    <Text style={styles.category}>{category}:</Text>
                  </View>
                  {items && items.length > 0 ? (
                    <Text>{items.join(', ')}</Text>
                  ) : (
                    <Text>No items available</Text>
                  )}
                </View>
              );
            }
            return null;
          })}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shapeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  category: {
    fontWeight: 'bold',
  },
});

export default BodyShapeCalculator;
