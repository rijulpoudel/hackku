import { db, storage } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

export const addItem = async (
  itemData: { name: string; location: string },
  imageBlob: Blob
) => {
  const fileName = `image_${Date.now()}.jpg`;
  const imageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(imageRef, imageBlob);
  const imageUrl = await getDownloadURL(imageRef);

  await addDoc(collection(db, 'items'), {
    ...itemData,
    imageUrl,
    favorite: false,
    createdAt: new Date()
  });
};

// ✅ ADD THESE BELOW

export const getItems = async () => {
  const snapshot = await getDocs(collection(db, 'items'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const toggleFavorite = async (id: string, value: boolean) => {
  const itemRef = doc(db, 'items', id);
  await updateDoc(itemRef, { favorite: value });
};
