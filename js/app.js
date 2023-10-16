const moviebox = document.querySelector('.boxes');
const input = document.getElementById('myInput');
const form = document.getElementById('myForm');
const apiKey = '690383826cdbc77cd68d1637cc561990';
const imageUrl = 'https://image.tmdb.org/t/p/w500';

// Function to fetch movie data from the API
const getJSON = async function (url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        }

        displayMovies(data.results);
        console.log(data);
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
};

// Function to display movie data
const displayMovies = (movies) => {
    moviebox.innerHTML = ''; 

    movies.forEach(movie => {
        const markup = `
            <div class="moviebox" data-movie-id="${movie.id}">
                <img src="${imageUrl}${movie.backdrop_path}" alt="">
                <p class="year">USA, 2016 - Current</p>
                <h3>${movie.title}</h3>
                <p class="imdb"><span class="im">IMDB</span> ${movie.vote_average} / 10 <span class="num">${movie.vote_count}</span></p>
                <p>Action, Adventure, Horror</p>
            </div>
        `;

        moviebox.insertAdjacentHTML('beforeend', markup);
    });

    addEventListenersToMovieBoxes();
};


const addEventListenersToMovieBoxes = () => {
    const movieBoxes = document.querySelectorAll('.moviebox');
    movieBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const movieId = box.getAttribute('data-movie-id');
            fetchAndDisplayMovieDetails(movieId);
        });
    });
};

// Function to fetch and display more details about a movie
const fetchAndDisplayMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${data.message} (${response.status})`);
        }

        displayModal(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};

// Function to display the modal with movie details
const displayModal = (movieDetails) => {
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    const movieDetailsContainer = document.getElementById('movie-details');
    movieDetailsContainer.innerHTML = '';

    const markup = `
        <h2>${movieDetails.title}</h2>
        <p>Release Date: ${movieDetails.release_date}</p>
        <p>Overview: ${movieDetails.overview}</p>
        <p>Vote Average: ${movieDetails.vote_average}</p>
        <!-- Add more details as needed -->
    `;

    movieDetailsContainer.innerHTML = markup;
    modal.style.display = 'block';

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Add a submit event listener to the form
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(input.value);

    getJSON(`https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=${apiKey}`);
    input.value = '';
});

getJSON(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`);
