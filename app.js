// ============================================
// LOCALSTORAGE BRIDGE (Pour garder la mémoire)
// ============================================
const StorageBridge = {
  PREFIX: "streamix-",
  get: function(key) {
    try { return JSON.parse(localStorage.getItem(this.PREFIX + key)); } 
    catch { return localStorage.getItem(this.PREFIX + key); }
  },
  set: function(key, value) {
    const stringValue = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(this.PREFIX + key, stringValue);
  }
};

// ============================================
// LOGIQUE PRINCIPALE
// ============================================

// URLs des services
const services = {
  franime: "https://franime.fr/",
  animesama: "https://anime-sama.pw/",
  voiranime: "https://v6.voiranime.com/"
};

// Éléments du DOM
const welcomeScreen = document.getElementById("welcome-screen");
const appContainer = document.getElementById("app-container");
const serviceFrame = document.getElementById("service-frame");
const loadingOverlay = document.getElementById("loading");

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  // Vérifier si un service était déjà ouvert lors de la dernière session
  const lastService = StorageBridge.get("last-service");
  if (lastService && services[lastService]) {
    selectService(lastService);
  }

  // Masquer le chargement quand l'iframe est prête
  serviceFrame.addEventListener("load", () => {
    loadingOverlay.classList.add("hidden");
  });
});

// Sélectionner un service
function selectService(serviceKey) {
  const url = services[serviceKey];
  if (!url) return;

  // Sauvegarder le choix
  StorageBridge.set("last-service", serviceKey);

  // Afficher l'interface
  welcomeScreen.classList.add("hidden");
  appContainer.classList.remove("hidden");
  loadingOverlay.classList.remove("hidden"); // Afficher chargement

  // Charger l'URL
  serviceFrame.src = url;
}

// Revenir à l'écran d'accueil
function showWelcome() {
  // Cacher l'app
  appContainer.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  
  // Reset Iframe
  serviceFrame.src = "about:blank";
  
  // Oublier le dernier service pour rester sur l'accueil au prochain lancement
  localStorage.removeItem("streamix-last-service");
}

// Exposer les fonctions au HTML
window.selectService = selectService;
window.showWelcome = showWelcome;
