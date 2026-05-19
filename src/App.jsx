import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import backgroundVideo from './assets/background1.mp4'; 

// --- COMPOSANT DE LA PAGE D'ACCUEIL ---
function Home() {
  return (
    <div className="app-container">
      {/* VIDÉO D'ARRIÈRE-PLAN */}
      <div className="video-background-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="background-video"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* SECTION HERO */}
      <header className="hero">
        <div className="hero-content">
          <span className="badge">🚀 Studio de développement innovant</span>
          <h1>L'innovation logicielle au service de votre quotidien</h1>
          <p className="hero-description">
            Parrel développe un écosystème d'applications mobiles et d'outils basés sur l'Intelligence Artificielle pour simplifier, divertir et récompenser vos actions.
          </p>
          <div className="hero-btns">
            <a href="#applications" className="cta-button">Découvrir nos applications</a>
            <a href="#investir" className="cta-button secondary">Investir dans Parrel</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><strong>6+</strong><span>Applications</span></div>
            <div className="stat-item"><strong>IA</strong><span>Intégration native</span></div>
            <div className="stat-item"><strong>100%</strong><span>Personnalisé</span></div>
            <div className="stat-item"><strong>∞</strong><span>Potentiel</span></div>
          </div>
        </div>
      </header>

      {/* SECTION À PROPOS */}
      <section className="about">
        <h2>À propos de Parrel</h2>
        <p>
          Parrel est une entreprise technologique ambitieuse spécialisée dans la création d'applications mobiles de nouvelle génération. 
          De la gestion de récompenses géolocalisées à l'analyse nutritionnelle par IA, nous concevons des solutions sur-mesure pour répondre aux besoins de demain.
        </p>
        <div className="values">
          <div className="value-card"><h3>Innovation</h3><p>Nous utilisons les dernières technologies pour créer des expériences fluides et uniques.</p></div>
          <div className="value-card"><h3>Accessibilité</h3><p>Des interfaces pensées pour être intuitives et utiles pour tous, tous les jours.</p></div>
          <div className="value-card"><h3>Impact</h3><p>Connecter le monde digital aux actions réelles (sport, écologie, commerce local).</p></div>
        </div>
      </section>

      {/* SECTION APPLICATIONS (Devenue la section principale) */}
      <section id="applications" className="apps-section">
        <h2>Nos Applications & Écosystème IA</h2>
        <p>Découvrez les projets qui transforment notre vision en réalité.</p>
        
        <div className="apps-grid">
          {/* CARTE WALKMONEY PRO MISE EN AVANT */}
          <div className="app-card" style={{ border: '2px solid #00bcd4', transform: 'scale(1.05)', zIndex: 10 }}>
            <h3 style={{ color: '#00bcd4' }}>WalkMoney - Espace Pro</h3>
            <span className="tag" style={{ backgroundColor: '#00bcd4' }}>Portail Commerçant</span>
            <p style={{ marginTop: '15px', marginBottom: '20px' }}>
              Le portail dédié aux gérants. Créez votre magasin, gérez vos offres de cashback et suivez vos statistiques. Tout est synchronisé en temps réel avec l'application de vos clients.
            </p>
            <Link to="/walkmoney/pro" className="cta-button" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              Se connecter / S'inscrire
            </Link>
          </div>

          <div className="app-card">
            <h3>ProjetCalo</h3>
            <span className="date">Sept. 2025 - Aujourd'hui</span>
            <p>Nutrition et fitness personnalisés via IA.</p>
            <ul>
              <li>Programme 100% sur-mesure</li>
              <li>Recommandations IA adaptatives</li>
            </ul>
          </div>
          <div className="app-card">
            <h3>Playfun</h3>
            <span className="date">Août 2025 - Aujourd'hui</span>
            <p>+20 jeux de soirée multijoueur.</p>
            <ul>
              <li>Modes en ligne et local</li>
              <li>Interface sociale dynamique</li>
            </ul>
          </div>
          <div className="app-card">
            <h3>Daytalia</h3>
            <span className="tag">En développement</span>
            <p>Réseau social d'autobiographie. Vos souvenirs restent intacts, tandis que vos journées sont fragmentées pour l'analyse IA.</p>
          </div>
          <div className="app-card">
            <h3>QuizAI / Évaluations</h3>
            <span className="tag">En développement</span>
            <p>Plateforme permettant aux utilisateurs de créer leurs propres questions personnalisées pour un contrôle absolu sur leurs quiz.</p>
          </div>
          <div className="app-card">
            <h3>EcoMove</h3>
            <span className="tag">En développement</span>
            <p>Récompenses pour déplacements durables validées par l'atteinte de coordonnées géographiques précises.</p>
          </div>
        </div>
      </section>

      {/* SECTION INVESTISSEMENT */}
      <section id="investir" className="invest">
        <div className="invest-content">
          <h2>Propulsez l'écosystème Parrel</h2>
          <p>Rejoignez-nous pour accélérer le développement de nos applications et acquérir nos premiers millions d'utilisateurs.</p>
          <div className="invest-grid">
            <div className="invest-item"><h4>Acquisition</h4><p>Déploiement marketing pour WalkMoney et Playfun.</p></div>
            <div className="invest-item"><h4>R&D IA</h4><p>Intégration de modèles de langage locaux dans nos apps.</p></div>
            <div className="invest-item"><h4>Expansion</h4><p>Développement de nouvelles fonctionnalités communautaires.</p></div>
          </div>
          <button className="cta-button">Nous contacter</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <h3>Parrel</h3>
          <p>Innovons ensemble pour un écosystème technologique accessible et intelligent.</p>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Parrel. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

// --- COMPOSANT DE L'ESPACE PRO WALKMONEY ---
function WalkMoneyPro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [country, setCountry] = useState('');

  const handleRegisterStore = async (e) => {
    e.preventDefault();
    
    // Logique à intégrer plus tard : 
    // 1. Inscription via Firebase Auth (createUserWithEmailAndPassword)
    // 2. Paiement via Stripe
    // 3. Ajout du document dans la collection 'stores' de Firestore avec l'owner_id

    alert(`Les informations pour le magasin "${storeName}" en ${country} ont été soumises. (Logique Firebase/Stripe à connecter)`);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '50px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <Link to="/" style={{ color: '#00bcd4', textDecoration: 'none', fontWeight: 'bold' }}>
            &larr; Retour aux applications Parrel
          </Link>
        </div>

        <h1 style={{ color: '#00bcd4', marginBottom: '10px' }}>WalkMoney Pro</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: '1.5' }}>
          Créez votre compte commerçant pour offrir du cashback. Une fois inscrit, votre magasin sera visible instantanément par les utilisateurs de l'application mobile.
        </p>
        
        <form onSubmit={handleRegisterStore} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="email" 
            placeholder="Adresse Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white' }}
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white' }}
          />
          <input 
            type="text" 
            placeholder="Nom de votre magasin" 
            value={storeName} 
            onChange={e => setStoreName(e.target.value)} 
            required 
            style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white' }}
          />
          <input 
            type="text" 
            placeholder="Pays" 
            value={country} 
            onChange={e => setCountry(e.target.value)} 
            required 
            style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white' }}
          />
          
          <button 
            type="submit" 
            style={{ 
              marginTop: '10px', 
              padding: '15px', 
              backgroundColor: '#00bcd4', 
              color: 'white', 
              fontWeight: 'bold', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            S'inscrire et finaliser sur Stripe
          </button>
        </form>
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

export default App;
