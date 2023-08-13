import axios from 'axios';

const selectEl = document.querySelector('.trends__list')
const BASE_URL = 'https://api.themoviedb.org/3/'

// async function getTrends() {
//  const response = await axios.get(`${BASE_URL}trending/movie/week`,{
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA',
//     },
//     params: { 
//       language: 'en-US' 
//     },
//   })
//   const data = response.data
//   const results = data.results
//   console.log(results);
//   return results;
// }

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
    // console.log(response.data.results);
    renderMarkup(response.data.results);
    
  })
  .catch(function (error) {
    // console.error(error);
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
        loading="lazy"/>
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
async function renderMarkup(array) {
  const markup = await createMarkup(array);
  selectEl.innerHTML = markup;
}
// !======================
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




