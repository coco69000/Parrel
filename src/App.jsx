import React, { useState, useEffect } from 'react';
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
// Remplace ton bloc firebaseConfig dans App.jsx par celui-ci :
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

// --- FORMULAIRE COMPLET MAGASIN (Miroir de AddStoreScreen Flutter) ---
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // 1. Infos Générales
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  // Met à jour la simulation en temps réel (comme dans Flutter)
  useEffect(() => {
    let fixedCost = 0.0;
    
    // Règle: Si le cashback est désactivé, on coupe la Pub et l'Or
    if (!enableCashback) {
      setEnablePremiumAdBoost(false);
      setEnableGoldStore(false);
    }

    // Coût Slider Boost
    if (enableVisibilityBoost) {
      // Logique Flutter : clampé de 2€ à 10€
      const step = Math.round((selectedMultiplier - 1.1) * 10);
      let sliderCost = step * 2.0;
      if (sliderCost < 2.0) sliderCost = 2.0;
      if (sliderCost > 10.0) sliderCost = 10.0;
      fixedCost += sliderCost;
    }

    // Coût Or
    if (enableGoldStore && enableCashback) {
      fixedCost += 5.0;
    }

    // Commission Variable
    const rate = enableCashback ? parseFloat(cashbackRate || 0) : 0.0;
    const commissionPercent = enablePremiumAdBoost ? 0.40 : 0.25;
    const fee = rate * commissionPercent;

    setMonthlyFixedCost(fixedCost);
    setVariableFeePer100(rate + fee);
  }, [enableCashback, cashbackRate, enableVisibilityBoost, selectedMultiplier, enablePremiumAdBoost, enableGoldStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Inscription Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) throw new Error(error.message);

      // 3. Fonction Firebase
      const createStripeShopFunc = httpsCallable(functions, 'createStripeShop');
      const result = await createStripeShopFunc({
        paymentMethodId: paymentMethod.id,
        email: email,
        name: storeName,
        initialMonthlyCost: monthlyFixedCost,
      });

      const stripeCustomerId = result.data.customerId;
      const subscriptionItemId = result.data.subscriptionItemId;

      // 4. Géocodage Nominatim (Comme sur l'app)
      let lat = 48.8566; // Fallback Paris
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

      // 5. Sauvegarde Firestore
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

        owner_id: user.uid,
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
        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px' }}>
          {errorMsg}
        </div>
      )}

      {/* --- 1. INFOS GENERALES --- */}
      <h2 style={sectionTitleStyle}>1. Informations Générales</h2>
      <div style={cardStyle}>
        <input type="email" placeholder="Adresse Email (de connexion)" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <hr style={{ borderColor: '#334155', margin: '15px 0' }}/>
        <input type="text" placeholder="Nom du magasin" value={storeName} onChange={e => setStoreName(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Adresse complète" value={address} onChange={e => setAddress(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Catégorie (ex: Boulangerie, Sport...)" value={category} onChange={e => setCategory(e.target.value)} required style={inputStyle} />
        <input type="tel" placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} required style={inputStyle} />
        <textarea placeholder="Description du magasin" value={description} onChange={e => setDescription(e.target.value)} style={{...inputStyle, height: '80px', resize: 'none'}} />
      </div>

      {/* --- 2. OFFRES & VISIBILITE --- */}
      <h2 style={sectionTitleStyle}>2. Offre & Visibilité</h2>

      {/* A. Cashback */}
      <div style={cardStyle}>
        <SwitchRow 
          checked={enableCashback} 
          onChange={setEnableCashback} 
          title="Activer Cashback" 
          subtitle="Requis pour les options Pub & Or."
        />
        {enableCashback && (
          <div style={{ marginTop: '15px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8' }}>Taux de Cashback (%)</label>
            <input type="number" step="0.1" min="1" max="100" value={cashbackRate} onChange={e => setCashbackRate(e.target.value)} required style={{...inputStyle, marginTop: '5px'}} />
          </div>
        )}
      </div>

      {/* B. Boost Indépendant (Défis) */}
      <div style={{...cardStyle, border: enableVisibilityBoost ? '1px solid #c084fc' : 'none'}}>
        <SwitchRow 
          checked={enableVisibilityBoost} 
          onChange={setEnableVisibilityBoost} 
          title="Boost Visibilité (Défis)" 
          subtitle="Apparaître en premier dans les défis."
        />
        {enableVisibilityBoost && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#3b0764', borderRadius: '8px' }}>
            <div style={{ color: '#d8b4fe', fontWeight: 'bold', marginBottom: '10px' }}>Multiplicateur offert : x{selectedMultiplier}</div>
            <input 
              type="range" 
              min="1.2" max="1.6" step="0.1" 
              value={selectedMultiplier} 
              onChange={e => setSelectedMultiplier(e.target.value)} 
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '12px' }}>
              <span>x1.2 (4€)</span>
              <span>x1.4 (8€)</span>
              <span>x1.6 (10€)</span>
            </div>
          </div>
        )}
      </div>

      {/* C. Options Avancées (Pub/Or) */}
      <div style={cardStyle}>
        {enableCashback ? (
          <>
            <SwitchRow 
              checked={enablePremiumAdBoost} 
              onChange={setEnablePremiumAdBoost} 
              title="Sponsoriser Boost Pub" 
              subtitle="Gains x2 pour clients. Com passe à 40%."
            />
            <hr style={{ borderColor: '#334155', margin: '15px 0' }}/>
            <SwitchRow 
              checked={enableGoldStore} 
              onChange={setEnableGoldStore} 
              title="Visibilité Or + 1%" 
              subtitle="Carte Or + 1% de cashback offert (5€/mois)."
            />
          </>
        ) : (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>Activez le Cashback pour débloquer les options Pub et Or.</p>
        )}
      </div>

      {/* SIMULATION */}
      <div style={{ padding: '20px', backgroundColor: '#0ea5e920', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
        <h3 style={{ color: '#0ea5e9', fontSize: '16px', marginBottom: '15px' }}>SIMULATION DES COÛTS</h3>
        <div style={simRowStyle}>
          <span>Abonnements Fixes :</span>
          <strong>{monthlyFixedCost.toFixed(2)} € / mois</strong>
        </div>
        <hr style={{ borderColor: '#0ea5e950', margin: '10px 0' }}/>
        <div style={simRowStyle}>
          <span style={{ color: '#94a3b8' }}>Pour 100€ d'achat client :</span>
        </div>
        <div style={simRowStyle}>
          <span>- Coût total (Cashback + Commission) :</span>
          <strong>{variableFeePer100.toFixed(2)} €</strong>
        </div>
        {enableGoldStore && (
          <p style={{ marginTop: '10px', fontSize: '11px', color: '#10b981', fontStyle: 'italic' }}>
            Note: Avec l'option Or, le client reçoit 1% de plus (payé par EcoNav).
          </p>
        )}
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
          border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '16px',
          marginTop: '10px'
        }}>
        {isLoading ? "Création en cours..." : "Valider et Payer"}
      </button>
    </form>
  );
}

// Helper composant Switch
const SwitchRow = ({ checked, onChange, title, subtitle }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)} 
      style={{ width: '22px', height: '22px', accentColor: '#10b981' }}
    />
    <div>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>{title}</div>
      <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '3px' }}>{subtitle}</div>
    </div>
  </label>
);

// --- CONTENEUR PAGE PRO ---
function WalkMoneyPro() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '50px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/" style={{ color: '#00bcd4', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Retour</Link>
        </div>
        <h1 style={{ color: '#00bcd4', marginBottom: '10px' }}>Espace Commerçant</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: '1.5' }}>
          Paramétrez votre magasin et vos offres. L'application mobile se mettra à jour en temps réel pour tous les utilisateurs EcoNav.
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

      </div>
    </div>
  );
}

// --- APP PRINCIPALE ---
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

// --- STYLES CONSTANTS ---
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