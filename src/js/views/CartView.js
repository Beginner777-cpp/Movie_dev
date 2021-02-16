import * as Classes from '../includes/classSelectors';
export const displayCartItem = (item) => {
    const markUp = `<div class="target-inner__list" data-deleteId='${item.id}'>
                        <span class="target-inner__list--tickets">Num Tickets: 
                            <input  type="number" value="${item.num}" class="target-inner__list-number"> <span class="cart__price">$${item.num * item.price}</span>
                        </span>
                        <span class="target-inner__list--title">Movie Name: ${item.title} </span>
                        <button class="target-inner__list-delete">
                            <svg class="icon target-inner__list-delete__icon">
                                <use xlink:href="img/svg/icons.svg#icon-minus"></use>
                            </svg>
                        </button>
                    </div>`;
    Classes.classConnections.targetContainer.insertAdjacentHTML('beforeend', markUp);

}
export const deleteCartItem = (id) => {
    const deleteItem = document.querySelector(`[data-deleteId="${id}"]`)
    deleteItem.remove();
}
export const displayCartNumber = (num) => {
    Classes.classConnections.cartCircle.textContent = num;
}