let btn = document.querySelectorAll('.btn');
let carro = document.querySelectorAll('.content_carro');
let arrowLeft = document.querySelector('.left');
let arrowRight = document.querySelector('.right');
btn[0].classList.add('active_btn');
let i = 0;
function changeLeft() {
    carro[0].classList.remove('holder');
    carro.forEach(item => {
        item.classList.remove('active_carro');
    });
    if (i <= 0) {
        i = carro.length;
    }
    i--;
    carro[i].classList.add('active_carro');
    btn.forEach(item => {
        item.classList.remove('active_btn');
    });
    btn[i].classList.add('active_btn');
};
function changeRight() {
    carro[0].classList.remove('holder');
    carro.forEach(item => {
        item.classList.remove('active_carro');
    });
    i++;
    if (i >= carro.length) {
        i = 0;
    }
    carro[i].classList.add('active_carro');
    btn.forEach(item => {
        item.classList.remove('active_btn');
    });
    btn[i].classList.add('active_btn');
};
function changeImage(index) {
    carro[0].classList.remove('holder');
    carro.forEach(item => {
        item.classList.remove('active_carro');
    });
    btn.forEach(item => {
        item.classList.remove('active_btn');
    });
    carro[index].classList.add('active_carro');
    btn[index].classList.add('active_btn');
    i = index;
};
btn.forEach((item, index) => {
    item.addEventListener('click', function() {
        changeImage(index);
    });
});
arrowLeft.addEventListener('click', changeLeft);
arrowRight.addEventListener('click', changeRight);
let todasImagens = document.querySelectorAll('img');
let mudarImagem = {
    para: function(tela) {
        this.todasImagens.forEach(item => {
            item.setAttribute('screen', tela);
        });
    },
    size: todasImagens.forEach(item => {
        item.getAttribute('screen');
    }),
};
