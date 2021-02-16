export default class Like {
    constructor() {
        this.likes = [];
    }
    likeAdd(id, poster, year, imdbRating, title) {
        const newLike = {
            id: id,
            poster: poster,
            year: year,
            imdbRating: imdbRating,
            title: title,
        }
        this.likes.push(newLike);
        this.persistDataLocally()
        return newLike;
    }
    deleteLike(id) {
        const delIndex = this.likes.findIndex(cur => cur.id === id);
        this.likes.splice(delIndex, 1);
        this.persistDataLocally();
    }
    showLikes() {
        return this.likes;
    }
    numberOfLikes() {
        return this.likes.length;
    }
    likedStatus(id) {
        return this.likes.findIndex(cur => cur.id === id) !== -1;
    }
    persistDataLocally() {
        localStorage.setItem('like', JSON.stringify(this.likes))
    }
    restoreData() {
        const data = JSON.parse(localStorage.getItem('like'));
        if (data) {
            this.likes = data;
        }
    }

} 