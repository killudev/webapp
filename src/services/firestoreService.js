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
  
  // Get phones based on filters
  export const getPhones = async (filters) => {
    try {
      const { priceRange, os, features } = filters;
      
      let q = collection(firestore, "phones");
      let constraints = [];
      
      // Apply price range filter
      if (priceRange) {
        let [min, max] = [0, 0];
        
        switch(priceRange) {
          case "0-$200":
            [min, max] = [0, 200];
            break;
          case "$200-$400":
            [min, max] = [200, 400];
            break;
          case "$400-$600":
            [min, max] = [400, 600];
            break;
          case "$600-$800":
            [min, max] = [600, 800];
            break;
          case "$800+":
            [min, max] = [800, 100000]; // Using a very high number for no upper bound
            break;
          default:
            break;
        }
        
        constraints.push(where("price", ">=", min));
        if (max !== 100000) {
          constraints.push(where("price", "<=", max));
        }
      }
      
      // Apply OS filter
      if (os && os !== "Da igual") {
        constraints.push(where("os", "==", os));
      }
      
      // Apply features filter
      if (features && features.length > 0) {
        // We need to handle this differently based on your data structure
        // For example, if you have a highlightedFeature field:
        features.forEach(feature => {
          constraints.push(where("highlightedFeatures", "array-contains", feature));
        });
      }
      
      // Apply sorting
      constraints.push(orderBy("price", "asc"));
      
      // Create query with all constraints
      q = query(collection(firestore, "phones"), ...constraints);
      
      // Execute query
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
      throw error;
    }
  };