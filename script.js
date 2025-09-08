// Dynamic Text Changing
const dynamicText = document.getElementById('dynamic-text');
const textArray = ["B.Tech Graduate", "Developer", "Software Engineer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeText() {
    const currentText = textArray[index];
    
    if (isDeleting) {
        dynamicText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeText, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index++;
        if (index === textArray.length) {
            index = 0;
        }
        setTimeout(typeText, 500);
    } else {
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeText, speed);
    }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Highlight active section in sidebar
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.querySelector('.sidebar');
    
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
});

