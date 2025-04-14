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
import { firestore } from "./firebase"; // Fixed import path
  
// Obtener teléfonos basados en filtros
export const getPhones = async ({ filters, orderByField, orderDirection }) => {
  try {
    let q = collection(firestore, "cellphone"); // Ajustar a tu colección en Firebase
    let constraints = [];
    
    // Aplicar filtros si existen
    if (filters) {
      // Recorrer cada filtro y añadirlo a las restricciones
      Object.entries(filters).forEach(([field, value]) => {
        if (value) {
          constraints.push(where(field, "==", value));
        }
      });
    }
    
    // Aplicar ordenamiento si se especifica un campo
    if (orderByField) {
      constraints.push(orderBy(orderByField, orderDirection || "desc"));
    }
    
    // Crear consulta con todas las restricciones
    if (constraints.length > 0) {
      q = query(collection(firestore, "cellphone"), ...constraints);
    }
    
    // Ejecutar consulta
    const querySnapshot = await getDocs(q);
    const phones = [];
    
    querySnapshot.forEach((doc) => {
      phones.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return phones;
  } catch (error) {
    console.error("Error fetching phones:", error);
    throw error;
  }
};

  
  // Get user profile
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
  
  // Update user profile
  export const updateUserProfile = async (userId, data) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, data);
      return true;
    } catch (error) {
      throw error;
    }
  };
  
  // Update notification preferences
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
  
  // Save user search preferences
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