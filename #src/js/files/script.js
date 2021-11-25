// 'use strict';
document.addEventListener('DOMContentLoaded', () => {
  main_logo.href = document.location.protocol+"//"+document.location.host
});


const iconMenu = document.querySelector(".icon-menu");
const body = document.querySelector("body");
const menuBody = document.querySelector(".mob-menu");
const menuListItemElems = document.querySelector(".mob-menu__list");
const mobsearch = document.querySelector(".header__mob-search-btn");
const headsearch = document.querySelector(".header__search-mob");

//BURGER
if (iconMenu) {
  iconMenu.addEventListener("click", function () {
    iconMenu.classList.toggle("active");
    body.classList.toggle("_lock");
    menuBody.classList.toggle("active");
  });
}

// Закрытие моб меню при клике на якорную ссылку
if (menuListItemElems) {
  menuListItemElems.addEventListener("click", function () {
    iconMenu.classList.toggle("active");
    body.classList.toggle("_lock");
    menuBody.classList.toggle("active");
  });
}


// Закрытие моб меню при клике вне области меню 
window.addEventListener('click', e => { // при клике в любом месте окна браузера
  const target = e.target // находим элемент, на котором был клик
  if (!target.closest('.icon-menu') && !target.closest('.mob-menu') && !target.closest('.header__mob-search-btn') && !target.closest('.header__search-mob') && !target.closest('._popup-link') && !target.closest('.popup')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
    iconMenu.classList.remove('active') // то закрываем окно навигации, удаляя активный класс
    menuBody.classList.remove('active')
    body.classList.remove('_lock')
    // headsearch.classList.remove('_active')
  }
})

// Плавная прокрутка
const smotScrollElems = document.querySelectorAll('a[href^="#"]:not(a[href="#"])');

smotScrollElems.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    console.log(event);

    const id = link.getAttribute('href').substring(1)
    console.log('id : ', id);

    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  })
});


