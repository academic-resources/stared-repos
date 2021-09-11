window.addEventListener('load', (event) => {
    const footer = document.getElementById('footer');
    const footerContainer = document.getElementById('footer-container');
    footerContainer.style.paddingBottom = `${footer.clientHeight}px`;
    window.addEventListener('resize', (event) => {
        footerContainer.style.paddingBottom = `${footer.clientHeight}px`;
    });
});
