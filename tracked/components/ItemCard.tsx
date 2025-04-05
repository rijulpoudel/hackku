import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  item: {
    id: string;
    name: string;
    location: string;
    imageUrl: string;
    favorite: boolean;
  };
  onFavoriteToggle: (id: string, newValue: boolean) => void;
};

export default function ItemCard({ item, onFavoriteToggle }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.location}</Text>
      <TouchableOpacity onPress={() => onFavoriteToggle(item.id, !item.favorite)}>
        <Text style={{ fontSize: 24 }}>{item.favorite ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});
