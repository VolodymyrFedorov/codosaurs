import axios from 'axios';

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
    console.log(response.data.results);
    renderMarkup(response.data.results);
    
  })
  .catch(function (error) {
    console.error(error);
  });


function createMarkup(array) {
    console.log(array);
  const markup = array
    .map(
      ({
        id,
        poster_path,
        release_date,
        title,
        vote_average,
      }) => {
        console.log(poster_path);
        return ` <li class="trends__item" id=${id}>
        <img
          src="https://image.tmdb.org/t/p/original/${poster_path}"
          alt="${title}"
          class="trends__photo"
        />
        <div class="trends__description">
          <div class="trends__info">
            <h3 class="trends__name">${title}</h3>
            <p class="trends__ganre">Drama, Action | ${release_date}</p>
          </div>
          <div class="raiting-body">
            <div class="rating-active" style="width: ${vote_average}px">
              <div class="rating-active-wrapper">
                <span class="rating-active-color">★</span>
                <span class="rating-active-color">★</span>
                <span class="rating-active-color">★</span>
                <span class="rating-active-color">★</span>
                <span class="rating-active-color">★</span>
              </div>
            </div>
          </div>
        </div>
      </li>`;
      }
    )
    .join('');
    console.log(markup);
  return markup;
}


function renderMarkup(array) {
  const markup = createMarkup(array);
  selectEl.innerHTML = markup;
}

// renderMarkup()



