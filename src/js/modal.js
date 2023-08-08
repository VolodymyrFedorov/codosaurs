const refs =  {
    ulEl : document.querySelector(".trends__list"),
    imgEl : document.querySelectorAll(".trends__photo"),
    backdrop : document.querySelector(".js-backdrop"),
    btnCls : document.querySelector(".js-btn-cls"),
    card : document.querySelector(".js-card")
}
refs.ulEl.addEventListener("click", openModal)



function openModal(event) {
const arr = [...refs.imgEl];

if (arr.includes(event.target)) {   
    const liElem = event.target.closest('li');
    console.log(liElem);                //открыл модадлку
refs.backdrop.classList.remove("visually-hidden")
}
refs.backdrop.addEventListener("click", onBackdropClick);  
refs.btnCls.addEventListener("click", clsModal);
document.addEventListener('keydown', keyBoardPress);

const cardId = refs.card.getAttribute("id");        //id для запроса
console.log(cardId);
}

function renderCard(obj) {
    
}


function removeEvent() {                             //снимаю слушателей
    refs.btnCls.removeEventListener("click", clsModal);
    document.removeEventListener('keydown', keyBoardPress);
    refs.backdrop.removeEventListener("click", onBackdropClick);
}
function clsModal(event) {                           //закрытие по крестику
    refs.backdrop.classList.add("visually-hidden");
    removeEvent();
}
function keyBoardPress(event) {                     //закрытие по 'Escape'
    if (event.key === 'Escape'){
    refs.backdrop.classList.add("visually-hidden");  
    removeEvent();
 }
}
function onBackdropClick(event) {                   //закрываю по backdrop
    if(event.target === event.currentTarget ){  
    refs.backdrop.classList.add("visually-hidden");
    removeEvent();
}
}

