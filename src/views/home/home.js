import './home.css';

var imgsx = document.querySelectorAll('li>img');
var uls = document.querySelector('ul');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
left.addEventListener('click', function () {
  if (parseInt(uls.style.left) < 0) {
    uls.style.left = parseInt(uls.style.left) + 75 + 'vw';
    // console.log(uls.style.left);
  }
});

right.addEventListener('click', function () {
  if (parseInt(uls.style.left) > -225) {
    uls.style.left = parseInt(uls.style.left) - 75 + 'vw';
  }
});

var swiper = new Swiper('.mySwiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // 设置自动轮播
  autoplay: {
    delay: 2000, // 轮播间隔时间，单位为毫秒
  },
});
