// document.addEventListener('DOMContentLoaded', () => {
            
//             // 1. Select all elements needed
//             const skillSection = document.querySelector('.container');
//             const progressBars = document.querySelectorAll('.skill-bar-fill');
//             const percentageTexts = document.querySelectorAll('.skill-percentage');


//             gsap.utils.toArray('.reveal-text').forEach(text => {
//                 gsap.from(text, {
//                     scrollTrigger: {
//                         trigger: text,
//                         start: "top 85%",
//                         toggleActions: "play none none reverse"
//                     },
//                     y: 50,
//                     opacity: 0,
//                     duration: 1,
//                     ease: "power3.out"
//                 });

//                 // 2. Setup Intersection Observer
//             // This watches for when the skill section enters the viewport
//             const observer = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         // Trigger the animation function
//                         animateSkills();
//                         // Stop observing once animated (so it doesn't replay when scrolling up/down)
//                         observer.unobserve(entry.target);
//                     }
//                 });
//             }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

//             observer.observe(skillSection);

//             // 3. Animation Function
//             function animateSkills() {
//                 progressBars.forEach((bar, index) => {
//                     // Get target width from HTML data attribute
//                     const targetWidth = bar.getAttribute('data-width');
//                     const numericValue = parseInt(targetWidth);

//                     // Staggered Animation: Add a small delay for each bar
//                     // index * 100ms means the 2nd bar starts 100ms after the 1st, etc.
//                     setTimeout(() => {
//                         // Set the width to trigger CSS transition
//                         bar.style.width = targetWidth;
                        
//                         // Start the number counter for this specific skill
//                         animateCounter(percentageTexts[index], numericValue);
//                     }, index * 150); 
//                 });
//             }

//             // 4. Number Counter Animation
//             function animateCounter(element, target) {
//                 let current = 0;
//                 const duration = 1500; // 1.5 seconds (matches CSS transition)
//                 const frameRate = 30; // Update every ~30ms
//                 const totalFrames = duration / frameRate;
//                 const increment = target / totalFrames;

//                 const counter = setInterval(() => {
//                     current += increment;
                    
//                     // Check if we reached the target
//                     if (current >= target) {
//                         element.textContent = target + "%"; // Ensure exact final number
//                         clearInterval(counter);
//                     } else {
//                         element.textContent = Math.ceil(current) + "%";
//                     }
//                 }, frameRate);
//             }
//         });
//             });


            const skillsCoding = [
                { name: "HTML5", icon: "fa-html5", percent: "95%" },
                { name: "CSS3 & Animations", icon: "fa-css3-alt", percent: "90%" },
                { name: "Bootstrap Framework", icon: "fa-bootstrap", percent: "85%" },
                { name: "JavaScript (ES6+)", icon: "fa-js", percent: "88%" },
                { name: "Backend", icon: "fa-php", percent: "50%" }
            ];

            const skillsTools = [
                { name: "Photoshop", icon: "fa-photoshop", percent: "95%" },
                { name: "Figma", icon: "fa-figma", percent: "98%" },
                { name: "Adobe XD", icon: "fa-adobe", percent: "93%" }
            ];

const renderSkills = (arr, containerId) => {
                const container = document.getElementById(containerId);
                arr.forEach(s => {
                    container.innerHTML += `
                        <div class="skill-box">
                            <div class="skill-header">
                                <span class="skill-name"><span class="fa-brands ${s.icon}"></span><span style="margin-left:10px">${s.name}</span></span>
                                <span class="skill-percentage">${s.percent}</span>
                            </div>
                            <div class="skill-bar-bg">
                                <div class="skill-bar-fill" data-width="${s.percent}"></div>
                            </div>
                        </div>
                    `;
                });
            };
            renderSkills(skillsCoding, 'skills-coding-container');
            renderSkills(skillsTools, 'skills-tools-container'
        );

        // Skill Bar Animation on Scroll
            gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
                ScrollTrigger.create({
                    trigger: bar,
                    start: "top 80%",
                    onEnter: () => {
                        bar.style.width = bar.getAttribute('data-width');
                    }
                });
            });

            // Number Counter Animation
            gsap.utils.toArray('.counter').forEach(counter => {
                ScrollTrigger.create({
                    trigger: counter,
                    start: "top 85%",
                    onEnter: () => {
                        let target = +counter.getAttribute('data-target');
                        gsap.to(counter, {
                            innerHTML: target,
                            duration: 2,
                            snap: { innerHTML: 1 }
                        });
                    }
                });
            });