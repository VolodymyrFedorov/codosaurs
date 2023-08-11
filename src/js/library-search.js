// to import
const KEY = "Library";
function loadLs(key) {
    const arrJs = localStorage.getItem(key);                       
    return arr = JSON.parse(arrJs);
 }

// ===================
const myLibContainer = document.querySelector('.js-mylib-container')
const searchEl = document.querySelector('#genre-search');
let genreArr = [];

const filmsFromLs = loadLs(KEY);

if(!filmsFromLs || !filmsFromLs.length) {               // перевірка локал сторіджа
    myLibContainer.innerHTML = `<div class="not-found-film-library">
    <p class="not-found-film-library-text-item">OOPS...</p>
    <p class="not-found-film-library-text-item">We are very sorry!</p>
    <p class="not-found-film-library-text-item">
      You don’t have any movies at your library.
    </p>

    <a class="not-found-film-link" href=""> Search movie </a>
  </div>`
} else {
    filmsFromLs.map(el=>el.genres).map(el=>el.map(el=>genreArr.push(el.name)));     // рендер жанрів в селект
    genreArr = genreArr.filter((el,i,arr)=>i===arr.indexOf(el));
    renderOptions(genreArr);
    searchEl.addEventListener('change', onChangeSelect);
}



function renderOptions(arr) {
    arr.map(el=>{
        const option = `<option class='mylib-options'>${el}</option>`;
        searchEl.insertAdjacentHTML('beforeend',option)
    });
}


function onChangeSelect(e) {
    const genreToFind = e.target.value;
    if(genreToFind === 'All Genres') return filmsFromLs;  // перед ретурном запхати функцію рендера(ретурн залишити!!!!!!!!!!!!!)

    const filterredFilms = filmsFromLs.filter(el=>{
        return (el.genres.some(el=>el.name.includes(genreToFind)))
    })
    return filterredFilms;              // замінити ретурн на функцію рендера
}