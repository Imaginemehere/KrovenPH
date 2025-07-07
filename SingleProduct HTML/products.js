const white = document.getElementById('white');
const black = document.getElementById('black');


if (white) {
    bar.addEventListener('click', () => {
        nav.classList.add('white')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}


cons