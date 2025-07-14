 function toggleNavbar() {
            const navbar = document.getElementById('navbar');
            navbar.classList.toggle('active');
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Scroll navigation active link highlight
            const sections = document.querySelectorAll('main section');
            const navLinks = document.querySelectorAll('nav ul li a');
            window.addEventListener('scroll', () => {
                let current = '';
                let scrollY = window.pageYOffset;
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 80;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });

            
         
           // Toggle dark/light mode
            const modeToggle = document.getElementById('modeToggle');
            const modeIcon = document.getElementById('modeIcon');
            modeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                if (document.body.classList.contains('light-mode')) {
                    modeIcon.classList.remove('fa-sun');
                    modeIcon.classList.add('fa-moon');
                } else {
                    modeIcon.classList.remove('fa-moon');
                    modeIcon.classList.add('fa-sun');
                }
            });



            // GSAP Animations
            // Animate skill bars on entering viewport
            const skills = document.querySelectorAll('.skill');

            function isInViewport(el) {
                const rect = el.getBoundingClientRect();
                return rect.top <= window.innerHeight && rect.bottom >= 0;
            }

            function animateSkills() {
                skills.forEach(skill => {
                    if (isInViewport(skill)) {
                        const bar = skill.querySelector('.skill-bar span');
                        const level = skill.getAttribute('data-level');
                        gsap.to(bar, {
                            width: level + '%',
                            duration: 1.5,
                            ease: 'power2.out'
                        });
                    }
                });
            }
            window.addEventListener('scroll', animateSkills);
            window.addEventListener('load', animateSkills);

            // Animate project cards with fade & slide up on scroll using GSAP and ScrollTrigger
            if (gsap && gsap.utils) {
                // Wrap in try-catch to avoid errors if ScrollTrigger unavailable
                try {
                    gsap.registerPlugin(window.ScrollTrigger);
                } catch {}

                const cards = document.querySelectorAll('.project-card');
                gsap.utils.toArray(cards).forEach(card => {
                    gsap.fromTo(card, {
                        autoAlpha: 0,
                        y: 20
                    }, {
                        duration: 1,
                        y: 0,
                        autoAlpha: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                            once: true
                        }
                    });
                });
            }

            // Contact form handling with backend submission
            // const form = document.getElementById('contact-form');
            // const formMessage = form.querySelector('.form-message');
            // form.addEventListener('submit', async(e) => {
            //     e.preventDefault();
            //     formMessage.style.color = '#64ffda';
            //     formMessage.textContent = 'Sending message...';

            //     if (!form.checkValidity()) {
            //         formMessage.style.color = '#ff5555';
            //         formMessage.textContent = 'Please fill out the form correctly before submitting.';
            //         return;
            //     }

            //     const formData = {
            //         name: form.name.value.trim(),
            //         email: form.email.value.trim(),
            //         message: form.message.value.trim()
            //     };

            //     try {
            //         const response = await fetch('/contact', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify(formData)
            //         });
            //         const result = await response.json();

            //         if (response.ok && result.success) {
            //             formMessage.style.color = '#64ffda';
            //             formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            //             form.reset();
            //         } else {
            //             formMessage.style.color = '#ff5555';
            //             formMessage.textContent = result.error || 'Something went wrong, please try again later.';
            //         }
            //     } catch (error) {
            //         formMessage.style.color = '#ff5555';
            //         formMessage.textContent = 'Error sending message, please try again later.';
            //     }
            // });
        });

 const bubbleContainer = document.querySelector('.bubble-container');

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // Set random size
        const size = Math.random() * 60 + 20; // Size between 20px and 80px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Set random position
        bubble.style.left = `${Math.random() * 100}vw`; // Position across the viewport width

        // Set random animation duration
        bubble.style.animationDuration = `${Math.random() * 3 + 5}s`; // Duration between 5s and 8s

        // Set random color
        bubble.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color

        bubbleContainer.appendChild(bubble);

        // Remove bubble after animation ends
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }

    // Create bubbles at intervals
    setInterval(createBubble, 300); // Create a new bubble every 300ms

    function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
}

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopButton.style.display = 'block'; // Show button
    } else {
        scrollToTopButton.style.display = 'none'; // Hide button
    }
});

// Show the loader when the page is loading
document.getElementById('loader').style.display = 'flex';
// Hide the loader when the page has fully loaded
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});


window.addEventListener('load', () => {
    const welcomeModal = document.getElementById('welcomeModal');
    welcomeModal.style.display = 'block';

    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === welcomeModal) {
            welcomeModal.style.display = 'none';
        }
    });
});

 
document.addEventListener('DOMContentLoaded', () => {
            const title = "👋 Hi, I'm Pavan Kushwaha"; // The text to display
            const titleElement = document.getElementById("typing-effect"); // Target the h1 element
            let index = 0; // Initialize index for the text
            // Function to type the text
            function typeText() {
                if (index < title.length) {
                    titleElement.textContent += title.charAt(index); // Add the next character
                    index++; // Move to the next character
                } else {
                    // When finished typing, reset index and clear text
                    setTimeout(() => {
                        titleElement.textContent = ""; // Clear the text
                        index = 0; // Reset index
                        typeText(); // Start typing again
                    }, 1000); // Pause before starting again
                    return;
                }
                setTimeout(typeText, 100); // Call the function again after 100ms
            }
            typeText(); // Start the typing effect
        });    

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert("Right click is disabled on this website.");
  });



    