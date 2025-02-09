document.addEventListener('DOMContentLoaded', function() {
    // Кнопка прокрутки наверх
    const scrollButton = document.getElementById('scrollToTop');
    
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    };

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Мобильное меню
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Обработка формы
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            description: document.getElementById('description').value
        };

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
            } else {
                throw new Error('Что-то пошло не так');
            }
        } catch (error) {
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
            console.error('Error:', error);
        }
    });
}); 