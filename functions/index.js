const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// VOTRE CLÉ SECRÈTE STRIPE
const stripe = require('stripe')('sk_test_51Sf3KIJmX9VkIHA6L11Lo7xx2g1FB8pUqBni2eBmhzLJctwvhlkKMbTWaGvYspNkD6vnE3tS3C4MjoAGl1F68kiY00yUNPNOQe');

// --- CONFIGURATION DES PRIX ---
// ID du prix "Compteur" (Commission variable)
const METER_PRICE_ID = 'price_1Sf3OjJmX9VkIHA6i6tCmgeT';

// ID du prix "Visibilité Or" (Abonnement fixe 5€/mois)
const GOLD_PRICE_ID = 'price_1SgZkvJmX9VkIHA6tTa42iTY';

// ════════════════════════════════════════════════════════════════════════════
// 🏪 FONCTION 1 : CRÉATION DU MAGASIN (Et de l'abonnement Stripe)
// ════════════════════════════════════════════════════════════════════════════
exports.createStripeShop = functions.https.onCall(async (dataOrRequest, context) => {
    console.log("🚀 [START] createStripeShop appelée !");

    const data = dataOrRequest.data || dataOrRequest;
    const paymentMethodId = data.paymentMethodId;
    const email = data.email;
    const name = data.name;
    const isVisibilityBoostEnabled = (data.is_visibility_boost_enabled === true || data.isVisibilityBoostEnabled === true);

    console.log(`📦 Données : Nom=${name}, Email=${email}, OptionOr=${isVisibilityBoostEnabled}`);

    if (!paymentMethodId) {
        throw new functions.https.HttpsError('invalid-argument', 'Moyen de paiement manquant.');
    }

    try {
        const customer = await stripe.customers.create({
            payment_method: paymentMethodId,
            email: email,
            name: name,
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        const itemsToSubscribe = [{ price: METER_PRICE_ID }];

        if (isVisibilityBoostEnabled && GOLD_PRICE_ID && GOLD_PRICE_ID.startsWith('price_')) {
            console.log("🌟 Option Visibilité Or activée : Ajout du prix fixe.");
            itemsToSubscribe.push({ price: GOLD_PRICE_ID });
        }

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: itemsToSubscribe,
        });

        console.log(`✅ Abonnement réussi : ${subscription.id}`);

        const meterItem = subscription.items.data.find(item => item.price.id === METER_PRICE_ID);
        const itemId = meterItem ? meterItem.id : subscription.items.data[0].id;

        return {
            customerId: customer.id,
            subscriptionId: subscription.id,
            subscriptionItemId: itemId
        };

    } catch (error) {
        console.error("❌ ERREUR CRITIQUE STRIPE :", error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});


// ════════════════════════════════════════════════════════════════════════════
// 💸 FONCTION 2 : DÉCLARATION DE COMMISSION (USAGE STRIPE)
// ════════════════════════════════════════════════════════════════════════════
exports.reportCommission = functions.https.onCall(async (dataOrRequest, context) => {
    console.log("🚀 [START] reportCommission appelée");

    const data = dataOrRequest.data || dataOrRequest;
    const subscriptionItemId = data.subscriptionItemId;
    const amountInCents = data.amountInCents;

    if (!subscriptionItemId || !amountInCents) {
        throw new functions.https.HttpsError('invalid-argument', 'Données manquantes (subscriptionItemId ou amountInCents).');
    }

    try {
        const usageRecord = await stripe.subscriptionItems.createUsageRecord(
            subscriptionItemId,
            {
                quantity: parseInt(amountInCents),
                timestamp: Math.floor(Date.now() / 1000), 
                action: 'increment'
            }
        );
        
        console.log(`✅ Usage ajouté (+${amountInCents} centimes) sur l'item ${subscriptionItemId}`);
        return { success: true, usageRecord };

    } catch (error) {
        console.error("❌ Erreur reportCommission :", error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});


// ════════════════════════════════════════════════════════════════════════════
// 🛡️ FONCTION 3 : SECURE OCR (DOCUMENT AI)
// ════════════════════════════════════════════════════════════════════════════
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

const PROJECT_ID = '1087731109113';
const PROCESSOR_ID = 'bf5524b33f20120c';
const LOCATION = 'eu';

exports.processReceiptOCR = functions.https.onCall(async (dataOrRequest, context) => {
    console.log("🛡️ [SECURE] processReceiptOCR appelée via Cloud Function");
    
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
    }

    const data = dataOrRequest.data || dataOrRequest;
    const imageBase64 = data.imageBase64;
    const mimeType = data.mimeType || 'image/jpeg';

    if (!imageBase64) {
        throw new functions.https.HttpsError('invalid-argument', 'Image base64 manquante');
    }

    try {
        console.log(`📸 Traitement de l'image OCR (${imageBase64.length} bytes)`);
        
        const client = new DocumentProcessorServiceClient({
            projectId: PROJECT_ID,
        });

        const name = client.processorPath(PROJECT_ID, LOCATION, PROCESSOR_ID);

        const request = {
            name: name,
            rawDocument: {
                content: Buffer.from(imageBase64, 'base64'),
                mimeType: mimeType,
            },
        };

        console.log(`🔐 Appel Document AI (Project: ${PROJECT_ID}, Processor: ${PROCESSOR_ID})`);
        const [result] = await client.processDocument(request);

        const document = result.document;
        const extractedText = document.text || '';

        console.log(`✅ OCR réussi: ${extractedText.length} caractères reconnus`);

        return {
            success: true,
            text: extractedText,
            confidence: document?.documentLayout?.blocks?.[0]?.confidence || 0.9,
        };

    } catch (error) {
        console.error("❌ Erreur Document AI:", error.message);
        throw new functions.https.HttpsError('internal', 'Erreur serveur OCR. Veuillez réessayer.');
    }
});