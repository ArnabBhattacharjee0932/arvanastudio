// Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Wait for DOM
        document.addEventListener("DOMContentLoaded", () => {
            
            // --- Preloader ---
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                gsap.to(preloader, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 15
                });
                
                // Start Hero Animations after preloader
                initHeroAnimations();
            });

            // --- Custom Cursor Logic ---
            const cursorDot = document.querySelector('.cursor-dot');
            const cursorOutline = document.querySelector('.cursor-outline');
            
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                // Dot follows instantly
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                // Outline follows with slight delay (using GSAP for smoothness)
                gsap.to(cursorOutline, {
                    x: posX,
                    y: posY,
                    duration: 0.15,
                    ease: "power2.out"
                });
            });

            // Hover Effects for Cursor
            const magneticTriggers = document.querySelectorAll('a, button, .magnetic-trigger');
            magneticTriggers.forEach(trigger => {
                trigger.addEventListener('mouseenter', () => {
                    document.body.classList.add('hovering');
                });
                trigger.addEventListener('mouseleave', () => {
                    document.body.classList.remove('hovering');
                });
            });

            const imgTriggers = document.querySelectorAll('.magnetic-img-trigger');
            imgTriggers.forEach(trigger => {
                trigger.addEventListener('mouseenter', () => {
                    document.body.classList.add('hovering-img');
                });
                trigger.addEventListener('mouseleave', () => {
                    document.body.classList.remove('hovering-img');
                });
            });

            // --- Hero Animations ---
            function initHeroAnimations() {
                const tl = gsap.timeline();
                
                tl.from(".hero-text-anim", {
                    y: 200,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out",
                    delay: 0.5
                })
                .from(".reveal-text", {
                    y: 20,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.8")
                .from(".fade-up", {
                    y: 30,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.6");
            }

            // --- Scroll Animations (ScrollTrigger) ---
            
            // // Reveal Text Elements
            // gsap.utils.toArray('.reveal-text').forEach(text => {
            //     gsap.from(text, {
            //         scrollTrigger: {
            //             trigger: text,
            //             start: "top 85%",
            //             toggleActions: "play none none reverse"
            //         },
            //         y: 50,
            //         opacity: 0,
            //         duration: 1,
            //         ease: "power3.out"
            //     });
            // });

            // Fade Up Elements
            gsap.utils.toArray('.fade-up').forEach(elem => {
                gsap.from(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 90%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            // Project Parallax & Reveal
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                const img = card.querySelector('.project-img');
                
                // Card Reveal
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                // Image Parallax (Internal to card)
                gsap.to(img, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    },
                    y: -30, // Parallax amount
                    ease: "none"
                });
            });

            // Service Cards Stagger
            gsap.from(".service-card", {
                scrollTrigger: {
                    trigger: "#services",
                    start: "top 80%",
                },
                y: 50,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });

            // About Image Parallax
            gsap.to(".parallax-img", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: -50,
                ease: "none"
            });

            // Stats Counters
            gsap.utils.toArray('.counter').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                
                ScrollTrigger.create({
                    trigger: counter,
                    start: "top 85%",
                    once: true, // Only run once
                    onEnter: () => {
                        gsap.to(counter, {
                            innerHTML: target,
                            duration: 2,
                            snap: { innerHTML: 1 }, // Snap to whole numbers
                            ease: "power1.out"
                        });
                    }
                });
            });

            // Process Timeline
            gsap.utils.toArray('.process-item').forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                    },
                    x: -30,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "power2.out"
                });
            });
            
            // Magnetic Button Effect
            const magneticBtns = document.querySelectorAll('.magnetic-trigger');
            magneticBtns.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    // Slight pull effect
                    gsap.to(btn, {
                        x: x * 0.2,
                        y: y * 0.2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            });

        });



        document.addEventListener('DOMContentLoaded', () => {
            const projectItems = document.querySelectorAll('.process-item');
            const targetImage = document.getElementById('target-image');
            
            // Store the default image source to revert back when mouse leaves
            const defaultImageSrc = targetImage.src;
            
            // Function to update the image
            const updateImage = (imageUrl, title) => {
                // Only update if the image is actually different to prevent flickering
                if (targetImage.src !== imageUrl) {
                    targetImage.style.opacity = '1'; // Dim briefly during transition
                    
                    setTimeout(() => {
                        targetImage.src = imageUrl;
                        targetImage.onload = () => {
                            // Once loaded, fade back in
                            targetImage.classList.add('is-visible');
                            overlayText.style.opacity = '0';
                        };
                    }, 200); // Slight delay for smooth transition
                } else {
                    // If same image, just ensure it's visible
                    targetImage.classList.add('is-visible');
                    overlayText.style.opacity = '0';
                }
            };

            // Function to reset to default state
            const resetImage = () => {
                targetImage.classList.remove('is-visible');
                targetImage.style.opacity = '1';
                overlayText.style.opacity = '1';
                
                // Optional: Uncomment to revert to original image instead of dimming
                // setTimeout(() => { targetImage.src = defaultImageSrc; }, 400);
            };

            projectItems.forEach(item => {
                // Mouse Enter (Hover)
                item.addEventListener('mouseenter', () => {
                    const newSrc = item.getAttribute('data-image-src');
                    const title = item.querySelector('h4').innerText;
                    updateImage(newSrc, title);
                });

                // Mouse Leave (Stop hovering)
                item.addEventListener('mouseleave', () => {
                    resetImage();
                });

                // Accessibility: Focus in for keyboard users
                item.addEventListener('focus', () => {
                    const newSrc = item.getAttribute('data-image-src');
                    const title = item.querySelector('h4').innerText;
                    updateImage(newSrc, title);
                });

                // Accessibility: Focus out
                item.addEventListener('blur', () => {
                    resetImage();
                });
            });
        });