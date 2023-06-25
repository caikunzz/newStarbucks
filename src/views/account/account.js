
import './account.css';



const userInp = document.querySelector("#username");
const pwdInp = document.querySelector("#password");

userInp.addEventListener('focus', function () {
    this.nextElementSibling.classList.add('ts_top');
    this.classList.add('border_bottom');
    this.placeholder = '';
    this.nextElementSibling.style = ''
})

userInp.addEventListener('blur', function () {
    this.nextElementSibling.classList.remove('ts_top');
    this.classList.remove('border_bottom');
    if (this.value) {
        this.nextElementSibling.style = 'display:none'
    }
})

pwdInp.addEventListener('focus', function () {
    this.nextElementSibling.classList.add('ts_top');
    this.classList.add('border_bottom');
    this.placeholder = '';
    this.nextElementSibling.style = ''
})

pwdInp.addEventListener('blur', function () {
    this.nextElementSibling.classList.remove('ts_top');
    this.classList.remove('border_bottom');
    if (this.value) {
        this.nextElementSibling.style = 'display:none'
    }
})


const imgNode = document.querySelector("#show");
let flag = true;
imgNode.addEventListener('click', function () {
    if (flag) {
        this.src = 'https://www-static.chinacdn.starbucks.com.cn/prod/assets/icons/icon-show-password.svg'
        pwdInp.type = 'text';
    } else {
        this.src = "https://www-static.chinacdn.starbucks.com.cn/prod/assets/icons/icon-hide-password.svg"
        pwdInp.type = 'password';
    }
    flag = !flag
})


const lab = document.querySelector(".rem-left div");
console.log(lab)
let flag1 = true;
lab.addEventListener('click', function () {
    if (flag1) {
        this.classList.add('bgc')
        this.firstElementChild.style = 'opacity:1'
    } else {
        this.classList.remove('bgc')
        this.firstElementChild.style = ''
    }
    flag1 = !flag1;
})



const tar = document.querySelector(".tar");
const drp = document.querySelector(".drp");
const mask = document.querySelector('.mask')
const slider = document.querySelector('.slider')

var flag2 = false; // 标记是否正在进行拖拽
var touchOffset = { x: 0, y: 0 }; // 记录触摸点和元素位置的差值
let drpwidth = drp.offsetWidth;
let prewidth = drp.parentNode.offsetWidth;
let tarprewidth = tar.parentNode.offsetWidth;
drp.addEventListener('touchstart', function (event) {
    flag2 = true;

    var touch = event.targetTouches[0];
    // 计算触摸点和元素位置的差值
    touchOffset.x = touch.clientX - drp.offsetLeft;
});

document.addEventListener('touchmove', function (event) {

    if (flag2) {
        var touch = event.targetTouches[0];
        // 设置拖拽元素的位置
        if ((touch.clientX - touchOffset.x) < 0) {
            drp.style.left = 0 + 'px';
        } else if ((touch.clientX - touchOffset.x) > prewidth - drpwidth) {
            drp.style.left = prewidth - drpwidth + 'px';
        } else {
            drp.style.left = (touch.clientX - touchOffset.x) + 'px';
            tar.style.left = (touch.clientX - touchOffset.x) + 'px';
        }

    }
});

document.addEventListener('touchend', function (event) {
    flag2 = false;
    if (tar.offsetLeft > 100 && tar.offsetLeft < 120) {
        tar.style.left = '115px';
        mask.style = 'display:flex';
        setTimeout(function () {
            mask.style = 'display:none';
            slider.innerHTML = `
            <div class="binggo">
            <img src="cons/icon-checked.svg" alt="">
            <span>已验证</span>
          </div>
                        `
        slider.style='display:flex;justify-content: center;align-items: center;'
        }, 1000)
    }
});
