document.addEventListener('DOMContentLoaded', () => {
  const typed = new Typed('.typed-target', {
    strings: [
      'Programador.',
      'Criador de soluções modernas ⚡',
      'Foco em performance & UX'
    ],
    typeSpeed: 60,
    backSpeed: 35,
    loop: true
  });

  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 70 },
        color: { value: ['#00f0ff', '#b400ff', '#00ff88'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#00ffcc',
          opacity: 0.25,
          width: 1
        },
        move: { enable: true, speed: 1.8, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          repulse: { distance: 120, duration: 0.4 },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  const gridCanvas = document.getElementById('grid-canvas');
  const gc = gridCanvas.getContext && gridCanvas.getContext('2d');
  function resizeGrid(){ gridCanvas.width = innerWidth; gridCanvas.height = innerHeight; drawGrid(); }
  function drawGrid(){
    if(!gc) return;
    gc.clearRect(0,0,gridCanvas.width,gridCanvas.height);
    gc.strokeStyle = 'rgba(0,255,204,0.04)';
    gc.lineWidth = 1;
    const step = 60;
    for(let x=0;x<gridCanvas.width;x+=step){
      for(let y=0;y<gridCanvas.height;y+=step){
        gc.beginPath();
        gc.rect(x,y,step-30,step-30);
        gc.stroke();
      }
    }
  }
  resizeGrid();
  window.addEventListener('resize', resizeGrid);

  let gridVisible = false;
  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn.addEventListener('click', () => {
    gridVisible = !gridVisible;
    document.getElementById('particles-js').style.opacity = gridVisible ? '0' : '1';
    document.getElementById('grid-canvas').style.opacity = gridVisible ? '0.35' : '0.12';
  });

  if(window.AOS) AOS.init({ duration: 800, once: true });

  if(window.VanillaTilt){
    const tilts = document.querySelectorAll('.tilt');
    VanillaTilt.init(tilts, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.12
    });
  }

  const skills = document.querySelectorAll('.skill-card');
  const options = { root: null, threshold: 0.25 };
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const card = entry.target;
        const prog = card.querySelector('.skill-progress');
        const level = card.getAttribute('data-level') || '60';
        prog.style.width = level + '%';
        const levelText = card.querySelector('.skill-level');
        if(levelText) levelText.textContent = level + '%';
        skillObserver.unobserve(card);
      }
    });
  }, options);
  skills.forEach(s => skillObserver.observe(s));

  document.querySelectorAll('#top-nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });



  document.querySelectorAll('.skill-card').forEach(card => {
    card.title = `${card.getAttribute('data-skill')} — nível ${card.getAttribute('data-level')}%`;
  });

  const pdfModal = document.getElementById('pdf-modal');
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfClose = document.querySelector('.pdf-close');
  const cvBtn = document.getElementById('download-cv');

  cvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    pdfViewer.src = 'projetos/IsacBuzelliCurriculo.pdf';
    pdfModal.classList.add('active');
  });

  pdfClose.addEventListener('click', () => {
    pdfModal.classList.remove('active');
    pdfViewer.src = '';
  });

  pdfModal.addEventListener('click', (e) => {
    if(e.target === pdfModal){
      pdfModal.classList.remove('active');
      pdfViewer.src = '';
    }
  });

});
