import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/'
//? поставить ошибку выше, добавить ей класс 
//import { loadLs, saveLs, KEY } from "./modal";
export const KEY = "Library"; //!  нужно убрать
const refs = {
    ulEl : document.querySelector(".library-box"),
    btnLoad : document.querySelector(".js-load")
}

let objForRend = loadLs(KEY)
console.log(objForRend);

if(objForRend.length < 9){
renderMarkup(objForRend);
} const toRender = objForRend.slice(0, 9);
objForRend.splice(0,9);
renderMarkup(toRender);
refs.btnLoad.classList.remove("visually-hidden");
refs.btnLoad.addEventListener("click", onLoadMore)

function onLoadMore() {
    if(objForRend.length < 9){
        renderMarkup(objForRend);
        refs.btnLoad.classList.add("visually-hidden")
        } objForRend.splice(0,9);
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
function renderMarkup(array) {
    const markup = renderLibrary(array);
    refs.ulEl.insertAdjacentHTML("beforebegin", markup);
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