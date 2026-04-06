// AI Anison EXP - Main Application Logic

// --- Mock Data ---

const TIMETABLE_DATA = [
  { time: "20:00", title: "Opening Ceremony", desc: "イベント開会の挨拶とコンセプト説明。AIアニソンEXPがいよいよスタート！" },
  { time: "20:15", title: "Part 1: The Rising Stars", desc: "気鋭のクリエイター陣による最新AIアニソンのお披露目セッション。" },
  { time: "21:00", title: "Special Future Talk", desc: "『AIと音楽の融合が魅せる未来』をテーマにしたショートトークセッション。" },
  { time: "21:15", title: "Part 2: Cyber Fantasy", desc: "イベントの目玉となる、SFとファンタジーが交差する超大作楽曲の連続プレイ！" },
  { time: "22:00", title: "Ending & Announcement", desc: "エンディングと、今後の展開に関する重大発表。" },
];

const creators = [
  "高宮ルアリエ", "五島雅", "森川P", "ゆーき", "ハルイロナツイロ", "結音",
  "rui", "トミオ", "Felis Catus", "Sort5691", "To", "ユミリアの夢案内",
  "Katsunn AI", "Hina", "LUCY", "前野凌"
];

const LINEUP_DATA = creators.map((name, index) => ({
  name: name,
  icon: `./icons/${index + 1}.png`, // Placeholder rule for icons
  song: "楽曲情報 準備中...",
}));

const PETIT_EVENTS_DATA = [
  { 
    category: "Market", 
    title: "深き森の雑貨市場", 
    meta: "フリー素材共有スペース", 
    desc: "出演者や視聴者全員が参加できるイベント。各自でデザインしたものを、フリー素材として公開するスペースです。",
    link: "https://luarietakamiya-dotcom.github.io/realm-market/"
  },
  { 
    category: "Voting", 
    title: "アニソン投票スペース (仮)", 
    meta: "準備中...", 
    desc: "参加者や視聴者が、好きなアニメソングを自由に投票して盛り上がるスペースです。（ページ制作中）",
    link: ""
  }
];

// --- Rendering Logic ---

function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function renderTimetable() {
  const root = document.getElementById('timetable-root');
  if (!root) return;

  const html = TIMETABLE_DATA.map(item => `
    <div class="time-row">
      <div class="time-label">${escapeHtml(item.time)}</div>
      <div class="time-content">
        <h3 class="time-title">${escapeHtml(item.title)}</h3>
        <p class="time-desc">${escapeHtml(item.desc)}</p>
      </div>
    </div>
  `).join('');

  root.innerHTML = html;
}

// Default SVG placeholder for missing icons
const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTBhMGIwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRINThhNCA0IDAgMCAwLTQgMnYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+';

function renderLineup() {
  const root = document.getElementById('lineup-root');
  if (!root) return;

  const html = LINEUP_DATA.map(item => `
    <div class="card">
      <div class="card-header">
         <img src="${escapeHtml(item.icon)}" alt="${escapeHtml(item.name)}" class="creator-icon" onerror="this.src='${defaultAvatar}'" />
         <div>
            <div class="card-category">CREATOR</div>
            <h3 class="card-title">${escapeHtml(item.name)}</h3>
         </div>
      </div>
      <p class="card-desc">${escapeHtml(item.song)}</p>
    </div>
  `).join('');

  root.innerHTML = html;
}

function renderPetitEvents() {
  const root = document.getElementById('petit-events-root');
  if (!root) return;

  const html = PETIT_EVENTS_DATA.map(item => `
    <div class="card">
      <div>
        <div class="card-category">${escapeHtml(item.category)}</div>
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
      </div>
      <p class="card-desc">${escapeHtml(item.desc)}</p>
      <div class="card-footer">
        <span class="card-meta">${escapeHtml(item.meta)}</span>
        ${item.link ? 
          `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: var(--accent-sf); transition: opacity 0.2s;" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1">会場へ →</a>` : 
          `<span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Coming Soon</span>`
        }
      </div>
    </div>
  `).join('');

  root.innerHTML = html;
}

// --- Live Status Logic ---

// イベント日時 (JST = UTC+9)
const EVENT_START = new Date('2026-05-30T21:00:00+09:00');
const EVENT_END   = new Date('2026-05-30T23:00:00+09:00'); // 終了時刻 (適宜変更)

function renderLiveStatus() {
  const statusEl = document.getElementById('live-status');
  const buttonEl = document.getElementById('live-button');
  if (!statusEl || !buttonEl) return;

  const now = new Date();

  let badgeClass, dotHtml, badgeText;
  let buttonClass = '';
  let buttonText  = '▶︎ LIVEを見る';
  let buttonHref  = '#archive';

  if (now < EVENT_START) {
    // --- 配信前 ---
    badgeClass = 'pre-live';
    badgeText  = 'Coming Soon';
    buttonText = '▶︎ 待機所へ';
  } else if (now >= EVENT_START && now <= EVENT_END) {
    // --- 配信中 ---
    badgeClass = 'is-live';
    badgeText  = 'Now Live';
    buttonClass = 'is-live';
    buttonText  = '▶︎ LIVEを見る';
  } else {
    // --- アーカイブ ---
    badgeClass = 'archived';
    badgeText  = 'Archive';
    buttonClass = 'archived';
    buttonText  = '▶︎ アーカイブを見る';
  }

  statusEl.innerHTML = `
    <span class="live-badge ${badgeClass}">
      <span class="badge-dot"></span>
      ${badgeText}
    </span>
  `;

  buttonEl.className = `live-button${buttonClass ? ' ' + buttonClass : ''}`;
  buttonEl.textContent = buttonText;
  buttonEl.href = buttonHref;
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  initLangSwitch();
  renderLiveStatus();
  renderTimetable();
  renderLineup();
  renderPetitEvents();
  
  // Smooth scroll for nav links
  document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // adjust for header
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// --- i18n (言語切り替え) ---

const TRANSLATIONS = {
  ja: {
    "nav.archive":      "Live / Archive",
    "nav.timetable":    "Timetable",
    "nav.lineup":       "Lineup",
    "nav.petit":        "Petit Events",
    "hero.subtitle":    "Generative Anime Song Festival",
    "hero.title":       "AI アニソン EXP",
    "hero.desc":        "AI技術と人の感性が交差する、次世代音楽フェス。\n幻想と未来が共存するステージへようこそ。",
    "hero.catchcopy":   "一夜限りのアニソンフェス、ここでしか聴けない音がある",
    "archive.caption":  "※配信開始前は待機所となります。終了後はアーカイブをご視聴いただけます。",
    "timetable.desc":   "当日の進行スケジュールです。",
    "lineup.desc":      "出演クリエイター及び披露楽曲のご紹介",
    "petit.desc":       "本編とあわせて楽しめる関連企画",
  },
  en: {
    "nav.archive":      "Live / Archive",
    "nav.timetable":    "Timetable",
    "nav.lineup":       "Lineup",
    "nav.petit":        "Petit Events",
    "hero.subtitle":    "Generative Anime Song Festival",
    "hero.title":       "AI Anison EXP",
    "hero.desc":        "A next-gen music festival where AI meets human creativity.\nWelcome to a stage where fantasy and the future coexist.",
    "hero.catchcopy":   "One night only — sounds you can only hear here.",
    "archive.caption":  "※ This will serve as the waiting room before the stream. The archive will be available after the event.",
    "timetable.desc":   "The schedule for the event day.",
    "lineup.desc":      "Introducing the creators and their featured tracks.",
    "petit.desc":       "Side events to enjoy alongside the main show.",
  }
};

let currentLang = 'ja';

function applyLang(lang) {
  currentLang = lang;
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!dict[key]) return;
    // 改行を <br> に変換
    el.innerHTML = dict[key].replace(/\n/g, '<br>');
  });

  // アクティブ状態を更新
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

function initLangSwitch() {
  const btn = document.getElementById('lang-switch');
  if (!btn) return;
  btn.addEventListener('click', () => {
    applyLang(currentLang === 'ja' ? 'en' : 'ja');
  });
  // 初期状態: JAがアクティブ
  applyLang('ja');
}
