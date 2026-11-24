// Admin Data Service - Firebase CRUD Operations
// Provides read/write operations for all manageable sections
import { db, storage } from '../firebase/config';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

// ─── Collection Names ────────────────────────────────────
const COLLECTIONS = {
  recentActivities: 'recentActivities',
  kamyamuHomams: 'kamyamuHomams',
  smartamFunctions: 'smartamFunctions',
  smartaSevaHavanalu: 'smartaSevaHavanalu',
  remedyCategories: 'remedyCategories',
  remedies: 'remedies',
  gosevaHighlights: 'gosevaHighlights',
  gosevaProducts: 'gosevaProducts',
  gosevaActivities: 'gosevaActivities',
  gosevaGallery: 'gosevaGallery',
  gosevaContact: 'gosevaContact',
  monthlyGoPooja: 'monthlyGoPooja',
  vedicData: 'vedicData',
  vedicCurriculum: 'vedicCurriculum',
  gurukulPillars: 'gurukulPillars',
  dailyRoutine: 'dailyRoutine',
  contactInfo: 'contactInfo',
  eventsData: 'eventsData',
  settings: 'settings'
};

// Check if Firebase is actually configured with real credentials
export function isFirebaseConfigured() {
  try {
    return Boolean(
      db &&
      db.app &&
      db.app.options &&
      db.app.options.apiKey &&
      db.app.options.apiKey !== 'YOUR_API_KEY'
    );
  } catch (e) {
    return false;
  }
}

// Timeout wrapper so network calls never hang the UI
function withTimeout(promise, ms = 1200) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve(null);
    }, ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        resolve(null);
      });
  });
}

// ─── Generic CRUD ─────────────────────────────────────────

export async function getAllDocs(collectionName) {
  if (!isFirebaseConfigured()) {
    return [];
  }
  try {
    const fetchPromise = getDocs(collection(db, collectionName)).then((snap) =>
      snap.docs.map((d) => ({ _id: d.id, ...d.data() }))
    );
    const result = await withTimeout(fetchPromise, 1200);
    return result || [];
  } catch (err) {
    console.warn(`[adminDataService] Skipped ${collectionName}:`, err?.message || err);
    return [];
  }
}

export async function getDocById(collectionName, docId) {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    const fetchPromise = getDoc(doc(db, collectionName, docId)).then((snap) =>
      snap.exists() ? { _id: snap.id, ...snap.data() } : null
    );
    const result = await withTimeout(fetchPromise, 1200);
    return result || null;
  } catch (err) {
    console.warn(`[adminDataService] Skipped ${collectionName}/${docId}:`, err?.message || err);
    return null;
  }
}

export async function saveDoc(collectionName, docId, data) {
  if (!isFirebaseConfigured()) {
    return true; // saved to local storage
  }
  try {
    const savePromise = setDoc(doc(db, collectionName, docId), data, { merge: true });
    await withTimeout(savePromise, 1500);
    return true;
  } catch (err) {
    console.warn(`[adminDataService] Error saving ${collectionName}/${docId}:`, err);
    return false;
  }
}

export async function addNewDoc(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (err) {
    console.error(`Error adding to ${collectionName}:`, err);
    return null;
  }
}

export async function removeDoc(collectionName, docId) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (err) {
    console.error(`Error deleting ${collectionName}/${docId}:`, err);
    return false;
  }
}

// ─── Image Upload ─────────────────────────────────────────

export async function uploadImage(file, path) {
  try {
    const storageRef = ref(storage, path);
    const snap = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snap.ref);
    return url;
  } catch (err) {
    console.error('Error uploading image:', err);
    return null;
  }
}

export async function deleteImage(path) {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    console.error('Error deleting image:', err);
    return false;
  }
}

// ─── Section-Specific Helpers ─────────────────────────────

// Recent Activities
export const getRecentActivities = () => getAllDocs(COLLECTIONS.recentActivities);
export const saveRecentActivity = (id, data) => saveDoc(COLLECTIONS.recentActivities, id, data);
export const deleteRecentActivity = (id) => removeDoc(COLLECTIONS.recentActivities, id);

// Kamyamu Homams
export const getKamyamuHomams = () => getAllDocs(COLLECTIONS.kamyamuHomams);
export const saveKamyamuHomam = (id, data) => saveDoc(COLLECTIONS.kamyamuHomams, id, data);
export const deleteKamyamuHomam = (id) => removeDoc(COLLECTIONS.kamyamuHomams, id);

// Smartam Functions
export const getSmartamFunctions = () => getAllDocs(COLLECTIONS.smartamFunctions);
export const saveSmartamFunction = (id, data) => saveDoc(COLLECTIONS.smartamFunctions, id, data);
export const deleteSmartamFunction = (id) => removeDoc(COLLECTIONS.smartamFunctions, id);

// Smarta Seva Havanalu
export const getSmartaSevaHavanalu = () => getAllDocs(COLLECTIONS.smartaSevaHavanalu);
export const saveSmartaSevaHavanam = (id, data) => saveDoc(COLLECTIONS.smartaSevaHavanalu, id, data);
export const deleteSmartaSevaHavanam = (id) => removeDoc(COLLECTIONS.smartaSevaHavanalu, id);

// Remedies
export const getRemedies = () => getAllDocs(COLLECTIONS.remedies);
export const saveRemedy = (id, data) => saveDoc(COLLECTIONS.remedies, id, data);
export const deleteRemedy = (id) => removeDoc(COLLECTIONS.remedies, id);

// Remedy Categories
export const getRemedyCategories = () => getAllDocs(COLLECTIONS.remedyCategories);
export const saveRemedyCategory = (id, data) => saveDoc(COLLECTIONS.remedyCategories, id, data);

// Goseva
export const getGosevaProducts = () => getAllDocs(COLLECTIONS.gosevaProducts);
export const saveGosevaProduct = (id, data) => saveDoc(COLLECTIONS.gosevaProducts, id, data);
export const deleteGosevaProduct = (id) => removeDoc(COLLECTIONS.gosevaProducts, id);

export const getGosevaActivities = () => getAllDocs(COLLECTIONS.gosevaActivities);
export const saveGosevaActivity = (id, data) => saveDoc(COLLECTIONS.gosevaActivities, id, data);
export const deleteGosevaActivity = (id) => removeDoc(COLLECTIONS.gosevaActivities, id);

export const getGosevaGallery = () => getAllDocs(COLLECTIONS.gosevaGallery);
export const saveGosevaGalleryItem = (id, data) => saveDoc(COLLECTIONS.gosevaGallery, id, data);
export const deleteGosevaGalleryItem = (id) => removeDoc(COLLECTIONS.gosevaGallery, id);

// Vedic School
export const getVedicData = () => getAllDocs(COLLECTIONS.vedicData);
export const saveVedicItem = (id, data) => saveDoc(COLLECTIONS.vedicData, id, data);

export const getGurukulPillars = () => getAllDocs(COLLECTIONS.gurukulPillars);
export const saveGurukulPillar = (id, data) => saveDoc(COLLECTIONS.gurukulPillars, id, data);

export const getDailyRoutine = () => getAllDocs(COLLECTIONS.dailyRoutine);
export const saveDailyRoutineItem = (id, data) => saveDoc(COLLECTIONS.dailyRoutine, id, data);

// Contact Info
export const getContactInfo = () => getDocById(COLLECTIONS.contactInfo, 'main');
export const saveContactInfo = (data) => saveDoc(COLLECTIONS.contactInfo, 'main', data);

// Events
export const getEventsData = () => getAllDocs(COLLECTIONS.eventsData);
export const saveEvent = (id, data) => saveDoc(COLLECTIONS.eventsData, id, data);
export const deleteEvent = (id) => removeDoc(COLLECTIONS.eventsData, id);

// Settings (admin password hash, site settings, etc.)
export const getSettings = () => getDocById(COLLECTIONS.settings, 'admin');
export const saveSettings = (data) => saveDoc(COLLECTIONS.settings, 'admin', data);

// ─── Seed Defaults (one-time population from hardcoded data) ─
export async function seedCollection(collectionName, items) {
  try {
    for (const item of items) {
      const docId = item.id || item._id || `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const { _id, ...data } = item;
      await setDoc(doc(db, collectionName, docId), data);
    }
    return true;
  } catch (err) {
    console.error(`Error seeding ${collectionName}:`, err);
    return false;
  }
}

export { COLLECTIONS };

