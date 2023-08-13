import axios from "axios";
import { upcomingSectionMarkup } from "./upcoming-this-mounth";

export class TMDBApi{
        #BASE_URL = 'https://api.themoviedb.org/3/';
        #API_KEY = '5e0b2043a7bdefdf129debb784bbe1f7';
        constructor() {
            this.page = 1;
        }; 
/*
шлях до картинки
src="https://image.tmdb.org/t/p/original/${backdrop_path})"
*/
        async getFilmByName(q) {
            const params = new URLSearchParams({
                api_key: this.#API_KEY,
                query: q,
                page: this.page,
            });
            const response = await axios.get(`${this.#BASE_URL}search/movie?${params}`);
            if(!response.data.results.length) throw new Error("OOPS...We are very sorry!We don’t have any results matching your search.")
            return response.data
        };

        // getFilmByName return {page: 1, results: Array(20), total_pages: 2, total_results: 31}

        async getFilmById(id) {
        const response  = await axios.get(`${this.#BASE_URL}movie/${id}?api_key=${this.#API_KEY}`);
        return response.data
        }

        async getUpcomingFilm() {
            const randomize = Math.floor(Math.random()*19); 
            const response = await axios.get(`${this.#BASE_URL}movie/upcoming?api_key=${this.#API_KEY}`);
            const randomFilm = await this.getFilmById(response.data.results[randomize].id);
            upcomingSectionMarkup(randomFilm)
        }
}