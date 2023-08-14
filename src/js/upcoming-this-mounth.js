import { TMDBApi } from "./tmbd-api";
import { KEY, loadLs, saveLs } from "./modal";

const upcomingSection = document.querySelector('.js-upcoming-container');
let btnLS;
let filmId;
let toLs = [];

export function upcomingSectionMarkup(randomFilm) {
    const genres = randomFilm.genres.reduce((acc,el)=>{
        acc += `${el.name} `;
        return acc
    },'').split(' ').filter(el=>el);
    genres.length = 2;
    const genre = genres.join(', ')
    const markup = `<img class="upcoming__image"
             src="https://image.tmdb.org/t/p/original/${randomFilm.backdrop_path}" alt="${randomFilm.original_title}" 
             loading="lazy"/>
             <div class="desktop__info__wrapper">
            <div class="upcoming__info-wrapper">
                <h3 class="upcoming__film__title">${randomFilm.original_title}</h3>
                <ul class="upcoming__list__rating">
                    <li>
                    <ul class="upcoming__item__rating">
                        <li>Release date</li>
                        <li>Vote &#47; Votes</li>
                        <li>Popularity</li>
                        <li>Genre</li>
                    </ul>
                </li>
                <li>
                    <ul class="upcoming__item__rating">
                        <li class="upcoming__item_customize">${randomFilm.release_date}</li>
                        <li class="upcoming__item_customize"><span>${randomFilm.vote_average.toFixed(1)}</span> &#47; <span>${randomFilm.vote_count}</span></li>
                        <li class="upcoming__item_customize">${randomFilm.popularity}</li>
                        <li class="upcoming__item_customize">${genre}</li>
                    </ul>
                </li>
                </ul>
                <ul class="upcoming__list__tablet">
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Release date</p>
                        <p class="tablet__info">${randomFilm.release_date}</p>
                    </li>
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Popularity</p>
                        <p class="tablet__info upcoming__item_customize">${randomFilm.popularity.toFixed(1)}</p>
                    </li>
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Vote &#47; Votes</p>
                        <p class="tablet__info upcoming__item_customize"><span>${randomFilm.vote_average.toFixed(1)}</span> &#47; <span>${randomFilm.vote_count}</span></p>
                    </li>
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Genre</p>
                        <p class="tablet__info upcoming__item_customize">${genres}</p>
                    </li>
                </ul>
            </div>
            <div class="upcoming-about-wrapper">
                    <p class="upcoming__about__title">About</p>
                    <p>${randomFilm.overview}</p>
                </div>
            <button class="upcoming__btn" type="button">Add to my library</button>
            </div>`;
            upcomingSection.innerHTML = markup;
            filmId = randomFilm.id;
            btnLS = document.querySelector('.upcoming__btn');
            try {
                const arr = loadLs(KEY);
                // if(arr) toLs = [...arr];
                if(toLs.some(el=>el.id === filmId)) btnLS.textContent = "Remove from my library";
                btnLS.addEventListener('click', ()=> {
                    try {
                        const arr = loadLs(KEY);
                        if(arr) toLs = [...arr]
                        if(!toLs.some(el=>el.id=== (+filmId))) {
                            toLs.push(randomFilm);
                            saveLs(KEY, toLs);
                            btnLS.textContent = "Remove from my library"
                            return
                        }
                        const ind =  toLs.findIndex(el => el.id ===Number(filmId)) //удаляю с LS
                        toLs.splice(ind, 1);
                        localStorage.removeItem(KEY);
                        saveLs(KEY, toLs)                                     //добавляю в LS
                        btnLS.textContent = "Add to my library"
                    } catch (error) {
                        console.error("Set state error: ", error.message);
                    }
                })
            }
            catch (error) {
                console.log(error.code)
        }
}

const searchFilm = new TMDBApi;

searchFilm.getUpcomingFilm()