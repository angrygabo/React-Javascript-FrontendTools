import { useEffect } from 'react';

function RevealBoxes() {

     useEffect(() => {

        const revealBoxes = document.querySelectorAll('.reveal');

        if (revealBoxes.length > 0 ) {
            const callback = (el) => {
                el.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    setTimeout(() => {
                        if (entry.target.classList.contains('in')) {
                            entry.target.classList.remove('reveal');
                        }
                    }, 1000);
                }
                });
            };

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver(callback, observerOptions);
            
            revealBoxes.forEach((el, i) => {
                observer.observe(el);
                el.style.transitionDelay = '.' + i + 's';
            });
           
        }

    }, []);

    return null;
}   

export default RevealBoxes;