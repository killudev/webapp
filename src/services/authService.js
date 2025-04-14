// src/services/authService.js
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail
  } from "firebase/auth";
  import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
  import { auth, firestore } from "./firebase";
  
  // Provider for Google authentication
  const googleProvider = new GoogleAuthProvider();
  
  // Register with email and password
  export const registerWithEmail = async (email, password, displayName) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, { displayName });
      
      // Create user document in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email,
        displayName,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        preferences: {
          priceRange: null,
          os: null,
          features: []
        }
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Login with email and password
  export const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login timestamp
      const userDocRef = doc(firestore, "users", userCredential.user.uid);
      await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
      
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Login with Google
  export const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists, if not create it
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          preferences: {
            priceRange: null,
            os: null,
            features: []
          }
        });
      } else {
        // Update last login timestamp
        await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Logout
  export const logout = () => {
    return signOut(auth);
  };
  
  // Reset password
  export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  
  // Get current user
  export const getCurrentUser = () => {
    return auth.currentUser;
  };