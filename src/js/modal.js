const refs =  {
    ulEl : document.querySelector(".trends__list"),
    liEl : document.querySelectorAll(".trends__photo"),
    backdrop : document.querySelector(".js-backdrop"),
    btnCls : document.querySelector(".js-btn-cls"),
}


refs.ulEl.addEventListener("click", openModal)

const arr = [...refs.liEl]

function openModal(event) {
if (arr.includes(event.target)) {                   //открыл модадлку
refs.backdrop.classList.remove("visually-hidden")
}
refs.backdrop.addEventListener("click", onBackdropClick);  
refs.btnCls.addEventListener("click", clsModal);
document.addEventListener('keydown', keyBoardPress);

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