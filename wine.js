var barprogress = document.querySelectorAll('.bar__chart-content1')
var chartPercent = document.querySelectorAll('.tour__chart-percent')
var wineDataNumber = document.querySelectorAll('.wine-traditional__quantity')
var upToTop = document.querySelector('.upToTop')
var slider = document.querySelector('.slider')
var nextBtn = document.querySelector('.slide-page__icon-block-right')
var prevBtn = document.querySelector('.slide-page__icon-block-left')
var userBtn = document.querySelector('.header__navbar-user')
var userBtnMoblie = document.querySelector('.header__navbar-mobile-user')
var modal = document.querySelector('.modal')
var modalOverlay = document.querySelector('.modal__overlay')
var formLogin = document.querySelector('.modal__body')
var barMoblieBtn = document.querySelector('.bar-mobile-hamberger')
var counters = Array(barprogress.length)
var intervals = Array(counters.length)
const isTextPercent = false;
document.onscroll = function () {
    myfunction();
    myShowDataWine()
}
//! Function xử lý show barprogress tours popular
function myfunction() {
    setTimeout(function () {
        if (document.body.scrollTop > 720 || document.documentElement.scrollTop > 720) {
            for (var i = 0; i < barprogress.length; i++) {
                if (barprogress[i].style.width == 0 && barprogress[i].style.opacity == 0) {
                    barprogress[i].style.width = barprogress[i].dataset.percent + '%';
                    barprogress[i].style.opacity = 1;
                }
            }
            Array.from(barprogress).map((number, index) => {
                counters[index] = 0;
                intervals[index] = setInterval(function () {
                    if (chartPercent[index].textContent != `${number.dataset.percent}` + '%') {
                        if (counters[index] <= number.dataset.percent) {
                            chartPercent[index].innerHTML = counters[index] + '%';
                            chartPercent[index].style.opacity = 1;
                            counters[index]++;
                        }
                        else {
                            clearInterval(intervals[index]);
                        }
                    }
                }, 30)
            })
        }
    }, 800)
}

//! Function xử lý show data-number of wine tours:
var countNumber = Array(wineDataNumber.length)
var intervalsNumber = Array(countNumber.length)
function myShowDataWine() {
    if (window.scrollY > 2672 || document.documentElement.scrollTop > 2672) {
        console.log(window.scrollY)
        Array.from(wineDataNumber).map((wineData, index) => {
            countNumber[index] = 0;
            intervalsNumber[index] = setInterval(function () {
                if (wineData.textContent != (wineData.dataset.number)) {
                    if (countNumber[index] <= wineData.dataset.number) {
                        wineData.innerHTML = countNumber[index];
                        wineData.style.opacity = 1;
                        countNumber[index] += 2;
                    }
                    else {
                        clearInterval(intervalsNumber[index]);
                    }
                }
            }, 30)
        })
    }
}

//! Function xử lý scroll to Top:
$(document).scroll(function () {
    if ($(this).scrollTop() >= 1700) {
        $(".upToTop").css("display", "flex");
    } else {
        $(".upToTop").css("display", "none");
    }
});
upToTop.onclick = function ScrollToTop() {
    $("html, body").animate({ scrollTop: "0" });
}
//SlideShow
let currentPositon = 0;
var index = 0;
nextSlide = function () {
    var slideBlock = document.querySelectorAll('.slider__block')
    var sliderItemWidth = slideBlock[0].offsetWidth;
    if (index >= slideBlock.length - 1) {
        index = slideBlock.length - 1;
        return
    }
    currentPositon = currentPositon - sliderItemWidth;
    slider.style = `transform: translateX(${currentPositon}px)`;
    document.querySelector('.slider').style.transition = "all 0.7s ease-in-out";
    index++;
    $(window).resize(function () {
        currentPositon = 0;
        slider.style = `transform: translateX(${currentPositon}px)`;
        document.querySelector('.slider').style.transition = "all 0.7s ease-in-out";
        index = 0;
    });
}

function prevSlide() {
    var slideBlock = document.querySelectorAll('.slider__block')
    var sliderItemWidth = slideBlock[0].offsetWidth;
    if (index <= 0) {
        index = 0;
        return;
    }
    currentPositon = currentPositon + sliderItemWidth;
    slider.style = `transform: translateX(${currentPositon}px)`;
    document.querySelector('.slider').style.transition = "all 0.7s ease-in-out";;
    index--;
}
//! Function xử lý show slider:
nextBtn.onclick = function sliderShow() {
    handleChangeSlide(1)
}
prevBtn.onclick = function () {
    handleChangeSlide(-1)
}
function handleChangeSlide(direction) {
    if (direction == 1) {
        nextSlide()
    }
    else if (direction == -1) {
        prevSlide()
    }
}
//! Function show form Login:
userBtn.onclick = function () {
    modal.style.display = 'block';
}
formLogin.onclick = function (e) {
    e.stopPropagation()
}
var isshowModal = false;
userBtnMoblie.onclick = function () {
    document.querySelector('.navbar-main-mobile').style.display = 'none';
    if(isshowModal){
        modal.style.display = 'none';
        isshowModal=false;
    }
    else {
        modal.style.display = 'block';
        isshowModal = true;
    }
}

modal.onclick = function () {
    modal.style.display = 'none';
    isshowModal = false;
}
//! Function show navbar-main mobile and tablet:
var isShowMobileBar = false;
barMoblieBtn.onclick =  function showNavbarMain(){
    document.querySelector('.overlay-mobile').style.display='block';
    if(isShowMobileBar){
        document.querySelector('.navbar-main-mobile').style.display = 'none';
        isShowMobileBar=false;
    }
    else {
        document.querySelector('.navbar-main-mobile').style.display='block';
        isShowMobileBar=true;
       window.onresize = function(){
           if (document.documentElement.clientWidth > 1024){
               document.querySelector('.navbar-main-mobile').style.display = 'none';
               isShowMobileBar = false;
           }
       }
    }
}
document.querySelector('.overlay-mobile').onclick = function(){
    document.querySelector('.navbar-main-mobile').style.display = 'none';
    document.querySelector('.overlay-mobile').style.display = 'none';
    isShowMobileBar = false;
}
//!Function show subnav bar main:
document.querySelector('.navbar-main__list').onclick = function (e) {
    var CategoryItemNode = e.target.closest('.navbar-main__catagory')
    if (e.target.classList.contains('box__main-item')){
    CategoryItemNode.querySelector('.testt').classList.toggle('newsubnav-main')
    CategoryItemNode.querySelector('.testt').classList.toggle('subnav-main')
    }
}
