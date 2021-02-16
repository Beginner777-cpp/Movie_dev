//APPLICATION FILE
import * as Classes from './includes/classSelectors';
import * as Search from './models/Search';
import * as Movie from './models/Movie';
import Cart from './models/Cart';
import Like from './models/Like';
import * as Views from './views/searchView';
import * as MovieView from './views/movieView';
import * as CartView from './views/CartView';
import * as LikeView from './views/LikeView';
const data = {

}
data.like = new Like();
data.cart = new Cart();
window.data = data;
const switchTabs = () => {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabTargets = document.querySelectorAll('[data-tab-content]');
    tabs.forEach(element => {
        element.addEventListener('click', () => {
            tabs.forEach(e => {
                e.classList.remove('activeTab');
            });
            tabTargets.forEach(e => {
                e.classList.remove('activeTab');
            });
            element.classList.add('activeTab');
            const active = document.querySelector(element.dataset.tabTarget);
            active.classList.add('activeTab');
        })
    });
}
const movieController = async () => {
    Classes.classConnections.mainContent.innerHTML = '';
    let id = window.location.hash.replace('#', '');
    if (id) {
        let movie = await new Movie.Movie(id);
        data.movieSingle = await movie;
        await data.movieSingle.movieInfo(data.movieSingle.id);
        MovieView.makeContent(data.movieSingle, data.like.likedStatus(id));
    }
    switchTabs();
}
const CartController = () => {
    if (!data.cart) {
        data.cart = new Cart();
    }
    const newItem = data.cart.addItem(data.movieSingle.title, data.movieSingle.numTickets, data.movieSingle.price);
    CartView.displayCartItem(newItem);
    CartView.displayCartNumber(data.cart.movieList.length);
}
const LikeController = () => {
    if (!data.like) {
        data.like = new Like();
    }
    const likeId = data.movieSingle.id;
    if (!data.like.likedStatus(likeId)) {
        data.like.likeAdd(likeId, data.movieSingle.poster, data.movieSingle.year, data.movieSingle.imdbRating, data.movieSingle.title);
        const likeItems = data.like.showLikes();
        LikeView.likeReset();
        likeItems.forEach(element => {
            LikeView.displayLike(element);
        });
        LikeView.likeStatus(likeId);
    }
    else {
        data.like.deleteLike(likeId);
        LikeView.likeStatus(data.like.likedStatus(likeId));
        LikeView.likeReset();
        const likeItems = data.like.showLikes();
        likeItems.forEach(element => {
            LikeView.displayLike(element);
        });
    }
    Classes.classConnections.likesCircle.textContent = data.like.numberOfLikes();
}
const hashHandler = () => {
    let hash = window.location.hash;
    if (hash !== '#target-content' && hash != '#target-content1' && hash !== '#') {
        movieController()
    }
}

Classes.classConnections.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    window.location.hash = '';
    if (Views.getInput() != '') {
        try {
            Views.clearInput();
            Views.loaderStart();
            var searchResult = await Search.SearchMovie(Views.getInput());
            Views.loaderEnd();
            Classes.classConnections.form.reset();
            data.movie = searchResult.Search;
            Views.displayResult(data.movie);
        } catch (error) {
            alert('Something went wrong, try again.')
        }

    }
    else {
        alert('Enter the movie name');
    }
})
Classes.classConnections.movieSlider.addEventListener('click', (e) => {
    if (e.target.closest('.arrow-btn')) {
        let page = Math.ceil(data.movie.length / 3);
        let pageNum = parseInt(e.target.closest('.arrow-btn').dataset.goto);
        if (pageNum > 0 && pageNum <= page) {
            Classes.classConnections.movieSlider.innerHTML = '';
            Views.displayResult(data.movie, pageNum);
        }
    }
})

Classes.classConnections.mainContent.addEventListener('click', (e) => {
    if (e.target.matches('.main-content__right-social--add, .main-content__right-social--add *')) {
        data.movieSingle.ticketUpdate('add');
    }
    else if (e.target.matches('.main-content__right-social--minus, .main-content__right-social--minus *')) {
        data.movieSingle.ticketUpdate('minus');
    }
    else if (e.target.matches('.main-content__left--buy, .main-content__left--buy *')) {
        CartController();
    }
    else if (e.target.matches('.main-content__right-social--likes, .main-content__right-social--likes *')) {
        LikeController();
    }
    document.querySelector('.num-tickets').textContent = data.movieSingle.numTickets;
})

Classes.classConnections.targetContainer.addEventListener('click', (e) => {
    if (e.target.matches('.target-inner__list-delete, .target-inner__list-delete *')) {
        let deleteId = e.target.closest('.target-inner__list').dataset.deleteid;
        data.cart.deleteItem(deleteId);
        CartView.deleteCartItem(deleteId);
    }
    if (e.target.matches('.target-inner__list-number')) {
        let newNum = e.target.value;
        if (newNum > 1) {
            data.cart.updateCart(e.target.closest('.target-inner__list').dataset.deleteid, newNum);
            data.movieSingle.updateMovie(newNum);
            data.cart.calcPrice(newNum);
            e.target.closest('.target-inner__list--tickets').querySelector('.cart__price').textContent = `$${data.cart.price}`
        }
    }
})

window.addEventListener('load', hashHandler);
window.addEventListener('hashchange', hashHandler);
window.addEventListener('load', () => {
    data.like = new Like();
    data.cart = new Cart();
    data.like.restoreData();
    data.cart.restoreData();
    const carts = data.cart.showList();
    const likes = data.like.showLikes();
    carts.forEach(element => {
        CartView.displayCartItem(element);
    });
    likes.forEach(element => {
        LikeView.displayLike(element);
    });
    CartView.displayCartNumber(data.cart.movieList.length);
    Classes.classConnections.likesCircle.textContent = data.like.numberOfLikes();
})