/* ── Menu Data ──────────────────────────────────────────────────────────────── */
const menuData = {
  starters: [
    { name: "Gold Rush Nachos",   price: "$14", desc: "House chips, black beans, jalapeños, sour cream, guacamole, and pico de gallo." },
    { name: "River Wings",        price: "$16", desc: "One pound wings tossed in buffalo, BBQ, or gold honey garlic sauce." },
    { name: "Miners Basket",      price: "$13", desc: "Crispy chicken tenders with house ranch and honey mustard dipping sauces." },
    { name: "Loaded Fries",       price: "$12", desc: "Thick-cut fries with bacon, aged cheddar, green onions, and house ranch." },
    { name: "Bruschetta Board",   price: "$11", desc: "Toasted sourdough with heirloom tomatoes, fresh basil, balsamic, and ricotta." },
    { name: "Soup of the Day",    price: "$8",  desc: "Ask your server for today's scratch-made selection. Served with cornbread." },
  ],
  mains: [
    { name: "The Coloma Burger",  price: "$18", desc: "Half-pound Angus beef, aged cheddar, crispy bacon, lettuce, tomato, and special sauce." },
    { name: "Gold Rush Ribeye",   price: "$42", desc: "12 oz bone-in ribeye with garlic herb butter, roasted fingerlings, and seasonal veg." },
    { name: "American River Salmon", price: "$28", desc: "Pan-seared salmon fillet, lemon caper butter, wild rice, and fresh asparagus." },
    { name: "Tri-Tip Sandwich",   price: "$19", desc: "Slow-roasted Gold Country tri-tip on Dutch crunch with horseradish aioli and onions." },
    { name: "Sierra Pasta",       price: "$22", desc: "Pappardelle with wild mushroom ragu, truffle oil, shaved parmesan, and fresh herbs." },
    { name: "BBQ Pulled Pork",    price: "$20", desc: "12-hour smoked pulled pork, house BBQ, coleslaw, baked beans, and cornbread." },
  ],
  drinks: [
    { name: "The Miner's Mule",   price: "$14", desc: "Our signature: bourbon, ginger beer, fresh lime juice, and a dash of gold bitters." },
    { name: "Gold Country Old Fashioned", price: "$13", desc: "Buffalo Trace, Demerara syrup, Angostura bitters, expressed orange peel." },
    { name: "Craft Draft Rotation", price: "$7–$9", desc: "Ask your server about our rotating selection of local and regional craft beers." },
    { name: "Gold Country Wines", price: "from $10", desc: "Curated selection of Amador County and El Dorado AVA wines by the glass or bottle." },
    { name: "American River Tea", price: "$5",  desc: "House-brewed sweet tea with peach, fresh mint, and lemon. A Gold Country classic." },
    { name: "Bottomless Mimosa",  price: "$18", desc: "Available Sundays during brunch, 10 AM – 2 PM, while supplies last." },
  ],
};

/* ── Render Menu ────────────────────────────────────────────────────────────── */
function renderMenu(tab) {
  const grid = document.getElementById('menuGrid');
  const items = menuData[tab];
  grid.innerHTML = items.map(item => `
    <div class="menu-item reveal visible">
      <div class="menu-item__header">
        <span class="menu-item__name">${item.name}</span>
        <span class="menu-item__price">${item.price}</span>
      </div>
      <p class="menu-item__desc">${item.desc}</p>
    </div>
  `).join('');
}

/* ── Menu Tabs ──────────────────────────────────────────────────────────────── */
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  renderMenu('starters');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const grid = document.getElementById('menuGrid');
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(8px)';
      setTimeout(() => {
        renderMenu(tab.dataset.tab);
        grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 180);
    });
  });
}

/* ── Sticky Nav ─────────────────────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  const obs = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('scrolled', !entry.isIntersecting),
    { rootMargin: `-${nav.offsetHeight}px 0px 0px 0px` }
  );
  obs.observe(hero);
}

/* ── Mobile Menu ────────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const burger  = document.getElementById('burger');
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  const close   = document.getElementById('mobileClose');

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

/* ── Scroll Reveal ──────────────────────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  els.forEach(el => obs.observe(el));
}

/* ── Stat Counter Animation ─────────────────────────────────────────────────── */
function initCounters() {
  const nums = document.querySelectorAll('.stat__num[data-target]');
  const obs  = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1600;
      const start  = performance.now();
      const easeOut = t => 1 - Math.pow(1 - t, 3);

      function step(now) {
        const progress = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor(easeOut(progress) * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    }),
    { threshold: 0.5 }
  );
  nums.forEach(n => obs.observe(n));
}

/* ── Smooth scroll for anchor links ────────────────────────────────────────── */
function initSmoothScroll() {
  const navH = document.getElementById('nav').offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    });
  });
}

/* ── Footer year ────────────────────────────────────────────────────────────── */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Init ───────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initTabs();
  initReveal();
  initCounters();
  initSmoothScroll();
  initYear();
});
