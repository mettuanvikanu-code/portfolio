/**
 * METTU ANUVIKA - PORTFOLIO INTERACTIVE SCRIPT
 * Features: Mobile menu toggle, Smooth scroll active highlighting,
 * Interactive Spam Classifier ML Demo, Resume Modal & Generator, Contact Form.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Spam Classifier Demo Elements
    const sampleSelect = document.getElementById('sample-text-select');
    const emailInput = document.getElementById('email-input-text');
    const classifyBtn = document.getElementById('classify-btn');
    const demoResultBox = document.getElementById('demo-result');
    const resultStatusBadge = document.getElementById('result-status-badge');
    const confidenceText = document.getElementById('confidence-text');
    const confidenceBarFill = document.getElementById('confidence-bar-fill');
    const resultExplanation = document.getElementById('result-explanation');

    // Modal Elements
    const downloadResumeBtn = document.getElementById('download-resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const downloadActualResumeBtn = document.getElementById('download-actual-resume-btn');
    const printResumeBtn = document.getElementById('print-resume-btn');

    // Contact Form & Copy Buttons
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const copyBtns = document.querySelectorAll('.copy-btn');

    // --- 1. Sticky Navbar & Mobile Menu ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveNavLink();
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- 2. Interactive Spam Filtering Machine Learning Simulator ---
    const SPAM_KEYWORDS = [
        'winner', 'win', 'prize', 'gift card', 'claim', 'urgent', 'cash', 'free',
        'click here', 'click link', 'suspended', 'verify account', 'password', 'banking',
        'lottery', 'guaranteed', '100%', 'risk free', 'http://', 'https://', 'offer',
        'limited time', 'act now', 'dollar', '$', 'congratulations', 'income'
    ];

    if (sampleSelect && emailInput) {
        sampleSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                emailInput.value = e.target.value;
            }
        });
    }

    if (classifyBtn) {
        classifyBtn.addEventListener('click', () => {
            const text = emailInput.value.trim();

            if (!text) {
                alert('Please type or select an email message to analyze.');
                return;
            }

            // Simple Naive-Bayes inspired Heuristic Keyword Scoring
            const lowerText = text.toLowerCase();
            let spamScore = 0;
            let matchedKeywords = [];

            SPAM_KEYWORDS.forEach(keyword => {
                if (lowerText.includes(keyword)) {
                    spamScore += 1.5;
                    matchedKeywords.push(keyword);
                }
            });

            // Excessive exclamations or caps penalty
            const uppercaseRatio = (text.replace(/[^A-Z]/g, '').length) / text.length;
            if (uppercaseRatio > 0.3) spamScore += 2;
            if ((text.match(/!/g) || []).length > 2) spamScore += 1.5;

            const isSpam = spamScore >= 2.0;
            let confidence = Math.min(99, Math.max(65, Math.round(50 + (spamScore * 12))));

            if (!isSpam) {
                confidence = Math.min(99, Math.max(70, Math.round(100 - (spamScore * 15))));
            }

            // Display Results
            demoResultBox.classList.remove('hidden');

            if (isSpam) {
                resultStatusBadge.textContent = '🚨 SPAM DETECTED';
                resultStatusBadge.className = 'result-status-badge spam';
                confidenceBarFill.className = 'confidence-bar-fill spam';
                confidenceBarFill.style.width = `${confidence}%`;
                confidenceText.textContent = `Spam Probability: ${confidence}%`;
                
                resultExplanation.innerHTML = `
                    <strong>High-risk indicators triggered:</strong> Found ${matchedKeywords.length > 0 ? matchedKeywords.slice(0, 3).map(k => `"${k}"`).join(', ') : 'suspicious character patterns'}. Recommend filtering to junk.
                `;
            } else {
                resultStatusBadge.textContent = '✅ LEGITIMATE (HAM)';
                resultStatusBadge.className = 'result-status-badge ham';
                confidenceBarFill.className = 'confidence-bar-fill ham';
                confidenceBarFill.style.width = `${confidence}%`;
                confidenceText.textContent = `Legitimate Confidence: ${confidence}%`;

                resultExplanation.innerHTML = `
                    <strong>Clean Text Profile:</strong> Standard syntax and legitimate vocabulary. Low spam risk detected by classification model.
                `;
            }
        });
    }

    // --- 3. Interactive Resume Modal & Download ---
    if (downloadResumeBtn && resumeModal && closeModalBtn) {
        downloadResumeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('hidden');
        });

        closeModalBtn.addEventListener('click', () => {
            resumeModal.classList.add('hidden');
        });

        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.add('hidden');
            }
        });
    }

    // Download Resume as formatted TXT file
    if (downloadActualResumeBtn) {
        downloadActualResumeBtn.addEventListener('click', () => {
            const resumeContent = `
===================================================================
METTU ANUVIKA - RESUME
Aspiring Software Engineer | B.Tech Information Technology Student
===================================================================
Email: anvikamettu9@gmail.com
Phone: +91 9347265335
Location: Telangana, India
LinkedIn: https://www.linkedin.com/in/mettu-anuvika-20b353335
GitHub: https://github.com/mettuanvikanu-code

-------------------------------------------------------------------
PROFESSIONAL SUMMARY
-------------------------------------------------------------------
Final-year Information Technology student with hands-on experience in 
Java, Python, Django, SQL, and full-stack web development. I enjoy 
solving problems, building useful applications, and continuously 
improving my skills in data structures, algorithms, machine learning, 
and web development.

-------------------------------------------------------------------
EDUCATION
-------------------------------------------------------------------
B.Tech in Information Technology (2023 - 2027 Expected)
Teegala Krishna Reddy Engineering College, Telangana, India
CGPA: 8.10 / 10

-------------------------------------------------------------------
TECHNICAL SKILLS
-------------------------------------------------------------------
- Programming Languages: Python, Java, C
- Web Development: HTML, CSS, Django
- Database: SQL
- Core Concepts: Object-Oriented Programming (OOP), Data Structures & Algorithms
- Machine Learning: Scikit-learn, Pandas, NumPy
- Tools & Software: GitHub, Microsoft Excel, MS Word, MS PowerPoint

-------------------------------------------------------------------
FEATURED PROJECT
-------------------------------------------------------------------
Email Spam Filtering System
Technologies: Python, Machine Learning, Scikit-learn, Pandas, NumPy
- Built a machine-learning-based email spam filtering system that classifies emails as spam or legitimate.
- Preprocessed email data for classification.
- Trained a model to identify spam and legitimate emails.
- Created a web application concept for real-time spam detection.

-------------------------------------------------------------------
CERTIFICATIONS
-------------------------------------------------------------------
- ServiceNow Certified Implementation Specialist: Data Foundations (CMDB & CSDM) (2026)
- Infosys Springboard — C Programming (2024)

-------------------------------------------------------------------
ACHIEVEMENTS & CONTINUOUS LEARNING
-------------------------------------------------------------------
- Developed an email spam filtering system using machine learning.
- Built a web application for real-time email spam detection.
- Currently learning Microsoft Excel for data analysis and reporting.
- Continuously strengthening machine learning, web development, and DSA skills.

-------------------------------------------------------------------
SOFT SKILLS
-------------------------------------------------------------------
- Problem Solving
- Communication
- Team Collaboration
- Time Management
- Continuous Learning
===================================================================
            `;

            const blob = new Blob([resumeContent.trim()], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Mettu_Anuvika_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // --- 4. Copy to Clipboard Utility ---
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalIcon = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i>';
                    setTimeout(() => {
                        btn.innerHTML = originalIcon;
                    }, 2000);
                }).catch(err => {
                    console.error('Copy failed: ', err);
                });
            }
        });
    });

    // --- 5. Contact Form Submission Handler ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('user-name').value.trim();
            const email = document.getElementById('user-email').value.trim();
            const message = document.getElementById('user-message').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Please complete all required fields.';
                formStatus.className = 'form-status error';
                formStatus.classList.remove('hidden');
                return;
            }

            // Simulate form submission success
            formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`;
            formStatus.className = 'form-status success';
            formStatus.classList.remove('hidden');

            contactForm.reset();

            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 6000);
        });
    }
});
