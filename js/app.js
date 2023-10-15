const moviebox = document.querySelector('.boxes')
const input = document.getElementById('myInput')
const form = document.getElementById('myForm')


const apiKey = '690383826cdbc77cd68d1637cc561990'
const imageUrl = 'https://image.tmdb.org/t/p/w500'

// Fetch movie data from API
const getJSON = async function (url) {
    try {
        const res = await fetch(url);
        const data = await res.json()

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        displayMovies(data.results)

        console.log(data);
    } catch(error)  {
            console.error('Error fetching movie data:', error);
    };
}

// display the movies the on the page
const displayMovies = (movies) => {

    movies.forEach(movie => {
        const markup = `
        <div class="moviebox">
        <img src="${imageUrl}${movie.backdrop_path}" alt="">
        <p class="year">USA, 2016 - Current</p>
        <h3>${movie.title}</h3>
        <p class="imdb"><span class="im">IMDB</span> ${movie.vote_average} / 10 <span class="num">${movie.vote_count}</span></p>
        <p>Action, Adventure, Horror</p>
        </div>
        `;
        
        // Append the movie item to the movies list using insertAdjacentHTML
        moviebox.insertAdjacentHTML('afterbegin', markup);
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(input.value);

    getJSON(`https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=${apiKey}`)
    
    input.value = ''
})


