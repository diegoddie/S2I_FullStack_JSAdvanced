import { mainContainer, cityInput, searchButton, errorMessage, iconWeb, loader, resultContainer, summaryText, resultText, cardsContainer, createCategoryCard } from './dom.js';
import { fetchCityData } from './api.js';
import { formatCityName, getTextColor } from './utils.js';
import '../css/style.css'
import icon from '../img/favicon-32x32.png'

iconWeb.href = icon

// Add a click event listener to the search button
searchButton.addEventListener('click', searchCity);

// Main function to handle city search
async function searchCity() {
    // Format the city name
    const formattedCityName = formatCityName(cityInput.value);
    // Show the loader
    loader.style.display = 'block';

    try {
        // Make the API call
        const cityData = await fetchCityData(formattedCityName);
        const { categories, teleportCityScore, summary } = cityData;

        // Hide the loader and any error messages
        loader.style.display = 'none';
        errorMessage.style.display = 'none';

        // Show the main content
        mainContainer.style.height = '100%';
        resultContainer.style.display = 'flex';
        cardsContainer.innerHTML = '';

        // Generate cards for each category and total score
        categories.forEach((category) => {
            const categoryCard = createCategoryCard(category);
            cardsContainer.appendChild(categoryCard);
        });

        // Show the total score with the appropriate color
        resultText.innerHTML = teleportCityScore.toFixed(2);
        resultText.style.color = getTextColor(teleportCityScore);

        // Show the city summary
        summaryText.innerHTML = summary;
        
    } catch (error) {
        // Handle errors
        console.error("Error: ", error);
        loader.style.display = 'none';
        resultContainer.style.display = 'none';
        mainContainer.style.height = '100vh';
        errorMessage.innerHTML = "The city you typed does not exist.";
        errorMessage.style.display = 'block';
    }
}

