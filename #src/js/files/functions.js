var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
  ua = navigator.userAgent;
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  return is_ie;
}
if (isIE()) {
  document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
  document.querySelector('html').classList.add('_touch');
}

// Получить цифры из строки
//parseInt(itemContactpagePhone.replace(/[^\d]/g, ''))

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support === true) {
    document.querySelector('html').classList.add('_webp');
  } else {
    document.querySelector('html').classList.add('_no-webp');
  }
});

function ibg() {
  if (isIE()) {
    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
        ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
    }
  }
}
ibg();

window.addEventListener("load", function () {
  if (document.querySelector('.wrapper')) {
    setTimeout(function () {
      document.querySelector('.wrapper').classList.add('_loaded');
    }, 0);
  }
});

let unlock = true;
//=================

//ActionsOnHash
if (location.hash) {
  const hsh = location.hash.replace('#', '');
  if (document.querySelector('.popup_' + hsh)) {
    popup_open(hsh);
  } else if (document.querySelector('div.' + hsh)) {
    _goto(document.querySelector('.' + hsh), 500, '');
  }
}
//=================

//BodyLock
function body_lock(delay) {
  let body = document.querySelector("body");
  if (body.classList.contains('_lock')) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
function body_lock_remove(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove("_lock");
    }, delay);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function body_lock_add(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
//=================


//DigiFormat
function digi(str) {
  var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return r;
}
//=================


//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
  const el = popup_link[index];
  el.addEventListener('click', function (e) {
    if (unlock) {
      let item = el.getAttribute('href').replace('#', '');
      let video = el.getAttribute('data-video');
      popup_open(item, video);
    }
    e.preventDefault();
  })
}
for (let index = 0; index < popups.length; index++) {
  const popup = popups[index];
  popup.addEventListener("click", function (e) {
    if (!e.target.closest('.popup__body')) {
      popup_close(e.target.closest('.popup'));
    }
  });
}
function popup_open(item, video = '') {
  let activePopup = document.querySelectorAll('.popup._active');
  if (activePopup.length > 0) {
    popup_close('', false);
  }
  let curent_popup = document.querySelector('.popup_' + item);
  if (curent_popup && unlock) {
    if (video != '' && video != null) {
      let popup_video = document.querySelector('.popup_video');
      popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    }
    if (!document.querySelector('.menu__body._active')) {
      body_lock_add(500);
    }
    curent_popup.classList.add('_active');
    history.pushState('', '', '#' + item);
  }
}
function popup_close(item, bodyUnlock = true) {
  if (unlock) {
    if (!item) {
      for (let index = 0; index < popups.length; index++) {
        const popup = popups[index];
        let video = popup.querySelector('.popup__video');
        if (video) {
          video.innerHTML = '';
        }
        popup.classList.remove('_active');
      }
    } else {
      let video = item.querySelector('.popup__video');
      if (video) {
        video.innerHTML = '';
      }
      item.classList.remove('_active');
    }
    if (!document.querySelector('.menu__body._active') && bodyUnlock) {
      body_lock_remove(500);
    }
    history.pushState('', '', window.location.href.split('#')[0]);
  }
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
  for (let index = 0; index < popup_close_icon.length; index++) {
    const el = popup_close_icon[index];
    el.addEventListener('click', function () {
      popup_close(el.closest('.popup'));
    })
  }
}
document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape') {
    popup_close();
  }
});

//=================


//Wrap
function _wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
//========================================

//RemoveClasses
function _removeClasses(el, class_name) {
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove(class_name);
  }
}
//========================================

//IsHidden
function _is_hidden(el) {
  return (el.offsetParent === null)
}
// ShowMore Beta ========================
let moreBlocks = document.querySelectorAll('._more-block');
if (moreBlocks.length > 0) {
  let wrapper = document.querySelector('.wrapper');
  for (let index = 0; index < moreBlocks.length; index++) {
    const moreBlock = moreBlocks[index];
    let items = moreBlock.querySelectorAll('._more-item');
    if (items.length > 0) {
      let itemsMore = moreBlock.querySelector('._more-link');
      let itemsContent = moreBlock.querySelector('._more-content');
      let itemsView = itemsContent.getAttribute('data-view');
      if (getComputedStyle(itemsContent).getPropertyValue("transition-duration") === '0s') {
        itemsContent.style.cssText = "transition-duration: 1ms";
      }
      itemsMore.addEventListener("click", function (e) {
        if (itemsMore.classList.contains('_active')) {
          setSize();
        } else {
          setSize('start');
        }
        itemsMore.classList.toggle('_active');
        e.preventDefault();
      });

      let isScrollStart;
      function setSize(type) {
        let resultHeight;
        let itemsContentHeight = 0;
        let itemsContentStartHeight = 0;

        for (let index = 0; index < items.length; index++) {
          if (index < itemsView) {
            itemsContentHeight += items[index].offsetHeight;
          }
          itemsContentStartHeight += items[index].offsetHeight;
        }
        resultHeight = (type === 'start') ? itemsContentStartHeight : itemsContentHeight;
        isScrollStart = window.innerWidth - wrapper.offsetWidth;
        itemsContent.style.height = `${resultHeight}px`;
      }

      itemsContent.addEventListener("transitionend", updateSize, false);

      function updateSize() {
        let isScrollEnd = window.innerWidth - wrapper.offsetWidth;
        if (isScrollStart === 0 && isScrollEnd > 0 || isScrollStart > 0 && isScrollEnd === 0) {
          if (itemsMore.classList.contains('_active')) {
            setSize('start');
          } else {
            setSize();
          }
        }
      }
      window.addEventListener("resize", function (e) {
        if (!itemsMore.classList.contains('_active')) {
          setSize();
        } else {
          setSize('start');
        }
      });
      setSize();
    }
  }
}


