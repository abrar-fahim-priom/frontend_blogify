import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { AuthorProvider } from "./Providers/AuthorProvider.jsx";
import BlogProvider from "./Providers/BlogProvider.jsx";
import ProfileProvider from "./Providers/ProfileProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthorProvider>
      <AuthProvider>
        <BlogProvider>
          <ProfileProvider>
            <Router>
              <App />
            </Router>
          </ProfileProvider>
        </BlogProvider>
      </AuthProvider>
    </AuthorProvider>
  </React.StrictMode>
);
