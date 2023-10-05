// Function to format the city name (replacing spaces with dashes and converting to lowercase)
export function formatCityName(name){
    return name.replace(/\s+/g, '-').toLowerCase();
}

// Function to get the corresponding CSS class based on the score
export function getTextColor(score) {
    if (score >= 60) {
        return 'green';
    } else if(score <= 50){
        return 'red';
    }else{
        return 'orange';
    }
}

// Function to get the corresponding CSS class based on the score
export function getBgColor(score) {
    if (score >= 6) {
        return 'green';
    } else if(score <= 5){
        return 'red';
    }else{
        return 'orange';
    }
}