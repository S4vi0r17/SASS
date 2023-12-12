const images = document.querySelectorAll('.property__image');

window.addEventListener('scroll', (evt) => {
    let scroll = this.scrollY / -14
    images.forEach(img => {
        // if (scroll < -80) {
        //     scroll += 80;
        // } Mobile
        img.style.backgroundPositionY = `${scroll}px`;
    });
});