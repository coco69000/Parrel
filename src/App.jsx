import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// --- IMPORTATIONS FIREBASE ---
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, GeoPoint } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// --- IMPORTATIONS STRIPE ---
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// ⚠️ REMPLACE CECI PAR LA CONFIGURATION DE TON PROJET FIREBASE ⚠️
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "ton-projet.firebaseapp.com",
  projectId: "ton-projet",
  storageBucket: "ton-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// Clé publique Stripe (celle de ton application Flutter)
const stripePromise = loadStripe("pk_test_51Sf3KIJmX9VkIHA6dTDUanwaG5w8v6wwdqryF4e42PDjd2yR1RkVc5SUay2fOQVDb1vkByBW9CBFejiryPtDcFqG00sCZ9K4gE");

// --- COMPOSANT DE LA PAGE D'ACCUEIL ---
function Home() {
  return (
    <div className="app-container">
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
          {/* CARTE WALKMONEY PRO */}
          <div className="app-card" style={{ border: '2px solid #00bcd4', transform: 'scale(1.05)', zIndex: 10 }}>
            <h3 style={{ color: '#00bcd4' }}>WalkMoney - Espace Pro</h3>
            <span className="tag" style={{ backgroundColor: '#00bcd4' }}>Portail Commerçant</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Créez votre magasin, gérez vos offres de cashback et suivez vos statistiques. Tout est synchronisé en temps réel avec l'application de vos clients.
            </p>
            <Link to="/walkmoney/pro" className="cta-button" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              Accéder à l'Espace Pro
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
          <div className="app-card">
            <h3>Daytalia</h3>
            <span className="tag" style={{backgroundColor: '#ffaa00'}}>En développement</span>
            <p>Réseau social d'autobiographie. Les souvenirs restent intacts, les journées sont fragmentées pour l'IA.</p>
          </div>
          <div className="app-card">
            <h3>QuizAI / Évaluations</h3>
            <span className="tag" style={{backgroundColor: '#ffaa00'}}>En développement</span>
            <p>Plateforme permettant aux utilisateurs de créer leurs propres questions personnalisées.</p>
          </div>
          <div className="app-card">
            <h3>EcoMove</h3>
            <span className="tag" style={{backgroundColor: '#ffaa00'}}>En développement</span>
            <p>Récompenses pour déplacements durables validées par coordonnées géographiques.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- 1. FORMULAIRE D'AUTHENTIFICATION (Connexion / Inscription) ---
function AuthForm({ onUserAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Si ça marche, le onAuthStateChanged prendra le relais automatiquement dans WalkMoneyPro
    } catch (err) {
      setErrorMsg(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ color: 'white' }}>{isLogin ? "Se connecter" : "Créer un compte Pro"}</h2>
      {errorMsg && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px' }}>{errorMsg}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Adresse Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" disabled={isLoading} style={btnStyle}>
          {isLoading ? "Chargement..." : (isLogin ? "Connexion" : "Inscription")}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#00bcd4', cursor: 'pointer', marginTop: '10px' }}>
        {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
      </button>
    </div>
  );
}

// --- 2. FORMULAIRE DE CRÉATION DE MAGASIN + STRIPE ---
function StoreCreationForm({ user }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Création de la méthode de paiement Stripe depuis la carte saisie
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) throw new Error(error.message);

      // 2. Appel de la Cloud Function 'createStripeShop'
      const createStripeShopFunc = httpsCallable(functions, 'createStripeShop');
      const result = await createStripeShopFunc({
        paymentMethodId: paymentMethod.id,
        email: user.email,
        name: storeName,
        initialMonthlyCost: 0.0, 
      });

      const stripeCustomerId = result.data.customerId;
      const subscriptionItemId = result.data.subscriptionItemId;

      // 3. Création du document du Magasin dans Firestore
      await addDoc(collection(db, "stores"), {
        name: storeName,
        address: address,
        description: description || "Bienvenue dans notre magasin !",
        phone: phone,
        category: category,
        coordinates: new GeoPoint(45.75, 4.85), // Remplacer par un vrai géocodage web si besoin
        latitude: 45.75,
        longitude: 4.85,
        loyalty_rules: [],
        is_cashback_enabled: true,
        cashback_rate: 0.05, 
        is_visibility_boost_enabled: false,
        lame_point_multiplier: 1.0,
        is_premium_ad_boost_enabled: false,
        is_gold_store_enabled: false,
        owner_id: user.uid, // Relié à l'utilisateur connecté !
        stripe_customer_id: stripeCustomerId,
        stripe_meter_id: subscriptionItemId,
        auto_billing_enabled: true,
        current_month_debt: 0.0,
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h2 style={{ color: 'white', marginBottom: '10px' }}>Créer un nouveau magasin</h2>
      {errorMsg && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px' }}>{errorMsg}</div>}

      <input type="text" placeholder="Nom du magasin" value={storeName} onChange={e => setStoreName(e.target.value)} required style={inputStyle} />
      <input type="text" placeholder="Catégorie (ex: Restauration, Vêtements...)" value={category} onChange={e => setCategory(e.target.value)} required style={inputStyle} />
      <input type="text" placeholder="Adresse complète" value={address} onChange={e => setAddress(e.target.value)} required style={inputStyle} />
      <input type="tel" placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
      <textarea placeholder="Description de votre magasin" value={description} onChange={e => setDescription(e.target.value)} rows="3" style={{...inputStyle, resize: 'vertical'}} />
      
      <div style={{ padding: '15px', backgroundColor: '#334155', borderRadius: '8px', marginTop: '10px' }}>
        <p style={{ color: 'white', marginBottom: '10px', fontSize: '14px' }}>Informations de facturation (Stripe Sécurisé)</p>
        <CardElement options={cardStyleOptions} />
      </div>

      <button type="submit" disabled={!stripe || isLoading} style={{...btnStyle, marginTop: '10px', cursor: isLoading ? 'not-allowed' : 'pointer'}}>
        {isLoading ? "Création en cours..." : "Payer et créer le magasin"}
      </button>
    </form>
  );
}

// --- CONTENEUR DE LA PAGE PRO ---
function WalkMoneyPro() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (authChecking) {
    return <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Chargement...</div>;
  }

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '50px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto', backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <Link to="/" style={{ color: '#00bcd4', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Retour</Link>
          {currentUser && (
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>Déconnexion</button>
          )}
        </div>
        
        <h1 style={{ color: '#00bcd4', marginBottom: '10px' }}>WalkMoney Pro</h1>
        
        {!currentUser ? (
          <>
            <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: '1.5' }}>
              Connectez-vous ou créez votre compte commerçant pour ajouter un magasin.
            </p>
            <AuthForm />
          </>
        ) : (
          <>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.5' }}>
              Connecté en tant que <strong>{currentUser.email}</strong>. 
              Vous pouvez maintenant ajouter un magasin à votre compte.
            </p>
            {/* Le formulaire de magasin doit être entouré par le provider Stripe */}
            <Elements stripe={stripePromise}>
              <StoreCreationForm user={currentUser} />
            </Elements>
          </>
        )}

      </div>
    </div>
  );
}

// --- APP PRINCIPALE AVEC LE ROUTEUR ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/walkmoney/pro" element={<WalkMoneyPro />} />
      </Routes>
    </Router>
  );
}

// Styles réutilisables
const inputStyle = { padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white', width: '100%', boxSizing: 'border-box' };
const btnStyle = { padding: '15px', backgroundColor: '#00bcd4', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', width: '100%' };
const cardStyleOptions = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#94a3b8' },
    },
    invalid: { color: '#fa755a', iconColor: '#fa755a' },
  },
};

export default App;
