// This file controls all DOM interactions.
// Responsibilities:
// - Provide an enhanced autocomplete for city inputs
// - Auto-fill distance field from routes data
// - Allow manual distance editing when checkbox is checked
// - Display result to the user in a formatted way
// - Manage dark mode toggle

import routes from './routes-data.js';
import calculateCO2 from './calculator.js';

const cities = Object.keys(routes);

function populateCityDatalist() {
    const datalist = document.getElementById('cities-datalist');
    if (!datalist) return;
    datalist.innerHTML = ''; // Clear existing options
    for (const city of cities) {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    }
}

function setupEventListeners() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const originSuggestions = document.getElementById('origin-suggestions');
    const destinationSuggestions = document.getElementById('destination-suggestions');
    const distanceInput = document.getElementById('distance');
    const manualDistanceCheckbox = document.getElementById('manual-distance');
    const form = document.getElementById('emission-form');
    const darkModeBtn = document.getElementById('dark-mode-toggle');

    // Initialize distance as readonly
    distanceInput.readOnly = true;

    // Autocomplete handlers
    attachAutocomplete(originInput, originSuggestions);
    attachAutocomplete(destinationInput, destinationSuggestions);

    // Clear buttons
    document.querySelectorAll('.clear-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const input = document.getElementById(target);
            if (input) {
                input.value = '';
                updateDistance();
                const suggestions = document.getElementById(target + '-suggestions');
                if (suggestions) suggestions.style.display = 'none';
            }
        });
    });

    // Manual distance checkbox: when checked, allow editing; when unchecked, lock and auto-fill
    manualDistanceCheckbox.addEventListener('change', function() {
        if (this.checked) {
            distanceInput.readOnly = false;
            distanceInput.removeAttribute('readonly');
            distanceInput.focus();
        } else {
            distanceInput.readOnly = true;
            distanceInput.setAttribute('readonly', 'true');
            updateDistance();
        }
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateAndDisplayEmission();
    });

    // Dark mode toggle
    if (darkModeBtn) darkModeBtn.addEventListener('click', toggleDarkMode);

    // Load dark mode preference
    loadDarkModePreference();
}

function attachAutocomplete(inputEl, listEl) {
    if (!inputEl || !listEl) return;

    inputEl.addEventListener('input', () => showSuggestions(inputEl, listEl));
    inputEl.addEventListener('focus', () => showSuggestions(inputEl, listEl));

    // Hide suggestions on blur with a slight delay to allow click
    inputEl.addEventListener('blur', () => setTimeout(() => { listEl.style.display = 'none'; }, 150));

    // Click on suggestion
    listEl.addEventListener('click', (ev) => {
        const li = ev.target.closest('.suggestion-item');
        if (li) {
            inputEl.value = li.textContent;
            listEl.style.display = 'none';
            updateDistance();
            inputEl.focus();
        }
    });
}

function showSuggestions(inputEl, listEl) {
    const val = inputEl.value.trim().toLowerCase();
    listEl.innerHTML = '';
    if (!val) { listEl.style.display = 'none'; return; }
    const matches = cities.filter(c => c.toLowerCase().includes(val)).slice(0, 8);
    for (const m of matches) {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.textContent = m;
        li.setAttribute('role', 'option');
        listEl.appendChild(li);
    }
    listEl.style.display = matches.length ? 'block' : 'none';
}

function updateDistance() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const distanceInput = document.getElementById('distance');
    const manualDistanceCheckbox = document.getElementById('manual-distance');

    if (manualDistanceCheckbox.checked) {
        return; // allow manual editing
    }

    if (origin && destination && routes[origin] && routes[origin][destination]) {
        distanceInput.value = routes[origin][destination];
    } else {
        distanceInput.value = '';
    }
}

function calculateAndDisplayEmission() {
    const originInput = document.getElementById('origin').value;
    const destinationInput = document.getElementById('destination').value;
    const distance = parseFloat(document.getElementById('distance').value);
    const transport = document.querySelector('input[name="transport"]:checked').value;
    const resultDiv = document.getElementById('result');

    // Validation
    if (!originInput || !destinationInput) {
        resultDiv.innerHTML = '<span style="color: var(--primary-color);">⚠️ Por favor, selecione origem e destino</span>';
        return;
    }

    if (!distance || isNaN(distance) || distance <= 0) {
        resultDiv.innerHTML = '<span style="color: var(--primary-color);">⚠️ Distância inválida</span>';
        return;
    }

    try {
        const emission = calculateCO2(distance, transport);
        const transportEmoji = getTransportEmoji(transport);
        resultDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="font-size: 24px;">${transportEmoji}</div>
                <div style="font-size: 14px; opacity: 0.8;">De ${originInput} para ${destinationInput}</div>
                <div>Emissão: <strong>${emission.toFixed(2)} kg CO2</strong></div>
                <div style="font-size: 12px; opacity: 0.7;">Distância: ${distance} km</div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<span style="color: var(--primary-color);">❌ Erro: ${error.message}</span>`;
    }
}

function getTransportEmoji(transport) {
    const emojis = {
        bicycle: '🚲',
        car: '🚗',
        bus: '🚌',
        truck: '🚚'
    };
    return emojis[transport] || '🚗';
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButton(isDarkMode);
}

function loadDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference === 'true') {
        document.body.classList.add('dark-mode');
        updateDarkModeButton(true);
    }
}

function updateDarkModeButton(isDarkMode) {
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
}

// Export functions for use in other modules
export {
    populateCityDatalist,
    setupEventListeners,
    updateDistance,
    calculateAndDisplayEmission
};
