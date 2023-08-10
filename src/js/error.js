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