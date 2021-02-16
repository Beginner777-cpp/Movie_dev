import { v4 as uuidv4 } from 'uuid';
export default class Cart {
    constructor() {
        this.movieList = [];
    }
    addItem(title, num, price) {
        const newItem = {
            id: uuidv4(),
            title: title,
            num: num,
            price: price,
        }
        this.movieList.push(newItem);
        this.persistDataLocally();
        return newItem;
    }
    deleteItem(id) {
        let index = this.movieList.findIndex(cur => cur.id === id)
        this.movieList.splice(index, 1);
        this.persistDataLocally();
    }
    updateCart(id, num) {
        let index = this.movieList.findIndex(cur => cur.id === id)
        this.movieList[index].num = num;
    }
    showList() {
        return this.movieList;
    }
    calcPrice(num) {
        this.price = parseInt(num) * 10
    }
    persistDataLocally() {
        localStorage.setItem('cart', JSON.stringify(this.movieList))
    }
    restoreData() {
        const data = JSON.parse(localStorage.getItem('cart'));
        if (data) {
            this.movieList = data;
        }
    }
}