import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

// Initialize AWS Cognito
Amplify.configure(awsconfig);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
