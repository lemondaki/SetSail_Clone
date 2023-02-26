const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const barprogress = $$('.bar__chart-content1');
const chartPercent = $$('.tour__chart-percent');
const wineDataNumber = $$('.wine-traditional__quantity');
const upToTop = $('.upToTop');
const slide = $$('.slide-page');
const nextBtn = $('.slide-page__icon-block-right');
const prevBtn = $('.slide-page__icon-block-left');
const userBtn = $('.header__navbar-user');
const userBtnMoblie = $('.header__navbar-mobile-user');
const modal = $('.modal');
const modalOverlay = $('.modal__overlay');
const formLogin = $('.modal__body');
const barMoblieBtn = $('.bar-mobile-hamberger');
const loginBlock = $$('.login__block');
const form = $$('.form__common');
const navbarMobile = $('.navbar-main-mobile');
const navbarMainList = $('.navbar-main__list');

/* Function Handle Slider */
const maxSlide = slide.length;
let curSlide = 0;
const goToSlide = function (curSlide) {
    slide.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
}
nextBtn.addEventListener('click', function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
})
prevBtn.addEventListener('click', function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
})
const init = function () {
    goToSlide(curSlide)
}
init();


/* Function Handle Open/Close Modal */
let isModal = false;
userBtnMoblie.addEventListener('click', function () {
    if (isModal) {
        modal.style.display = 'none';
        isModal = false;
    } else {
        modal.style.display = 'block';
        isModal = true;
    }
})
modalOverlay.addEventListener('click', function () {
    modal.style.display = 'none';
    isModal = false;
})
userBtn.addEventListener('click', function () {
    modal.style.display = 'block';
})
loginBlock.forEach((el, i) => el.addEventListener('click', function (e) {
    $('.block--active').classList.remove('block--active');
    form.forEach(form => form.classList.add('form--hidden'));
    if (!e.target) return;
    const target = e.target.closest('.login__block');
    target.classList.add('block--active');
    form[i].classList.remove('form--hidden');
}))
let isOpenNav = false;
barMoblieBtn.addEventListener('click', function () {
    if (isOpenNav) {
        navbarMobile.style.display = 'none';
        isOpenNav = false;
    } else {
        navbarMobile.style.display = 'block';
        isOpenNav = true;
    }
})
let isClick = false;
navbarMainList.addEventListener('click', function (e) {
    if (isClick) {
        if (e.target.classList.contains('box__main-item')) {
            const target = e.target.parentElement;
            target.querySelector('.subnav-main').style.opacity = 0;
            target.querySelector('.subnav-main').style.height = '0';
            isClick = false;
        }
    }
    else {
        if (e.target.classList.contains('box__main-item')) {
            const target = e.target.parentElement;
            target.querySelector('.subnav-main').style.opacity = 1;
            target.querySelector('.subnav-main').style.height = `${700}px`;
            isClick = true;
        }
    }
})

/* Function handle print Number */
const printNumber = function (El,number,index,time,unit='') {
    for (let i = 0; i <= number; i++) {
        setTimeout(function () {
            Array.from(El)[index].innerHTML = `${i}${unit}`;
        }, i * time);
    }
}


/* Function Handle Display Percent % With Observer Element target to View */
let count = 0, cnt=0;
const callback = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting || count) return;
    barprogress.forEach((bar, index) => {
        const percent = bar.dataset.percent;
        bar.style.opacity = 1;
        bar.style.width = `${percent}%`;
        printNumber(chartPercent, percent, index, 20, '%');
    })
    count++;
}

const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0
});
const targetElement = document.querySelector('.rice-field');
observer.observe(targetElement);


/* Function handle show wine number quantity */
const callbackWine = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting || cnt) return;
    wineDataNumber.forEach((wine, index) => {
        const quantity = wine.dataset.quantity;
        printNumber(wineDataNumber,quantity, index,5);
    })
    cnt++;
}

const observerWine = new IntersectionObserver(callbackWine, {
    root: null,
    threshold: 0
});
const targetWine = $('.wine-traditional')
observerWine.observe(targetWine);


/* function handle go to top page*/
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 2500) upToTop.style.display = 'flex';
    else upToTop.style.display = 'none';
})
upToTop.addEventListener('click', function (e) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
})
