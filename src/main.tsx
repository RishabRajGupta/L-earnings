import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// AWS Amplify
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

// Auth Provider (VERY IMPORTANT)
import { AuthProvider } from "./contexts/AuthContext";

// Initialize Amplify
Amplify.configure(awsconfig);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
