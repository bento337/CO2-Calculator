// This is the main controller of the app.
// It initializes UI behaviors

import { populateCityDatalist, setupEventListeners } from './ui.js';

function initializeApp() {
    populateCityDatalist();
    setupEventListeners();
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);


