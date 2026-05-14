# Dinkins-Landscaping-

Static website for Dinkins Land Management.

## What is included

- A public marketing website in `index.html`.
- Shared default content in `site-content.js`.
- Public rendering logic in `site.js`.
- A quote/contact form that sends requests by email through Web3Forms.
- Firebase Hosting config so the static site can still be deployed with Firebase Hosting.

The owner/admin dashboard, Firebase Authentication login, Firestore quote dashboard, editable content dashboard, and dashboard photo-upload tools have been removed. `admin.html` is only a static notice page now so old bookmarks do not break.

## Deploying to Firebase Hosting

Deploy from the repository root, the same folder that contains `index.html`, `site.js`, and `site-content.js`:

```bash
firebase deploy --only hosting
```

The `firebase.json` file deploys the repository root as the static hosting directory.

## Quote email flow

The contact form sends quote requests directly through Web3Forms. There is no admin dashboard or Firestore save step anymore.
