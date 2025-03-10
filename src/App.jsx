import React, { useState } from 'react';
    import memoireImage from './assets/memoire.jpg';
    import notificationImage from './assets/notification.jpg';
    import personnaliteImage from './assets/personnalite.jpg';
    import rappelImage from './assets/rappel.jpg';
    import bobibotImage from './assets/bobibot.png';
    import dayrtaliaImage from './assets/dayrtalia.png';
    import background from './assets/background.jpg';

    function App() {
      const [bobiBotDetails, setBobiBotDetails] = useState(false);
      const [dayrtaliaDetails, setDayrtaliaDetails] = useState(false);

      return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
          <div id="root">
            <h1>Parrel - Solutions IA</h1>

            <p>
              Bienvenue chez Parrel, votre partenaire en solutions d'intelligence artificielle. Découvrez nos applications innovantes conçues pour améliorer votre quotidien.
            </p>

            <h2>Nos Applications</h2>

            <div className="feature" onClick={() => setBobiBotDetails(!bobiBotDetails)}>
              <img src={bobibotImage} alt="BobiBot" />
              <div>
                <h3>BobiBot - Votre Assistant IA Personnel</h3>
                <p>
                  BobiBot est un chatbot IA avancé, capable de comprendre le contexte, de se souvenir de vos conversations et de vous fournir des informations et des rappels pertinents.
                </p>
              </div>
            </div>

            {bobiBotDetails && (
              <div className="app-details">
                <h4>Fonctionnalités de BobiBot</h4>
                <ul>
                  <li>Mémoire contextuelle : BobiBot se souvient de vos conversations passées.</li>
                  <li>Notifications intelligentes : Recevez des rappels et des informations contextuelles.</li>
                  <li>Personnalité adaptable : Personnalisez l'IA selon vos préférences.</li>
                  <li>Gestion des rappels : Gérez vos rendez-vous et vos tâches.</li>
                </ul>
                <p>BobiBot est conçu pour vous aider à rester organisé et informé.</p>
              </div>
            )}

            <div className="feature" onClick={() => setDayrtaliaDetails(!dayrtaliaDetails)}>
              <img src={dayrtaliaImage} alt="Dayrtalia" />
              <div>
                <h3>Dayrtalia - Capturez et Partagez Vos Souvenirs</h3>
                <p>
                  Dayrtalia vous permet d'enregistrer vos souvenirs et vos journées, et de les partager facilement avec vos amis.
                </p>
              </div>
            </div>

            {dayrtaliaDetails && (
              <div className="app-details">
                <h4>Fonctionnalités de Dayrtalia</h4>
                <ul>
                  <li>Enregistrement de journées : Capturez vos moments importants.</li>
                  <li>Partage avec des amis : Partagez vos souvenirs avec vos proches.</li>
                  <li>Organisation des souvenirs : Organisez vos souvenirs pour les retrouver facilement.</li>
                </ul>
                <p>Dayrtalia vous aide à préserver et à partager vos souvenirs précieux.</p>
              </div>
            )}

            <h2>Pourquoi Choisir Parrel ?</h2>

            <p>
              Chez Parrel, nous nous engageons à créer des solutions IA innovantes et conviviales pour répondre à vos besoins.
            </p>

            <p>
              <a href="#" className="cta-button">En savoir plus</a>
            </p>
          </div>
        </div>
      );
    }

    export default App;
