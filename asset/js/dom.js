import { getBgColor } from './utils.js';

// Get references to HTML elements
export const mainContainer = document.getElementById('container');
export const cityInput = document.getElementById('cityInput');
export const searchButton = document.getElementById('searchButton');
export const errorMessage = document.getElementById('error');
export const loader = document.getElementById('loader');
export const resultContainer = document.getElementById('resultContainer');
export const summaryText = document.getElementById('summary-text')
export const resultText = document.getElementById('result-text')
export const cardsContainer = document.getElementById('cards');
export const iconWeb = document.getElementById('icon')

export function createCategoryCard(category) {
    // Extract data from the API response
    const roundedScore = category.score_out_of_10.toFixed(1);

    // Create the Card Div + styling
    const card = document.createElement('div');
    card.className = 'category-card';

    const circle = document.createElement('div');
    circle.className = 'category-circle';
    circle.style.backgroundColor = getBgColor(roundedScore);
    circle.innerHTML = `<p class="category-score">${roundedScore}</p>`;

    const categoryName = document.createElement('h3');
    categoryName.className = 'category-name';
    categoryName.textContent = category.name;

    card.appendChild(circle);
    card.appendChild(categoryName);

    return card;
}