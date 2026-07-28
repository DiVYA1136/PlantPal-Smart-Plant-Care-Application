import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { MOCK_PLANTS, MOCK_JOURNAL } from '../services/mockData';
import { db, collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from '../firebase/config';

const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [plants, setPlants] = useState(MOCK_PLANTS);
  const [journals, setJournals] = useState(MOCK_JOURNAL);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(false);

  // Firestore sync when real user authenticated
  useEffect(() => {
    if (!currentUser || currentUser.uid === 'demo-user-123') {
      setPlants(MOCK_PLANTS);
      setJournals(MOCK_JOURNAL);
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, 'plants'), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list.length > 0) {
          setPlants(list);
        }
        setLoading(false);
      }, (error) => {
        console.warn('Firestore snapshot error, falling back to cached state:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore query error:', err);
      setLoading(false);
    }
  }, [currentUser]);

  // Add Plant
  const addPlant = async (plantData) => {
    const nextWaterDate = new Date(Date.now() + (plantData.waterFrequency || 7) * 86400000).toISOString();
    const newPlant = {
      ...plantData,
      userId: currentUser ? currentUser.uid : 'demo-user-123',
      lastWatered: new Date().toISOString(),
      nextWaterDate,
      favorite: false,
      createdAt: new Date().toISOString(),
      growthHistory: plantData.growthHistory || [
        { id: 'g-' + Date.now(), date: new Date().toISOString().split('T')[0], height: plantData.height || 15, health: 'Excellent', notes: 'Initial plant record created.' }
      ]
    };

    if (currentUser && currentUser.uid !== 'demo-user-123') {
      try {
        const docRef = await addDoc(collection(db, 'plants'), newPlant);
        newPlant.id = docRef.id;
      } catch (err) {
        console.warn('Firestore add plant failed, adding to local state:', err);
        newPlant.id = 'plant-' + Date.now();
      }
    } else {
      newPlant.id = 'plant-' + Date.now();
    }

    setPlants(prev => [newPlant, ...prev]);
    return newPlant;
  };

  // Update Plant
  const updatePlant = async (id, updatedFields) => {
    setPlants(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    if (currentUser && currentUser.uid !== 'demo-user-123') {
      try {
        const refDoc = doc(db, 'plants', id);
        await updateDoc(refDoc, updatedFields);
      } catch (err) {
        console.warn('Firestore update plant error:', err);
      }
    }
  };

  // Delete Plant
  const deletePlant = async (id) => {
    setPlants(prev => prev.filter(p => p.id !== id));
    if (currentUser && currentUser.uid !== 'demo-user-123') {
      try {
        await deleteDoc(doc(db, 'plants', id));
      } catch (err) {
        console.warn('Firestore delete plant error:', err);
      }
    }
  };

  // Toggle Favorite
  const toggleFavorite = (id) => {
    const target = plants.find(p => p.id === id);
    if (target) {
      updatePlant(id, { favorite: !target.favorite });
    }
  };

  // Water Plant Action
  const waterPlant = (id) => {
    const target = plants.find(p => p.id === id);
    if (target) {
      const now = new Date();
      const nextDate = new Date(now.getTime() + (target.waterFrequency || 7) * 86400000).toISOString();
      updatePlant(id, {
        lastWatered: now.toISOString(),
        nextWaterDate: nextDate
      });
    }
  };

  // Record Growth Entry
  const addGrowthEntry = (plantId, entry) => {
    const target = plants.find(p => p.id === plantId);
    if (target) {
      const updatedHistory = [...(target.growthHistory || []), { id: 'g-' + Date.now(), ...entry }];
      updatePlant(plantId, { growthHistory: updatedHistory });
    }
  };

  // Add Journal Entry
  const addJournalEntry = (entry) => {
    const newEntry = {
      id: 'j-' + Date.now(),
      userId: currentUser ? currentUser.uid : 'demo-user-123',
      date: new Date().toISOString(),
      ...entry
    };
    setJournals(prev => [newEntry, ...prev]);
  };

  // Track Recently Viewed
  const addToRecentlyViewed = (plant) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== plant.id);
      return [plant, ...filtered].slice(0, 5);
    });
  };

  // Computed Dashboard Metrics
  const totalPlants = plants.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const plantsNeedingWaterToday = plants.filter(p => {
    if (!p.nextWaterDate) return false;
    return new Date(p.nextWaterDate) <= new Date();
  });
  const upcomingReminders = plants.filter(p => {
    if (!p.nextWaterDate) return false;
    const diff = new Date(p.nextWaterDate) - new Date();
    return diff > 0 && diff <= 3 * 86400000;
  });

  const value = {
    plants,
    journals,
    recentlyViewed,
    loading,
    totalPlants,
    plantsNeedingWaterToday,
    upcomingReminders,
    addPlant,
    updatePlant,
    deletePlant,
    toggleFavorite,
    waterPlant,
    addGrowthEntry,
    addJournalEntry,
    addToRecentlyViewed
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => useContext(PlantContext);
