import axios from 'axios';


  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];


const selectEl = document.querySelector('.trends__list')

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/week',
  params: { language: 'en-US' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA',
  },
};

axios
  .request(options)
  .then(function (response) {
    renderMarkup(response.data.results);
    
  })
  .catch(function (error) {
    console.error(error);
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
            <div class="rating__active">
              <div class="rating__active__wrapper" style="width: ${(vote_average*10)}px">
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


function renderMarkup(array) {
  const markup = createMarkup(array);
  selectEl.innerHTML = markup;
}



