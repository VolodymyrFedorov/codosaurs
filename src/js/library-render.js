import { loadLs, KEY } from "./modal";
import { KEY } from "./modal";
const refs = {
    ulEl : document.querySelector(".trends__list"),
    btnLoad : document.querySelector(".js-load"),
    myLibContainer : document.querySelector('.js-mylib-container'),
    searchEl : document.querySelector('#genre-search'),
}


let genreArr = [];
let forCheckRender;

const filmsFromLs = loadLs(KEY) || [];

lengthCheck(filmsFromLs);
                              // проверяем и догружаем все фильмы

if(!filmsFromLs || !filmsFromLs.length) {               // перевірка локал сторіджа
    refs.myLibContainer.innerHTML = `<div class="not-found-film-library">
    <p class="not-found-film-library-text-item">OOPS...</p>
    <p class="not-found-film-library-text-item">We are very sorry!</p>
    <p class="not-found-film-library-text-item">
      You don’t have any movies at your library.
    </p>
    
    <a class="not-found-film-link" href="./catalog.html"> Search movie </a>
  </div>
  <ul class="trends__list visually-hidden"></ul>
  <button type="button" class="load-more js-load visually-hidden">Load more</button>`
} else {
    filmsFromLs.map(el=>el.genres).map(el=>el.map(el=>genreArr.push(el.name)));     // рендер жанрів в селект
    genreArr = genreArr.filter((el,i,arr)=>i===arr.indexOf(el));
    renderOptions(genreArr);
    refs.searchEl.addEventListener('change', onChangeSelect);
}

function renderOptions(arr) {
    arr.map(el=>{
        const option = `<option class='mylib-options'>${el}</option>`;
        refs.searchEl.insertAdjacentHTML('beforeend',option)
    });
}

function onChangeSelect(e) {
    refs.ulEl.innerHTML = " "
    const genreToFind = e.target.value;
    if(genreToFind === 'All Genres'){
      lengthCheck(filmsFromLs);
      return
    }                            // перед ретурном запхати функцію рендера(ретурн залишити!!!!!!!!!!!!!)
     
    const filterredFilms = filmsFromLs.filter(el=>{
        return (el.genres.some(el=>el.name.includes(genreToFind)))
    })
   lengthCheck(filterredFilms)              // замінити ретурн на функцію рендера
}

function lengthCheck(obj) {
  const filmsInCheckFu = [...obj];                     // переменная для проверок
  if(filmsInCheckFu.length < 9){                       // если фильмов < 9 просто выводим
    renderMarkup(filmsInCheckFu);
    refs.btnLoad.classList.add("visually-hidden");
    return
    } const toRender = filmsInCheckFu.slice(0, 9);      // если больше выводим первые 9
    filmsInCheckFu.splice(0,9);                         // берем все фильмы с 9-го удяляя первые 8
    forCheckRender = [...filmsInCheckFu];              
    renderMarkup(toRender);
    refs.btnLoad.classList.remove("visually-hidden");
    refs.btnLoad.addEventListener("click", onLoadMore);
}

function onLoadMore() {                                  // проверяем и отображаем по нажатию кнопки 
    if(forCheckRender.length < 9){
        renderMarkup(forCheckRender);
        refs.btnLoad.classList.add("visually-hidden");
        return
        } const toRender = forCheckRender.slice(0, 9);
        renderMarkup(toRender);
        forCheckRender.splice(0,9);

}
function renderLibrary(libraryObj) {

const markupArray = libraryObj.map(({id, genres, poster_path, release_date, title, vote_average}) => {
    return`<li class="library-list trends-box" id=${id}>
              <img
                src="https://image.tmdb.org/t/p/original/${poster_path}"
                alt="${title}"
                class="trends__photo"
              />
              <div class="trends__description">
                <div class="trends__info">
                  <h3 class="trends__name">${title}</h3>
                  <p class="trends__ganre">${genres[0].name}|${getYear(release_date)}</p>
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
            </li>`}).join(" ")
        return markupArray;
      }
function renderMarkup(array) {
    const markup = renderLibrary(array);
    refs.ulEl.insertAdjacentHTML("beforeend", markup);
  }
function getYear(date) {
    date = date.split("-");
    return date[0];
  }
