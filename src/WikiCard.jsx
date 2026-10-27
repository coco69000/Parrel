import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ==========================================
// 🎨 STYLES THÈME WIKICARD (MYSTIC INDIGO & GOLD TCG)
// ==========================================
const pageStyle = {
  backgroundColor: '#0b0f19',
  color: 'white',
  minHeight: '100vh',
  paddingTop: '100px',
  paddingBottom: '60px',
  paddingLeft: '20px',
  paddingRight: '20px',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const cardStyle = {
  backgroundColor: '#131b2e',
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid #1e293b'
};

const btnPrimaryStyle = {
  backgroundColor: '#6366f1',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease'
};

const btnOutlineStyle = {
  backgroundColor: 'transparent',
  color: '#818cf8',
  padding: '10px 20px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold',
  border: '1px solid #6366f1',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease'
};

// ==========================================
// 📄 CONTENUS BRUTS MARKDOWN (EXPORTS OFFICIELS)
// ==========================================
export const WIKICARD_RAW_CGU = `# Conditions Générales d’Utilisation (CGU) et Contrat de Licence d'Utilisateur Final (EULA)
**Dernière mise à jour : 27 octobre 2026**

### 1. Acceptation des Conditions
En téléchargeant, installant ou utilisant l'application « WikiCard - Wikipedia TCG » (ci-après « l'Application »), vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation (EULA). Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'Application.

### 2. Licence d'Utilisation
Parrel Studio vous accorde une licence personnelle, non exclusive, non transférable et révocable pour utiliser l'Application sur vos appareils mobiles à des fins personnelles et non commerciales, conformément aux règles des boutiques d'applications (Apple App Store, Google Play Store).

### 3. Propriété Intellectuelle & Données Wikipédia
- **Le Code et le Design :** L'interface, les mécaniques de jeu, le code source et les éléments graphiques originaux appartiennent à Parrel Studio.
- **Contenu Wikipédia :** L'Application utilise l'API de Wikimedia Foundation. Les textes et images issus de Wikipédia sont soumis à la licence Creative Commons Attribution-ShareAlike (CC BY-SA). L'Application n'est ni affiliée, ni soutenue par la Wikimedia Foundation.

### 4. Comptes et Sécurité
Vous êtes responsable de la confidentialité de vos identifiants (email, mot de passe). Toute activité effectuée via votre compte est de votre responsabilité. L'utilisation de bots, de scripts automatisés, ou l'exploitation de failles pour obtenir des cartes ou de l'Or est strictement interdite (des systèmes anti-bots comme Cloudflare Turnstile sont actifs) et entraînera le bannissement du compte.

### 5. Contenu Généré par l'Utilisateur (Tchat de Guilde)
L'Application inclut des fonctionnalités sociales (Tchat de Guilde). Il est strictement interdit de publier du contenu :
- Injurieux, raciste, homophobe, sexiste ou incitant à la haine.
- À caractère sexuel ou pornographique.
- Spam ou publicité.
Nous nous réservons le droit de supprimer tout message et de suspendre ou bannir définitivement tout utilisateur enfreignant ces règles, sans préavis.

### 6. Biens Virtuels et Achats Intégrés (Abonnement VIP)
L'Application permet d'acquérir de l'Or (monnaie virtuelle) et un abonnement « Archiviste VIP ».
- Les biens virtuels n'ont aucune valeur monétaire réelle et ne peuvent pas être échangés contre de l'argent réel en dehors de l'Application.
- Les abonnements se renouvellent automatiquement sauf annulation de votre part via les paramètres de votre compte Apple ou Google Play au moins 24h avant la fin de la période en cours.
- Parrel Studio se réserve le droit de modifier les prix, les taux de drop des cartes ou de supprimer l'Application à tout moment. Tous les achats sont finaux et non remboursables, sauf obligation légale.

### 7. Limitation de Responsabilité
L'Application est fournie « en l'état ». Parrel Studio ne garantit pas que l'Application sera exempte de bugs, d'interruptions ou d'erreurs. Nous ne saurions être tenus responsables des pertes de données (sauvegardes de cartes, Or).

### 8. Résiliation
Nous nous réservons le droit de suspendre ou de supprimer votre compte à tout moment en cas de non-respect de ces CGU.`;

export const WIKICARD_RAW_PRIVACY = `# Politique de Confidentialité (Privacy Policy) – WikiCard
**Dernière mise à jour : 27 octobre 2026**

### 1. Introduction
La présente Politique de Confidentialité explique comment Parrel Studio collecte, utilise et protège vos données personnelles lorsque vous jouez à « WikiCard - Wikipedia TCG ».

### 2. Données Collectées
Nous collectons les données suivantes :
- **Données de compte :** Adresse email, pseudonyme (Pseudo), et UID (Identifiant Unique Firebase) lors de votre inscription.
- **Données de jeu :** Votre progression, votre collection de cartes, votre Or, vos statistiques de victoire/défaite, et vos messages dans le Tchat de Guilde.
- **Données d'achat :** Historique de vos abonnements VIP (gérés de manière anonyme via RevenueCat, nous n'avons pas accès à vos coordonnées bancaires).
- **Données techniques & Sécurité :** Adresse IP et données de l'appareil (collectées de manière transitoire par Cloudflare Turnstile pour vérifier que vous êtes un humain et non un bot).

### 3. Utilisation des Données
Vos données sont utilisées pour :
- Sauvegarder votre progression sur le cloud (Firebase Firestore).
- Permettre les fonctionnalités multijoueurs (Marché, Échanges, Duels en direct, Guildes).
- Sécuriser le jeu contre la triche et les requêtes automatisées.
- Gérer les abonnements via les plateformes officielles (Google/Apple).

### 4. Services Tiers Partenaires
Pour fonctionner, l'Application partage certaines données avec les services tiers suivants, qui respectent le RGPD :
- **Firebase (Google) :** Authentification, base de données (Firestore) et Cloud Functions.
- **RevenueCat :** Gestion de l'abonnement VIP.
- **Cloudflare (Turnstile) :** Sécurité anti-bot lors de l'ouverture des boosters.
- **Wikimedia API :** L'Application envoie des requêtes à Wikipédia pour récupérer les articles (ces requêtes n'incluent pas vos données personnelles).

### 5. Conservation des Données
Nous conservons vos données de compte et de progression de jeu tant que votre compte est actif. Vos messages de Guilde sont conservés de manière limitée (les derniers messages uniquement).

### 6. Vos Droits (Conformité RGPD)
Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez du droit :
- D'accéder à vos données.
- De rectifier votre pseudonyme dans le jeu.
- De demander la suppression totale de votre compte et de vos données (Droit à l'oubli).
Pour exercer ces droits, contactez-nous à l'adresse ci-dessous.

### 7. Nous contacter
Pour toute question concernant vos données, l'EULA ou pour demander la suppression de votre compte, contactez-nous à : contact@wikicard.com ou privacy@wikicard.com.`;

// ==========================================
// 🌟 1. SHOWCASE WIKICARD (PAGE D'ACCUEIL /wikicard)
// ==========================================
export function WikiCardPage() {
  const [storeNotice, setStoreNotice] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRarity, setSelectedRarity] = useState('legendary');

  const handleStoreClick = (storeName) => {
    setStoreNotice(`WikiCard sera prochainement disponible en téléchargement direct sur ${storeName}. Préparez votre deck légendaire !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const featureTabs = [
    {
      title: '📦 Ouverture & 3D Holo',
      color: '#6366f1',
      subtitle: 'Boosters holographiques & tirages sécurisés',
      items: [
        { label: 'Cartes Animées en 3D Holographique', desc: 'Rendu temps réel avec reflets métalliques, shaders de brillance selon l\'inclinaison du smartphone et effets de particules épiques.' },
        { label: 'Protection Anti-Bots Cloudflare Turnstile', desc: 'Système intelligent empêchant l\'automatisation abusive des ouvertures de paquets et garantissant l\'équité des tirages.' },
        { label: 'Tirages Rares Garantis', desc: 'Mécanique de pitié intégrée assurant une carte Rare ou supérieure dans chaque pack de 5 cartes.' }
      ]
    },
    {
      title: '🃏 Collection & Pokédex',
      color: '#38bdf8',
      subtitle: 'Le savoir universel classé et fusionnable',
      items: [
        { label: 'Catalogue Mondial par Domaines', desc: 'Explorez vos cartes classées par thématiques réelles : Sciences & Espace, Histoire & Civilisations, Faune & Flore, Arts, Philosophie, Géographie.' },
        { label: 'Alchimie & Fusion des Doubles', desc: 'Fusionnez plusieurs exemplaires d\'une même carte pour débloquer sa version Foil, Holo puis Cosmique avec des statistiques accrues.' },
        { label: 'Rareté Indexée sur le Réel', desc: 'L\'algorithme analyse le nombre de pages vues mensuelles sur Wikipédia : plus un sujet est confidentiel ou mythique, plus sa rareté est prestigieuse.' }
      ]
    },
    {
      title: '⚔️ Combats 1v1 & IA Quiz',
      color: '#ec4899',
      subtitle: 'Arène tactique multijoueur en temps réel',
      items: [
        { label: 'Duels Basés sur des Quiz IA', desc: 'Chaque carte jouée génère dynamiquement une question de culture générale basée sur l\'article Wikipédia réel de la carte.' },
        { label: 'Temps Réel Firebase & Mode Solo', desc: 'Défiez vos amis et des joueurs du monde entier via WebSocket Firebase, ou entraînez-vous contre des bots IA adaptatifs.' },
        { label: 'Synergies de Decks Stratégiques', desc: 'Associez des cartes de même époque ou discipline pour débloquer des combos dévastateurs et doubler vos points d\'attaque.' }
      ]
    },
    {
      title: '🛡️ Guildes & Raids Coop',
      color: '#10b981',
      subtitle: 'Travail d\'équipe, tchat et boss titanesques',
      items: [
        { label: 'Tchat de Guilde Modéré', desc: 'Discutez tactique en direct avec vos compagnons de guilde dans un salon sécurisé et convivial.' },
        { label: 'Liste de Souhaits & Dons', desc: 'Demandez des cartes manquantes à vos alliés et donnez vos surplus pour remporter des points de guilde et de l\'Or.' },
        { label: 'Boss de Raid Collaboratifs', desc: 'Unissez vos forces chaque semaine contre des Boss historiques ou scientifiques aux barres de vie géantes.' }
      ]
    },
    {
      title: '⚖️ Marché & Enchères',
      color: '#f59e0b',
      subtitle: 'Économie vivante et échanges sécurisés',
      items: [
        { label: 'Hôtel des Ventes Global', desc: 'Vendez vos cartes rares et légendaires contre de l\'Or virtuel dans une place de marché régulée.' },
        { label: 'Échanges Directs 1v1 Sécurisés', desc: 'Proposez des échanges de cartes équitables entre joueurs avec système de validation réciproque anti-arnaque.' },
        { label: 'Historique des Cours & Argus', desc: 'Suivez la cote de vos cartes en temps réel selon leur popularité et le nombre d\'exemplaires en circulation.' }
      ]
    },
    {
      title: '🎓 Wiki-Explorer & Savoir',
      color: '#a855f7',
      subtitle: 'La culture récompensée en monnaie de jeu',
      items: [
        { label: 'Bonus de Lecture Wiki-Explorer', desc: 'Gagnez de l\'Or bonus chaque fois que vous lisez la fiche de synthèse Wikipédia de la carte que vous venez d\'invoquer.' },
        { label: 'Lien Direct vers les Articles Wikimedia', desc: 'Accédez en un clic à l\'article complet sous licence libre CC BY-SA pour approfondir vos connaissances.' },
        { label: 'Mode Pédagogique Sans Violence', desc: 'Un jeu enrichissant, adapté à tous les âges, valorisant la curiosité intellectuelle et la découverte.' }
      ]
    },
    {
      title: '👑 Monétisation & VIP',
      color: '#eab308',
      subtitle: 'Or virtuel et pass Archiviste VIP',
      items: [
        { label: 'Économie 100% Jouable Gratuitement', desc: 'Gagnez de l\'Or en jouant, en répondant aux quiz, en explorant Wikipédia et lors des quêtes quotidiennes.' },
        { label: 'Abonnement « Archiviste VIP »', desc: 'Intégré avec RevenueCat : supprime les taxes de l\'hôtel des ventes, recharge les boosters plus vite et octroie des combats illimités.' },
        { label: 'Achats Transparents & Éthiques', desc: 'Taux d\'apparition des raretés publiés en toute transparence dans l\'application.' }
      ]
    }
  ];

  const rarityDemos = {
    common: {
      name: 'Pomme de terre',
      category: 'Botanique & Alimentation',
      rarity: 'Commune (★)',
      views: '120 000 vues / mois',
      atk: '1 200',
      def: '950',
      color: '#94a3b8',
      bgGrad: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      borderColor: '#64748b',
      flavor: 'Plante tubéreuse cultivée mondialement, introduite en Europe au XVIe siècle.'
    },
    rare: {
      name: 'Télescope spatial James Webb',
      category: 'Astronomie & Technologie',
      rarity: 'Rare (★★★)',
      views: '450 000 vues / mois',
      atk: '2 800',
      def: '3 100',
      color: '#38bdf8',
      bgGrad: 'linear-gradient(135deg, #0c4a6e 0%, #1e293b 100%)',
      borderColor: '#38bdf8',
      flavor: 'Observatoire spatial infrarouge développé par la NASA avec l\'ESA et l\'ASC.'
    },
    epic: {
      name: 'Alexandre le Grand',
      category: 'Histoire Antique',
      rarity: 'Épique (★★★★)',
      views: '890 000 vues / mois',
      atk: '4 200',
      def: '3 900',
      color: '#c084fc',
      bgGrad: 'linear-gradient(135deg, #581c87 0%, #1e1b4b 100%)',
      borderColor: '#a855f7',
      flavor: 'Roi de Macédoine et conquérant d\'un immense empire s\'étendant jusqu\'au Pendjab.'
    },
    legendary: {
      name: 'Théorie de la Relativité Générale',
      category: 'Physique Théorique',
      rarity: 'LÉGENDAIRE (★★★★★)',
      views: '1 500 000+ vues / mois',
      atk: '5 500',
      def: '5 200',
      color: '#fbbf24',
      bgGrad: 'linear-gradient(135deg, #78350f 0%, #312e81 50%, #4c1d95 100%)',
      borderColor: '#f59e0b',
      flavor: 'Chef-d\'œuvre d\'Albert Einstein décrivant la gravitation comme courbure de l\'espace-temps.'
    }
  };

  const activeCard = rarityDemos[selectedRarity];

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Fil d'Ariane */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            ← Accueil Parrel
          </Link>
          <span style={{ color: '#475569' }}>/</span>
          <span style={{ color: '#818cf8', fontWeight: 'bold' }}>WikiCard</span>
          <span style={{ color: '#64748b', fontSize: '12px' }}>Wikipedia TCG &amp; Duels IA</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '6px 14px', borderRadius: '999px', marginBottom: '18px' }}>
            <span style={{ fontSize: '18px' }}>🃏</span>
            <span style={{ color: '#a5b4fc', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              WikiCard • Wikipedia TCG &amp; Duels IA
            </span>
          </div>

          <h1 style={{ color: 'white', marginTop: 0, marginBottom: '16px', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.2, fontWeight: 800 }}>
            WikiCard : Le Jeu de Cartes TCG Propulsé par Wikipédia et l'IA
          </h1>

          <p style={{ color: '#a5b4fc', fontSize: '1.25rem', fontWeight: '600', marginBottom: '18px', maxWidth: '880px' }}>
            Collectionnez le savoir universel ! Chaque carte est issue d'un véritable article Wikipédia avec une rareté dynamique calculée sur le nombre réel de vues mensuelles.
          </p>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '920px', marginBottom: '28px' }}>
            Ouvrez des boosters 3D holographiques protégés contre les bots, complétez votre Pokédex encyclopédique, fusionnez vos doubles par alchimie, affrontez des joueurs en duels tactiques 1v1 via des quiz générés par IA, rejoignez des guildes et négociez vos cartes aux enchères.
          </p>

          {/* BADGES ATOUTS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '26px' }}>
            <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              📦 Boosters 3D Holographiques
            </span>
            <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              📊 Rareté par Vues Wikipédia Réelles
            </span>
            <span style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              ⚔️ Duels 1v1 &amp; Quiz IA
            </span>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🛡️ Guildes &amp; Boss Raid Coop
            </span>
            <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              ⚖️ Marché d'Enchères &amp; Or
            </span>
            <span style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🛡️ Cloudflare Turnstile Anti-Bot
            </span>
          </div>

          {/* BOUTONS APP STORES */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '22px' }}>
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
                border: '1px solid #1e293b',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.transform = 'translateY(0)'; }}
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

            <button
              type="button"
              onClick={() => handleStoreClick("l'App Store d'Apple")}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: '#050811',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
            <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#c7d2fe', fontSize: '14px', maxWidth: '640px', marginBottom: '20px' }}>
              ✨ {storeNotice}
            </div>
          )}
        </div>

        {/* SECTION INTERACTIVE : DÉMONSTRATION DES CARTES ET RARETÉS */}
        <div style={{ ...cardStyle, marginBottom: '40px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '6px', fontSize: '1.65rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✨</span> Rareté Dynamique &amp; Simulation de Carte TCG
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '20px' }}>
            La rareté d'une carte est calculée dynamiquement selon la fréquentation réelle de l'article sur Wikipédia. Choisissez un palier de rareté :
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {Object.keys(rarityDemos).map((key) => {
              const card = rarityDemos[key];
              const isSelected = selectedRarity === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedRarity(key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    cursor: 'pointer',
                    border: `1px solid ${isSelected ? card.borderColor : '#334155'}`,
                    backgroundColor: isSelected ? card.borderColor : '#0b0f19',
                    color: isSelected ? '#0b0f19' : card.color,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {card.rarity}
                </button>
              );
            })}
          </div>

          {/* CARTE HOLOGRAPHIQUE INTERACTIVE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
            <div style={{
              background: activeCard.bgGrad,
              border: `2px solid ${activeCard.borderColor}`,
              borderRadius: '20px',
              padding: '24px',
              boxShadow: `0 10px 30px rgba(0,0,0,0.6), 0 0 25px ${activeCard.borderColor}30`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: activeCard.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeCard.category}
                </span>
                <span style={{ fontSize: '12px', color: '#f1f5f9', backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '6px' }}>
                  {activeCard.rarity}
                </span>
              </div>

              <div style={{ height: '140px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '6px' }}>
                  {selectedRarity === 'legendary' ? '🌌' : selectedRarity === 'epic' ? '⚔️' : selectedRarity === 'rare' ? '🔭' : '🥔'}
                </div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>
                  {activeCard.name}
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '16px', minHeight: '40px' }}>
                « {activeCard.flavor} »
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', fontSize: '13px' }}>
                <div>⚔️ ATK : <strong style={{ color: '#f87171' }}>{activeCard.atk}</strong></div>
                <div>🛡️ DEF : <strong style={{ color: '#60a5fa' }}>{activeCard.def}</strong></div>
              </div>
            </div>

            <div style={{ backgroundColor: '#0b0f19', padding: '20px', borderRadius: '14px', border: '1px solid #1e293b' }}>
              <div style={{ color: activeCard.color, fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
                📊 Analyse Wikipédia en temps réel
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#cbd5e1', lineHeight: 1.8, fontSize: '14px' }}>
                <li><strong>Article source :</strong> Wikipédia ({activeCard.name})</li>
                <li><strong>Audience mensuelle :</strong> <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{activeCard.views}</span></li>
                <li><strong>Licence :</strong> Creative Commons CC BY-SA</li>
                <li><strong>Bonus Wiki-Explorer :</strong> +50 Or pour la lecture complète du résumé</li>
                <li><strong>Sécurité :</strong> Dropping certifié sans bot via Cloudflare Turnstile</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION DES FONCTIONNALITÉS PRINCIPALES */}
        <div style={{ ...cardStyle, marginBottom: '40px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '6px', fontSize: '1.65rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🌟</span> Les Piliers du Jeu WikiCard
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '24px' }}>
            Découvrez toutes les mécaniques qui font de WikiCard un jeu de stratégie révolutionnaire et éducatif :
          </p>

          {/* Onglets interactifs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {featureTabs.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: `1px solid ${activeTab === idx ? tab.color : '#334155'}`,
                  backgroundColor: activeTab === idx ? tab.color : '#0b0f19',
                  color: activeTab === idx ? '#0b0f19' : '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Détails de la fonctionnalité sélectionnée */}
          <div style={{ backgroundColor: '#0b0f19', borderRadius: '14px', padding: '24px', border: `1px solid ${featureTabs[activeTab].color}40` }}>
            <div style={{ color: featureTabs[activeTab].color, fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '4px' }}>
              {featureTabs[activeTab].title}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>
              {featureTabs[activeTab].subtitle}
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {featureTabs[activeTab].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#131b2e', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION ARCHITECTURE TECHNIQUE & SÉCURITÉ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>🛠️</span>
              <h3 style={{ color: '#818cf8', margin: 0, fontSize: '1.25rem' }}>Stack Technique &amp; Temps Réel</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>Moteur TCG :</strong> Interface interactive fluide avec cartes 3D animées et shaders holographiques.</li>
              <li><strong>Firebase Firestore &amp; Auth :</strong> Sauvegarde cloud chiffrée, matchmaking multijoueur 1v1 et tchat de guilde temps réel.</li>
              <li><strong>Générateur de Quiz IA :</strong> Questions multijoueurs générées dynamiquement à partir des articles Wikipédia.</li>
              <li><strong>API Wikimedia :</strong> Requêtes publiques transparentes pour extraire les articles et les statistiques mensuelles sous licence CC BY-SA.</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <h3 style={{ color: '#38bdf8', margin: 0, fontSize: '1.25rem' }}>Sécurité &amp; Économie Équitable</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>Cloudflare Turnstile :</strong> Protection anti-bot invisible et respectueuse de la vie privée lors des tirages de boosters.</li>
              <li><strong>RevenueCat :</strong> Gestion chiffrée des abonnements « Archiviste VIP » sur Apple App Store et Google Play.</li>
              <li><strong>Anti-Triche Strict :</strong> Validation serveur des statistiques et des transactions pour interdire les scripts et duplications.</li>
              <li><strong>Modération Active :</strong> Filtrage automatique et tolérance zéro sur le tchat de guilde.</li>
            </ul>
          </div>
        </div>

        {/* SECTION DOCUMENTS LÉGAUX ET CONFIDENTIALITÉ */}
        <div style={{
          backgroundColor: '#0b0f19',
          border: '1px solid #1e293b',
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
              🛡️ Documents Juridiques, CGU, EULA &amp; Données Personnelles
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '600px' }}>
              Consultez nos conditions d'utilisation et notre politique de confidentialité rédigées en stricte conformité avec le RGPD, les licences Creative Commons et les exigences Apple / Google.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/wikicard/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#6366f1', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/wikicard/terms" style={{ ...btnOutlineStyle, borderColor: '#6366f1', color: '#818cf8' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>

        {/* PIED DE PAGE APPLICATION */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', color: '#94a3b8', fontSize: '13px' }}>
          <div>
            Application <strong style={{ color: 'white' }}>WikiCard - Wikipedia TCG</strong> • Développé par Parrel Studio
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="mailto:contact@wikicard.com" style={{ color: '#818cf8', textDecoration: 'none' }}>contact@wikicard.com</a>
            <span>•</span>
            <a href="mailto:privacy@wikicard.com" style={{ color: '#818cf8', textDecoration: 'none' }}>privacy@wikicard.com</a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 🔒 2. PAGE : POLITIQUE DE CONFIDENTIALITÉ — WIKICARD (/wikicard/privacy)
// ==========================================
export function WikiCardPrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/wikicard" style={{ color: '#818cf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à WikiCard
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#6366f1', color: '#ffffff', fontWeight: 'bold' }}>WikiCard</span>
            <span className="badge" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' }}>Conformité RGPD &amp; Protection des Données</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — WikiCard (Wikipedia TCG)
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 27 octobre 2026 • Application : WikiCard - Wikipedia TCG • Éditeur : Parrel Studio
          </div>
        </div>

        {/* Détails du document */}
        <div style={{ backgroundColor: '#131b2e', padding: '32px', borderRadius: '20px', border: '1px solid #1e293b', lineHeight: 1.75, color: '#e2e8f0' }}>
          <div style={{ backgroundColor: '#0b0f19', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> WikiCard - Wikipedia TCG (Jeu de cartes à collectionner)</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>Contact Général :</strong> <a href="mailto:contact@wikicard.com" style={{ color: '#818cf8', textDecoration: 'none' }}>contact@wikicard.com</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact DPO &amp; RGPD :</strong> <a href="mailto:privacy@wikicard.com" style={{ color: '#818cf8', textDecoration: 'none' }}>privacy@wikicard.com</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL HTTPS officielle :</strong> <a href="https://parrel.vercel.app/wikicard/privacy" style={{ color: '#818cf8', textDecoration: 'none' }}>https://parrel.vercel.app/wikicard/privacy</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
            La protection de vos données personnelles est primordiale pour Parrel Studio. La présente Politique de Confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles lorsque vous jouez à « WikiCard - Wikipedia TCG », conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>

          <div style={{ display: 'grid', gap: '26px' }}>
            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>1. Introduction</h2>
              <p style={{ margin: 0 }}>
                La présente Politique de Confidentialité explique comment Parrel Studio collecte, utilise et protège vos données personnelles lorsque vous jouez à « WikiCard - Wikipedia TCG ».
              </p>
            </section>

            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>2. Données Collectées</h2>
              <p style={{ marginBottom: '10px' }}>Nous collectons et traitons les données suivantes :</p>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li><strong>Données de compte :</strong> Adresse email, pseudonyme (Pseudo), et UID (Identifiant Unique Firebase) lors de votre inscription.</li>
                <li><strong>Données de jeu :</strong> Votre progression, votre collection de cartes, votre Or (monnaie virtuelle), vos statistiques de victoire/défaite, et vos messages dans le Tchat de Guilde.</li>
                <li><strong>Données d'achat :</strong> Historique de vos abonnements VIP (gérés de manière anonyme via RevenueCat, nous n'avons aucunement accès à vos coordonnées bancaires ou numéros de carte de crédit).</li>
                <li><strong>Données techniques &amp; Sécurité :</strong> Adresse IP et données de l'appareil (collectées de manière transitoire par Cloudflare Turnstile pour vérifier que vous êtes un humain et non un bot).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>3. Utilisation des Données</h2>
              <p style={{ marginBottom: '8px' }}>Vos données sont utilisées exclusivement pour :</p>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                <li>Sauvegarder votre progression sur le cloud sécurisé (Firebase Firestore).</li>
                <li>Permettre les fonctionnalités multijoueurs (Marché d'enchères, Échanges 1v1, Duels de quiz en direct, Guildes et Raids).</li>
                <li>Sécuriser le jeu contre la triche, les scripts automatisés et les requêtes abusives.</li>
                <li>Gérer les abonnements via les plateformes officielles (Google Play et Apple App Store).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>4. Services Tiers Partenaires</h2>
              <p style={{ marginBottom: '8px' }}>Pour fonctionner, l'Application s'appuie sur des partenaires techniques certifiés et conformes au RGPD :</p>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                <li><strong>Firebase (Google) :</strong> Authentification, base de données temps réel (Firestore) et Cloud Functions.</li>
                <li><strong>RevenueCat :</strong> Gestion chiffrée et sécurisée de l'abonnement « Archiviste VIP ».</li>
                <li><strong>Cloudflare (Turnstile) :</strong> Sécurité anti-bot lors de l'ouverture des boosters de cartes.</li>
                <li><strong>Wikimedia API :</strong> L'Application envoie des requêtes publiques aux serveurs Wikipédia pour récupérer les articles et statistiques de vues (ces requêtes n'incluent aucune de vos données personnelles).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>5. Conservation des Données</h2>
              <p style={{ margin: 0 }}>
                Nous conservons vos données de compte et de progression de jeu tant que votre compte est actif. Vos messages de Guilde sont conservés de manière limitée (les derniers messages uniquement) puis purgés automatiquement. En cas d'inactivité continue pendant 24 mois, vos données sont supprimées.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>6. Vos Droits (Conformité RGPD)</h2>
              <p style={{ marginBottom: '8px' }}>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez à tout moment du droit :</p>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                <li>D'accéder à l'ensemble de vos données personnelles conservées.</li>
                <li>De rectifier votre pseudonyme ou vos informations de profil.</li>
                <li>De demander la suppression totale de votre compte et de vos données (Droit à l'oubli).</li>
              </ul>
              <p style={{ marginTop: '10px', marginBottom: 0 }}>
                Pour exercer ces droits, vous pouvez supprimer votre compte directement dans les paramètres de l'application ou nous contacter à l'adresse ci-dessous.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>7. Nous contacter</h2>
              <p style={{ margin: 0 }}>
                Pour toute question concernant vos données, l'EULA ou pour demander la suppression de votre compte, veuillez nous contacter à : <a href="mailto:contact@wikicard.com" style={{ color: '#818cf8', textDecoration: 'none' }}>contact@wikicard.com</a> ou <a href="mailto:privacy@wikicard.com" style={{ color: '#818cf8', textDecoration: 'none' }}>privacy@wikicard.com</a>.
              </p>
            </section>
          </div>

          {/* BOUTONS NAVIGATION BAS DE PAGE */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px', borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
            <Link to="/wikicard/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#6366f1', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/wikicard/terms" style={{ ...btnOutlineStyle, borderColor: '#6366f1', color: '#818cf8' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📜 3. PAGE : CONDITIONS GÉNÉRALES (CGU / EULA) — WIKICARD (/wikicard/terms)
// ==========================================
export function WikiCardTermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/wikicard" style={{ color: '#818cf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à WikiCard
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#6366f1', color: '#ffffff', fontWeight: 'bold' }}>WikiCard</span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Contrat EULA &amp; CGU</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation et Contrat de Licence d'Utilisateur Final (EULA) — WikiCard
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 27 octobre 2026 • Application : WikiCard - Wikipedia TCG • Éditeur : Parrel Studio
          </div>
        </div>

        <div style={{ backgroundColor: '#131b2e', padding: '32px', borderRadius: '20px', border: '1px solid #1e293b', lineHeight: 1.75, color: '#e2e8f0' }}>
          <div style={{ backgroundColor: '#0b0f19', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> WikiCard - Wikipedia TCG (Jeu de cartes à collectionner)</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>Contact :</strong> <a href="mailto:contact@wikicard.com" style={{ color: '#818cf8', textDecoration: 'none' }}>contact@wikicard.com</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL HTTPS officielle :</strong> <a href="https://parrel.vercel.app/wikicard/terms" style={{ color: '#818cf8', textDecoration: 'none' }}>https://parrel.vercel.app/wikicard/terms</a></div>
            <div><strong style={{ color: '#ffffff' }}>EULA Standard Apple :</strong> <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', textDecoration: 'underline' }}>Apple Licensed Application End User License Agreement</a></div>
          </div>

          <div style={{ display: 'grid', gap: '26px' }}>

            {/* 1. Acceptation des Conditions */}
            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>1. Acceptation des Conditions</h2>
              <p style={{ margin: 0 }}>
                En téléchargeant, installant ou utilisant l'application « WikiCard - Wikipedia TCG » (ci-après « l'Application »), vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation (EULA). Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'Application.
              </p>
            </section>

            {/* 2. Licence d'Utilisation */}
            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>2. Licence d'Utilisation</h2>
              <p style={{ margin: 0 }}>
                Parrel Studio vous accorde une licence personnelle, non exclusive, non transférable et révocable pour utiliser l'Application sur vos appareils mobiles à des fins personnelles et non commerciales, conformément aux règles des boutiques d'applications (Apple App Store, Google Play Store).
              </p>
            </section>

            {/* 3. Propriété Intellectuelle & Données Wikipédia */}
            <section style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '18px' }}>
              <h2 style={{ color: '#a5b4fc', fontSize: '1.25rem', marginTop: 0, marginBottom: '8px' }}>
                3. Propriété Intellectuelle &amp; Données Wikipédia
              </h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>
                  <strong>Le Code et le Design :</strong> L'interface, les mécaniques de jeu, le code source et les éléments graphiques originaux appartiennent à Parrel Studio.
                </li>
                <li>
                  <strong>Contenu Wikipédia :</strong> L'Application utilise l'API de Wikimedia Foundation. Les textes et images issus de Wikipédia sont soumis à la licence Creative Commons Attribution-ShareAlike (CC BY-SA). L'Application n'est ni affiliée, ni soutenue par la Wikimedia Foundation.
                </li>
              </ul>
            </section>

            {/* 4. Comptes et Sécurité */}
            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>4. Comptes et Sécurité</h2>
              <p style={{ margin: '0 0 10px 0' }}>
                Vous êtes responsable de la confidentialité de vos identifiants (email, mot de passe). Toute activité effectuée via votre compte est de votre responsabilité.
              </p>
              <div style={{ backgroundColor: '#0b0f19', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #ef4444', color: '#fca5a5' }}>
                L'utilisation de bots, de scripts automatisés, ou l'exploitation de failles pour obtenir des cartes ou de l'Or est strictement interdite (des systèmes anti-bots comme Cloudflare Turnstile sont actifs) et entraînera le bannissement immédiat et irrévocable du compte.
              </div>
            </section>

            {/* 5. Contenu Généré par l'Utilisateur (Tchat de Guilde) */}
            <section style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '18px' }}>
              <h2 style={{ color: '#f87171', fontSize: '1.25rem', marginTop: 0, marginBottom: '8px' }}>
                5. Contenu Généré par l'Utilisateur (Tchat de Guilde) &amp; Tolérance Zéro
              </h2>
              <p style={{ margin: '0 0 10px 0' }}>
                L'Application inclut des fonctionnalités sociales (Tchat de Guilde). Il est strictement interdit de publier du contenu :
              </p>
              <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
                <li>Injurieux, raciste, homophobe, sexiste ou incitant à la haine.</li>
                <li>À caractère sexuel ou pornographique.</li>
                <li>Spam ou publicité.</li>
              </ul>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#fca5a5' }}>
                Nous nous réservons le droit de supprimer tout message et de suspendre ou bannir définitivement tout utilisateur enfreignant ces règles, sans préavis.
              </p>
            </section>

            {/* 6. Biens Virtuels et Achats Intégrés */}
            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>6. Biens Virtuels et Achats Intégrés (Abonnement VIP)</h2>
              <p style={{ marginBottom: '8px' }}>
                L'Application permet d'acquérir de l'Or (monnaie virtuelle) et un abonnement « Archiviste VIP ».
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>Les biens virtuels n'ont aucune valeur monétaire réelle et ne peuvent pas être échangés contre de l'argent réel en dehors de l'Application.</li>
                <li>Les abonnements se renouvellent automatiquement sauf annulation de votre part via les paramètres de votre compte Apple ou Google Play au moins 24h avant la fin de la période en cours.</li>
                <li>Parrel Studio se réserve le droit de modifier les prix, les taux de drop des cartes ou de supprimer l'Application à tout moment. Tous les achats sont finaux et non remboursables, sauf obligation légale.</li>
              </ul>
            </section>

            {/* 7. Limitation de Responsabilité */}
            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>7. Limitation de Responsabilité</h2>
              <p style={{ margin: 0 }}>
                L'Application est fournie « en l'état ». Parrel Studio ne garantit pas que l'Application sera exempte de bugs, d'interruptions ou d'erreurs. Nous ne saurions être tenus responsables des pertes de données (sauvegardes de cartes, Or).
              </p>
            </section>

            {/* 8. Résiliation */}
            <section>
              <h2 style={{ color: '#818cf8', fontSize: '1.25rem', marginBottom: '10px' }}>8. Résiliation</h2>
              <p style={{ margin: 0 }}>
                Nous nous réservons le droit de suspendre ou de supprimer votre compte à tout moment en cas de non-respect de ces CGU.
              </p>
            </section>
          </div>

          {/* BOUTONS NAVIGATION BAS DE PAGE */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px', borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
            <Link to="/wikicard/privacy" style={{ ...btnOutlineStyle, borderColor: '#6366f1', color: '#818cf8' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/wikicard/terms" style={{ ...btnPrimaryStyle, backgroundColor: '#6366f1', color: '#ffffff' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export pour compatibilité des routes
export const WikiCardEulaPage = WikiCardTermsOfServicePage;
export const WikiCardLegalDocsPage = WikiCardTermsOfServicePage;
