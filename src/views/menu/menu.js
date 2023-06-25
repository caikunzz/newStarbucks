import './menu.css'
let list;
let beverag = ['饮料', '美食', '咖啡商品', '商品'];
let beverage = [
  '星巴克玩味冰调™',
  '手工调制浓缩咖啡',
  '星冰乐®',
  '茶瓦纳™',
  '经典巧克力饮品',
  '咖啡融合冰淇淋',
  '星巴克冷萃咖啡系列',
  '气致™冷萃咖啡',
];
let delicacy = [
  '烘培',
  '蛋糕&甜品',
  '三明治、帕尼尼、卷',
  '酸奶',
  '其他美食',
  '早安新一天',
];
let coffee = ['咖啡豆', '星巴克VIA® 免煮咖啡', '星巴克臻选™咖啡', 'Origami™'];
let commodity = ['常规商品', '臻选产品'];
let menu = [
  '咖啡融合冰淇淋',
  '星巴克冷萃咖啡系列',
  '手工调制浓缩咖啡',
  '星冰乐®',
  '气致™冷萃咖啡',
  '经典巧克力饮品',
  '茶瓦纳™',
  '深度烘焙',
  '中度烘焙',
  '星巴克VIA® Black',
  '星巴克VIA® Dairy',
  '深度烘焙',
  '中度烘焙',
  '烘培',
  '蛋糕&甜品',
  '其他美食',
  '三明治、帕尼尼、卷',
  '酸奶',
  '常规产品',
  '臻选产品',
];
const parent = document.querySelector('section');
const ul = document.querySelector('.head_ul');
window.addEventListener('resize', () => {
  let mylis = document.querySelectorAll('.section_ul>li');
  if (document.documentElement.clientWidth > 640) {
    for (let i = 0; i < list.length; i++) {
      mylis[i].style.width = '33.3333333%';
      list[i].style.height = list[i].offsetWidth + 'px';
    }
  } else {
    for (let i = 0; i < list.length; i++) {
      mylis[i].style.width = '45%';
      list[i].style.height = list[i].offsetWidth + 'px';
    }
  }
});
const xhr = new XMLHttpRequest(); // 创建 XMLHttpRequest 对象
const url = './76b83667746aab581db3.json'; // 远程数据的 URL 地址
let arr = []; //json数据
xhr.open('GET', url);
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 判断请求是否成功完成
    const data = JSON.parse(xhr.responseText); // 解析服务器返回的数据
    // 将数据显示在页面上
    for (let key in data) {
      arr.push({ data: data[key] });
    }
    const menus = new Menu(arr);
    menus.click();
    menus.left();
    menus.newlist(0, 5, menu[0]);
    for (let i = 1; i < menu.length; i++) {
      menus.newlist(i * 6, (i + 1) * 6 - 1, menu[i]);
    }
    parent.removeChild(parent.lastElementChild);
  }
  list = document.querySelectorAll('.caption_div');
  for (let i = 0; i < list.length; i++) {
    list[i].style.height = list[i].offsetWidth + 'px';
  }
};
class Menu {
  constructor(arr) {
    this.arr = arr;
  }
  newlist(index, endIndex, string) {
    const box = document.createElement('div');
    const hr = document.createElement('hr');
    box.classList.add('box');
    const h3 = document.createElement('h3');
    h3.textContent = string;
    h3.classList.add('caption');
    const ul = document.createElement('ul');
    ul.classList.add('section_ul');
    for (let i = index; i <= endIndex; i++) {
      let { title, preview } = this.arr[i].data;
      const li = document.createElement('li');
      const div = document.createElement('div');
      div.classList.add('caption_div');
      div.style.backgroundImage = `url('https://www.starbucks.com.cn${preview}')`;
      const p = document.createElement('p');
      p.textContent = title;
      li.appendChild(div);
      li.appendChild(p);
      ul.appendChild(li);
    }
    box.appendChild(h3);
    box.appendChild(ul);
    parent.appendChild(box);
    parent.appendChild(hr);
  }
  newmenu(index, endIndex, arr) {
    const li = document.createElement('li');
    li.innerText = '全部';
    li.classList.add('bor');
    ul.appendChild(li);
    for (let i = index; i <= endIndex; i++) {
      const li = document.createElement('li');
      li.innerText = arr[i];
      ul.appendChild(li);
    }
  }
  click() {
    ul.innerHTML = '';
    this.newmenu(0, 3, beverag);
    let li = document.querySelectorAll('.head_ul>li');
    let head = document.querySelector('.menuss');
    let selt = this;
    for (let i = 1; i <= 4; i++) {
      li[i].addEventListener('click', function () {
        document.querySelector('#left').style.display = 'block';
        head.innerText = li[i].innerText;
        parent.innerHTML = '';
        ul.innerHTML = '';
        if (head.innerText == '饮料') {
          selt.newmenu(0, beverage.length - 1, beverage);
          selt.mouse();
          selt.newmenuss(0, beverage);
          selt.liClick(0, beverage);
        } else if (head.innerText == '美食') {
          selt.newmenu(0, delicacy.length - 1, delicacy);
          selt.mouse();
          selt.newmenuss(49, delicacy);
          selt.liClick(49, delicacy);
        } else if (head.innerText == '咖啡商品') {
          selt.newmenu(0, coffee.length - 1, coffee);
          selt.mouse();
          selt.newmenuss(85, coffee);
          selt.liClick(85, coffee);
        } else if (head.innerText == '商品') {
          selt.newmenu(0, commodity.length - 1, commodity);
          // selt.mouse();
          selt.newmenuss(100, coffee);
          selt.liClick(100, coffee);
        }
      });
    }
  }
  mouse() {
    let flag = false;
    let startX;
    let x = 0;
    let offsetX;
    let fi;
    ul.style.marginLeft = '0px';
    ul.addEventListener('touchstart', function (event) {
      flag = true;
      startX = event.touches[0].clientX;
    });
    ul.addEventListener('touchmove', function (event) {
      if (
        ul.lastElementChild.getBoundingClientRect().right <=
        window.innerWidth &&
        ul.lastElementChild.getBoundingClientRect().right >
        window.innerWidth - 10
      ) {
        fi = ul.firstElementChild.getBoundingClientRect().left + -15;
      }
      if (flag) {
        offsetX = event.touches[0].clientX - startX;
        ul.style.marginLeft = x + offsetX + 'px';
        if (fi == undefined && document.querySelector('.menuss').innerText == '菜单') {
          ul.style.marginLeft = '0px';
        } else if (parseFloat(ul.style.marginLeft) >= 0) {
          ul.style.marginLeft = '0px';
        } else if (
          ul.lastElementChild.getBoundingClientRect().right <= window.innerWidth
        ) {
          ul.style.marginLeft = fi +  'px'
          console.log(fi)
        }
      }
    });
    document.addEventListener('touchend', function () {
      flag = false;
      x = parseFloat(ul.style.marginLeft);
    });
  }
  left() {
    let that = this;
    document.querySelector('#left').addEventListener('click', function () {
      document.querySelector('#left').style.display = 'none';
      document.querySelector('.menuss').innerText = '菜单';
      that.click();
      ul.style.marginLeft = '0px';
      that.newlist(0, 5, menu[0]);
      for (let i = 1; i < menu.length; i++) {
        that.newlist(i * 6, (i + 1) * 6 - 1, menu[i]);
      }
      parent.removeChild(parent.lastElementChild);
      list = document.querySelectorAll('.caption_div');
      for (let i = 0; i < list.length; i++) {
        list[i].style.height = list[i].offsetWidth + 'px';
      }
    });
  }
  liClick(index, arr) {
    let li = document.querySelectorAll('.head_ul>li');
    let that = this;
    for (let i = 0; i < li.length; i++) {
      li[i].addEventListener('click', function () {
        for (let i = 0; i < li.length; i++) {
          li[i].classList.remove('bor');
        }
        this.classList.add('bor');
        if (i == 0) {
          that.newmenuss(index, arr)
        } else {
          parent.innerHTML = '';
          that.newlist(i * 6 + index, (i + 1) * 6 - 1 + index, arr[i - 1]);
          parent.removeChild(parent.lastElementChild);
          list = document.querySelectorAll('.caption_div');
          for (let i = 0; i < list.length; i++) {
            list[i].style.height = list[i].offsetWidth + 'px';
          }
        }
      });
    }
  }
  newmenuss(index, arr) {
    parent.innerHTML = '';
    for (let i = 1; i < arr.length; i++) {
      this.newlist(i * 6 + index, (i + 1) * 6 - 1 + index, arr[i - 1]);
    }
    parent.removeChild(parent.lastElementChild);
    list = document.querySelectorAll('.caption_div');
    for (let i = 0; i < list.length; i++) {
      list[i].style.height = list[i].offsetWidth + 'px';
    }
  }
}
