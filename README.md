# Agenda+

This is a Next.js and Genkit project created in Firebase Studio.

## Getting Started

To get started with local development, run the following commands:

```bash
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deploying to Firebase

To make your application available for others to use, you need to deploy it to Firebase App Hosting.

Follow these steps:

1.  **Install the Firebase CLI:** If you don't have it already, install the Firebase command-line tool globally.
    ```bash
    npm install -g firebase-tools
    ```

2.  **Log in to Firebase:**
    ```bash
    firebase login
    ```

3.  **Deploy your app:** From your project's root directory, run the deploy command.
    ```bash
    firebase apphosting:backends:deploy
    ```

After the deployment is complete, the Firebase CLI will provide you with a public URL where your application is live. Anyone with this URL will be able to access and use your Agenda+ app.
