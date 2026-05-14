# Dinkins-Landscaping-

## Owner dashboard and editable website content

This site now includes a simple owner-only dashboard at `admin.html` that can:

- Sign the owner in with Firebase Authentication.
- Show quote requests submitted through the website contact form.
- Update quote status and owner notes.
- Edit safer, predefined website content areas such as hero wording, business contact info, services, featured work, photos, and optional custom sections.
- Upload new portfolio photos to Firebase Storage.

The public website still has safe default content in `site-content.js`, so the site remains readable even before Firebase is configured. After Firebase is configured, the public website loads editable content from the Firestore document `siteContent/home`, and quote requests are saved in the Firestore collection `quoteRequests`.

## One-time Firebase setup

1. In Firebase Console, enable **Authentication → Sign-in method → Email/Password**.
2. Add the owner as a Firebase Authentication user.
3. Enable **Cloud Firestore** for project `dinkins-7adf1`.
4. Enable **Cloud Storage for Firebase** for photo uploads.
5. Open `firebase-config.js` and replace the `REPLACE_WITH_*` values with the Firebase Web App config from **Project settings → Your apps → Web app**.
6. Update `ownerEmails` in `firebase-config.js` if the owner email should be different.
7. Publish Firestore and Storage security rules like the examples below.
8. Deploy the site and visit `admin.html` to sign in.

If sign-in succeeds but the dashboard does not load quote requests or editable content, the most likely causes are:

- The login email is not listed in `ownerEmails` in `firebase-config.js`.
- The Firestore/Storage rules below were not published, or their owner email list does not match `firebase-config.js`.
- **Authentication → Sign-in method → Email/Password** is not enabled.

The Firebase Web App API key is safe to include in this static site. The security boundary is Firebase Authentication plus Firestore/Storage rules, not hiding values in JavaScript.

## Firestore security rules example

Replace the emails in `ownerEmails` if different owner emails are used. Keep this list in sync with `firebase-config.js`.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner() {
      return request.auth != null &&
        request.auth.token.email in ['dinkinslandmgmt@gmail.com', 'qathom8991@gmail.com'];
    }

    match /siteContent/{document=**} {
      allow read: if true;
      allow write: if isOwner();
    }

    match /quoteRequests/{requestId} {
      allow create: if request.resource.data.keys().hasOnly([
          'name', 'email', 'phone', 'service', 'message',
          'status', 'ownerNotes', 'source', 'createdAt', 'updatedAt'
        ]) &&
        request.resource.data.name is string &&
        request.resource.data.name.size() <= 120 &&
        request.resource.data.email is string &&
        request.resource.data.email.size() <= 180 &&
        request.resource.data.phone is string &&
        request.resource.data.phone.size() <= 80 &&
        request.resource.data.service is string &&
        request.resource.data.service.size() <= 120 &&
        request.resource.data.message is string &&
        request.resource.data.message.size() <= 3000 &&
        request.resource.data.status == 'New' &&
        request.resource.data.ownerNotes == '' &&
        request.resource.data.source == 'website';
      allow read, update, delete: if isOwner();
    }
  }
}
```

## Storage security rules example

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isOwner() {
      return request.auth != null &&
        request.auth.token.email in ['dinkinslandmgmt@gmail.com', 'qathom8991@gmail.com'];
    }

    match /portfolio/{fileName} {
      allow read: if true;
      allow write, delete: if isOwner();
    }
  }
}
```


## Deploying to Firebase Hosting

This repository includes `firebase.json` and `.firebaserc` so Firebase deploys the website files from the repository root. Deploy from the same folder that contains `admin.html`, `index.html`, `firebase-config.js`, `site.js`, and `site-content.js`:

```bash
firebase deploy --only hosting
```

If deploy says it only found files in a `public` folder, you are either in the wrong folder or using an old local Firebase config. Copy the `firebase.json` and `.firebaserc` from this repository, then rerun the command above. The admin login page must deploy `firebase-config.js` and `site-content.js` beside `admin.html`; otherwise the login scripts cannot finish loading.

## Quote email flow

The contact form now first attempts to save the quote request to Firestore for the dashboard, then continues sending the existing Web3Forms email notification. If Firebase has not been configured yet, the form still sends through Web3Forms so the website does not lose its current email behavior.
