document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon();
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Save theme preference
        const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
        localStorage.setItem('theme', currentTheme);
        
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Typewriter Effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['websites', 'web apps', 'UI/UX designs'];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Initialize the typewriter effect on DOM load
    document.addEventListener("DOMContentLoaded", function () {
        if (textArray.length) setTimeout(type, newTextDelay + 250);
    });
    
    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        });
    }
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            const fill = bar.querySelector('.bar-fill');
            fill.style.width = percent;
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                if (entry.target.classList.contains('skill-bars')) {
                    animateSkills();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (statsSection) {
        const stats = statsSection.querySelector('.stats');
        const skillBarsContainer = statsSection.querySelector('.skill-bars');
        
        if (stats) observer.observe(stats);
        if (skillBarsContainer) observer.observe(skillBarsContainer);
    }
    
    // Initialize Swiper Testimonials
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.querySelector('.projects-grid');
    
    // Load projects from JSON (simulated)
    const projects = [
        {
            id: 1,
            title: 'Text to Speech converter',
            category: 'web',
            image: 'images/text.png',
            description: 'A fully functional text to speech converter web app with multiple voices and languages.',
            link: 'https://shlok-ai-speaker.netlify.app/',
            details: "https://github.com/Shlok-Vertex/Text-Speaker.git"
        },
        {
            id: 2,
            title: 'Todo List App',
            category: 'web',
            image: 'images/list.png',
            description: 'A productivity app for managing tasks with features like due dates and categories.',
            link: 'https://shlok-list-app.netlify.app/',
            details: "https://github.com/Shlok-Vertex/React-Todo-list.git"
        },
        {
            id: 3,
            title: 'Weather App',
            category: 'app',
            image: 'images/weather.png',
            description: 'Modern weather app providing real-time weather updates and forecasts.',
            link: 'https://shlok-weather-app.netlify.app/',
            details: "https://github.com/Shlok-Vertex/Weather-app.git"
        },
        {
            id: 4,
            title: 'Code Editor Website',
            category: 'web',
            image: 'images/code.png',
            description: 'Modern code editing  website with syntax highlighting and live preview features.',
            link: 'https://shlok-code.netlify.app/',
            details: "https://github.com/Shlok-Vertex/Code-Editor.git"
        },
        {
            id: 5,
            title: 'UI/UX Design',
            category: 'design',
            image: 'images/ui.png',
            description: 'Comprehensive UI/UX design project showcasing user-centered design principles and prototyping.',
            link: 'https://shlokreflections.netlify.app/',
            details: "https://github.com/Shlok-Vertex/Reflections.git"
        },
        {
            id: 6,
            title: 'Travel Booking App',
            category: 'web',
            image: 'images/aerovia.png',
            description: 'Web app design for booking flights, hotels, and car rentals with user-friendly interface.',
            link: 'https://aerovia.netlify.app/',
            details: "https://github.com/Shlok-Vertex/Mutiny-project.git"
        },
        {
            id: 7,
            title: 'Calculator App',
            category: 'app',
            image: 'images/calc.png',
            description: 'A simple yet powerful calculator app with basic and scientific functions.',
            link: 'https://shlok-calc.netlify.app/',
            details: "https://github.com/Shlok-Vertex/Calculator.git"
        },
        {
            id: 8,
            title: 'Portfolio App',
            category: 'web',
            image: 'images/port.png',
            description: 'A personal portfolio website showcasing projects, skills, and contact information.',
            link: '#',
            details: "https://github.com/Shlok-Vertex/portfolio.git"
        }
    ];
    
    // Display all projects initially
    displayProjects(projects);
    
    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                displayProjects(projects);
            } else {
                const filteredProjects = projects.filter(project => project.category === filterValue);
                displayProjects(filteredProjects);
            }
        });
    });
    
    function displayProjects(projectsToDisplay) {
        projectGrid.innerHTML = '';
        
        projectsToDisplay.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-category">${project.category}</span>
                    <p class="project-description">${project.description}</p>
                    <div class="project-links">
                        <a href="${project.link}" class="project-link primary">View Project <i class="fas fa-external-link-alt"></i></a>
                        <a href="${project.details}" class="project-link secondary">Details <i class="fas fa-info-circle"></i></a>
                    </div>
                </div>
            `;
            
            projectGrid.appendChild(projectCard);
        });
    }
    
    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: body.classList.contains('dark-theme') ? '#ffffff' : '#6c63ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: body.classList.contains('dark-theme') ? '#ffffff' : '#6c63ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Download CV Button
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Downloading CV...');
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .service-card, .project-card, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-content, .service-card, .project-card, .info-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});


// Enhanced Testimonials Functionality
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-nav .prev');
    const nextBtn = document.querySelector('.testimonial-nav .next');
    let currentIndex = 0;
    const cardWidth = document.querySelector('.testimonial-card').offsetWidth;
    const cardsContainer = document.querySelector('.testimonial-cards');

    // Function to update testimonials
    function updateTestimonial(index) {
        // Update cards
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Animate cards container
        cardsContainer.style.transform = `translateX(-${index * cardWidth}px)`;
        currentIndex = index;
    }

    // Dot click event
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const cardIndex = parseInt(this.getAttribute('data-card')) - 1;
            updateTestimonial(cardIndex);
        });
    });

    // Next button
    nextBtn.addEventListener('click', function() {
        const nextIndex = (currentIndex + 1) % cards.length;
        updateTestimonial(nextIndex);
    });

    // Previous button
    prevBtn.addEventListener('click', function() {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateTestimonial(prevIndex);
    });

    // Auto-rotate testimonials
    let autoRotate = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        updateTestimonial(nextIndex);
    }, 5000);

    // Pause on hover
    const testimonialSection = document.querySelector('.testimonial-container');
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    testimonialSection.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            const nextIndex = (currentIndex + 1) % cards.length;
            updateTestimonial(nextIndex);
        }, 5000);
    });

    // Initialize
    updateTestimonial(0);
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonials);








document.addEventListener('DOMContentLoaded', function() {
    // Skill data
    const skills = [
        { 
            name: "HTML5", 
            icon: "fab fa-html5", 
            level: 95, 
            category: "frontend",
            color: "#E44D26" 
        },
        { 
            name: "CSS3", 
            icon: "fab fa-css3-alt", 
            level: 90, 
            category: "frontend",
            color: "#2965F1" 
        },
        { 
            name: "JavaScript", 
            icon: "fab fa-js", 
            level: 85, 
            category: "frontend",
            color: "#F0DB4F" 
        },
        { 
            name: "React", 
            icon: "fab fa-react", 
            level: 80, 
            category: "frontend",
            color: "#61DAFB" 
        },
        { 
            name: "Node.js", 
            icon: "fab fa-node-js", 
            level: 75, 
            category: "backend",
            color: "#68A063" 
        },
        { 
            name: "Python", 
            icon: "fab fa-python", 
            level: 70, 
            category: "backend",
            color: "#3776AB" 
        },
        { 
            name: "Java", 
            icon: "fab fa-python", 
            level: 70, 
            category: "backend",
            color: "#3776AB" 
        },
        { 
            name: "C/C++", 
            icon: "fab fa-figma", 
            level: 85, 
            category: "design",
            color: "#A259FF" 
        },
        { 
            name: "UI/UX", 
            icon: "fas fa-paint-brush", 
            level: 80, 
            category: "design",
            color: "#FF7262" 
        }
    ];

    // DOM Elements
    const orb = document.getElementById('orb');
    const floatingSkills = document.getElementById('floatingSkills');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('skillSearch');

    // Create skill dots on orb
    skills.forEach((skill, index) => {
        // Position skill dots on orb surface using Fibonacci sphere algorithm
        const y = 1 - (index / (skills.length - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = Math.PI * (3 - Math.sqrt(5)) * index;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        const distance = 150; // Radius of orb
        
        const dot = document.createElement('div');
        dot.className = 'orb-dot';
        dot.setAttribute('data-skill', skill.name.toLowerCase());
        dot.setAttribute('data-category', skill.category);
        dot.style.backgroundColor = skill.color;
        dot.style.transform = `translate(-50%, -50%) translate3d(${x * distance}px, ${y * distance}px, ${z * distance}px)`;
        
        // Add tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = skill.name;
        dot.appendChild(tooltip);
        
        // Add hover effect
        dot.addEventListener('mouseenter', () => {
            highlightSkill(skill.name);
        });
        
        orb.appendChild(dot);
    });

    // Create floating skill cards
    skills.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = `skill-card ${skill.category}`;
        card.setAttribute('data-skill', skill.name.toLowerCase());
        card.setAttribute('data-category', skill.category);
        
        card.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">
                <div class="skill-level-bar" style="width: ${skill.level}%"></div>
            </div>
        `;
        
        // Position cards in a circle around center
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 250;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        // Position relative to container center
        card.style.left = `calc(50% + ${x}px)`;
        card.style.top = `calc(50% + ${y}px)`;
        card.style.transform = 'translate(-50%, -50%)';
        card.style.setProperty('--delay', `${index * 0.1}s`);
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            highlightSkill(skill.name);
        });
        
        floatingSkills.appendChild(card);
    });

    // Filter skills
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skills
            const filter = this.getAttribute('data-filter');
            const cards = document.querySelectorAll('.skill-card');
            const dots = document.querySelectorAll('.orb-dot');
            
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.opacity = '1';
                    card.style.pointerEvents = 'auto';
                } else {
                    card.style.opacity = '0.2';
                    card.style.pointerEvents = 'none';
                }
            });
            
            dots.forEach(dot => {
                if (filter === 'all' || dot.getAttribute('data-category') === filter) {
                    dot.style.opacity = '1';
                } else {
                    dot.style.opacity = '0.2';
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.skill-card');
        const dots = document.querySelectorAll('.orb-dot');
        
        cards.forEach(card => {
            const skillName = card.getAttribute('data-skill');
            if (skillName.includes(searchTerm)) {
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
            } else {
                card.style.opacity = '0.2';
                card.style.pointerEvents = 'none';
            }
        });
        
        dots.forEach(dot => {
            const skillName = dot.getAttribute('data-skill');
            dot.style.opacity = skillName.includes(searchTerm) ? '1' : '0.2';
        });
    });

    // Highlight skill
    function highlightSkill(skillName) {
        // Remove previous highlights
        document.querySelectorAll('.skill-card, .orb-dot').forEach(el => {
            el.classList.remove('highlighted');
        });
        
        // Add highlight to matching elements
        document.querySelectorAll(`[data-skill="${skillName.toLowerCase()}"]`).forEach(el => {
            el.classList.add('highlighted');
            
            // Pulse animation
            el.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                el.style.animation = '';
            }, 500);
        });
    }

    // Animate cards on load
    setTimeout(() => {
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            card.style.transition = `transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s, opacity 0.3s ease`;
            card.style.opacity = '1';
        });
    }, 500);

    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        .highlighted {
            z-index: 10;
            box-shadow: 0 0 20px rgba(108, 99, 255, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
});






// Typewriter Effect
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ["websites", "web apps", "UI/UX designs"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

// Initialize the typewriter effect on DOM load
document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});







document.addEventListener('DOMContentLoaded', function() {
    // Education Data
    const educationData = [
        {
            type: "degree",
            title: "Diploma in Computer Science Engineering",
            date: "2023 - 2026",
            institution: "Satyam International Institute of Technology",
            location: "Patna, Bihar, India",
            logo: "images/siit.png",
            description: "Comprehensive program covering core computer science concepts, programming languages, and software development methodologies. Emphasis on practical skills and real-world applications.",
            achievements: [
                "Dean's List for Academic Excellence (All Semesters)",
                "Developed many web applications using JavaScript.",
                "Github profile with over 15+ repositories.",
            ],
            skills: ["JavaScript", "Data Structures", "Algorithms", "Python", "Java"]
        },
        {
            type: "school",
            title: "Schooling",
            date: "2021 - 2023",
            institution: "S.G.G.S. high school",
            location: "Patna, Bihar, India",
            logo: "images/school.png",
            description: "Completed Higher Secondary Education with a focus on Science and Mathematics. Developed foundational skills in programming and problem-solving through various projects and extracurricular activities.",
            achievements: [
                "School Topper (86%)"
            ],
            skills: ["C++", "Basic Web Development", "Mathematics", "Physics", "Problem Solving"]
        },
        {
            type: "certification",
            title: "Online Certifications & Workshops",
            date: "Ongoing",
            certifications: [
                {
                    title: "Introduction to Generative AI Studio",
                    issuer: "Google Cloud",
                    logo: "images/google.png",
                    link: "#",
                    certificateImage: "images/shlok-google.jpeg",
                    skills: ["ML Algorithms", "TensorFlow", "Data Preprocessing"]
                },
                {
                    title: "Deloitte Technology Job Simulation",
                    issuer: "Forage",
                    logo: "images/deloitte.png",
                    link: "#",
                    certificateImage: "images/shlok-deloitte.jpeg",
                    skills: ["React", "Node.js", "MongoDB", "Express"]
                },
                {
                    title: "DeepSeek for Beginners",
                    issuer: "Simplilearn | SkillUp",
                    logo: "images/simplilearn.png",
                    link: "#",
                    certificateImage: "images/shlok-deepseek.jpeg",
                    skills: ["Python", "OOP", "Decorators", "Generators"]
                },
                {
                    title: "Introduction to Cloud Computing",
                    issuer: "Simplilearn | SkillUp",
                    logo: "images/simplilearn.png",
                    link: "#",
                    certificateImage: "images/cloud.png",
                    skills: ["Python", "OOP", "Decorators", "Generators"]
                },
                {
                    title: "Introduction to Prompt Engineering with Github Copilot",
                    issuer: "Simplilearn | SkillUp",
                    logo: "images/microsoft.png",
                    link: "#",
                    certificateImage: "images/shlok-microsoft.png",
                    skills: ["Python", "OOP", "Decorators", "Generators"]
                }
            ],
            skills: []
        }
    ];

    // Skills data with weight for cloud
    const skillsData = [
        { name: "Netlify", weight: 9 },
        { name: "Python", weight: 10 },
        { name: "JavaScript", weight: 8 },
        { name: "React", weight: 8 },
        { name: "Node.js", weight: 7 },
        { name: "Data Structures", weight: 9 },
        { name: "Algorithms", weight: 8 },
        { name: "AWS", weight: 7 },
        { name: "TensorFlow", weight: 6 },
        { name: "Java", weight: 6 },
        { name: "C++", weight: 5 },
        { name: "SQL", weight: 7 },
        { name: "MongoDB", weight: 6 },
        { name: "Git", weight: 8 },
        { name: "Docker", weight: 5 },
        { name: "Cybersecurity", weight: 6 },
        { name: "Problem Solving", weight: 9 }
    ];

    // DOM Elements
    const timelineContainer = document.querySelector('.education-timeline');
    const cloudContainer = document.querySelector('.cloud-container');
    const filterButtons = document.querySelectorAll('.control-btn');
    const modal = document.querySelector('.certificate-modal');
    const modalImg = document.querySelector('.modal-certificate');
    const modalInfo = document.querySelector('.certificate-info');
    const closeModal = document.querySelector('.close-modal');

    // Initialize
    renderTimeline();
    renderSkillsCloud();
    setupEventListeners();

    // Render Timeline
    function renderTimeline(filter = 'all') {
        timelineContainer.innerHTML = '';
        
        educationData.forEach((item, index) => {
            if (filter !== 'all' && item.type !== filter && !(filter === 'achievement' && item.achievements)) {
                return;
            }
            
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${item.type}`;
            
            let contentHTML = `
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3>${item.title}</h3>
                        <span class="timeline-date">${item.date}</span>
                    </div>`;

            if (item.type !== 'certification') {
                contentHTML += `
                    <div class="timeline-institution">
                        <img src="${item.logo}" alt="${item.institution} Logo" class="institution-logo">
                        <div class="institution-details">
                            <h4>${item.institution}</h4>
                            <p class="institution-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                        </div>
                    </div>
                    <div class="timeline-details">
                        <p>${item.description}</p>
                        <ul class="achievements-list">`;

                item.achievements.forEach(achievement => {
                    contentHTML += `<li><i class="fas fa-trophy"></i> ${achievement}</li>`;
                });

                contentHTML += `</ul></div>`;
            } else {
                contentHTML += `
                    <div class="timeline-details">
                        <div class="certifications-grid">`;

                item.certifications.forEach(cert => {
                    contentHTML += `
                        <div class="certification-card">
                            <img src="${cert.logo}" alt="${cert.issuer}" class="certification-logo">
                            <h4>${cert.title}</h4>
                            <p>${cert.issuer}</p>
                            <a href="#" class="view-certificate" data-img="${cert.certificateImage}" data-title="${cert.title}" data-issuer="${cert.issuer}">
                                View Certificate <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>`;
                });

                contentHTML += `</div></div>`;
            }

            contentHTML += `</div>`;
            timelineItem.innerHTML = contentHTML;
            timelineContainer.appendChild(timelineItem);
        });

        // Animate timeline items
        animateTimeline();
    }

    // Render Skills Cloud
    function renderSkillsCloud() {
        cloudContainer.innerHTML = '';
        
        skillsData.forEach(skill => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.style.fontSize = `${0.8 + (skill.weight * 0.1)}rem`;
            tag.style.opacity = `${0.7 + (skill.weight * 0.03)}`;
            tag.textContent = skill.name;
            cloudContainer.appendChild(tag);
        });
    }

    // Animate Timeline Items
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderTimeline(button.dataset.filter);
            });
        });

        // Certificate modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-certificate') || e.target.closest('.view-certificate')) {
                e.preventDefault();
                const link = e.target.closest('.view-certificate');
                modalImg.src = link.dataset.img;
                modalInfo.innerHTML = `
                    <h4>${link.dataset.title}</h4>
                    <p>${link.dataset.issuer}</p>
                `;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

});





if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        
        const message = `New Contact Submission:\n
        Name: ${data.name}\n
        Email: ${data.email}\n
        Message: ${data.message}`;

        const whatsappNumber = "919308631825";

        window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        this.reset();
    });
}
