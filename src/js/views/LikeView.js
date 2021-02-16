import * as Classes from '../includes/classSelectors'
export const displayLike = (like) => {
    const markUp = `<li class="likes__container--item">
                        <a href="#${like.id}">
                            <img src="${like.poster}">
                            <h2 class="title">${like.title}</h2>
                            <span class="year">${like.year}</span>
                            <span class="imdb-score">${like.imdbRating}/10</span>
                        </a> 
                    </li>`;
    Classes.classConnections.likesContainer.insertAdjacentHTML('beforeend', markUp);
}

export const likeReset = () => {
    Classes.classConnections.likesContainer.innerHTML = '';
}
export const likeStatus = (status) => {
    const fullLike = `img/svg/icons.svg#icon-heart`;
    const emptyLike = `img/svg/icons.svg#icon-heart-o`;
    if (status) {
        document.querySelector('.heart__icon').setAttribute('href', fullLike);
    }
    else {
        document.querySelector('.heart__icon').setAttribute('href', emptyLike);
    }
}