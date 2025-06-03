 (() => {
    // Dark mode toggle
    const darkToggle = document.getElementById('darkToggle');
    const darkModeInput = darkToggle.querySelector('input');

    function setDarkMode(enabled) {
      if(enabled){
        document.body.classList.add('dark');
        darkToggle.setAttribute('aria-checked', 'true');
        darkModeInput.checked = true;
      } else {
        document.body.classList.remove('dark');
        darkToggle.setAttribute('aria-checked', 'false');
        darkModeInput.checked = false;
      }
    }
    darkToggle.addEventListener('click', () => {
      setDarkMode(!document.body.classList.contains('dark'));
    });
    darkToggle.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        setDarkMode(!document.body.classList.contains('dark'));
      }
    });

    // Language switcher EN/AR toggle
    const langSwitcher = document.getElementById('langSwitcher');
    langSwitcher.addEventListener('click', () => {
      if(langSwitcher.textContent === 'EN'){
        langSwitcher.textContent = 'AR';
        document.documentElement.setAttribute('dir','rtl');
        document.documentElement.setAttribute('lang','ar');
      } else {
        langSwitcher.textContent = 'EN';
        document.documentElement.setAttribute('dir','ltr');
        document.documentElement.setAttribute('lang','en');
      }
    });
    langSwitcher.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        langSwitcher.click();
      }
    });

    // Ripple effect on buttons (hero ctas & search button)
    function createRipple(event) {
      const button = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
      circle.classList.add("ripple");

      const ripple = button.getElementsByClassName("ripple")[0];
      if(ripple){
        ripple.remove();
      }
      button.appendChild(circle);
    }
    document.querySelectorAll('.btn-cta, .search-btn').forEach(btn => {
      btn.addEventListener('click', function(e){
        createRipple(e);
      });
    });

    // Typed text animation for hero tagline
    const phrases = [
      "Explore Dubai Like Never Before",
      "Luxury Travel Packages Tailored For You",
      "Unforgettable Villas And Nightlife Await",
      "Seamless Flights, Rentals, And eSIM Deals"
    ];
    const typedTextSpan = document.querySelector(".typed-text");

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenPhrases = 2000;

    function type(){
      const currentPhrase = phrases[textIndex];
      if(!isDeleting){
        typedTextSpan.textContent = currentPhrase.slice(0, charIndex+1);
        charIndex++;
        if(charIndex === currentPhrase.length){
          isDeleting = true;
          setTimeout(type, delayBetweenPhrases);
          return;
        }
      } else {
        typedTextSpan.textContent = currentPhrase.slice(0, charIndex-1);
        charIndex--;
        if(charIndex === 0){
          isDeleting = false;
          textIndex = (textIndex + 1) % phrases.length;
        }
      }
      setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
    }
    window.addEventListener("load", () => {
      if(phrases.length) type();
    });

    // Search section tab switching with morph input placeholder change
    const tabs = document.querySelectorAll('.search-tab');
    const searchInput = document.getElementById('searchInput');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        searchInput.placeholder = `Search for ${tab.textContent.toLowerCase()}...`;
      });
      tab.addEventListener('keydown', e => {
        if(e.key === 'ArrowRight'){
          e.preventDefault();
          let next = tab.nextElementSibling || tabs[0];
          next.focus();
        } else if(e.key === 'ArrowLeft'){
          e.preventDefault();
          let prev = tab.previousElementSibling || tabs[tabs.length-1];
          prev.focus();
        } else if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          tab.click();
        }
      });
    });

    // City selector dropdown
    const citySelector = document.getElementById('citySelector');
    const cityDropdown = document.getElementById('cityDropdown');
    const cityList = document.getElementById('cityList');
    const dropdownArrow = document.getElementById('dropdownArrow');
    const selectedCityLabel = document.getElementById('selectedCityLabel');
    const selectedCityFlag = document.getElementById('selectedCityFlag');

    function toggleCityDropdown(open){
      if(open === undefined) open = !cityList.classList.contains('open');
      cityList.classList.toggle('open', open);
      dropdownArrow.classList.toggle('open', open);
      cityDropdown.setAttribute('aria-expanded', open);
      citySelector.setAttribute('aria-expanded', open);
      if(open){
        cityList.querySelector('[tabindex="0"]').focus();
      } else {
        cityDropdown.focus();
      }
    }
    cityDropdown.addEventListener('click', () => toggleCityDropdown());
    cityDropdown.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown'){
        e.preventDefault();
        toggleCityDropdown(true);
      } else if(e.key === 'Escape'){
        e.preventDefault();
        toggleCityDropdown(false);
      }
    });
    citySelector.addEventListener('keydown', e => {
      if(e.key === 'Escape'){
        toggleCityDropdown(false);
      }
    });

    cityList.querySelectorAll('.city-list-item').forEach(item => {
      item.addEventListener('click', () => {
        selectedCityLabel.textContent = item.dataset.city;
        selectedCityFlag.src = item.dataset.flag;
        toggleCityDropdown(false);
      });
      item.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          item.click();
        } else if(e.key === 'ArrowDown'){
          e.preventDefault();
          let next = item.nextElementSibling || cityList.firstElementChild;
          next.focus();
        } else if(e.key === 'ArrowUp'){
          e.preventDefault();
          let prev = item.previousElementSibling || cityList.lastElementChild;
          prev.focus();
        } else if(e.key === 'Escape'){
          toggleCityDropdown(false);
        }
      })
    });

    // Search button loading animation and expanding effect
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', () => {
      if(searchBtn.classList.contains('loading')) return;
      searchBtn.classList.add('loading');
      // Simulate loading
      setTimeout(() => {
        searchBtn.classList.remove('loading');
        alert(`Searching for: ${searchInput.value}`);
      }, 1800);
    });

    // Service Cards flip on click
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('click', e => {
        card.classList.toggle('flipped');
        // Update aria-pressed
        let pressed = card.getAttribute('aria-pressed') === 'true';
        card.setAttribute('aria-pressed', (!pressed).toString());
      });
      card.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          card.click();
        }
      });
    });

    // Category filters for services
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
          b.tabIndex = -1;
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        btn.tabIndex = 0;
        const filter = btn.dataset.filter;
        serviceCards.forEach(card => {
          if(filter === 'all' || card.dataset.category === filter){
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
      btn.addEventListener('keydown', e => {
        if(e.key === 'ArrowRight'){
          e.preventDefault();
          let next = btn.nextElementSibling || filterButtons[0];
          next.focus();
        } else if(e.key === 'ArrowLeft'){
          e.preventDefault();
          let prev = btn.previousElementSibling || filterButtons[filterButtons.length-1];
          prev.focus();
        } else if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          btn.click();
        }
      });
    });

    // Animated Counters
    function animateCounter(element, endValue, duration=1500){
      let start = 0;
      let startTime = null;

      function step(timestamp){
        if(!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let val = Math.min(Math.floor(progress / duration * endValue), endValue);
        element.textContent = val;
        if(progress < duration) {
          requestAnimationFrame(step);
        } else {
          element.textContent = endValue;
        }
      }
      requestAnimationFrame(step);
    }
    document.querySelectorAll('.counter-value').forEach(counter => {
      const endVal = parseInt(counter.textContent);
      counter.textContent = '0';
      animateCounter(counter, endVal);
    });

    // Sticky Navbar with transparent to solid on scroll & auto hide show on scroll
    const header = document.querySelector('header');
    let lastScrollY = window.pageYOffset;
    window.addEventListener('scroll', () => {
      let currentScrollY = window.pageYOffset;
      if(currentScrollY > 100){
        header.classList.add('solid');
      } else {
        header.classList.remove('solid');
      }
      if(currentScrollY > lastScrollY && currentScrollY > 100){
        // scroll down - hide
        header.classList.add('hide');
      } else {
        // scroll up - show
        header.classList.remove('hide');
      }
      lastScrollY = currentScrollY;

      // Scroll Spy Nav Highlight
      const sections = ['hero', 'search', 'services', 'testimonials', 'map', 'footer'];
      let pos = window.scrollY + 60;
      let currentSection = sections[0];
      for(let i=0; i<sections.length; i++){
        const sec = document.getElementById(sections[i]);
        if(sec && sec.offsetTop <= pos){
          currentSection = sections[i];
        }
      }
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
      });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if(target){
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Testimonials Slider
    const testimonialsWrapper = document.getElementById('testimonialsWrapper');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    const testimonialCards = testimonialsWrapper.querySelectorAll('.testimonial-card');
    let testimonialIndex = 0;

    function updateTestimonialPosition(){
      let offset = -testimonialIndex * (testimonialCards[0].offsetWidth + 12);
      testimonialsWrapper.style.transform = `translateX(${offset}px)`;
    }
    prevTestimonial.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex === 0) ? testimonialCards.length - 1 : testimonialIndex - 1;
      updateTestimonialPosition();
    });
    nextTestimonial.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
      updateTestimonialPosition();
    });

    // Enable swipe on testimonials (mobile)
    let startX = 0;
    testimonialsWrapper.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    testimonialsWrapper.addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;
      if(endX - startX > 40){
        prevTestimonial.click();
      } else if(startX - endX > 40){
        nextTestimonial.click();
      }
    });

    // Interactive Map popup
    const mapSection = document.querySelector('.map-section');
    const popup = document.getElementById('popup');
    const pins = mapSection.querySelectorAll('.location-pin');

    const locations = {
      locBurj: {
        title: "Burj Khalifa",
        desc: "The tallest building in the world."
      },
      locPalm: {
        title: "Palm Jumeirah",
        desc: "Iconic man-made island with luxury resorts."
      },
      locMarina: {
        title: "Dubai Marina",
        desc: "Vibrant residential and leisure area."
      },
      locMall: {
        title: "The Dubai Mall",
        desc: "World's largest shopping mall with entertainment."
      }
    };

    function showPopup(target){
      const rect = mapSection.getBoundingClientRect();
      const cx = target.cx.baseVal.value;
      const cy = target.cy.baseVal.value;
      const loc = locations[target.getAttribute('aria-describedby')] || {title:'', desc:''};
      popup.textContent = `${loc.title} - ${loc.desc}`;
      popup.style.left = (cx + rect.left) + 'px';
      popup.style.top = (cy + rect.top - 40) + 'px';
      popup.hidden = false;
      popup.classList.add('visible');
    }
    function hidePopup(){
      popup.hidden = true;
      popup.classList.remove('visible');
    }

    pins.forEach(pin => {
      pin.addEventListener('mouseenter', (e) => {
        showPopup(e.target);
      });
      pin.addEventListener('focus', (e) => {
        showPopup(e.target);
      });
      pin.addEventListener('mouseleave', () => {
        hidePopup();
      });
      pin.addEventListener('blur', () => {
        hidePopup();
      });
    });

    // Newsletter form validation and animation
    const newsletterForm = document.querySelector('.newsletter');
    const newsletterEmailInput = document.getElementById('newsletterEmail');
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterEmailInput.value.trim();
      if(email === '' || !/\S+@\S+\.\S+/.test(email)){
        alert('Please enter a valid email address.');
        newsletterEmailInput.focus();
        return;
      }
      newsletterForm.querySelector('button').disabled = true;
      // Simulate sending
      setTimeout(() => {
        alert('Thanks for subscribing!');
        newsletterForm.reset();
        newsletterForm.querySelector('button').disabled = false;
      }, 1500);
    });
  })();