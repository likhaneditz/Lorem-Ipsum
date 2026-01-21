document.addEventListener('DOMContentLoaded', () => {
    
    /* ===========================
       1. Dark/Light Mode Toggle
       =========================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check localStorage or System Preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if(themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    /* ===========================
       2. Mobile Menu Toggle
       =========================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    /* ===========================
       3. Accordion Functionality
       =========================== */
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    /* ===========================
       4. Lorem Ipsum Generator
       =========================== */
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        const outputText = document.getElementById('output-text');
        const amountInput = document.getElementById('amount');
        const typeSelect = document.getElementById('type');

        const latinWords = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
            "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", 
            "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", 
            "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", 
            "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", 
            "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", 
            "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", 
            "est", "laborum"
        ];

        // Generate a random sentence
        function generateSentence() {
            const length = Math.floor(Math.random() * 10) + 5; // 5-15 words
            let sentence = [];
            for(let i=0; i<length; i++) {
                const word = latinWords[Math.floor(Math.random() * latinWords.length)];
                sentence.push(word);
            }
            // Capitalize first letter and add period
            let str = sentence.join(' ');
            return str.charAt(0).toUpperCase() + str.slice(1) + '.';
        }

        // Generate Paragraph
        function generateParagraph() {
            const numSentences = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
            let paragraph = "";
            for(let i=0; i<numSentences; i++) {
                paragraph += generateSentence() + " ";
            }
            return paragraph.trim();
        }

        // Main Generate Logic
        generateBtn.addEventListener('click', () => {
            const amount = parseInt(amountInput.value);
            const type = typeSelect.value;
            let result = "";

            if (type === 'paragraphs') {
                let paragraphs = [];
                // First paragraph usually starts with standard Lorem Ipsum
                if (amount > 0) paragraphs.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
                
                for(let i = 1; i < amount; i++) {
                    paragraphs.push(generateParagraph());
                }
                result = paragraphs.join('\n\n');
            } 
            else if (type === 'sentences') {
                let sentences = [];
                for(let i = 0; i < amount; i++) {
                    sentences.push(generateSentence());
                }
                result = sentences.join(' ');
            } 
            else if (type === 'words') {
                let words = [];
                for(let i = 0; i < amount; i++) {
                    words.push(latinWords[Math.floor(Math.random() * latinWords.length)]);
                }
                result = words.join(' ');
            }

            outputText.value = result;
        });

        // Trigger generation on load (optional)
        generateBtn.click();
    }

    /* ===========================
       5. Copy to Clipboard
       =========================== */
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const outputText = document.getElementById('output-text');
            outputText.select();
            outputText.setSelectionRange(0, 99999); // Mobile support

            navigator.clipboard.writeText(outputText.value).then(() => {
                const toast = document.getElementById('copy-message');
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }
});
