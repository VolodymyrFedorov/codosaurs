console.log(123);
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('.external-button');
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.getElementById('results');
    const trendingContainer = document.getElementById('trendingContainer');
    const apiKey = '5e0b2043a7bdefdf129debb784bbe1f7'; // Replace with your TMDB API key
    let allResults = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    searchButton.addEventListener('click', function () {
        const query = searchInput.value;
        fetchMovieData(query);
        // console.log(465);
    });

    // Function to fetch movie data based on search query
    function fetchMovieData(query) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                allResults = data.results;
                currentPage = 1;
                displayResultsOnPage(allResults, currentPage);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function displayResultsOnPage(results, page) {
        resultsContainer.innerHTML = '<div><p>12314567</p></div>';

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageResults = results.slice(startIndex, endIndex);

        if (pageResults.length === 0) {
            resultsContainer.textContent = 'No results found.';
            updatePageNumbers(0);
            return;
        }

        pageResults.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.textContent = result.title;
            resultsContainer.appendChild(resultElement);
        });

        const totalPages = Math.ceil(results.length / itemsPerPage);
        updatePageNumbers(totalPages);
    }

    // Function to update the UI with page numbers
    function updatePageNumbers(totalPages) {
        const paginationNumBtn = document.querySelector('.pagination-num-btn');
        paginationNumBtn.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'pagination-cycle-btn';
            btn.textContent = i.toString();
            btn.addEventListener('click', () => {
                currentPage = i;
                displayResultsOnPage(allResults, currentPage);
            });
            paginationNumBtn.appendChild(btn);
        }
    }

    // Attach event listeners to previous and next buttons
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayResultsOnPage(allResults, currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(allResults.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayResultsOnPage(allResults, currentPage);
        }
    });

    // Function to fetch and display trending movies of the week
    function fetchTrendingMovies() {
        const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

        fetch(trendingUrl)
            .then(response => response.json())
            .then(data => {
                const trendingMovies = data.results;
                if (trendingMovies.length === 0) {
                    trendingContainer.textContent = 'No trending movies found.';
                    return;
                }
                displayResultsOnPage(trendingMovies, currentPage);
            })
            .catch(error => {
                console.error('Error fetching trending movies:', error);
            });
    }

    // Call the fetchTrendingMovies function on page load
    fetchTrendingMovies();

    // const clearButton = document.querySelector('.clear-button');
    // clearButton.addEventListener('click', () => {
    //     searchInput.value = '';
    //     resultsContainer.innerHTML = '';
    //     updatePageNumbers(0);
    // });
});



console.log(321);

































