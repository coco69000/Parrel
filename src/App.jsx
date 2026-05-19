import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import backgroundVideo from './assets/background1.mp4'; 

// --- IMPORTATIONS FIREBASE ---
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
          {/* CARTE WALKMONEY PRO */}
          <div className="app-card" style={{ border: '2px solid #00bcd4', transform: 'scale(1.05)', zIndex: 10 }}>
            <h3 style={{ color: '#00bcd4' }}>WalkMoney - Espace Pro</h3>
            <span className="tag" style={{ backgroundColor: '#00bcd4' }}>Portail Commerçant</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Créez votre magasin, gérez vos offres de cashback et suivez vos statistiques. Tout est synchronisé en temps réel avec l'application de vos clients.
            </p>
            <Link to="/walkmoney/pro" className="cta-button" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              Créer mon magasin
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

// --- FORMULAIRE D'INSCRIPTION MAGASIN + STRIPE ---
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Inscription sur Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Création de la méthode de paiement Stripe depuis la carte saisie
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) throw new Error(error.message);

      // 3. Appel de TA Cloud Function 'createStripeShop' (identique au Flutter)
      const createStripeShopFunc = httpsCallable(functions, 'createStripeShop');
      const result = await createStripeShopFunc({
        paymentMethodId: paymentMethod.id,
        email: email,
        name: storeName,
        initialMonthlyCost: 0.0, // Montant initial (Abonnement Or / Boost si tu les ajoutes plus tard)
      });

      const stripeCustomerId = result.data.customerId;
      const subscriptionItemId = result.data.subscriptionItemId;

      // 4. Création du document du Magasin dans Firestore
      await addDoc(collection(db, "stores"), {
        name: storeName,
        address: address,
        description: "Bienvenue dans notre magasin !",
        coordinates: new GeoPoint(45.75, 4.85), // Coordonnées par défaut (à géocoder plus tard si besoin)
        latitude: 45.75,
        longitude: 4.85,
        phone: "",
        category: "",
        loyalty_rules: [],
        is_cashback_enabled: true,
        cashback_rate: 0.05, // 5% par défaut
        is_visibility_boost_enabled: false,
        lame_point_multiplier: 1.0,
        is_premium_ad_boost_enabled: false,
        is_gold_store_enabled: false,
        owner_id: user.uid, // CRUCIAL : Relie au MerchantDashboard de Flutter
        stripe_customer_id: stripeCustomerId,
        stripe_meter_id: subscriptionItemId,
        auto_billing_enabled: true,
        current_month_debt: 0.0,
        totalAmountSpentByUser: 0.0,
        totalCashbackGiven: 0.0,
        created_at: serverTimestamp(),
      });

      alert("🎉 Félicitations ! Votre magasin a été créé avec succès.");
      navigate('/'); // Retour à l'accueil

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Une erreur est survenue lors de la création.");
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {errorMsg && (
        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px' }}>
          {errorMsg}
        </div>
      )}

      <input type="email" placeholder="Adresse Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
      <input type="password" placeholder="Mot de passe (pour l'app mobile)" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
      <input type="text" placeholder="Nom de votre magasin" value={storeName} onChange={e => setStoreName(e.target.value)} required style={inputStyle} />
      <input type="text" placeholder="Adresse complète" value={address} onChange={e => setAddress(e.target.value)} required style={inputStyle} />
      
      <div style={{ padding: '15px', backgroundColor: '#334155', borderRadius: '8px' }}>
        <p style={{ color: 'white', marginBottom: '10px', fontSize: '14px' }}>Informations de paiement (Stripe Sécurisé)</p>
        <CardElement options={cardStyleOptions} />
      </div>

      <button type="submit" disabled={!stripe || isLoading} style={{
          padding: '15px', backgroundColor: '#00bcd4', color: 'white', fontWeight: 'bold', 
          border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '16px'
        }}>
        {isLoading ? "Création en cours..." : "S'inscrire et finaliser sur Stripe"}
      </button>
    </form>
  );
}

// --- CONTENEUR DE LA PAGE PRO ---
function WalkMoneyPro() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '50px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/" style={{ color: '#00bcd4', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Retour aux applications</Link>
        </div>
        <h1 style={{ color: '#00bcd4', marginBottom: '10px' }}>Créer un Magasin</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: '1.5' }}>
          Remplissez vos informations. Votre compte sera instantanément synchronisé sur l'application mobile WalkMoney.
        </p>

        {/* Le formulaire doit être entouré par le provider Stripe */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

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

// Styles réutilisables pour les inputs
const inputStyle = { padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white' };
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
