import { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addItem } from '../firebase/firebaseHelpers';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<null | string>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !location || !image) {
      Alert.alert('Please fill all fields and select an image.');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      await addItem({ name, location }, blob);
      Alert.alert('Item added successfully!');
      setName('');
      setLocation('');
      setImage(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding item');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. AirPods" />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g. Top Drawer" />

      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title={uploading ? "Uploading..." : "Add Item"} onPress={handleSubmit} disabled={uploading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  label: { fontSize: 16, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginTop: 5 },
  image: { width: '100%', height: 200, marginTop: 10, borderRadius: 8 }
});
