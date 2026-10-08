import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, useParams, Outlet, useLocation } from 'react-router-dom';
import './App.css';

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
function Navbar() {
  return (
    <nav style={navbarStyle}>
      <div style={navBrandStyle}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
          Parrel <span style={{ color: '#00bcd4' }}>Studio</span>
        </Link>
      </div>
      <div style={{ color: '#94a3b8', fontSize: '13px' }}>Applications créatives</div>
    </nav>
  );
}

// ==========================================
// 🏠 PAGE D'ACCUEIL
// ==========================================
function Home({ user }) {
  return (
    <div className="app-container">
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
          
          <div className="app-card" style={{ border: '2px solid #00bcd4', transform: 'scale(1.03)', zIndex: 10 }}>
            <h3 style={{ color: '#00bcd4' }}>WalkMoney - Espace Pro</h3>
            <span className="tag" style={{ backgroundColor: '#00bcd4', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Portail Commerçant</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Créez votre magasin, gérez vos offres de cashback et suivez vos statistiques. Les boutons de connexion et de création sont maintenant dans l'espace WalkMoney.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/walkmoney" style={{...btnPrimaryStyle, display: 'inline-block', textAlign: 'center', boxSizing: 'border-box', flex: 1, minWidth: '180px' }}>
                Ouvrir WalkMoney
              </Link>
              <Link to={user ? "/walkmoney/dashboard" : "/walkmoney/auth"} style={{...btnOutlineStyle, display: 'inline-block', textAlign: 'center', boxSizing: 'border-box', flex: 1, minWidth: '180px' }}>
                {user ? "Mes magasins" : "Se connecter"}
              </Link>
            </div>
          </div>

          <div className="app-card" style={{ border: '1px solid #f472b6' }}>
            <h3 style={{ color: '#f472b6' }}>Daytalia</h3>
            <span className="tag" style={{ backgroundColor: '#f472b6', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Journal personnel</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Une application pour raconter vos journées, garder vos souvenirs et retrouver vos moments importants.
            </p>
            <Link to="/daytalia" style={{...btnPrimaryStyle, display: 'inline-block', width: '100%', textAlign: 'center', boxSizing: 'border-box', backgroundColor: '#f472b6' }}>
              Ouvrir Daytalia
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
// 💼 LAYOUT WALKMONEY
// ==========================================
function WalkMoneyLayout({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '28px', borderRadius: '18px', border: '1px solid #334155', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>💼 WalkMoney</span>
              <h1 style={{ color: 'white', marginBottom: '8px' }}>Espace commerçant</h1>
              <p style={{ color: '#94a3b8', margin: 0 }}>La barre de navigation pro est maintenant intégrée à WalkMoney.</p>
            </div>
            {user && <div style={{ color: '#94a3b8', fontSize: '14px' }}>Connecté : {user.email}</div>}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '22px' }}>
            <button onClick={() => navigate('/walkmoney')} style={{ ...(isActive('/walkmoney') ? btnPrimaryStyle : btnOutlineStyle), backgroundColor: isActive('/walkmoney') ? '#00bcd4' : 'transparent' }}>
              Accueil
            </button>
            <button onClick={() => navigate(user ? '/walkmoney/dashboard' : '/walkmoney/auth')} style={{ ...(isActive('/walkmoney/auth') ? btnPrimaryStyle : btnOutlineStyle), backgroundColor: isActive('/walkmoney/auth') ? '#00bcd4' : 'transparent' }}>
              Connexion
            </button>
            <button onClick={() => navigate('/walkmoney/dashboard')} style={{ ...(isActive('/walkmoney/dashboard') ? btnPrimaryStyle : btnOutlineStyle), backgroundColor: isActive('/walkmoney/dashboard') ? '#00bcd4' : 'transparent' }}>
              Mes magasins
            </button>
            <button onClick={() => navigate('/walkmoney/create-store')} style={{ ...(isActive('/walkmoney/create-store') ? btnPrimaryStyle : btnOutlineStyle), backgroundColor: isActive('/walkmoney/create-store') ? '#00bcd4' : 'transparent' }}>
              + Créer un magasin
            </button>
            {user && (
              <button onClick={handleLogout} style={{ ...btnDangerStyle, marginLeft: 'auto' }}>
                Se déconnecter
              </button>
            )}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

// ==========================================
// 🏁 ACCUEIL WALKMONEY
// ==========================================
function WalkMoneyLanding({ user }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div className="app-card" style={{ backgroundColor: '#1e293b' }}>
        <h2 style={{ color: '#00bcd4', marginBottom: '12px' }}>Bienvenue dans WalkMoney</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '18px' }}>
          Ici se trouvent la connexion, la liste des magasins et la création d'un nouveau magasin.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(user ? '/walkmoney/dashboard' : '/walkmoney/auth')} style={btnPrimaryStyle}>
            {user ? 'Accéder à mes magasins' : 'Se connecter'}
          </button>
          <button onClick={() => navigate('/walkmoney/create-store')} style={btnOutlineStyle}>
            + Créer un magasin
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ==========================================
// 📔 DAYTALIA - PRÉSENTATION MARKETING & APP SHOWCASE
// ==========================================
function DaytaliaPage() {
  const storageKey = 'daytalia-entries';
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('Calme');
  const [dayText, setDayText] = useState('');
  const [memory, setMemory] = useState('');
  const [storeNotice, setStoreNotice] = useState('');

  useEffect(() => {
    try {
      const savedEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setEntries(Array.isArray(savedEntries) ? savedEntries : []);
    } catch {
      setEntries([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!dayText.trim() && !memory.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title.trim() || `Journal du ${new Date().toLocaleDateString('fr-FR')}`,
      mood,
      dayText,
      memory,
      createdAt: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setMood('Calme');
    setDayText('');
    setMemory('');
  };

  const handleStoreClick = (storeName) => {
    setStoreNotice(`Daytalia sera prochainement disponible en téléchargement direct sur ${storeName}. Restez à l'écoute !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const featureCards = [
    {
      icon: '📖',
      title: 'Autobiographie automatisée',
      desc: "Vos écrits quotidiens sont structurés et rédigés sous forme de véritables chapitres de livre par l'IA.",
    },
    {
      icon: '🎙️',
      title: 'Journal en direct & Dictée Vocale',
      desc: 'Racontez vos journées au micro en quelques secondes avec reformulation intelligente.',
    },
    {
      icon: '💫',
      title: 'Boîte à Souvenirs & Qualité de Vie',
      desc: 'Suivez l\'évolution de votre bien-être au fil des mois, retrouvez vos souvenirs marquants ("Ce jour-là") et recevez des conseils bienveillants.',
    },
    {
      icon: '⏳',
      title: 'Capsule Temporelle',
      desc: 'Scellez des messages secrets pour votre futur "vous", à déverrouiller dans 1 an, 5 ans ou 10 ans.',
    },
    {
      icon: '🤝',
      title: 'Partage intime & Sécurisé',
      desc: 'Partagez certaines journées avec votre cercle d\'amis ou découvrez celles du fil mondial, tout en gardant un contrôle absolu sur votre vie privée (masquage partiel de texte, mode privé).',
    },
  ];

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* Navigation retour */}
        <div style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            ← Retour aux applications Parrel
          </Link>
        </div>

        {/* HERO SECTION MARKETING */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(244, 114, 182, 0.15)', border: '1px solid rgba(244, 114, 182, 0.3)', padding: '6px 14px', borderRadius: '999px', marginBottom: '16px' }}>
            <span style={{ color: '#f472b6', fontWeight: 'bold', fontSize: '13px' }}>📔 Daytalia • Journal Intime & IA</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '0', marginBottom: '16px', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', lineHeight: 1.25, fontWeight: 800 }}>
            Daytalia — Votre journal de vie personnel, sublimé par l’Intelligence Artificielle.
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '850px', margin: '0 0 28px 0' }}>
            Racontez vos journées, préservez vos souvenirs les plus précieux et laissez l'IA rédiger automatiquement l'autobiographie de votre vie.
          </p>

          {/* 2 BOUTONS OBTENIR : PLAY STORE & APP STORE */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '18px' }}>
            
            {/* Bouton Google Play */}
            <button
              type="button"
              onClick={() => handleStoreClick('Google Play')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: '#050811',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '14px',
                border: '1px solid #475569',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f472b6'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.793 12 3.61 22.185A2.32 2.32 0 0 1 3 20.573V3.427c0-.623.23-1.192.609-1.613z" fill="#00C1A6"/>
                <path d="M17.202 8.59L13.793 12l3.41 3.41 3.865-2.222c.907-.521.907-1.854 0-2.376L17.202 8.59z" fill="#FFD100"/>
                <path d="M3.609 1.814L13.793 12l3.409-3.41-11.41-6.559c-.569-.327-1.22-.327-1.792.007l6.009 6.009z" fill="#00A0FF"/>
                <path d="M13.793 12L3.609 22.186c.572.334 1.223.334 1.792.007l11.41-6.559-3.018-3.634z" fill="#FF3333"/>
              </svg>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Disponible sur</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>Google Play</div>
              </div>
            </button>

            {/* Bouton Apple App Store */}
            <button
              type="button"
              onClick={() => handleStoreClick("l'App Store")}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: '#050811',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '14px',
                border: '1px solid #475569',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f472b6'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.05-.52 2.67-1.27z"/>
              </svg>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Télécharger dans l'</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>App Store</div>
              </div>
            </button>

          </div>

          {storeNotice && (
            <div style={{ backgroundColor: 'rgba(244, 114, 182, 0.12)', border: '1px solid rgba(244, 114, 182, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#fbcfe8', fontSize: '14px', maxWidth: '640px', marginBottom: '20px' }}>
              ℹ️ {storeNotice}
            </div>
          )}
        </div>

        {/* SECTION PRÉSENTATION (EN DESSOUS DES BOUTONS) */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(244, 114, 182, 0.35)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          marginBottom: '36px',
        }}>
          <h2 style={{ color: '#f472b6', marginTop: 0, marginBottom: '18px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🌟</span> Présentation
          </h2>
          <p style={{ color: '#e2e8f0', fontSize: '1.08rem', lineHeight: 1.8, marginBottom: '18px' }}>
            Chaque jour qui passe forge votre histoire. Daytalia est bien plus qu'un simple journal intime : c'est un sanctuaire personnel et un compagnon de vie intelligent qui donne du sens à votre quotidien.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.8, margin: 0 }}>
            Que ce soit par écrit ou par dictée vocale instantanée, racontez ce que vous vivez, ajoutez des photos, capturez vos ressentis et notez vos journées. Au fil du temps, notre moteur d’intelligence artificielle analyse vos moments clés, classe vos thèmes biographiques et tisse automatiquement les chapitres de votre propre autobiographie, prête à être imprimée ou exportée.
          </p>
        </div>

        {/* SECTION FONCTIONNALITÉS CLÉS */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ color: 'white', marginBottom: '22px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚡</span> Fonctionnalités clés
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {featureCards.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #334155',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ fontSize: '30px' }}>{feat.icon}</div>
                <h3 style={{ color: '#f472b6', margin: 0, fontSize: '1.2rem' }}>{feat.title}</h3>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.96rem', lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION DOCUMENTS LÉGAUX ET CONFIDENTIALITÉ */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '18px',
          padding: '26px 30px',
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <h3 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1.2rem' }}>
              🛡️ Transparence, RGPD &amp; Protection de vos données
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '600px' }}>
              Consultez notre politique de confidentialité détaillée et nos conditions générales d’utilisation conformes aux directives d'Apple et Google Play.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#f472b6', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/terms" style={{ ...btnOutlineStyle, borderColor: '#f472b6', color: '#f472b6' }}>
              Conditions Générales (EULA)
            </Link>
          </div>
        </div>

        {/* SECTION APERÇU / CARNET LOCAL (DÉMO INTERACTIVE) */}
        <div style={{ marginTop: '20px' }}>
          <details style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '18px 24px' }}>
            <summary style={{ color: '#f472b6', fontWeight: 'bold', fontSize: '1.05rem', cursor: 'pointer', outline: 'none' }}>
              ✍️ Tester la démo interactive du carnet de notes local (Navigateur)
            </summary>
            
            <div style={{ marginTop: '24px' }}>
              <p style={{ color: '#94a3b8', marginTop: 0, marginBottom: '18px', fontSize: '14px' }}>
                Cet aperçu local vous permet d'écrire des notes sauvegardées temporairement dans le stockage local de votre navigateur.
              </p>

              <div style={{ display: 'grid', gap: '24px' }}>
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
                  <div style={{ display: 'grid', gap: '14px' }}>
                    <input type="text" placeholder="Titre de la journée" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                    <select value={mood} onChange={(e) => setMood(e.target.value)} style={inputStyle}>
                      <option>Calme</option>
                      <option>Heureux</option>
                      <option>Fatigué</option>
                      <option>Inspiré</option>
                      <option>Triste</option>
                    </select>
                    <textarea placeholder="Décrivez votre journée" value={dayText} onChange={(e) => setDayText(e.target.value)} style={{ ...inputStyle, height: '120px', resize: 'vertical' }} />
                    <textarea placeholder="Un souvenir à garder" value={memory} onChange={(e) => setMemory(e.target.value)} style={{ ...inputStyle, height: '100px', resize: 'vertical' }} />
                    <button type="submit" style={{ ...btnPrimaryStyle, backgroundColor: '#f472b6' }}>Sauvegarder l'entrée</button>
                  </div>
                </form>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {entries.length === 0 ? (
                    <div className="app-card" style={{ backgroundColor: '#0f172a' }}>
                      <p style={{ color: '#94a3b8', margin: 0 }}>Aucune histoire enregistrée pour le moment.</p>
                    </div>
                  ) : (
                    entries.map((entry) => (
                      <article key={entry.id} className="app-card" style={{ backgroundColor: '#0f172a' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                          <h3 style={{ color: '#f472b6', margin: 0 }}>{entry.title}</h3>
                          <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{new Date(entry.createdAt).toLocaleString('fr-FR')}</span>
                        </div>
                        <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '12px' }}>Humeur : {entry.mood}</div>
                        <p style={{ color: '#e2e8f0', marginTop: 0, whiteSpace: 'pre-wrap' }}>{entry.dayText}</p>
                        {entry.memory && (
                          <div style={{ marginTop: '16px', padding: '14px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                            <div style={{ color: '#f472b6', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Souvenir</div>
                            <p style={{ color: '#cbd5e1', margin: 0, whiteSpace: 'pre-wrap' }}>{entry.memory}</p>
                          </div>
                        )}
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>
          </details>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 🔒 PAGE : POLITIQUE DE CONFIDENTIALITÉ (/privacy)
// ==========================================
function PrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/daytalia" style={{ color: '#f472b6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à Daytalia
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#f472b6', color: 'white' }}>Daytalia</span>
            <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>Conformité RGPD &amp; Stores</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — Daytalia
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : Mai 2024
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>
          
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            La présente Politique de Confidentialité décrit la manière dont Daytalia ("nous", "notre", "l'Application") collecte, utilise, stocke et protège vos données personnelles lorsque vous utilisez notre application mobile et nos services, conformément au Règlement Général sur la Protection des Données (RGPD) et aux réglementations internationales relatives à la protection de la vie privée.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>
            
            <section>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>1. Responsable du traitement</h2>
              <p style={{ margin: '0 0 10px 0' }}>
                Le traitement des données est assuré par l'équipe de développement de Daytalia.
              </p>
              <p style={{ margin: 0 }}>
                Contact pour toute question relative à vos données : <strong style={{ color: '#ffffff' }}>contact@daytalia.com</strong> (ou votre email de contact).
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '12px' }}>2. Données personnelles collectées</h2>
              <p style={{ marginBottom: '14px' }}>
                Nous collectons uniquement les données nécessaires au bon fonctionnement de l'application :
              </p>
              
              <div style={{ display: 'grid', gap: '14px', paddingLeft: '8px' }}>
                <div>
                  <strong style={{ color: '#ffffff' }}>1. Données de compte et d'identification :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li>Numéro de téléphone (utilisé exclusivement pour l'authentification sécurisée par SMS).</li>
                    <li>Nom complet, nom d'utilisateur (pseudo) et date de naissance.</li>
                    <li>Photo de profil (optionnelle).</li>
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#ffffff' }}>2. Contenus créés par l'utilisateur (UGC) :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li>Récits de journées, souvenirs, notes, commentaires et réactions.</li>
                    <li>Photographies importées pour illustrer vos récits.</li>
                    <li>Messages enregistrés dans la fonction "Capsule Temporelle".</li>
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#ffffff' }}>3. Données audio et vocales :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li>Les enregistrements vocaux effectués lors de l'utilisation de la dictée vocale sont transcrits en texte. Aucun enregistrement audio brut n'est conservé de façon permanente.</li>
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#ffffff' }}>4. Contacts téléphoniques (Optionnel) :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li>Si vous y consentez expressément, l'application analyse les numéros de votre répertoire de façon hachée et sécurisée afin d'identifier vos amis déjà inscrits sur Daytalia. Vos contacts ne sont ni vendus, ni cédés, ni utilisés à des fins publicitaires.</li>
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#ffffff' }}>5. Données d'achats et abonnements :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li>Identifiant d'abonné, statut de l'abonnement VIP et historique de transaction (géré par RevenueCat, l'App Store et Google Play). Nous n'avons jamais accès à vos coordonnées bancaires.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '12px' }}>3. Finalités du traitement des données</h2>
              <p style={{ marginBottom: '10px' }}>Vos données sont collectées pour :</p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1' }}>
                <li>Vous permettre de créer, éditer et synchroniser votre journal personnel et vos souvenirs.</li>
                <li>Générer automatiquement des synthèses et chapitres biographiques à votre demande via nos algorithmes d'IA.</li>
                <li>Vous permettre d'interagir avec vos amis et gérer votre niveau de confidentialité (public, privé, masquer à certains contacts).</li>
                <li>Envoyer des notifications relatives à l'activité de votre compte (souvenirs d'il y a un an, demandes d'amis, interactions).</li>
                <li>Assurer la modération et la sécurité de la communauté (signalements, blocages).</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '12px' }}>4. Sous-traitants et partenaires tiers</h2>
              <p style={{ marginBottom: '10px' }}>
                Pour fournir nos services, nous faisons appel à des prestataires de confiance conformes aux standards de sécurité les plus stricts :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1' }}>
                <li><strong style={{ color: '#ffffff' }}>Google Firebase (Google Cloud) :</strong> Authentification, hébergement de la base de données Firestore et stockage sécurisé des photos.</li>
                <li><strong style={{ color: '#ffffff' }}>RevenueCat :</strong> Gestion et validation des abonnements intégrés (App Store et Google Play Store).</li>
                <li><strong style={{ color: '#ffffff' }}>OneSignal &amp; Firebase Cloud Messaging :</strong> Acheminement des notifications push.</li>
                <li><strong style={{ color: '#ffffff' }}>API d'Intelligence Artificielle (SiliconFlow / Modèles LLM) :</strong> Traitement textuel anonymisé pour l'assistance à la rédaction de l'autobiographie et les conseils bienveillants. Aucune donnée d'entraînement commercial n'est revendue.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>5. Durée de conservation des données</h2>
              <p style={{ margin: '0 0 10px 0' }}>
                Vos données sont conservées tant que votre compte est actif.
              </p>
              <p style={{ margin: 0, color: '#f472b6', fontWeight: 'bold' }}>
                Si vous décidez de supprimer votre compte, l'ensemble de vos données (profil, photos, journées, souvenirs, capsules, autobiographie) est immédiatement et définitivement effacé de nos serveurs de production.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '12px' }}>6. Vos droits (Conformité RGPD)</h2>
              <p style={{ marginBottom: '10px' }}>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1' }}>
                <li><strong style={{ color: '#ffffff' }}>Droit d'accès et de rectification :</strong> Vous pouvez consulter et modifier vos informations à tout moment depuis votre profil.</li>
                <li><strong style={{ color: '#ffffff' }}>Droit à l'effacement ("Droit à l'oubli") :</strong> Vous pouvez supprimer définitivement votre compte et toutes vos données en cliquant sur "Supprimer mon compte" dans les paramètres de l'application.</li>
                <li><strong style={{ color: '#ffffff' }}>Droit à la limitation et d'opposition :</strong> Vous pouvez vous opposer au partage de vos données ou désactiver les notifications push depuis les paramètres.</li>
                <li><strong style={{ color: '#ffffff' }}>Droit à la portabilité :</strong> Vous pouvez exporter vos chapitres et données sous forme de document PDF/Word.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>7. Sécurité des données</h2>
              <p style={{ margin: 0 }}>
                Toutes les communications entre votre téléphone et nos serveurs sont chiffrées selon les protocoles sécurisés HTTPS / TLS. Les accès à la base de données sont régis par des règles de sécurité Firebase strictes ne permettant qu'à l'utilisateur propriétaire d'accéder à ses données privées.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>8. Contact</h2>
              <p style={{ margin: '0 0 6px 0' }}>Pour exercer vos droits ou pour toute question relative à cette politique :</p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#ffffff' }}>Email :</strong> <a href="mailto:contact@daytalia.com" style={{ color: '#f472b6', textDecoration: 'none' }}>contact@daytalia.com</a>
              </p>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/terms" style={{ ...btnPrimaryStyle, backgroundColor: '#f472b6' }}>
              Voir les Conditions Générales (EULA) →
            </Link>
            <Link to="/" style={btnOutlineStyle}>
              Retour à l’accueil
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📜 PAGE : CONDITIONS GÉNÉRALES & EULA (/terms)
// ==========================================
function TermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/daytalia" style={{ color: '#f472b6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à Daytalia
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#f472b6', color: 'white' }}>Daytalia</span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Contrat EULA &amp; CGU</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation et Contrat de Licence d'Utilisateur Final (EULA) — Daytalia
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            En vigueur au : Mai 2024
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>
          
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            Bienvenue sur Daytalia. En téléchargeant, installant ou utilisant l'application mobile Daytalia, vous acceptez sans réserve d'être lié par les présentes Conditions Générales d'Utilisation (ci-après le "Contrat"). Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser l'application.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>
            
            <section>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>1. Admissibilité et Âge Minimum</h2>
              <p style={{ margin: 0 }}>
                L'accès à l'application est réservé aux personnes âgées d'au moins <strong style={{ color: '#ffffff' }}>13 ans</strong> (ou l'âge de consentement numérique en vigueur dans votre pays de résidence). En utilisant Daytalia, vous certifiez respecter cette condition.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>2. Règles de Conduite et Tolérance Zéro (UGC - Contenu Généré par les Utilisateurs)</h2>
              <p style={{ marginBottom: '10px' }}>
                Daytalia propose des fonctionnalités communautaires (fil d'actualité, commentaires, profils publics).
              </p>
              <p style={{ color: '#ef4444', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                Nous appliquons une politique de tolérance zéro envers les comportements nuisibles et les contenus répréhensibles.
              </p>
              <p style={{ marginBottom: '8px' }}>Il est strictement interdit de publier, partager ou transmettre sur Daytalia :</p>
              <ul style={{ margin: '0 0 14px 20px', color: '#cbd5e1' }}>
                <li>Tout contenu à caractère diffamatoire, injurieux, haineux, raciste, homophobe, violent ou menaçant.</li>
                <li>Tout contenu pornographique, sexuellement explicite ou faisant l'apologie d'actes illégaux.</li>
                <li>Des actes de harcèlement, d'intimidation ou d'atteinte à la vie privée d'autrui.</li>
                <li>Des spams, publicités non autorisées ou faux profils d'usurpation d'identité.</li>
              </ul>
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '12px 16px' }}>
                <strong style={{ color: '#f87171' }}>Sanctions : </strong>
                <span>Tout contenu enfreignant ces règles sera supprimé sans préavis. Tout utilisateur enfreignant ces règles s'expose à la <strong>suspension immédiate et définitive de son compte</strong>.</span>
              </div>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>3. Modération, Signalement et Blocage</h2>
              <p style={{ marginBottom: '10px' }}>Conformément aux directives de l'App Store et du Google Play Store :</p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1' }}>
                <li><strong style={{ color: '#ffffff' }}>Signalement :</strong> Tout utilisateur peut signaler un post, un commentaire ou un utilisateur suspect à tout moment via le bouton "Signaler". Les signalements sont traités par notre équipe sous 24 heures.</li>
                <li><strong style={{ color: '#ffffff' }}>Blocage :</strong> Tout utilisateur peut bloquer un autre utilisateur directement depuis son profil. Le blocage a pour effet immédiat de masquer l'ensemble des publications, profils et commentaires de la personne bloquée.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>4. Fonctionnalités d'Intelligence Artificielle</h2>
              <p style={{ marginBottom: '10px' }}>
                Daytalia intègre des outils d'assistance propulsés par l'intelligence artificielle pour reformuler vos récits, vous proposer des synthèses et composer des chapitres biographiques.
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1' }}>
                <li>Vous reconnaissez que l'IA fournit des suggestions automatisées et peut occasionnellement générer des inexactitudes.</li>
                <li>Vous demeurez le seul auteur et responsable légal des contenus finaux enregistrés et partagés sur votre compte.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>5. Abonnements VIP et Achats Intégrés</h2>
              <p style={{ marginBottom: '10px' }}>
                Daytalia propose une version d'accès gratuit et une formule d'abonnement payante optionnelle intitulée <strong style={{ color: '#f472b6' }}>"VIP Daytalia"</strong>, conférant des fonctionnalités avancées (génération IA enrichie, personnalisations exclusives, etc.).
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1' }}>
                <li><strong style={{ color: '#ffffff' }}>Paiement :</strong> Le montant de l'abonnement est débité sur votre compte Apple ID ou Google Play lors de la confirmation d'achat.</li>
                <li><strong style={{ color: '#ffffff' }}>Renouvellement automatique :</strong> L'abonnement est renouvelé automatiquement, à moins que le renouvellement automatique ne soit désactivé au moins 24 heures avant la fin de la période de facturation en cours.</li>
                <li><strong style={{ color: '#ffffff' }}>Gestion et Résiliation :</strong> Vous pouvez gérer ou annuler votre abonnement à tout moment dans les réglages de votre compte App Store ou Google Play Store.</li>
                <li><strong style={{ color: '#ffffff' }}>Restauration :</strong> Vous pouvez restaurer vos achats actifs sur un nouvel appareil à l'aide du bouton "Restaurer les achats" situé dans le menu VIP de l'application.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>6. Propriété Intellectuelle et Droits d'Auteur</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1' }}>
                <li><strong style={{ color: '#ffffff' }}>Vos contenus :</strong> Vous conservez l'entière propriété intellectuelle des textes, récits et photographies que vous publiez sur Daytalia.</li>
                <li><strong style={{ color: '#ffffff' }}>Nos contenus :</strong> La marque Daytalia, son design, son logo, ses illustrations et son code informatique sont la propriété exclusive de Daytalia et ne peuvent être copiés ou reproduits sans notre accord écrit.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>7. Résiliation et Suppression de Compte</h2>
              <p style={{ margin: 0 }}>
                Vous êtes libre d'interrompre l'utilisation du service à tout moment. Vous pouvez initier vous-même la suppression complète et irréversible de votre compte directement dans l'application via : <br />
                <em style={{ color: '#cbd5e1' }}>Profil &gt; Paramètres &gt; Supprimer mon compte</em>.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>8. Limitation de Responsabilité</h2>
              <p style={{ margin: 0 }}>
                Daytalia s'efforce de maintenir un service accessible 24h/24 et 7j/7 mais ne saurait être tenu responsable des pannes de réseau, des interruptions temporaires de service ou de la perte de données imputable à un cas de force majeure. Nous vous encourageons à exporter régulièrement votre autobiographie aux formats PDF/Word mis à votre disposition.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>9. Loi Applicable et Juridiction</h2>
              <p style={{ margin: 0 }}>
                Les présentes conditions sont régies par le droit français. En cas de litige, les tribunaux compétents seront ceux du ressort de la cour d'appel dont dépend le siège du gestionnaire du service.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f472b6', fontSize: '1.25rem', marginBottom: '10px' }}>10. Contact</h2>
              <p style={{ margin: '0 0 6px 0' }}>Pour toute question concernant les présentes conditions :</p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#ffffff' }}>Email :</strong> <a href="mailto:contact@daytalia.com" style={{ color: '#f472b6', textDecoration: 'none' }}>contact@daytalia.com</a>
              </p>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#f472b6' }}>
              Voir la Politique de Confidentialité →
            </Link>
            <Link to="/" style={btnOutlineStyle}>
              Retour à l’accueil
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📄 PAGES LÉGALES PAR APPLICATION
// ==========================================
const legalApps = {
  walkmoney: {
    name: 'WalkMoney',
    label: 'WalkMoney - Espace Pro',
    color: '#00bcd4'
  },
  daytalia: {
    name: 'Daytalia',
    label: 'Daytalia',
    color: '#f472b6'
  },
  projetcalo: {
    name: 'ProjetCalo',
    label: 'ProjetCalo',
    color: '#38bdf8'
  },
  playfun: {
    name: 'Playfun',
    label: 'Playfun',
    color: '#f59e0b'
  },
};

function LegalPage({ type }) {
  const { appSlug } = useParams();

  // Si l'application demandée est Daytalia, afficher la politique ou les conditions officielles complètes
  if (appSlug === 'daytalia') {
    return type === 'privacy' ? <PrivacyPolicyPage /> : <TermsOfServicePage />;
  }

  const appInfo = legalApps[appSlug] || legalApps.walkmoney;
  const isPrivacy = type === 'privacy';

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '28px', borderRadius: '18px', border: '1px solid #334155' }}>
          <span className="badge" style={{ backgroundColor: appInfo.color, color: 'white' }}>{appInfo.name}</span>
          <h1 style={{ color: 'white', marginTop: '16px', marginBottom: '10px' }}>
            {isPrivacy ? 'Politique de confidentialité' : 'Conditions d’utilisation'}
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
            Version dédiée à {appInfo.label}.
          </p>

          <div style={{ display: 'grid', gap: '18px', color: '#e2e8f0', lineHeight: 1.7 }}>
            <section style={cardStyle}>
              <h2 style={{ color: appInfo.color, marginBottom: '10px' }}>Résumé</h2>
              <p style={{ margin: 0 }}>
                {isPrivacy
                  ? `Cette page explique comment ${appInfo.name} collecte, utilise et protège vos données.`
                  : `Cette page décrit les règles d'utilisation de ${appInfo.name} et les responsabilités de l'utilisateur.`}
              </p>
            </section>

            <section style={cardStyle}>
              <h2 style={{ color: appInfo.color, marginBottom: '10px' }}>Données et sécurité</h2>
              <p style={{ marginBottom: 0 }}>
                {isPrivacy
                  ? `Nous limitons la collecte aux données nécessaires au fonctionnement de ${appInfo.name}. Les informations ne sont partagées qu'avec les services indispensables au service.`
                  : `L'accès doit rester conforme aux règles de ${appInfo.name}. L'utilisateur s'engage à utiliser la plateforme de manière légale, respectueuse et sécurisée.`}
              </p>
            </section>

            <section style={cardStyle}>
              <h2 style={{ color: appInfo.color, marginBottom: '10px' }}>Contact</h2>
              <p style={{ margin: 0 }}>
                Pour toute question, écrivez à contact@parrelstudio.com.
              </p>
            </section>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link to="/" style={btnOutlineStyle}>Retour à l’accueil</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegalIndexPage({ type }) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Politique de confidentialité' : 'Conditions d’utilisation';

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '28px', borderRadius: '18px', border: '1px solid #334155' }}>
          <h1 style={{ color: 'white', marginBottom: '10px' }}>{title}</h1>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
            Choisissez l'application concernée.
          </p>

          <div style={{ display: 'grid', gap: '16px' }}>
            {Object.entries(legalApps).map(([slug, appInfo]) => (
              <div key={slug} className="app-card" style={{ backgroundColor: '#0f172a' }}>
                <h3 style={{ color: appInfo.color, marginTop: 0 }}>{appInfo.label}</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link to={slug === 'daytalia' ? '/privacy' : `/${slug}/politique-de-confidentialite`} style={btnPrimaryStyle}>
                    Confidentialité
                  </Link>
                  <Link to={slug === 'daytalia' ? '/terms' : `/${slug}/conditions-dutilisation`} style={btnOutlineStyle}>
                    Conditions d’utilisation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer style={siteFooterStyle}>
      <div style={siteFooterInnerStyle}>
        <div style={{ color: '#cbd5e1' }}>© 2026 Parrel Studio</div>
        <div style={siteFooterLinksStyle}>
          <Link to="/privacy" style={siteFooterLinkStyle}>Politique de confidentialité</Link>
          <Link to="/terms" style={siteFooterLinkStyle}>Conditions Générales (EULA)</Link>
        </div>
      </div>
    </footer>
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

  if (user) return <Navigate to="/walkmoney/dashboard" replace />;

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
      navigate('/walkmoney/dashboard');
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

  if (!user) return <Navigate to="/walkmoney/auth" replace />;
  if (loading) return <div style={pageStyle}>Chargement de votre espace...</div>;

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#00bcd4', marginBottom: '20px' }}>Espace Commerçant : Mes Magasins</h1>
        
        {stores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#1e293b', borderRadius: '12px' }}>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>Vous n'avez pas encore de magasin</h2>
            <Link to="/walkmoney/create-store" style={btnPrimaryStyle}>+ Créer mon premier magasin</Link>
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
                <button onClick={() => navigate(`/walkmoney/edit-store/${store.id}`)} style={{...btnOutlineStyle, flex: 1}}>✏️ Modifier</button>
                <button onClick={() => navigate(`/walkmoney/stats/${store.id}`)} style={{...btnOutlineStyle, flex: 1}}>📊 Statistiques</button>
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
      navigate('/walkmoney/dashboard');

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
  if (!user) return <Navigate to="/walkmoney/auth" replace />;

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
      navigate('/walkmoney/dashboard');
    } catch(err) {
      alert("Erreur: " + err.message);
    }
  };

  if (!store) return <div style={pageStyle}>Chargement...</div>;

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '12px' }}>
        <button onClick={() => navigate('/walkmoney/dashboard')} style={{ background: 'none', color: '#00bcd4', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>&larr; Retour</button>
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
        <button onClick={() => navigate('/walkmoney/dashboard')} style={{ background: 'none', color: '#00bcd4', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>&larr; Retour au Dashboard</button>
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/walkmoney" element={<WalkMoneyLayout user={user} />}>
          <Route index element={<WalkMoneyLanding user={user} />} />
          <Route path="auth" element={<AuthPage user={user} />} />
          <Route path="dashboard" element={<MerchantDashboard user={user} />} />
          <Route path="create-store" element={<CreateStorePage user={user} />} />
          <Route path="edit-store/:storeId" element={<EditStorePage user={user} />} />
          <Route path="stats/:storeId" element={<StoreStatsPage user={user} />} />
        </Route>
        <Route path="/daytalia" element={<DaytaliaPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/daytalia/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/daytalia/terms" element={<TermsOfServicePage />} />
        <Route path="/daytalia/politique-de-confidentialite" element={<PrivacyPolicyPage />} />
        <Route path="/daytalia/conditions-dutilisation" element={<TermsOfServicePage />} />
        <Route path="/legal/politique-de-confidentialite" element={<LegalIndexPage type="privacy" />} />
        <Route path="/legal/conditions-dutilisation" element={<LegalIndexPage type="terms" />} />
        <Route path="/pro/auth" element={<Navigate to="/walkmoney/auth" replace />} />
        <Route path="/pro/dashboard" element={<Navigate to="/walkmoney/dashboard" replace />} />
        <Route path="/pro/create-store" element={<Navigate to="/walkmoney/create-store" replace />} />
        <Route path="/pro/edit-store/:storeId" element={<Navigate to="/walkmoney/dashboard" replace />} />
        <Route path="/pro/stats/:storeId" element={<Navigate to="/walkmoney/dashboard" replace />} />
        <Route path="/:appSlug/politique-de-confidentialite" element={<LegalPage type="privacy" />} />
        <Route path="/:appSlug/conditions-dutilisation" element={<LegalPage type="terms" />} />
      </Routes>
      <SiteFooter />
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
const siteFooterStyle = { borderTop: '1px solid #334155', marginTop: '40px', padding: '20px 20px 30px', backgroundColor: '#0f172a' };
const siteFooterInnerStyle = { maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' };
const siteFooterLinksStyle = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
const siteFooterLinkStyle = { color: '#94a3b8', textDecoration: 'none', fontSize: '14px' };

export default App;