# Dinkins-Landscaping-

## Reliable Firebase-powered quote email flow

The contact form now writes quote requests to a Firestore `mail` collection, which is picked up by Firebase's **Trigger Email** extension (`firestore-send-email`).

## Setup (required)

1. In Firebase Console, enable **Cloud Firestore** for `dinkins-7adf1`.
2. Deploy Firestore rules from this repo:
   ```bash
   firebase deploy --only firestore:rules
   ```
3. Install extension: **Extensions → Trigger Email (firestore-send-email)**.
4. Configure SMTP in the extension (SendGrid/Mailgun/Gmail).
5. In `index.html`, replace:
   - `YOUR_API_KEY`
   - `YOUR_MESSAGING_SENDER_ID`
   - `YOUR_APP_ID`
   - `your-email@example.com`
6. Deploy hosting and submit a test quote.

Once configured, every form submit creates a Firestore document and the extension sends a real email from your SMTP provider.
