document.addEventListener('DOMContentLoaded', function() {
    const typingInterests = ['Minecraft Bedrock JavaScript API', 'Web Development', 'WWeb Designer',' Software Development'];

    const skillLogos = {
        "Programming": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>`,
        "AI & Data": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-12a2.25 2.25 0 01-2.25-2.25V3m12.75 0v6.75a2.25 2.25 0 01-2.25 2.25H9A2.25 2.25 0 016.75 9.75V3m12.75 0V3M6.75 9.75V3m0 0v6.75" /></svg>`,
        "Tools & Others": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l.029-.029c.353-.353.693-.717 1.001-1.091l.029-.029M11.42 15.17L11.42 15.17ZM11.42 15.17L10.5 16.5l-1.08-1.08l-.029-.029m-2.25-2.25L9 12.75l-1.08-1.08l-.029-.029m5.625 5.625c.353-.353.717-.693 1.091-1.001L18 12.75l-1.08-1.08l-.029-.029m-2.25-2.25c-.353.353-.717.693-1.091 1.001L15 11.25l-1.08 1.08l-.029.029m-2.25 2.25L9 12.75l-1.08-1.08l-.029-.029M9 12.75l1.08-1.08l.029-.029m5.625 5.625l-1.08 1.08l-.029.029m-5.625-5.625L9 12.75l1.08 1.08l.029.029" /></svg>`,
        "Soft Skills": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5 0a9.094 9.094 0 013.741-.479 3 3 0 01-4.682-2.72M12 8.25a4.125 4.125 0 110 8.25 4.125 4.125 0 010-8.25zM12 15a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0112 15z" /></svg>`
    };
    const defaultSkillLogo = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

    const skillsData = {
        "Programming": ["JavaScript (Bedrock API)", "JavaScript (ES6+)","Mcfunction","Python", "Java", "HTML", "Css twilight", "C", "C#", "C++"],
        "AI & Data": ["Dataset Learning", "Basic Database"],
        "Tools & Others": ["Git", "VS Code", "Figma", "ChatGPT", "Blockbench", "Minecraft debugger"],
        "Soft Skills": ["การสื่อสาร", "การทำงานเป็นทีม", "การแก้ปัญหา", "การเรียนรู้เร็ว"]
    };

    const individualSkillLogos = {
        "Python": "https://raw.githubusercontent.com/HighAmbition211/HighAmbition211/auxiliary/languages/python.svg", 
        "Java": null,
        "HTML/CSS": null,
        "JavaScript (ES6+)": null,
        "SQL": null,
        "TensorFlow": null,
        "scikit-learn": null,
        "Power BI": null,
        "Pandas": null,
        "Git": null,
        "VS Code": null,
        "Figma": null,
        "Docker": null,
        "Agile/Scrum": null,
        "การสื่อสาร": null,
        "การทำงานเป็นทีม": null,
        "การแก้ปัญหา": null,
        "การเรียนรู้เร็ว": null
    };

    const projectsData = [
        {
            image: "image/t1.png",
            title: "Code: ระบบจัดการห้องพัก (Room Management System)",
            description: "พัฒนาโดยใช้ภาษา C#",
            githubUrl: "https://github.com/SolightzZ/Room-Management-System",
            demoUrl: null 
        },
        {
            image: "image/f.png",
            title: "Code: Flutter task api 3012025",
            description: "พัฒนาโดยใช้ภาษา Dart, C++",
            githubUrl: "https://github.com/SolightzZ/flutter_task_api_3012025",
            demoUrl: null 
        },
        {
            image: "image/php.png",
            title: "Code: Dataset_learning",
            description: "พัฒนาโดยใช้ภาษา Python",
            githubUrl: "https://github.com/SolightzZ/Dataset_learning-",
            demoUrl: null 
        },
        {
            image: "image/Screenshot (2124).png",
            title: "Code: UHCRun for Minecraft Bedrock Edition",
            description: "พัฒนาโดยใช้ภาษา Minecraft Bedrock JavaScript API",
            githubUrl: "https://github.com/SolightzZ/Project_UHC_RUN",
            demoUrl: null
        },
        {
            image: "image/mc2.png",
            title: "Code: Protection-Area-Addon",
            description: "พัฒนาโดยใช้ภาษา Minecraft Bedrock JavaScript API",
            githubUrl: "https://github.com/SolightzZ/Protection-Area-Addon",
            demoUrl: null
        
        },
        {
            image: "image/mc.gif",
            title: "Code: Dynamic-Third-Person By kam!i (FIXBUG)",
            description: "พัฒนาโดยใช้ภาษา Minecraft Bedrock JavaScript API",
            githubUrl: "https://github.com/SolightzZ/Dynamic-Third-Person",
            demoUrl: null
        },
        {
            image: "image/IMG_20251009_141633.jpg",
            title: "Edit: ผลงานการตักต่อโครงการศาสตร์พระราชา",
            description: "โปรแกรมตัดต่อใช้ Capcut",
            githubUrl: null ,
            demoUrl: "https://www.youtube.com/watch?v=iEQl_HNm1Lo"
        }
    ];

    const educationData = [
        {
            date: "2566 - ปัจจุบัน",
            title: "คณะวิทยาศาสตร์ สาขาเทคโนโลยีสารสนเทศ",
            description: "มหาวิทยาลัยราชภัฏอุดรธานี(สามพร้าว)"
        },
        {
            date: "2563 - 2566",
            title: "แผนกวิชาคอมพิวเตอร์กราฟฟิก",
            description: "วิทยาลัยสารพัดช่างอุดรธานี"
        },
        {
            date: "2563 - 2566",
            title: "มัธยมศึกษาตอนปลาย (สายอาชีพ)",
            description: "โรงเรียนกุดจับประชาสรรค์"
        }
    ];
    
    const activitiesData = [
        {
            image: "image/IMG_20251002_090204.jpg",
            title: "ลงพื้นที่ทำโครงการศาสตร์พระราชา",
            description: "ได้รับประสบการณ์การทำงานเป็นทีม",
            linkUrl: null
        },
        {
            image: "image/IMG_20240710_124309.jpg",
            title: "ไหว้ครู 2025",
            description: "",
            linkUrl: null 
        },
        {
            image: "image/IMG_20240905_220000.jpg",
            title: "Coke Studio 2024",
            description: "ประสบการณ์ทางดนตรีที่ให้คุณได้ดื่มด่ำกับเสียงเพลง",
            linkUrl: null
        },
        {
            image: "image/IMG_20240606_144750.jpg",
            title: "กิจกรรมรับน้อง ปี 2",
            description: "",
            linkUrl: null
        },
        {
            image: "image/IMG_20250818_075845.jpg",
            title: "ช่วยงานวิทยาศาสตร์",
            description: "การเข้าร่วมกิจกรรมของหน่วยงานวิทยาศาสตร์",
            linkUrl: null
        }
    ];

    const certificatesData = [
        {
            image: "image/EthicalHackerUpdate20251112-31.jpeg",
            title: "Ethical Hacker",
            description: "ออกโดย Cisco",
        },
        {
            image: "image/I2CSUpdate20251112-29.jpeg",
            title: "Introduction to Cybersecurity",
            description: "ออกโดย Cisco"
        }
    ];
    
    const contactData = [
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>`,
            title: "Email",
            value: "66040233122@udru.ac.th",
            href: "#"
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>`,
            title: "GitHub",
            value: "https://github.com/SolightzZ",
            href: "https://github.com/SolightzZ" 
        },
        {
            icon: "",
            title: "Facebook",
            value: "https://www.facebook.com/panitijahemz/",
            href: "https://www.facebook.com/panitijahemz/" 
        },
        {
            icon: "",
            title: "Phone",
            value: "0621036516",
            href: "#" 
        },
        {
            icon: "",
            title: "Line",
            value: "introfxx2",
            href: "#" 
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-cyan-400 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>`,
            title: "ที่อยู่",
            value: "อ.เมือง, จ.อุดรธานี",
            href: "#"
        }
    ];




    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement && typingInterests.length > 0) {
        let interestIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentInterest = typingInterests[interestIndex];
            if (isDeleting) {
                typingTextElement.textContent = currentInterest.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentInterest.substring(0, charIndex + 1);
                charIndex++;
            }
            if (!isDeleting && charIndex === currentInterest.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                interestIndex = (interestIndex + 1) % typingInterests.length;
                setTimeout(type, 500); 
            } else {
                const typeSpeed = isDeleting ? 75 : 150;
                setTimeout(type, typeSpeed);
            }
        }
        type(); 
    }

    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const iconMenu = navToggle ? navToggle.querySelector('.icon-menu') : null;
    const iconClose = navToggle ? navToggle.querySelector('.icon-close') : null;

    if (navToggle && navbar && iconMenu && iconClose) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('hidden');
            iconMenu.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!navbar.classList.contains('hidden')) {
                    navbar.classList.add('hidden');
                    iconMenu.classList.remove('hidden');
                    iconClose.classList.add('hidden');
                }
            });
        });
    }
    
    const sections = document.querySelectorAll('.section');
    const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                allNavLinks.forEach(link => link.classList.remove('active'));
                const activeLinks = document.querySelectorAll(`.nav-link[href="#${id}"]`);
                activeLinks.forEach(link => link.classList.add('active'));
            }
        });
    }, {
        root: null,
        threshold: 0.3, 
        rootMargin: "-80px 0px -50% 0px"
    });
    sections.forEach(section => observer.observe(section));
    

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = document.getElementById('header-nav').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    function renderSkills(data) {
        const container = document.getElementById('skills-container');
        if (!container) return;
        let html = '';
        
        for (const category in data) {
            const logoSvg = skillLogos[category] || defaultSkillLogo;
            const skillsList = data[category]; 
            
            html += `
                <div class="skill-box bg-slate-800/50 rounded-xl border border-slate-700/50 p-5 shadow-lg">
                    <div class="flex items-center gap-4 mb-4">
                        ${logoSvg}
                        <h3 class="text-2xl font-semibold text-cyan-400">${category}</h3>
                    </div>
                    <ul class="flex flex-wrap gap-2">
                        ${skillsList.map(skill => {
                            const logoUrl = individualSkillLogos[skill];
                            
                            if (logoUrl) {
                                return `
                                <li class="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                    <img src="${logoUrl}" alt="${skill} logo" class="w-4 h-4 object-contain">
                                    <span>${skill}</span>
                                </li>
                                `;
                            } else {
                                return `
                                <li class="bg-slate-700 text-slate-200 px-4 py-1 rounded-full text-sm font-medium">
                                    ${skill}
                                </li>
                                `;
                            }
                        }).join('')}
                    </ul>
                </div>
            `;
        }
        container.innerHTML = html;
    }


    function renderCardGrid(containerId, data, linkMappings = {}) {
        const grid = document.getElementById(containerId);
        if (!grid) return;
        let html = '';
        
        data.forEach(item => {
            let linksHtml = '';
            for (const key in linkMappings) {
                if (item[key]) { 
                    linksHtml += `<a href="${item[key]}" target="_blank" class="font-medium text-cyan-400 hover:text-cyan-300">${linkMappings[key]}</a>`;
                }
            }

            html += `
                <article class="project-card bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700 shadow-lg flex flex-col transition-all duration-300 hover:shadow-cyan-500/20 hover:border-slate-600">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
                    <div class="p-5 flex flex-col flex-grow">
                        <h4 class="text-xl font-bold text-white mb-2">${item.title}</h4>
                        <p class="text-slate-400 flex-grow mb-4">${item.description}</p>
                        ${linksHtml ? `<div class="project-links flex items-center gap-4 mt-auto">${linksHtml}</div>` : ''}
                    </div>
                </article>
            `;
        });
        grid.innerHTML = html;
    }

    function renderTimeline(data, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        let html = '';
        data.forEach(item => {
            html += `
                <div class="timeline-item">
                    <span class="timeline-date">${item.date}</span>
                    <h4 class="text-lg font-semibold">${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;
        });
        container.innerHTML = html;
    }
    
    function renderContact(data) {
        const container = document.getElementById('contact-container');
        if (!container) return;
        let html = '';
        data.forEach(item => {
            const linkAttributes = (item.href === "#" || item.href.startsWith('mailto:')) 
                ? `href="${item.href}"` 
                : `href="${item.href}" target="_blank" rel="noopener noreferrer"`;

            html += `
                <a ${linkAttributes} class="contact-box block bg-slate-800/50 rounded-xl border border-slate-700/50 p-5 shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/20 hover:-translate-y-1">
                    <div class="flex items-center gap-4">
                        ${item.icon} <div>
                            <h4 class="text-lg font-semibold text-cyan-400">${item.title}</h4>
                            <p class="text-slate-300 break-words">${item.value}</p>
                        </div>
                    </div>
                </a>
            `;
        });
        container.innerHTML = html;
    }

    renderSkills(skillsData);
    
    renderCardGrid('project-grid', projectsData, { githubUrl: 'GitHub', demoUrl: 'Link' });
    renderCardGrid('activities-grid', activitiesData, { linkUrl: 'ดูรายละเอียด' });
    renderCardGrid('certificate-grid', certificatesData, { linkUrl: 'ดูเกียรติบัตร' });

    renderTimeline(educationData, 'education-timeline'); 
    renderContact(contactData);

});