// Get references to HTML elements
const mainContainer = document.getElementById('container');
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const errorMessage = document.getElementById('error');
const loader = document.getElementById('loader');
const resultContainer = document.getElementById('resultContainer');
const summaryText = document.getElementById('summary-text')
const resultText = document.getElementById('result-text')
const cardsContainer = document.getElementById('cards');

// Add a click event listener to the search button
searchButton.addEventListener('click', searchCity);

// Function to format the city name (replacing spaces with dashes and converting to lowercase)
function formatCityName(name){
    return name.replace(/\s+/g, '-').toLowerCase();
}

// Function to get the corresponding CSS class based on the score
function getTextColor(score) {
    if (score >= 60) {
        return 'green';
    } else if(score <= 50){
        return 'red';
    }else{
        return 'orange';
    }
}

// Function to get the corresponding CSS class based on the score
function getBgColor(score) {
    if (score >= 6) {
        return 'green';
    } else if(score <= 5){
        return 'red';
    }else{
        return 'orange';
    }
} 

// Main function to handle city search
async function searchCity() {
    // Format the city name
    const formattedCityName = formatCityName(cityInput.value);
    const apiUrl = `https://api.teleport.org/api/urban_areas/slug:${formattedCityName}/scores/`;
    console.log(apiUrl);

    // Show the loader
    loader.style.display = 'block';

    try {
        // Make the API call
        const response = await axios.get(apiUrl);
        console.log(response.data);

        // Hide the loader and any error messages
        loader.style.display = 'none';
        errorMessage.style.display = 'none';

        // Show the main content
        mainContainer.style.height = '100%';
        resultContainer.style.display = 'flex';
        cardsContainer.innerHTML = '';

        // Extract data from the API response
        const teleportCategories = response.data.categories;
        const teleportCityScore = response.data.teleport_city_score;
        const teleportSummary = response.data.summary;
        
        // Generate cards for each category and total score
        teleportCategories.forEach((category)=>{
            const categoryCard = createCategoryCard(category)
            cardsContainer.appendChild(categoryCard)
        })

        // Show the total score with the appropriate color
        resultText.innerHTML = teleportCityScore.toFixed(2);
        resultText.style.color = getTextColor(teleportCityScore)

        // Show the city summary
        summaryText.innerHTML = teleportSummary;
        
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

// Function to create a category card
function createCategoryCard(category) {
    // Extract data from the API response
    const roundedScore = category.score_out_of_10.toFixed(1);

    // Create the Card Div + styling
    const card = document.createElement('div');
    card.className = 'category-card';

    const circle = document.createElement('div');
    circle.className = "category-circle";
    circle.style.backgroundColor = getBgColor(roundedScore)
    circle.innerHTML = `<p class="category-score">${roundedScore}</p>`;

    const categoryName = document.createElement('h3');
    categoryName.className = 'category-name';
    categoryName.textContent = category.name;

    card.appendChild(circle);
    card.appendChild(categoryName);

    return card;
}
