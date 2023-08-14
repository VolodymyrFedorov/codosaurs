import * as modalMobile from '../js/header-modal.js';

const navRefs = {
  navHome: document.querySelector('#nav_home'),
  navLib: document.querySelector('#nav_lib'),
  navCat: document.querySelector('#nav_cat'),
  navHomeMob: document.querySelector('#nav_home_mob'),
  navLibMob: document.querySelector('#nav_lib_mob'),
  navCatMob: document.querySelector('#nav_cat_mob'),
};
document.addEventListener('DOMContentLoaded', ()=> {
  const checkbox = document.querySelector("input[type='checkbox']");
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'ligth') {
    checkbox.checked = true;
    document.body.classList.add('ligth-mode');
    applyThemeStyles();
  }

  checkbox.addEventListener('change', function () {
    const theme = checkbox.checked ? 'ligth' : 'dark';
    document.body.classList.toggle('ligth-mode', checkbox.checked);
    localStorage.setItem('theme', theme);
    applyThemeStyles();
  });
  pageNavSelector();
});

function applyThemeStyles() {
  document.body.classList.contains('ligth-mode') ? 'ligth' : 'dark';
}

function pageNavSelector() {
  if (window.location.href.includes('/index.html')) {
    navRefs.navHome.classList.add('current-page');
    navRefs.navHomeMob.classList.add('current-page');

    navRefs.navLib.classList.remove('current-page');
    navRefs.navLibMob.classList.remove('current-page');

    navRefs.navCat.classList.remove('current-page');
    navRefs.navCatMob.classList.remove('current-page');
  }
  if (window.location.href.includes('/catalog.html')) {
    navRefs.navHome.classList.remove('current-page');
    navRefs.navHomeMob.classList.remove;

    navRefs.navLib.classList.remove('current-page');
    navRefs.navLibMob.classList.remove('current-page');

    navRefs.navCat.classList.add('current-page');
    navRefs.navCatMob.classList.add('current-page');
  }
  if (window.location.href.includes('/myLibrary.html')) {
    navRefs.navHome.classList.remove('current-page');
    navRefs.navHomeMob.classList.remove('current-page');

    navRefs.navLib.classList.add('current-page');
    navRefs.navLibMob.classList.add('current-page');

    navRefs.navCat.classList.remove('current-page');
    navRefs.navCatMob.classList.remove('current-page');
  }
}
