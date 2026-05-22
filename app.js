/* =========================================================
   INK FRAMES STUDIO — App Script
   ========================================================= */

// ===== CLOCK =====
function updateClock() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const timeString = formatter.format(now);
  const clockElement = document.getElementById('clockTime');
  if (clockElement) {
    clockElement.textContent = timeString;
  }
}

// Update immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('gone');
      setTimeout(() => {
        loader.style.pointerEvents = 'none';
      }, 900);
    }, 2400);
  }
});

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorLabel = document.getElementById('cursorLabel');

let mouseX = 0;
let mouseY = 0;
let isActive = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (!isActive) {
    cursor.classList.add('active');
    isActive = true;
  }
  
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  
  // Check if hovering over interactive element
  const target = e.target.closest('[data-cursor]');
  if (target) {
    cursor.classList.add('over-target');
    const label = target.getAttribute('data-cursor');
    if (label) {
      cursorLabel.textContent = label;
      cursor.classList.add('has-label');
    }
  } else {
    cursor.classList.remove('over-target', 'has-label');
    cursorLabel.textContent = '';
  }
});

document.addEventListener('mouseleave', () => {
  cursor.classList.remove('active', 'over-target', 'has-label');
  isActive = false;
});

// ===== SCROLL PROGRESS & DOTS =====
const scrollContainer = document.getElementById('scrollContainer');
const scrollBar = document.getElementById('scrollBar');
const navDots = document.querySelectorAll('.nav-dots .dot');
const sections = document.querySelectorAll('.section');

function updateScrollProgress() {
  if (!scrollContainer) return;
  
  const totalWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  const scrolled = scrollContainer.scrollLeft;
  const progress = totalWidth > 0 ? (scrolled / totalWidth) * 100 : 0;
  
  if (scrollBar) {
    scrollBar.style.width = progress + '%';
  }
  
  // Update active dot
  const sectionWidth = scrollContainer.clientWidth;
  const currentIndex = Math.round(scrollContainer.scrollLeft / sectionWidth);
  
  navDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

if (scrollContainer) {
  scrollContainer.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();
}

// ===== SECTION NAVIGATION =====
function scrollToSection(targetId) {
  if (!scrollContainer) return;
  
  const target = document.getElementById(targetId);
  if (!target) return;
  
  const sectionWidth = scrollContainer.clientWidth;
  const sectionIndex = Array.from(sections).indexOf(target);
  
  if (sectionIndex >= 0) {
    const scrollLeft = sectionIndex * sectionWidth;
    scrollContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }
}

// Navigation dots
navDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = dot.getAttribute('data-target');
    scrollToSection(target);
  });
});

// Section nav arrows
document.querySelectorAll('.section-nav').forEach(nav => {
  nav.addEventListener('click', () => {
    const target = nav.getAttribute('data-target');
    scrollToSection(target);
  });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    const sectionWidth = scrollContainer.clientWidth;
    const currentIndex = Math.round(scrollContainer.scrollLeft / sectionWidth);
    if (currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1].id);
    }
  } else if (e.key === 'ArrowLeft') {
    const sectionWidth = scrollContainer.clientWidth;
    const currentIndex = Math.round(scrollContainer.scrollLeft / sectionWidth);
    if (currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1].id);
    }
  }
});

// ===== TV SERVICES CHANNELS =====
const services = [
  { num: "01", name: "Montage vidéo", desc: "Narration fluide et impactante" },
  { num: "02", name: "Photographie", desc: "Images qui racontent une histoire" },
  { num: "03", name: "Animation 2D/3D", desc: "Mouvement et dimension créatifs" },
  { num: "04", name: "Motion design", desc: "Dynamique et fluidité visuelles" },
  { num: "05", name: "Bande sonore", desc: "Ambiance et émotion sonores" },
  { num: "06", name: "Prise de son", desc: "Capturer l'essence audio" },
  { num: "07", name: "Écriture", desc: "Récits forts et authentiques" },
  { num: "08", name: "Newsletters", desc: "Contenu engageant et pertinent" },
  { num: "09", name: "Storytelling", desc: "Histoires qui marquent les esprits" },
  { num: "10", name: "Web Designer", desc: "Interfaces élégantes et intuitives" },
  { num: "11", name: "Catering", desc: "Bien-être et convivialité" }
];

let currentChannel = 0;

function updateServiceDisplay() {
  const service = services[currentChannel];
  const display = document.getElementById('serviceDisplay');
  const channelDisplay = document.getElementById('channelDisplay');
  
  if (display && service) {
    display.innerHTML = `
      <div class="service-number">${service.num}</div>
      <div class="service-name">${service.name}</div>
      <div class="service-description">${service.desc}</div>
    `;
    
    // Trigger animation
    display.style.animation = 'none';
    setTimeout(() => {
      display.style.animation = '';
    }, 10);
  }
  
  if (channelDisplay) {
    channelDisplay.textContent = String(currentChannel + 1).padStart(2, '0');
  }
}

const prevChannelBtn = document.getElementById('prevChannel');
const nextChannelBtn = document.getElementById('nextChannel');

if (prevChannelBtn) {
  prevChannelBtn.addEventListener('click', () => {
    currentChannel = (currentChannel - 1 + services.length) % services.length;
    updateServiceDisplay();
  });
}

if (nextChannelBtn) {
  nextChannelBtn.addEventListener('click', () => {
    currentChannel = (currentChannel + 1) % services.length;
    updateServiceDisplay();
  });
}

// Initialize display
updateServiceDisplay();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Show success message
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        successMsg.hidden = false;
      }
      
      // Reset form
      contactForm.reset();
      
      // Hide success after 3s
      setTimeout(() => {
        if (successMsg) {
          successMsg.hidden = true;
        }
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 3000);
      
    } catch (err) {
      console.error('Form submission error:', err);
    }
  });
}

// ===== PREVENT SCROLL SNAP ON WHEEL =====
// Allow smooth horizontal scrolling
if (scrollContainer) {
  let isScrolling = false;
  
  scrollContainer.addEventListener('wheel', (e) => {
    // Only handle if we're scrolling horizontally more than vertically
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.5) {
      e.preventDefault();
      
      if (!isScrolling) {
        isScrolling = true;
        const currentScroll = scrollContainer.scrollLeft;
        const targetScroll = currentScroll + e.deltaX * 0.8;
        
        scrollContainer.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          isScrolling = false;
        }, 100);
      }
    }
  }, { passive: false });
}
