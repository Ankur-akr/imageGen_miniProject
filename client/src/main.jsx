import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
axios.defaults.baseURL = API;

createRoot(document.getElementById("root")).render(<App />);
