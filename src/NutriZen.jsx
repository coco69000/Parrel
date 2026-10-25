import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ==========================================
// 🎨 STYLES THÈME NUTRIZEN (EMERALD / HEALTH)
// ==========================================
const pageStyle = {
  backgroundColor: '#0f172a',
  color: 'white',
  minHeight: '100vh',
  paddingTop: '100px',
  paddingBottom: '60px',
  paddingLeft: '20px',
  paddingRight: '20px',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const cardStyle = {
  backgroundColor: '#1e293b',
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid #334155'
};

const btnPrimaryStyle = {
  backgroundColor: '#10b981',
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
  transition: 'background-color 0.2s ease'
};

const btnOutlineStyle = {
  backgroundColor: 'transparent',
  color: '#34d399',
  padding: '10px 20px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold',
  border: '1px solid #10b981',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease'
};

// ==========================================
// 📄 CONTENUS BRUTS MARKDOWN (POUR COPIE FACILE)
// ==========================================
export const NUTRIZEN_RAW_CGU = `# Conditions Générales d’Utilisation (CGU) – Application NutriZen
**Dernière mise à jour : 25 octobre 2026**

### 1. Objet et Présentation du Service
Les présentes Conditions Générales d’Utilisation (ci-après les « CGU ») régissent l’utilisation de l’application mobile « NutriZen » (ci-après l’« Application »). NutriZen est un outil d’accompagnement bien-être, de calcul nutritionnel, de planification de repas assistée par intelligence artificielle et de suivi d'activité physique.

### 2. Avertissement Médical et Santé (Disclaimer Majeur)
L'UTILISATEUR RECONNAÎT ET ACCEPTE EXPRESSÉMENT QUE NUTRIZEN N'EST PAS UN DISPOSITIF MÉDICAL ET NE DISPENSE AUCUN AVIS MÉDICAL, DIAGNOSTIC OU TRAITEMENT. 
Les estimations caloriques, les projections de poids, les programmes de jeûne intermittent et les analyses générées par l'Intelligence Artificielle sont fournis à titre exclusivement informatif et indicatif. Vous devez impérativement consulter un médecin ou un diététicien qualifié avant de commencer tout jeûne prolongé (>16h), régime hypocalorique ou nouveau programme sportif. En cas de malaise, étourdissement ou problème de santé, rompez immédiatement le jeûne et consultez les services d'urgence.

### 3. Accès, Inscription et Sécurité du Compte
L'accès à l'Application nécessite la création d'un compte. L'Utilisateur garantit que les informations transmises (âge, poids, taille, sexe) sont véridiques et à jour. L'utilisation de l'Application est réservée aux personnes âgées d'au moins 16 ans (ou disposant du consentement d'un représentant légal).

### 4. Abonnements et Achats Intégrés (NutriZen VIP / Premium)
- **Facturation** : Les fonctionnalités Premium sont souscrites sous forme d'abonnements à renouvellement automatique via l'App Store (Apple) ou Google Play (Google).
- **Renouvellement automatique** : Le paiement est débité à confirmation de l'achat. L'abonnement se renouvelle automatiquement sauf désactivation au moins 24 heures avant la fin de la période en cours dans les paramètres de votre compte Apple ou Google.
- **Restauration** : L'Utilisateur peut à tout moment restaurer ses achats sur un nouvel appareil via le bouton dédié dans l'Application.

### 5. Règles de Conduite et Fonctions Sociales (UGC)
L'Application propose des fonctions sociales (duels, partages, classements). Sont strictement interdits :
- Les propos diffamatoires, haineux, violents, pornographiques ou harcelants.
- La publication de photos à caractère dénudé ou inapproprié dans la galerie de progression.
Tout manquement entraînera la suspension immédiate et irrévocable du compte utilisateur sans préavis ni remboursement.

### 6. Propriété Intellectuelle
Tous les contenus, logos, algorithmes, interfaces graphiques et marques intégrés dans NutriZen sont la propriété exclusive de l'éditeur de l'Application.

### 7. Résiliation et Suppression de Compte
L'Utilisateur dispose de la faculté de supprimer son compte et toutes les données associées à tout moment directement depuis l'Application.`;

export const NUTRIZEN_RAW_PRIVACY = `# Politique de Confidentialité – Application NutriZen
**Dernière mise à jour : 25 octobre 2026**

La protection de vos données personnelles et de santé est au cœur de nos engagements. La présente Politique décrit comment NutriZen traite vos données conformément au Règlement Général sur la Protection des Données (RGPD) et aux réglementations locales.

### 1. Responsable de Traitement
L'Application NutriZen est éditée par l'équipe NutriZen (contact : contact@nutrizen.app).

### 2. Données collectées et Finalités
Nous collectons et traitons les données suivantes :
1. **Données d'identité et de compte** : E-mail, prénom, nom, pays, mot de passe chiffré (Authentification et gestion de profil).
2. **Données morphologiques et de bien-être (Données Sensibles - Art. 9 RGPD)** : Poids, taille, âge, masse grasse, historique de pesée, objectifs caloriques, consommations d'eau et sessions de jeûne. (Traitées uniquement avec votre consentement explicite recueilli à l'inscription).
3. **Données de santé et d'activité (HealthKit / Google Connect)** : Nombre de pas, calories actives dépensées. Ces données sont utilisées exclusivement pour synchroniser votre journal de bord. ELLES NE SONT JAMAIS VENDUES NI UTILISÉES À DES FINS PUBLICITAIRES.
4. **Photos de repas et scan de codes-barres** : Utilisées pour l'analyse visuelle des portions et la détection d'ingrédients.
5. **Données techniques et d'identifiant** : Jetons FCM pour les notifications, identifiant utilisateur anonymisé.

### 3. Sous-traitants et Transferts de Données
NutriZen s'appuie sur des partenaires techniques certifiés :
- **Google Firebase (Cloud Firestore, Auth, Functions)** : Hébergement sécurisé des données.
- **RevenueCat** : Gestion chiffrée des abonnements intégrés.
- **Fournisseurs d'IA (Qwen / Cloud Functions)** : Les invites d'analyse de repas sont transmises de manière anonymisée sans aucune donnée nominative directe.
- **Open Food Facts & USDA** : Consultation de bases de données nutritionnelles publiques.

### 4. Durée de Conservation
Les données sont conservées tant que votre compte reste actif. Si vous n'utilisez pas l'application pendant 24 mois consécutifs, vos données sont automatiquement purgées.

### 5. Vos Droits (Accès, Rectification, Suppression)
Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données. Vous pouvez supprimer l'intégralité de votre compte et de vos données historiques directement depuis l'écran « Mon Profil » de l'Application ou en écrivant à : privacy@nutrizen.app.`;

export const NUTRIZEN_RAW_EULA = `# Contrat de Licence d'Utilisateur Final (CLUF / EULA) – NutriZen
**Dernière mise à jour : 25 octobre 2026**

Le présent Contrat de Licence d'Utilisateur Final (« CLUF ») est conclu entre vous (« Utilisateur ») et NutriZen.

### 1. Concession de Licence
NutriZen vous concède une licence révocable, non exclusive, non transférable et limitée d'installation et d'utilisation de l'Application sur vos appareils personnels, dans le strict respect des règles des plateformes d'Apple (App Store Terms of Service) et de Google (Google Play Terms of Service).

### 2. Restriction d'Usage
Vous acceptez de ne pas :
- Décompiler, désosser ou tenter d'extraire le code source de l'Application.
- Utiliser l'Application pour concevoir un service concurrent ou copier ses algorithmes d'IA.
- Utiliser les fonctionnalités sociales pour usurper une identité, harceler ou diffuser du contenu préjudiciable.

### 3. Contenu Généré par l'Utilisateur (UGC) et Tolérance Zéro
L'Application intègre des fonctionnalités communautaires (photos de progression corporelle, pseudonymes, défis d'amis). L'Utilisateur s'engage à ne publier aucun contenu à caractère pornographique, insultant, diffamatoire ou illicite. NutriZen applique une politique de TOLÉRANCE ZÉRO envers les contenus abusifs. Tout contenu signalé sera modéré et retiré sous 24 heures, et l'auteur banni de manière permanente.

### 4. Exclusion de Garantie et Limitation de Responsabilité
L'APPLICATION EST FOURNIE « EN L'ÉTAT ». NUTRIZEN DÉCLINE TOUTE RESPONSABILITÉ QUANT AUX DOMMAGES DIRECTS OU INDIRECTS, BLESSURES OU DÉFAILLANCES DE SANTÉ POUVANT RÉSULTER DE L'UTILISATION DES PROGRAMMES NUTRITIONNELS OU DE JEÛNE PROPOSÉS.

### 5. Droit Applicable
Le présent contrat est régi par le droit français. Tout litige relatif à son interprétation sera soumis aux tribunaux compétents.`;

export const NUTRIZEN_RAW_ALL = `4. Textes Juridiques Complets (À copier sur votre site web)
Voici les trois documents légaux rédigés sur mesure pour NutriZen, conformes aux exigences du RGPD et des App Store / Play Store.

--------------------------------------------------------------------------------
DOCUMENT 1 : CONDITIONS GÉNÉRALES D'UTILISATION (CGU)
--------------------------------------------------------------------------------
${NUTRIZEN_RAW_CGU}

--------------------------------------------------------------------------------
DOCUMENT 2 : POLITIQUE DE CONFIDENTIALITÉ (RGPD & Privacy Policy)
--------------------------------------------------------------------------------
${NUTRIZEN_RAW_PRIVACY}

--------------------------------------------------------------------------------
DOCUMENT 3 : CONTRAT DE LICENCE UTILISATEUR FINAL (CLUF / EULA)
--------------------------------------------------------------------------------
${NUTRIZEN_RAW_EULA}`;

// ==========================================
// 🌟 1. SHOWCASE NUTRIZEN (PAGE D'ACCUEIL /nutrizen)
// ==========================================
export function NutriZenPage() {
  const [storeNotice, setStoreNotice] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const handleStoreClick = (storeName) => {
    setStoreNotice(`NutriZen sera prochainement disponible en téléchargement direct sur ${storeName}. Préparez votre transformation bien-être !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const featureTabs = [
    {
      title: '🥑 Nutrition & Vision IA',
      color: '#10b981',
      subtitle: 'Multi-saisie intelligente & analyse instantanée des repas',
      items: [
        { label: 'Scan Code-Barres & Open Food Facts', desc: 'Récupération instantanée des macronutriments (calories, protéines, glucides, lipides), du Nutri-Score officiel et de la liste détaillée des additifs alimentaires.' },
        { label: 'Vision IA (Photo d’assiette)', desc: 'Prenez simplement votre repas en photo : l\'intelligence artificielle estime la portion, identifie les ingrédients et calcule les macros.' },
        { label: 'OCR d’étiquette nutritionnelle', desc: 'Si le code-barres est absent ou inconnu, l\'appareil photo scanne directement le tableau nutritionnel au dos du paquet.' },
        { label: 'Saisie en Langage Naturel (NLP)', desc: 'Décrivez votre assiette comme à un ami (ex. « 100g de poulet et 50g de riz basmati ») et l\'IA extrait précisément les valeurs via la base officielle USDA.' },
        { label: 'Créateur de Recettes sur-mesure', desc: 'Composez des plats complexes avec répartition automatique des portions et recalcul en temps réel des macros par assiette.' }
      ]
    },
    {
      title: '⏱️ Jeûne Intermittent (Fasting)',
      color: '#06b6d4',
      subtitle: 'Minuteur en temps réel & étapes métaboliques pédagogiques',
      items: [
        { label: 'Plans Prédéfinis & Adaptatifs', desc: 'Du jeûne débutant au jeûne avancé : 12:12, 14:10, 16:8, 20:4 (Warrior Diet), OMAD (23:1) et jeûnes prolongés encadrés de 36 heures.' },
        { label: 'Minuteur & Étapes Métaboliques', desc: 'Suivez en direct la réaction de votre organisme heure par heure : Anabolisme, Catabolisme, Cétose, Autophagie cellulaire et Pic d’hormone de croissance.' },
        { label: 'Alerte Sécurité & Arrêt d’urgence', desc: 'Détection automatisée des jeûnes supérieurs à 24h avec protocole d\'arrêt immédiat en cas de sensation anormale et guide de réalimentation douce.' },
        { label: 'Planning Mensuel Prévisionnel', desc: 'Calendrier intelligent qui ajuste la difficulté de vos cycles selon votre adhésion et votre rythme de vie.' }
      ]
    },
    {
      title: '🏋️ Activités Physiques & Sport',
      color: '#8b5cf6',
      subtitle: 'Synchronisation santé native & Coach sportif IA',
      items: [
        { label: 'Synchronisation Native Apple Health & Google Fit', desc: 'Collecte automatique et passive de vos pas quotidiens et de vos calories brûlées pour ajuster votre budget énergétique en temps réel.' },
        { label: 'Coach Sportif IA VIP', desc: 'Génération de séances sur-mesure adaptées à votre niveau : séance du jour, planification hebdomadaire, ou mode dynamique « Je suis à la salle » exploitant les machines disponibles.' },
        { label: 'Bibliothèque de +800 Exercices Animés', desc: 'Démonstrations visuelles animées, fiches anatomiques détaillant les muscles sollicités et consignes de sécurité pour éviter les blessures.' }
      ]
    },
    {
      title: '📈 Moteur Prédictif & Galerie Privée',
      color: '#f59e0b',
      subtitle: 'Projection scientifique à 8 semaines & journal corporel chiffré',
      items: [
        { label: 'Courbe de Poids Prédictive à 8 semaines', desc: 'Projection mathématique et algorithmique basée sur votre dépense énergétique réelle (TDEE) et votre historique de déficit calorique.' },
        { label: 'Galerie Photos Avant / Après Privée', desc: 'Espace sécurisé et chiffré sur Firebase Storage pour observer visuellement vos progrès physiques en toute confidentialité.' },
        { label: 'Détection de Plateau & Diet Break', desc: 'L\'algorithme repère les phases de stagnation métabolique et vous conseille une pause diététique contrôlée pour relancer la leptine.' }
      ]
    },
    {
      title: '🌍 Éco-Score & Gamification',
      color: '#22c55e',
      subtitle: 'Impact carbone, streaks, badges et duels équitables entre amis',
      items: [
        { label: 'Éco-Score & Empreinte Carbone (kg CO₂eq)', desc: 'Sensibilisation à une alimentation durable grâce au calcul de l\'empreinte carbone de vos aliments scannés.' },
        { label: 'Duels Équitables Entre Amis', desc: 'Affrontez un proche sur le pourcentage d\'atteinte de vos objectifs respectifs (et non sur les chiffres bruts), rendant chaque match équitable avec un gage à la clé !' },
        { label: 'Séries Quotidiennes (Streaks) & Trophées', desc: 'Débloquez des bonus IA, des badges exclusifs et des succès pour récompenser votre constance.' },
        { label: 'Défis Quotidiens IA en Moins de 5 min', desc: 'Mini-missions bien-être rapides pour booster votre énergie sans bousculer votre emploi du temps.' }
      ]
    },
    {
      title: '🧠 Système Expert IA Proactif',
      color: '#ec4899',
      subtitle: 'Anticipation des fringales & synergie globale quotidienne',
      items: [
        { label: 'Prévention des Fringales (Craving Support)', desc: 'Anticipation des moments de vulnérabilité (sommeil insuffisant < 6h, stress du vendredi après-midi) avec astuces d\'ancrage.' },
        { label: 'Alerte Pic Glycémique', desc: 'Détection automatique des repas très riches en glucides rapides et suggestion immédiate d’une marche digestive de 15 minutes.' },
        { label: 'Note Quotidienne Globale / 100', desc: 'Croisement intelligent entre nutrition, hydratation, jeûne, sport et récupération pour vous attribuer un score de vitalité chaque soir.' }
      ]
    }
  ];

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Fil d'Ariane */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            ← Accueil Parrel
          </Link>
          <span style={{ color: '#475569' }}>/</span>
          <span style={{ color: '#10b981', fontWeight: 'bold' }}>NutriZen</span>
          <span style={{ color: '#64748b', fontSize: '12px' }}>(anciennement ProjetCalo)</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '6px 14px', borderRadius: '999px', marginBottom: '18px' }}>
            <span style={{ fontSize: '18px' }}>🥑</span>
            <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              NutriZen • Nutrition, Jeûne &amp; Fitness IA
            </span>
          </div>

          <h1 style={{ color: 'white', marginTop: 0, marginBottom: '16px', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.2, fontWeight: 800 }}>
            NutriZen : L'Alliance du Suivi Métabolique, de l'IA et du Bien-être
          </h1>

          <p style={{ color: '#34d399', fontSize: '1.25rem', fontWeight: '600', marginBottom: '18px', maxWidth: '850px' }}>
            L'application mobile tout-en-un pour atteindre vos objectifs physiques (perte de poids, maintien, prise de masse) avec précision scientifique, intelligence artificielle et motivation sociale.
          </p>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '920px', marginBottom: '28px' }}>
            NutriZen réunit la multi-saisie intelligente de vos repas (Vision IA par photo, code-barres Open Food Facts, OCR d'étiquettes et saisie vocale NLP), un module complet de jeûne intermittent avec minuteur métabolique en temps réel, un coach sportif IA synchronisé à vos données Apple Health / Google Fit, et un moteur prédictif à 8 semaines.
          </p>

          {/* BADGES ATOUTS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '26px' }}>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              📸 Vision IA &amp; OCR
            </span>
            <span style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              ⏱️ Jeûne 12:12 à OMAD
            </span>
            <span style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🏋️ +800 Exercices &amp; Coach IA
            </span>
            <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🤝 Duels entre amis équitables
            </span>
            <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🌱 Éco-Score Carbone
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
                border: '1px solid #334155',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
                border: '1px solid #334155',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.05-.52 2.67-1.27z" />
              </svg>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Télécharger dans l'</div>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>App Store</div>
              </div>
            </button>

            <Link to="/nutrizen/legal" style={{ ...btnPrimaryStyle, padding: '14px 22px', fontSize: '15px' }}>
              📜 Textes Juridiques Complets
            </Link>
          </div>

          {storeNotice && (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#6ee7b7', fontSize: '14px', maxWidth: '640px', marginBottom: '20px' }}>
              ✨ {storeNotice}
            </div>
          )}
        </div>

        {/* SECTION DES PILIERS & FONCTIONNALITÉS */}
        <div style={{ ...cardStyle, marginBottom: '40px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '6px', fontSize: '1.65rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🌟</span> Les Piliers &amp; Fonctionnalités Majeures
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '24px' }}>
            Cliquez sur un domaine pour explorer les technologies développées dans NutriZen :
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
                  backgroundColor: activeTab === idx ? tab.color : '#0f172a',
                  color: activeTab === idx ? '#0f172a' : '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Détails du pilier sélectionné */}
          <div style={{ backgroundColor: '#0f172a', borderRadius: '14px', padding: '24px', border: `1px solid ${featureTabs[activeTab].color}40` }}>
            <div style={{ color: featureTabs[activeTab].color, fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '4px' }}>
              {featureTabs[activeTab].title}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>
              {featureTabs[activeTab].subtitle}
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {featureTabs[activeTab].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1e293b', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155' }}>
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
              <h3 style={{ color: '#34d399', margin: 0, fontSize: '1.25rem' }}>Architecture Technique</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>Framework :</strong> Flutter (Dart) multiplateforme (iOS &amp; Android), Material 3, thèmes Clair &amp; Sombre OLED contrasté.</li>
              <li><strong>Firebase Auth &amp; Firestore :</strong> Authentification chiffrée et synchronisation temps réel des historiques.</li>
              <li><strong>Firebase Functions &amp; Storage :</strong> Calculs sécurisés côté serveur et stockage privé des photos de progression.</li>
              <li><strong>Firebase App Check :</strong> Protection anti-piratage via Play Integrity et DeviceCheck.</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>💎</span>
              <h3 style={{ color: '#38bdf8', margin: 0, fontSize: '1.25rem' }}>Modèle &amp; Internationalisation</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>RevenueCat :</strong> Gestion sécurisée des abonnements in-app NutriZen VIP / Premium.</li>
              <li><strong>UsageTrackerService :</strong> Gestion de quotas journaliers intelligents pour les utilisateurs gratuits et accès illimité VIP.</li>
              <li><strong>Internationalisation (i18n) :</strong> Entièrement traduite en 15 langues européennes (Français, Anglais, Allemand, Espagnol, Italien...).</li>
              <li><strong>Respect de la vie privée :</strong> Aucune revente de données, conformité stricte RGPD.</li>
            </ul>
          </div>
        </div>

        {/* BANNIÈRE DOCUMENTS JURIDIQUES COMPLETS */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid #10b981',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.15)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '36px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge" style={{ backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold' }}>Conformité 100% Légale</span>
              <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>RGPD • Apple • Google</span>
            </div>
            <h3 style={{ color: 'white', margin: '4px 0 8px 0', fontSize: '1.4rem' }}>
              Documents Juridiques Complets NutriZen
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px', maxWidth: '600px', lineHeight: 1.6 }}>
              Retrouvez les trois documents rédigés sur mesure pour NutriZen (CGU avec Avertissement Médical, Politique RGPD Santé, et CLUF / EULA avec Tolérance Zéro UGC).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/nutrizen/legal" style={{ ...btnPrimaryStyle, padding: '12px 20px' }}>
              📋 Page 4. Textes Juridiques (Tous)
            </Link>
            <Link to="/nutrizen/privacy" style={{ ...btnOutlineStyle, padding: '12px 18px' }}>
              🔒 Confidentialité
            </Link>
            <Link to="/nutrizen/terms" style={{ ...btnOutlineStyle, padding: '12px 18px' }}>
              📜 CGU &amp; Disclaimer
            </Link>
            <Link to="/nutrizen/eula" style={{ ...btnOutlineStyle, padding: '12px 18px' }}>
              📑 CLUF / EULA
            </Link>
          </div>
        </div>

        {/* PIED DE PAGE APPLICATION */}
        <div style={{ borderTop: '1px solid #334155', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', color: '#94a3b8', fontSize: '13px' }}>
          <div>
            Application <strong style={{ color: 'white' }}>NutriZen</strong> • Développé par l'équipe NutriZen &amp; Parrel Studio
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="mailto:contact@nutrizen.app" style={{ color: '#34d399', textDecoration: 'none' }}>contact@nutrizen.app</a>
            <span>•</span>
            <a href="mailto:privacy@nutrizen.app" style={{ color: '#34d399', textDecoration: 'none' }}>privacy@nutrizen.app</a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 📜 2. PAGE : 4. TEXTES JURIDIQUES COMPLETS (À COPIER SUR VOTRE SITE WEB)
// ==========================================
export function NutriZenLegalDocsPage() {
  const [selectedDoc, setSelectedDoc] = useState('all');
  const [copiedId, setCopiedId] = useState('');

  const copyToClipboard = (text, docId) => {
    navigator.clipboard.writeText(text);
    setCopiedId(docId);
    setTimeout(() => setCopiedId(''), 3000);
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>

        {/* Navigation & Retour */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
          <Link to="/nutrizen" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 'bold' }}>
            ← Retour à NutriZen
          </Link>
          <span style={{ color: '#475569' }}>•</span>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
            Accueil Parrel
          </Link>
        </div>

        {/* En-tête Page 4 */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <span className="badge" style={{ backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold' }}>NutriZen Legal</span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>App Store &amp; Play Store Ready</span>
            <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' }}>RGPD Art. 9 Données Santé</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '6px', marginBottom: '12px', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', lineHeight: 1.25 }}>
            4. Textes Juridiques Complets (À copier sur votre site web)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.6, margin: '0 0 16px 0' }}>
            Voici les trois documents légaux rédigés sur mesure pour NutriZen, conformes aux exigences du RGPD et des App Store / Play Store.
          </p>

          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: 'white' }}>Application :</strong> NutriZen (Suivi métabolique, Jeûne, Fitness &amp; IA)</div>
            <div><strong style={{ color: 'white' }}>Éditeur :</strong> Équipe NutriZen (contact : contact@nutrizen.app)</div>
            <div><strong style={{ color: 'white' }}>DPO / Confidentialité :</strong> privacy@nutrizen.app</div>
            <div><strong style={{ color: 'white' }}>URLs Web d'intégration :</strong> <code style={{ color: '#34d399' }}>/nutrizen/privacy</code>, <code style={{ color: '#34d399' }}>/nutrizen/terms</code>, <code style={{ color: '#34d399' }}>/nutrizen/eula</code></div>
          </div>
        </div>

        {/* BARRE D'ONGLETS ET BOUTONS COPIER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedDoc('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: selectedDoc === 'all' ? '#10b981' : '#1e293b',
                color: selectedDoc === 'all' ? '#0f172a' : '#cbd5e1'
              }}
            >
              📑 Tous les documents
            </button>
            <button
              onClick={() => setSelectedDoc('cgu')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: selectedDoc === 'cgu' ? '#10b981' : '#1e293b',
                color: selectedDoc === 'cgu' ? '#0f172a' : '#cbd5e1'
              }}
            >
              1. CGU
            </button>
            <button
              onClick={() => setSelectedDoc('privacy')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: selectedDoc === 'privacy' ? '#10b981' : '#1e293b',
                color: selectedDoc === 'privacy' ? '#0f172a' : '#cbd5e1'
              }}
            >
              2. Confidentialité (RGPD)
            </button>
            <button
              onClick={() => setSelectedDoc('eula')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: selectedDoc === 'eula' ? '#10b981' : '#1e293b',
                color: selectedDoc === 'eula' ? '#0f172a' : '#cbd5e1'
              }}
            >
              3. CLUF / EULA
            </button>
          </div>

          <button
            onClick={() => {
              const textToCopy = selectedDoc === 'cgu' ? NUTRIZEN_RAW_CGU : selectedDoc === 'privacy' ? NUTRIZEN_RAW_PRIVACY : selectedDoc === 'eula' ? NUTRIZEN_RAW_EULA : NUTRIZEN_RAW_ALL;
              copyToClipboard(textToCopy, 'current');
            }}
            style={{
              ...btnPrimaryStyle,
              backgroundColor: copiedId === 'current' ? '#22c55e' : '#10b981',
              color: '#0f172a'
            }}
          >
            {copiedId === 'current' ? '✅ Copié avec succès !' : '📋 Copier le Markdown'}
          </button>
        </div>

        {/* CONTENU : DOCUMENT 1 - CONDITIONS GÉNÉRALES D'UTILISATION */}
        {(selectedDoc === 'all' || selectedDoc === 'cgu') && (
          <div style={{ ...cardStyle, marginBottom: '32px', borderColor: '#334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <span className="badge" style={{ backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold' }}>DOCUMENT 1</span>
                <h2 style={{ color: 'white', margin: '8px 0 2px 0', fontSize: '1.45rem' }}>
                  CONDITIONS GÉNÉRALES D'UTILISATION (CGU)
                </h2>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>Application NutriZen • Dernière mise à jour : 25 octobre 2026</div>
              </div>
              <button
                onClick={() => copyToClipboard(NUTRIZEN_RAW_CGU, 'cgu')}
                style={{ ...btnOutlineStyle, padding: '6px 14px', fontSize: '12px' }}
              >
                {copiedId === 'cgu' ? '✅ Copié !' : '📋 Copier CGU'}
              </button>
            </div>

            <div style={{ color: '#e2e8f0', lineHeight: 1.8, fontSize: '15px', display: 'grid', gap: '20px' }}>
              <section>
                <h3 style={{ color: '#34d399', fontSize: '1.15rem', marginBottom: '8px' }}>1. Objet et Présentation du Service</h3>
                <p style={{ margin: 0 }}>
                  Les présentes Conditions Générales d’Utilisation (ci-après les « CGU ») régissent l’utilisation de l’application mobile « NutriZen » (ci-après l’« Application »). NutriZen est un outil d’accompagnement bien-être, de calcul nutritionnel, de planification de repas assistée par intelligence artificielle et de suivi d'activité physique.
                </p>
              </section>

              {/* DISCLAIMER MÉDICAL MIS EN EXERGUE */}
              <section style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '18px' }}>
                <h3 style={{ color: '#f87171', fontSize: '1.15rem', marginTop: 0, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚠️</span> 2. Avertissement Médical et Santé (Disclaimer Majeur)
                </h3>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#fee2e2' }}>
                  L'UTILISATEUR RECONNAÎT ET ACCEPTE EXPRESSÉMENT QUE NUTRIZEN N'EST PAS UN DISPOSITIF MÉDICAL ET NE DISPENSE AUCUN AVIS MÉDICAL, DIAGNOSTIC OU TRAITEMENT.
                </p>
                <p style={{ margin: 0, color: '#fecaca', fontSize: '14px' }}>
                  Les estimations caloriques, les projections de poids, les programmes de jeûne intermittent et les analyses générées par l'Intelligence Artificielle sont fournis à titre exclusivement informatif et indicatif. Vous devez impérativement consulter un médecin ou un diététicien qualifié avant de commencer tout jeûne prolongé (&gt;16h), régime hypocalorique ou nouveau programme sportif. En cas de malaise, étourdissement ou problème de santé, rompez immédiatement le jeûne et consultez les services d'urgence.
                </p>
              </section>

              <section>
                <h3 style={{ color: '#34d399', fontSize: '1.15rem', marginBottom: '8px' }}>3. Accès, Inscription et Sécurité du Compte</h3>
                <p style={{ margin: 0 }}>
                  L'accès à l'Application nécessite la création d'un compte. L'Utilisateur garantit que les informations transmises (âge, poids, taille, sexe) sont véridiques et à jour. L'utilisation de l'Application est réservée aux personnes âgées d'au moins 16 ans (ou disposant du consentement d'un représentant légal).
                </p>
              </section>

              <section>
                <h3 style={{ color: '#34d399', fontSize: '1.15rem', marginBottom: '8px' }}>4. Abonnements et Achats Intégrés (NutriZen VIP / Premium)</h3>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li><strong>Facturation :</strong> Les fonctionnalités Premium sont souscrites sous forme d'abonnements à renouvellement automatique via l'App Store (Apple) ou Google Play (Google).</li>
                  <li><strong>Renouvellement automatique :</strong> Le paiement est débité à confirmation de l'achat. L'abonnement se renouvelle automatiquement sauf désactivation au moins 24 heures avant la fin de la période en cours dans les paramètres de votre compte Apple ou Google.</li>
                  <li><strong>Restauration :</strong> L'Utilisateur peut à tout moment restaurer ses achats sur un nouvel appareil via le bouton dédié dans l'Application.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ color: '#34d399', fontSize: '1.15rem', marginBottom: '8px' }}>5. Règles de Conduite et Fonctions Sociales (UGC)</h3>
                <p style={{ marginBottom: '8px' }}>L'Application propose des fonctions sociales (duels, partages, classements). Sont strictement interdits :</p>
                <ul style={{ margin: '0 0 10px 20px' }}>
                  <li>Les propos diffamatoires, haineux, violents, pornographiques ou harcelants.</li>
                  <li>La publication de photos à caractère dénudé ou inapproprié dans la galerie de progression.</li>
                </ul>
                <div style={{ color: '#f87171', fontWeight: 'bold', fontSize: '14px' }}>
                  Tout manquement entraînera la suspension immédiate et irrévocable du compte utilisateur sans préavis ni remboursement.
                </div>
              </section>

              <section>
                <h3 style={{ color: '#34d399', fontSize: '1.15rem', marginBottom: '8px' }}>6. Propriété Intellectuelle</h3>
                <p style={{ margin: 0 }}>
                  Tous les contenus, logos, algorithmes, interfaces graphiques et marques intégrés dans NutriZen sont la propriété exclusive de l'éditeur de l'Application.
                </p>
              </section>

              <section>
                <h3 style={{ color: '#34d399', fontSize: '1.15rem', marginBottom: '8px' }}>7. Résiliation et Suppression de Compte</h3>
                <p style={{ margin: 0 }}>
                  L'Utilisateur dispose de la faculté de supprimer son compte et toutes les données associées à tout moment directement depuis l'Application.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* CONTENU : DOCUMENT 2 - POLITIQUE DE CONFIDENTIALITÉ */}
        {(selectedDoc === 'all' || selectedDoc === 'privacy') && (
          <div style={{ ...cardStyle, marginBottom: '32px', borderColor: '#334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <span className="badge" style={{ backgroundColor: '#06b6d4', color: '#0f172a', fontWeight: 'bold' }}>DOCUMENT 2</span>
                <h2 style={{ color: 'white', margin: '8px 0 2px 0', fontSize: '1.45rem' }}>
                  POLITIQUE DE CONFIDENTIALITÉ (RGPD &amp; Privacy Policy)
                </h2>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>Application NutriZen • Dernière mise à jour : 25 octobre 2026</div>
              </div>
              <button
                onClick={() => copyToClipboard(NUTRIZEN_RAW_PRIVACY, 'privacy')}
                style={{ ...btnOutlineStyle, padding: '6px 14px', fontSize: '12px' }}
              >
                {copiedId === 'privacy' ? '✅ Copié !' : '📋 Copier RGPD'}
              </button>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
              La protection de vos données personnelles et de santé est au cœur de nos engagements. La présente Politique décrit comment NutriZen traite vos données conformément au Règlement Général sur la Protection des Données (RGPD) et aux réglementations locales.
            </p>

            <div style={{ color: '#e2e8f0', lineHeight: 1.8, fontSize: '15px', display: 'grid', gap: '20px' }}>
              <section>
                <h3 style={{ color: '#22d3ee', fontSize: '1.15rem', marginBottom: '8px' }}>1. Responsable de Traitement</h3>
                <p style={{ margin: 0 }}>
                  L'Application NutriZen est éditée par l'équipe NutriZen (contact : <a href="mailto:contact@nutrizen.app" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@nutrizen.app</a>).
                </p>
              </section>

              <section>
                <h3 style={{ color: '#22d3ee', fontSize: '1.15rem', marginBottom: '8px' }}>2. Données collectées et Finalités</h3>
                <p style={{ marginBottom: '10px' }}>Nous collectons et traitons les données suivantes :</p>
                <ol style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '10px' }}>
                  <li>
                    <strong>Données d'identité et de compte :</strong> E-mail, prénom, nom, pays, mot de passe chiffré (Authentification et gestion de profil).
                  </li>
                  <li style={{ backgroundColor: 'rgba(6, 182, 212, 0.08)', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #06b6d4' }}>
                    <strong style={{ color: '#38bdf8' }}>Données morphologiques et de bien-être (Données Sensibles - Art. 9 RGPD) :</strong> Poids, taille, âge, masse grasse, historique de pesée, objectifs caloriques, consommations d'eau et sessions de jeûne. (Traitées uniquement avec votre consentement explicite recueilli à l'inscription).
                  </li>
                  <li>
                    <strong>Données de santé et d'activité (HealthKit / Google Connect) :</strong> Nombre de pas, calories actives dépensées. Ces données sont utilisées exclusivement pour synchroniser votre journal de bord. <span style={{ color: '#22c55e', fontWeight: 'bold' }}>ELLES NE SONT JAMAIS VENDUES NI UTILISÉES À DES FINS PUBLICITAIRES.</span>
                  </li>
                  <li>
                    <strong>Photos de repas et scan de codes-barres :</strong> Utilisées pour l'analyse visuelle des portions et la détection d'ingrédients.
                  </li>
                  <li>
                    <strong>Données techniques et d'identifiant :</strong> Jetons FCM pour les notifications, identifiant utilisateur anonymisé.
                  </li>
                </ol>
              </section>

              <section>
                <h3 style={{ color: '#22d3ee', fontSize: '1.15rem', marginBottom: '8px' }}>3. Sous-traitants et Transferts de Données</h3>
                <p style={{ marginBottom: '8px' }}>NutriZen s'appuie sur des partenaires techniques certifiés :</p>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li><strong>Google Firebase (Cloud Firestore, Auth, Functions) :</strong> Hébergement sécurisé des données.</li>
                  <li><strong>RevenueCat :</strong> Gestion chiffrée des abonnements intégrés.</li>
                  <li><strong>Fournisseurs d'IA (Qwen / Cloud Functions) :</strong> Les invites d'analyse de repas sont transmises de manière anonymisée sans aucune donnée nominative directe.</li>
                  <li><strong>Open Food Facts &amp; USDA :</strong> Consultation de bases de données nutritionnelles publiques.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ color: '#22d3ee', fontSize: '1.15rem', marginBottom: '8px' }}>4. Durée de Conservation</h3>
                <p style={{ margin: 0 }}>
                  Les données sont conservées tant que votre compte reste actif. Si vous n'utilisez pas l'application pendant 24 mois consécutifs, vos données sont automatiquement purgées.
                </p>
              </section>

              <section>
                <h3 style={{ color: '#22d3ee', fontSize: '1.15rem', marginBottom: '8px' }}>5. Vos Droits (Accès, Rectification, Suppression)</h3>
                <p style={{ margin: 0 }}>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données. Vous pouvez supprimer l'intégralité de votre compte et de vos données historiques directement depuis l'écran « Mon Profil » de l'Application ou en écrivant à : <a href="mailto:privacy@nutrizen.app" style={{ color: '#38bdf8', textDecoration: 'none' }}>privacy@nutrizen.app</a>.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* CONTENU : DOCUMENT 3 - CONTRAT DE LICENCE UTILISATEUR FINAL (CLUF / EULA) */}
        {(selectedDoc === 'all' || selectedDoc === 'eula') && (
          <div style={{ ...cardStyle, marginBottom: '32px', borderColor: '#334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <span className="badge" style={{ backgroundColor: '#8b5cf6', color: 'white', fontWeight: 'bold' }}>DOCUMENT 3</span>
                <h2 style={{ color: 'white', margin: '8px 0 2px 0', fontSize: '1.45rem' }}>
                  CONTRAT DE LICENCE UTILISATEUR FINAL (CLUF / EULA)
                </h2>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>Application NutriZen • Dernière mise à jour : 25 octobre 2026</div>
              </div>
              <button
                onClick={() => copyToClipboard(NUTRIZEN_RAW_EULA, 'eula')}
                style={{ ...btnOutlineStyle, padding: '6px 14px', fontSize: '12px' }}
              >
                {copiedId === 'eula' ? '✅ Copié !' : '📋 Copier CLUF'}
              </button>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
              Le présent Contrat de Licence d'Utilisateur Final (« CLUF ») est conclu entre vous (« Utilisateur ») et NutriZen.
            </p>

            <div style={{ color: '#e2e8f0', lineHeight: 1.8, fontSize: '15px', display: 'grid', gap: '20px' }}>
              <section>
                <h3 style={{ color: '#a78bfa', fontSize: '1.15rem', marginBottom: '8px' }}>1. Concession de Licence</h3>
                <p style={{ margin: 0 }}>
                  NutriZen vous concède une licence révocable, non exclusive, non transférable et limitée d'installation et d'utilisation de l'Application sur vos appareils personnels, dans le strict respect des règles des plateformes d'Apple (App Store Terms of Service) et de Google (Google Play Terms of Service).
                </p>
              </section>

              <section>
                <h3 style={{ color: '#a78bfa', fontSize: '1.15rem', marginBottom: '8px' }}>2. Restriction d'Usage</h3>
                <p style={{ marginBottom: '8px' }}>Vous acceptez de ne pas :</p>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>Décompiler, désosser ou tenter d'extraire le code source de l'Application.</li>
                  <li>Utiliser l'Application pour concevoir un service concurrent ou copier ses algorithmes d'IA.</li>
                  <li>Utiliser les fonctionnalités sociales pour usurper une identité, harceler ou diffuser du contenu préjudiciable.</li>
                </ul>
              </section>

              {/* UGC & TOLERANCE ZERO */}
              <section style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '12px', padding: '18px' }}>
                <h3 style={{ color: '#c084fc', fontSize: '1.15rem', marginTop: 0, marginBottom: '8px' }}>
                  3. Contenu Généré par l'Utilisateur (UGC) et Tolérance Zéro
                </h3>
                <p style={{ margin: '0 0 10px 0' }}>
                  L'Application intègre des fonctionnalités communautaires (photos de progression corporelle, pseudonymes, défis d'amis). L'Utilisateur s'engage à ne publier aucun contenu à caractère pornographique, insultant, diffamatoire ou illicite.
                </p>
                <div style={{ backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #ef4444', color: '#fca5a5', fontWeight: 'bold' }}>
                  NutriZen applique une politique de TOLÉRANCE ZÉRO envers les contenus abusifs. Tout contenu signalé sera modéré et retiré sous 24 heures, et l'auteur banni de manière permanente.
                </div>
              </section>

              <section>
                <h3 style={{ color: '#a78bfa', fontSize: '1.15rem', marginBottom: '8px' }}>4. Exclusion de Garantie et Limitation de Responsabilité</h3>
                <p style={{ margin: 0 }}>
                  L'APPLICATION EST FOURNIE « EN L'ÉTAT ». NUTRIZEN DÉCLINE TOUTE RESPONSABILITÉ QUANT AUX DOMMAGES DIRECTS OU INDIRECTS, BLESSURES OU DÉFAILLANCES DE SANTÉ POUVANT RÉSULTER DE L'UTILISATION DES PROGRAMMES NUTRITIONNELS OU DE JEÛNE PROPOSÉS.
                </p>
              </section>

              <section>
                <h3 style={{ color: '#a78bfa', fontSize: '1.15rem', marginBottom: '8px' }}>5. Droit Applicable</h3>
                <p style={{ margin: 0 }}>
                  Le présent contrat est régi par le droit français. Tout litige relatif à son interprétation sera soumis aux tribunaux compétents.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* BOUTON RETOUR ET ACTIONS */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
          <Link to="/nutrizen" style={btnPrimaryStyle}>
            🥑 Découvrir l'Application NutriZen
          </Link>
          <Link to="/" style={btnOutlineStyle}>
            Accueil Parrel Studio
          </Link>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 🔒 3. PAGE SPÉCIFIQUE : CONFIDENTIALITÉ RGPD (/nutrizen/privacy)
// ==========================================
export function NutriZenPrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/nutrizen" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à NutriZen
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/nutrizen/legal" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px' }}>
              Tous les Textes Juridiques (Page 4)
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold' }}>NutriZen</span>
            <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>Conformité RGPD &amp; Données Santé (Art. 9)</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — NutriZen
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 25 octobre 2026 • Application : NutriZen • Éditeur : Équipe NutriZen
          </div>
        </div>

        {/* Détails du document */}
        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> NutriZen (Suivi métabolique, Jeûne &amp; Fitness IA)</div>
            <div><strong style={{ color: '#ffffff' }}>Contact Général :</strong> <a href="mailto:contact@nutrizen.app" style={{ color: '#34d399', textDecoration: 'none' }}>contact@nutrizen.app</a></div>
            <div><strong style={{ color: '#ffffff' }}>Contact DPO &amp; RGPD :</strong> <a href="mailto:privacy@nutrizen.app" style={{ color: '#34d399', textDecoration: 'none' }}>privacy@nutrizen.app</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL HTTPS officielle :</strong> <a href="https://parrel.vercel.app/nutrizen/privacy" style={{ color: '#34d399', textDecoration: 'none' }}>https://parrel.vercel.app/nutrizen/privacy</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            La protection de vos données personnelles et de santé est au cœur de nos engagements. La présente Politique décrit comment NutriZen traite vos données conformément au Règlement Général sur la Protection des Données (RGPD) et aux réglementations locales.
          </p>

          <div style={{ display: 'grid', gap: '26px' }}>
            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>1. Responsable de Traitement</h2>
              <p style={{ margin: 0 }}>L'Application NutriZen est éditée par l'équipe NutriZen (contact : contact@nutrizen.app).</p>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>2. Données collectées et Finalités</h2>
              <p style={{ marginBottom: '10px' }}>Nous collectons et traitons les données suivantes :</p>
              <ol style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '10px' }}>
                <li><strong>Données d'identité et de compte :</strong> E-mail, prénom, nom, pays, mot de passe chiffré (Authentification et gestion de profil).</li>
                <li style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#34d399' }}>Données morphologiques et de bien-être (Données Sensibles - Art. 9 RGPD) :</strong> Poids, taille, âge, masse grasse, historique de pesée, objectifs caloriques, consommations d'eau et sessions de jeûne. (Traitées uniquement avec votre consentement explicite recueilli à l'inscription).
                </li>
                <li><strong>Données de santé et d'activité (HealthKit / Google Connect) :</strong> Nombre de pas, calories actives dépensées. Ces données sont utilisées exclusivement pour synchroniser votre journal de bord. <strong style={{ color: '#22c55e' }}>ELLES NE SONT JAMAIS VENDUES NI UTILISÉES À DES FINS PUBLICITAIRES.</strong></li>
                <li><strong>Photos de repas et scan de codes-barres :</strong> Utilisées pour l'analyse visuelle des portions et la détection d'ingrédients.</li>
                <li><strong>Données techniques et d'identifiant :</strong> Jetons FCM pour les notifications, identifiant utilisateur anonymisé.</li>
              </ol>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>3. Sous-traitants et Transferts de Données</h2>
              <p style={{ marginBottom: '8px' }}>NutriZen s'appuie sur des partenaires techniques certifiés :</p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong>Google Firebase (Cloud Firestore, Auth, Functions) :</strong> Hébergement sécurisé des données.</li>
                <li><strong>RevenueCat :</strong> Gestion chiffrée des abonnements intégrés.</li>
                <li><strong>Fournisseurs d'IA (Qwen / Cloud Functions) :</strong> Les invites d'analyse de repas sont transmises de manière anonymisée sans aucune donnée nominative directe.</li>
                <li><strong>Open Food Facts &amp; USDA :</strong> Consultation de bases de données nutritionnelles publiques.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>4. Durée de Conservation</h2>
              <p style={{ margin: 0 }}>Les données sont conservées tant que votre compte reste actif. Si vous n'utilisez pas l'application pendant 24 mois consécutifs, vos données sont automatiquement purgées.</p>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>5. Vos Droits (Accès, Rectification, Suppression)</h2>
              <p style={{ margin: 0 }}>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données. Vous pouvez supprimer l'intégralité de votre compte et de vos données historiques directement depuis l'écran « Mon Profil » de l'Application ou en écrivant à : <a href="mailto:privacy@nutrizen.app" style={{ color: '#34d399', textDecoration: 'none' }}>privacy@nutrizen.app</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📜 4. PAGE SPÉCIFIQUE : CONDITIONS GÉNÉRALES & CGU (/nutrizen/terms)
// ==========================================
export function NutriZenTermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/nutrizen" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à NutriZen
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/nutrizen/legal" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px' }}>
              Tous les Textes Juridiques (Page 4)
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold' }}>NutriZen</span>
            <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>Avertissement Médical Majeur</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation (CGU) – NutriZen
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 25 octobre 2026 • Application : NutriZen • Éditeur : Équipe NutriZen
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> NutriZen</div>
            <div><strong style={{ color: '#ffffff' }}>Contact :</strong> <a href="mailto:contact@nutrizen.app" style={{ color: '#34d399', textDecoration: 'none' }}>contact@nutrizen.app</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL HTTPS officielle :</strong> <a href="https://parrel.vercel.app/nutrizen/terms" style={{ color: '#34d399', textDecoration: 'none' }}>https://parrel.vercel.app/nutrizen/terms</a></div>
          </div>

          <div style={{ display: 'grid', gap: '26px' }}>
            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>1. Objet et Présentation du Service</h2>
              <p style={{ margin: 0 }}>
                Les présentes Conditions Générales d’Utilisation (ci-après les « CGU ») régissent l’utilisation de l’application mobile « NutriZen » (ci-après l’« Application »). NutriZen est un outil d’accompagnement bien-être, de calcul nutritionnel, de planification de repas assistée par intelligence artificielle et de suivi d'activité physique.
              </p>
            </section>

            <section style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '18px' }}>
              <h2 style={{ color: '#f87171', fontSize: '1.25rem', marginTop: 0, marginBottom: '8px' }}>
                ⚠️ 2. Avertissement Médical et Santé (Disclaimer Majeur)
              </h2>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#fee2e2' }}>
                L'UTILISATEUR RECONNAÎT ET ACCEPTE EXPRESSÉMENT QUE NUTRIZEN N'EST PAS UN DISPOSITIF MÉDICAL ET NE DISPENSE AUCUN AVIS MÉDICAL, DIAGNOSTIC OU TRAITEMENT.
              </p>
              <p style={{ margin: 0, color: '#fecaca', fontSize: '14px' }}>
                Les estimations caloriques, les projections de poids, les programmes de jeûne intermittent et les analyses générées par l'Intelligence Artificielle sont fournis à titre exclusivement informatif et indicatif. Vous devez impérativement consulter un médecin ou un diététicien qualifié avant de commencer tout jeûne prolongé (&gt;16h), régime hypocalorique ou nouveau programme sportif. En cas de malaise, étourdissement ou problème de santé, rompez immédiatement le jeûne et consultez les services d'urgence.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>3. Accès, Inscription et Sécurité du Compte</h2>
              <p style={{ margin: 0 }}>
                L'accès à l'Application nécessite la création d'un compte. L'Utilisateur garantit que les informations transmises (âge, poids, taille, sexe) sont véridiques et à jour. L'utilisation de l'Application est réservée aux personnes âgées d'au moins 16 ans (ou disposant du consentement d'un représentant légal).
              </p>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>4. Abonnements et Achats Intégrés (NutriZen VIP / Premium)</h2>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong>Facturation :</strong> Les fonctionnalités Premium sont souscrites sous forme d'abonnements à renouvellement automatique via l'App Store (Apple) ou Google Play (Google).</li>
                <li><strong>Renouvellement automatique :</strong> Le paiement est débité à confirmation de l'achat. L'abonnement se renouvelle automatiquement sauf désactivation au moins 24 heures avant la fin de la période en cours dans les paramètres de votre compte Apple ou Google.</li>
                <li><strong>Restauration :</strong> L'Utilisateur peut à tout moment restaurer ses achats sur un nouvel appareil via le bouton dédié dans l'Application.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>5. Règles de Conduite et Fonctions Sociales (UGC)</h2>
              <p style={{ marginBottom: '8px' }}>L'Application propose des fonctions sociales (duels, partages, classements). Sont strictement interdits :</p>
              <ul style={{ margin: '0 0 10px 20px' }}>
                <li>Les propos diffamatoires, haineux, violents, pornographiques ou harcelants.</li>
                <li>La publication de photos à caractère dénudé ou inapproprié dans la galerie de progression.</li>
              </ul>
              <div style={{ color: '#f87171', fontWeight: 'bold', fontSize: '14px' }}>
                Tout manquement entraînera la suspension immédiate et irrévocable du compte utilisateur sans préavis ni remboursement.
              </div>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>6. Propriété Intellectuelle</h2>
              <p style={{ margin: 0 }}>
                Tous les contenus, logos, algorithmes, interfaces graphiques et marques intégrés dans NutriZen sont la propriété exclusive de l'éditeur de l'Application.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '10px' }}>7. Résiliation et Suppression de Compte</h2>
              <p style={{ margin: 0 }}>
                L'Utilisateur dispose de la faculté de supprimer son compte et toutes les données associées à tout moment directement depuis l'Application.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📑 5. PAGE SPÉCIFIQUE : CLUF / EULA (/nutrizen/eula)
// ==========================================
export function NutriZenEulaPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/nutrizen" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à NutriZen
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/nutrizen/legal" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px' }}>
              Tous les Textes Juridiques (Page 4)
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#8b5cf6', color: 'white', fontWeight: 'bold' }}>NutriZen</span>
            <span className="badge" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', border: '1px solid rgba(139, 92, 246, 0.3)' }}>CLUF / EULA • Tolérance Zéro UGC</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Contrat de Licence d'Utilisateur Final (CLUF / EULA) – NutriZen
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 25 octobre 2026 • Application : NutriZen • Éditeur : Équipe NutriZen
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '20px', border: '1px solid #334155', lineHeight: 1.75, color: '#e2e8f0' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> NutriZen</div>
            <div><strong style={{ color: '#ffffff' }}>Contact :</strong> <a href="mailto:contact@nutrizen.app" style={{ color: '#34d399', textDecoration: 'none' }}>contact@nutrizen.app</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL HTTPS officielle :</strong> <a href="https://parrel.vercel.app/nutrizen/eula" style={{ color: '#34d399', textDecoration: 'none' }}>https://parrel.vercel.app/nutrizen/eula</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            Le présent Contrat de Licence d'Utilisateur Final (« CLUF ») est conclu entre vous (« Utilisateur ») et NutriZen.
          </p>

          <div style={{ display: 'grid', gap: '26px' }}>
            <section>
              <h2 style={{ color: '#a78bfa', fontSize: '1.25rem', marginBottom: '10px' }}>1. Concession de Licence</h2>
              <p style={{ margin: 0 }}>
                NutriZen vous concède une licence révocable, non exclusive, non transférable et limitée d'installation et d'utilisation de l'Application sur vos appareils personnels, dans le strict respect des règles des plateformes d'Apple (App Store Terms of Service) et de Google (Google Play Terms of Service).
              </p>
            </section>

            <section>
              <h2 style={{ color: '#a78bfa', fontSize: '1.25rem', marginBottom: '10px' }}>2. Restriction d'Usage</h2>
              <p style={{ marginBottom: '8px' }}>Vous acceptez de ne pas :</p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Décompiler, désosser ou tenter d'extraire le code source de l'Application.</li>
                <li>Utiliser l'Application pour concevoir un service concurrent ou copier ses algorithmes d'IA.</li>
                <li>Utiliser les fonctionnalités sociales pour usurper une identité, harceler ou diffuser du contenu préjudiciable.</li>
              </ul>
            </section>

            <section style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '12px', padding: '18px' }}>
              <h2 style={{ color: '#c084fc', fontSize: '1.25rem', marginTop: 0, marginBottom: '8px' }}>
                3. Contenu Généré par l'Utilisateur (UGC) et Tolérance Zéro
              </h2>
              <p style={{ margin: '0 0 10px 0' }}>
                L'Application intègre des fonctionnalités communautaires (photos de progression corporelle, pseudonymes, défis d'amis). L'Utilisateur s'engage à ne publier aucun contenu à caractère pornographique, insultant, diffamatoire ou illicite.
              </p>
              <div style={{ backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #ef4444', color: '#fca5a5', fontWeight: 'bold' }}>
                NutriZen applique une politique de TOLÉRANCE ZÉRO envers les contenus abusifs. Tout contenu signalé sera modéré et retiré sous 24 heures, et l'auteur banni de manière permanente.
              </div>
            </section>

            <section>
              <h2 style={{ color: '#a78bfa', fontSize: '1.25rem', marginBottom: '10px' }}>4. Exclusion de Garantie et Limitation de Responsabilité</h2>
              <p style={{ margin: 0 }}>
                L'APPLICATION EST FOURNIE « EN L'ÉTAT ». NUTRIZEN DÉCLINE TOUTE RESPONSABILITÉ QUANT AUX DOMMAGES DIRECTS OU INDIRECTS, BLESSURES OU DÉFAILLANCES DE SANTÉ POUVANT RÉSULTER DE L'UTILISATION DES PROGRAMMES NUTRITIONNELS OU DE JEÛNE PROPOSÉS.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#a78bfa', fontSize: '1.25rem', marginBottom: '10px' }}>5. Droit Applicable</h2>
              <p style={{ margin: 0 }}>
                Le présent contrat est régi par le droit français. Tout litige relatif à son interprétation sera soumis aux tribunaux compétents.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
