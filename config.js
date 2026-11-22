// Firebase の設定（README の手順2でコピーしたものに置きかえる）。
// この値は公開されても問題ない種類のもので、データはルール（firestore.rules）で守られる。
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDipKJr-n721yit-fuipp5Hmhbyja6AGG4",
  authDomain: "family-shopping-486c7.firebaseapp.com",
  projectId: "family-shopping-486c7",
  storageBucket: "family-shopping-486c7.firebasestorage.app",
  messagingSenderId: "422329972292",
  appId: "1:422329972292:web:d2668d75541584ca94ae11",
};

// レシート読み取りに使う Gemini のモデル。常に最新の Flash を指す名前。
export const GEMINI_MODEL = "gemini-flash-latest";
