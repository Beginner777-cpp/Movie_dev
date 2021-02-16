import * as Classes from '../includes/classSelectors';
export const getInput = () => Classes.classConnections.input.value;
export const makeMovie = (movie) => {
    let html = `<div class="movie__slider-item">
                    <a href="#${movie.imdbID}">
                        <img src="${movie.Poster}" alt="" >
                    </a>
                </div>`;
    Classes.classConnections.movieSlider.insertAdjacentHTML('beforeend', html);
}
export const arrowBtns = (page) => {
    let arrows = `<button class="movie__slider-left arrow-btn" data-goto="${page - 1}">
                    <svg class="icon">
                        <use xlink:href="img/svg/icons.svg#icon-arrow_back_ios"></use>
                    </svg>
                </button>
                <button class="movie__slider-right arrow-btn" data-goto="${page + 1}">
                    <svg class="icon">
                        <use xlink:href="img/svg/icons.svg#icon-arrow_forward_ios"></use>
                    </svg>
                </button>`;
    Classes.classConnections.movieSlider.insertAdjacentHTML('beforeend', arrows);

}
export const displayResult = (movie, page = 1, itemPerPage = 3) => {
    let start = (page - 1) * itemPerPage;
    let end = page * itemPerPage;
    movie.slice(start, end).forEach(makeMovie);
    arrowBtns(page);

}
export const clearInput = () => {
    Classes.classConnections.movieSlider.innerHTML = '';
}
export const loaderStart = () => {
    let loader = `<div class="loader">
                    <svg class="loader__icon">
                        <use xlink:href="img/svg/icons.svg#icon-spin-alt"></use></svg>
                    </svg>
                </div>`;
    Classes.classConnections.header.insertAdjacentHTML('beforebegin', loader);
}
export const loaderEnd = () => {
    document.querySelector('.loader').remove();
}