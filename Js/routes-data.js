// This file contains a list of cities and distances between them.
// Routes between major Brazilian cities and countryside cities from Minas Gerais
// Example: routes["São Paulo"]["Rio de Janeiro"] = 430
// Includes cities from the MG countryside (interior)
const routes = {
    "São Paulo": {
        "Rio de Janeiro": 430,
        "Belo Horizonte": 586,
        "Curitiba": 408,
        "Salvador": 1600,
        "Ouro Preto": 640,
        "Mariana": 650,
        "Divinópolis": 680,
        "Montes Claros": 750
    },
    "Rio de Janeiro": {
        "São Paulo": 430,
        "Belo Horizonte": 434,
        "Curitiba": 710,
        "Salvador": 1300,
        "Ouro Preto": 505,
        "Mariana": 515,
        "Divinópolis": 620,
        "Montes Claros": 690
    },
    "Belo Horizonte": {
        "São Paulo": 586,
        "Rio de Janeiro": 434,
        "Curitiba": 850,
        "Salvador": 1500,
        "Ouro Preto": 96,
        "Mariana": 110,
        "Divinópolis": 150,
        "Montes Claros": 390
    },
    "Ouro Preto": {
        "Belo Horizonte": 96,
        "São Paulo": 640,
        "Rio de Janeiro": 505,
        "Mariana": 20,
        "Divinópolis": 220,
        "Montes Claros": 450
    },
    "Mariana": {
        "Ouro Preto": 20,
        "Belo Horizonte": 110,
        "São Paulo": 650,
        "Rio de Janeiro": 515,
        "Divinópolis": 240,
        "Montes Claros": 470
    },
    "Divinópolis": {
        "Belo Horizonte": 150,
        "São Paulo": 680,
        "Rio de Janeiro": 620,
        "Ouro Preto": 220,
        "Mariana": 240,
        "Montes Claros": 320
    },
    "Montes Claros": {
        "Belo Horizonte": 390,
        "São Paulo": 750,
        "Rio de Janeiro": 690,
        "Divinópolis": 320,
        "Ouro Preto": 450,
        "Mariana": 470
    },
    "Curitiba": {
        "São Paulo": 408,
        "Rio de Janeiro": 710,
        "Belo Horizonte": 850,
        "Salvador": 1800
    },
    "Salvador": {
        "São Paulo": 1600,      
        "Rio de Janeiro": 1300,
        "Belo Horizonte": 1500,
        "Curitiba": 1800
    },
    "Brasília": {
        "São Paulo": 1015,
        "Rio de Janeiro": 1160,
        "Belo Horizonte": 740,
        "Salvador": 1100
    },
    "Fortaleza": {
        "São Paulo": 2700,
        "Rio de Janeiro": 2900,
        "Belo Horizonte": 2500,
        "Salvador": 800
    },
    "Recife": {
        "São Paulo": 2600,
        "Rio de Janeiro": 2800,
        "Belo Horizonte": 2400,
        "Salvador": 900
    },
    "Porto Alegre": {
        "São Paulo": 1130,  
        "Rio de Janeiro": 1200,
        "Belo Horizonte": 1400,
        "Curitiba": 710
    }
};

// Export routes for use in other modules
export default routes;