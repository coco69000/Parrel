import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import backgroundVideo from './assets/background1.mp4'; 

// --- IMPORTATIONS FIREBASE ---
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, GeoPoint } from "firebase/firestore";
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
  measurementId: "G-8LVXXK4T9C"
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
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Erreur de déconnexion", error);
    }
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
            <span style={{ color: '#94a3b8', marginRight: '15px', fontSize: '14px' }}>
              👤 {user.email}
            </span>
            <Link to="/create-store" style={btnPrimaryStyle}>+ Créer un magasin</Link>
            <button onClick={handleLogout} style={btnDangerStyle}>Se déconnecter</button>
          </>
        ) : (
          <Link to="/auth" style={btnPrimaryStyle}>Connexion / Inscription</Link>
        )}
      </div>
    </nav>
  );
}

// ==========================================
// 🏠 PAGE D'ACCUEIL
// ==========================================
function Home() {
  return (
    <div className="app-container">
      <div className="video-background-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <header className="hero">
        <div className="hero-content">
          <span className="badge">🚀 Studio de développement innovant</span>
          <h1>L'innovation logicielle au service de votre quotidien</h1>
          <p className="hero-description">
            Parrel développe un écosystème d'applications mobiles et d'outils basés sur l'Intelligence Artificielle pour simplifier, divertir et récompenser vos actions.
          </p>
          <div className="hero-btns">
            <a href="#applications" className="cta-button">Découvrir nos applications</a>
          </div>
        </div>
      </header>

      <section id="applications" className="apps-section">
        <h2>Nos Applications & Écosystème IA</h2>
        <div className="apps-grid">
          <div className="app-card" style={{ border: '2px solid #00bcd4', transform: 'scale(1.05)', zIndex: 10 }}>
            <h3 style={{ color: '#00bcd4' }}>WalkMoney - Espace Pro</h3>
            <span className="tag" style={{ backgroundColor: '#00bcd4' }}>Portail Commerçant</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Créez votre magasin, gérez vos offres de cashback et suivez vos statistiques. Tout est synchronisé en temps réel avec l'application de vos clients.
            </p>
            <Link to="/create-store" className="cta-button" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              Accéder à l'espace Pro
            </Link>
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
// 🔐 PAGE DE CONNEXION / INSCRIPTION
// ==========================================
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      navigate('/create-store'); // Redirection après succès
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg("Cet email est déjà utilisé. Veuillez vous connecter.");
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
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <input 
            type="email" 
            placeholder="Adresse Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <button type="submit" disabled={isLoading} style={{...btnPrimaryStyle, padding: '15px', fontSize: '16px', marginTop: '10px', width: '100%'}}>
            {isLoading ? "Veuillez patienter..." : (isLogin ? "Se connecter" : "S'inscrire")}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => {setIsLogin(!isLogin); setErrorMsg('');}} 
            style={{ background: 'none', border: 'none', color: '#00bcd4', cursor: 'pointer', textDecoration: 'underline' }}>
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
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

  // 1. Infos Générales
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // 2. Offre & Visibilité
  const [enableCashback, setEnableCashback] = useState(true);
  const [cashbackRate, setCashbackRate] = useState(5);
  
  const [enableVisibilityBoost, setEnableVisibilityBoost] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState(1.2);
  
  const [enablePremiumAdBoost, setEnablePremiumAdBoost] = useState(false);
  const [enableGoldStore, setEnableGoldStore] = useState(false);

  // 3. Simulation des coûts
  const [monthlyFixedCost, setMonthlyFixedCost] = useState(0.0);
  const [variableFeePer100, setVariableFeePer100] = useState(0.0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Met à jour la simulation
  useEffect(() => {
    let fixedCost = 0.0;
    if (!enableCashback) {
      setEnablePremiumAdBoost(false);
      setEnableGoldStore(false);
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
      // 1. Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) throw new Error(error.message);

      // 2. Fonction Firebase
      const createStripeShopFunc = httpsCallable(functions, 'createStripeShop');
      const result = await createStripeShopFunc({
        paymentMethodId: paymentMethod.id,
        email: user.email,
        name: storeName,
        initialMonthlyCost: monthlyFixedCost,
      });

      const stripeCustomerId = result.data.customerId;
      const subscriptionItemId = result.data.subscriptionItemId;

      // 3. Géocodage Nominatim
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

      // 4. Sauvegarde Firestore
      await addDoc(collection(db, "stores"), {
        name: storeName,
        address: address,
        description: description,
        phone: phone,
        category: category,
        coordinates: new GeoPoint(lat, lng),
        latitude: lat,
        longitude: lng,
        loyalty_rules: [],
        
        is_cashback_enabled: enableCashback,
        cashback_rate: enableCashback ? (parseFloat(cashbackRate) / 100.0) : 0.0,
        is_visibility_boost_enabled: enableVisibilityBoost,
        lame_point_multiplier: enableVisibilityBoost ? parseFloat(selectedMultiplier) : 1.0,
        is_premium_ad_boost_enabled: enablePremiumAdBoost,
        is_gold_store_enabled: enableGoldStore,

        owner_id: user.uid, // LIAISON AVEC LE COMPTE CONNECTÉ
        stripe_customer_id: stripeCustomerId,
        stripe_meter_id: subscriptionItemId,
        auto_billing_enabled: true,
        current_month_debt: monthlyFixedCost,
        totalAmountSpentByUser: 0.0,
        totalCashbackGiven: 0.0,
        created_at: serverTimestamp(),
      });

      alert("🎉 Félicitations ! Votre magasin a été créé avec succès.");
      navigate('/');

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Une erreur est survenue lors de la création.");
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {errorMsg && (
        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px' }}>{errorMsg}</div>
      )}

      {/* --- 1. INFOS GENERALES --- */}
      <h2 style={sectionTitleStyle}>1. Informations Générales</h2>
      <div style={cardStyle}>
        <input type="text" placeholder="Nom du magasin" value={storeName} onChange={e => setStoreName(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Adresse complète" value={address} onChange={e => setAddress(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Catégorie (ex: Boulangerie, Sport...)" value={category} onChange={e => setCategory(e.target.value)} required style={inputStyle} />
        <input type="tel" placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} required style={inputStyle} />
        <textarea placeholder="Description du magasin" value={description} onChange={e => setDescription(e.target.value)} style={{...inputStyle, height: '80px', resize: 'none'}} />
      </div>

      {/* --- 2. OFFRES & VISIBILITE --- */}
      <h2 style={sectionTitleStyle}>2. Offre & Visibilité</h2>
      <div style={cardStyle}>
        <SwitchRow checked={enableCashback} onChange={setEnableCashback} title="Activer Cashback" subtitle="Requis pour les options Pub & Or." />
        {enableCashback && (
          <div style={{ marginTop: '15px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8' }}>Taux de Cashback (%)</label>
            <input type="number" step="0.1" min="1" max="100" value={cashbackRate} onChange={e => setCashbackRate(e.target.value)} required style={{...inputStyle, marginTop: '5px'}} />
          </div>
        )}
      </div>

      <div style={{...cardStyle, border: enableVisibilityBoost ? '1px solid #c084fc' : 'none'}}>
        <SwitchRow checked={enableVisibilityBoost} onChange={setEnableVisibilityBoost} title="Boost Visibilité (Défis)" subtitle="Apparaître en premier dans les défis." />
        {enableVisibilityBoost && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#3b0764', borderRadius: '8px' }}>
            <div style={{ color: '#d8b4fe', fontWeight: 'bold', marginBottom: '10px' }}>Multiplicateur offert : x{selectedMultiplier}</div>
            <input type="range" min="1.2" max="1.6" step="0.1" value={selectedMultiplier} onChange={e => setSelectedMultiplier(e.target.value)} style={{ width: '100%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '12px' }}>
              <span>x1.2 (4€)</span><span>x1.4 (8€)</span><span>x1.6 (10€)</span>
            </div>
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

      {/* --- SIMULATION --- */}
      <div style={{ padding: '20px', backgroundColor: '#0ea5e920', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
        <h3 style={{ color: '#0ea5e9', fontSize: '16px', marginBottom: '15px' }}>SIMULATION DES COÛTS</h3>
        <div style={simRowStyle}><span>Abonnements Fixes :</span><strong>{monthlyFixedCost.toFixed(2)} € / mois</strong></div>
        <hr style={{ borderColor: '#0ea5e950', margin: '10px 0' }}/>
        <div style={simRowStyle}><span style={{ color: '#94a3b8' }}>Pour 100€ d'achat client :</span></div>
        <div style={simRowStyle}><span>- Coût total (Cashback + Commission) :</span><strong>{variableFeePer100.toFixed(2)} €</strong></div>
      </div>

      {/* --- 3. PAIEMENT --- */}
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
// 📄 PAGE DE CRÉATION DE MAGASIN
// ==========================================
function CreateStorePage({ user }) {
  if (!user) {
    return <Navigate to="/auth" replace />; // Bloque l'accès si non connecté
  }

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto' }}>
        <h1 style={{ color: '#00bcd4', marginBottom: '10px' }}>Créer un nouveau Magasin</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: '1.5' }}>
          Ce magasin sera associé à votre compte <strong>{user.email}</strong>. L'application mobile se mettra à jour en temps réel.
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm user={user} />
        </Elements>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 APP PRINCIPALE (ROUTER)
// ==========================================
function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Écouteur global pour savoir si on est connecté ou non
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    return <div style={{ backgroundColor: '#0f172a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Chargement...</div>;
  }

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={user ? <Navigate to="/create-store" replace /> : <AuthPage />} />
        <Route path="/create-store" element={<CreateStorePage user={user} />} />
      </Routes>
    </Router>
  );
}

// ==========================================
// 🎨 STYLES CONSTANTS
// ==========================================
const navbarStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, height: '70px',
  backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '0 30px', zIndex: 1000, borderBottom: '1px solid #334155'
};
const navBrandStyle = { display: 'flex', alignItems: 'center' };
const navLinksStyle = { display: 'flex', alignItems: 'center', gap: '15px' };

const btnPrimaryStyle = {
  backgroundColor: '#00bcd4', color: 'white', padding: '10px 20px', 
  borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer'
};
const btnDangerStyle = {
  backgroundColor: 'transparent', color: '#ef4444', padding: '10px 15px', 
  borderRadius: '8px', border: '1px solid #ef4444', cursor: 'pointer', fontWeight: 'bold'
};

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