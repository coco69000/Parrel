import React, { useState } from 'react';
import './App.css';
// Assure-toi que ta vidéo est dans le dossier src/assets/ ou à la racine de src
// Si elle est dans public/, utilise simplement src="/ta-video.mp4"
import backgroundVideo from './assets/background.mp4'; 

function App() {
  return (
    <div className="app-container">
      {/* VIDÉO D'ARRIÈRE-PLAN */}
      <div className="video-background-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos.
        </video>
        {/* L'overlay permet de flouter et d'assombrir pour le contraste */}
        <div className="video-overlay"></div>
      </div>

      {/* SECTION HERO */}
      <header className="hero">
        <div className="hero-content">
          <span className="badge">🚀 Première mondiale en robotique domestique</span>
          <h1>Créons le robot domestique le plus intelligent au monde</h1>
          <p className="hero-description">
            Parrel développe une révolution technologique : un robot domestique doté d'algorithmes d'IA de pointe jamais vus auparavant. 
            Notre projet phare + 5 applications innovantes.
          </p>
          <div className="hero-btns">
            <a href="#projets" className="cta-button">Découvrir nos projets</a>
            <a href="#investir" className="cta-button secondary">Investir dans Parrel</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><strong>1ère</strong><span>Mondiale</span></div>
            <div className="stat-item"><strong>6</strong><span>Projets innovants</span></div>
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
              <div className="feat"><strong>Vision Stéréoscopique</strong><p>Perception 3D avancée</p></div>
              <div className="feat"><strong>Autonomie Totale</strong><p>Navigation et décisions intelligentes</p></div>
              <div className="feat"><strong>Première Mondiale</strong><p>Technologie jamais vue</p></div>
            </div>
          </div>
        </div>

        <div className="specs">
          <h3>Spécifications Techniques</h3>
          <div className="specs-grid">
            <div className="spec-item"><strong>Bras robotique</strong> 6 degrés de liberté avec pince de précision</div>
            <div className="spec-item"><strong>Vision</strong> Stéréoscopique avancée pour perception 3D</div>
            <div className="spec-item"><strong>Mobilité</strong> Roues Mecanum omnidirectionnelles</div>
            <div className="spec-item"><strong>IA propriétaire</strong> Algorithmes de raisonnement révolutionnaires</div>
            <div className="spec-item"><strong>Navigation autonome</strong> Cartographie 3D et mémoire des trajets</div>
            <div className="spec-item"><strong>Interaction tactile</strong> Capteurs pour manipulation d'objets</div>
          </div>
        </div>
      </section>

      {/* SECTION APPLICATIONS */}
      <section className="apps-section">
        <h2>Nos Applications IA</h2>
        <p>En complément de notre robot, nous développons 5 applications mobiles innovantes.</p>
        
        <div className="apps-grid">
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
            <p>Réseau social d'autobiographie assistée par IA.</p>
          </div>
          <div className="app-card">
            <h3>QuizAI</h3>
            <span className="tag">En développement</span>
            <p>Génération automatique de quiz adaptatifs.</p>
          </div>
          <div className="app-card">
            <h3>EcoMove</h3>
            <span className="tag">En développement</span>
            <p>Récompenses pour déplacements durables.</p>
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

export default App;
