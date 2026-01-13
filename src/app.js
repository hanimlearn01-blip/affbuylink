/* =====================================================
   Pintarkit Affiliate Selector - App Logic
   Fungsi:
   - Fetch data affiliate (GitHub RAW)
   - Cache data (localStorage)
   - Search & random pick agent
===================================================== */

// ---------- CONFIG ----------
const CONFIG = {
  DATA_URL: 'hhttps://raw.githubusercontent.com/hanimlearn01-blip/affbuylink/refs/heads/main/data/agents.json',
  CACHE_KEY: 'pintarkit_data_v3',
  CACHE_TIME: 1000 * 60 * 30 // 30 min
};

// ---------- STATE ----------
let state = {
  lang: 'bm',
  agents: []
};

/* ===============================
   TRANSLATIONS
================================ */

const TR = {
  bm: {
    lang_display: "BM 🇲🇾",
    back: "Kembali",
    opt_search_title: "Cari ID Ejen",
    opt_search_desc: "Masukkan ID ahli yang anda kenali.",
    opt_random_title: "Pilih Secara Rawak",
    opt_random_desc: "Kami pilihkan ahli bertuah untuk anda.",
    btn_search: "Cari & Beli",
    error_not_found: "ID tidak dijumpai.",
    spin_title: "Ejen Bertuah Digital",
    click_to_start: "Klik butang di bawah untuk mula",
    btn_spin: "MULA CABUTAN!",
    agent_found: "Ejen Dijumpai!",
    please_support: "Sila sokong ejen ini.",
    agent_id_label: "ID Ejen",
    btn_buy: "Teruskan ke Pembayaran"
  },
  en: {
    lang_display: "EN 🇬🇧",
    back: "Back",
    opt_search_title: "Search Agent ID",
    opt_search_desc: "Enter the member ID you know.",
    opt_random_title: "Pick Randomly",
    opt_random_desc: "We will pick a lucky member for you.",
    btn_search: "Search & Buy",
    error_not_found: "ID not found.",
    spin_title: "Digital Lucky Agent",
    click_to_start: "Click button below to start",
    btn_spin: "START DRAW!",
    agent_found: "Agent Found!",
    please_support: "Please support this agent.",
    agent_id_label: "Agent ID",
    btn_buy: "Proceed to Payment"
  }
};


// ---------- APP CORE ----------
const App = {

  init() {
    this.renderText();
    setTimeout(() => this.loadData(), 300);
  },

  // Fetch affiliate data
  async loadData() {
    const loader = document.getElementById('global-loader');
    loader.classList.remove('hidden');

    const cached = localStorage.getItem(CONFIG.CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.ts < CONFIG.CACHE_TIME) {
        state.agents = data.payload;
        loader.classList.add('hidden');
        return;
      }
    }

    try {
      const res = await fetch(CONFIG.DATA_URL);

if (!res.ok) {
  throw new Error('Fetch failed: ' + res.status);
}

const text = await res.text();

// Debug: pastikan JSON
if (!text.trim().startsWith('[')) {
  console.error('Bukan JSON:', text);
  throw new Error('Invalid JSON');
}

const agents = JSON.parse(text);


      state.agents = agents;
      localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify({
        ts: Date.now(),
        payload: agents
      }));
    } catch (err) {
      console.error(err);
      if (cached) {
        state.agents = JSON.parse(cached).payload;
      } else {
        alert('Data gagal dimuatkan. Cuba lagi.');
      }
    } finally {
      loader.classList.add('hidden');
    }
  },

  switchView(view) {
  ['view-home', 'view-search', 'view-random'].forEach(id =>
    document.getElementById(id)?.classList.add('hidden')
  );

  document.getElementById(`view-${view}`)?.classList.remove('hidden');

  if (view === 'search') {
    document.getElementById('agent-input').value = '';
    document.getElementById('search-error').classList.add('hidden');
  }

  if (view === 'random') {
    document.getElementById('shuffle-text').innerText = '???';
  }
},

toggleLang() {
  // Tukar bahasa bm <-> en
  state.lang = state.lang === 'bm' ? 'en' : 'bm';
  this.renderText();
},


  renderText() {
  const t = TR[state.lang];

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (t[key]) {
      el.innerText = t[key];
    }
  });

  document.getElementById('lang-display').innerText = t.lang_display;

  const placeholders = {
    bm: "Contoh: Cikgu_Nim",
    en: "Example: Cikgu_Nim"
  };

  const input = document.getElementById('agent-input');
  if (input) input.placeholder = placeholders[state.lang];
},


  // ---------- SEARCH ----------
  search() {
    if (state.agents.length === 0) {
      alert("Data sedang dimuatkan, sila cuba sebentar lagi.");
      return;
    }

    const input = document.getElementById('agent-input').value.trim().toUpperCase();
    const found = state.agents.find(a => a.id === input);

    if (found) {
      document.getElementById('search-error').classList.add('hidden');
      this.showResult(found);
    } else {
      document.getElementById('search-error').classList.remove('hidden');
    }
  },

  // ---------- RANDOM ----------
  shuffle() {
    if (state.agents.length === 0) {
      alert("Data sedang dimuatkan, sila cuba sebentar lagi.");
      return;
    }

    const btn = document.getElementById('spin-btn');
    const txt = document.getElementById('shuffle-text');

    btn.disabled = true;

    let count = 0;
    const interval = setInterval(() => {
      txt.innerText = state.agents[Math.floor(Math.random() * state.agents.length)].id;
      if (++count === 20) {
        clearInterval(interval);
        const winner = state.agents[Math.floor(Math.random() * state.agents.length)];
        txt.innerText = winner.id;
        confetti({ particleCount: 50, spread: 70 });
        setTimeout(() => {
          this.showResult(winner);
          btn.disabled = false;
        }, 800);
      }
    }, 80);
  },

  showResult(agent) {
    document.getElementById('result-id').innerText = agent.id;
    document.getElementById('result-link').href = agent.link;
    document.getElementById('result-overlay').classList.remove('hidden');
  },

  closeResult() {
    document.getElementById('result-overlay').classList.add('hidden');
  }
};

// Expose ke HTML
window.handleSearch = () => App.search();
window.startDigitalShuffle = () => App.shuffle();
window.closeResult = () => App.closeResult();

// Start app
window.onload = () => App.init();
// Expose functions for inline HTML onclick
window.switchView = (view) => App.switchView(view);
window.toggleLanguage = () => App.toggleLang();
window.handleSearch = () => App.search();
window.startDigitalShuffle = () => App.shuffle();
window.closeResult = () => App.closeResult();


