import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// IMPORTATION DYNAMIQUE (Option 2)
// Vite va gérer le renommage automatique pour Vercel (le fameux hash 4940d772)
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
          <span className="badge">🚀 Première mondiale en robotique domestique</span>
          <h1>Créons le robot domestique le plus intelligent au monde</h1>
          <p className="hero-description">
            Parrel développe une révolution technologique : un robot domestique doté d'algorithmes d'IA de pointe jamais vus auparavant. 
            Notre projet phare + applications innovantes.
          </p>
          <div className="hero-btns">
            <a href="#projets" className="cta-button">Découvrir nos projets</a>
            <a href="#investir" className="cta-button secondary">Investir dans Parrel</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><strong>1ère</strong><span>Mondiale</span></div>
            <div className="stat-item"><strong>6+</strong><span>Projets innovants</span></div>
            <div className="stat-item"><strong>AI+</strong><span>Algorithmes avancés</span></div>
            <div className="stat-item"><strong>∞</strong><span>Potentiel</span></div>
          </div>
        </div>
      </header>

      {/* SECTION À PROPOS */}
      <section className="about">
        <h2>À propos de Parrel</h2>
        <p>
          Parrel est une startup technologique ambitieuse dont le projet phare est de créer le robot domestique le plus intelligent jamais conçu. 
          Grâce à des algorithmes d'IA révolutionnaires et une architecture unique, nous développons une première mondiale qui transformera la robotique domestique.
        </p>
        <div className="values">
          <div className="value-card"><h3>Innovation</h3><p>Nous repoussons les limites de la technologie pour créer des solutions uniques.</p></div>
          <div className="value-card"><h3>Vision</h3><p>Rendre la technologie accessible et utile dans la vie de tous les jours.</p></div>
          <div className="value-card"><h3>Impact</h3><p>Améliorer le quotidien de millions d'utilisateurs à travers le monde.</p></div>
        </div>
      </section>

      {/* SECTION PROJET PHARE */}
      <section id="projets" className="main-project">
        <div className="project-header">
          <h2>Notre projet phare : Le Robot Domestique</h2>
          <p className="highlight-text">Une première mondiale qui redéfinit les standards de la robotique domestique.</p>
        </div>
        
        <div className="robot-demo">
          <div className="robot-info">
            <h3>Robotique V1 - Démonstration</h3>
            <p>Découvrez les capacités révolutionnaires : navigation autonome intelligente, manipulation d'objets précise et raisonnement adaptatif en temps réel.</p>
            <div className="features-grid">
              <div className="feat"><strong>IA Révolutionnaire</strong><p>Algorithmes propriétaires inégalés</p></div>
              <div className="feat"><strong>Vision Stéréoscopique</strong><p>Perception 3D avancée via double objectif</p></div>
              <div className="feat"><strong>Autonomie Totale</strong><p>Navigation et décisions intelligentes</p></div>
              <div className="feat"><strong>Première Mondiale</strong><p>Technologie jamais vue</p></div>
            </div>
          </div>
        </div>

        <div className="specs">
          <h3>Spécifications Techniques</h3>
          <div className="specs-grid">
            <div className="spec-item"><strong>Bras robotique</strong> 6 degrés de liberté avec pince de précision</div>
            <div className="spec-item"><strong>Vision</strong> Caméra stéréoscopique (double-lens) pour perception 3D</div>
            <div className="spec-item"><strong>Mobilité</strong> Roues Mecanum omnidirectionnelles</div>
            <div className="spec-item"><strong>IA propriétaire</strong> Algorithmes de raisonnement révolutionnaires</div>
            <div className="spec-item"><strong>Navigation autonome</strong> Cartographie 3D et mémoire des trajets</div>
            <div className="spec-item"><strong>Interaction tactile</strong> Capteurs pour manipulation d'objets</div>
          </div>
        </div>
      </section>

      {/* SECTION APPLICATIONS */}
      <section className="apps-section">
        <h2>Nos Applications IA & Mobiles</h2>
        <p>En complément de notre robot, nous développons des applications innovantes.</p>
        
        <div className="apps-grid">
          {/* NOUVELLE CARTE WALKMONEY PRO */}
          <div className="app-card" style={{ border: '2px solid #00bcd4' }}>
            <h3>WalkMoney</h3>
            <span className="tag">Espace Pro</span>
            <p>Portail dédié pour créer votre magasin et le lier directement à l'application mobile de vos clients.</p>
            <Link to="/walkmoney/pro" className="cta-button" style={{ display: 'inline-block', marginTop: '15px' }}>
              Se connecter / S'inscrire
            </Link>
          </div>

          <div className="app-card">
            <h3>ProjetCalo</h3>
            <span className="date">Sept. 2025 - Aujourd'hui</span>
            <p>Nutrition et fitness personnalisés via IA.</p>
            <ul>
              <li>Programme 100% personnalisé</li>
              <li>Recommandations IA adaptatives</li>
            </ul>
          </div>
          <div className="app-card">
            <h3>Playfun</h3>
            <span className="date">Août 2025 - Aujourd'hui</span>
            <p>+20 jeux de soirée multijoueur.</p>
            <ul>
              <li>Modes en ligne et local</li>
              <li>Interface sociale</li>
            </ul>
          </div>
          <div className="app-card">
            <h3>Daytalia</h3>
            <span className="tag">En développement</span>
            <p>Réseau social d'autobiographie. Les souvenirs restent des blocs intacts, tandis que les journées sont fragmentées pour l'analyse IA.</p>
          </div>
          <div className="app-card">
            <h3>QuizAI / Évaluations</h3>
            <span className="tag">En développement</span>
            <p>Plateforme permettant aux utilisateurs de créer leurs propres questions personnalisées pour un contrôle absolu.</p>
          </div>
          <div className="app-card">
            <h3>EcoMove</h3>
            <span className="tag">En développement</span>
            <p>Récompenses pour déplacements durables validées par l'atteinte de coordonnées géographiques spécifiques.</p>
          </div>
        </div>
      </section>

      {/* SECTION INVESTISSEMENT */}
      <section id="investir" className="invest">
        <div className="invest-content">
          <h2>Investissez dans la première mondiale</h2>
          <p>Rejoignez-nous pour révolutionner la robotique et créer une technologie qui marquera l'histoire.</p>
          <div className="invest-grid">
            <div className="invest-item"><h4>Prototype avancé</h4><p>Finalisation avec composants de pointe.</p></div>
            <div className="invest-item"><h4>IA révolutionnaire</h4><p>Perfectionnement des algorithmes propriétaires.</p></div>
            <div className="invest-item"><h4>Lancement mondial</h4><p>Commercialisation internationale.</p></div>
          </div>
          <button className="cta-button">Nous contacter</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <h3>Parrel</h3>
          <p>Innovons ensemble pour un futur technologique accessible et intelligent.</p>
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
            &larr; Retour à l'accueil Parrel
          </Link>
        </div>

        <h1 style={{ color: '#00bcd4', marginBottom: '10px' }}>WalkMoney Pro</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: '1.5' }}>
          Créez votre compte commerçant. Une fois inscrit, ces informations seront synchronisées instantanément sur votre application mobile.
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
