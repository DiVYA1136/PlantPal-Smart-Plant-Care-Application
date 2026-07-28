import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  db,
  doc,
  getDoc,
  setDoc
} from '../firebase/config';
import { MOCK_USER } from '../services/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(MOCK_USER);
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          setIsDemoMode(false);
          // Fetch user profile extra details from Firestore if present
          try {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const data = userSnap.data();
              setCurrentUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || data.name || 'Plant Enthusiast',
                photoURL: user.photoURL || data.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                role: data.role || 'user',
                emailVerified: user.emailVerified
              });
            } else {
              setCurrentUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'Plant Enthusiast',
                photoURL: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                role: 'user',
                emailVerified: user.emailVerified
              });
            }
          } catch (e) {
            console.warn('Firestore user fetch failed, using Auth user object:', e);
            setCurrentUser(user);
          }
        } else {
          // If not authenticated via Firebase, default to Demo User for immediate portfolio presentation
          setCurrentUser(MOCK_USER);
          setIsDemoMode(true);
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (e) {
      console.warn('Firebase auth initialization fallback to demo mode:', e);
      setCurrentUser(MOCK_USER);
      setIsDemoMode(true);
      setLoading(false);
    }
  }, []);

  const loginWithEmail = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      // Demo mode fallback handling
      if (email === MOCK_USER.email) {
        setCurrentUser(MOCK_USER);
        setIsDemoMode(true);
        return { user: MOCK_USER };
      }
      throw err;
    }
  };

  const registerWithEmail = async (email, password, name) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      await sendEmailVerification(res.user);
      
      // Save doc in Firestore
      await setDoc(doc(db, 'users', res.user.uid), {
        name,
        email,
        photo: '',
        role: 'user',
        createdAt: new Date().toISOString()
      });
      return res;
    } catch (err) {
      console.warn('Register fallback to local state:', err);
      const newMockUser = {
        uid: 'user-' + Date.now(),
        email,
        displayName: name || 'Garden Lover',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'user',
        emailVerified: true
      };
      setCurrentUser(newMockUser);
      setIsDemoMode(true);
      return { user: newMockUser };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, 'users', res.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
          role: 'user',
          createdAt: new Date().toISOString()
        });
      }
      return res;
    } catch (err) {
      console.warn('Google login fallback:', err);
      setCurrentUser(MOCK_USER);
      setIsDemoMode(true);
      return { user: MOCK_USER };
    }
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Signout error:', err);
    }
    setCurrentUser(null);
  };

  const updateUserProfileData = async (fields) => {
    if (auth.currentUser) {
      if (fields.displayName || fields.photoURL) {
        await updateProfile(auth.currentUser, {
          displayName: fields.displayName || auth.currentUser.displayName,
          photoURL: fields.photoURL || auth.currentUser.photoURL
        });
      }
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, fields, { merge: true });
    }
    setCurrentUser(prev => ({ ...prev, ...fields }));
  };

  const value = {
    currentUser,
    isDemoMode,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    resetPassword,
    logout,
    updateUserProfileData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
