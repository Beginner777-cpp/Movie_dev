import { key, api } from '../config/config';
export const SearchMovie = async (search) => {
    try {
        let key = '45dc5571';
        let movie = await fetch(`${api}apikey=${key}&s=${search}`);
        let data = await movie.json();
        return data;
    } catch (error) {
        alert(error)
    }

};