import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3/";
// const ITEMS_PER_PAGE = 10; // Number of items per page
const searchButton = document.querySelector('.external-button');
searchButton.addEventListener('click', handleSearch);
let currentPage = 1;

async function createMarkup(array) {
  const markupArray = await Promise.all(array.map(async ({
    id,
    genre_ids,
    poster_path,
    release_date,
    title,
    vote_average,
  }) => {
    
    const genreName = await cardGenres(genre_ids);
    const year = getYear(release_date);

    return `<li class="trends__item" id=${id}>
        <img
          src="https://image.tmdb.org/t/p/original/${poster_path}"
          alt="${title}"
          class="trends__photo"
        />
        <div class="trends__description">
          <div class="trends__info">
            <h3 class="trends__name">${title}</h3>
            <p class="trends__ganre">${genreName}|${year}</p>
          </div>
          <div class="raiting__body">
            <div class="rating__active" style="width: ${(vote_average)*10}px">
              <div class="rating__active__wrapper">
                <span class="rating__active__color">★</span>
                <span class="rating__active__color">★</span>
                <span class="rating__active__color">★</span>
                <span class="rating__active__color">★</span>
                <span class="rating__active__color">★</span>
              </div>
            </div>
          </div>
        </div>
      </li>`;
  }));

  return markupArray.join('');
}

async function loadGenre() {

  const response = await axios.get(`${BASE_URL}genre/movie/list`,{
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA'
    },
    params: {
      language: 'en'
    }
  })
  
  const data = response.data;
  const genres = data.genres
  return genres;
}
async function cardGenres(genres) {
  const defaultGen = "Nice film"
  if(genres.length === 0){
    return defaultGen;
  }
  try {
    const genresApi =  await loadGenre()
    const newArr = genresApi.filter((elem=> elem.id === genres[0])).map(el=>el.name).join(" ")
    
    return newArr;
  } catch (error) {
    console.log(error.code);
  }
  
}
function getYear(date) {
  date = date.split("-");
  return date[0];
}



async function populateTrendingMovies(page) {
    try {
        const response = await axios.get(`${BASE_URL}trending/movie/day`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA'
            },
            params: {
                language: 'en',
                page: page
            }
        });

        const movies = response.data.results;
        const markup = await createMarkup(movies);

        const trendingContainer = document.getElementById('trendingContainer');
        trendingContainer.innerHTML = `<div class="results">${markup}</div>`;
    } catch (error) {
        console.log(error.code);
    }
}

async function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim(); // Get the search query and remove leading/trailing spaces

    if (searchQuery === '') {
        return; // If the search query is empty, do nothing
    }

    try {
        const response = await axios.get(`${BASE_URL}search/movie`, {
            headers: {
                accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA'
            },
            params: {
                language: 'en',
                query: searchQuery
            }
        });

        const searchResults = response.data.results;
        const markup = await createMarkup(searchResults);

        const trendingContainer = document.getElementById('trendingContainer');
        trendingContainer.innerHTML = `<div class="results">${markup}</div>`;
    } catch (error) {
        console.log(error.code);
    }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission behavior
        handleSearch(event);
    }
});

populateTrendingMovies(currentPage);

async function updatePaginationButtons(currentPage, totalPages) {
    const paginationNumBtn = document.querySelector('.pagination-num-btn');
    paginationNumBtn.innerHTML = ''; // Clear existing buttons

    const numButtonsToShow = 5; // Number of page buttons to show
    const halfNumButtons = Math.floor(numButtonsToShow / 2);

    let startPage = Math.max(currentPage - halfNumButtons, 1);
    let endPage = Math.min(startPage + numButtonsToShow - 1, totalPages);

    if (totalPages - endPage < halfNumButtons) {
        startPage = Math.max(endPage - numButtonsToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('pagination-cycle-btn');
        pageBtn.textContent = i < 10 ? `0${i}` : `${i}`;
        pageBtn.id = `page${i}`;
        pageBtn.addEventListener('click', () => onPageClick(i));
        paginationNumBtn.appendChild(pageBtn);
    }

    // Add "..." button if there are more pages available
    if (endPage < totalPages) {
        const morePagesBtn = document.createElement('button');
        morePagesBtn.classList.add('pagination-btn');
        morePagesBtn.textContent = '...';
        paginationNumBtn.appendChild(morePagesBtn);
    }
}
// Function to handle page button click
function onPageClick(pageNumber) {
    currentPage = pageNumber;
    populateTrendingMovies(currentPage);
    updatePaginationButtons(currentPage, totalPages); // Update the pagination buttons
}

function onNextPageClick() {
    if (currentPage < totalPages) {
        currentPage++;
        populateTrendingMovies(currentPage);
        updatePaginationButtons(currentPage, totalPages);
    }
}

// Function to handle previous page click
function onPrevPageClick() {
    if (currentPage > 1) {
        currentPage--;
        populateTrendingMovies(currentPage);
        updatePaginationButtons(currentPage, totalPages);
    }
}




// Add click event listeners for pagination buttons
document.getElementById('nextPage').addEventListener('click', onNextPageClick);
document.getElementById('prevPage').addEventListener('click', onPrevPageClick);

// populateTrendingMovies(currentPage);

