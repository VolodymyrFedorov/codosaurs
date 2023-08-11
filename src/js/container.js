import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const ITEMS_PER_PAGE = 10;
const searchButton = document.querySelector('.external-button');
const searchInput = document.getElementById('searchInput');
const trendingContainer = document.getElementById('trendingContainer');
const paginationNumBtn = document.querySelector('.pagination-num-btn');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
let currentPage = 1;
let totalPages = 1;

prevPageBtn.addEventListener('click', () => onPageClick(currentPage - 1));
nextPageBtn.addEventListener('click', () => onPageClick(currentPage + 1));
document.getElementById('sortByYear').addEventListener('change', handleSort);
document.getElementById('sortByGenre').addEventListener('change', handleSort);

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch(event);
    }
});

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

    return `<li class="trends__item trends-box" id=${id}>
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
        trendingContainer.innerHTML = markup;

        totalPages = response.data.total_pages; // Update total pages
        updatePaginationButtons(currentPage, totalPages);
    } catch (error) {
        console.log(error);
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
// Function to fetch and populate sort options for years and genres
async function populateSortOptions() {
    try {
        const genres = await loadGenre();
        const sortByYear = document.getElementById('sortByYear');
        const sortByGenre = document.getElementById('sortByGenre');

        // Populate sort by year options
        const currentYear = new Date().getFullYear();

        // Add default option for year
        const defaultYearOption = document.createElement('option');
        defaultYearOption.value = '';
        defaultYearOption.textContent = 'Year';
        sortByYear.appendChild(defaultYearOption);

        for (let year = currentYear; year >= 1900; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            sortByYear.appendChild(option);
        }

        // Populate sort by genre options
        const defaultGenreOption = document.createElement('option');
        defaultGenreOption.value = '';
        defaultGenreOption.textContent = 'All';
        sortByGenre.appendChild(defaultGenreOption);

        for (const genre of genres) {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            sortByGenre.appendChild(option);
        }
    } catch (error) {
        console.log(error.code);
    }
}
// Function to handle sorting by year and genre
async function handleSort() {
    const sortByYear = document.getElementById('sortByYear');
    const sortByGenre = document.getElementById('sortByGenre');

    const selectedYear = sortByYear.value;
    const selectedGenre = sortByGenre.value;

    try {
        const response = await axios.get(`${BASE_URL}discover/movie`, {
            headers: {
                accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA'
            },
            params: {
                language: 'en',
                sort_by: 'popularity.desc', // You can change the sorting method here
                with_genres: selectedGenre,
                primary_release_year: selectedYear,
                page: 1
            }
        });

        const sortedResults = response.data.results;
        const markup = await createMarkup(sortedResults);

        trendingContainer.innerHTML = markup;
    } catch (error) {
        console.log(error.code);
    }
}

// Initialize the page
async function initializePage() {
    await populateSortOptions();
    populateTrendingMovies(currentPage);
}

initializePage(); // Call this function to initialize the page

function onPageClick(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) {
        return;
    }
    
    currentPage = pageNumber;
    populateTrendingMovies(currentPage);
    updatePaginationButtons(currentPage, totalPages);
}

function updatePaginationButtons(currentPage, totalPages) {
    paginationNumBtn.innerHTML = ''; // Clear existing buttons

    // Back arrow
    if (currentPage > 1) {
        addPageButton(paginationNumBtn, currentPage - 1, 'back');
    }
    
    // Current page
    addPageButton(paginationNumBtn, currentPage, 'current');
    
    // Next page after current page
    if (currentPage < totalPages) {
        addPageButton(paginationNumBtn, currentPage + 1, 'next');
    }
    
    // After next page
    if (currentPage < totalPages - 1) {
        addPageButton(paginationNumBtn, currentPage + 2);
    }
    
    // Three dots
    if (currentPage < totalPages - 2) {
        const morePagesBtn = document.createElement('button');
        morePagesBtn.classList.add('pagination-btn');
        morePagesBtn.textContent = '...';
        paginationNumBtn.appendChild(morePagesBtn);
    }
    
    // 24 page
    addPageButton(paginationNumBtn, currentPage + 23);
}

function addPageButton(parentElement, pageNum, btnType = '') {
    const pageBtn = document.createElement('button');
    pageBtn.classList.add('pagination-cycle-btn');
    pageBtn.textContent = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;
    
    if (btnType === 'current') {
        pageBtn.classList.add('current-page-btn');
    }

    pageBtn.addEventListener('click', () => onPageClick(pageNum));
    parentElement.appendChild(pageBtn);
}

populateTrendingMovies(currentPage);