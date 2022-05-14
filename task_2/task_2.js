const btnIkon = document.querySelector('.btn-ikon');
const button = document.querySelector('button');
const arrowWhite = btnIkon.innerHTML;
const arrowBlack = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewbox="0 0 16 16">
<path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
</svg>`;

let i = 0;
button.addEventListener('click', () => {
    if (i % 2 == 0) {
        btnIkon.innerHTML = arrowBlack;
    } else {
        btnIkon.innerHTML = arrowWhite;
    }
    i++;
})