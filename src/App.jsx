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
        {user ? (
          <>
            <span style={{ color: '#94a3b8', marginRight: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              👤 Connecté : {user.email}
            </span>
            <Link to="/pro/dashboard" style={btnOutlineStyle}>Mes Magasins</Link>
            <Link to="/pro/create-store" style={btnPrimaryStyle}>+ Créer un magasin</Link>
            <button onClick={handleLogout} style={btnDangerStyle}>Se déconnecter</button>
          </>
        ) : (
          <Link to="/pro/auth" style={btnPrimaryStyle}>Espace Commerçant (Connexion)</Link>
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

  if (user) return <Navigate to="/pro/dashboard" replace />;

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
// 📊 DASHBOARD COMMERÇANT (Mes Magasins)
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

  const handleTestSale = async (store) => {
    alert("Simulation en cours... (Envoi de 50€ d'achat factice)");
    try {
      const meterId = store.stripe_meter_id;
      // On masque l'obligation de Stripe pour la simulation Web pour ne pas bloquer si pas d'abonnement valide
      // if(!meterId) throw new Error("Pas de meter_id Stripe trouvé pour ce magasin.");

      const fakePurchase = 50.0;
      const amountToBill = 2.50; // 50€ * 5% = 2.5€

      // Appel Stripe Cloud Function commenté pour mode de test pur
      // const reportFunc = httpsCallable(functions, 'reportCommission');
      // await reportFunc({ subscriptionItemId: meterId, amountInCents: 250 });

      await updateDoc(doc(db, "stores", store.id), {
        current_month_debt: increment(amountToBill),
        totalAmountSpentByUser: increment(fakePurchase)
      });

      alert("✅ Succès ! Achat simulé, facture mise à jour.");
      window.location.reload();
    } catch (e) {
      alert("❌ Erreur de simulation: " + e.message);
    }
  };

  const handlePayDebt = async (storeId, debt) => {
    if(window.confirm(`Vous allez être redirigé pour payer ${debt.toFixed(2)}€.`)) {
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
        <h1 style={{ color: '#00bcd4', marginBottom: '20px' }}>Espace Commerçant : Mes Magasins</h1>
        
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
                <button onClick={() => navigate(`/pro/stats/${store.id}`)} style={{...btnOutlineStyle, flex: 1}}>📊 Statistiques</button>
                <button onClick={() => handleTestSale(store)} style={{...btnOutlineStyle, flex: 1, color: '#fbbf24', borderColor: '#fbbf24'}}>🐛 Simuler Achat</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// 🧩 COMPOSANT : GESTIONNAIRE DE PALIERS DE FIDÉLITÉ
// ==========================================
function LoyaltyRulesManager({ rules, setRules }) {
  const [ruleType, setRuleType] = useState('visit');
  const [ruleThreshold, setRuleThreshold] = useState('');
  const [ruleReward, setRuleReward] = useState('');

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!ruleThreshold || !ruleReward) return;
    setRules([...rules, {
      type: ruleType,
      threshold: parseFloat(ruleThreshold),
      rewardPercent: parseFloat(ruleReward),
      minPurchaseAmount: ruleType === 'visit' ? 5.0 : null
    }]);
    setRuleThreshold('');
    setRuleReward('');
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
      <h3 style={{ color: '#fbbf24', fontSize: '15px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🎁 Programme de Fidélité (Paliers)
      </h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8' }}>Type de palier</label>
          <select value={ruleType} onChange={(e) => setRuleType(e.target.value)} style={inputStyle}>
            <option value="visit">Par visites</option>
            <option value="spend">Par montant dépensé (€)</option>
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8' }}>Objectif à atteindre</label>
          <input type="number" step="0.1" value={ruleThreshold} onChange={(e) => setRuleThreshold(e.target.value)} placeholder={ruleType === 'visit' ? "Ex: 10 (visites)" : "Ex: 50 (€)"} style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8' }}>Réduction offerte (%)</label>
          <input type="number" step="0.1" value={ruleReward} onChange={(e) => setRuleReward(e.target.value)} placeholder="Ex: 15 (%)" style={inputStyle} />
        </div>
        <button onClick={handleAddRule} style={{ ...btnPrimaryStyle, backgroundColor: '#fbbf24', color: 'black', height: '51px', marginBottom: '10px' }}>
          + Ajouter
        </button>
      </div>

      {rules.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {rules.map((rule, index) => (
            <li key={index} style={{ backgroundColor: '#1e293b', padding: '10px 15px', borderRadius: '8px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'white' }}>
                Au bout de <strong style={{ color: '#00bcd4' }}>{rule.threshold} {rule.type === 'visit' ? 'visites' : '€ dépensés'}</strong> 
                &nbsp;👉&nbsp; Gain : <strong style={{ color: '#10b981' }}>-{rule.rewardPercent}%</strong> sur la prochaine commande
              </span>
              <button onClick={(e) => { e.preventDefault(); handleRemoveRule(index); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic', margin: 0 }}>Aucune règle de fidélité définie.</p>
      )}
    </div>
  );
}

// ==========================================
// 🏪 FORMULAIRE DE CRÉATION DE MAGASIN
// ==========================================
function CheckoutForm({ user }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [enableCashback, setEnableCashback] = useState(true);
  const [cashbackRate, setCashbackRate] = useState(5);
  const [enableVisibilityBoost, setEnableVisibilityBoost] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState(1.2);
  const [enablePremiumAdBoost, setEnablePremiumAdBoost] = useState(false);
  const [enableGoldStore, setEnableGoldStore] = useState(false);
  
  // Nouveau state pour la fidélité
  const [loyaltyRules, setLoyaltyRules] = useState([]);

  const [monthlyFixedCost, setMonthlyFixedCost] = useState(0.0);
  const [variableFeePer100, setVariableFeePer100] = useState(0.0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let fixedCost = 0.0;
    if (!enableCashback) {
      setEnablePremiumAdBoost(false);
      setEnableGoldStore(false);
      setLoyaltyRules([]); // Retire la fidélité si pas de cashback
    }
    if (enableVisibilityBoost) {
      const step = Math.round((selectedMultiplier - 1.1) * 10);
      let sliderCost = step * 2.0;
      if (sliderCost < 2.0) sliderCost = 2.0;
      if (sliderCost > 10.0) sliderCost = 10.0;
      fixedCost += sliderCost;
    }
    if (enableGoldStore && enableCashback) fixedCost += 5.0;

    const rate = enableCashback ? parseFloat(cashbackRate || 0) : 0.0;
    const commissionPercent = enablePremiumAdBoost ? 0.40 : 0.25;
    const fee = rate * commissionPercent;

    setMonthlyFixedCost(fixedCost);
    setVariableFeePer100(rate + fee);
  }, [enableCashback, cashbackRate, enableVisibilityBoost, selectedMultiplier, enablePremiumAdBoost, enableGoldStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !user) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) throw new Error(error.message);

      const createStripeShopFunc = httpsCallable(functions, 'createStripeShop');
      const result = await createStripeShopFunc({
        paymentMethodId: paymentMethod.id,
        email: user.email,
        name: storeName,
        is_visibility_boost_enabled: enableGoldStore,
      });

      const stripeCustomerId = result.data.customerId;
      const subscriptionItemId = result.data.subscriptionItemId;

      let lat = 48.8566;
      let lng = 2.3522;
      try {
        const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
        const nomData = await nomRes.json();
        if(nomData && nomData.length > 0) {
          lat = parseFloat(nomData[0].lat);
          lng = parseFloat(nomData[0].lon);
        }
      } catch (err) {
        console.warn("Erreur Nominatim:", err);
      }

      await addDoc(collection(db, "stores"), {
        name: storeName,
        address: address,
        description: description,
        phone: phone,
        category: category,
        coordinates: new GeoPoint(lat, lng),
        latitude: lat,
        longitude: lng,
        loyalty_rules: loyaltyRules, // Sauvegarde des règles de fidélité !
        
        is_cashback_enabled: enableCashback,
        cashback_rate: enableCashback ? (parseFloat(cashbackRate) / 100.0) : 0.0,
        is_visibility_boost_enabled: enableVisibilityBoost,
        lame_point_multiplier: enableVisibilityBoost ? parseFloat(selectedMultiplier) : 1.0,
        is_premium_ad_boost_enabled: enablePremiumAdBoost,
        is_gold_store_enabled: enableGoldStore,

        owner_id: user.uid,
        stripe_customer_id: stripeCustomerId,
        stripe_meter_id: subscriptionItemId,
        auto_billing_enabled: true,
        current_month_debt: monthlyFixedCost,
        totalAmountSpentByUser: 0.0,
        totalCashbackGiven: 0.0,
        created_at: serverTimestamp(),
      });

      alert("🎉 Magasin créé avec succès !");
      navigate('/pro/dashboard');

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Une erreur est survenue lors de la création.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {errorMsg && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px' }}>{errorMsg}</div>}

      <h2 style={sectionTitleStyle}>1. Informations Générales</h2>
      <div style={cardStyle}>
        <input type="text" placeholder="Nom du magasin" value={storeName} onChange={e => setStoreName(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Adresse complète" value={address} onChange={e => setAddress(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Catégorie (ex: Boulangerie, Sport...)" value={category} onChange={e => setCategory(e.target.value)} required style={inputStyle} />
        <input type="tel" placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} required style={inputStyle} />
        <textarea placeholder="Description du magasin" value={description} onChange={e => setDescription(e.target.value)} style={{...inputStyle, height: '80px', resize: 'none'}} />
      </div>

      <h2 style={sectionTitleStyle}>2. Offre & Visibilité</h2>
      <div style={cardStyle}>
        <SwitchRow checked={enableCashback} onChange={setEnableCashback} title="Activer Cashback" subtitle="Requis pour les options Pub, Or et Fidélité." />
        {enableCashback && (
          <div style={{ marginTop: '15px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8' }}>Taux de Cashback (%)</label>
            <input type="number" step="0.1" min="1" max="100" value={cashbackRate} onChange={e => setCashbackRate(e.target.value)} required style={{...inputStyle, marginTop: '5px'}} />
            
            {/* INTÉGRATION COMPOSANT FIDÉLITÉ */}
            <LoyaltyRulesManager rules={loyaltyRules} setRules={setLoyaltyRules} />
          </div>
        )}
      </div>

      <div style={{...cardStyle, border: enableVisibilityBoost ? '1px solid #c084fc' : 'none'}}>
        <SwitchRow checked={enableVisibilityBoost} onChange={setEnableVisibilityBoost} title="Boost Visibilité (Défis)" subtitle="Apparaître en premier dans les défis." />
        {enableVisibilityBoost && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#3b0764', borderRadius: '8px' }}>
            <div style={{ color: '#d8b4fe', fontWeight: 'bold', marginBottom: '10px' }}>Multiplicateur offert : x{selectedMultiplier}</div>
            <input type="range" min="1.2" max="1.6" step="0.1" value={selectedMultiplier} onChange={e => setSelectedMultiplier(e.target.value)} style={{ width: '100%' }} />
          </div>
        )}
      </div>

      <div style={cardStyle}>
        {enableCashback ? (
          <>
            <SwitchRow checked={enablePremiumAdBoost} onChange={setEnablePremiumAdBoost} title="Sponsoriser Boost Pub" subtitle="Gains x2 pour clients. Com passe à 40%." />
            <hr style={{ borderColor: '#334155', margin: '15px 0' }}/>
            <SwitchRow checked={enableGoldStore} onChange={setEnableGoldStore} title="Visibilité Or + 1%" subtitle="Carte Or + 1% de cashback offert (5€/mois)." />
          </>
        ) : (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>Activez le Cashback pour débloquer les options Pub et Or.</p>
        )}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#0ea5e920', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
        <h3 style={{ color: '#0ea5e9', fontSize: '16px', marginBottom: '15px' }}>SIMULATION DES COÛTS</h3>
        <div style={simRowStyle}><span>Abonnements Fixes :</span><strong>{monthlyFixedCost.toFixed(2)} € / mois</strong></div>
        <hr style={{ borderColor: '#0ea5e950', margin: '10px 0' }}/>
        <div style={simRowStyle}><span style={{ color: '#94a3b8' }}>Pour 100€ d'achat client :</span></div>
        <div style={simRowStyle}><span>- Coût total (Cashback + Commission) :</span><strong>{variableFeePer100.toFixed(2)} €</strong></div>
      </div>

      <h2 style={sectionTitleStyle}>3. Paiement</h2>
      <div style={{ padding: '15px', backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
        <p style={{ color: 'white', marginBottom: '15px', fontSize: '14px' }}>Stripe Sécurisé (Facturation auto mensuelle)</p>
        <div style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '8px' }}>
          <CardElement options={cardStyleOptions} />
        </div>
      </div>

      <button type="submit" disabled={!stripe || isLoading} style={{
          padding: '16px', backgroundColor: '#10b981', color: 'white', fontWeight: 'bold', 
          border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '16px'
        }}>
        {isLoading ? "Création en cours..." : "Valider et Payer"}
      </button>
    </form>
  );
}

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
// ✏️ EDITER UN MAGASIN
// ==========================================
function EditStorePage({ user }) {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');
  const [cashbackRate, setCashbackRate] = useState(5);
  const [enableCashback, setEnableCashback] = useState(true);
  const [enableVisibilityBoost, setEnableVisibilityBoost] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState(1.2);
  const [enablePremiumAdBoost, setEnablePremiumAdBoost] = useState(false);
  const [enableGoldStore, setEnableGoldStore] = useState(false);
  
  // Nouveau state pour la fidélité
  const [loyaltyRules, setLoyaltyRules] = useState([]);

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
        setLoyaltyRules(d.loyalty_rules || []); // Charger les règles
      }
    };
    fetchStore();
  }, [storeId]);

  const handleSave = async (e) => {
    e.preventDefault();
    let addedCost = 0.0;

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
        loyalty_rules: enableCashback ? loyaltyRules : [], // Mettre à jour la fidélité
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
            {enableCashback && (
              <div style={{ marginTop: '10px' }}>
                <input type="number" step="0.1" value={cashbackRate} onChange={e=>setCashbackRate(e.target.value)} style={inputStyle} />
                {/* INTÉGRATION COMPOSANT FIDÉLITÉ */}
                <LoyaltyRulesManager rules={loyaltyRules} setRules={setLoyaltyRules} />
              </div>
            )}
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
// 📈 PAGE STATISTIQUES / TRANSACTIONS / TOP 5
// ==========================================
function StoreStatsPage({ user }) {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' ou 'transactions'

  useEffect(() => {
    const fetchData = async () => {
      // 1. Récupérer les données du magasin
      const sDoc = await getDoc(doc(db, "stores", storeId));
      if (sDoc.exists()) setStoreData(sDoc.data());

      // 2. Récupérer les transactions
      const q = query(collection(db, "stores", storeId, "store_transactions"), limit(100));
      const snap = await getDocs(q);
      const txs = [];
      snap.forEach(d => txs.push({id: d.id, ...d.data()}));
      txs.sort((a,b) => b.timestamp?.toMillis() - a.timestamp?.toMillis());
      setTransactions(txs);
    };
    fetchData();
  }, [storeId]);

  // Fonction pour calculer le Top 5 Clients
  const getTopClients = () => {
    const clientsMap = {};
    transactions.forEach(tx => {
      const uid = tx.user_id || 'inconnu';
      const name = tx.username || 'Client';
      const spent = tx.amount_spent || 0;
      if (!clientsMap[uid]) {
        clientsMap[uid] = { name, total: 0, visits: 0 };
      }
      clientsMap[uid].total += spent;
      clientsMap[uid].visits += 1;
    });

    return Object.values(clientsMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5); // Prendre les 5 meilleurs
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate('/pro/dashboard')} style={{ background: 'none', color: '#00bcd4', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>&larr; Retour au Dashboard</button>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>Statistiques : {storeData ? storeData.name : '...'}</h1>
        
        {/* ONGLET NAVIGATION */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('summary')} 
            style={{...btnPrimaryStyle, backgroundColor: activeTab === 'summary' ? '#0ea5e9' : 'transparent', border: '1px solid #0ea5e9', color: activeTab === 'summary' ? 'white' : '#0ea5e9'}}
          >
            📊 Résumé & Top Clients
          </button>
          <button 
            onClick={() => setActiveTab('transactions')} 
            style={{...btnPrimaryStyle, backgroundColor: activeTab === 'transactions' ? '#0ea5e9' : 'transparent', border: '1px solid #0ea5e9', color: activeTab === 'transactions' ? 'white' : '#0ea5e9'}}
          >
            🧾 Historique Transactions
          </button>
        </div>

        {/* CONTENU ONGLET: RÉSUMÉ */}
        {activeTab === 'summary' && storeData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Cartes de résumé */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={statCardStyle}>
                <div style={statCardTitle}>Chiffre d'affaires clients</div>
                <div style={{...statCardValue, color: '#38bdf8'}}>{(storeData.totalAmountSpentByUser || 0).toFixed(2)} €</div>
              </div>
              <div style={statCardStyle}>
                <div style={statCardTitle}>Cashback total reversé</div>
                <div style={{...statCardValue, color: '#10b981'}}>{(storeData.totalCashbackGiven || 0).toFixed(2)} €</div>
              </div>
              <div style={statCardStyle}>
                <div style={statCardTitle}>Facture en cours</div>
                <div style={{...statCardValue, color: '#fbbf24'}}>{(storeData.current_month_debt || 0).toFixed(2)} €</div>
              </div>
            </div>

            {/* TOP 5 CLIENTS */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <h3 style={{ color: '#fbbf24', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🏆 Top 5 Clients
              </h3>
              {getTopClients().length === 0 ? (
                <p style={{ color: '#94a3b8' }}>Pas encore de clients enregistrés.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {getTopClients().map((client, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#0f172a', borderRadius: '8px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ backgroundColor: '#334155', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>{client.name}</div>
                          <div style={{ color: '#94a3b8', fontSize: '12px' }}>{client.visits} visite(s)</div>
                        </div>
                      </div>
                      <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '16px' }}>
                        {client.total.toFixed(2)} €
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}

        {/* CONTENU ONGLET: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          transactions.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>Aucune transaction enregistrée.</p>
          ) : (
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
              {transactions.map(tx => (
                <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #334155' }}>
                  <div>
                    <strong style={{ color: 'white' }}>{tx.username || 'Client'}</strong>
                    <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                      {tx.timestamp ? new Date(tx.timestamp.toMillis()).toLocaleString('fr-FR') : 'Date inconnue'}
                    </div>
                    {tx.loyalty_tier && (
                      <div style={{ color: '#fbbf24', fontSize: '11px', marginTop: '2px' }}>⭐ {tx.loyalty_tier}</div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'white' }}>{tx.amount_spent?.toFixed(2)}€ dépensés</div>
                    <div style={{ color: '#10b981', fontSize: '14px', fontWeight: 'bold' }}>+{tx.cashback_given?.toFixed(2)}€ CB ({(tx.rate_applied || 0).toFixed(1)}%)</div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>
    </div>
  );
}

// Composant Switch
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
const navbarStyle = { position: 'fixed', top: 0, left: 0, right: 0, height: '70px', backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', zIndex: 1000, borderBottom: '1px solid #334155' };
const navBrandStyle = { display: 'flex', alignItems: 'center' };
const navLinksStyle = { display: 'flex', alignItems: 'center', gap: '15px' };
const btnPrimaryStyle = { backgroundColor: '#00bcd4', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer' };
const btnOutlineStyle = { backgroundColor: 'transparent', color: '#00bcd4', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #00bcd4', cursor: 'pointer' };
const btnDangerStyle = { backgroundColor: 'transparent', color: '#ef4444', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ef4444', cursor: 'pointer', fontWeight: 'bold' };
const inputStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box', marginBottom: '10px' };
const cardStyle = { backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' };
const sectionTitleStyle = { color: '#10b981', fontSize: '18px', marginTop: '10px', marginBottom: '5px' };
const simRowStyle = { display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '14px' };
const statCardStyle = { flex: '1', minWidth: '150px', backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const statCardTitle = { color: '#94a3b8', fontSize: '12px', marginBottom: '10px', textAlign: 'center' };
const statCardValue = { fontSize: '24px', fontWeight: 'bold' };
const cardStyleOptions = { style: { base: { color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSmoothing: 'antialiased', fontSize: '16px', '::placeholder': { color: '#64748b' } }, invalid: { color: '#fa755a', iconColor: '#fa755a' } } };

export default App;