const imageUrl = 'https://image.tmdb.org/t/p/w500';

// Function to get the value of a query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
    
}

// Get the movieId from the query parameter
const movieId = getQueryParam('movieId');

// Function to fetch and display movie details
async function fetchAndDisplayMovieDetails(movieId) {
    try {
        // Fetch the movie details from the API
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=690383826cdbc77cd68d1637cc561990`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();
        console.log(data);

        // Display the movie details on the page
        const movieDetailsContainer = document.querySelector('.moviebox');
        const markup = `
            <img src="${imageUrl}${data.backdrop_path}" alt="">
            <a href="${data.homepage}"><h2 class="title">${data.title}</h2></a>
            <p class="overview">Overview: ${data.overview}</p>
            <p class="release-date">Release Date: ${data.release_date}</p>
            <p class="average-vote">Vote Average: ${data.vote_average}</p>
        `;
        movieDetailsContainer.innerHTML = markup
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

fetchAndDisplayMovieDetails(movieId)