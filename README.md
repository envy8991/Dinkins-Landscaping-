# Dinkins-Landscaping-

## Firebase-powered quote email flow

The contact form in `index.html` now writes requests to a Firestore `mail` collection in the format expected by Firebase's **Trigger Email** extension.

### One-time setup

1. In Firebase Console, enable **Cloud Firestore** for project `dinkins-7adf1`.
2. Install the extension: **Extensions → Trigger Email (firestore-send-email)**.
3. Configure the extension with your SMTP provider (Gmail, SendGrid, Mailgun, etc.).
4. In `index.html`, replace `your-email@example.com` with your real business email.
5. Deploy your site and test by submitting the quote form.

When a document is added to `mail`, the extension sends the email to your configured inbox.
