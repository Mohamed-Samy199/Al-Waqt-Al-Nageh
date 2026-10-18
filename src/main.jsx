import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./i18n/config.js";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from './lib/queryClient';
import AOS from 'aos';
import 'aos/dist/aos.css';

// AOS.init({ duration: 500, once: false, mirror: true });
AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: false, // التأثير يتكرر كل ما ترجع للسكشن
  offset: 120,
  disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
