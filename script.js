document.addEventListener('DOMContentLoaded', function() {
    const singleCover = document.getElementById('singleCover');
    const openBookBtn = document.getElementById('openBookBtn');
    const bookContainer = document.getElementById('bookContainer');
    const book = document.getElementById('book');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const backCover = document.querySelector('.back-cover');
    const closeBookBtn = document.getElementById('closeBookBtn');
    
    let currentPage = 0;
    const totalPages = pages.length;
    let isBookOpen = false;
    
    // Inicializar
    function initializeBook() {
        pages.forEach((page, index) => {
            if(index === 0) {
                page.classList.add('active');
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = '10';
            } else {
                page.classList.remove('active');
                page.style.transform = 'rotateY(180deg)';
                page.style.zIndex = (totalPages - index);
            }
        });
        currentPage = 0;
        isBookOpen = false;
        singleCover.style.display = 'flex';
        bookContainer.style.display = 'none';
        singleCover.style.opacity = '1';
        singleCover.style.transform = 'rotateY(0deg)';
    }
    
    initializeBook();
    
    // Event listeners
    openBookBtn.addEventListener('click', openBook);
    prevBtn.addEventListener('click', goToPrevPage);
    nextBtn.addEventListener('click', goToNextPage);
    closeBookBtn.addEventListener('click', closeBook);
    
    // Abrir libro
    function openBook() {
        singleCover.style.transform = 'rotateY(-160deg)';
        singleCover.style.opacity = '0';
        
        setTimeout(() => {
            singleCover.style.display = 'none';
            bookContainer.style.display = 'flex';
            bookContainer.style.opacity = '1';
            isBookOpen = true;
            
            // Mostrar reflejo si estamos en la contraportada
            if(currentPage === totalPages - 1) {
                backCover.classList.add('reflection');
            }
        }, 500);
    }
    
    // Cerrar libro
    function closeBook() {
        bookContainer.style.opacity = '0';
        bookContainer.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            initializeBook();
        }, 500);
    }
    
    // Página siguiente
    function goToNextPage() {
        if(currentPage < totalPages - 1) {
            // Quitar reflejo si estamos saliendo de la contraportada
            if(currentPage === totalPages - 2) {
                backCover.classList.remove('reflection');
            }
            
            pages[currentPage].style.transform = 'rotateY(-180deg)';
            currentPage++;
            pages[currentPage].classList.add('active');
            pages[currentPage].style.transform = 'rotateY(0deg)';
            pages[currentPage].style.zIndex = '10';
            
            // Añadir reflejo si llegamos a la contraportada
            if(currentPage === totalPages - 1) {
                backCover.classList.add('reflection');
            }
            
            animatePageTurn();
        }
    }
    
    // Página anterior
    function goToPrevPage() {
        if(currentPage > 0) {
            // Quitar reflejo si estamos en la contraportada
            if(currentPage === totalPages - 1) {
                backCover.classList.remove('reflection');
            }
            
            pages[currentPage].style.transform = 'rotateY(180deg)';
            currentPage--;
            pages[currentPage].style.transform = 'rotateY(0deg)';
            pages[currentPage].style.zIndex = '10';
            
            // Añadir reflejo si volvemos a la contraportada
            if(currentPage === totalPages - 2) {
                backCover.classList.add('reflection');
            }
            
            // No permitir volver a la portada inicial
            if(currentPage === 0) {
                currentPage = 1;
                pages[0].style.transform = 'rotateY(-180deg)';
                pages[1].style.transform = 'rotateY(0deg)';
            }
            
            animatePageTurn();
        }
    }
    
    // Animación de doblez
    function animatePageTurn() {
        const activePage = document.querySelector('.page.active');
        if(activePage) {
            const corner = activePage.querySelector('.page-corner');
            if(corner) {
                corner.style.borderWidth = '0 40px 40px 0';
                setTimeout(() => {
                    corner.style.borderWidth = '0 30px 30px 0';
                }, 300);
            }
        }
    }
    
    // Soporte para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    bookContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    bookContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if(touchEndX < touchStartX - 50) {
            goToNextPage();
        }
        if(touchEndX > touchStartX + 50) {
            goToPrevPage();
        }
    }
});