import { key, api, url } from '../config/config';
export class Movie {
    constructor(id) {
        this.id = id;
    }
    async movieInfo(id) {
        try {
            const result = await fetch(`${api}apikey=${key}&i=${id}`);
            const data = await result.json();
            this.actors = data.Actors;
            this.poster = data.Poster;
            this.title = data.Title;
            this.description = data.Plot;
            this.writer = data.Writer;
            this.imdbRating = data.imdbRating;
            this.imdbVotes = data.imdbVotes;
            this.rated = data.Rated;
            this.runTime = data.Runtime;
            this.production = data.Production;
            this.award = data.Awards;
            this.director = data.Director;
            this.numTickets = 1;
            this.price = 10;
            this.year = data.Year;
            this.url = `${url}${this.id}`;
            this.getMainActor();
        } catch (error) {
            alert(error)
        }

    }
    getMainActor() {
        this.actors = this.actors.split(',')
        this.mainActor = this.actors[0];
    }
    ticketUpdate(operation) {
        if (operation === 'add') {
            this.numTickets++;
        }
        else {
            if (this.numTickets >= 1) {
                this.numTickets--;
            }

        }
    }
    updateMovie(num) {
        this.numTickets = num;
    }
}
