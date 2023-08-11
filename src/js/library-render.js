import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/'
//? поставить ошибку выше, добавить ей класс 
//import { loadLs, saveLs, KEY } from "./modal";
export const KEY = "Library"; //!  нужно убрать
const refs = {
    ulEl : document.querySelector(".trends__list"),
    btnLoad : document.querySelector(".js-load"),
    myLibContainer : document.querySelector('.js-mylib-container'),
    searchEl : document.querySelector('#genre-search'),
}
// ?===========
let genreArr = [];
let forCheckRender;

const filmsFromLs = loadLs(KEY);

renderMarkup(filmsFromLs);

if(!filmsFromLs || !filmsFromLs.length) {               // перевірка локал сторіджа
    refs.myLibContainer.innerHTML = `<div class="not-found-film-library">
    <p class="not-found-film-library-text-item">OOPS...</p>
    <p class="not-found-film-library-text-item">We are very sorry!</p>
    <p class="not-found-film-library-text-item">
      You don’t have any movies at your library.
    </p>
    
    <a class="not-found-film-link" href=""> Search movie </a>
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
    }  // перед ретурном запхати функцію рендера(ретурн залишити!!!!!!!!!!!!!)

    const filterredFilms = filmsFromLs.filter(el=>{
        return (el.genres.some(el=>el.name.includes(genreToFind)))
    })
   lengthCheck(filterredFilms)              // замінити ретурн на функцію рендера
}

function lengthCheck(obj) {
  if(obj.length < 9){
    renderMarkup(obj);
    return
    } const toRender = obj.slice(0, 9);
    obj.splice(0,9);
    forCheckRender = [...obj]
    console.log(forCheckRender);
    renderMarkup(toRender);
    refs.btnLoad.classList.remove("visually-hidden");
    refs.btnLoad.addEventListener("click", onLoadMore) 
}

function onLoadMore() {
  console.log(forCheckRender);
    if(forCheckRender.length < 9){
        renderMarkup(forCheckRender);
        refs.btnLoad.classList.add("visually-hidden")
        } forCheckRender.splice(0,9);
}
function renderLibrary(libraryObj) {

const markupArray = libraryObj.map(({id, genres, poster_path, release_date, title, vote_average}) => {
    return`<li class="library-list" id=${id}>
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
            </li>`})
         
        console.log(markupArray);
        return markupArray;
      }
export function renderMarkup(array) {
    const markup = renderLibrary(array);
    refs.ulEl.insertAdjacentHTML("beforeend", markup);
  }
//!  нужно убрать
function getYear(date) {
    date = date.split("-");
    return date[0];
  }
export function loadLs(key) {
    const arrJs = localStorage.getItem(key);                       
    return arr = JSON.parse(arrJs);
 }
export function saveLs (key, value) {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState); 
}
// !=====