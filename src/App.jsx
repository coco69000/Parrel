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
            <h3 style={{ color: '#00bcd4' }}>EcoNav / WalkMoney</h3>
            <span className="tag" style={{ backgroundColor: '#00bcd4', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Navigation GPS &amp; Mobilité Récompensée</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Transformez chacun de vos pas et coups de pédale en récompenses réelles : navigation cinématique 60 FPS, points « Lames », cashback IA en magasin et boutique solidaire.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/walkmoney" style={{ ...btnPrimaryStyle, display: 'inline-block', textAlign: 'center', boxSizing: 'border-box', flex: 1, minWidth: '180px' }}>
                Ouvrir EcoNav / WalkMoney
              </Link>
              <Link to={user ? "/walkmoney/dashboard" : "/walkmoney/auth"} style={{ ...btnOutlineStyle, display: 'inline-block', textAlign: 'center', boxSizing: 'border-box', flex: 1, minWidth: '180px' }}>
                {user ? "Mes magasins" : "Espace Commerçant"}
              </Link>
            </div>
          </div>

          <div className="app-card" style={{ border: '1px solid #f472b6' }}>
            <h3 style={{ color: '#f472b6' }}>Daytalia</h3>
            <span className="tag" style={{ backgroundColor: '#f472b6', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Journal personnel</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Une application pour raconter vos journées, garder vos souvenirs et retrouver vos moments importants.
            </p>
            <Link to="/daytalia" style={{ ...btnPrimaryStyle, display: 'inline-block', width: '100%', textAlign: 'center', boxSizing: 'border-box', backgroundColor: '#f472b6' }}>
              Ouvrir Daytalia
            </Link>
          </div>

          <div className="app-card" style={{ border: '1px solid #8b5cf6' }}>
            <h3 style={{ color: '#8b5cf6' }}>QuizBot</h3>
            <span className="tag" style={{ backgroundColor: '#8b5cf6', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Quiz IA &amp; Culture G</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Transformez n'importe quel texte en jeu interactif grâce à l'IA. Plus de 15 mini-jeux, multijoueur en direct et calcul de QI culturel.
            </p>
            <Link to="/quizbot" style={{ ...btnPrimaryStyle, display: 'inline-block', width: '100%', textAlign: 'center', boxSizing: 'border-box', backgroundColor: '#8b5cf6' }}>
              Ouvrir QuizBot
            </Link>
          </div>

          <div className="app-card" style={{ border: '1px solid #ef4444' }}>
            <h3 style={{ color: '#ef4444' }}>GeoHunt</h3>
            <span className="tag" style={{ backgroundColor: '#ef4444', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Radar GPS &amp; Survie Multijoueur</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Traquez, survivez et gagnez de l'argent réel ! Jeu multijoueur basé sur votre position GPS en temps réel. Serez-vous le prédateur ou la proie ?
            </p>
            <Link to="/geohunt" style={{ ...btnPrimaryStyle, display: 'inline-block', width: '100%', textAlign: 'center', boxSizing: 'border-box', backgroundColor: '#ef4444' }}>
              Ouvrir GeoHunt
            </Link>
          </div>

          <div className="app-card" style={{ border: '1px solid #f59e0b' }}>
            <h3 style={{ color: '#f59e0b' }}>Playfun</h3>
            <span className="tag" style={{ backgroundColor: '#f59e0b', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>+35 Jeux de Soirée • Visio &amp; IA</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Transformez n’importe quel moment entre amis en soirée mémorable ! Plus de 35 jeux cultes (Loup-Garou, Uno, Blanc Manger Coco, Poker...), visio/vocal en direct et thèmes générés par IA.
            </p>
            <Link to="/playfun" style={{ ...btnPrimaryStyle, display: 'inline-block', width: '100%', textAlign: 'center', boxSizing: 'border-box', backgroundColor: '#f59e0b' }}>
              Ouvrir Playfun
            </Link>
          </div>

          <div className="app-card">
            <h3>ProjetCalo</h3>
            <p>Nutrition et fitness personnalisés via IA.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 💼 LAYOUT WALKMONEY / ECONAV
// ==========================================
function WalkMoneyLayout({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path || (path !== '/walkmoney' && location.pathname.startsWith(path + '/'));

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '24px 28px', borderRadius: '18px', border: '1px solid #334155', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge" style={{ backgroundColor: '#00bcd4', color: '#0f172a', fontWeight: 'bold' }}>🌱 EcoNav • WalkMoney</span>
                <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>Mobilité Récompensée &amp; Espace Pro</span>
              </div>
              <h1 style={{ color: 'white', marginBottom: '6px', fontSize: '1.75rem' }}>EcoNav / WalkMoney</h1>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Navigation cinématique éco-responsable, points Lames et portail commerçants partenaires.</p>
            </div>
            {user && <div style={{ color: '#94a3b8', fontSize: '14px' }}>Connecté : <strong style={{ color: '#ffffff' }}>{user.email}</strong></div>}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
            <button onClick={() => navigate('/walkmoney')} style={{ ...(location.pathname === '/walkmoney' ? btnPrimaryStyle : btnOutlineStyle), backgroundColor: location.pathname === '/walkmoney' ? '#00bcd4' : 'transparent' }}>
              📱 Découvrir l'App
            </button>
            <button onClick={() => navigate(user ? '/walkmoney/dashboard' : '/walkmoney/auth')} style={{ ...(isActive('/walkmoney/auth') || isActive('/walkmoney/dashboard') ? btnPrimaryStyle : btnOutlineStyle), backgroundColor: (isActive('/walkmoney/auth') || isActive('/walkmoney/dashboard')) ? '#00bcd4' : 'transparent' }}>
              💼 {user ? 'Mes magasins' : 'Espace Commerçant'}
            </button>
            <button onClick={() => navigate('/walkmoney/create-store')} style={{ ...(isActive('/walkmoney/create-store') ? btnPrimaryStyle : btnOutlineStyle), backgroundColor: isActive('/walkmoney/create-store') ? '#00bcd4' : 'transparent' }}>
              + Créer un magasin
            </button>
            <Link to="/walkmoney/privacy" style={{ ...btnOutlineStyle, display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
              🔒 Confidentialité
            </Link>
            <Link to="/walkmoney/terms" style={{ ...btnOutlineStyle, display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
              📜 CGU &amp; EULA
            </Link>
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
// 🏁 ACCUEIL WALKMONEY / ECONAV (SHOWCASE & MARKETING)
// ==========================================
function WalkMoneyLanding({ user }) {
  const navigate = useNavigate();
  const [storeNotice, setStoreNotice] = useState('');

  const handleStoreClick = (storeName) => {
    setStoreNotice(`EcoNav sera prochainement disponible en téléchargement direct sur ${storeName}. Restez à l'écoute !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const reasons = [
    {
      num: '1',
      icon: '🧭',
      title: 'Une navigation fluide et prédictive de nouvelle génération',
      desc: 'Fini les flèches saccadées et les retards d\'affichage. Grâce à notre moteur propriétaire de lissage cinématique et d\'analyse inertielle à 60 FPS, suivez votre itinéraire en temps réel sur une cartographie vectorielle haute précision, adaptée aux piétons, cyclistes et usagers des transports en commun.',
      points: [
        'Moteur propriétaire de lissage cinématique 60 FPS',
        'Cartographie vectorielle haute précision en temps réel',
        'Modes adaptés aux piétons, cyclistes et transports en commun'
      ]
    },
    {
      num: '2',
      icon: '🏃',
      title: 'Marchez, roulez… Encaissez !',
      desc: 'Chaque kilomètre compte. Votre effort est valorisé équitablement en fonction de la distance, du temps, du dénivelé réel et même des conditions météo difficiles (bonus pluie/froid).',
      points: [
        'Points Lames : Cumulez des points à chaque trajet terminé.',
        'Système de Niveaux : Plus vous bougez, plus votre niveau grimpe (jusqu\'au niveau 50) avec des multiplicateurs de gains permanents.',
        'Bonus Quotidien & Série : Validez vos connexions quotidiennes pour décupler vos gains.'
      ]
    },
    {
      num: '3',
      icon: '🏪',
      title: 'Vos commerces locaux vous récompensent (Cashback & IA)',
      desc: 'Rendez visite à nos commerçants partenaires et profitez d\'un remboursement direct de vos achats :',
      points: [
        'Détection automatique d’arrivée : Le GPS confirme votre présence sur place.',
        'Scan intelligent de ticket : Photographiez votre preuve d\'achat. Notre intelligence artificielle analyse et valide instantanément votre ticket.',
        'Cashback cumulable : Récupérez un pourcentage de vos dépenses réelles en euros et en Lames bonus.'
      ]
    },
    {
      num: '4',
      icon: '🎯',
      title: 'Relevez des défis près de chez vous',
      desc: 'Explorez votre ville grâce à des défis d\'exploration de points d\'intérêt (parcs, monuments, lieux culturels).',
      points: [
        'Validation d\'étapes d\'arrêt (zones de présence chronométrées)',
        'Séries de visites découvertes thématiques',
        'Super-cagnottes bonus allant jusqu\'à 5 000 Lames à débloquer'
      ]
    },
    {
      num: '5',
      icon: '🎁',
      title: 'Boutique solidaire & Récompenses réelles',
      desc: 'Convertissez librement vos points dans notre boutique intégrée :',
      points: [
        'Virements directs (ex: PayPal) et cartes cadeaux.',
        'Dons aux Objectifs de Développement Durable (ODD de l\'ONU) et campagnes humanitaires.',
        'Plantation d\'arbres certifiés pour neutraliser votre empreinte carbone.'
      ]
    }
  ];

  return (
    <div style={{ display: 'grid', gap: '28px' }}>

      {/* Navigation de retour */}
      <div>
        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          ← Retour aux applications Parrel
        </Link>
      </div>

      {/* HERO SECTION MARKETING */}
      <div style={{ backgroundColor: '#1e293b', padding: '36px', borderRadius: '22px', border: '1px solid #334155', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0, 188, 212, 0.15)', border: '1px solid rgba(0, 188, 212, 0.3)', padding: '6px 14px', borderRadius: '999px', marginBottom: '18px' }}>
          <span style={{ color: '#00bcd4', fontWeight: 'bold', fontSize: '13px' }}>🌱 EcoNav • WalkMoney • Mobilité Éco-Responsable</span>
        </div>

        <h1 style={{ color: 'white', marginTop: '0', marginBottom: '16px', fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', lineHeight: 1.25, fontWeight: 800 }}>
          Transformez chacun de vos pas et coups de pédale en récompenses réelles.
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '900px', margin: '0 0 28px 0' }}>
          EcoNav est l'application de navigation GPS éco-responsable qui rémunère vos mobilités douces. Marchez, roulez à vélo, prenez les transports en commun, soutenez les commerces de proximité et gagnez des points « Lames » convertibles en argent, dons et bons d'achat.
        </p>

        {/* BOUTONS DE TÉLÉCHARGEMENT */}
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
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00bcd4'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3.609 1.814L13.793 12 3.61 22.185A2.32 2.32 0 0 1 3 20.573V3.427c0-.623.23-1.192.609-1.613z" fill="#00C1A6" />
              <path d="M17.202 8.59L13.793 12l3.41 3.41 3.865-2.222c.907-.521.907-1.854 0-2.376L17.202 8.59z" fill="#FFD100" />
              <path d="M3.609 1.814L13.793 12l3.409-3.41-11.41-6.559c-.569-.327-1.22-.327-1.792.007l6.009 6.009z" fill="#00A0FF" />
              <path d="M13.793 12L3.609 22.186c.572.334 1.223.334 1.792.007l11.41-6.559-3.018-3.634z" fill="#FF3333" />
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
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00bcd4'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.05-.52 2.67-1.27z" />
            </svg>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Télécharger dans l'</div>
              <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>App Store</div>
            </div>
          </button>

          {/* Bouton Espace Commerçant */}
          <button
            type="button"
            onClick={() => navigate(user ? '/walkmoney/dashboard' : '/walkmoney/auth')}
            style={{ ...btnOutlineStyle, padding: '12px 20px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            💼 {user ? 'Accéder à mes magasins' : 'Espace Commerçant Partenaire'}
          </button>
        </div>

        {storeNotice && (
          <div style={{ backgroundColor: 'rgba(0, 188, 212, 0.15)', border: '1px solid rgba(0, 188, 212, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#67e8f9', fontSize: '14px', maxWidth: '640px', marginTop: '14px' }}>
            ℹ️ {storeNotice}
          </div>
        )}
      </div>

      {/* STATS / CHIFFRES CLÉS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
          <div style={{ color: '#00bcd4', fontSize: '28px', fontWeight: '800' }}>60 FPS</div>
          <div style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '4px' }}>Lissage cinématique &amp; capteurs inertiels</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
          <div style={{ color: '#10b981', fontSize: '28px', fontWeight: '800' }}>Niveau 50</div>
          <div style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '4px' }}>Paliers &amp; multiplicateurs permanents</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
          <div style={{ color: '#f59e0b', fontSize: '28px', fontWeight: '800' }}>Scan IA</div>
          <div style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '4px' }}>Analyse OCR &amp; Cashback instantané</div>
        </div>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
          <div style={{ color: '#ec4899', fontSize: '28px', fontWeight: '800' }}>100% Solidaire</div>
          <div style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '4px' }}>Virements, dons ODD ONU &amp; arbres</div>
        </div>
      </div>

      {/* POURQUOI CHOISIR ECONAV ? */}
      <div>
        <div style={{ marginBottom: '20px' }}>
          <span className="badge" style={{ backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold' }}>Fonctionnalités Clés</span>
          <h2 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: '1.8rem' }}>
            Pourquoi choisir EcoNav ?
          </h2>
          <p style={{ color: '#94a3b8', margin: 0 }}>
            L'alliance unique de la navigation haute précision, de la détection anti-triche et de l'économie circulaire locale.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '18px' }}>
          {reasons.map((item) => (
            <div
              key={item.num}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '16px',
                border: '1px solid #334155',
                padding: '24px 28px',
                display: 'grid',
                gap: '12px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00bcd4'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{item.icon}</span>
                <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.25rem' }}>
                  {item.num}. {item.title}
                </h3>
              </div>

              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.65 }}>
                {item.desc}
              </p>

              <ul style={{ margin: '4px 0 0 20px', color: '#94a3b8', lineHeight: 1.7, fontSize: '14px' }}>
                {item.points.map((pt, idx) => (
                  <li key={idx} style={{ color: '#e2e8f0' }}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* TÉLÉCHARGEZ ECONAV DÈS AUJOURD'HUI */}
      <div style={{ backgroundColor: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #00bcd4', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
        <h2 style={{ color: '#00bcd4', marginTop: 0, marginBottom: '10px', fontSize: '1.7rem' }}>
          Téléchargez EcoNav dès aujourd'hui
        </h2>
        <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 22px auto', lineHeight: 1.6 }}>
          Disponible sur iOS (App Store) et Android (Google Play Store). Commencez à rentabiliser vos déplacements quotidiens dès votre prochain trajet.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => handleStoreClick('Google Play')} style={btnPrimaryStyle}>
            Google Play Store
          </button>
          <button type="button" onClick={() => handleStoreClick("l'App Store")} style={{ ...btnPrimaryStyle, backgroundColor: '#10b981' }}>
            Apple App Store
          </button>
        </div>
      </div>

      {/* ESPACE COMMERÇANT & PARTENAIRES (PORTAIL PRO) */}
      <div className="app-card" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '28px', borderRadius: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '24px' }}>💼</span>
          <h2 style={{ color: '#00bcd4', margin: 0, fontSize: '1.4rem' }}>Portail Commerçants &amp; Partenaires WalkMoney</h2>
        </div>
        <p style={{ color: '#cbd5e1', marginBottom: '20px', lineHeight: 1.6 }}>
          Vous tenez un commerce de proximité ? Intégrez le réseau EcoNav / WalkMoney. Définissez votre taux de cashback, attirez de nouveaux clients engagés dans votre boutique grâce à la détection de présence GPS et la validation automatique par IA de leurs tickets de caisse.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(user ? '/walkmoney/dashboard' : '/walkmoney/auth')} style={btnPrimaryStyle}>
            {user ? 'Accéder à mes magasins' : 'Se connecter au portail Pro'}
          </button>
          <button onClick={() => navigate('/walkmoney/create-store')} style={btnOutlineStyle}>
            + Créer un magasin
          </button>
        </div>
      </div>

      {/* PIED DE PAGE LÉGAL DÉDIÉ */}
      <div style={{ borderTop: '1px solid #334155', paddingTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: '14px' }}>
        <div>Documents officiels EcoNav / WalkMoney :</div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/walkmoney/privacy" style={{ color: '#00bcd4', textDecoration: 'none' }}>
            Politique de Confidentialité
          </Link>
          <Link to="/walkmoney/terms" style={{ color: '#00bcd4', textDecoration: 'none' }}>
            Conditions Générales (CGU)
          </Link>
          <Link to="/walkmoney/eula" style={{ color: '#00bcd4', textDecoration: 'none' }}>
            Contrat de Licence (EULA)
          </Link>
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
  const [storeNotice, setStoreNotice] = useState('');

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
                <path d="M3.609 1.814L13.793 12 3.61 22.185A2.32 2.32 0 0 1 3 20.573V3.427c0-.623.23-1.192.609-1.613z" fill="#00C1A6" />
                <path d="M17.202 8.59L13.793 12l3.41 3.41 3.865-2.222c.907-.521.907-1.854 0-2.376L17.202 8.59z" fill="#FFD100" />
                <path d="M3.609 1.814L13.793 12l3.409-3.41-11.41-6.559c-.569-.327-1.22-.327-1.792.007l6.009 6.009z" fill="#00A0FF" />
                <path d="M13.793 12L3.609 22.186c.572.334 1.223.334 1.792.007l11.41-6.559-3.018-3.634z" fill="#FF3333" />
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
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.05-.52 2.67-1.27z" />
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
// 🧠 QUIZBOT - PRÉSENTATION MARKETING & APP SHOWCASE
// ==========================================
function QuizBotPage() {
  const [storeNotice, setStoreNotice] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [roomNotice, setRoomNotice] = useState('');

  const handleStoreClick = (storeName) => {
    setStoreNotice(`QuizBot sera prochainement disponible en téléchargement direct sur ${storeName}. Restez à l'écoute !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!roomCode.trim() || roomCode.trim().length < 4) {
      setRoomNotice("⚠️ Veuillez saisir un code de salon valide à 6 chiffres.");
      return;
    }
    setRoomNotice(`🎮 Connexion au salon #${roomCode.trim().toUpperCase()}... En attente de l'hôte et synchronisation des chronos !`);
  };

  const featureCards = [
    {
      icon: '⚡',
      title: 'De vos idées au jeu en 5s',
      desc: "Fini la création manuelle : l'IA extrait les concepts clés, sélectionne le thème et génère automatiquement des questions percutantes et des indices adaptés.",
    },
    {
      icon: '🎮',
      title: '+15 mini-jeux inédits',
      desc: "Bien plus qu'un simple QCM ! Alertez dynamiquement entre Pendu nouvelle génération, Wordle, Anagrammes, Memory visuel, Relier et Quiz Éclair.",
    },
    {
      icon: '🌍',
      title: 'Multijoueur en Direct',
      desc: "Salons publics avec matchmaking rapide ou salles privées entre amis via un simple code à 6 chiffres, jouable en mode invité sans inscription.",
    },
    {
      icon: '📈',
      title: 'Suivi de QI Culturel',
      desc: "Mesurez vos connaissances grâce à un algorithme d'ajustement adaptatif, analysez vos points forts par thème et débloquez trophées et badges.",
    },
    {
      icon: '🎨',
      title: 'Illustrations IA (FLUX)',
      desc: "Visuels générés sur-mesure par IA générative ou extraits de banques d'images libres (Openverse) pour donner vie à chaque question.",
    },
    {
      icon: '⭐',
      title: 'QuizBot VIP',
      desc: "Générez des chapitres entiers de révision sans limite de texte, bénéficiez de visuels FLUX exclusifs et combinez librement tous les types de jeux.",
    },
  ];

  const miniGameCategories = [
    {
      category: 'Classiques & Réflexion',
      icon: '🧩',
      items: ['QCM texte et images', 'Vrai ou Faux', 'Choisir l’Intrus', 'Compléter la Phrase'],
    },
    {
      category: 'Jeux de Mots & Déduction',
      icon: '🔤',
      items: ['Pendu nouvelle génération', 'Mot Mystère (style Wordle)', 'Anagrammes rapides', 'Énigmes « Qui suis-je ? »'],
    },
    {
      category: 'Logique & Rapidité',
      icon: '⚡',
      items: ['Relier (Définition ↔ Mot / Image)', 'Memory visuel', 'Remise en ordre chronologique', 'Quiz Éclair & Estimations'],
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 14px', borderRadius: '999px', marginBottom: '16px' }}>
            <span style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '13px' }}>🧠 QuizBot (QuizQI) • Quiz &amp; IA Générative</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '0', marginBottom: '16px', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', lineHeight: 1.25, fontWeight: 800 }}>
            Apprenez, créez et défiez le monde entier.
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '880px', margin: '0 0 28px 0' }}>
            Collez un cours, un article ou vos notes : notre Intelligence Artificielle génère instantanément un quiz sur-mesure parmi plus de 15 formats de jeux différents. Jouez en solo, mesurez votre score de culture générale et affrontez vos amis en direct !
          </p>

          {/* 3 BOUTONS OBTENIR : PLAY STORE, APP STORE & REJOINDRE */}
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.793 12 3.61 22.185A2.32 2.32 0 0 1 3 20.573V3.427c0-.623.23-1.192.609-1.613z" fill="#00C1A6" />
                <path d="M17.202 8.59L13.793 12l3.41 3.41 3.865-2.222c.907-.521.907-1.854 0-2.376L17.202 8.59z" fill="#FFD100" />
                <path d="M3.609 1.814L13.793 12l3.409-3.41-11.41-6.559c-.569-.327-1.22-.327-1.792.007l6.009 6.009z" fill="#00A0FF" />
                <path d="M13.793 12L3.609 22.186c.572.334 1.223.334 1.792.007l11.41-6.559-3.018-3.634z" fill="#FF3333" />
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.05-.52 2.67-1.27z" />
              </svg>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Télécharger dans l'</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>App Store</div>
              </div>
            </button>

            {/* Bouton Rejoindre avec un code */}
            <a
              href="#join-room"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: '#a78bfa',
                padding: '14px 22px',
                borderRadius: '14px',
                border: '1px solid #8b5cf6',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8b5cf6'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.15)'; e.currentTarget.style.color = '#a78bfa'; }}
            >
              <span>🎮</span> Rejoindre une partie avec un code
            </a>

          </div>

          {storeNotice && (
            <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#ddd6fe', fontSize: '14px', maxWidth: '640px', marginBottom: '20px' }}>
              ℹ️ {storeNotice}
            </div>
          )}

          {/* BOX INTERACTIVE : REJOINDRE AVEC UN CODE */}
          <div id="join-room" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px 24px', maxWidth: '580px', marginTop: '16px' }}>
            <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔑</span> Accès direct à une salle privée
            </div>
            <form onSubmit={handleJoinRoom} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Code à 6 chiffres (ex: 742189)"
                maxLength={6}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                style={{ ...inputStyle, marginBottom: 0, flex: '1 1 200px', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}
              />
              <button type="submit" style={{ ...btnPrimaryStyle, backgroundColor: '#8b5cf6', whiteSpace: 'nowrap' }}>
                Rejoindre la partie
              </button>
            </form>
            {roomNotice && (
              <div style={{ marginTop: '10px', fontSize: '13px', color: roomNotice.startsWith('⚠️') ? '#fca5a5' : '#86efac' }}>
                {roomNotice}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 1 : LA MAGIE DE L'IA */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          marginBottom: '36px',
        }}>
          <h2 style={{ color: '#8b5cf6', marginTop: 0, marginBottom: '14px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚡</span> De vos idées au jeu en 5 secondes chrono
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '22px' }}>
            Fini les créations de quiz manuelles et fastidieuses. QuizBot extrait l’essence de vos contenus en quelques fractions de seconde :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ color: '#8b5cf6', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>1</div>
              <h3 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Collez votre texte</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Résumé historique, fiche de révision pour le bac, article scientifique, notes brutes ou lien d'actualité.
              </p>
            </div>

            <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ color: '#8b5cf6', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>2</div>
              <h3 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Laissez l’IA travailler</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Elle extrait les concepts clés, sélectionne le thème et génère automatiquement des questions pertinentes et des indices.
              </p>
            </div>

            <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ color: '#8b5cf6', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>3</div>
              <h3 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Illustrations intelligentes</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                L'IA recherche ou génère automatiquement des visuels adaptés (Openverse / FLUX) pour illustrer vos questions et options de jeu.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2 : PLUS DE 15 MINI-JEUX INÉDITS */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎮</span> Bien plus qu'un simple QCM !
          </h2>
          <p style={{ color: '#94a3b8', margin: '0 0 22px 0', fontSize: '1.05rem' }}>
            Ne vous ennuyez plus jamais avec des questions répétitives. QuizBot alterne dynamiquement une multitude de mécaniques :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {miniGameCategories.map((cat, idx) => (
              <div key={idx} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{cat.icon}</div>
                <h3 style={{ color: '#8b5cf6', margin: '0 0 14px 0', fontSize: '1.2rem' }}>{cat.category}</h3>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', lineHeight: 1.8 }}>
                  {cat.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 : MULTIJOUEUR EN DIRECT */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '36px'
        }}>
          <h2 style={{ color: '#8b5cf6', marginTop: 0, marginBottom: '10px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🌍</span> Défiez vos amis ou des joueurs du monde entier
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '1.05rem' }}>
            Affrontez la communauté dans un écosystème multijoueur temps réel fluide et immersif :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📡</div>
              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1rem' }}>Salons publics &amp; Matchmaking</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Trouvez une partie instantanément grâce à notre radar de recherche thématique.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔐</div>
              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1rem' }}>Salons privés entre amis</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Créez une salle, partagez votre code à 6 chiffres et jouez ensemble avec un chat en direct.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏱️</div>
              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1rem' }}>Synchro parfaite</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Chronomètres en temps réel, animations de podium et classement dynamique après chaque question.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚀</div>
              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1rem' }}>Mode Invité immédiat</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Vos amis peuvent rejoindre votre partie immédiatement avec un simple code, sans obligation de créer un compte.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4 : SUIVI DE PERFORMANCE & QI CULTUREL */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ color: 'white', marginBottom: '14px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📈</span> Mesurez et développez votre potentiel
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🧠</div>
              <h3 style={{ color: '#8b5cf6', margin: '0 0 10px 0', fontSize: '1.2rem' }}>Indicateur de QI Culturel</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.96rem', lineHeight: 1.6 }}>
                Notre algorithme évalue votre progression en ajustant votre score selon la difficulté des questions et les thèmes abordés.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>📊</div>
              <h3 style={{ color: '#8b5cf6', margin: '0 0 10px 0', fontSize: '1.2rem' }}>Analyse de compétences par IA</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.96rem', lineHeight: 1.6 }}>
                Découvrez vos points forts (Histoire, Sciences, Cinéma, Géographie...) et les domaines à perfectionner.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🏆</div>
              <h3 style={{ color: '#8b5cf6', margin: '0 0 10px 0', fontSize: '1.2rem' }}>Collection de Badges &amp; Trophées</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.96rem', lineHeight: 1.6 }}>
                Débloquez des récompenses uniques en réalisant des scores parfaits, en enchaînant les victoires ou en créant vos propres quiz.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5 : QUIZBOT VIP */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(30, 27, 75, 0.6) 100%)',
          marginBottom: '36px',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '5px 12px', borderRadius: '999px', marginBottom: '14px' }}>
            <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '13px' }}>⭐ QuizBot VIP — L'expérience ultime</span>
          </div>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '10px', fontSize: '1.45rem' }}>
            Passez à la vitesse supérieure
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '22px', fontSize: '1.05rem' }}>
            Pour les créateurs passionnés et les réviseurs intensifs :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '6px', fontSize: '1.05rem' }}>🚀 Prompts illimités</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.92rem', lineHeight: 1.5 }}>
                Transformez des chapitres entiers sans limite de caractères ni plafond de requêtes.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '6px', fontSize: '1.05rem' }}>🎨 Génération FLUX IA</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.92rem', lineHeight: 1.5 }}>
                Des visuels sur-mesure créés de toutes pièces pour vos questions grâce aux modèles FLUX.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '6px', fontSize: '1.05rem' }}>🧩 Combinaisons infinies</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.92rem', lineHeight: 1.5 }}>
                Assemblez tous les types de mini-jeux dans un seul quiz personnalisé multi-formats.
              </p>
            </div>
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
              Consultez nos documents juridiques complets rédigés sur mesure pour l'application QuizBot (identifiée sous le bundle com.parrel.quizbot).
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/quizbot/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#8b5cf6', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/quizbot/terms" style={{ ...btnOutlineStyle, borderColor: '#8b5cf6', color: '#8b5cf6' }}>
              Conditions Générales (EULA)
            </Link>
          </div>
        </div>

        {/* SECTION FOOTER DE L'APPLI */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          color: '#94a3b8',
          fontSize: '13px'
        }}>
          <div>
            Application <strong style={{ color: '#ffffff' }}>QuizBot</strong> (bundle <code style={{ color: '#a78bfa' }}>com.parrel.quizbot</code>) • Parrel Studio
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="mailto:support.parrel@gmail.com" style={{ color: '#8b5cf6', textDecoration: 'none' }}>
              Assistance : support.parrel@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 🔒 PAGE : POLITIQUE DE CONFIDENTIALITÉ — QUIZBOT (/quizbot/privacy)
// ==========================================
function QuizBotPrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/quizbot" style={{ color: '#8b5cf6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à QuizBot
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#8b5cf6', color: 'white' }}>QuizBot</span>
            <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>Conformité RGPD &amp; Stores</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — QuizBot
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 11 Octobre 2024 • Application : QuizBot • Bundle ID : com.parrel.quizbot
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> QuizBot (identifiée sous le bundle <code>com.parrel.quizbot</code>)</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur / Développeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle HTTPS :</strong> <a href="https://parrel.vercel.app/quizbot/privacy" style={{ color: '#8b5cf6', textDecoration: 'none' }}>https://parrel.vercel.app/quizbot/privacy</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact &amp; Délégué aux données :</strong> <a href="mailto:support.parrel@gmail.com" style={{ color: '#8b5cf6', textDecoration: 'none' }}>support.parrel@gmail.com</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            La présente Politique de Confidentialité décrit la manière dont nous collectons, utilisons, stockons et protégeons vos données à caractère personnel lorsque vous utilisez l'application mobile QuizBot (ci-après « l'Application »). En téléchargeant, installant ou utilisant QuizBot, vous acceptez les pratiques décrites dans cette politique. Si vous n'acceptez pas ces dispositions, veuillez désinstaller et ne pas utiliser l'Application.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>

            <section>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>1. Introduction</h2>
              <p style={{ margin: 0 }}>
                La présente Politique de Confidentialité s’applique à l’ensemble des fonctionnalités de QuizBot. Nous nous engageons à respecter scrupuleusement le Règlement Général sur la Protection des Données (RGPD), le California Consumer Privacy Act (CCPA) et les exigences strictes de sécurité imposées par l'App Store d'Apple et le Google Play Store.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>2. Données personnelles collectées</h2>
              <p style={{ marginBottom: '14px' }}>
                Dans le cadre du bon fonctionnement de QuizBot, nous pouvons collecter et traiter les données suivantes :
              </p>

              <div style={{ display: 'grid', gap: '16px', paddingLeft: '8px' }}>
                <div>
                  <strong style={{ color: '#ffffff' }}>A. Données d'authentification et de profil :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li><strong style={{ color: '#ffffff' }}>Compte utilisateur :</strong> Adresse e-mail, mot de passe chiffré, pseudonyme (nom d'utilisateur), pays sélectionné.</li>
                    <li><strong style={{ color: '#ffffff' }}>Photo de profil / Avatar :</strong> Si vous choisissez d'importer une photo depuis votre galerie, celle-ci est stockée sur nos serveurs sécurisés (Firebase Storage).</li>
                    <li><strong style={{ color: '#ffffff' }}>Mode Invité (Anonyme) :</strong> Si vous utilisez le mode invité, un identifiant technique temporaire est généré sans collecter d'adresse e-mail.</li>
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#ffffff' }}>B. Données de jeu et d'activité :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li><strong style={{ color: '#ffffff' }}>Scores, classement et statistiques :</strong> Points accumulés, historique des parties jouées, calcul de QI virtuel, badges débloqués, statistiques de performances par thème.</li>
                    <li><strong style={{ color: '#ffffff' }}>Quiz personnalisés :</strong> Titres, textes sources, questions, réponses, indices et structures de mini-jeux que vous créez ou modifiez.</li>
                    <li><strong style={{ color: '#ffffff' }}>Interactions sociales :</strong> Liste d'amis, demandes d'amis, messages échangés dans les salons de discussion (chat en direct de salle d'attente), listes d'utilisateurs bloqués et signalements effectués.</li>
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#ffffff' }}>C. Données techniques et jetons de notification :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li><strong style={{ color: '#ffffff' }}>Notifications Push (Firebase Cloud Messaging - FCM) :</strong> Nous collectons le jeton FCM de votre appareil afin de pouvoir vous envoyer des notifications liées aux parties, aux demandes d'amis ou aux annonces de l'Application.</li>
                    <li><strong style={{ color: '#ffffff' }}>Sécurité &amp; Intégrité (Firebase App Check) :</strong> Données techniques attestant de la validité de l'appareil (Play Integrity sur Android, App Attest sur iOS) pour prévenir la triche et les abus.</li>
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#ffffff' }}>D. Données d'achats et abonnements (VIP) :</strong>
                  <ul style={{ margin: '6px 0 0 20px', color: '#cbd5e1' }}>
                    <li>Les transactions financières sont traitées directement par Apple (App Store) ou Google (Google Play Store). Nous ne stockons et n'avons jamais accès à vos numéros de carte bancaire.</li>
                    <li>Nous utilisons RevenueCat pour identifier le statut de votre abonnement (utilisateur Standard vs VIP) associé à votre identifiant technique d'utilisateur.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>3. Utilisation de l'Intelligence Artificielle (IA) et APIs Tierces</h2>
              <p style={{ marginBottom: '10px' }}>
                QuizBot intègre des fonctionnalités avancées de génération de quiz et d'images :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Génération textuelle :</strong> Les textes ou thèmes que vous fournissez sont envoyés de manière sécurisée via des fonctions Cloud chiffrées à des modèles de traitement du langage naturel (notamment Mistral / DeepSeek via des fournisseurs d'API sécurisés tels que SiliconFlow). Aucune donnée sensible ou identifiant personnel n'est transmis à ces modèles.</li>
                <li><strong style={{ color: '#ffffff' }}>Recherche et génération d'images :</strong> L'Application peut interroger le moteur Openverse (images sous licence libre) ou générer des visuels via des modèles d'IA générative (tels que FLUX). Seules les descriptions requises pour l'illustration (prompts visuels en anglais) sont envoyées à ces services.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>4. Finalités du traitement des données</h2>
              <p style={{ marginBottom: '10px' }}>Vos données sont traitées pour :</p>
              <ol style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Permettre la création, l'accès et la gestion de votre compte utilisateur.</li>
                <li>Synchroniser vos quiz, scores, badges et classements en ligne en temps réel.</li>
                <li>Permettre le jeu multijoueur (gestion des salons publics/privés, suivi des tours de jeu, synchronisation des chronomètres, salon de discussion temporaire).</li>
                <li>Modérer la plateforme (traitement des signalements et des blocages de sécurité).</li>
                <li>Gérer les accès aux fonctionnalités VIP via les boutiques d'applications.</li>
              </ol>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>5. Partage et sous-traitants de données</h2>
              <p style={{ marginBottom: '10px' }}>
                Vos données personnelles ne sont jamais vendues à des tiers. Elles sont hébergées et traitées par des prestataires techniques réputés respectant les standards de sécurité internationaux :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Google Firebase (Google LLC) :</strong> Authentification, base de données Firestore, hébergement Storage, Cloud Functions, notifications FCM, App Check.</li>
                <li><strong style={{ color: '#ffffff' }}>RevenueCat Inc. :</strong> Gestion technique et synchronisation de l'état des abonnements in-app.</li>
                <li><strong style={{ color: '#ffffff' }}>Apple Inc. &amp; Google LLC :</strong> Traitement des paiements in-app et vérification d'intégrité logicielle.</li>
                <li><strong style={{ color: '#ffffff' }}>Modèles d'IA tiers (SiliconFlow / Mistral / DeepSeek) :</strong> Uniquement pour la génération de contenu de quiz à partir des requêtes textuelles.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>6. Sécurité des données</h2>
              <p style={{ marginBottom: '10px' }}>
                Nous appliquons des mesures de sécurité rigoureuses pour protéger vos données :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Chiffrement des communications en transit (HTTPS / TLS).</li>
                <li>Règles de sécurité Firestore empêchant tout accès non autorisé aux profils ou données privées d'autres utilisateurs.</li>
                <li>Masquage et vérification sécurisée des réponses de quiz côté serveur (Cloud Functions) afin de prévenir la manipulation frauduleuse des scores et du QI.</li>
                <li>Filtrage des types de fichiers (JPEG/PNG/WEBP) pour les photos de profil.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>7. Conservation des données et Droit de suppression (RGPD / CCPA / Apple Guideline 5.1.1(v))</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Vos données sont conservées tant que votre compte utilisateur est actif.</li>
                <li><strong style={{ color: '#8b5cf6' }}>Suppression de compte (Exigence Apple 5.1.1(v)) :</strong> Conformément aux exigences de l'App Store d'Apple et du RGPD, vous disposez d'un mécanisme de suppression de compte complet et sans friction directement dans l'Application (<em style={{ color: '#ffffff' }}>Profil &gt; Paramètres &gt; Supprimer mon compte</em>). L'exécution de cette commande entraîne l'effacement immédiat et irréversible de l'ensemble de vos données personnelles, de votre profil, de vos quiz créés, de vos statistiques de QI, de vos scores et de vos jetons de notification sur tous nos serveurs de production.</li>
                <li>Vous pouvez également exercer vos droits d'accès, de rectification, de portabilité ou d'opposition en écrivant à : <a href="mailto:support.parrel@gmail.com" style={{ color: '#8b5cf6', textDecoration: 'none' }}>support.parrel@gmail.com</a>.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>8. Protection des mineurs</h2>
              <p style={{ margin: 0 }}>
                QuizBot ne s'adresse pas directement aux enfants de moins de 13 ans (ou l'âge minimum légal dans votre juridiction). Nous ne collectons pas sciemment de données auprès d'enfants sans consentement parental préalable. Si vous constatez qu'un enfant nous a fourni des données sans autorisation, contactez-nous immédiatement pour suppression.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>9. Modifications de la politique de confidentialité</h2>
              <p style={{ margin: 0 }}>
                Nous nous réservons le droit de mettre à jour cette Politique de Confidentialité. En cas de modification substantielle, vous en serez informé via une mise à jour de l'Application ou un avertissement sur l'écran d'accueil.
              </p>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/quizbot/terms" style={{ ...btnPrimaryStyle, backgroundColor: '#8b5cf6' }}>
              Voir les Conditions Générales (CGU / EULA) →
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
// 📜 PAGE : CONDITIONS GÉNÉRALES & EULA — QUIZBOT (/quizbot/terms)
// ==========================================
function QuizBotTermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/quizbot" style={{ color: '#8b5cf6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à QuizBot
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#8b5cf6', color: 'white' }}>QuizBot</span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Contrat EULA &amp; CGU</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation et Contrat de Licence d'Utilisateur Final (EULA) — QuizBot
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 11 Octobre 2024 • Application : QuizBot • Bundle ID : com.parrel.quizbot
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> QuizBot</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>Bundle ID :</strong> <code>com.parrel.quizbot</code></div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle HTTPS :</strong> <a href="https://parrel.vercel.app/quizbot/terms" style={{ color: '#8b5cf6', textDecoration: 'none' }}>https://parrel.vercel.app/quizbot/terms</a></div>
            <div><strong style={{ color: '#ffffff' }}>EULA Standard Apple :</strong> <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa', textDecoration: 'underline' }}>Apple Licensed Application End User License Agreement</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact Support :</strong> <a href="mailto:support.parrel@gmail.com" style={{ color: '#8b5cf6', textDecoration: 'none' }}>support.parrel@gmail.com</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            En téléchargeant, installant ou utilisant l'application mobile QuizBot (« l'Application »), vous acceptez d'être lié sans réserve par les présentes Conditions Générales d’Utilisation (CGU) et le Contrat de Licence d'Utilisateur Final (EULA). Si vous n'acceptez pas l'ensemble de ces termes, vous n'êtes pas autorisé à utiliser l'Application.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>

            <section>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>1. Acceptation des conditions</h2>
              <p style={{ margin: 0 }}>
                L'utilisation de QuizBot implique votre acceptation pleine et entière des présentes CGU / EULA. Si vous n'acceptez pas ces conditions, vous devez immédiatement désinstaller l'Application de votre appareil.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>2. Licence d'utilisation</h2>
              <p style={{ marginBottom: '10px' }}>
                L'Éditeur vous concède une licence personnelle, non exclusive, non transférable, révocable et limitée d'utilisation de QuizBot à des fins personnelles et non commerciales, sur tout appareil mobile compatible (iOS ou Android) que vous possédez ou contrôlez.
              </p>
              <p style={{ marginBottom: '8px' }}>Il vous est strictement interdit de :</p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Décompiler, désosser (reverse-engineer) ou tenter d'extraire le code source de l'Application.</li>
                <li>Exploiter commercialement, louer, prêter ou sous-licencier l'Application.</li>
                <li>Contourner les mesures techniques de protection (App Check, validations des serveurs Cloud).</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>3. Contenu Généré par les Utilisateurs (UGC) et Modération</h2>
              <p style={{ marginBottom: '12px' }}>
                QuizBot permet aux utilisateurs de concevoir des quiz, d'écrire des textes, d'importer des images de profil ou de questions, de nommer des salons multijoueurs et d'échanger des messages dans un chat en direct.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#ffffff' }}>A. Règle de Tolérance Zéro contre les Abus</strong>
                <p style={{ color: '#ef4444', fontWeight: 'bold', margin: '6px 0 8px 0' }}>
                  Il est formellement interdit de publier, transmettre ou partager du contenu qui est :
                </p>
                <ul style={{ margin: '0 0 10px 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                  <li>Diffamatoire, injurieux, obscène, pornographique ou sexuellement explicite ;</li>
                  <li>Incitant à la haine, au racisme, à la discrimination ou à la violence envers des personnes ou des groupes ;</li>
                  <li>Constitutif de harcèlement, de menaces, d'intimidation ou de violation de la vie privée d'autrui ;</li>
                  <li>Constitutif de triche, de désinformation délibérée ou de spam commercial ;</li>
                  <li>En violation des droits de propriété intellectuelle de tiers.</li>
                </ul>
              </div>

              <div>
                <strong style={{ color: '#ffffff' }}>B. Outils de signalement et de blocage (In-App)</strong>
                <p style={{ margin: '6px 0 8px 0' }}>Pour garantir une communauté sûre, QuizBot met à la disposition des utilisateurs :</p>
                <ol style={{ margin: '0 0 12px 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                  <li><strong style={{ color: '#ffffff' }}>Un mécanisme de signalement (Report) :</strong> Tout quiz public ou tout profil utilisateur peut être signalé immédiatement via le bouton dédié (icône drapeau).</li>
                  <li><strong style={{ color: '#ffffff' }}>Un mécanisme de blocage (Block) :</strong> Vous pouvez bloquer tout joueur indésirable en un clic. Ses créations et ses messages n'apparaîtront plus pour vous.</li>
                  <li><strong style={{ color: '#ffffff' }}>Modération active sous 24h :</strong> L'Éditeur examine tous les signalements, supprime sans préavis tout contenu contrevenant et bannit temporairement ou définitivement tout utilisateur enfreignant ces règles dans un délai maximal de 24 heures.</li>
                </ol>
              </div>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>4. Utilisation des fonctions d'Intelligence Artificielle</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>QuizBot utilise des algorithmes d'IA pour formater des quiz et proposer des illustrations.</li>
                <li>Bien que nous nous efforcions de paramétrer l'IA pour garantir une exactitude maximale, les réponses générées peuvent comporter des erreurs, inexactitudes historiques ou approximations factuelles. L'Éditeur ne saurait être tenu responsable des inexactitudes générées par les modèles d'IA tiers.</li>
                <li>Vous vous engagez à ne pas soumettre de requêtes (prompts) illicites, haineuses ou conçues pour forcer l'IA à produire du contenu illégal.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>5. Scores, QI et Classements</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Le score et l'indicateur de « QI » proposés dans QuizBot sont calculés à des fins strictement récréatives, ludiques et pédagogiques. Ils ne constituent en aucun cas un test psychométrique officiel, médical ou scientifique de quotient intellectuel.</li>
                <li>Toute tentative de triche (utilisation de bots, manipulation des requêtes réseau, falsification des soumissions de scores) entraînera la réinitialisation immédiate du compte et/ou son bannissement définitif.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>6. Abonnements VIP et Achats In-App</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Avantages VIP :</strong> L'abonnement VIP débloque des plafonds d'utilisation étendus (génération de quiz allongée, accès aux illustrations d'IA avancées, combinaison illimitée de formats de jeux).</li>
                <li><strong style={{ color: '#ffffff' }}>Facturation &amp; Renouvellement :</strong> Les abonnements sont gérés via le compte Apple ID (iOS) ou Google Play (Android). Le paiement est prélevé à la confirmation de l'achat. L'abonnement se renouvelle automatiquement sauf si le renouvellement automatique est désactivé au moins 24 heures avant la fin de la période en cours.</li>
                <li><strong style={{ color: '#ffffff' }}>Gestion et Annulation :</strong> Vous pouvez gérer ou résilier votre abonnement à tout moment dans les réglages de votre compte App Store (<a href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa' }}>Gérer mon abonnement Apple</a>) ou Google Play Store. Conformément aux politiques des boutiques d'applications, aucun remboursement partiel ou rétroactif n'est assuré directement par l'Éditeur.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>7. Disponibilité du Service et Mises à Jour Forcées</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>L'accès à QuizBot requiert une connexion Internet active pour la majorité des fonctionnalités en ligne et de génération.</li>
                <li>L'Application intègre un système de contrôle de version. En cas de mise à jour critique de sécurité ou d'évolution du protocole serveur, l'Éditeur peut exiger la mise à jour obligatoire de l'Application pour continuer à l'utiliser.</li>
                <li>L'Éditeur peut suspendre temporairement le service pour des raisons de maintenance, sans préavis.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>8. Exclusion de Garanties et Limitation de Responsabilité</h2>
              <p style={{ margin: '0 0 10px 0' }}>
                L'Application est fournie « EN L'ÉTAT » et « SELON DISPONIBILITÉ », sans garantie d'aucune sorte, expresse ou implicite. Dans les limites permises par la loi applicable, l'Éditeur décline toute responsabilité pour :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Les dommages directs, indirects ou accessoires découlant de l'utilisation ou de l'impossibilité d'utiliser l'Application ;</li>
                <li>Les pertes de données, de scores ou d'historique résultant d'une panne de réseau ou d'une défaillance technique ;</li>
                <li>Le comportement ou le contenu publié par d'autres utilisateurs dans le cadre des fonctionnalités multijoueurs ou publiques.</li>
              </ul>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>9. Résiliation</h2>
              <p style={{ margin: 0 }}>
                L'Éditeur peut résilier ou suspendre votre accès à l'Application sans préavis si vous ne respectez pas les présentes conditions, sans que cela n'ouvre droit à une quelconque indemnité ou remboursement. Vous pouvez également cesser d'utiliser l'Application et supprimer votre compte à tout moment.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>10. Droit applicable et Juridiction compétente</h2>
              <p style={{ margin: 0 }}>
                Les présentes conditions sont régies et interprétées conformément au droit français. Tout litige relatif à leur interprétation ou exécution qui ne pourrait être résolu à l'amiable sera soumis à la compétence exclusive des tribunaux compétents du ressort du tribunal de commerce compétent.
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '10px' }}>11. Contact</h2>
              <p style={{ margin: '0 0 6px 0' }}>Pour toute question concernant les présentes CGU / EULA ou pour signaler un abus, veuillez contacter :</p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#ffffff' }}>E-mail :</strong> <a href="mailto:support.parrel@gmail.com" style={{ color: '#8b5cf6', textDecoration: 'none' }}>support.parrel@gmail.com</a>
              </p>
            </section>

            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#8b5cf6', fontSize: '1.25rem', marginBottom: '12px' }}>
                12. Dispositions Spécifiques et Mentions Obligatoires Apple (EULA App Store)
              </h2>
              <p style={{ marginBottom: '12px' }}>
                Pour les utilisateurs téléchargeant ou utilisant QuizBot depuis l'App Store d'Apple sur iOS ou iPadOS, les mentions obligatoires suivantes s'appliquent expressément :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Parties au Contrat :</strong> Vous reconnaissez que le présent contrat de licence (EULA) est conclu exclusivement entre vous et Parrel Studio, et non avec Apple Inc. Parrel Studio est seul responsable de l'Application QuizBot et de son contenu.</li>
                <li><strong style={{ color: '#ffffff' }}>Portée de la Licence :</strong> La licence accordée pour QuizBot est limitée à une licence non transférable d'utilisation sur tout appareil de marque Apple (iPhone, iPad) que vous possédez ou contrôlez, conformément aux règles d'utilisation prévues dans les Conditions générales des services multimédias d'Apple.</li>
                <li><strong style={{ color: '#ffffff' }}>Maintenance et Assistance :</strong> Parrel Studio est seul responsable de la fourniture des services de maintenance et d'assistance relatifs à QuizBot. Vous reconnaissez qu'Apple n'a aucune obligation de fournir des services de maintenance ou d'assistance pour QuizBot.</li>
                <li><strong style={{ color: '#ffffff' }}>Garantie :</strong> Parrel Studio est seul responsable des garanties du produit. En cas de défaut de conformité de QuizBot avec toute garantie applicable, vous pouvez en informer Apple, qui pourra rembourser le prix d'achat payé pour QuizBot sur l'App Store. Dans toute la mesure permise par le droit applicable, Apple n'aura aucune autre obligation de garantie de quelque nature que ce soit à l'égard de QuizBot.</li>
                <li><strong style={{ color: '#ffffff' }}>Réclamations sur le Produit :</strong> Parrel Studio, et non Apple, est responsable du traitement des réclamations de l'utilisateur final ou de tiers relatives à QuizBot (notamment la responsabilité du fait des produits, les exigences réglementaires et la protection des consommateurs).</li>
                <li><strong style={{ color: '#ffffff' }}>Droits de Propriété Intellectuelle :</strong> En cas de réclamation d'un tiers alléguant que QuizBot ou votre détention/utilisation de QuizBot enfreint les droits de propriété intellectuelle d'un tiers, Parrel Studio (et non Apple) sera seul responsable de l'enquête, de la défense, du règlement et de l'apaisement de cette réclamation.</li>
                <li><strong style={{ color: '#ffffff' }}>Conformité Légale :</strong> Vous déclarez et garantissez que (i) vous ne résidez pas dans un pays soumis à un embargo du gouvernement américain ou désigné comme soutenant le terrorisme ; et (ii) vous ne figurez sur aucune liste américaine de parties interdites ou restreintes.</li>
                <li><strong style={{ color: '#ffffff' }}>Tiers Bénéficiaire Apple :</strong> Vous reconnaissez et acceptez qu'Apple et ses filiales sont des tiers bénéficiaires des présentes CGU / EULA. Dès votre acceptation, Apple aura le droit (et sera réputée avoir accepté le droit) de faire appliquer les présentes conditions à votre encontre en tant que tiers bénéficiaire.</li>
                <li><strong style={{ color: '#ffffff' }}>Contrat EULA Standard Apple :</strong> L'Application est également soumise au contrat type de licence Apple disponible sur : <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa', textDecoration: 'underline' }}>https://www.apple.com/legal/internet-services/itunes/dev/stdeula/</a>.</li>
                <li><strong style={{ color: '#ffffff' }}>Gestion des Abonnements Apple ID :</strong> Les abonnements sont résiliables à tout moment depuis les Réglages Apple ou sur <a href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa', textDecoration: 'underline' }}>https://apps.apple.com/account/subscriptions</a> au moins 24h avant l'échéance. Toute portion d'essai gratuit non utilisée est perdue à la souscription d'un abonnement payant.</li>
              </ul>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/quizbot/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#8b5cf6' }}>
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
// 📍 GEOHUNT - PRÉSENTATION MARKETING & APP SHOWCASE
// ==========================================
function GeoHuntPage() {
  const [storeNotice, setStoreNotice] = useState('');
  const [activeRole, setActiveRole] = useState('predator');

  const handleStoreClick = (storeName) => {
    setStoreNotice(`GeoHunt sera prochainement disponible en téléchargement direct sur ${storeName}. Préparez votre équipement et restez à l'affût !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const tacticalPowers = [
    {
      icon: '🚀',
      title: 'Fusée Sonique',
      range: 'Portée 30 km',
      desc: 'Frappez un joueur ciblé jusqu\'à 30 km de distance pour perturber ses radars et lui dérober son trésor à distance.',
      color: '#ef4444'
    },
    {
      icon: '👻',
      title: 'Fantôme & Discrétion',
      range: 'Invisibilité Totale',
      desc: 'Disparaissez totalement du radar adverse. Parfait pour échapper à une meute de chasseurs ou tendre une embuscade sournoise.',
      color: '#8b5cf6'
    },
    {
      icon: '🛡️',
      title: 'Boucliers & Couteaux',
      range: 'Défense & Assaut',
      desc: 'Activez un bouclier électromagnétique pour bloquer les vols de pièces ou équipez des couteaux tactiques pour défier les Boss Mondiaux.',
      color: '#06b6d4'
    }
  ];

  const keyFeatures = [
    {
      icon: '🗺️',
      title: 'Radar GPS & Brouillard de Guerre',
      desc: 'Carte vectorielle en temps réel avec brouillard de guerre pour protéger la vie privée des joueurs inactifs et maximiser le suspense.'
    },
    {
      icon: '📳',
      title: 'Mode Arrière-plan & Alertes Poche',
      desc: 'Soyez alerté par vibration et avertissement sonore si un danger ou un lapin approche, même quand votre smartphone est au fond de votre poche !'
    },
    {
      icon: '🕹️',
      title: 'Joystick Virtuel à Domicile',
      desc: 'Jouez confortablement depuis chez vous grâce au joystick intégré (accessible via pièces récoltées ou abonnement Premium).'
    },
    {
      icon: '💬',
      title: 'Messagerie & Système d\'Escouade',
      desc: 'Communiquez en direct avec vos coéquipiers, planifiez des embuscades collectives et suivez vos alliés en temps réel.'
    },
    {
      icon: '🚗',
      title: 'Mode Conduite Anti-Triche',
      desc: 'La sécurité avant tout : blocage automatique du jeu au-dessus de 20 km/h pour prévenir l\'usage au volant.'
    },
    {
      icon: '💶',
      title: 'Retraits Réels Sécurisés PayPal',
      desc: 'Convertissez 1000 pièces d\'or contre 5€ réels sur PayPal, avec validation biométrique locale (FaceID / TouchID).'
    }
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '6px 14px', borderRadius: '999px', marginBottom: '16px' }}>
            <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '13px' }}>🔴 GeoHunt • Le Radar de Survie GPS &amp; Récompenses Réelles</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '0', marginBottom: '14px', fontSize: 'clamp(1.9rem, 4.2vw, 2.85rem)', lineHeight: 1.25, fontWeight: 800 }}>
            GeoHunt : Le Radar de Survie
          </h1>

          <div style={{ color: '#f87171', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.02em' }}>
            Traquez, survivez et gagnez de l'argent réel !
          </div>

          <p style={{ color: '#cbd5e1', fontSize: '1.18rem', lineHeight: 1.65, maxWidth: '880px', margin: '0 0 28px 0' }}>
            Votre ville devient votre terrain de jeu. GeoHunt est un jeu multijoueur de survie et de traque basé sur votre position GPS en temps réel. <strong style={{ color: '#ffffff' }}>Serez-vous le prédateur ou la proie ?</strong>
          </p>

          {/* BOUTONS TELECHARGEMENT STORES */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '22px' }}>

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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.793 12 3.61 22.185A2.32 2.32 0 0 1 3 20.573V3.427c0-.623.23-1.192.609-1.613z" fill="#00C1A6" />
                <path d="M17.202 8.59L13.793 12l3.41 3.41 3.865-2.222c.907-.521.907-1.854 0-2.376L17.202 8.59z" fill="#FFD100" />
                <path d="M3.609 1.814L13.793 12l3.409-3.41-11.41-6.559c-.569-.327-1.22-.327-1.792.007l6.009 6.009z" fill="#00A0FF" />
                <path d="M13.793 12L3.609 22.186c.572.334 1.223.334 1.792.007l11.41-6.559-3.018-3.634z" fill="#FF3333" />
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.05-.52 2.67-1.27z" />
              </svg>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Télécharger dans l'</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>App Store</div>
              </div>
            </button>

            {/* Pill statut récompenses */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              padding: '12px 18px',
              borderRadius: '14px',
              color: '#34d399',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              <span>💶</span> 1000 Pièces d'or = 5€ PayPal
            </div>

          </div>

          {storeNotice && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#fecaca', fontSize: '14px', maxWidth: '640px', marginBottom: '20px' }}>
              ℹ️ {storeNotice}
            </div>
          )}
        </div>

        {/* SECTION 1 : CHASSEUR OU LAPIN ? */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          marginBottom: '36px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <h2 style={{ color: '#ffffff', margin: 0, fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🔴</span> CHASSEUR OU LAPIN ? <span>🟢</span>
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setActiveRole('predator')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  backgroundColor: activeRole === 'predator' ? '#ef4444' : '#334155',
                  color: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                🔴 Rôle Chasseur
              </button>
              <button
                type="button"
                onClick={() => setActiveRole('prey')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  backgroundColor: activeRole === 'prey' ? '#10b981' : '#334155',
                  color: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                🟢 Rôle Lapin
              </button>
            </div>
          </div>

          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '24px' }}>
            Activez votre radar GPS et choisissez votre destin. Approchez-vous à moins de <strong style={{ color: '#ffffff' }}>5 mètres</strong> d'un joueur "Lapin" pour lui voler ses pièces d'or. Mais attention, le Lapin peut fuir, utiliser des boucliers ou se cacher dans des abris !
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            
            <div style={{
              backgroundColor: activeRole === 'predator' ? 'rgba(239, 68, 68, 0.12)' : '#0f172a',
              padding: '24px',
              borderRadius: '16px',
              border: activeRole === 'predator' ? '2px solid #ef4444' : '1px solid #334155',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px' }}>🎯</span>
                <h3 style={{ color: '#ef4444', margin: 0, fontSize: '1.25rem' }}>Le Prédateur (Chasseur)</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                Guettez les signaux faibles sur votre radar. Rapprochez-vous en silence. Une fois dans le cercle de contact (5 mètres), lancez l'attaque pour siphonner le butin adverse.
              </p>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7 }}>
                <li>Pistage en temps réel par balises GPS</li>
                <li>Vol instantané des pièces d'or à moins de 5m</li>
                <li>Armes tactiques pour briser les boucliers</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: activeRole === 'prey' ? 'rgba(16, 185, 129, 0.12)' : '#0f172a',
              padding: '24px',
              borderRadius: '16px',
              border: activeRole === 'prey' ? '2px solid #10b981' : '1px solid #334155',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px' }}>🐇</span>
                <h3 style={{ color: '#10b981', margin: 0, fontSize: '1.25rem' }}>La Proie (Lapin)</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                Votre trésor attire toutes les convoitises. Exploitez les rues, le dénivelé et les bâtiments réels de votre quartier pour rompre la ligne de mire et protéger vos gains.
              </p>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7 }}>
                <li>Abris sécurisés répertoriés sur la carte réelle</li>
                <li>Déploiement de boucliers énergétiques anti-vol</li>
                <li>Multiplicateurs de pièces pour chaque minute de survie</li>
              </ul>
            </div>

          </div>
        </div>

        {/* SECTION 2 : DES POUVOIRS DEVASTATEURS */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚡</span> DES POUVOIRS DÉVASTATEURS
          </h2>
          <p style={{ color: '#94a3b8', margin: '0 0 22px 0', fontSize: '1.05rem' }}>
            Utilisez les pièces récoltées pour acheter des pouvoirs tactiques et renverser le cours de chaque traque :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {tacticalPowers.map((power, idx) => (
              <div key={idx} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '32px' }}>{power.icon}</div>
                  <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.06)', color: power.color, border: `1px solid ${power.color}40`, fontWeight: 'bold' }}>
                    {power.range}
                  </span>
                </div>
                <h3 style={{ color: power.color, margin: 0, fontSize: '1.25rem' }}>{power.title}</h3>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.96rem', lineHeight: 1.65 }}>{power.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 : CLANS, TRAÎTRES ET ALLIANCES */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '36px'
        }}>
          <h2 style={{ color: '#f59e0b', marginTop: 0, marginBottom: '12px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🛡️</span> CLANS, TRAÎTRES ET ALLIANCES
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '22px', fontSize: '1.08rem', lineHeight: 1.7 }}>
            Créez un Clan, placez un <strong style={{ color: '#ffffff' }}>Coffre-fort</strong> sur la carte réelle et déposez-y votre butin collectif. Protégez-le avec un code PIN secret. Mais méfiez-vous... vos propres alliés peuvent vous trahir pour vider le coffre ! Mettez des primes sur la tête des traîtres pour que l'ensemble de la communauté se lance à leurs trousses.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏦</div>
              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1rem' }}>Coffres-Forts Géolocalisés</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Ancrez un coffre réel à un endroit stratégique de votre ville et sécurisez-le par un code PIN.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗡️</div>
              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1rem' }}>Trahison &amp; Vol Interne</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Vos coéquipiers peuvent dérober le magot. La confiance est votre ressource la plus précieuse.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📜</div>
              <h4 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '1rem' }}>Primes Mondiales (Bounties)</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Mettez à prix la tête d'un traître pour transformer tous les chasseurs de la région en ses pires ennemis.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4 : UN MONDE VIVANT (BOTS IA) & GAGNEZ DE L'ARGENT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>

          {/* BOTS IA TURING-APEX */}
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(46, 16, 101, 0.4) 100%)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', padding: '5px 12px', borderRadius: '999px', marginBottom: '14px' }}>
              <span style={{ color: '#c084fc', fontWeight: 'bold', fontSize: '12px' }}>🤖 MOTEUR IA TURING-APEX</span>
            </div>
            <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '12px', fontSize: '1.4rem' }}>
              Un Monde Vivant, Même en Solo
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
              Même si vous êtes le seul joueur actif dans votre quartier, l'Intelligence Artificielle <strong style={{ color: '#ffffff' }}>Turing-Apex</strong> de GeoHunt peuple la carte de bots intelligents, de World Bosses épiques et de caisses de butin (Airdrops) à pirater en temps réel.
            </p>
          </div>

          {/* GAGNEZ DE L'ARGENT RÉEL PAYPAL */}
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(6, 78, 59, 0.4) 100%)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '5px 12px', borderRadius: '999px', marginBottom: '14px' }}>
              <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '12px' }}>💶 CASH-OUT PAYPAL DIRECT</span>
            </div>
            <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '12px', fontSize: '1.4rem' }}>
              Gagnez de l'Argent Réel
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
              Vos pièces ont une vraie valeur ! Amassez <strong style={{ color: '#34d399' }}>1000 pièces d'or</strong> dans le jeu et échangez-les directement contre <strong style={{ color: '#34d399' }}>5€ transférés sur votre compte PayPal</strong>. Retraits sécurisés avec validation biométrique (FaceID / TouchID).
            </p>
          </div>

        </div>

        {/* SECTION 5 : FONCTIONNALITÉS CLÉS */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ color: 'white', marginBottom: '14px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📱</span> Fonctionnalités clés
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
            {keyFeatures.map((feat, idx) => (
              <div key={idx} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '22px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{feat.icon}</div>
                <h3 style={{ color: '#ef4444', margin: '0 0 8px 0', fontSize: '1.15rem' }}>{feat.title}</h3>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.94rem', lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION NOTE */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '22px 28px',
          marginBottom: '36px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
            Téléchargez GeoHunt, rejoignez la traque et devenez le maître de votre ville !
          </div>
          <div style={{ color: '#94a3b8', fontSize: '13px' }}>
            (Note : GeoHunt nécessite une connexion Internet active et l'accès à votre position GPS précise).
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
              🛡️ Transparence, Géolocalisation &amp; Protection des Données
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '600px' }}>
              Consultez nos documents juridiques rédigés sur mesure pour GeoHunt en conformité avec le RGPD, l'Apple App Store et Google Play.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/geohunt/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#ef4444', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/geohunt/terms" style={{ ...btnOutlineStyle, borderColor: '#ef4444', color: '#ef4444' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>

        {/* SECTION FOOTER DE L'APPLI */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          color: '#94a3b8',
          fontSize: '13px'
        }}>
          <div>
            Application <strong style={{ color: '#ffffff' }}>GeoHunt</strong> (bundle <code style={{ color: '#f87171' }}>com.parrel.geohunt</code>) • Parrel Studio
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="mailto:support.parrel@gmail.com" style={{ color: '#ef4444', textDecoration: 'none' }}>
              Assistance : support.parrel@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 🔒 PAGE : POLITIQUE DE CONFIDENTIALITÉ — GEOHUNT (/geohunt/privacy)
// ==========================================
function GeoHuntPrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/geohunt" style={{ color: '#ef4444', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à GeoHunt
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#ef4444', color: 'white' }}>GeoHunt</span>
            <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>Conformité RGPD &amp; Géolocalisation</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — GeoHunt
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 14 Octobre 2024 • Application : GeoHunt • Bundle ID : com.parrel.geohunt
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> GeoHunt : Le Radar de Survie</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur / Développeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle HTTPS :</strong> <a href="https://parrel.vercel.app/geohunt/privacy" style={{ color: '#ef4444', textDecoration: 'none' }}>https://parrel.vercel.app/geohunt/privacy</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact DPO / Support :</strong> <a href="mailto:support.parrel@gmail.com" style={{ color: '#ef4444', textDecoration: 'none' }}>support.parrel@gmail.com</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            Bienvenue sur GeoHunt. La protection de vos données personnelles est notre priorité. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>

            {/* 1. Données collectées */}
            <section>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>1. Données collectées</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>
                  <strong style={{ color: '#ffffff' }}>Données de localisation GPS (Crucial) :</strong> GeoHunt est un jeu basé sur la localisation. Nous collectons votre position précise en temps réel (au premier plan) et en arrière-plan (si vous activez le mode Radar) pour permettre les mécaniques de jeu (calcul des distances, rencontres, apparition de coffres).
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Informations de compte :</strong> Adresse e-mail, pseudonyme, mot de passe (crypté via Firebase Auth).
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Données de jeu :</strong> Historique de vos matchs, pièces virtuelles, statistiques de jeu, appartenance à un clan.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Données financières :</strong> Votre adresse e-mail PayPal (uniquement lorsque vous demandez un retrait d'argent). Nous ne stockons aucune carte bancaire.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Données de l'appareil :</strong> Identifiants publicitaires, adresses IP, tokens de notifications Push (FCM), et vérification d'intégrité de l'appareil (Firebase App Check).
                </li>
              </ul>
            </section>

            {/* 2. Utilisation des données */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>2. Utilisation des données</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Fournir et synchroniser l'expérience multijoueur en temps réel.</li>
                <li>Gérer le système de récompenses et les transferts PayPal.</li>
                <li>Vous envoyer des notifications Push (attaques imminentes, invitations).</li>
                <li>Lutter contre la triche (Spoofing GPS) via des algorithmes de sécurité et le Mode Conduite.</li>
              </ul>
            </section>

            {/* 3. Partage des données */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>3. Partage des données</h2>
              <p style={{ marginBottom: '12px' }}>
                Vos données ne sont jamais vendues. Elles sont partagées uniquement avec nos prestataires techniques pour le fonctionnement du jeu :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Google / Firebase :</strong> Hébergement de la base de données, authentification, notifications Push (FCM) et intégrité App Check.</li>
                <li><strong style={{ color: '#ffffff' }}>RevenueCat :</strong> Gestion de vos abonnements Premium (Apple / Google).</li>
                <li><strong style={{ color: '#ffffff' }}>PayPal :</strong> Uniquement votre e-mail lors du paiement de vos gains.</li>
              </ul>
            </section>

            {/* 4. Sécurité et Biométrie */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>4. Sécurité et Biométrie</h2>
              <p style={{ margin: 0 }}>
                La position exacte des joueurs inactifs est volontairement brouillée (Fog of War) pour des raisons de confidentialité et de sécurité physique. Les demandes de retrait PayPal sont protégées par l'authentification biométrique locale de votre téléphone (FaceID/TouchID) que l'application ne stocke pas.
              </p>
            </section>

            {/* 5. Conservation et Suppression */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>5. Conservation et Suppression</h2>
              <p style={{ margin: 0 }}>
                Vous pouvez demander la suppression complète de votre compte, de vos messages et de vos données GPS directement depuis les paramètres de l'application ou en nous contactant à : <a href="mailto:support.parrel@gmail.com" style={{ color: '#ef4444', textDecoration: 'none' }}>support.parrel@gmail.com</a>.
              </p>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/geohunt/terms" style={{ ...btnPrimaryStyle, backgroundColor: '#ef4444' }}>
              Voir les Conditions Générales (CGU / EULA) →
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
// 📜 PAGE : CONDITIONS GÉNÉRALES & EULA — GEOHUNT (/geohunt/terms)
// ==========================================
function GeoHuntTermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/geohunt" style={{ color: '#ef4444', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à GeoHunt
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#ef4444', color: 'white' }}>GeoHunt</span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Contrat EULA &amp; CGU</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation et Contrat de Licence d'Utilisateur Final (CGU / EULA) — GeoHunt
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 14 Octobre 2024 • Application : GeoHunt • Bundle ID : com.parrel.geohunt
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> GeoHunt : Le Radar de Survie</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>Bundle ID :</strong> <code>com.parrel.geohunt</code></div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle HTTPS :</strong> <a href="https://parrel.vercel.app/geohunt/terms" style={{ color: '#ef4444', textDecoration: 'none' }}>https://parrel.vercel.app/geohunt/terms</a></div>
            <div><strong style={{ color: '#ffffff' }}>EULA Standard Apple :</strong> <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" style={{ color: '#f87171', textDecoration: 'underline' }}>Apple Licensed Application End User License Agreement</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact Support :</strong> <a href="mailto:support.parrel@gmail.com" style={{ color: '#ef4444', textDecoration: 'none' }}>support.parrel@gmail.com</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            Veuillez lire attentivement ces conditions avant d'utiliser GeoHunt. En créant un compte, vous acceptez ce contrat.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>

            {/* 1. Avertissements de Sécurité */}
            <section>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                1. Avertissements de Sécurité (TRÈS IMPORTANT)
              </h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>
                  <strong style={{ color: '#ffffff' }}>Environnement Réel :</strong> GeoHunt se joue dans le monde réel. Vous devez toujours être attentif à votre environnement. Ne jouez pas en conduisant un véhicule (le jeu intègre un blocage automatique au-dessus de 20 km/h).
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Propriété privée :</strong> Vous ne devez en aucun cas pénétrer sur des propriétés privées, des zones dangereuses ou restreintes pour attraper un joueur ou ouvrir un coffre virtuel.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Décharge de responsabilité :</strong> Le développeur de GeoHunt décline toute responsabilité en cas d'accident, de blessure, de dommage matériel (smartphone cassé) ou d'infraction à la loi commise par l'utilisateur lors de l'utilisation de l'application.
                </li>
              </ul>
            </section>

            {/* 2. Monnaie Virtuelle et Retraits PayPal */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                2. Monnaie Virtuelle (Pièces) et Retraits PayPal
              </h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>
                  <strong style={{ color: '#ffffff' }}>Valeur :</strong> Les "Pièces" gagnées dans le jeu sont une monnaie virtuelle.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Retrait réel :</strong> Le jeu propose d'échanger 1000 pièces contre 5€ via PayPal. Cette offre est soumise à la vérification manuelle de nos équipes pour lutter contre la triche.
                </li>
                <li>
                  <strong style={{ color: '#ef4444' }}>Annulation :</strong> Toute triche détectée (utilisation de Fake GPS, spoofing, exploitation de bugs, bots tiers) entraînera le bannissement du compte et l'annulation immédiate des gains, sans compensation.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Bots IA Turing-Apex :</strong> Les entités gérées par l'IA (Bots) font partie intégrante du jeu et peuvent légitimement voler vos pièces virtuelles. Aucun remboursement de pièces ne sera effectué suite à une action de l'IA.
                </li>
              </ul>
            </section>

            {/* 3. Abonnements Premium */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                3. Abonnements Premium (In-App Purchases)
              </h2>
              <p style={{ marginBottom: '10px' }}>
                GeoHunt propose des abonnements "Premium" débloquant des avantages en jeu (Joystick gratuit, multiplicateur de pièces).
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Les paiements sont traités par les magasins d'applications (App Store / Google Play) via RevenueCat.</li>
                <li>L'abonnement se renouvelle automatiquement sauf annulation 24h avant la fin de la période en cours depuis les paramètres de votre OS.</li>
              </ul>
            </section>

            {/* 4. Comportement des joueurs et Modération */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                4. Comportement des joueurs et Modération
              </h2>
              <p style={{ marginBottom: '10px' }}>
                GeoHunt inclut un système de messagerie, de clans et de "Titres".
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Tout comportement abusif, harcèlement, menace physique réelle, ou contenu inapproprié dans le chat entraînera un bannissement permanent.</li>
                <li>Un système de signalement est disponible pour dénoncer les messages toxiques. Les signalements sont traités sous 24h par notre équipe.</li>
              </ul>
            </section>

            {/* 5. Propriété Intellectuelle */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                5. Propriété Intellectuelle
              </h2>
              <p style={{ margin: 0 }}>
                L'application, ses codes (incluant le moteur de bots Turing-Apex), son design et ses éléments graphiques (avatars) appartiennent exclusivement au développeur de GeoHunt. Vous bénéficiez d'une licence personnelle, non transférable et révocable d'utilisation de l'application.
              </p>
            </section>

            {/* 6. Modification du service */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                6. Modification du service
              </h2>
              <p style={{ margin: 0 }}>
                Le développeur se réserve le droit de modifier les mécaniques de jeu, l'équilibrage des armes, le coût des pouvoirs, ou le taux de conversion Pièces/Euros à tout moment pour préserver l'économie du jeu.
              </p>
            </section>

            {/* 7. Contact */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                7. Contact
              </h2>
              <p style={{ margin: 0 }}>
                Pour tout litige, signalement ou problème technique, contactez : <a href="mailto:support.parrel@gmail.com" style={{ color: '#ef4444', textDecoration: 'none' }}>support.parrel@gmail.com</a>.
              </p>
            </section>

            {/* Avertissement Juridique */}
            <section style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ color: '#f59e0b', fontWeight: 'bold', marginBottom: '6px' }}>⚠️ Avertissement Juridique</div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#94a3b8' }}>
                Ces textes sont rédigés sur la base de la logique métier du code source de GeoHunt. Il est recommandé de les faire relire par un conseiller juridique pour s'assurer de leur totale conformité avec les lois de votre juridiction (ex: RGPD en Europe, lois sur les jeux d'argent/récompenses).
              </p>
            </section>

            {/* 8. Dispositions Spécifiques Apple App Store EULA */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '12px' }}>
                8. Dispositions Spécifiques et Mentions Obligatoires Apple (EULA App Store)
              </h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Parties au Contrat :</strong> Le présent contrat (EULA) est conclu exclusivement entre vous et Parrel Studio, et non avec Apple Inc. Parrel Studio est seul responsable de l'Application GeoHunt et de son contenu.</li>
                <li><strong style={{ color: '#ffffff' }}>Portée de la Licence :</strong> La licence concédée pour GeoHunt est limitée à une licence non transférable d'utilisation sur tout appareil de marque Apple (iPhone, iPad) que vous possédez ou contrôlez.</li>
                <li><strong style={{ color: '#ffffff' }}>Maintenance et Assistance :</strong> Parrel Studio est seul responsable de la fourniture des services de maintenance et d'assistance relatifs à GeoHunt. Apple n'a aucune obligation de maintenance ou d'assistance pour GeoHunt.</li>
                <li><strong style={{ color: '#ffffff' }}>Garantie :</strong> En cas de défaut de conformité de GeoHunt avec toute garantie légale applicable, vous pouvez en informer Apple, qui pourra rembourser le prix d'achat éventuel payé sur l'App Store. Dans toute la mesure permise par le droit applicable, Apple n'aura aucune autre obligation de garantie.</li>
                <li><strong style={{ color: '#ffffff' }}>Tiers Bénéficiaire Apple :</strong> Vous reconnaissez et acceptez qu'Apple et ses filiales sont des tiers bénéficiaires des présentes CGU / EULA et qu'Apple a le droit de faire appliquer ces conditions à votre encontre.</li>
              </ul>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/geohunt/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#ef4444' }}>
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
// 🥳 PLAYFUN - PRÉSENTATION MARKETING & APP SHOWCASE
// ==========================================
function PlayfunPage() {
  const [storeNotice, setStoreNotice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleStoreClick = (storeName) => {
    setStoreNotice(`Playfun sera prochainement disponible en téléchargement direct sur ${storeName}. Préparez vos soirées et vos amis !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const gameCategories = [
    {
      name: 'Déduction & Bluff',
      icon: '🕵️',
      color: '#ef4444',
      desc: 'Démasquez les imposteurs et mentez avec panache.',
      games: [
        'Loup-Garou (+20 rôles : Loup Blanc, Pyromancien, Dictateur, Rat Malade…)',
        'Infiltré & Mr. White (Undercover)',
        'Le Menteur',
        'Skull'
      ]
    },
    {
      name: 'Cartes & Stratégie',
      icon: '🃏',
      color: '#3b82f6',
      desc: 'Défiez la chance et calculez chaque coup.',
      games: [
        'Uno',
        'Président',
        'Poker Texas Hold\'em',
        'Zéro Pointé (Skyjo)',
        'Mille Bornes',
        'Rami & Belote',
        'Big Two & Zombie!'
      ]
    },
    {
      name: 'Plateau & Réflexion',
      icon: '♟️',
      color: '#10b981',
      desc: 'Les grands classiques du jeu de société réinventés.',
      games: [
        'Petits Chevaux (Classique ou 2v2)',
        'Blokus',
        'Yams',
        'Dominos',
        'Bataille Navale',
        'Jeu de Dames'
      ]
    },
    {
      name: 'Dessin, Mots & Rapidité',
      icon: '🎨',
      color: '#8b5cf6',
      desc: 'Faites preuve de créativité et de réactivité.',
      games: [
        'Pictionary & Gribouillis (Téléphone Arabe illustré)',
        'Time\'s Up & Codenames',
        'Taboo & Just One',
        'Petit Bac & Devine Tête (gyroscope)',
        'Dobble & Cadavre Exquis'
      ]
    },
    {
      name: 'Ambiance & Soirée',
      icon: '🎉',
      color: '#f59e0b',
      desc: 'Fous rires garantis autour d\'un verre ou en ligne.',
      games: [
        'Blanc Manger Coco',
        'Photo Roulette (photos éphémères)',
        'Action ou Vérité',
        'Qui Pourrait le Plus ?',
        'Le Roi des Mèmes & Le Juge',
        'La Patate Chaude, Le Dilemme & Jeu de la Pièce'
      ]
    }
  ];

  const exclusiveFeatures = [
    {
      icon: '📹',
      title: 'Visio & Vocal en Direct (LiveKit)',
      desc: 'Voyez les réactions en direct de vos amis, lisez leurs expressions en plein bluff et débattez en temps réel grâce au flux audio/vidéo chiffré intégré.'
    },
    {
      icon: '🤖',
      title: 'Générateur de Thèmes par IA (VIP)',
      desc: 'Créez vos propres listes de mots, cartes Taboo ou questions personnalisées en 3 secondes grâce à l\'IA (« Harry Potter », « Années 90 », « Anecdotes de bureau »…).'
    },
    {
      icon: '🏆',
      title: 'Matchmaking Mondial & +100 Badges',
      desc: 'Rejoignez des joueurs du monde entier, grimpez en niveaux, accumulez de l\'XP et débloquez une immense collection de badges de maîtrise.'
    },
    {
      icon: '🧠',
      title: 'IA Anti-Blocage Intelligente',
      desc: 'Un ami doit s\'absenter ou perd sa connexion ? L\'ordinateur (IA) prend automatiquement le relais pour que la partie ne soit jamais interrompue.'
    }
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.35)', padding: '6px 14px', borderRadius: '999px', marginBottom: '16px' }}>
            <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '13px' }}>🥳 Playfun • Jeux de Soirée &amp; Société entre Amis</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '0', marginBottom: '14px', fontSize: 'clamp(1.9rem, 4.2vw, 2.85rem)', lineHeight: 1.25, fontWeight: 800 }}>
            Playfun : L'Application Ultime de Soirée
          </h1>

          <div style={{ color: '#fbbf24', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.02em' }}>
            +35 jeux cultes en local ou en ligne avec vidéo, salons et thèmes IA !
          </div>

          <p style={{ color: '#cbd5e1', fontSize: '1.18rem', lineHeight: 1.65, maxWidth: '900px', margin: '0 0 28px 0' }}>
            Transformez n’importe quel moment entre amis, en famille ou à distance en une soirée mémorable ! <strong style={{ color: '#ffffff' }}>Playfun (Jeu de Soirée)</strong> réunit plus de 35 jeux de société, de cartes, de bluff, de dessin et d'ambiance dans une seule application ultra-complète, jouable aussi bien autour d'une table (sur un seul téléphone) qu'en multijoueur en ligne avec chat vidéo et vocal intégré.
          </p>

          {/* BADGES MODES DE JEU */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
            <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              📱 Autour d'un seul téléphone
            </span>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🌐 Multijoueur en ligne
            </span>
            <span style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              📹 Visio &amp; Vocal LiveKit
            </span>
            <span style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              ✨ Générateur de thèmes IA
            </span>
          </div>

          {/* BOUTONS TELECHARGEMENT STORES */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '22px' }}>

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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.793 12 3.61 22.185A2.32 2.32 0 0 1 3 20.573V3.427c0-.623.23-1.192.609-1.613z" fill="#00C1A6" />
                <path d="M17.202 8.59L13.793 12l3.41 3.41 3.865-2.222c.907-.521.907-1.854 0-2.376L17.202 8.59z" fill="#FFD100" />
                <path d="M3.609 1.814L13.793 12l3.409-3.41-11.41-6.559c-.569-.327-1.22-.327-1.792.007l6.009 6.009z" fill="#00A0FF" />
                <path d="M13.793 12L3.609 22.186c.572.334 1.223.334 1.792.007l11.41-6.559-3.018-3.634z" fill="#FF3333" />
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.05-.52 2.67-1.27z" />
              </svg>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Télécharger dans l'</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>App Store</div>
              </div>
            </button>

          </div>

          {storeNotice && (
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#fde68a', fontSize: '14px', maxWidth: '640px', marginBottom: '20px' }}>
              ℹ️ {storeNotice}
            </div>
          )}
        </div>

        {/* SECTION 1 : LE CATALOGUE GÉANT DE +35 JEUX */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          marginBottom: '36px',
        }}>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '8px', fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎮</span> Un Catalogue Géant de +35 Jeux Inclus
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '22px' }}>
            Explorez les 5 grandes catégories pour animer vos apéros, vos soirées étudiantes ou vos week-ends en famille :
          </p>

          {/* Onglets de sélection de catégorie */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
            {gameCategories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCategory(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  backgroundColor: selectedCategory === idx ? cat.color : '#0f172a',
                  color: selectedCategory === idx ? '#ffffff' : '#94a3b8',
                  transition: 'all 0.2s ease',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: selectedCategory === idx ? cat.color : '#334155'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Contenu de la catégorie sélectionnée */}
          <div style={{
            backgroundColor: '#0f172a',
            padding: '26px',
            borderRadius: '16px',
            border: `1px solid ${gameCategories[selectedCategory].color}40`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '32px' }}>{gameCategories[selectedCategory].icon}</span>
              <div>
                <h3 style={{ color: gameCategories[selectedCategory].color, margin: 0, fontSize: '1.35rem' }}>
                  {gameCategories[selectedCategory].name}
                </h3>
                <div style={{ color: '#94a3b8', fontSize: '0.92rem' }}>{gameCategories[selectedCategory].desc}</div>
              </div>
            </div>

            <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {gameCategories[selectedCategory].games.map((game, gIdx) => (
                <div key={gIdx} style={{
                  backgroundColor: '#1e293b',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  fontSize: '0.96rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: gameCategories[selectedCategory].color }}>✦</span>
                  <span>{game}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2 : FONCTIONNALITÉS EXCLUSIVES */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✨</span> Fonctionnalités Exclusives
          </h2>
          <p style={{ color: '#94a3b8', margin: '0 0 22px 0', fontSize: '1.05rem' }}>
            Une expérience connectée pensée pour maximiser les rires et supprimer toutes les contraintes techniques :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {exclusiveFeatures.map((feat, idx) => (
              <div key={idx} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '32px' }}>{feat.icon}</div>
                <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.2rem' }}>{feat.title}</h3>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.94rem', lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 : NIVEAUX DE DIFFICULTÉ ET AMBIANCE */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '36px'
        }}>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '12px', fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎯</span> Modes de Difficulté Adaptés à Tous les Publics
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px', fontSize: '1.02rem', lineHeight: 1.65 }}>
            Choisissez en un clic l'intensité des questions et des gages selon les joueurs présents :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.4)' }}>
              <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px' }}>🟢 Mode Soft</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                Parfait pour jouer en famille ou avec des plus jeunes. Questions bienveillantes, gages légers et culture pop.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
              <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px' }}>🟡 Mode Hard</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                Pour les soirées entre amis où tout le monde se connaît bien. Révélations croustillantes et débats enflammés.
              </p>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px' }}>🔴 Mode Hardcore (16+)</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                Humour noir, second degré piquant et vérités sans filtre. Réservé aux joueurs majeurs ou avertis.
              </p>
            </div>
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
              🛡️ Protection des Données, Visio &amp; Modération UGC
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '600px' }}>
              Consultez nos documents juridiques rédigés sur mesure pour Playfun en conformité avec le RGPD (flux vidéo non enregistrés, suppression instantanée des photos Photo Roulette) et les exigences Apple App Store / Google Play.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/playfun/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#f59e0b', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/playfun/terms" style={{ ...btnOutlineStyle, borderColor: '#f59e0b', color: '#f59e0b' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>

        {/* SECTION FOOTER DE L'APPLI */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          color: '#94a3b8',
          fontSize: '13px'
        }}>
          <div>
            Application <strong style={{ color: '#ffffff' }}>Playfun</strong> (Jeu de Soirée) • Édité par Parrel Studio
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="mailto:support.parrel@gmail.com" style={{ color: '#fbbf24', textDecoration: 'none' }}>
              Assistance : support.parrel@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 🔒 PAGE : POLITIQUE DE CONFIDENTIALITÉ — PLAYFUN (/playfun/privacy)
// ==========================================
function PlayfunPrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/playfun" style={{ color: '#f59e0b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à Playfun
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#f59e0b', color: 'white' }}>Playfun</span>
            <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>Conformité RGPD &amp; Flux Multimédia</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — Jeu de Soirée / Playfun
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 14 octobre 2026 • Application : Playfun (Jeu de Soirée) • Éditeur : Parrel
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> Jeu de Soirée / Playfun</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel (Corentin Parrel, France)</div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle HTTPS :</strong> <a href="https://parrel.vercel.app/playfun/privacy" style={{ color: '#fbbf24', textDecoration: 'none' }}>https://parrel.vercel.app/playfun/privacy</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact DPO / Support :</strong> <a href="mailto:support.parrel@gmail.com" style={{ color: '#fbbf24', textDecoration: 'none' }}>support.parrel@gmail.com</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            La présente Politique de Confidentialité détaille la manière dont <strong>Parrel</strong> (« nous ») collecte, utilise et protège vos données personnelles au sein de l'application <strong>Jeu de Soirée / Playfun</strong>.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>

            {/* 1. Données Collectées */}
            <section>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>1. Données Collectées</h2>
              <p style={{ marginBottom: '10px' }}>
                Dans le cadre du fonctionnement de l'Application, nous collectons uniquement les données strictement nécessaires :
              </p>
              <ol style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>
                  <strong style={{ color: '#ffffff' }}>Données de compte et d'authentification :</strong> Identifiant unique (UID Firebase), adresse e-mail (si connexion par e-mail / Google / Apple) et pseudonyme choisi par l'Utilisateur.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Données de progression et sociales :</strong> Niveau, points d'expérience (XP), pièces virtuelles, badges débloqués, statistiques de jeu, liste d'amis et historique de thèmes IA enregistrés.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Données multimédias temporaires (avec votre permission explicite) :</strong>
                  <ul style={{ margin: '6px 0 6px 20px', color: '#94a3b8' }}>
                    <li><strong style={{ color: '#ffffff' }}>Caméra et Microphone :</strong> Utilisés uniquement lorsque vous activez volontairement l'audio ou la vidéo dans une partie ou un salon. Les flux sont transmis en direct (via LiveKit) et <span style={{ color: '#22c55e', fontWeight: 'bold' }}>ne sont jamais enregistrés sur nos serveurs</span>.</li>
                    <li><strong style={{ color: '#ffffff' }}>Galerie Photos (Jeu Photo Roulette) :</strong> Lorsque vous participez à une partie de Photo Roulette, seules les photos que vous sélectionnez sont téléversées temporairement dans un dossier dédié à la partie (via Supabase Storage). <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Ces photos sont automatiquement et définitivement supprimées dès la fin de la partie</span> ou le retour au salon.</li>
                    <li><strong style={{ color: '#ffffff' }}>Capteurs de mouvement (Accéléromètre/Gyroscope) :</strong> Utilisés localement sur votre appareil pour détecter l'inclinaison du téléphone dans le jeu « Devine Tête ».</li>
                  </ul>
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Notifications Push :</strong> Jeton Firebase Cloud Messaging (FCM) pour vous envoyer des invitations de jeu ou des demandes d'amis.
                </li>
              </ol>
            </section>

            {/* 2. Finalités du Traitement */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>2. Finalités du Traitement</h2>
              <p style={{ marginBottom: '10px' }}>Vos données sont utilisées exclusivement pour :</p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Assurer le fonctionnement du multijoueur en temps réel, du matchmaking et de la sauvegarde de votre progression ;</li>
                <li>Permettre la communication audio/vidéo et le système d'amis / invitations ;</li>
                <li>Générer des listes de mots personnalisées via notre prestataire d'IA ;</li>
                <li>Garantir la sécurité des parties et prévenir la triche ou les abus.</li>
              </ul>
            </section>

            {/* 3. Sous-traitants et Services Tiers */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>3. Sous-traitants et Services Tiers</h2>
              <p style={{ marginBottom: '12px' }}>
                Nous ne vendons jamais vos données à des tiers. Nous nous appuyons sur des infrastructures sécurisées conformes aux standards internationaux :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Google Firebase (Authentication, Firestore, Realtime Database, Cloud Functions, FCM) :</strong> Hébergement des comptes, états de parties et notifications.</li>
                <li><strong style={{ color: '#ffffff' }}>Supabase Storage :</strong> Hébergement éphémère des images de jeu (supprimées en fin de partie).</li>
                <li><strong style={{ color: '#ffffff' }}>LiveKit Cloud :</strong> Routage chiffré des flux audio et vidéo en temps réel.</li>
                <li><strong style={{ color: '#ffffff' }}>SiliconFlow (Modèle Qwen) :</strong> Traitement des instructions textuelles (« prompts ») pour la génération de mots par IA (aucune donnée personnelle n'est transmise au modèle).</li>
              </ul>
            </section>

            {/* 4. Durée de Conservation et Suppression Automatique */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>4. Durée de Conservation et Suppression Automatique</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Photos de jeu :</strong> Supprimées immédiatement à la clôture de la partie.</li>
                <li><strong style={{ color: '#ffffff' }}>Salons et Parties terminées :</strong> Nettoyés et purgés automatiquement de nos serveurs toutes les 24 à 48 heures.</li>
                <li><strong style={{ color: '#ffffff' }}>Compte Utilisateur :</strong> Conservé tant que votre compte est actif. Vous pouvez demander la suppression totale de votre compte et de vos données à tout moment depuis l'Application ou par e-mail.</li>
              </ul>
            </section>

            {/* 5. Vos Droits (RGPD) */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>5. Vos Droits (RGPD)</h2>
              <p style={{ margin: '0 0 10px 0' }}>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données.
              </p>
              <p style={{ margin: 0 }}>
                Pour exercer vos droits ou demander la suppression de votre compte, contactez-nous à : <a href="mailto:support.parrel@gmail.com" style={{ color: '#fbbf24', textDecoration: 'none' }}>support.parrel@gmail.com</a>.
              </p>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/playfun/terms" style={{ ...btnPrimaryStyle, backgroundColor: '#f59e0b' }}>
              Voir les Conditions Générales (CGU / EULA) →
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
// 📜 PAGE : CONDITIONS GÉNÉRALES & EULA — PLAYFUN (/playfun/terms)
// ==========================================
function PlayfunTermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/playfun" style={{ color: '#f59e0b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à Playfun
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#f59e0b', color: 'white' }}>Playfun</span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Contrat EULA &amp; CGU</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation et Contrat de Licence d'Utilisateur Final (CLUF / EULA) — Playfun
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 14 octobre 2026 • Application : Jeu de Soirée / Playfun • Éditeur : Parrel
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> Jeu de Soirée / Playfun</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel (Corentin Parrel, France)</div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle HTTPS :</strong> <a href="https://parrel.vercel.app/playfun/terms" style={{ color: '#fbbf24', textDecoration: 'none' }}>https://parrel.vercel.app/playfun/terms</a></div>
            <div><strong style={{ color: '#ffffff' }}>EULA Standard Apple :</strong> <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" style={{ color: '#fde68a', textDecoration: 'underline' }}>Apple Licensed Application End User License Agreement</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact Support :</strong> <a href="mailto:support.parrel@gmail.com" style={{ color: '#fbbf24', textDecoration: 'none' }}>support.parrel@gmail.com</a></div>
          </div>

          <div style={{ display: 'grid', gap: '28px' }}>

            {/* 1. Objet et Acceptation */}
            <section>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                1. Objet et Acceptation
              </h2>
              <p style={{ margin: '0 0 10px 0' }}>
                Les présentes Conditions Générales d’Utilisation et Contrat de Licence d’Utilisateur Final (ci-après « CGU / EULA ») régissent l'accès et l'utilisation de l'application mobile <strong>Jeu de Soirée / Playfun</strong> (ci-après « l'Application »), éditée par <strong>Parrel</strong> (Corentin Parrel, résidant en France, contact : support.parrel@gmail.com).
              </p>
              <p style={{ margin: 0 }}>
                En créant un compte ou en utilisant l'Application, l'Utilisateur reconnaît avoir lu, compris et accepté sans réserve les présentes CGU / EULA. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser l'Application.
              </p>
            </section>

            {/* 2. Licence d'Utilisation (EULA) */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                2. Licence d'Utilisation (EULA)
              </h2>
              <p style={{ margin: 0 }}>
                L'Éditeur concède à l'Utilisateur une licence personnelle, non exclusive, non transférable et révocable d'utiliser l'Application sur tout appareil compatible dont il est propriétaire ou qu'il contrôle, uniquement pour un usage privé et non commercial. Toute rétro-ingénierie, décompilation, modification ou exploitation commerciale du code source est strictement interdite.
              </p>
            </section>

            {/* 3. Accès, Âge Minimum et Niveaux de Difficulté */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                3. Accès, Âge Minimum et Niveaux de Difficulté
              </h2>
              <p style={{ margin: 0 }}>
                L'Application propose différents modes de difficulté (« Soft », « Hard », « Hardcore »). Certains contenus (notamment le mode « Hardcore » ou certains jeux d'ambiance) comportent de l'humour adulte ou second degré. L'utilisation de ces modes est réservée aux personnes majeures ou âgées d'au moins 16 ans. L'Utilisateur s'engage à choisir un mode adapté aux participants présents.
              </p>
            </section>

            {/* 4. Contenus Générés par les Utilisateurs (UGC) et Modération */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                4. Contenus Générés par les Utilisateurs (UGC) et Modération (Exigence App Store / Play Store)
              </h2>
              <p style={{ marginBottom: '10px' }}>
                L'Application permet aux Utilisateurs d'interagir via :
              </p>
              <ul style={{ margin: '0 0 14px 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Des messages texte (chat de salon et de partie) ;</li>
                <li>Des réponses textuelles, anecdotes et dessins en jeu (Pictionary, Gribouillis, Cadavre Exquis) ;</li>
                <li>Des photos partagées volontairement depuis leur galerie (mode Photo Roulette) ;</li>
                <li>Des flux audio et vidéo en temps réel.</li>
              </ul>
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '16px', borderRadius: '12px', marginBottom: '14px' }}>
                <strong style={{ color: '#f87171' }}>Politique de Tolérance Zéro :</strong>
                <p style={{ margin: '8px 0 0 0', color: '#fecaca', fontSize: '0.94rem' }}>
                  L'Utilisateur est seul responsable des contenus qu'il diffuse. Il est strictement interdit de publier, dessiner, partager ou diffuser tout contenu diffamatoire, injurieux, harcelant, raciste, xénophobe, homophobe, pornographique, sexuellement explicite, violant le droit à l'image ou la vie privée d'autrui (notamment dans Photo Roulette) ou encourageant des actes illégaux.
                </p>
              </div>
              <p style={{ margin: 0 }}>
                En cas de violation, l'Éditeur se réserve le droit de suspendre ou supprimer définitivement le compte de l'Utilisateur, sans préavis ni remboursement. Des outils de signalement et de blocage sont mis à disposition des joueurs dans chaque salon.
              </p>
            </section>

            {/* 5. Intelligence Artificielle (IA) */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                5. Intelligence Artificielle (IA)
              </h2>
              <p style={{ margin: 0 }}>
                Certaines fonctionnalités permettent de générer des mots ou des thèmes via un modèle d'intelligence artificielle tiers. L'Utilisateur s'interdit de soumettre des instructions (« prompts ») contraires à l'ordre public ou aux présentes CGU.
              </p>
            </section>

            {/* 6. Monnaie Virtuelle, XP et Abonnement VIP Premium */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                6. Monnaie Virtuelle, XP et Abonnement VIP Premium
              </h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Pièces et XP :</strong> Les pièces virtuelles, niveaux et badges acquis dans l'Application n'ont aucune valeur monétaire réelle et ne peuvent faire l'objet d'aucun échange ou remboursement en devise réelle.</li>
                <li><strong style={{ color: '#ffffff' }}>Abonnement VIP Premium :</strong> L'Application propose un abonnement optionnel débloquant des avantages (parties illimitées, génération IA, salons vidéo illimités). Les paiements et renouvellements sont gérés directement par les plateformes d'achat (Google Play Store ou Apple App Store) selon leurs propres conditions. L'Utilisateur peut gérer ou résilier son abonnement à tout moment depuis les paramètres de son compte Store.</li>
              </ul>
            </section>

            {/* 7. Responsabilité et Disponibilité */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                7. Responsabilité et Disponibilité
              </h2>
              <p style={{ margin: 0 }}>
                L'Application est fournie « en l'état ». L'Éditeur s'efforce d'assurer la disponibilité des serveurs mais ne saurait être tenu responsable des interruptions de réseau, pertes de connexion ou dommages indirects liés à l'utilisation de l'Application (y compris lors de la réalisation de défis physiques proposés dans des jeux comme Action ou Vérité ou La Patate Chaude, que les joueurs sont toujours libres de refuser).
              </p>
            </section>

            {/* 8. Droit Applicable et Litiges */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                8. Droit Applicable et Litiges
              </h2>
              <p style={{ margin: 0 }}>
                Les présentes CGU / EULA sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action devant les tribunaux compétents.
              </p>
            </section>

            {/* 9. Dispositions Spécifiques Apple App Store EULA */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '12px' }}>
                9. Mentions Obligatoires Apple (EULA App Store)
              </h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Parties au Contrat :</strong> Le présent contrat (EULA) est conclu exclusivement entre vous et Parrel, et non avec Apple Inc. Parrel est seul responsable de l'Application Playfun et de son contenu.</li>
                <li><strong style={{ color: '#ffffff' }}>Portée de la Licence :</strong> La licence concédée pour Playfun est limitée à une licence non transférable d'utilisation sur tout appareil de marque Apple (iPhone, iPad) que vous possédez ou contrôlez.</li>
                <li><strong style={{ color: '#ffffff' }}>Maintenance et Assistance :</strong> Parrel est seul responsable de la fourniture des services de maintenance et d'assistance relatifs à Playfun. Apple n'a aucune obligation de maintenance ou d'assistance.</li>
                <li><strong style={{ color: '#ffffff' }}>Garantie :</strong> En cas de défaut de conformité de Playfun avec toute garantie légale applicable, vous pouvez en informer Apple, qui pourra rembourser le prix d'achat payé sur l'App Store. Dans toute la mesure permise par le droit applicable, Apple n'aura aucune autre obligation de garantie.</li>
                <li><strong style={{ color: '#ffffff' }}>Tiers Bénéficiaire Apple :</strong> Vous reconnaissez et acceptez qu'Apple et ses filiales sont des tiers bénéficiaires des présentes CGU / EULA et qu'Apple a le droit de faire appliquer ces conditions à votre encontre.</li>
              </ul>
            </section>

          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/playfun/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#f59e0b' }}>
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
// 🔒 PAGE : POLITIQUE DE CONFIDENTIALITÉ — ECONAV / WALKMONEY
// ==========================================
function WalkMoneyPrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/walkmoney" style={{ color: '#00bcd4', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à EcoNav / WalkMoney
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#00bcd4', color: '#0f172a', fontWeight: 'bold' }}>EcoNav / WalkMoney</span>
            <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>Conformité RGPD &amp; Stores (Apple / Google)</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — EcoNav / WalkMoney
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 12 Octobre 2026 • Application : EcoNav / WalkMoney • Éditeur : Parrel Studio
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> EcoNav / WalkMoney</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur de l'Application :</strong> EcoNav / WalkMoney (« Nous », « Notre ») — Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle HTTPS :</strong> <a href="https://parrel.vercel.app/walkmoney/privacy" style={{ color: '#00bcd4', textDecoration: 'none' }}>https://parrel.vercel.app/walkmoney/privacy</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact DPO / Support :</strong> <a href="mailto:contact@walkmoney.com" style={{ color: '#00bcd4', textDecoration: 'none' }}>contact@walkmoney.com</a> / <a href="mailto:contact@econav.app" style={{ color: '#00bcd4', textDecoration: 'none' }}>contact@econav.app</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            La présente Politique de Confidentialité décrit la manière dont nous collectons, utilisons, stockons et protégeons vos données personnelles lors de l'utilisation de l'application mobile EcoNav (ci-après « l'Application »), conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et aux législations applicables.
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>

            {/* 1. Responsable du Traitement */}
            <section>
              <h2 style={{ color: '#00bcd4', fontSize: '1.25rem', marginBottom: '10px' }}>1. Responsable du Traitement</h2>
              <p style={{ margin: 0 }}>
                Le responsable du traitement des données est :<br />
                <strong style={{ color: '#ffffff' }}>Parrel Studio (EcoNav / WalkMoney)</strong><br />
                Adresse : France<br />
                Email : <a href="mailto:contact@walkmoney.com" style={{ color: '#00bcd4' }}>contact@walkmoney.com</a>
              </p>
            </section>

            {/* 2. Données Personnelles Collectées */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#00bcd4', fontSize: '1.25rem', marginBottom: '12px' }}>2. Données Personnelles Collectées</h2>
              <p style={{ marginBottom: '14px' }}>
                Dans le cadre strict du bon fonctionnement des services de mobilité, du calcul de cinématique à 60 FPS, de la lutte anti-triche et du versement des récompenses, nous collectons et traitons les données suivantes :
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', border: '1px solid #334155' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                      <th style={{ padding: '12px 14px', color: '#00bcd4', fontWeight: 'bold', width: '22%' }}>Catégorie</th>
                      <th style={{ padding: '12px 14px', color: '#ffffff', fontWeight: 'bold', width: '38%' }}>Données précises</th>
                      <th style={{ padding: '12px 14px', color: '#ffffff', fontWeight: 'bold', width: '40%' }}>Finalité du traitement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#ffffff' }}>Identifiants de compte</td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Adresse e-mail, pseudonyme, identifiant unique Firebase Auth (UID).</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>Création de compte, authentification sécurisée, synchronisation multi-appareils.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #334155', backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#ffffff' }}>Données de localisation GPS (Premier plan et Arrière-plan)</td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Coordonnées géographiques (latitude, longitude, cap, vitesse, altitude, précision).</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>Calcul des itinéraires, mesure des distances parcourues, validation des trajets, calcul des gains en points Lames, détection de présence en boutique et détection de triche.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#ffffff' }}>Capteurs de mouvement</td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Accéléromètre de l'appareil (magnitude, décélération, variations d'accélération).</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>Filtrage cinématique pour lissage de navigation, détection d'arrêt/freinage d'urgence, vérification d'absence d'usage de véhicule motorisé en mode marche/vélo.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #334155', backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#ffffff' }}>Données d'adresses personnelles</td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Coordonnées et libellé du domicile (définis volontairement par l'utilisateur).</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>Point d'ancrage pour les trajets quotidiens, réinitialisation sécurisée des validations d'achats lors du retour au domicile.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#ffffff' }}>Images &amp; Caméra</td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Photographies de tickets de caisse prises via l'Application.</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>Analyse OCR et validation par modèle d'IA pour l'attribution de cashback et fidélité marchande.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #334155', backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#ffffff' }}>Données financières &amp; Abonnements</td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Identifiant anonyme client RevenueCat, historique d'achats in-app (VIP/Premium), tokens de paiement Stripe.</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>Gestion des souscriptions d'abonnements, facturation, déblocage des fonctionnalités Premium.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#ffffff' }}>Données techniques et de sécurité</td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Modèle de téléphone, OS, adresse IP (pour détection de langue/pays), statut root/jailbreak, SafeDevice/App Check token.</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8' }}>Prévention de la fraude, sécurité de l'API, intégrité contre les faux GPS (Mock Location).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Géolocalisation en Arrière-Plan */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#00bcd4', fontSize: '1.25rem', marginBottom: '12px' }}>3. Géolocalisation en Arrière-Plan (Background Location)</h2>
              <p style={{ marginBottom: '12px' }}>
                L'Application requiert l'accès à votre géolocalisation même lorsque l'Application est fermée ou en arrière-plan <strong style={{ color: '#ffffff' }}>uniquement lorsque vous initiez expressément une session de navigation active</strong>.
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Pourquoi ?</strong> Pour enregistrer votre progression, vous attribuer vos Lames, surveiller la déviation de l'itinéraire et détecter l'arrivée à destination sans exiger que l'écran reste continuellement allumé.</li>
                <li><strong style={{ color: '#ffffff' }}>Contrôle absolu :</strong> Vous pouvez arrêter la navigation à tout moment via le bouton « STOP NAVIGATION » ou révoquer l'autorisation dans les paramètres de votre système d'exploitation mobile (iOS ou Android).</li>
              </ul>
            </section>

            {/* 4. Bases Légales du Traitement */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#00bcd4', fontSize: '1.25rem', marginBottom: '12px' }}>4. Bases Légales du Traitement</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Exécution du contrat (Art. 6.1.b RGPD) :</strong> Fourniture du service de navigation, comptabilisation des points Lames et versement du cashback.</li>
                <li><strong style={{ color: '#ffffff' }}>Consentement (Art. 6.1.a RGPD) :</strong> Accès à la géolocalisation précise, à l'appareil photo et aux notifications push.</li>
                <li><strong style={{ color: '#ffffff' }}>Intérêt légitime (Art. 6.1.f RGPD) :</strong> Prévention de la fraude (anti-triche vitesse/faux GPS), sécurité des infrastructures informatiques.</li>
              </ul>
            </section>

            {/* 5. Destinataires et Sous-traitants des Données */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#00bcd4', fontSize: '1.25rem', marginBottom: '12px' }}>5. Destinataires et Sous-traitants des Données</h2>
              <p style={{ marginBottom: '12px' }}>
                Vos données sont traitées par des prestataires techniques de confiance soumis à des clauses de stricte confidentialité :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Google Firebase (Google LLC) :</strong> Authentification, bases de données Firestore, Cloud Functions, hébergement.</li>
                <li><strong style={{ color: '#ffffff' }}>RevenueCat Inc. &amp; Google Play / Apple StoreKit :</strong> Gestion des achats d'abonnements intégrés.</li>
                <li><strong style={{ color: '#ffffff' }}>Stripe Inc. :</strong> Traitement sécurisé des paiements.</li>
                <li><strong style={{ color: '#ffffff' }}>Services de cartographie &amp; routage :</strong> OSRM, OpenStreetMap, Photon (Komoot), Google Directions API.</li>
                <li><strong style={{ color: '#ffffff' }}>Traitement OCR / IA :</strong> Serveurs sécurisés Cloud Functions / APIs d'analyse d'images pour la lecture et la validation de tickets de caisse.</li>
                <li><strong style={{ color: '#ffffff' }}>Open-Meteo :</strong> Requêtes météo et dénivelé (coordonnées transmises sans identifiant nominatif).</li>
              </ul>
              <div style={{ backgroundColor: 'rgba(0, 188, 212, 0.1)', border: '1px solid rgba(0, 188, 212, 0.3)', borderRadius: '10px', padding: '14px 18px', marginTop: '14px', color: '#67e8f9', fontSize: '14px' }}>
                🛡️ <strong>Garantie absolue :</strong> EcoNav ne vend et ne loue aucune donnée personnelle nominative ou de localisation à des courtiers de données (data brokers) ou tiers publicitaires.
              </div>
            </section>

            {/* 6. Durée de Conservation des Données */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#00bcd4', fontSize: '1.25rem', marginBottom: '12px' }}>6. Durée de Conservation des Données</h2>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li><strong style={{ color: '#ffffff' }}>Données de compte :</strong> Conservées pendant toute la durée de vie du compte actif.</li>
                <li><strong style={{ color: '#ffffff' }}>Historique des positions GPS précises :</strong> Les traces de navigation détaillées sont purgées ou anonymisées sous 30 jours après la fin du trajet. Seuls les totaux agrégés (distance, durée, moyenne, points gagnés) sont conservés sur votre profil.</li>
                <li><strong style={{ color: '#ffffff' }}>Photos de tickets de caisse :</strong> Conservées le temps de l'arbitrage comptable et de l'attribution du cashback (durée maximale : 90 jours), puis supprimées définitivement.</li>
              </ul>
            </section>

            {/* 7. Vos Droits */}
            <section style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
              <h2 style={{ color: '#00bcd4', fontSize: '1.25rem', marginBottom: '12px' }}>7. Vos Droits (Conformité RGPD &amp; Apple/Google)</h2>
              <p style={{ marginBottom: '12px' }}>
                Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :
              </p>
              <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                <li>Droit d’accès et de rectification de vos données.</li>
                <li><strong style={{ color: '#00bcd4' }}>Droit à l’effacement (« Droit à l’oubli ») :</strong> Vous pouvez supprimer l'intégralité de votre compte et de vos données associées instantanément depuis l'application via : <code style={{ backgroundColor: '#0f172a', padding: '2px 6px', borderRadius: '4px', color: '#ffffff' }}>Paramètres (Engrenage) &gt; Supprimer mon compte et mes données</code>. Cette opération déclenche un appel serveur irréversible supprimant votre profil, vos points et vos historiques.</li>
                <li>Droit à la limitation et d'opposition au traitement de vos données.</li>
                <li>Droit à la portabilité de vos données.</li>
              </ul>
              <p style={{ marginTop: '14px', marginBottom: 0 }}>
                Pour exercer ces droits par écrit : contactez notre DPO à <a href="mailto:contact@walkmoney.com" style={{ color: '#00bcd4' }}>contact@walkmoney.com</a>. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (France - <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#00bcd4' }}>www.cnil.fr</a>) ou de l'autorité de protection des données compétente dans votre pays.
              </p>
            </section>

          </div>

          {/* Boutons d'action */}
          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/walkmoney/terms" style={{ ...btnPrimaryStyle, backgroundColor: '#00bcd4' }}>
              Consulter les CGU &amp; EULA →
            </Link>
            <Link to="/walkmoney" style={btnOutlineStyle}>
              Retour à EcoNav
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📜 PAGE : CONDITIONS GÉNÉRALES D'UTILISATION (CGU) & CONTRAT DE LICENCE EULA — ECONAV / WALKMONEY
// ==========================================
function WalkMoneyTermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/walkmoney" style={{ color: '#00bcd4', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à EcoNav / WalkMoney
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#00bcd4', color: '#0f172a', fontWeight: 'bold' }}>EcoNav / WalkMoney</span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Contrat EULA &amp; CGU</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation (CGU) et Contrat EULA — EcoNav / WalkMoney
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            En vigueur au : 12 Octobre 2026 • Application : EcoNav / WalkMoney • Éditeur : Parrel Studio
          </div>
        </div>

        {/* Contenu textuel officiel */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '28px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> EcoNav / WalkMoney</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>Contact juridique :</strong> <a href="mailto:contact@walkmoney.com" style={{ color: '#00bcd4', textDecoration: 'none' }}>contact@walkmoney.com</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL officielle :</strong> <a href="https://parrel.vercel.app/walkmoney/terms" style={{ color: '#00bcd4', textDecoration: 'none' }}>https://parrel.vercel.app/walkmoney/terms</a></div>
          </div>

          <div style={{ display: 'grid', gap: '32px' }}>

            {/* BLOC PARTIE 1 : CGU */}
            <div>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(0, 188, 212, 0.15)', border: '1px solid rgba(0, 188, 212, 0.3)', padding: '4px 12px', borderRadius: '8px', color: '#00bcd4', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Partie 1
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginTop: 0, marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                Conditions Générales d’Utilisation (CGU)
              </h2>

              <div style={{ display: 'grid', gap: '22px' }}>
                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>1. Objet et Acceptation</h3>
                  <p style={{ margin: 0 }}>
                    Les présentes Conditions Générales d’Utilisation (les « CGU ») ont pour objet d’encadrer l’accès et l’utilisation de l'application EcoNav (l’« Application »). En créant un compte ou en utilisant l’Application, l'utilisateur (« l'Utilisateur ») accepte sans réserve les présentes CGU.
                  </p>
                </section>

                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>2. Éligibilité et Inscription</h3>
                  <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                    <li>L'Application est accessible à toute personne physique âgée d'au moins 16 ans (ou âge légal de consentement numérique dans votre pays de résidence).</li>
                    <li>L'Utilisateur garantit l'exactitude des informations fournies (pseudonyme, e-mail) et s'engage à ne créer qu'un seul compte par personne physique (interdiction formelle du multicompte).</li>
                  </ul>
                </section>

                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>3. Fonctionnement des Récompenses (Points « Lames »)</h3>
                  <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                    <li><strong style={{ color: '#ffffff' }}>Nature des Lames :</strong> Les Lames sont des points virtuels de fidélité et d'engagement écologique accordés gratuitement par l'Éditeur lors de l'exécution de trajets validés, de défis ou de visionnage de publicités.</li>
                    <li><strong style={{ color: '#ffffff' }}>Absence de valeur monétaire légale :</strong> Les Lames ne constituent ni une monnaie légale, ni de la cryptomonnaie, ni un instrument financier. Elles n'ont aucune valeur de rachat en dehors des options expressément proposées dans l'Application (boutique de récompenses, dons, cashback).</li>
                    <li><strong style={{ color: '#ffffff' }}>Règles d'attribution :</strong> L'attribution des Lames est subordonnée au respect strict des modes de déplacement déclarés (marche, vélo, transports en commun).</li>
                  </ul>
                </section>

                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>4. Politique Anti-Triche et Intégrité du Système</h3>
                  <p style={{ marginBottom: '10px' }}>
                    L'Application intègre des mécanismes algorithmiques avancés de vérification (comparaison de vitesse Doppler, variance d'allure, surveillance de l'accéléromètre, détection de faux GPS / Mock Locations et App Check) :
                  </p>
                  <ol style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                    <li><strong style={{ color: '#ffffff' }}>Dépassement de vitesse :</strong> Tout déplacement à vitesse incompatible avec le mode choisi (ex : vitesse de voiture motorisée en mode marche ou vélo) entraîne l'annulation immédiate du trajet sans attribution de Lames.</li>
                    <li><strong style={{ color: '#ffffff' }}>Déviations d'itinéraire :</strong> Tout écart excessif (&gt; seuil configuré de 3 km en standard, 6 km en VIP) sans correction invalide le trajet.</li>
                    <li><strong style={{ color: '#ffffff' }}>Faux tickets de caisse :</strong> Toute soumission de ticket falsifié, raturé, appartenant à un tiers, scanné plusieurs fois ou non conforme au magasin ciblé entraîne un rejet immédiat et peut conduire au bannissement définitif du compte.</li>
                    <li><strong style={{ color: '#ffffff' }}>Sanctions :</strong> L'Éditeur se réserve le droit de révoquer unilatéralement les Lames indûment perçues et de suspendre ou clôturer tout compte contrevenant à ces règles.</li>
                  </ol>
                </section>

                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>5. Services Payants et Abonnements (« VIP / Premium »)</h3>
                  <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                    <li><strong style={{ color: '#ffffff' }}>Services proposés :</strong> L'Utilisateur peut souscrire à un abonnement VIP payant octroyant des fonctionnalités étendues (tolérance d'écart d'itinéraire élargie, multiplicateurs de points, cashback bonifié, etc.).</li>
                    <li><strong style={{ color: '#ffffff' }}>Facturation :</strong> Les abonnements sont gérés et facturés via les plateformes officielles : Google Play Store (Google Play Billing), Apple App Store (In-App Purchases) ou Stripe.</li>
                    <li><strong style={{ color: '#ffffff' }}>Renouvellement automatique :</strong> L'abonnement se renouvelle automatiquement pour la même durée, sauf résiliation par l'Utilisateur au moins 24 heures avant l'échéance de la période en cours depuis les paramètres de son compte Google Play ou Apple ID.</li>
                    <li><strong style={{ color: '#ffffff' }}>Droit de rétractation :</strong> Les règles légales de rétractation des stores d'applications respectifs (Apple / Google) s'appliquent.</li>
                  </ul>
                </section>

                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>6. Responsabilité et Sécurité Routière</h3>
                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '14px 18px', color: '#fca5a5', fontSize: '14px', marginBottom: '10px' }}>
                    ⚠️ <strong>ATTENTION SÉCURITÉ :</strong> L'Utilisateur est seul responsable de sa propre sécurité et du respect des règles du Code de la Route applicable dans sa juridiction. L'Utilisateur ne doit jamais manipuler l'Application d'une manière qui détourne son attention de la conduite, de la circulation piétonne ou de l'environnement immédiat.
                  </div>
                  <p style={{ margin: 0 }}>
                    L'Application est fournie « en l'état ». L'Éditeur ne saurait être tenu responsable d'éventuelles erreurs cartographiques, travaux, conditions météo ou indisponibilités de transports publics.
                  </p>
                </section>

                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>7. Résiliation</h3>
                  <p style={{ margin: 0 }}>
                    L'Utilisateur peut cesser d'utiliser l'Application et supprimer son compte à tout moment. L'Éditeur peut suspendre ou résilier l'accès d'un Utilisateur en cas de manquement grave aux présentes CGU.
                  </p>
                </section>

                <section>
                  <h3 style={{ color: '#00bcd4', fontSize: '1.15rem', marginBottom: '8px' }}>8. Droit Applicable et Juridiction</h3>
                  <p style={{ margin: 0 }}>
                    Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou exécution relève des tribunaux compétents du ressort du siège de l'Éditeur, sous réserve des règles impératives applicables aux consommateurs.
                  </p>
                </section>
              </div>
            </div>

            {/* BLOC PARTIE 2 : EULA */}
            <div style={{ borderTop: '2px solid #334155', paddingTop: '28px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '8px', color: '#38bdf8', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Partie 2
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginTop: 0, marginBottom: '8px' }}>
                Contrat de Licence d'Utilisateur Final (EULA)
              </h2>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '18px' }}>
                STANDARD END USER LICENSE AGREEMENT (EULA) — Applicable pour la distribution sur l'Apple App Store et le Google Play Store
              </div>

              <div style={{ display: 'grid', gap: '22px' }}>
                <section>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.15rem', marginBottom: '8px' }}>1. Concession de Licence</h3>
                  <p style={{ margin: 0 }}>
                    L'Éditeur vous concède une licence personnelle, non exclusive, non transférable, révocable et limitée pour télécharger, installer et utiliser l'Application EcoNav sur des appareils mobiles compatibles dont vous êtes propriétaire ou détenteur légitime, uniquement pour votre usage personnel et non commercial, conformément aux règles d'usage des conditions de service de l'App Store d'Apple et de Google Play.
                  </p>
                </section>

                <section>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.15rem', marginBottom: '8px' }}>2. Restrictions d'Utilisation</h3>
                  <p style={{ marginBottom: '8px' }}>Vous vous engagez expressément à ne pas :</p>
                  <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                    <li>Décompiler, désosser, désassembler ou tenter de dériver le code source de l'Application ;</li>
                    <li>Modifier, adapter, corriger ou créer des œuvres dérivées de l'Application ;</li>
                    <li>Contourner ou tenter de contourner les mesures de sécurité, de vérification d'intégrité de l'appareil (SafeDevice, App Check) ou les systèmes de détection anti-fraude ;</li>
                    <li>Utiliser des émulateurs, robots, outils de simulation GPS (« Fake GPS / Location Spoofing ») ou scripts automatisés pour générer des trajets fictifs ;</li>
                    <li>Louer, prêter, sous-licencier, distribuer ou transférer l'Application à des tiers.</li>
                  </ul>
                </section>

                <section>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.15rem', marginBottom: '8px' }}>3. Propriété Intellectuelle</h3>
                  <p style={{ margin: 0 }}>
                    L'Application, son interface visuelle, ses algorithmes cinématiques, ses marques, logos et contenus graphiques sont et demeurent la propriété exclusive de l'Éditeur et de ses concédants de licence. Aucun droit de propriété n'est transféré à l'Utilisateur en dehors de la licence d'utilisation concédée à l'article 1.
                  </p>
                </section>

                <section>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.15rem', marginBottom: '8px' }}>4. Absence de Garantie (Disclaimer of Warranties)</h3>
                  <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '13px', color: '#cbd5e1' }}>
                    DANS TOUTE LA MESURE PERMISE PAR LA LOI APPLICABLE, L'APPLICATION EST FOURNIE « EN L'ÉTAT » ET « SELON DISPONIBILITÉ », AVEC TOUS SES DÉFAUTS ET SANS GARANTIE D'AUCUNE SORTE. L'ÉDITEUR DÉCLINE TOUTE GARANTIE EXPRESSE OU IMPLICITE CONCERNANT L'EXACTITUDE DES ITINÉRAIRES GPS, L'ESTIMATION DU TEMPS DE PARCOURS, LA CONTINUITÉ DE SERVICE OU L'ADÉQUATION À UN USAGE PARTICULIER.
                  </p>
                </section>

                <section>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.15rem', marginBottom: '8px' }}>5. Limitation de Responsabilité</h3>
                  <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '13px', color: '#cbd5e1' }}>
                    DANS LES LIMITES LÉGALES, L'ÉDITEUR NE SAURAIT ÊTRE TENU RESPONSABLE DES DOMMAGES CORPORELS, ACCIDENTS DE LA CIRCULATION, DOMMAGES MATÉRIELS, PERTES DE PROFITS, PERTES DE DONNÉES OU DOMMAGES INDIRECTS RÉSULTANT DE L'UTILISATION OU DE L'IMPOSSIBILITÉ D'UTILISER L'APPLICATION, MÊME SI L'ÉDITEUR AVAIT ÉTÉ INFORMÉ DE LA POSSIBILITÉ DE TELS DOMMAGES.
                  </p>
                </section>

                <section>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.15rem', marginBottom: '8px' }}>6. Achats In-App et Conditions des Plateformes Tierces (Apple App Store)</h3>
                  <p style={{ marginBottom: '8px' }}>Si vous avez téléchargé l'Application depuis l'App Store d'Apple :</p>
                  <ul style={{ margin: '0 0 0 20px', color: '#cbd5e1', lineHeight: 1.8 }}>
                    <li>Vous reconnaissez que le présent contrat EULA est conclu entre vous et l'Éditeur uniquement, et non avec Apple Inc. Apple n'assume aucune responsabilité quant à l'Application ou son contenu.</li>
                    <li>En cas de non-conformité de l'Application avec une garantie applicable, vous pouvez en informer Apple, qui pourra rembourser le prix d'achat in-app éventuel selon ses propres politiques. Apple n'a aucune autre obligation de maintenance ou de support envers l'Application.</li>
                    <li>Apple et ses filiales sont des tiers bénéficiaires du présent contrat EULA et ont le droit de le faire appliquer à votre encontre.</li>
                    <li>Gestion des abonnements Apple ID : modifiables à tout moment sur <a href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8' }}>https://apps.apple.com/account/subscriptions</a>.</li>
                  </ul>
                </section>

                <section>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.15rem', marginBottom: '8px' }}>7. Résiliation de Licence</h3>
                  <p style={{ margin: 0 }}>
                    La licence est effective jusqu'à sa résiliation par vous ou par l'Éditeur. Vos droits au titre de cette licence prendront fin automatiquement et sans préavis si vous ne respectez pas l'une des stipulations du présent contrat. Dès résiliation, vous devez cesser toute utilisation de l'Application et la désinstaller de tous vos appareils.
                  </p>
                </section>
              </div>
            </div>

          </div>

          {/* Boutons d'action */}
          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #334155', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/walkmoney/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#00bcd4' }}>
              Voir la Politique de Confidentialité →
            </Link>
            <Link to="/walkmoney" style={btnOutlineStyle}>
              Retour à EcoNav
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
    name: 'EcoNav / WalkMoney',
    label: 'EcoNav / WalkMoney (Navigation & Récompenses)',
    color: '#00bcd4'
  },
  econav: {
    name: 'EcoNav',
    label: 'EcoNav (WalkMoney)',
    color: '#00bcd4'
  },
  daytalia: {
    name: 'Daytalia',
    label: 'Daytalia',
    color: '#f472b6'
  },
  quizbot: {
    name: 'QuizBot',
    label: 'QuizBot (QuizQI)',
    color: '#8b5cf6'
  },
  geohunt: {
    name: 'GeoHunt',
    label: 'GeoHunt (Radar de Survie GPS & Récompenses)',
    color: '#ef4444'
  },
  playfun: {
    name: 'Playfun',
    label: 'Playfun (Jeux de Soirée & Société)',
    color: '#f59e0b'
  },
  projetcalo: {
    name: 'ProjetCalo',
    label: 'ProjetCalo',
    color: '#38bdf8'
  },
};

function LegalPage({ type }) {
  const { appSlug } = useParams();

  // Si l'application demandée est Daytalia, afficher la politique ou les conditions officielles complètes
  if (appSlug === 'daytalia') {
    return type === 'privacy' ? <PrivacyPolicyPage /> : <TermsOfServicePage />;
  }

  // Si l'application demandée est QuizBot ou QuizQI, afficher les documents juridiques officiels complets
  if (appSlug === 'quizbot' || appSlug === 'quizqi') {
    return type === 'privacy' ? <QuizBotPrivacyPolicyPage /> : <QuizBotTermsOfServicePage />;
  }

  // Si l'application demandée est GeoHunt, afficher les documents juridiques officiels complets
  if (appSlug === 'geohunt') {
    return type === 'privacy' ? <GeoHuntPrivacyPolicyPage /> : <GeoHuntTermsOfServicePage />;
  }

  // Si l'application demandée est Playfun, afficher les documents juridiques officiels complets
  if (appSlug === 'playfun') {
    return type === 'privacy' ? <PlayfunPrivacyPolicyPage /> : <PlayfunTermsOfServicePage />;
  }

  // Si l'application demandée est WalkMoney ou EcoNav, afficher les documents juridiques officiels complets
  if (appSlug === 'walkmoney' || appSlug === 'econav') {
    return type === 'privacy' ? <WalkMoneyPrivacyPolicyPage /> : <WalkMoneyTermsOfServicePage />;
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
                  <Link to={slug === 'daytalia' ? '/privacy' : slug === 'quizbot' || slug === 'quizqi' ? '/quizbot/privacy' : slug === 'geohunt' ? '/geohunt/privacy' : slug === 'playfun' ? '/playfun/privacy' : slug === 'walkmoney' || slug === 'econav' ? '/walkmoney/privacy' : `/${slug}/politique-de-confidentialite`} style={btnPrimaryStyle}>
                    Confidentialité
                  </Link>
                  <Link to={slug === 'daytalia' ? '/terms' : slug === 'quizbot' || slug === 'quizqi' ? '/quizbot/terms' : slug === 'geohunt' ? '/geohunt/terms' : slug === 'playfun' ? '/playfun/terms' : slug === 'walkmoney' || slug === 'econav' ? '/walkmoney/terms' : `/${slug}/conditions-dutilisation`} style={btnOutlineStyle}>
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
          <Link to="/legal/politique-de-confidentialite" style={siteFooterLinkStyle}>Politiques de confidentialité</Link>
          <Link to="/legal/conditions-dutilisation" style={siteFooterLinkStyle}>Conditions Générales (EULA)</Link>
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
          <button type="submit" disabled={isLoading} style={{ ...btnPrimaryStyle, padding: '15px', fontSize: '16px', marginTop: '10px', width: '100%', boxSizing: 'border-box' }}>
            {isLoading ? "Veuillez patienter..." : (isLogin ? "Se connecter" : "S'inscrire")}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} style={{ background: 'none', border: 'none', color: '#00bcd4', cursor: 'pointer', textDecoration: 'underline' }}>
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
    if (window.confirm(`Vous allez être redirigé pour payer ${debt.toFixed(2)}€.`)) {
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
                  <button onClick={() => handlePayDebt(store.id, store.current_month_debt)} style={{ ...btnPrimaryStyle, backgroundColor: '#fbbf24', color: 'black' }}>Régler</button>
                )}
              </div>

              {/* ACTIONS */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate(`/walkmoney/edit-store/${store.id}`)} style={{ ...btnOutlineStyle, flex: 1 }}>✏️ Modifier</button>
                <button onClick={() => navigate(`/walkmoney/stats/${store.id}`)} style={{ ...btnOutlineStyle, flex: 1 }}>📊 Statistiques</button>
                <button onClick={() => handleTestSale(store)} style={{ ...btnOutlineStyle, flex: 1, color: '#fbbf24', borderColor: '#fbbf24' }}>🐛 Simuler Achat</button>
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
        if (nomData && nomData.length > 0) {
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
        <textarea placeholder="Description du magasin" value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, height: '80px', resize: 'none' }} />
      </div>

      <h2 style={sectionTitleStyle}>2. Offre & Visibilité</h2>
      <div style={cardStyle}>
        <SwitchRow checked={enableCashback} onChange={setEnableCashback} title="Activer Cashback" subtitle="Requis pour les options Pub, Or et Fidélité." />
        {enableCashback && (
          <div style={{ marginTop: '15px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8' }}>Taux de Cashback (%)</label>
            <input type="number" step="0.1" min="1" max="100" value={cashbackRate} onChange={e => setCashbackRate(e.target.value)} required style={{ ...inputStyle, marginTop: '5px' }} />

            {/* INTÉGRATION COMPOSANT FIDÉLITÉ */}
            <LoyaltyRulesManager rules={loyaltyRules} setRules={setLoyaltyRules} />
          </div>
        )}
      </div>

      <div style={{ ...cardStyle, border: enableVisibilityBoost ? '1px solid #c084fc' : 'none' }}>
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
            <hr style={{ borderColor: '#334155', margin: '15px 0' }} />
            <SwitchRow checked={enableGoldStore} onChange={setEnableGoldStore} title="Visibilité Or + 1%" subtitle="Carte Or + 1% de cashback offert (5€/mois)." />
          </>
        ) : (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>Activez le Cashback pour débloquer les options Pub et Or.</p>
        )}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#0ea5e920', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
        <h3 style={{ color: '#0ea5e9', fontSize: '16px', marginBottom: '15px' }}>SIMULATION DES COÛTS</h3>
        <div style={simRowStyle}><span>Abonnements Fixes :</span><strong>{monthlyFixedCost.toFixed(2)} € / mois</strong></div>
        <hr style={{ borderColor: '#0ea5e950', margin: '10px 0' }} />
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
    } catch (err) {
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
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom" style={inputStyle} required />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" style={{ ...inputStyle, height: '80px' }} required />
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone" style={inputStyle} required />

          <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px' }}>
            <SwitchRow checked={enableCashback} onChange={setEnableCashback} title="Activer Cashback" subtitle="Offrir des récompenses" />
            {enableCashback && (
              <div style={{ marginTop: '10px' }}>
                <input type="number" step="0.1" value={cashbackRate} onChange={e => setCashbackRate(e.target.value)} style={inputStyle} />
                {/* INTÉGRATION COMPOSANT FIDÉLITÉ */}
                <LoyaltyRulesManager rules={loyaltyRules} setRules={setLoyaltyRules} />
              </div>
            )}
          </div>

          <div style={{ backgroundColor: enableVisibilityBoost ? '#3b0764' : '#0f172a', padding: '15px', borderRadius: '8px' }}>
            <SwitchRow checked={enableVisibilityBoost} onChange={setEnableVisibilityBoost} title="Boost Visibilité" subtitle="Apparaître en haut des défis" />
            {enableVisibilityBoost && (
              <input type="range" min="1.2" max="1.6" step="0.1" value={selectedMultiplier} onChange={e => setSelectedMultiplier(e.target.value)} style={{ width: '100%', marginTop: '15px' }} />
            )}
          </div>

          <button type="submit" style={{ ...btnPrimaryStyle, padding: '15px', marginTop: '10px' }}>Enregistrer les modifications</button>
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
      snap.forEach(d => txs.push({ id: d.id, ...d.data() }));
      txs.sort((a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis());
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
            style={{ ...btnPrimaryStyle, backgroundColor: activeTab === 'summary' ? '#0ea5e9' : 'transparent', border: '1px solid #0ea5e9', color: activeTab === 'summary' ? 'white' : '#0ea5e9' }}
          >
            📊 Résumé & Top Clients
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            style={{ ...btnPrimaryStyle, backgroundColor: activeTab === 'transactions' ? '#0ea5e9' : 'transparent', border: '1px solid #0ea5e9', color: activeTab === 'transactions' ? 'white' : '#0ea5e9' }}
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
                <div style={{ ...statCardValue, color: '#38bdf8' }}>{(storeData.totalAmountSpentByUser || 0).toFixed(2)} €</div>
              </div>
              <div style={statCardStyle}>
                <div style={statCardTitle}>Cashback total reversé</div>
                <div style={{ ...statCardValue, color: '#10b981' }}>{(storeData.totalCashbackGiven || 0).toFixed(2)} €</div>
              </div>
              <div style={statCardStyle}>
                <div style={statCardTitle}>Facture en cours</div>
                <div style={{ ...statCardValue, color: '#fbbf24' }}>{(storeData.current_month_debt || 0).toFixed(2)} €</div>
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
        <Route path="/econav" element={<Navigate to="/walkmoney" replace />} />
        <Route path="/walkmoney/privacy" element={<WalkMoneyPrivacyPolicyPage />} />
        <Route path="/walkmoney/terms" element={<WalkMoneyTermsOfServicePage />} />
        <Route path="/walkmoney/eula" element={<WalkMoneyTermsOfServicePage />} />
        <Route path="/walkmoney/politique-de-confidentialite" element={<WalkMoneyPrivacyPolicyPage />} />
        <Route path="/walkmoney/conditions-dutilisation" element={<WalkMoneyTermsOfServicePage />} />
        <Route path="/econav/privacy" element={<WalkMoneyPrivacyPolicyPage />} />
        <Route path="/econav/terms" element={<WalkMoneyTermsOfServicePage />} />
        <Route path="/econav/eula" element={<WalkMoneyTermsOfServicePage />} />
        <Route path="/econav/politique-de-confidentialite" element={<WalkMoneyPrivacyPolicyPage />} />
        <Route path="/econav/conditions-dutilisation" element={<WalkMoneyTermsOfServicePage />} />
        <Route path="/daytalia" element={<DaytaliaPage />} />
        <Route path="/quizbot" element={<QuizBotPage />} />
        <Route path="/quizqi" element={<QuizBotPage />} />
        <Route path="/geohunt" element={<GeoHuntPage />} />
        <Route path="/playfun" element={<PlayfunPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/daytalia/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/daytalia/terms" element={<TermsOfServicePage />} />
        <Route path="/daytalia/politique-de-confidentialite" element={<PrivacyPolicyPage />} />
        <Route path="/daytalia/conditions-dutilisation" element={<TermsOfServicePage />} />
        <Route path="/quizbot/privacy" element={<QuizBotPrivacyPolicyPage />} />
        <Route path="/quizbot/terms" element={<QuizBotTermsOfServicePage />} />
        <Route path="/quizbot/eula" element={<QuizBotTermsOfServicePage />} />
        <Route path="/quizbot/politique-de-confidentialite" element={<QuizBotPrivacyPolicyPage />} />
        <Route path="/quizbot/conditions-dutilisation" element={<QuizBotTermsOfServicePage />} />
        <Route path="/quizqi/privacy" element={<QuizBotPrivacyPolicyPage />} />
        <Route path="/quizqi/terms" element={<QuizBotTermsOfServicePage />} />
        <Route path="/quizqi/eula" element={<QuizBotTermsOfServicePage />} />
        <Route path="/quizqi/politique-de-confidentialite" element={<QuizBotPrivacyPolicyPage />} />
        <Route path="/quizqi/conditions-dutilisation" element={<QuizBotTermsOfServicePage />} />
        <Route path="/geohunt/privacy" element={<GeoHuntPrivacyPolicyPage />} />
        <Route path="/geohunt/terms" element={<GeoHuntTermsOfServicePage />} />
        <Route path="/geohunt/eula" element={<GeoHuntTermsOfServicePage />} />
        <Route path="/geohunt/politique-de-confidentialite" element={<GeoHuntPrivacyPolicyPage />} />
        <Route path="/geohunt/conditions-dutilisation" element={<GeoHuntTermsOfServicePage />} />
        <Route path="/playfun/privacy" element={<PlayfunPrivacyPolicyPage />} />
        <Route path="/playfun/terms" element={<PlayfunTermsOfServicePage />} />
        <Route path="/playfun/eula" element={<PlayfunTermsOfServicePage />} />
        <Route path="/playfun/politique-de-confidentialite" element={<PlayfunPrivacyPolicyPage />} />
        <Route path="/playfun/conditions-dutilisation" element={<PlayfunTermsOfServicePage />} />
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