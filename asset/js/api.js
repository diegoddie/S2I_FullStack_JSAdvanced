// Function to make the API call
export async function fetchCityData(formattedCityName) {
    const apiUrl = `https://api.teleport.org/api/urban_areas/slug:${formattedCityName}/scores/`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const categories = _.get(data, 'categories', []);
        const teleportCityScore = _.get(data, 'teleport_city_score', 0);
        const summary = _.get(data, 'summary', '');

        return { categories, teleportCityScore, summary };
    } catch (error) {
        throw error;
    }
}