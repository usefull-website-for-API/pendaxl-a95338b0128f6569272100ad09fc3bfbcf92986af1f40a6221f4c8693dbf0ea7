// ============================================
// LOCALSTORAGE BRIDGE (Conservé pour la stabilité)
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

// URL unique
const MOVIX_URL = "https://movix.blog/";

// Éléments du DOM
const serviceFrame = document.getElementById("service-frame");
const loadingOverlay = document.getElementById("loading");

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. On sauvegarde l'état dans le localStorage comme demandé
  // Cela permet de garder la logique active si tu ajoutes d'autres options plus tard
  StorageBridge.set("last-service", "movix");

  // 2. Lancer le chargement de l'URL
  serviceFrame.src = MOVIX_URL;

  // 3. Masquer le chargement quand l'iframe est prête
  serviceFrame.addEventListener("load", () => {
    // Petit délai pour assurer que le rendu visuel est fait
    setTimeout(() => {
        loadingOverlay.classList.add("hidden");
    }, 500);
  });

});
