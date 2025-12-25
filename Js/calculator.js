// This file handles all CO2 emission calculations.
// It must import EMISSION_FACTORS from config.js
// Export a function calculateCO2(distance, transport)
// that returns total CO2 in kg.
import { EMISSION_FACTORS } from './config.js';

function calculateCO2(distance, transport) {
    const factor = EMISSION_FACTORS[transport];
    if (factor === undefined) {
        throw new Error(`Unknown transport mode: ${transport}`);
    }
    return distance * factor;
}

export default calculateCO2;
