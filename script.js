document.addEventListener('DOMContentLoaded', () => {
    
    // 1. THE SKEUOMORPHIC DIAL (Theme Brightness)
const dial = document.getElementById('themeDial');
const body = document.body;
let isDragging = false;

const updateTheme = (angle) => {
    // We normalize the angle so 0 is at the top
    const normalizedAngle = angle + 90; 
    
    // Map brightness: as you turn it, it gets brighter
    // We use a simple 0 to 360 scale now for better UX
    const brightness = 0.4 + (Math.abs(angle + 180) / 360) * 1.2;
    
    body.style.setProperty('--theme-brightness', brightness);
    dial.style.transform = `rotate(${normalizedAngle}deg)`;
};

dial.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault(); // Prevents text selection while dragging
});

window.addEventListener('mouseup', () => isDragging = false);

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // The Math.atan2 is perfect, we just need to let it breathe!
    const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let degrees = radians * (180 / Math.PI);
    
    // Now the dial will follow your mouse 1:1
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
