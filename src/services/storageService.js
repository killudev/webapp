
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadProfileImage = async (file, userId) => {
  try {
    const storageRef = ref(storage, `profileImages/${userId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};
