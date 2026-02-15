document.addEventListener('DOMContentLoaded', () => {
    
    // 1. THE SKEUOMORPHIC DIAL (Theme Brightness)
    const dial = document.getElementById('themeDial');
    const body = document.body;
    let isDragging = false;

    // We rotate the knob and map that to the CSS --theme-brightness variable
    const updateTheme = (angle) => {
        // Map angle (0 to 180) to brightness (0.2 to 1.2)
        const brightness = 0.2 + (angle / 180) * 1.0;
        body.style.setProperty('--theme-brightness', brightness);
        dial.style.transform = `rotate(${angle}deg)`;
    };

    dial.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        // Calculate angle based on mouse position relative to dial center
        const rect = dial.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        let degrees = radians * (180 / Math.PI);
        
        // Constrain to a semi-circle (0 to 180) for a "Volume Knob" feel
        if (degrees < 0) degrees = 0;
        if (degrees > 180) degrees = 180;
        
        updateTheme(degrees);
    });

    // 2. MAGNETIC BUTTON EFFECT
    const magBtn = document.querySelector('.magnetic-btn');
    
    magBtn.addEventListener('mousemove', (e) => {
        const rect = magBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // The button "follows" the mouse slightly (0.3 sensitivity)
        magBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    magBtn.addEventListener('mouseleave', () => {
        // Snap back to original position
        magBtn.style.transform = `translate(0px, 0px)`;
    });

    // 3. CINEMASCOPE "FOCUS" ENTRANCE
    // When the site loads, the bars start closed and open up like a camera shutter
    const bars = document.querySelectorAll('.cinemascope-bar');
    setTimeout(() => {
        bars[0].style.height = "6vh";
        bars[1].style.height = "6vh";
    }, 500);

});