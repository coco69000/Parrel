import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import './App.css';
import backgroundVideo from './assets/background1.mp4'; 

// --- IMPORTATIONS FIREBASE ---
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  doc,
  addDoc, 
  getDoc,
  getDocs,
  updateDoc,
  query, 
  where,
  orderBy,
  limit,
  serverTimestamp, 
  GeoPoint,
  increment
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// --- IMPORTATIONS STRIPE ---
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// ⚠️ REMPLACE CECI PAR LA CONFIGURATION DE TON PROJET FIREBASE ⚠️
const firebaseConfig = {
  apiKey: "AIzaSyAOdjYDtgtyOnf1sZM0wZgJ8_8YkaXgnzU",
  authDomain: "walkmoney-1cdad.firebaseapp.com",
  projectId: "walkmoney-1cdad",
  storageBucket: "walkmoney-1cdad.firebasestorage.app",
  messagingSenderId: "996207167634",
  appId: "1:996207167634:web:a34a2bab2c7ea97eb47e4b",
  measurementId: "G-8LVXXK4T9C" // N'oublie pas cette ligne pour le web
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// Clé publique Stripe
const stripePromise = loadStripe("pk_test_51Sf3KIJmX9VkIHA6dTDUanwaG5w8v6wwdqryF4e42PDjd2yR1RkVc5SUay2fOQVDb1vkByBW9CBFejiryPtDcFqG00sCZ9K4gE");

// ==========================================
// 🧭 BARRE DE NAVIGATION (HEADER)
// ==========================================
function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav style={navbarStyle}>
      <div style={navBrandStyle}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
          Parrel <span style={{ color: '#00bcd4' }}>Studio</span>
        </Link>
      </div>
      <div style={navLinksStyle}>
        {user && (
          <>
            <span style={{ color: '#94a3b8', marginRight: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              👤 {user.email}
            </span>
            <Link to="/pro/dashboard" style={btnOutlineStyle}>Mes Magasins</Link>
            <Link to="/pro/create-store" style={btnPrimaryStyle}>+ Créer un magasin</Link>
            <button onClick={handleLogout} style={btnDangerStyle}>Déconnexion</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ==========================================
// 🏠 PAGE D'ACCUEIL
// ==========================================
function Home({ user }) {
  const navigate = useNavigate();

  const handleProClick = () => {
    if (user) {
      navigate('/pro/dashboard');
    } else {
      navigate('/pro/auth');
    }
  };

  return (
    <div className="app-container">
      <div className="video-background-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <header className="hero" style={{ paddingTop: '80px' }}>
        <div className="hero-content">
          <span className="badge">🚀 Studio de développement innovant</span>
          <h1>L'innovation logicielle au service de votre quotidien</h1>
          <p className="hero-description">
            Parrel développe un écosystème d'applications mobiles et d'outils basés sur l'Intelligence Artificielle pour simplifier, divertir et récompenser vos actions.
          </p>
        </div>
      </header>

      <section id="applications" className="apps-section">
        <h2>Nos Applications & Écosystème IA</h2>
        <div className="apps-grid">
          
          {/* CARTE WALKMONEY PRO */}
          <div className="app-card" style={{ border: '2px solid #00bcd4', transform: 'scale(1.05)', zIndex: 10, cursor: 'pointer' }} onClick={handleProClick}>
            <h3 style={{ color: '#00bcd4' }}>WalkMoney - Espace Pro</h3>
            <span className="tag" style={{ backgroundColor: '#00bcd4', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Portail Commerçant</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Créez votre magasin, gérez vos offres de cashback et suivez vos statistiques. Tout est synchronisé en temps réel avec l'application de vos clients.
            </p>
            <div style={{...btnPrimaryStyle, display: 'inline-block', width: '100%', textAlign: 'center', boxSizing: 'border-box'}}>
              {user ? "Accéder à mon tableau de bord" : "Connexion / Inscription Commerçant"}
            </div>
          </div>

          <div className="app-card">
            <h3>ProjetCalo</h3>
            <p>Nutrition et fitness personnalisés via IA.</p>
          </div>
          <div className="app-card">
            <h3>Playfun</h3>
            <p>+20 jeux de soirée multijoueur.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 🔐 PAGE AUTHENTIFICATION PRO
// ==========================================
function AuthPage({ user }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/pro/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/pro/dashboard');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg("Cet email est déjà utilisé. Veuillez vous connecter.");
        setIsLogin(true);
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setErrorMsg("Email ou mot de passe incorrect.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg("Le mot de passe doit faire au moins 6 caractères.");
      } else {
        setErrorMsg("Erreur d'authentification : " + error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '70px' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
          {isLogin ? "Connexion Espace Pro" : "Créer un compte Pro"}
        </h2>
        
        {errorMsg && (
          <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="Adresse Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          <button type="submit" disabled={isLoading} style={{...btnPrimaryStyle, padding: '15px', fontSize: '16px', marginTop: '10px', width: '100%', boxSizing: 'border-box'}}>
            {isLoading ? "Veuillez patienter..." : (isLogin ? "Se connecter" : "S'inscrire")}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => {setIsLogin(!isLogin); setErrorMsg('');}} style={{ background: 'none', border: 'none', color: '#00bcd4', cursor: 'pointer', textDecoration: 'underline' }}>
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📊 DASHBOARD COMMERÇANT
// ==========================================
function MerchantDashboard({ user }) {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchStores = async () => {
      try {
        const q = query(collection(db, "stores"), where("owner_id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const storesData = [];
        for (const docSnap of querySnapshot.docs) {
          const sData = { id: docSnap.id, ...docSnap.data() };
          // Fetch stats for this store
          const txQ = query(collection(db, "stores", docSnap.id, "store_transactions"));
          const txSnap = await getDocs(txQ);
          let uniqueClients = new Set();
          let realCA = 0;
          let realCB = 0;
          txSnap.forEach(txDoc => {
            const tData = txDoc.data();
            realCA += tData.amount_spent || 0;
            realCB += tData.cashback_given || 0;
            if (tData.user_id) uniqueClients.add(tData.user_id);
          });
          
          storesData.push({
            ...sData,
            stats_clients: uniqueClients.size,
            stats_ca: realCA,
            stats_cb: realCB
          });
        }
        setStores(storesData);
      } catch (error) {
        console.error("Erreur chargement magasins:", error);
      }
      setLoading(false);
    };
    fetchStores();
  }, [user]);

  const handleTestSale = async (storeId) => {
    alert("Simulation en cours... (Envoi de 50€ d'achat factice)");
    try {
      const storeDoc = await getDoc(doc(db, "stores", storeId));
      const meterId = storeDoc.data().stripe_meter_id;
      if(!meterId) throw new Error("Pas de meter_id Stripe trouvé.");

      // Calcul fake: 50€ achat, 2€ cashback, commission 1.25 -> 2.50€ facture
      const fakePurchase = 50.0;
      const amountToBill = 2.50;
      const amountInCents = 250;

      const reportFunc = httpsCallable(functions, 'reportCommission');
      await reportFunc({ subscriptionItemId: meterId, amountInCents });

      await updateDoc(doc(db, "stores", storeId), {
        current_month_debt: increment(amountToBill),
        totalAmountSpentByUser: increment(fakePurchase)
      });

      alert("✅ Succès ! Achat simulé, facture mise à jour.");
      window.location.reload();
    } catch (e) {
      alert("❌ Erreur: " + e.message);
    }
  };

  const handlePayDebt = async (storeId, debt) => {
    if(window.confirm(`Vous allez être redirigé pour payer ${debt.toFixed(2)}€.`)) {
      // Simulation paiement
      await updateDoc(doc(db, "stores", storeId), {
        current_month_debt: 0.0,
        last_payment_date: serverTimestamp()
      });
      alert("Paiement reçu avec succès !");
      window.location.reload();
    }
  };

  if (!user) return <Navigate to="/pro/auth" replace />;
  if (loading) return <div style={pageStyle}>Chargement de votre espace...</div>;

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#00bcd4', marginBottom: '20px' }}>Espace Commerçant</h1>
        
        {stores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>Vous n'avez pas encore de magasin</h2>
            <Link to="/pro/create-store" style={btnPrimaryStyle}>+ Créer mon premier magasin</Link>
          </div>
        ) : (
          stores.map(store => (
            <div key={store.id} style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ color: 'white', margin: '0 0 5px 0' }}>{store.name}</h2>
                  <p style={{ color: '#94a3b8', margin: '0 0 15px 0', fontSize: '14px' }}>{store.address}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>{(store.cashback_rate * 100).toFixed(1)}% Cashback</div>
                  {store.is_visibility_boost_enabled && <span style={{ color: '#c084fc', fontSize: '12px' }}>⚡ Boost x{store.lame_point_multiplier}</span>}
                  {store.is_gold_store_enabled && <span style={{ color: '#fbbf24', fontSize: '12px', marginLeft: '5px' }}>⭐ Gold</span>}
                </div>
              </div>

              {/* STATS */}
              <div style={{ display: 'flex', gap: '15px', backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 'bold' }}>{store.stats_ca.toFixed(2)}€</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>CA Clients</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#10b981', fontSize: '20px', fontWeight: 'bold' }}>{store.stats_cb.toFixed(2)}€</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Cashback reversé</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#c084fc', fontSize: '20px', fontWeight: 'bold' }}>{store.stats_clients}</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Clients uniques</div>
                </div>
              </div>

              {/* FACTURE */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#334155', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <div>
                  <span style={{ color: 'white' }}>Facture en cours : </span>
                  <strong style={{ color: store.current_month_debt > 0 ? '#fbbf24' : '#10b981', fontSize: '18px' }}>
                    {store.current_month_debt.toFixed(2)} €
                  </strong>
                </div>
                {store.current_month_debt > 5 && (
                  <button onClick={() => handlePayDebt(store.id, store.current_month_debt)} style={{...btnPrimaryStyle, backgroundColor: '#fbbf24', color: 'black'}}>Régler</button>
                )}
              </div>

              {/* ACTIONS */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate(`/pro/edit-store/${store.id}`)} style={{...btnOutlineStyle, flex: 1}}>✏️ Modifier</button>
                <button onClick={() => navigate(`/pro/stats/${store.id}`)} style={{...btnOutlineStyle, flex: 1}}>📊 Transactions</button>
                <button onClick={() => handleTestSale(store.id)} style={{...btnOutlineStyle, flex: 1, color: '#fbbf24', borderColor: '#fbbf24'}}>🐛 Simuler Achat</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// ✏️ EDITER UN MAGASIN
// ==========================================
function EditStorePage({ user }) {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  
  // Champs
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');
  const [cashbackRate, setCashbackRate] = useState(5);
  const [enableCashback, setEnableCashback] = useState(true);
  const [enableVisibilityBoost, setEnableVisibilityBoost] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState(1.2);
  const [enablePremiumAdBoost, setEnablePremiumAdBoost] = useState(false);
  const [enableGoldStore, setEnableGoldStore] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      const docSnap = await getDoc(doc(db, "stores", storeId));
      if (docSnap.exists()) {
        const d = docSnap.data();
        setStore(d);
        setName(d.name || '');
        setDesc(d.description || '');
        setPhone(d.phone || '');
        setCashbackRate((d.cashback_rate || 0.05) * 100);
        setEnableCashback(d.is_cashback_enabled ?? true);
        setEnableVisibilityBoost(d.is_visibility_boost_enabled ?? false);
        setSelectedMultiplier(d.lame_point_multiplier || 1.2);
        setEnablePremiumAdBoost(d.is_premium_ad_boost_enabled ?? false);
        setEnableGoldStore(d.is_gold_store_enabled ?? false);
      }
    };
    fetchStore();
  }, [storeId]);

  const handleSave = async (e) => {
    e.preventDefault();
    let addedCost = 0.0;

    // Calcul de la facturation immédiate si ajout d'options
    if (enableGoldStore && !store.is_gold_store_enabled) addedCost += 5.0;
    
    if (enableVisibilityBoost) {
      const step = Math.round((selectedMultiplier - 1.1) * 10);
      let currentCost = Math.max(2.0, Math.min(step * 2.0, 10.0));
      
      if (!store.is_visibility_boost_enabled) {
        addedCost += currentCost;
      } else if (selectedMultiplier > store.lame_point_multiplier) {
        const oldStep = Math.round((store.lame_point_multiplier - 1.1) * 10);
        let oldCost = Math.max(2.0, oldStep * 2.0);
        addedCost += (currentCost - oldCost);
      }
    }

    try {
      await updateDoc(doc(db, "stores", storeId), {
        name, description: desc, phone,
        is_cashback_enabled: enableCashback,
        cashback_rate: enableCashback ? (cashbackRate / 100.0) : 0,
        is_visibility_boost_enabled: enableVisibilityBoost,
        lame_point_multiplier: enableVisibilityBoost ? parseFloat(selectedMultiplier) : 1.0,
        is_premium_ad_boost_enabled: enablePremiumAdBoost && enableCashback,
        is_gold_store_enabled: enableGoldStore && enableCashback,
        current_month_debt: increment(addedCost)
      });
      alert(`Mise à jour réussie. ${addedCost > 0 ? `+${addedCost}€ ajoutés à la facture en cours.` : ''}`);
      navigate('/pro/dashboard');
    } catch(err) {
      alert("Erreur: " + err.message);
    }
  };

  if (!store) return <div style={pageStyle}>Chargement...</div>;

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '12px' }}>
        <button onClick={() => navigate('/pro/dashboard')} style={{ background: 'none', color: '#00bcd4', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>&larr; Retour</button>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>Modifier {store.name}</h1>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Nom" style={inputStyle} required/>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" style={{...inputStyle, height: '80px'}} required/>
          <input type="text" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Téléphone" style={inputStyle} required/>
          
          <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px' }}>
            <SwitchRow checked={enableCashback} onChange={setEnableCashback} title="Activer Cashback" subtitle="Offrir des récompenses" />
            {enableCashback && <input type="number" step="0.1" value={cashbackRate} onChange={e=>setCashbackRate(e.target.value)} style={{...inputStyle, marginTop: '10px'}} />}
          </div>

          <div style={{ backgroundColor: enableVisibilityBoost ? '#3b0764' : '#0f172a', padding: '15px', borderRadius: '8px' }}>
            <SwitchRow checked={enableVisibilityBoost} onChange={setEnableVisibilityBoost} title="Boost Visibilité" subtitle="Apparaître en haut des défis" />
            {enableVisibilityBoost && (
               <input type="range" min="1.2" max="1.6" step="0.1" value={selectedMultiplier} onChange={e=>setSelectedMultiplier(e.target.value)} style={{ width: '100%', marginTop: '15px' }} />
            )}
          </div>

          <button type="submit" style={{...btnPrimaryStyle, padding: '15px', marginTop: '10px'}}>Enregistrer les modifications</button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 📈 PAGE STATISTIQUES / TRANSACTIONS
// ==========================================
function StoreStatsPage({ user }) {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTx = async () => {
      // Sur le web, on ne met pas orderBy si on n'a pas créé l'index composite dans Firebase.
      // Pour éviter les erreurs, on récupère juste la collection.
      const q = query(collection(db, "stores", storeId, "store_transactions"), limit(50));
      const snap = await getDocs(q);
      const txs = [];
      snap.forEach(d => txs.push({id: d.id, ...d.data()}));
      // Tri manuel côté client pour éviter l'erreur d'index Firestore
      txs.sort((a,b) => b.timestamp?.toMillis() - a.timestamp?.toMillis());
      setTransactions(txs);
    };
    fetchTx();
  }, [storeId]);

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate('/pro/dashboard')} style={{ background: 'none', color: '#00bcd4', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>&larr; Retour au Dashboard</button>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>Dernières Transactions</h1>
        
        {transactions.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>Aucune transaction enregistrée.</p>
        ) : (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden' }}>
            {transactions.map(tx => (
              <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #334155' }}>
                <div>
                  <strong style={{ color: 'white' }}>{tx.username || 'Client'}</strong>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                    {tx.timestamp ? new Date(tx.timestamp.toMillis()).toLocaleString('fr-FR') : 'Date inconnue'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'white' }}>{tx.amount_spent?.toFixed(2)}€ dépensés</div>
                  <div style={{ color: '#10b981', fontSize: '14px', fontWeight: 'bold' }}>+{tx.cashback_given?.toFixed(2)}€ CB</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 🏪 FORMULAIRE DE CRÉATION DE MAGASIN
// ==========================================
function CreateStorePage({ user }) {
  if (!user) return <Navigate to="/pro/auth" replace />;

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#00bcd4', marginBottom: '10px' }}>Créer un nouveau Magasin</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Associé au compte pro : <strong>{user.email}</strong></p>
        <Elements stripe={stripePromise}>
          <CheckoutForm user={user} />
        </Elements>
      </div>
    </div>
  );
}

// ==========================================
// COMPOSANT SWITCH REUTILISABLE
// ==========================================
const SwitchRow = ({ checked, onChange, title, subtitle }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ width: '22px', height: '22px', accentColor: '#10b981' }} />
    <div>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>{title}</div>
      <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '3px' }}>{subtitle}</div>
    </div>
  </label>
);

// ==========================================
// 🚀 APP PRINCIPALE (ROUTER)
// ==========================================
function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) return <div style={pageStyle}>Chargement...</div>;

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/pro/auth" element={<AuthPage user={user} />} />
        <Route path="/pro/dashboard" element={<MerchantDashboard user={user} />} />
        <Route path="/pro/create-store" element={<CreateStorePage user={user} />} />
        <Route path="/pro/edit-store/:storeId" element={<EditStorePage user={user} />} />
        <Route path="/pro/stats/:storeId" element={<StoreStatsPage user={user} />} />
      </Routes>
    </Router>
  );
}

// ==========================================
// 🎨 STYLES CONSTANTS
// ==========================================
const pageStyle = { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px', paddingLeft: '20px', paddingRight: '20px', fontFamily: 'Arial, sans-serif' };

const navbarStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, height: '70px',
  backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '0 30px', zIndex: 1000, borderBottom: '1px solid #334155'
};
const navBrandStyle = { display: 'flex', alignItems: 'center' };
const navLinksStyle = { display: 'flex', alignItems: 'center', gap: '15px' };

const btnPrimaryStyle = { backgroundColor: '#00bcd4', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer' };
const btnOutlineStyle = { backgroundColor: 'transparent', color: '#00bcd4', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #00bcd4', cursor: 'pointer' };
const btnDangerStyle = { backgroundColor: 'transparent', color: '#ef4444', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ef4444', cursor: 'pointer', fontWeight: 'bold' };

const inputStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box', marginBottom: '10px' };
const cardStyle = { backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' };
const sectionTitleStyle = { color: '#10b981', fontSize: '18px', marginTop: '10px', marginBottom: '5px' };
const simRowStyle = { display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '14px' };

const cardStyleOptions = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#64748b' },
    },
    invalid: { color: '#fa755a', iconColor: '#fa755a' },
  },
};

export default App;