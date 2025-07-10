// Restart sequence for the interactive feature
const restartCode = ['r', 'e', 's', 't', 'a', 'r', 't'];

// Track user's position in the restart sequence
let restartCodePosition = 0;

// Initialize the typed animation for the strike-through text
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if Typed.js is loaded
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#strike', {
            strings: [
                'restart',
                'reboot',
                'shutdown',
                'power cycle',
                'turn off and on',
                'reset',
                'power down'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            smartBackspace: false,
            loop: true,
            shuffle: false,
            backDelay: 2000,
            startDelay: 3000,
        });

        // Force the start of cursor animation while the startDelay is ticking
        if (typed.cursor != null) {
            typed.cursor.classList.add('typed-cursor--blink');
        }
    }
});

// Easter egg: typing "restart" activates a special animation
function activateRestartMode() {
    // Change the background to a computer restart screen effect
    document.body.style.backgroundImage = 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)';
    document.body.style.backgroundSize = '20px 20px';
    document.body.style.backgroundColor = '#111';
    document.body.style.backgroundPosition = '0 0, 0 10px, 10px -10px, -10px 0px';

    const elements = [
        document.getElementById('wholesite'),
        ...document.getElementsByTagName('p'),
        ...document.getElementsByTagName('ul'),
        ...document.getElementsByTagName('h1'),
        ...document.getElementsByTagName('h2'),
    ];

    for (const ele of elements) {
        if (ele != null) {
            ele.style.cssText = 'color: #00ff00 !important; text-shadow: 0 0 10px #00ff00;';
        }
    }

    // Style the footer
    document.getElementsByTagName('footer')[0].style.cssText =
        'background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 45%) !important; color: #00ff00 !important;';

    // Style the example cards with a retro computer look
    const cards = document.getElementsByClassName('example');
    for (const card of cards) {
        card.style.cssText =
            'background: #000 !important; border: 2px solid #00ff00 !important; box-shadow: 0 0 20px #00ff00 !important;';
    }

    // Style the subtitle
    const subtitle = document.getElementsByClassName('subtitle')[0];
    if (subtitle) {
        subtitle.style.cssText = 'color: #00ff00 !important; opacity: 80%;';
    }

    // Add a "system restarting" message
    setTimeout(() => {
        const restartMessage = document.createElement('div');
        restartMessage.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: #000; color: #00ff00; padding: 20px; border: 2px solid #00ff00; 
                        font-family: monospace; font-size: 18px; z-index: 1000; text-align: center;
                        box-shadow: 0 0 20px #00ff00;">
                <div>🔄 SYSTEM RESTART INITIATED</div>
                <div style="margin-top: 10px; font-size: 14px;">Press any key to continue...</div>
            </div>
        `;
        document.body.appendChild(restartMessage);

        // Remove the message after 3 seconds or on key press
        const removeMessage = () => {
            if (restartMessage.parentNode) {
                restartMessage.parentNode.removeChild(restartMessage);
            }
            document.removeEventListener('keydown', removeMessage);
        };

        document.addEventListener('keydown', removeMessage);
        setTimeout(removeMessage, 3000);
    }, 1000);
}

// Add keydown event listener for the easter egg
document.addEventListener('keydown', (e) => {
    // Get the value of the required key from the restart code
    const requiredKey = restartCode[restartCodePosition];

    // Compare the key with the required key
    if (e.key.toLowerCase() === requiredKey) {
        // Move to the next key in the sequence
        restartCodePosition += 1;

        // If the last key is reached, activate restart mode
        if (restartCodePosition === restartCode.length) {
            activateRestartMode();
            restartCodePosition = 0;
        } else if (restartCodePosition === 3) {
            // Preload any restart animation at 3rd character
            const preload = document.getElementById('preloadimg');
            if (preload != null) {
                preload.classList.add('now');
            }
        }
    } else {
        // Reset the position if wrong key is pressed
        restartCodePosition = 0;
    }
});

// Add some smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Add a subtle animation to system messages when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all system messages
    const systemMessages = document.querySelectorAll('.system-message');
    systemMessages.forEach(function(message) {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        message.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(message);
    });
});

// Add a fun counter that shows how long it's been since the page "restarted" (loaded)
document.addEventListener('DOMContentLoaded', function() {
    const startTime = Date.now();
    
    function updateUptime() {
        const now = Date.now();
        const uptime = now - startTime;
        
        const seconds = Math.floor(uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        let uptimeText;
        if (hours > 0) {
            uptimeText = `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            uptimeText = `${minutes}m ${seconds % 60}s`;
        } else {
            uptimeText = `${seconds}s`;
        }
        
        // Update any uptime display elements if they exist
        const uptimeElements = document.querySelectorAll('.uptime');
        uptimeElements.forEach(function(element) {
            element.textContent = uptimeText;
        });
    }
    
    // Update every second
    setInterval(updateUptime, 1000);
    updateUptime();
});
