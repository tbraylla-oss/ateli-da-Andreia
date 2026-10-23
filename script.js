document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile Hambúrguer
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            });
        });
    }

    // 2. Alternador de Modo Claro/Escuro (Theme Toggle)
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 3. Painel de Customização de Cores em Tempo Real
    const customizerToggle = document.getElementById('customizerToggle');
    const customizerPanel = document.getElementById('customizerPanel');
    const primaryColorInput = document.getElementById('primaryColor');
    const bgColorInput = document.getElementById('bgColor');
    const textColorInput = document.getElementById('textColor');
    const resetBtn = document.getElementById('resetColors');

    if (customizerToggle && customizerPanel) {
        customizerToggle.addEventListener('click', () => {
            customizerPanel.classList.toggle('open');
        });
    }

    if (primaryColorInput) {
        primaryColorInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--primary-color', e.target.value);
            document.documentElement.style.setProperty('--primary-dark', shadeColor(e.target.value, -20));
        });
    }

    if (bgColorInput) {
        bgColorInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--bg-color', e.target.value);
        });
    }

    if (textColorInput) {
        textColorInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--text-color', e.target.value);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.documentElement.style.removeProperty('--primary-color');
            document.documentElement.style.removeProperty('--primary-dark');
            document.documentElement.style.removeProperty('--bg-color');
            document.documentElement.style.removeProperty('--text-color');
            if (primaryColorInput) primaryColorInput.value = '#8A2BE2';
            if (bgColorInput) bgColorInput.value = '#ffffff';
            if (textColorInput) textColorInput.value = '#1a1a1a';
        });
    }

    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
        R = (R<255)?R:255; G = (G<255)?G:255; B = (B<255)?B:255;
        R = (R<0)?0:R; G = (G<0)?0:G; B = (B<0)?0:B;
        const rHex = (R.toString(16).length==1)?"0"+R.toString(16):R.toString(16);
        const gHex = (G.toString(16).length==1)?"0"+G.toString(16):G.toString(16);
        const bHex = (B.toString(16).length==1)?"0"+B.toString(16):B.toString(16);
        return "#"+rHex+gHex+bHex;
    }

    // 4. Scroll Activo (Links da Navbar mudam conforme a rolagem)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 160)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });
});
