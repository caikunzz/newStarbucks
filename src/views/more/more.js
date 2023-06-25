
import './more.css';


const close = document.querySelector('.close');
close.addEventListener('click',function(){
    window.history.back();
})