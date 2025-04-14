// src/services/firestoreService.js
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  orderBy,
  limit
} from "firebase/firestore";
import { firestore } from "./firebase";

// Obtener teléfonos con filtros
export const getPhones = async ({ filters, orderByField, orderDirection }) => {
  try {
    let q = collection(firestore, "cellphone");
    let constraints = [];

    if (filters) {
      Object.entries(filters).forEach(([field, value]) => {
        if (value) {
          constraints.push(where(field, "==", value));
        }
      });
    }

    if (orderByField) {
      constraints.push(orderBy(orderByField, orderDirection || "desc"));
    }

    if (constraints.length > 0) {
      q = query(collection(firestore, "cellphone"), ...constraints);
    }

    const querySnapshot = await getDocs(q);
    const phones = [];

    querySnapshot.forEach((doc) => {
      phones.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return phones;
  } catch (error) {
    console.error("Error fetching phones:", error);
    throw error;
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (userId) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

// Actualizar perfil de usuario
export const updateUserProfile = async (userId, data) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, data);
    return true;
  } catch (error) {
    throw error;
  }
};

// Guardar preferencias de notificación
export const updateNotificationPreferences = async (userId, notificationSettings) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      notificationSettings
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Guardar preferencias de búsqueda
export const saveUserPreferences = async (userId, preferences) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      preferences
    });
    return true;
  } catch (error) {
    console.error("Error saving preferences:", error);
    throw error;
  }
};

// ✅ NUEVO: Guardar perfil extendido
export const saveExtendedUserProfile = async (userId, profileData) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      ...profileData,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
