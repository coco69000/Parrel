import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ==========================================
// 🎨 STYLES THÈME WORDBUILD (GEOPOLITICAL CYAN / GOLD / SLATE)
// ==========================================
const pageStyle = {
  backgroundColor: '#0a0f1d',
  color: 'white',
  minHeight: '100vh',
  paddingTop: '100px',
  paddingBottom: '60px',
  paddingLeft: '20px',
  paddingRight: '20px',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const cardStyle = {
  backgroundColor: '#131c31',
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid #1e293b'
};

const btnPrimaryStyle = {
  backgroundColor: '#0ea5e9',
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
  color: '#38bdf8',
  padding: '10px 20px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold',
  border: '1px solid #0ea5e9',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease'
};

// ==========================================
// 📄 CONTENUS BRUTS MARKDOWN (EXPORTS OFFICIELS)
// ==========================================
export const WORDBUILD_RAW_PRIVACY = `# POLITIQUE DE CONFIDENTIALITÉ — WordBuild (Projet WorldBuildr)
**Dernière mise à jour : 23 novembre 2026**

La présente Politique de Confidentialité décrit la manière dont Parrel Studio (ci-après « l’Éditeur », « nous ») collecte, utilise, stocke et protège vos données personnelles lorsque vous utilisez l’application mobile et web WordBuild (identifiant de paquet : com.worldbuildr.worldbuildr, projet WorldBuildr), ci-après « l’Application ».

### 1. Responsable du traitement
- **Éditeur :** Parrel Studio
- **Adresse :** France (Union Européenne)
- **Email de contact / DPO :** contact@worldbuildr.com / privacy@worldbuildr.com

### 2. Données que nous collectons
Dans le cadre de l’utilisation de l’Application, nous collectons uniquement les données nécessaires à son fonctionnement :

#### a) Données de compte et d’authentification
- Adresse e-mail (via Firebase Authentication).
- Identifiant utilisateur unique (UID).
- Historique de connexion de base (date de dernière connexion et série quotidienne dailyStreak). (Nous ne stockons jamais votre mot de passe en clair ; l’authentification est entièrement gérée par Google Firebase Authentication.)

#### b) Données de jeu et contenus générés par l’utilisateur (UGC)
- Données liées à votre progression et à votre monde virtuel stockées sur Cloud Firestore : pays créés, parcelles, bâtiments, communes, entreprises, citoyens, statistiques de jeu, prêts virtuels, guerres, lois/décrets et préférences d’interface dynamique.
- Textes saisis librement par vous : noms de pays ou de personnages, commandes envoyées à l’Intelligence Artificielle, lois, publications sur le réseau social fictif du jeu et messages envoyés à d’autres joueurs/citoyens.

#### c) Données traitées par l’Intelligence Artificielle
- Lorsque vous utilisez les fonctionnalités d’IA (commandes en langage naturel, prévisualisations, analyses ou événements), votre requête ainsi qu’un résumé de l’état actuel de votre partie sont transmis de manière sécurisée via Firebase Cloud Functions vers notre fournisseur d’IA générative.
- **Important :** Nous vous demandons de ne jamais saisir de données personnelles sensibles (nom réel, adresse, téléphone, coordonnées bancaires, données de santé, etc.) dans les champs de texte libre du jeu.

#### d) Données d’abonnements et d’achats intégrés (Android / iOS)
- Identifiant utilisateur anonyme/technique (appUserID) transmis à RevenueCat afin de synchroniser votre palier d’abonnement (Gratuit, Plus, Pro, Elite, Ultra) et vos quotas d’appels IA quotidiens.
- Statut d’abonnement, dates de validité et historique de droits d’accès (entitlements).
- Aucune donnée bancaire n’est collectée ni stockée par l’Éditeur : les paiements sont exclusivement traités par Apple (App Store) ou Google (Google Play).

#### e) Données techniques et de mesure d’audience
- Journaux techniques et diagnostics d’erreurs nécessaires à la stabilité et à la sécurité du service.
- Sur la version Web, des statistiques d’utilisation agrégées peuvent être mesurées via Firebase / Google Analytics (sous réserve de votre consentement lorsque la loi l’exige).

### 3. Finalités et bases légales (RGPD)
Nous traitons vos données pour les finalités suivantes :
1. Fourniture du service de jeu et sauvegarde de votre progression (Base légale : exécution du contrat / CGU).
2. Traitement de vos commandes par le moteur d’Intelligence Artificielle et gestion des quotas (Base légale : exécution du contrat).
3. Gestion des abonnements payants et restauration des achats (Base légale : exécution du contrat et obligations légales).
4. Sécurité, prévention des abus, de la triche et des attaques par injection de prompt (Base légale : intérêt légitime).
5. Amélioration de l’Application et support utilisateur (Base légale : intérêt légitime ou consentement selon les cas).

### 4. Partage des données et sous-traitants
Nous ne vendons jamais vos données personnelles. Vos données sont uniquement partagées avec les prestataires techniques indispensables au fonctionnement de l’Application :
- **Google Firebase (Google LLC / Google Ireland Ltd.) :** authentification, base de données Cloud Firestore, hébergement des Cloud Functions, mesure d’audience.
- **RevenueCat, Inc. :** gestion technique des abonnements intégrés sur iOS et Android.
- **Apple Inc. (App Store) et Google LLC (Google Play) :** traitement des paiements d’abonnements.
- **Fournisseur de modèle d’IA générative (Google Vertex AI / Gemini & fournisseurs LLM partenaires) :** génération des réponses de simulation à partir des requêtes de gameplay.

Certains de ces prestataires étant situés hors de l’Union européenne (notamment aux États-Unis), les transferts sont encadrés par les garanties appropriées prévues par le RGPD (Clauses Contractuelles Types de la Commission européenne et/ou EU-U.S. Data Privacy Framework).

### 5. Durée de conservation
- **Données de compte et de partie :** conservées tant que votre compte est actif, puis supprimées ou anonymisées dans un délai maximal de 30 jours suivant votre demande de suppression de compte (ou après 3 ans d’inactivité prolongée, après notification).
- **Messages et contenus multijoueurs :** conservés tant que nécessaire au fonctionnement de la simulation et à la modération, puis supprimés ou anonymisés à la suppression du compte.
- **Données de facturation / justificatifs d’abonnement :** conservés conformément aux obligations légales comptables et fiscales applicables.

### 6. Sécurité des données
Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement des communications en transit (HTTPS/TLS), isolation des clés API IA côté serveur (Cloud Functions), contrôle d’accès aux bases de données Firestore et transactions atomiques.

### 7. Vos droits (RGPD) et suppression de compte
Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
- Droit d’accès à vos données personnelles ;
- Droit de rectification des données inexactes ;
- Droit à l’effacement (« droit à l’oubli ») et suppression complète de votre compte ;
- Droit à la limitation et à l’opposition au traitement ;
- Droit à la portabilité de vos données.

Pour exercer vos droits ou demander la suppression de votre compte et de l’ensemble des données associées, contactez-nous à : contact@worldbuildr.com ou privacy@worldbuildr.com.
Vous disposez également du droit d’introduire une réclamation auprès de l’autorité de contrôle compétente (en France, la CNIL — www.cnil.fr).

### 8. Protection des mineurs
L’Application n’est pas destinée aux enfants de moins de 13 ans (ou de moins de 15 ans sans autorisation parentale en France, conformément à la loi). Si nous apprenons qu’un enfant n’ayant pas l’âge requis nous a fourni des données personnelles sans autorisation parentale, nous supprimerons ces données dans les plus brefs délais.

### 9. Modifications de la politique
Nous pouvons mettre à jour la présente Politique de Confidentialité pour refléter des évolutions légales ou techniques. En cas de modification majeure, vous en serez informé via l’Application ou par e-mail.`;

export const WORDBUILD_RAW_CGU = `# CONDITIONS GÉNÉRALES D’UTILISATION (CGU) ET CONTRAT DE LICENCE UTILISATEUR FINAL (EULA) — WordBuild
**Dernière mise à jour : 23 novembre 2026**

Les présentes Conditions Générales d’Utilisation et Contrat de Licence Utilisateur Final (ci-après les « Conditions ») régissent l’accès et l’utilisation de l’application WordBuild (projet WorldBuildr, identifiant : com.worldbuildr.worldbuildr, ci-après « l’Application »), éditée par Parrel Studio (ci-après « l’Éditeur »).

En téléchargeant, créant un compte ou utilisant l’Application, vous acceptez sans réserve les présentes Conditions.

### 1. Description du service
WordBuild est un jeu de simulation géopolitique, économique, urbaine et de vie en ligne, dans un univers fictif persistant et partagé. Les joueurs peuvent y incarner un Président et/ou un Citoyen, interagir avec d’autres joueurs et utiliser une Intelligence Artificielle générative capable de simuler des événements, d’interpréter des commandes en langage naturel et d’adapter dynamiquement l’interface du jeu.

Toutes les situations représentées dans le jeu (économie, impôts, guerres, diplomatie, criminalité virtuelle, justice, relations familiales, marché de personnages) sont strictement fictives et ludiques.

### 2. Création de compte et conditions d’accès
- L’accès au jeu nécessite la création d’un compte via une adresse e-mail valide et un mot de passe.
- Vous êtes seul responsable de la confidentialité de vos identifiants et de toute activité réalisée depuis votre compte.
- Vous devez avoir au moins 13 ans (ou l’âge légal requis dans votre pays de résidence ; si vous êtes mineur, vous déclarez disposer de l’accord de votre représentant légal, notamment pour tout abonnement payant).

### 3. Licence d’utilisation (EULA) et Propriété intellectuelle
- L’Éditeur vous accorde une licence personnelle, limitée, non exclusive, non transférable et révocable pour installer et utiliser l’Application sur vos appareils à des fins strictement personnelles et non commerciales.
- L’ensemble des éléments de l’Application (code source, graphismes, cartes, algorithmes, textes, marques, interface, prompts système) reste la propriété exclusive de l’Éditeur.
- Il est interdit de copier, modifier, décompiler, pratiquer de l’ingénierie inverse, revendre, ou extraire tout ou partie de l’Application sans autorisation écrite préalable.

### 4. Fonctionnement de l’Intelligence Artificielle et limites
- L’Application repose sur une Intelligence Artificielle générative tierce pour traiter vos commandes et faire évoluer la simulation.
- **Nature probabiliste :** les réponses de l’IA sont générées automatiquement. L’Éditeur ne garantit pas qu’elles seront toujours exemptes d’erreurs, d’incohérences narratives ou d’imprévus de gameplay.
- **Aucun conseil réel :** les analyses économiques, fiscales, juridiques, médicales ou financières produites dans le jeu n’ont aucune valeur dans le monde réel et ne constituent jamais un conseil professionnel.
- **Interdiction d’abus :** toute tentative de manipulation du moteur IA (prompt injection, contournement des règles de simulation, génération de ressources illimitées par fraude, automatisation/bots ou contournement des quotas d’appels IA) est strictement interdite et peut entraîner la suspension immédiate du compte.

### 5. Contenus générés par les utilisateurs et règles de conduite
Dans le cadre des interactions multijoueurs (noms de pays, de communes, d’entreprises ou de citoyens, lois/décrets, messages privés entre citoyens, publications sociales), vous vous engagez à respecter les règles suivantes. Il est strictement interdit de publier ou de soumettre à l’IA des contenus :
- Illégaux, diffamatoires, injurieux, haineux, discriminatoires, racistes, harcelants ou incitant à la violence réelle ;
- À caractère pornographique, pédopornographique ou portant atteinte à la dignité humaine ;
- Usurpant l’identité d’un tiers ou contenant des données personnelles réelles d’autrui (doxxing) ;
- Visant à perturber le fonctionnement des serveurs ou à exploiter des failles techniques.

Vous restez responsable des contenus que vous publiez. Vous accordez à l’Éditeur une licence mondiale, gratuite et non exclusive d’hébergement, d’affichage et de traitement technique de vos contenus de jeu aux seules fins du fonctionnement de l’Application. L’Éditeur se réserve le droit de supprimer tout contenu non conforme sans préavis.

### 6. Biens virtuels et monde partagé
- Les monnaies virtuelles, terrains, bâtiments, entreprises, véhicules, réserves d’or ou citoyens virtuels présents dans l’Application n’ont aucune valeur monétaire réelle et ne peuvent être échangés contre de l’argent réel ni vendus en dehors de l’Application.
- L’Éditeur se réserve le droit de modifier, rééquilibrer, suspendre ou réinitialiser tout ou partie des mécaniques ou données du monde virtuel pour des raisons techniques, d’équilibrage ou de maintenance.

### 7. Abonnements, Quotas IA et Achats intégrés
#### a) Paliers et quotas
L’Application propose un accès Gratuit (limité à 5 requêtes IA manuelles et 2 appels automatiques par jour) ainsi que des abonnements mensuels payants augmentant ces quotas quotidiens :
- **Plus :** 10 requêtes / jour et 4 appels auto / jour ;
- **Pro :** 15 requêtes / jour et 6 appels auto / jour ;
- **Elite :** 20 requêtes / jour et 10 appels auto / jour ;
- **Ultra :** 30 requêtes / jour et 15 appels auto / jour.
(Les quotas et tarifs affichés dans l’Application et les stores font foi au moment de la souscription.)

#### b) Facturation et renouvellement automatique
- Les achats intégrés sont disponibles uniquement sur les applications mobiles iOS (App Store) et Android (Google Play) ; ils ne sont pas disponibles sur la version Web.
- Le paiement est débité sur votre compte Apple ID ou Google Play lors de la confirmation d’achat.
- **Renouvellement automatique :** les abonnements se renouvellent automatiquement à chaque période mensuelle, sauf résiliation au moins 24 heures avant la fin de la période en cours dans les paramètres de votre compte App Store ou Google Play.
- Vous pouvez restaurer vos achats actifs à tout moment via le bouton « Restaurer les achats » dans l’Application.

#### c) Remboursements et droit de rétractation
Les paiements étant traités par Apple ou Google, toute demande d’annulation ou de remboursement est régie par les conditions générales de l’App Store ou de Google Play. En souscrivant à un abonnement numérique immédiatement utilisable, vous reconnaissez que l’exécution commence immédiatement.

### 8. Disponibilité et Limitation de responsabilité
- L’Application est fournie « en l’état » et « selon disponibilité ». L’Éditeur ne garantit pas un accès ininterrompu, notamment en cas de maintenance, de panne réseau ou d’indisponibilité des services tiers (Firebase, fournisseur IA, stores).
- Dans les limites autorisées par la loi applicable, l’Éditeur ne saurait être tenu responsable des dommages indirects, pertes de données de jeu ou pertes de progression résultant de l’utilisation ou de l’impossibilité d’utiliser l’Application.

### 9. Suspension et Résiliation
- **Par l’utilisateur :** vous pouvez cesser d’utiliser l’Application et demander la suppression de votre compte à tout moment en contactant contact@worldbuildr.com. (Attention : la suppression du compte dans l’Application ne résilie pas automatiquement votre abonnement Apple/Google ; vous devez l’annuler depuis les réglages de votre store.)
- **Par l’Éditeur :** en cas de violation grave ou répétée des présentes Conditions (triche, abus d’IA, contenus illicites), l’Éditeur peut suspendre ou supprimer votre compte sans indemnité.

### 10. Clauses spécifiques aux boutiques d’applications (Apple App Store & Google Play)
- Les présentes Conditions sont conclues uniquement entre vous et l’Éditeur, et non avec Apple Inc. ou Google LLC. L’Éditeur est seul responsable de l’Application et de son contenu.
- Apple et Google n’ont aucune obligation de maintenance ou d’assistance concernant l’Application.
- Dans le cadre d’un téléchargement via l’App Store, la licence est limitée à une utilisation sur les appareils de marque Apple que vous possédez ou contrôlez, conformément aux Règles d’Utilisation de l’App Store. Apple et ses filiales sont tiers bénéficiaires des présentes Conditions et peuvent les faire appliquer à votre encontre.

### 11. Modification des Conditions et Droit applicable
- L’Éditeur peut modifier les présentes Conditions à tout moment. Les utilisateurs seront informés des changements importants ; la poursuite de l’utilisation après entrée en vigueur vaut acceptation.
- Les présentes Conditions sont régies par le droit français, sans préjudice des dispositions impératives protectrices des consommateurs de votre pays de résidence.
- Pour toute question ou réclamation : contact@worldbuildr.com.`;

// ==========================================
// 🌍 1. SHOWCASE WORDBUILD (PAGE D'ACCUEIL /wordbuild)
// ==========================================
export function WordBuildPage() {
  const [storeNotice, setStoreNotice] = useState('');
  const [activeRole, setActiveRole] = useState('president');
  const [activeTab, setActiveTab] = useState(0);

  const handleStoreClick = (storeName) => {
    setStoreNotice(`WordBuild sera prochainement disponible en téléchargement direct sur ${storeName}. Préparez-vous à bâtir votre nation !`);
    setTimeout(() => setStoreNotice(''), 5000);
  };

  const rolesData = {
    president: {
      badge: '🏛️ Mode Président',
      title: 'Gestion de Nation & Géopolitique Globale',
      color: '#0ea5e9',
      borderColor: '#38bdf8',
      bgGrad: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(19, 28, 49, 0.95) 100%)',
      summary: 'Dirigez un État souverain sur un globe 3D interactif, pilotez la macroéconomie, promulguez vos propres lois en langage naturel et étendez votre influence jusqu’aux étoiles.',
      sections: [
        {
          icon: '🌐',
          name: 'Territoire, Frontières & Cadastre',
          desc: 'Fondez et agrandissez votre pays directement sur un globe 3D, tracez ses frontières et découpez votre territoire en parcelles cadastrales et en communes autonomes.'
        },
        {
          icon: '🏦',
          name: 'Économie & Finances Publiques',
          desc: 'Gérez la trésorerie nationale, la TVA, les impôts, la dette publique, les réserves d’or, le taux directeur, l’inflation, le secteur bancaire et les prêts inter-États.'
        },
        {
          icon: '⚖️',
          name: 'Politique, Ministères & Société',
          desc: 'Promulguez des lois et décrets sur mesure, nommez des ministres (même sur des domaines totalement inventés), ajustez les budgets (santé, éducation, sécurité, routes, écologie), définissez les aides sociales, gérez l’immigration et organisez des référendums.'
        },
        {
          icon: '🚀',
          name: 'Diplomatie, Guerre & Conquête Spatiale',
          desc: 'Signez des alliances ou accords commerciaux, imposez des sanctions, produisez un arsenal militaire, menez des guerres avec zones contestées sur la carte et lancez un programme spatial pour coloniser de nouvelles planètes.'
        }
      ]
    },
    citizen: {
      badge: '🧑 Mode Citoyen',
      title: 'Simulation de Vie Complète & Destin Personnel',
      color: '#10b981',
      borderColor: '#34d399',
      bgGrad: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(19, 28, 49, 0.95) 100%)',
      summary: 'Incarnez un habitant au cœur de la nation : gérez vos besoins biologiques, bâtissez un empire immobilier, fondez une dynastie familiale ou tentez de renverser le pouvoir.',
      sections: [
        {
          icon: '🎓',
          name: 'Création de Personnage & Origines',
          desc: 'Répartissez vos statistiques (intelligence, force, charisme, éducation, enfance) qui déterminent votre diplôme de départ… ainsi que votre dette étudiante initiale.'
        },
        {
          icon: '🥗',
          name: 'Besoins Biologiques & Quotidien',
          desc: 'Gérez la faim (avec un véritable inventaire de frigo dont les aliments périment), la santé physique, la santé mentale (spirit), le bonheur, le stress, la fatigue et les trajets domicile-travail.'
        },
        {
          icon: '🏗️',
          name: 'Carrière, Immobilier & Entrepreneuriat',
          desc: 'Étudiez, postulez à des emplois (ou cumulez-en plusieurs), achetez des terrains, construisez des maisons ou commerces, fondez votre propre entreprise et recrutez des employés.'
        },
        {
          icon: '💍',
          name: 'Vie Sociale, Famille & Lignées',
          desc: 'Messagerie directe entre citoyens, rencontres, mariage, divorce, grossesse, éducation des enfants, rédaction de testament/héritage et transmission sur plusieurs générations.'
        },
        {
          icon: '🕵️',
          name: 'Ascension Politique ou Criminalité',
          desc: 'Votez lors d’élections ou de révoltes, devenez Maire d’une commune (ou même Président !), achetez et modifiez des véhicules, ou basculez dans l’illégalité (vol, cambriolage) au risque d’être arrêté par la police et envoyé en prison.'
        }
      ]
    }
  };

  const featureTabs = [
    {
      title: '🧠 Moteur IA & Langage Naturel',
      color: '#0ea5e9',
      subtitle: 'Un monde vivant piloté par l’Intelligence Artificielle générative',
      items: [
        { label: 'Liberté Totale en Langage Naturel', desc: 'Une barre de saisie universelle permet de demander presque n’importe quoi : construire un bâtiment original, inventer un véhicule, créer un ministère inédit, négocier un traité ou lancer un événement. L’IA vérifie la cohérence avec le budget, les lois et le niveau technologique du pays, puis applique les effets réels dans le jeu.' },
        { label: 'Effet Papillon & Monde Vivant', desc: 'Simulation autonome des saisons (hiver énergivore et épidémies de grippe, sécheresses estivales), de la pollution, de l’usure des routes et véhicules, des factions politiques (pétitions puis sabotage si ignorées), d’un réseau social fictif où les citoyens s’expriment et du quotidien « Le Journal du Monde ».' },
        { label: 'Interface Dynamique (Server-Driven UI)', desc: 'L’IA a la capacité unique de modifier elle-même l’interface de l’application en ajoutant à la volée des boutons, curseurs, formulaires, barres de progression ou cartes d’information sur mesure dans vos menus.' },
        { label: 'Prévisualisation Tactique par Appui Long', desc: 'Maintenez un appui long sur les boutons d’action pour que l’IA simule à l’avance le coût estimé, la durée de réalisation et les risques géopolitiques ou sociaux avant confirmation.' }
      ]
    },
    {
      title: '🖥️ Les 3 Écrans Principaux',
      color: '#a855f7',
      subtitle: 'Du globe planétaire 3D jusqu’aux pièces de chaque bâtiment',
      items: [
        { label: '1. Vue Planète (Globe 3D Interactif)', desc: 'Globe 3D fluide (rotation, zoom, système multi-planètes) avec continents et biomes générés procéduralement (océans, forêts, déserts, montagnes, lacs, rivières, marécages) affichant tous les pays, leurs frontières souveraines et les zones de guerre actives.' },
        { label: '2. Vue Parcelle / Commune (Cadastre 2D)', desc: 'Carte détaillée de votre territoire pour tracer le cadastre, acheter ou vendre des terrains, placer des bâtiments (chacun disposant de ses propres pièces intérieures et actions récurrentes) et fonder des communes.' },
        { label: '3. Tableau de Bord & Centre de Contrôle', desc: 'Pilotage centralisé en temps réel : finances nationales et personnelles, jauges vitales, quêtes quotidiennes, séries de connexion (dailyStreak), banques, armée, presse mondiale et classements internationaux.' }
      ]
    },
    {
      title: '💎 Quotas IA & Abonnements',
      color: '#f59e0b',
      subtitle: '5 paliers adaptés à votre rythme de simulation (via RevenueCat)',
      items: [
        { label: 'Palier Gratuit (Accès Découverte)', desc: '5 requêtes IA manuelles / jour + 2 appels automatiques / jour pour découvrir le monde partagé et gérer votre citoyen ou votre jeune nation.' },
        { label: 'Paliers Plus & Pro', desc: 'Plus : 10 requêtes manuelles / jour et 4 appels auto / jour. Pro : 15 requêtes manuelles / jour et 6 appels auto / jour pour une gouvernance active.' },
        { label: 'Paliers Elite & Ultra', desc: 'Elite : 20 requêtes / jour et 10 appels auto / jour. Ultra : 30 requêtes IA manuelles / jour et 15 appels automatiques / jour pour une maîtrise géopolitique et économique totale.' }
      ]
    }
  ];

  const activeRoleObj = rolesData[activeRole];

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Fil d'Ariane */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            ← Accueil Parrel
          </Link>
          <span style={{ color: '#475569' }}>/</span>
          <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>WordBuild</span>
          <span style={{ color: '#64748b', fontSize: '12px' }}>(Projet WorldBuildr • Simulation Géopolitique &amp; Vie IA)</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.4)', padding: '6px 14px', borderRadius: '999px', marginBottom: '18px' }}>
            <span style={{ fontSize: '18px' }}>🌍</span>
            <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              WordBuild • Simulation Géopolitique, Économique, Urbaine &amp; Vie IA
            </span>
          </div>

          <h1 style={{ color: 'white', marginTop: 0, marginBottom: '16px', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.2, fontWeight: 800 }}>
            WordBuild : Gouvernez une Nation ou Vivez la Vie d’un Citoyen dans un Monde Piloté par l’IA
          </h1>

          <p style={{ color: '#38bdf8', fontSize: '1.25rem', fontWeight: '600', marginBottom: '18px', maxWidth: '900px' }}>
            Un monde bac à sable persistant et multijoueur où vous interagissez librement en langage naturel tout en alternant entre la gestion d’un État entier sur globe 3D et le quotidien d’un simple habitant.
          </p>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '940px', marginBottom: '28px' }}>
            Écrivez librement ce que vous souhaitez accomplir : fonder une république sur un globe 3D procédural, tracer votre cadastre, voter des lois, diriger la banque centrale, coloniser de nouvelles planètes — ou gérer votre frigo, bâtir votre entreprise, fonder une famille et vous présenter aux élections municipales. Le moteur d’Intelligence Artificielle vérifie la cohérence avec les lois et le budget, génère des événements à effet papillon et adapte dynamiquement l’interface du jeu (Server-Driven UI).
          </p>

          {/* BADGES ATOUTS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '26px' }}>
            <span style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', border: '1px solid rgba(14, 165, 233, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🏛️ Rôle Président &amp; Rôle Citoyen
            </span>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              💬 Actions Libres en Langage Naturel
            </span>
            <span style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🎛️ Interface Dynamique Server-Driven UI
            </span>
            <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🌐 Globe 3D Multi-Planètes &amp; Cadastre 2D
            </span>
            <span style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold' }}>
              🦋 Effet Papillon, Saisons &amp; Presse IA
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
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
            <div style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.4)', borderRadius: '10px', padding: '12px 18px', color: '#bae6fd', fontSize: '14px', maxWidth: '640px', marginBottom: '20px' }}>
              ✨ {storeNotice}
            </div>
          )}
        </div>

        {/* SECTION INTERACTIVE : LES DEUX RÔLES JOUABLES */}
        <div style={{ ...cardStyle, marginBottom: '40px', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '6px', fontSize: '1.65rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎭</span> Les Deux Rôles Jouables Complémentaires
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '20px' }}>
            Basculez à tout moment entre la vision macroscopique d’un chef d’État et l’immersion quotidienne d’un citoyen :
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={() => setActiveRole('president')}
              style={{
                padding: '12px 22px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                border: `2px solid ${activeRole === 'president' ? '#38bdf8' : '#334155'}`,
                backgroundColor: activeRole === 'president' ? '#0ea5e9' : '#0a0f1d',
                color: activeRole === 'president' ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s ease'
              }}
            >
              🏛️ Mode Président (Gestion de Nation &amp; Géopolitique)
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('citizen')}
              style={{
                padding: '12px 22px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                border: `2px solid ${activeRole === 'citizen' ? '#34d399' : '#334155'}`,
                backgroundColor: activeRole === 'citizen' ? '#10b981' : '#0a0f1d',
                color: activeRole === 'citizen' ? '#0a0f1d' : '#94a3b8',
                transition: 'all 0.2s ease'
              }}
            >
              🧑 Mode Citoyen (Simulation de Vie Complète)
            </button>
          </div>

          <div style={{
            background: activeRoleObj.bgGrad,
            border: `1px solid ${activeRoleObj.borderColor}`,
            borderRadius: '18px',
            padding: '26px'
          }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(0,0,0,0.4)', color: activeRoleObj.borderColor, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
              {activeRoleObj.badge}
            </div>
            <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '8px', fontSize: '1.4rem' }}>
              {activeRoleObj.title}
            </h3>
            <p style={{ color: '#cbd5e1', marginTop: 0, marginBottom: '22px', lineHeight: 1.6 }}>
              {activeRoleObj.summary}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {activeRoleObj.sections.map((sec, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(10, 15, 29, 0.75)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '26px', marginBottom: '8px' }}>{sec.icon}</div>
                  <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '15px', marginBottom: '6px' }}>{sec.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6 }}>{sec.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION DES PILIERS & MOTEUR IA */}
        <div style={{ ...cardStyle, marginBottom: '40px', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <h2 style={{ color: '#ffffff', marginTop: 0, marginBottom: '6px', fontSize: '1.65rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚡</span> Ce qui rend WordBuild unique
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '24px' }}>
            Explorez le moteur d’Intelligence Artificielle, les 3 écrans principaux et le système de quotas :
          </p>

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
                  backgroundColor: activeTab === idx ? tab.color : '#0a0f1d',
                  color: activeTab === idx ? '#0a0f1d' : '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: '#0a0f1d', borderRadius: '14px', padding: '24px', border: `1px solid ${featureTabs[activeTab].color}40` }}>
            <div style={{ color: featureTabs[activeTab].color, fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '4px' }}>
              {featureTabs[activeTab].title}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>
              {featureTabs[activeTab].subtitle}
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {featureTabs[activeTab].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#131c31', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
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

        {/* SECTION ARCHITECTURE TECHNIQUE & MODÈLE ÉCONOMIQUE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>🛠️</span>
              <h3 style={{ color: '#38bdf8', margin: 0, fontSize: '1.25rem' }}>Architecture Multiplateforme &amp; Cloud</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>Flutter (Android, iOS &amp; Web) :</strong> Rendu 3D du globe planétaire, carte cadastrale 2D interactive et Server-Driven UI dynamique.</li>
              <li><strong>Firebase Authentication &amp; Cloud Firestore :</strong> Synchronisation temps réel du monde persistant, des nations, communes et citoyens.</li>
              <li><strong>Firebase Cloud Functions :</strong> Proxy serveur hautement sécurisé isolant les clés API vers le moteur d’IA générative et garantissant des transactions atomiques.</li>
              <li><strong>Protection Anti-Injection :</strong> Validation serveur des commandes en langage naturel contre la triche et le contournement des règles.</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>👑</span>
              <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.25rem' }}>5 Paliers d’Abonnements IA (RevenueCat)</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>Gratuit :</strong> 5 requêtes IA manuelles / jour &amp; 2 appels automatiques / jour.</li>
              <li><strong>Plus :</strong> 10 requêtes IA manuelles / jour &amp; 4 appels automatiques / jour.</li>
              <li><strong>Pro :</strong> 15 requêtes IA manuelles / jour &amp; 6 appels automatiques / jour.</li>
              <li><strong>Elite :</strong> 20 requêtes IA manuelles / jour &amp; 10 appels automatiques / jour.</li>
              <li><strong>Ultra :</strong> 30 requêtes IA manuelles / jour &amp; 15 appels automatiques / jour.</li>
            </ul>
          </div>
        </div>

        {/* SECTION DOCUMENTS LÉGAUX ET CONFIDENTIALITÉ */}
        <div style={{
          backgroundColor: '#0a0f1d',
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
              🛡️ Documents Juridiques, RGPD, CGU &amp; Contrat EULA
            </h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '600px' }}>
              Consultez notre Politique de Confidentialité et nos Conditions Générales d’Utilisation (EULA) adaptées au moteur IA, au multijoueur et aux abonnements RevenueCat sur l’App Store et Google Play.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/wordbuild/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#0ea5e9', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/wordbuild/terms" style={{ ...btnOutlineStyle, borderColor: '#0ea5e9', color: '#38bdf8' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>

        {/* PIED DE PAGE APPLICATION */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', color: '#94a3b8', fontSize: '13px' }}>
          <div>
            Application <strong style={{ color: 'white' }}>WordBuild</strong> (Projet WorldBuildr • <code style={{ color: '#38bdf8' }}>com.worldbuildr.worldbuildr</code>) • Éditée par Parrel Studio
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="mailto:contact@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@worldbuildr.com</a>
            <span>•</span>
            <a href="mailto:privacy@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>privacy@worldbuildr.com</a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 🔒 2. PAGE : POLITIQUE DE CONFIDENTIALITÉ — WORDBUILD (/wordbuild/privacy)
// ==========================================
export function WordBuildPrivacyPolicyPage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/wordbuild" style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à WordBuild
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#0ea5e9', color: '#ffffff', fontWeight: 'bold' }}>WordBuild</span>
            <span className="badge" style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', border: '1px solid rgba(14, 165, 233, 0.3)' }}>Conformité RGPD, IA Générative &amp; Stores</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Politique de Confidentialité — WordBuild
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 23 novembre 2026 • Paquet : com.worldbuildr.worldbuildr (Projet WorldBuildr) • Éditeur : Parrel Studio
          </div>
        </div>

        <div style={{ backgroundColor: '#131c31', padding: '32px', borderRadius: '20px', border: '1px solid #1e293b', lineHeight: 1.75, color: '#e2e8f0' }}>
          <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> WordBuild (identifiant de paquet : <code style={{ color: '#38bdf8' }}>com.worldbuildr.worldbuildr</code>, projet WorldBuildr)</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>Contact Général &amp; DPO :</strong> <a href="mailto:contact@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@worldbuildr.com</a> / <a href="mailto:privacy@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>privacy@worldbuildr.com</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL HTTPS officielle :</strong> <a href="https://parrel.vercel.app/wordbuild/privacy" style={{ color: '#38bdf8', textDecoration: 'none' }}>https://parrel.vercel.app/wordbuild/privacy</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
            La présente Politique de Confidentialité décrit la manière dont <strong>Parrel Studio</strong> (ci-après « l’Éditeur », « nous ») collecte, utilise, stocke et protège vos données personnelles lorsque vous utilisez l’application mobile et web <strong>WordBuild</strong> (identifiant de paquet : <code>com.worldbuildr.worldbuildr</code>, projet WorldBuildr), ci-après « l’Application ».
          </p>

          <div style={{ display: 'grid', gap: '26px' }}>
            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>1. Responsable du traitement</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                <li><strong>Éditeur :</strong> Parrel Studio</li>
                <li><strong>Adresse :</strong> France (Union Européenne)</li>
                <li><strong>Email de contact / DPO :</strong> <a href="mailto:contact@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@worldbuildr.com</a> (ou <a href="mailto:privacy@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>privacy@worldbuildr.com</a>)</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>2. Données que nous collectons</h2>
              <p style={{ marginBottom: '12px' }}>Dans le cadre de l’utilisation de l’Application, nous collectons uniquement les données nécessaires à son fonctionnement :</p>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>a) Données de compte et d’authentification</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                    <li>Adresse e-mail (via Firebase Authentication).</li>
                    <li>Identifiant utilisateur unique (UID).</li>
                    <li>Historique de connexion de base (date de dernière connexion et série quotidienne <code>dailyStreak</code>). <em>(Nous ne stockons jamais votre mot de passe en clair ; l’authentification est entièrement gérée par Google Firebase Authentication.)</em></li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>b) Données de jeu et contenus générés par l’utilisateur (UGC)</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                    <li>Données liées à votre progression et à votre monde virtuel stockées sur Cloud Firestore : pays créés, parcelles, bâtiments, communes, entreprises, citoyens, statistiques de jeu, prêts virtuels, guerres, lois/décrets et préférences d’interface dynamique.</li>
                    <li>Textes saisis librement par vous : noms de pays ou de personnages, commandes envoyées à l’Intelligence Artificielle, lois, publications sur le réseau social fictif du jeu et messages envoyés à d’autres joueurs/citoyens.</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: 'rgba(14, 165, 233, 0.08)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>c) Données traitées par l’Intelligence Artificielle</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                    <li>Lorsque vous utilisez les fonctionnalités d’IA (commandes en langage naturel, prévisualisations, analyses ou événements), votre requête ainsi qu’un résumé de l’état actuel de votre partie sont transmis de manière sécurisée via Firebase Cloud Functions vers notre fournisseur d’IA générative.</li>
                    <li><strong style={{ color: '#fbbf24' }}>Important :</strong> Nous vous demandons de ne jamais saisir de données personnelles sensibles (nom réel, adresse, téléphone, coordonnées bancaires, données de santé, etc.) dans les champs de texte libre du jeu.</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>d) Données d’abonnements et d’achats intégrés (Android / iOS)</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                    <li>Identifiant utilisateur anonyme/technique (<code>appUserID</code>) transmis à RevenueCat afin de synchroniser votre palier d’abonnement (Gratuit, Plus, Pro, Elite, Ultra) et vos quotas d’appels IA quotidiens.</li>
                    <li>Statut d’abonnement, dates de validité et historique de droits d’accès (<em>entitlements</em>).</li>
                    <li><strong>Aucune donnée bancaire n’est collectée ni stockée par l’Éditeur :</strong> les paiements sont exclusivement traités par Apple (App Store) ou Google (Google Play).</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>e) Données techniques et de mesure d’audience</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                    <li>Journaux techniques et diagnostics d’erreurs nécessaires à la stabilité et à la sécurité du service.</li>
                    <li>Sur la version Web, des statistiques d’utilisation agrégées peuvent être mesurées via Firebase / Google Analytics (sous réserve de votre consentement lorsque la loi l’exige).</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>3. Finalités et bases légales (RGPD)</h2>
              <p style={{ marginBottom: '8px' }}>Nous traitons vos données pour les finalités suivantes :</p>
              <ol style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li><strong>Fourniture du service de jeu et sauvegarde de votre progression</strong> (Base légale : exécution du contrat / CGU).</li>
                <li><strong>Traitement de vos commandes par le moteur d’Intelligence Artificielle et gestion des quotas</strong> (Base légale : exécution du contrat).</li>
                <li><strong>Gestion des abonnements payants et restauration des achats</strong> (Base légale : exécution du contrat et obligations légales).</li>
                <li><strong>Sécurité, prévention des abus, de la triche et des attaques par injection de prompt</strong> (Base légale : intérêt légitime).</li>
                <li><strong>Amélioration de l’Application et support utilisateur</strong> (Base légale : intérêt légitime ou consentement selon les cas).</li>
              </ol>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>4. Partage des données et sous-traitants</h2>
              <p style={{ marginBottom: '8px' }}>
                <strong>Nous ne vendons jamais vos données personnelles.</strong> Vos données sont uniquement partagées avec les prestataires techniques indispensables au fonctionnement de l’Application :
              </p>
              <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li><strong>Google Firebase (Google LLC / Google Ireland Ltd.) :</strong> authentification, base de données Cloud Firestore, hébergement des Cloud Functions, mesure d’audience.</li>
                <li><strong>RevenueCat, Inc. :</strong> gestion technique des abonnements intégrés sur iOS et Android.</li>
                <li><strong>Apple Inc. (App Store) et Google LLC (Google Play) :</strong> traitement des paiements d’abonnements.</li>
                <li><strong>Fournisseur de modèle d’IA générative (Google Vertex AI / Gemini &amp; fournisseurs LLM partenaires) :</strong> génération des réponses de simulation à partir des requêtes de gameplay.</li>
              </ul>
              <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.95rem' }}>
                Certains de ces prestataires étant situés hors de l’Union européenne (notamment aux États-Unis), les transferts sont encadrés par les garanties appropriées prévues par le RGPD (Clauses Contractuelles Types de la Commission européenne et/ou EU-U.S. Data Privacy Framework).
              </p>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>5. Durée de conservation</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li><strong>Données de compte et de partie :</strong> conservées tant que votre compte est actif, puis supprimées ou anonymisées dans un délai maximal de 30 jours suivant votre demande de suppression de compte (ou après 3 ans d’inactivité prolongée, après notification).</li>
                <li><strong>Messages et contenus multijoueurs :</strong> conservés tant que nécessaire au fonctionnement de la simulation et à la modération, puis supprimés ou anonymisés à la suppression du compte.</li>
                <li><strong>Données de facturation / justificatifs d’abonnement :</strong> conservés conformément aux obligations légales comptables et fiscales applicables.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>6. Sécurité des données</h2>
              <p style={{ margin: 0 }}>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement des communications en transit (HTTPS/TLS), isolation des clés API IA côté serveur (Cloud Functions), contrôle d’accès aux bases de données Firestore et transactions atomiques.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>7. Vos droits (RGPD) et suppression de compte</h2>
              <p style={{ marginBottom: '8px' }}>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
              <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                <li>Droit d’accès à vos données personnelles ;</li>
                <li>Droit de rectification des données inexactes ;</li>
                <li>Droit à l’effacement (« droit à l’oubli ») et suppression complète de votre compte ;</li>
                <li>Droit à la limitation et à l’opposition au traitement ;</li>
                <li>Droit à la portabilité de vos données.</li>
              </ul>
              <p style={{ margin: '0 0 8px 0' }}>
                Pour exercer vos droits ou demander la suppression de votre compte et de l’ensemble des données associées, contactez-nous à : <a href="mailto:contact@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@worldbuildr.com</a> ou <a href="mailto:privacy@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>privacy@worldbuildr.com</a> (ou via l’option de suppression de compte intégrée à l’Application).
              </p>
              <p style={{ margin: 0 }}>
                Vous disposez également du droit d’introduire une réclamation auprès de l’autorité de contrôle compétente (en France, la CNIL — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8' }}>www.cnil.fr</a>).
              </p>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>8. Protection des mineurs</h2>
              <p style={{ margin: 0 }}>
                L’Application n’est pas destinée aux enfants de moins de 13 ans (ou de moins de 15 ans sans autorisation parentale en France, conformément à la loi). Si nous apprenons qu’un enfant n’ayant pas l’âge requis nous a fourni des données personnelles sans autorisation parentale, nous supprimerons ces données dans les plus brefs délais.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>9. Modifications de la politique</h2>
              <p style={{ margin: 0 }}>
                Nous pouvons mettre à jour la présente Politique de Confidentialité pour refléter des évolutions légales ou techniques. En cas de modification majeure, vous en serez informé via l’Application ou par e-mail.
              </p>
            </section>
          </div>

          {/* BOUTONS NAVIGATION BAS DE PAGE */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px', borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
            <Link to="/wordbuild/privacy" style={{ ...btnPrimaryStyle, backgroundColor: '#0ea5e9', color: '#ffffff' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/wordbuild/terms" style={{ ...btnOutlineStyle, borderColor: '#0ea5e9', color: '#38bdf8' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📜 3. PAGE : CONDITIONS GÉNÉRALES (CGU / EULA) — WORDBUILD (/wordbuild/terms)
// ==========================================
export function WordBuildTermsOfServicePage() {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <Link to="/wordbuild" style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              ← Retour à WordBuild
            </Link>
            <span style={{ color: '#475569' }}>•</span>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
              Accueil Parrel
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span className="badge" style={{ backgroundColor: '#0ea5e9', color: '#ffffff', fontWeight: 'bold' }}>WordBuild</span>
            <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' }}>CGU &amp; Contrat EULA</span>
          </div>

          <h1 style={{ color: 'white', marginTop: '10px', marginBottom: '8px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.25 }}>
            Conditions Générales d’Utilisation (CGU) et Contrat de Licence Utilisateur Final (EULA) — WordBuild
          </h1>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
            Dernière mise à jour : 23 novembre 2026 • Paquet : com.worldbuildr.worldbuildr (Projet WorldBuildr) • Éditeur : Parrel Studio
          </div>
        </div>

        <div style={{ backgroundColor: '#131c31', padding: '32px', borderRadius: '20px', border: '1px solid #1e293b', lineHeight: 1.75, color: '#e2e8f0' }}>
          <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '24px', fontSize: '14px', display: 'grid', gap: '6px' }}>
            <div><strong style={{ color: '#ffffff' }}>Application :</strong> WordBuild (Projet WorldBuildr • <code style={{ color: '#38bdf8' }}>com.worldbuildr.worldbuildr</code>)</div>
            <div><strong style={{ color: '#ffffff' }}>Éditeur :</strong> Parrel Studio</div>
            <div><strong style={{ color: '#ffffff' }}>Contact :</strong> <a href="mailto:contact@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@worldbuildr.com</a></div>
            <div><strong style={{ color: '#ffffff' }}>URL HTTPS officielle :</strong> <a href="https://parrel.vercel.app/wordbuild/terms" style={{ color: '#38bdf8', textDecoration: 'none' }}>https://parrel.vercel.app/wordbuild/terms</a></div>
            <div><strong style={{ color: '#ffffff' }}>EULA Standard Apple :</strong> <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Apple Licensed Application End User License Agreement</a></div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '28px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
            Les présentes Conditions Générales d’Utilisation et Contrat de Licence Utilisateur Final (ci-après les « Conditions ») régissent l’accès et l’utilisation de l’application <strong>WordBuild</strong> (projet WorldBuildr, ci-après « l’Application »), éditée par <strong>Parrel Studio</strong> (ci-après « l’Éditeur »). En téléchargeant, créant un compte ou utilisant l’Application, vous acceptez sans réserve les présentes Conditions.
          </p>

          <div style={{ display: 'grid', gap: '26px' }}>
            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>1. Description du service</h2>
              <p style={{ margin: '0 0 10px 0' }}>
                WordBuild est un jeu de simulation géopolitique, économique, urbaine et de vie en ligne, dans un univers fictif persistant et partagé. Les joueurs peuvent y incarner un Président et/ou un Citoyen, interagir avec d’autres joueurs et utiliser une Intelligence Artificielle générative capable de simuler des événements, d’interpréter des commandes en langage naturel et d’adapter dynamiquement l’interface du jeu.
              </p>
              <p style={{ margin: 0, color: '#bae6fd' }}>
                Toutes les situations représentées dans le jeu (économie, impôts, guerres, diplomatie, criminalité virtuelle, justice, relations familiales, marché de personnages) sont strictement fictives et ludiques.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>2. Création de compte et conditions d’accès</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>L’accès au jeu nécessite la création d’un compte via une adresse e-mail valide et un mot de passe.</li>
                <li>Vous êtes seul responsable de la confidentialité de vos identifiants et de toute activité réalisée depuis votre compte.</li>
                <li>Vous devez avoir au moins 13 ans (ou l’âge légal requis dans votre pays de résidence ; si vous êtes mineur, vous déclarez disposer de l’accord de votre représentant légal, notamment pour tout abonnement payant).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>3. Licence d’utilisation (EULA) et Propriété intellectuelle</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>L’Éditeur vous accorde une licence personnelle, limitée, non exclusive, non transférable et révocable pour installer et utiliser l’Application sur vos appareils à des fins strictement personnelles et non commerciales.</li>
                <li>L’ensemble des éléments de l’Application (code source, graphismes, cartes, algorithmes, textes, marques, interface, prompts système) reste la propriété exclusive de l’Éditeur.</li>
                <li>Il est interdit de copier, modifier, décompiler, pratiquer de l’ingénierie inverse, revendre, ou extraire tout ou partie de l’Application sans autorisation écrite préalable.</li>
              </ul>
            </section>

            <section style={{ backgroundColor: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(14, 165, 233, 0.3)', borderRadius: '12px', padding: '18px' }}>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginTop: 0, marginBottom: '10px' }}>4. Fonctionnement de l’Intelligence Artificielle et limites</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>L’Application repose sur une Intelligence Artificielle générative tierce pour traiter vos commandes et faire évoluer la simulation.</li>
                <li><strong>Nature probabiliste :</strong> les réponses de l’IA sont générées automatiquement. L’Éditeur ne garantit pas qu’elles seront toujours exemptes d’erreurs, d’incohérences narratives ou d’imprévus de gameplay.</li>
                <li><strong>Aucun conseil réel :</strong> les analyses économiques, fiscales, juridiques, médicales ou financières produites dans le jeu n’ont aucune valeur dans le monde réel et ne constituent jamais un conseil professionnel.</li>
                <li><strong style={{ color: '#fca5a5' }}>Interdiction d’abus :</strong> toute tentative de manipulation du moteur IA (prompt injection, contournement des règles de simulation, génération de ressources illimitées par fraude, automatisation/bots ou contournement des quotas d’appels IA) est strictement interdite et peut entraîner la suspension immédiate du compte.</li>
              </ul>
            </section>

            <section style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '18px' }}>
              <h2 style={{ color: '#f87171', fontSize: '1.25rem', marginTop: 0, marginBottom: '10px' }}>5. Contenus générés par les utilisateurs et règles de conduite</h2>
              <p style={{ margin: '0 0 10px 0' }}>
                Dans le cadre des interactions multijoueurs (noms de pays, de communes, d’entreprises ou de citoyens, lois/décrets, messages privés entre citoyens, publications sociales), vous vous engagez à respecter les règles suivantes. Il est strictement interdit de publier ou de soumettre à l’IA des contenus :
              </p>
              <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                <li>Illégaux, diffamatoires, injurieux, haineux, discriminatoires, racistes, harcelants ou incitant à la violence réelle ;</li>
                <li>À caractère pornographique, pédopornographique ou portant atteinte à la dignité humaine ;</li>
                <li>Usurpant l’identité d’un tiers ou contenant des données personnelles réelles d’autrui (doxxing) ;</li>
                <li>Visant à perturber le fonctionnement des serveurs ou à exploiter des failles techniques.</li>
              </ul>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                Vous restez responsable des contenus que vous publiez. Vous accordez à l’Éditeur une licence mondiale, gratuite et non exclusive d’hébergement, d’affichage et de traitement technique de vos contenus de jeu aux seules fins du fonctionnement de l’Application. L’Éditeur se réserve le droit de supprimer tout contenu non conforme sans préavis.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>6. Biens virtuels et monde partagé</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>Les monnaies virtuelles, terrains, bâtiments, entreprises, véhicules, réserves d’or ou citoyens virtuels présents dans l’Application n’ont aucune valeur monétaire réelle et ne peuvent être échangés contre de l’argent réel ni vendus en dehors de l’Application.</li>
                <li>L’Éditeur se réserve le droit de modifier, rééquilibrer, suspendre ou réinitialiser tout ou partie des mécaniques ou données du monde virtuel pour des raisons techniques, d’équilibrage ou de maintenance.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '12px' }}>7. Abonnements, Quotas IA et Achats intégrés</h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <h3 style={{ color: '#fbbf24', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>a) Paliers et quotas</h3>
                  <p style={{ margin: '0 0 8px 0' }}>
                    L’Application propose un accès <strong>Gratuit</strong> (limité à 5 requêtes IA manuelles et 2 appels automatiques par jour) ainsi que des abonnements mensuels payants augmentant ces quotas quotidiens :
                  </p>
                  <ul style={{ margin: '0 0 8px 0', paddingLeft: '20px', display: 'grid', gap: '4px' }}>
                    <li><strong>Plus :</strong> 10 requêtes / jour et 4 appels auto / jour ;</li>
                    <li><strong>Pro :</strong> 15 requêtes / jour et 6 appels auto / jour ;</li>
                    <li><strong>Elite :</strong> 20 requêtes / jour et 10 appels auto / jour ;</li>
                    <li><strong>Ultra :</strong> 30 requêtes / jour et 15 appels auto / jour.</li>
                  </ul>
                  <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                    (Les quotas et tarifs affichés dans l’Application et les stores font foi au moment de la souscription.)
                  </p>
                </div>

                <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>b) Facturation et renouvellement automatique</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px' }}>
                    <li>Les achats intégrés sont disponibles uniquement sur les applications mobiles iOS (App Store) et Android (Google Play) ; ils ne sont pas disponibles sur la version Web.</li>
                    <li>Le paiement est débité sur votre compte Apple ID ou Google Play lors de la confirmation d’achat.</li>
                    <li><strong>Renouvellement automatique :</strong> les abonnements se renouvellent automatiquement à chaque période mensuelle, sauf résiliation au moins 24 heures avant la fin de la période en cours dans les paramètres de votre compte App Store ou Google Play.</li>
                    <li>Vous pouvez restaurer vos achats actifs à tout moment via le bouton « Restaurer les achats » dans l’Application.</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#0a0f1d', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.05rem', marginTop: 0, marginBottom: '8px' }}>c) Remboursements et droit de rétractation</h3>
                  <p style={{ margin: 0 }}>
                    Les paiements étant traités par Apple ou Google, toute demande d’annulation ou de remboursement est régie par les conditions générales de l’App Store ou de Google Play. En souscrivant à un abonnement numérique immédiatement utilisable, vous reconnaissez que l’exécution commence immédiatement.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>8. Disponibilité et Limitation de responsabilité</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>L’Application est fournie « en l’état » et « selon disponibilité ». L’Éditeur ne garantit pas un accès ininterrompu, notamment en cas de maintenance, de panne réseau ou d’indisponibilité des services tiers (Firebase, fournisseur IA, stores).</li>
                <li>Dans les limites autorisées par la loi applicable, l’Éditeur ne saurait être tenu responsable des dommages indirects, pertes de données de jeu ou pertes de progression résultant de l’utilisation ou de l’impossibilité d’utiliser l’Application.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>9. Suspension et Résiliation</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li><strong>Par l’utilisateur :</strong> vous pouvez cesser d’utiliser l’Application et demander la suppression de votre compte à tout moment en contactant <a href="mailto:contact@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@worldbuildr.com</a>. <em>(Attention : la suppression du compte dans l’Application ne résilie pas automatiquement votre abonnement Apple/Google ; vous devez l’annuler depuis les réglages de votre store.)</em></li>
                <li><strong>Par l’Éditeur :</strong> en cas de violation grave ou répétée des présentes Conditions (triche, abus d’IA, contenus illicites), l’Éditeur peut suspendre ou supprimer votre compte sans indemnité.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>10. Clauses spécifiques aux boutiques d’applications (Apple App Store &amp; Google Play)</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>Les présentes Conditions sont conclues uniquement entre vous et l’Éditeur, et non avec Apple Inc. ou Google LLC. L’Éditeur est seul responsable de l’Application et de son contenu.</li>
                <li>Apple et Google n’ont aucune obligation de maintenance ou d’assistance concernant l’Application.</li>
                <li>Dans le cadre d’un téléchargement via l’App Store, la licence est limitée à une utilisation sur les appareils de marque Apple que vous possédez ou contrôlez, conformément aux Règles d’Utilisation de l’App Store. Apple et ses filiales sont tiers bénéficiaires des présentes Conditions et peuvent les faire appliquer à votre encontre.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', marginBottom: '10px' }}>11. Modification des Conditions et Droit applicable</h2>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                <li>L’Éditeur peut modifier les présentes Conditions à tout moment. Les utilisateurs seront informés des changements importants ; la poursuite de l’utilisation après entrée en vigueur vaut acceptation.</li>
                <li>Les présentes Conditions sont régies par le droit français, sans préjudice des dispositions impératives protectrices des consommateurs de votre pays de résidence.</li>
                <li>Pour toute question ou réclamation : <a href="mailto:contact@worldbuildr.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contact@worldbuildr.com</a>.</li>
              </ul>
            </section>
          </div>

          {/* BOUTONS NAVIGATION BAS DE PAGE */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px', borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
            <Link to="/wordbuild/privacy" style={{ ...btnOutlineStyle, borderColor: '#0ea5e9', color: '#38bdf8' }}>
              Politique de Confidentialité
            </Link>
            <Link to="/wordbuild/terms" style={{ ...btnPrimaryStyle, backgroundColor: '#0ea5e9', color: '#ffffff' }}>
              Conditions Générales (CGU / EULA)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exports pour compatibilité complète des routes
export const WordBuildEulaPage = WordBuildTermsOfServicePage;
export const WordBuildLegalDocsPage = WordBuildTermsOfServicePage;
