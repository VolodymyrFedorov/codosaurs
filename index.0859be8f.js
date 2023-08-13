let e,t;var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},s={},l=i.parcelRequired7c6;null==l&&((l=function(e){if(e in a)return a[e].exports;if(e in s){var t=s[e];delete s[e];var i={id:e,exports:{}};return a[e]=i,t.call(i.exports,i,i.exports),i.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){s[e]=t},i.parcelRequired7c6=l),l("bTcpz"),l("eLjGg"),l("epHO8"),l("bUb57"),l("eEHR3");var o=l("2shzp"),n=l("bTcpz");const r=document.querySelector(".js-upcoming-container");let c=[];const _=new class{#e="https://api.themoviedb.org/3/";#t="5e0b2043a7bdefdf129debb784bbe1f7";constructor(){this.page=1}async getFilmByName(e){let t=new URLSearchParams({api_key:this.#t,query:e,page:this.page}),i=await (0,o.default).get(`${this.#e}search/movie?${t}`);if(!i.data.results.length)throw Error("OOPS...We are very sorry!We don’t have any results matching your search.");return i.data}async getFilmById(e){let t=await (0,o.default).get(`${this.#e}movie/${e}?api_key=${this.#t}`);return t.data}async getUpcomingFilm(){let i=await (0,o.default).get(`${this.#e}movie/upcoming?api_key=${this.#t}`),a=await this.getFilmById(i.data.results[Math.floor(19*Math.random())].id);!function(i){let a=i.genres.reduce((e,t)=>e+=`${t.name} `,"").split(" ").filter(e=>e);a.length=2;let s=a.join(", "),l=`<img class="upcoming__image"
             src="https://image.tmdb.org/t/p/original/${i.backdrop_path}" alt="${i.original_title}" 
             loading="lazy"/>
             <div class="desktop__info__wrapper">
            <div class="upcoming__info-wrapper">
                <h3 class="upcoming__film__title">${i.original_title}</h3>
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
                        <li class="upcoming__item_customize">${i.release_date}</li>
                        <li class="upcoming__item_customize"><span>${i.vote_average.toFixed(1)}</span> &#47; <span>${i.vote_count}</span></li>
                        <li class="upcoming__item_customize">${i.popularity}</li>
                        <li class="upcoming__item_customize">${s}</li>
                    </ul>
                </li>
                </ul>
                <ul class="upcoming__list__tablet">
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Release date</p>
                        <p class="tablet__info">${i.release_date}</p>
                    </li>
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Popularity</p>
                        <p class="tablet__info upcoming__item_customize">${i.popularity}</p>
                    </li>
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Vote &#47; Votes</p>
                        <p class="tablet__info upcoming__item_customize"><span>${i.vote_average}</span> &#47; <span>${i.vote_count}</span></p>
                    </li>
                    <li class="upcoming__tablet__item">
                        <p class="tablet__subtitle">Genre</p>
                        <p class="tablet__info upcoming__item_customize">${a}</p>
                    </li>
                </ul>
            </div>
            <div class="upcoming-about-wrapper">
                    <p class="upcoming__about__title">About</p>
                    <p>${i.overview}</p>
                </div>
            <button class="upcoming__btn" type="button">Add to my library</button>
            </div>`;r.innerHTML=l,t=i.id,e=document.querySelector(".upcoming__btn");try{let a=(0,n.loadLs)(n.KEY);a&&(c=[...a]),c.some(e=>e.id===t)&&(e.textContent="Remove from my library"),e.addEventListener("click",()=>{try{let a=(0,n.loadLs)(n.KEY);if(a&&(c=[...a]),!c.some(e=>e.id===+t)){c.push(i),(0,n.saveLs)(n.KEY,c),e.textContent="Remove from my library";return}let s=c.findIndex(e=>e.id===Number(t));c.splice(s,1),localStorage.removeItem(n.KEY),(0,n.saveLs)(n.KEY,c),e.textContent="Add to my library"}catch(e){console.error("Set state error: ",e.message)}})}catch(e){console.log(e.code)}}(a)}};_.getUpcomingFilm();var o=l("2shzp");const p=document.querySelector(".trends__list");async function u(e){let t=await Promise.all(e.map(async({id:e,genre_ids:t,poster_path:i,release_date:a,title:s,vote_average:l})=>{var o;let n=await g(t),r=a.split("-")[0];return`<li class="trends__item" id=${e}>
        <img
          src="https://image.tmdb.org/t/p/original/${i}"
          alt="${s}"
          class="trends__photo"
        loading="lazy"/>
        <div class="trends__description">
          <div class="trends__info">
            <h3 class="trends__name">${s}</h3>
            <p class="trends__ganre">${n}|${r}</p>
          </div>
          <div class="raiting__body">
            <div class="rating__active" style="width: ${10*l}px">
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
      </li>`}));return t.join("")}async function m(e){let t=await u(e);p.innerHTML=t}async function d(){let e=await (0,o.default).get("https://api.themoviedb.org/3/genre/movie/list",{headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA"},params:{language:"en"}}),t=e.data,i=t.genres;return i}async function g(e){if(0===e.length)return"Nice film";try{let t=await d(),i=t.filter(t=>t.id===e[0]).map(e=>e.name).join(" ");return i}catch(e){console.log(e.code)}}(0,o.default).request({method:"GET",url:"https://api.themoviedb.org/3/trending/movie/week",params:{language:"en-US"},headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTBiMjA0M2E3YmRlZmRmMTI5ZGViYjc4NGJiZTFmNyIsInN1YiI6IjY0ZDA5ZWY5ODUwOTBmMDBjODdkY2FjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoWYcFyuoQyP_ePohi3LRcw4Fp8RAJIbZs-uo4526oA"}}).then(function(e){m(e.data.results)}).catch(function(e){});
//# sourceMappingURL=index.0859be8f.js.map
