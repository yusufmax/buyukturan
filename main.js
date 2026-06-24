/* ═══════════════════════════════════════════════
   GREAT TURAN DEFENCE — Main JavaScript
   Sticky header, smooth scroll, language switcher,
   scroll-reveal, form handling, mobile menu
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Translation Data ──
  const translations = {
    en: {
      'nav.about': 'About',
      'nav.expertise': 'Expertise',
      'nav.why': 'Why Us',
      'nav.contact': 'Contact',
      'logo.bold': 'DEFENCE',
      'hero.title1': 'GREAT',
      'hero.title2': 'TURAN',
      'hero.title3': 'DEFENCE',
      'hero.subtitle': 'Engineering protection for those who protect others.',
      'hero.desc': 'Great Turan Defence. Design and manufacturing of personal protective equipment.',
      'hero.cta': 'Contact Us',
      'about.label': 'About the Company',
      'about.heading': 'Built on\nPurpose',
      'about.p1': 'Great Turan Defence was established in Tashkent to meet the vital demand for high-integrity, locally engineered protective equipment. We operate at the intersection of modern materials science and strict military-grade production requirements, ensuring our gear withstands the most demanding tactical environments.',
      'about.p2': 'Our identity is anchored in the legacy of the Turanian wolf — representing unwavering vigilance, resilience, and collective protection. This philosophy guides our research and development, motivating our engineers to push the boundaries of durability, weight reduction, and ergonomic movement.',
      'about.p3': 'Based in the historic Shaykhantakhur district of Tashkent, our state-of-the-art facility houses R&D laboratories and controlled assembly lines. Here, every batch of ballistic inserts, plate carriers, and tactical gear undergoes exhaustive quality control before deployment to governmental and institutional partners.',
      'about.fact2': 'Ballistic Integrity',
      'about.fact3': 'Severe Testing Protocols',
      'about.fact4val': 'Tashkent',
      'about.fact4': 'R&D and Assembly HQ',
      'about.quote': '"Our commitment is absolute. We do not design for compliance; we design for survival."',
      'about.quote.author': 'Engineering & Development Team',
      'expertise.label': 'Areas of Expertise',
      'expertise.heading': 'What We Engineer',
      'expertise.card1.title': 'Ballistic & Body Protection',
      'expertise.card1.desc': 'Engineering and fabrication of NIJ-compliant body armor, plate carriers, and lightweight composite armor plates. Designed to absorb severe impacts while minimizing trauma and maintaining maximum ergonomic mobility.',
      'expertise.card2.title': 'Tactical Protective Gear',
      'expertise.card2.desc': 'Manufacturing of high-durability load-bearing vests, tactical belts, modular pouches, and specialized protective uniforms. Utilizing military-grade Cordura and heat-resistant textiles for extreme operational durability.',
      'expertise.card3.title': 'Materials Engineering & R&D',
      'expertise.card3.desc': 'Ongoing investigation into advanced polymer composites, ultra-high-molecular-weight polyethylene (UHMWPE), and ballistic ceramics to reduce equipment weight without sacrificing protective surface integrity.',
      'expertise.card4.title': 'Custom & Institutional Orders',
      'expertise.card4.desc': 'Providing specialized manufacturing services tailored to specific governmental and institutional mandates. We develop customized gear sets conforming to unique operational requirements and terrain specifications.',
      'why.label': 'Why Great Turan Defence',
      'why.heading': 'Trust & Standards',
      'why.card1.title': 'National Focus',
      'why.card1.desc': 'Deeply aligned with the regional security environment. Our local production lines in Tashkent ensure secure supply chains, prompt technical support, and direct accountability to national institutions.',
      'why.card2.title': 'Engineering Discipline',
      'why.card2.desc': 'Every design iteration is subjected to strict materials testing, mechanical stress evaluation, and ballistic testing under extreme temperatures to ensure life-saving performance when it matters most.',
      'why.card3.title': 'Long-Term Partnership',
      'why.card3.desc': 'We operate as an strategic industrial ally rather than a retail seller. Our partnership model includes long-term maintenance contracts, upgrade programs, and operational feedback integration.',
      'why.card4.title': 'Confidentiality & Compliance',
      'why.card4.desc': 'Absolute discretion is embedded in our operations. We maintain strict compliance with state defence secrets, export controls, and secure data storage policies for all project documentations.',
      'process.label': 'Our Process',
      'process.heading': 'From Concept to Production',
      'process.step1.title': 'Research',
      'process.step1.desc': 'Collaborating with defense experts to analyze operational threats, velocity specs, and thermal operating ranges.',
      'process.step2.title': 'Design',
      'process.step2.desc': '3D CAD modeling, structural stress testing, weight distribution optimization, and advanced composite selection.',
      'process.step3.title': 'Testing',
      'process.step3.desc': 'Live ballistic range testing, drop testing, environmental aging, and chemical exposure endurance certification.',
      'process.step4.title': 'Production',
      'process.step4.desc': 'ISO-compliant controlled manufacturing, laser fabric cutting, precise sewing, and multi-stage manual inspection.',
      'contact.label': 'Get in Touch',
      'contact.heading': 'Contact Us',
      'contact.address.title': 'Address',
      'contact.address.text': 'Urda Mahalla, Labzak Street,<br>Building 1A, Shaykhantakhur District,<br>Tashkent, Uzbekistan',
      'contact.phone.title': 'Phone',
      'contact.email.title': 'Email',
      'contact.form.name': 'Name *',
      'contact.form.org': 'Organization',
      'contact.form.email': 'Email *',
      'contact.form.message': 'Message *',
      'contact.form.submit': 'Send Message',
      'footer.rights': 'All rights reserved.',
      'globe.instructions': 'Drag to rotate • Scroll to zoom',
      'contact.map.title': 'Urda Mahalla, Labzak Street',
      'contact.map.address': 'Building 1A, Shaykhantakhur District, Tashkent, Uzbekistan',
      'contact.map.hint': 'Click to expand',
    },
    uz: {
      'nav.about': 'Biz haqimizda',
      'nav.expertise': 'Yo\'nalishlar',
      'nav.why': 'Nima uchun biz',
      'nav.contact': 'Aloqa',
      'logo.bold': 'DEFENCE',
      'hero.title1': 'GREAT',
      'hero.title2': 'TURAN',
      'hero.title3': 'DEFENCE',
      'hero.subtitle': 'Himoya qiluvchilarni himoya qilish muhandisligi.',
      'hero.desc': 'Great Turan Defence Shaxsiy himoya vositalarini loyihalashtirish va ishlab chiqarish.',
      'hero.cta': 'Biz bilan bog\'lanish',
      'about.label': 'Kompaniya haqida',
      'about.heading': 'Maqsad\nasosida',
      'about.p1': 'Great Turan Defence Toshkent shahrida yuqori sifatli, mahalliy darajada ishlab chiqilgan himoya vositalariga bo\'lgan hayotiy ehtiyojni qondirish uchun tashkil etilgan. Biz zamonaviy materialshunoslik va qat\'iy harbiy ishlab chiqarish talablari chorrahasida faoliyat yuritamiz va uskunalarimiz eng talabchan taktik sharoitlarga bardosh berishini ta\'minlaymiz.',
      'about.p2': 'Bizning o\'zligimiz Turon bo\'risining merosiga asoslangan bo\'lib, u so\'nmas hushyorlik, chidamlilik va jamoaviy himoyani anglatadi. Ushbu falsafa tadqiqot va ishlanmalarimizga rahbarlik qiladi, muhandislarimizni chidamlilik, vaznni kamaytirish va ergonomik harakatlanish chegaralarini kengaytirishga undaydi.',
      'about.p3': 'Toshkentning tarixiy Shayxontohur tumanida joylashgan zamonaviy korxonamizda TTKM laboratoriyalari va nazorat qilinadigan yig\'ish liniyalari joylashgan. Bu yerda har bir partiya ballistik plitalar, bronejiletlar va taktik anjomlar davlat va institutsional hamkorlarga topshirilishidan oldin to\'liq sifat nazoratidan o\'tadi.',
      'about.fact2': 'Ballistik mustahkamlik',
      'about.fact3': 'Qattiq sinov protokollari',
      'about.fact4val': 'Toshkent',
      'about.fact4': 'TTKM va yig\'uv shtabi',
      'about.quote': '"Bizning majburiyatimiz mutlaqdir. Biz qoidalarga rioya qilish uchun emas, balki tirik qolish uchun loyihalashtiramiz."',
      'about.quote.author': 'Muhandislik va ishlab chiqish jamoasi',
      'expertise.label': 'Faoliyat yo\'nalishlari',
      'expertise.heading': 'Biz nima yaratamiz',
      'expertise.card1.title': 'Ballistik va tana himoyasi',
      'expertise.card1.desc': 'NIJ standartlariga mos keladigan bronejiletlar, plita tashuvchilar va engil kompozit zirh plitalarini loyihalash va ishlab chiqarish. Maksimal ergonomik harakatlanishni saqlab qolgan holda jiddiy zarbalarni yutish uchun mo\'ljallangan.',
      'expertise.card2.title': 'Taktik himoya jihozlari',
      'expertise.card2.desc': 'Yuqori chidamlilikka ega razgruzka jiletlari, taktik kamarlar, modulli podsumkalar va maxsus himoya formalarini ishlab chiqarish. Ekstremal foydalanish chidamliligi uchun harbiy darajadagi Cordura va issiqlikka chidamli to\'qimachilikdan foydalaniladi.',
      'expertise.card3.title': 'Materiallar muhandisligi va TTKM',
      'expertise.card3.desc': 'Himoya yuzasining yaxlitligini yo\'qotmasdan uskunalar vaznini kamaytirish uchun ilg\'or polimer kompozitlar, o\'ta yuqori molekulyar og\'irlikdagi polietilen (UHMWPE) va ballistik keramikalarni doimiy tadqiq qilish.',
      'expertise.card4.title': 'Maxsus va institutsional buyurtmalar',
      'expertise.card4.desc': 'Davlat va institutsional mijozlar uchun texnik topshiriq bo\'yicha ishlab chiqilgan jihozlar.',
      'why.label': 'Nima uchun Great Turan Defence',
      'why.heading': 'Ishonch va standartlar',
      'why.card1.title': 'Milliy e\'tibor',
      'why.card1.desc': 'Mintaqaviy xavfsizlik muhiti bilan chuqur muvofiqlashtirilgan. Toshkentdagi mahalliy ishlab chiqarish liniyalarimiz xavfsiz ta\'minot zanjirlarini, tezkor texnik yordamni va milliy muassasalar oldidagi bevosita javobgarlikni ta\'minlaydi.',
      'why.card2.title': 'Muhandislik intizomi',
      'why.card2.desc': 'Dizaynning har bir varianti hayotni saqlab qolish samaradorligini ta\'minlash uchun qat\'iy materiallar sinovidan, mexanik stressni baholashdan va ekstremal haroratlarda ballistik sinovlardan o\'tkaziladi.',
      'why.card3.title': 'Uzoq muddatli hamkorlik',
      'why.card3.desc': 'Biz chakana sotuvchi emas, balki strategik sanoat ittifoqchisi sifatida ishlaymiz. Bizning hamkorlik modelimiz uzoq muddatli texnik xizmat ko\'rsatish shartnomalarini, modernizatsiya dasturlarini va operatsion mulohazalarni birlashtirishni o\'z ichiga oladi.',
      'why.card4.title': 'Maxfiylik va muvofiqlik',
      'why.card4.desc': 'Mutloq maxfiylik faoliyatimizga singdirilgan. Biz davlat mudofaa sirlari, eksport nazorati va loyiha hujjatlari uchun xavfsiz ma\'lumotlarni saqlash siyosatiga qat\'iy rioya qilamiz.',
      'process.label': 'Bizning jarayonimiz',
      'process.heading': 'Kontseptsiyadan ishlab chiqarishgacha',
      'process.step1.title': 'Tadqiqot',
      'process.step1.desc': 'Tezkor tahdidlarni, tezlik ko\'rsatkichlarini va issiqlik ish diapazonlarini tahlil qilish uchun mudofaa ekspertlari bilan hamkorlik qilish.',
      'process.step2.title': 'Loyihalash',
      'process.step2.desc': '3D CAD modellashtirish, strukturaviy stressni sinash, vazn taqsimotini optimallashtirish va ilg\'or kompozitlarni tanlash.',
      'process.step3.title': 'Sinov',
      'process.step3.desc': 'Jonli ballistik poligon sinovlari, pasayish sinovlari, atrof-muhitning qarishi va kimyoviy ta\'sirga chidamlilik sertifikati.',
      'process.step4.title': 'Ishlab chiqarish',
      'process.step4.desc': 'ISO standartlariga mos keladigan nazorat ostida ishlab chiqarish, lazer yordamida matolarni kesish va ko\'p bosqichli qo\'lda tekshirish.',
      'contact.label': 'Bog\'lanish',
      'contact.heading': 'Biz bilan aloqa',
      'contact.address.title': 'Manzil',
      'contact.address.text': 'Urda mahallasi, Labzak ko\'chasi,<br>1A bino, Shayxontohur tumani,<br>Toshkent, O\'zbekiston',
      'contact.phone.title': 'Telefon',
      'contact.email.title': 'Elektron pochta',
      'contact.form.name': 'Ism *',
      'contact.form.org': 'Tashkilot',
      'contact.form.email': 'Elektron pochta *',
      'contact.form.message': 'Xabar *',
      'contact.form.submit': 'Xabar yuborish',
      'footer.rights': 'Barcha huquqlar himoyalangan.',
      'globe.instructions': 'Aylantirish uchun sudrang • Kattalashtirish uchun aylantiring',
      'contact.map.title': 'Urda mahallasi, Labzak ko\'chasi',
      'contact.map.address': '1A bino, Shayxontohur tumani, Toshkent, O\'zbekiston',
      'contact.map.hint': 'Kengaytirish uchun bosing',
    },
  };
  let currentLang = 'en';

  // ── DOM References ──
  const header = document.getElementById('site-header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMain = document.querySelector('.nav-main');
  const langBtns = document.querySelectorAll('.lang-btn');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // ── Header Scroll Behavior ──
  let lastScroll = 0;
  const scrollThreshold = 80;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScroll();
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ── Mobile Menu ──
  if (mobileMenuBtn && navMain) {
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = navMain.classList.contains('mobile-open');
      navMain.classList.toggle('mobile-open');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close mobile menu on nav link click
    navMain.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMain.classList.remove('mobile-open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ── Language Switcher ──
  function applyTranslations(lang) {
    currentLang = lang;
    const trans = translations[lang];
    if (!trans) return;

    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'uz' ? 'uz' : lang === 'ru' ? 'ru' : 'en');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const value = trans[key];
      if (value !== undefined) {
        // Some values contain <br> for line breaks
        if (value.includes('<br>') || value.includes('\n')) {
          el.innerHTML = value.replace(/\n/g, '<br>');
        } else {
          el.textContent = value;
        }
      }
    });

    // Update active state on language buttons
    langBtns.forEach(function (btn) {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    // Update document title
    const titles = {
      en: 'Great Turan Defence — Military Protective Equipment',
      uz: 'Great Turan Defence — Harbiy himoya vositalari',
    };
    document.title = titles[lang] || titles.en;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descriptions = {
        en: 'Great Turan Defence — Uzbekistan-based developer and manufacturer of military-grade protective equipment.',
        uz: 'Great Turan Defence — O\'zbekistonda joylashgan harbiy darajadagi himoya vositalarini ishlab chiqaruvchi.',
      };
      metaDesc.setAttribute('content', descriptions[lang] || descriptions.en);
    }

    // Update map hint if it exists
    const mapCard = document.getElementById('expand-map-card');
    const mapHint = document.querySelector('.expand-map-hint');
    if (mapCard && mapHint) {
      const isExpanded = mapCard.classList.contains('expanded');
      if (isExpanded) {
        mapHint.textContent = lang === 'uz' ? 'Yopish uchun bosing' : 'Click to collapse';
      } else {
        mapHint.textContent = lang === 'uz' ? 'Kengaytirish uchun bosing' : 'Click to expand';
      }
    }
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTranslations(this.getAttribute('data-lang'));
    });
  });

  // ── Scroll Reveal (IntersectionObserver) ──
  function initScrollReveal() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-element').forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            // Stagger animation by 40ms per item for sibling cards
            const siblings = entry.target.parentElement.querySelectorAll('.reveal-element');
            let staggerIndex = 0;
            siblings.forEach(function (sib, i) {
              if (sib === entry.target) staggerIndex = i;
            });

            setTimeout(function () {
              entry.target.classList.add('revealed');
            }, staggerIndex * 60);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.reveal-element').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Contact Form ──
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        formStatus.textContent = currentLang === 'uz'
          ? 'Iltimos, barcha majburiy maydonlarni to\'ldiring.'
          : 'Please fill in all required fields.';
        formStatus.className = 'form-status error';
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.textContent = currentLang === 'uz'
          ? 'Iltimos, to\'g\'ri elektron pochta manzilini kiriting.'
          : 'Please enter a valid email address.';
        formStatus.className = 'form-status error';
        return;
      }

      // Simulate submission (replace with actual endpoint)
      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      submitBtn.textContent = currentLang === 'uz' ? 'Yuborilmoqda...' : 'Sending...';

      setTimeout(function () {
        formStatus.textContent = currentLang === 'uz'
          ? 'Xabar yuborildi. Biz siz bilan bog\'lanamiz.'
          : 'Message sent. We will get back to you.';
        formStatus.className = 'form-status success';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.textContent = translations[currentLang]['contact.form.submit'];
      }, 1200);
    });
  }

  // ── Scroll Progress ──
  const scrollProgress = document.querySelector('.scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const scrolled = (window.scrollY / scrollHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    }
  }

  // ── Stats Count-Up ──
  function initCounters() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetVal = parseInt(target.getAttribute('data-count'), 10);
          const suffix = target.getAttribute('data-suffix') || '';
          const duration = 1500;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress * (2 - progress);
            const currentVal = Math.floor(easeProgress * targetVal);

            target.textContent = currentVal + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              target.textContent = targetVal + suffix;
            }
          }

          requestAnimationFrame(updateCount);
          countObserver.unobserve(target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-count]').forEach(function (el) {
      countObserver.observe(el);
    });
  }

  // ── Card Tilt ──
  function initCardTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.expertise-card, .trust-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const width = rect.width;
        const height = rect.height;

        const rotateY = ((x - width / 2) / width) * 8;
        const rotateX = ((y - height / 2) / height) * -8;

        card.style.setProperty('--rotate-x', rotateX + 'deg');
        card.style.setProperty('--rotate-y', rotateY + 'deg');
      });

      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
      });
    });
  }

  // ── Hero Emblem Parallax ──
  function initHeroParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = document.getElementById('hero');
    const emblem = document.querySelector('.hero-bg-emblem');

    if (hero && emblem) {
      hero.addEventListener('mousemove', function (e) {
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const width = rect.width;
        const height = rect.height;

        const parallaxX = ((mouseX - width / 2) / width) * -25;
        const parallaxY = ((mouseY - height / 2) / height) * -25;

        emblem.style.setProperty('--parallax-x', parallaxX + 'px');
        emblem.style.setProperty('--parallax-y', parallaxY + 'px');
      });

      hero.addEventListener('mouseleave', function () {
        emblem.style.setProperty('--parallax-x', '0px');
        emblem.style.setProperty('--parallax-y', '0px');
      });
    }
  }

  // ── Custom Cursor ──
  function initCustomCursor() {
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorRing = document.querySelector('.custom-cursor-ring');

    if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;
      let cursorVisible = false;

      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';

      window.addEventListener('mousemove', function (e) {
        if (!cursorVisible) {
          cursorDot.style.opacity = '1';
          cursorRing.style.opacity = '1';
          cursorVisible = true;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      });

      document.addEventListener('mouseleave', function () {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        cursorVisible = false;
      });

      function tickCursor() {
        const ease = 0.15;
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;

        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(tickCursor);
      }
      requestAnimationFrame(tickCursor);

      const hoverSelectors = 'a, button, input, textarea, select, [role="button"], .fact-card, .expertise-card, .trust-card, .process-step';

      document.addEventListener('mouseover', function (e) {
        if (e.target.closest(hoverSelectors)) {
          document.body.classList.add('cursor-hover');
        }
      });

      document.addEventListener('mouseout', function (e) {
        if (!e.target.closest(hoverSelectors)) {
          document.body.classList.remove('cursor-hover');
        }
      });

      window.addEventListener('mousedown', function () {
        document.body.classList.add('cursor-active');
      });

      window.addEventListener('mouseup', function () {
        document.body.classList.remove('cursor-active');
      });
    }
  }

  // ── Interactive D3 Globe ──
  function initInteractiveGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const wrapper = canvas.parentElement;
    const containerWidth = wrapper.clientWidth || 500;
    const containerHeight = wrapper.clientHeight || 500;
    const radius = Math.min(containerWidth, containerHeight) / 2.2;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = containerHeight + 'px';
    context.scale(dpr, dpr);

    // Initial center on Central Asia (Uzbekistan: 69.2° E, 41.3° N)
    const rotation = [-69.2, -41.3];
    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .rotate(rotation)
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 16) => {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    const allDots = [];
    let landFeatures = null;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background matching off-white page background)
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#F5F4F1"; // Bone color matching the design system background
      context.fill();
      context.strokeStyle = "rgba(91, 107, 115, 0.15)"; // Subtle border
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "rgba(91, 107, 115, 0.08)";
        context.lineWidth = 0.75 * scaleFactor;
        context.stroke();

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature);
        });
        context.strokeStyle = "rgba(91, 107, 115, 0.12)";
        context.lineWidth = 0.75 * scaleFactor;
        context.stroke();

        // Draw Uzbekistan's border outline boldly
        const uzbekistanFeature = landFeatures.features.find(
          (feature) => feature.properties?.ISO_A3 === "UZB" || feature.properties?.NAME === "Uzbekistan"
        );
        if (uzbekistanFeature) {
          context.beginPath();
          path(uzbekistanFeature);
          context.strokeStyle = "#5B6B73"; // Brand steel blue border
          context.lineWidth = 2 * scaleFactor;
          context.stroke();
        }

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            const dotRadius = dot.isUzbekistan ? (2.2 * scaleFactor) : (1.2 * scaleFactor);
            context.beginPath();
            context.arc(projected[0], projected[1], dotRadius, 0, 2 * Math.PI);
            
            let dotColor = "#D5D4D0";
            let drawStroke = false;

            if (dot.isUzbekistan) {
              const lat = dot.lat;
              // UZ Flag bands mapping: azure blue, red stripe, white, red stripe, green
              if (lat >= 42.9) {
                dotColor = "#0099B5"; // Azure Blue
              } else if (lat >= 42.5 && lat < 42.9) {
                dotColor = "#E30A17"; // Red Stripe
              } else if (lat >= 40.3 && lat < 42.5) {
                dotColor = "#FFFFFF"; // White
                drawStroke = true;
              } else if (lat >= 39.9 && lat < 40.3) {
                dotColor = "#E30A17"; // Red Stripe
              } else {
                dotColor = "#1E9F5E"; // Green
              }
            }

            context.fillStyle = dotColor;
            context.fill();

            if (drawStroke) {
              context.strokeStyle = "rgba(91, 107, 115, 0.4)";
              context.lineWidth = 0.5 * scaleFactor;
              context.stroke();
            }
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/cultural/ne_110m_admin_0_countries.json"
        );
        if (!response.ok) throw new Error("Failed to load countries data");
        landFeatures = await response.json();

        // Generate dots for all land features
        landFeatures.features.forEach((feature) => {
          const isUzbek = feature.properties?.ISO_A3 === "UZB" || feature.properties?.NAME === "Uzbekistan";
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, isUzbekistan: isUzbek });
          });
        });

        render();
      } catch (err) {
        console.error("Globe load error:", err);
      }
    };

    // Load the world data
    loadWorldData();

    const handleMouseDown = (event) => {
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation];

      const handleMouseMove = (moveEvent) => {
        const sensitivity = 0.25;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.95 : 1.05;
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor));
      projection.scale(newRadius);
      render();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Handle touch interactions for mobile devices
    canvas.addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) {
        const startX = event.touches[0].clientX;
        const startY = event.touches[0].clientY;
        const startRotation = [...rotation];

        const handleTouchMove = (moveEvent) => {
          if (moveEvent.touches.length === 1) {
            const sensitivity = 0.25;
            const dx = moveEvent.touches[0].clientX - startX;
            const dy = moveEvent.touches[0].clientY - startY;

            rotation[0] = startRotation[0] + dx * sensitivity;
            rotation[1] = startRotation[1] - dy * sensitivity;
            rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

            projection.rotate(rotation);
            render();
          }
        };

        const handleTouchEnd = () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);
      }
    }, { passive: true });

    // Adjust sizes on resize
    window.addEventListener('resize', () => {
      const newWidth = wrapper.clientWidth || 500;
      const newHeight = wrapper.clientHeight || 500;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      canvas.style.width = newWidth + 'px';
      canvas.style.height = newHeight + 'px';
      context.setTransform(1, 0, 0, 1, 0, 0); // reset scale
      context.scale(dpr, dpr);
      projection.translate([newWidth / 2, newHeight / 2]);
      render();
    });
  }

  // ── Expand Map Card ──
  function initExpandMap() {
    const card = document.getElementById('expand-map-card');
    if (!card) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -8;
      const rotateY = (mouseX / (rect.width / 2)) * 8;

      card.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // ── Initialize ──
  handleScroll();
  updateScrollProgress();
  initScrollReveal();
  initCounters();
  initCardTilt();
  initHeroParallax();
  initCustomCursor();
  initInteractiveGlobe();
  initExpandMap();
})();
