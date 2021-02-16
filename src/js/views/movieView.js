import * as CLasses from '../includes/classSelectors';
export const makeContent = (movie, likeStatus) => {
    let stars = movie.imdbRating.split('.');
    let intPart = stars[0];
    let fracPart = stars[1];
    let crew = movie.actors.map((value, index) => `${index}.${value}`);
    let makeStar = '';
    if (fracPart == '0') {
        for (let i = 0; i < intPart; i++) {
            makeStar += `<svg class="icon icon-star">
                            <use xlink:href="img/svg/icons.svg#icon-star"></use>
                        </svg>`;
        }

    }
    else {
        for (let i = 0; i < intPart; i++) {
            makeStar += `<svg class="icon icon-star">
                            <use xlink:href="img/svg/icons.svg#icon-star"></use>
                        </svg>`;
        }
        makeStar += `<svg class="icon icon-star">
                        <use xlink:href="img/svg/icons.svg#icon-star-half"></use>
                    </svg>`;
    }

    let html = `    
    <div class="main-content__left">
    
    <div class="main-content__left--img">
        <img src="${movie.poster}" alt="">
    </div>
    <div class="main-content__left--watch">
        <button class='btn-watch'>
            <svg class="icon  icon-watch">
                <use xlink:href="img/svg/icons.svg#icon-youtube"></use></svg> watch trailer
        </button>
    </div>
    <div class="main-content__left--buy">
        <button class='btn-watch'>
            <svg class="icon  icon-buy">
                <use xlink:href="img/svg/icons.svg#icon-ticket"></use></svg>
                <span class="num-tickets">1</span> buy tickets
        </button>
    </div>
    
    </div>
    <div class="main-content__right">
    <div class="main-content__right-title">${movie.title}</div>
    <div class="main-content__right-social">
        <div class="main-content__right-social--likes">
           <button class="main-content__right-circle">
            <svg class="icon likes">
                <use xlink:href="img/svg/icons.svg#${likeStatus == true ? 'icon-heart' : 'icon-heart-o'}" class="heart__icon"></use>
            </svg>
           
           </button>
        
        </div>
        <div class="main-content__right-social--add">
            <button class="main-content__right-circle">
            <svg class="icon  add-ticket">
                <use xlink:href="img/svg/icons.svg#icon-plus-circle"></use>
            </svg>
            
            </button>
        
        </div>
        <div class="main-content__right-social--minus">
            <button class="main-content__right-circle">
            <svg class="icon  minus-ticket">
                <use xlink:href="img/svg/icons.svg#icon-minus-circle1"></use>
            </svg>
            </button>
        </div>
    </div>
    <div class="main-content__right-reviews">
        <div class="main-content__right-reviews-stars">
           
                <svg class="icon icon-star">
                    <use xlink:href="img/svg/icons.svg#icon-star"></use>
                </svg>
            
            <div class="main-content__right-reviews--numbers">
                    <span class="review--number">${movie.imdbRating}/10</span>
                <span class="review--people">  ${movie.imdbVotes} reviews</span>
    
            </div>
            <span class="rate-this-movie">
                Rate This Movie: 
                ${makeStar}
                
            </span>
        </div>
        <div class="main-content__right-description">
            <ul class="description">
                <li data-tab-target ="#overview" class="description-tab activeTab">Overview</li>
                <li data-tab-target ="#reviews" class="description-tab">Reviews</li>
                <li data-tab-target ="#castCrews" class="description-tab">Cast & Crew</li>
                <li data-tab-target ="#media" class="description-tab">Media</li>
            </ul>
            <div class="description-content">
                <div id="overview" class="description-content__item activeTab" data-tab-content>
                   
                    <p>${movie.description}</p>
                </div>
                <div id="reviews" class="description-content__item" data-tab-content>
                   
                    <p>The official Imdb score is ${movie.imdbVotes}</p>
                </div>
                <div id="castCrews" class="description-content__item" data-tab-content>
                    
                    <p> ${crew}</p>
                </div>
                <div id="media" class="description-content__item" data-tab-content>
                    
                    <p>${movie.writer}</p>
                </div>
            </div>
        </div>
    </div>
    </div>`;
    CLasses.classConnections.mainContent.insertAdjacentHTML('beforeend', html);
}
