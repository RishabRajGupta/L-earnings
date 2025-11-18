import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// AWS Amplify
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

// Auth Provider (must wrap App)
import { AuthProvider } from "./contexts/AuthContext";

// Initialize Amplify
Amplify.configure(awsconfig);

// Render App with AuthProvider
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
