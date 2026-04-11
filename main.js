// AI Anison EXP - Main Application Logic

// --- Mock Data ---

const TIMETABLE_DATA = [
  { time: "21:00", title: "Opening Ceremony", desc: " 案内人キルケによるOPと出演者紹介。AIアニソンEXPがいよいよスタート！" },
  { time: "21:07", title: "Part 1: First Stage", desc: " 案内人キルケがお送りする、ファーストステージ！" },
  { time: "22:05", title: "Part 2: Second Stage", desc: "案内人ルアリエがお送りする、セカンドステージ！" },
  { time: "23:05", title: "Part 3: Third Stage", desc: " 案内人アリス（五島雅）がお送りする、ファイナルステージ！" },
  { time: "23:43", title: "Ending & Announcement", desc: "案内人３人によるエンディング。テーマ曲「Never Enging Stories」" },
];

// クリエイターデータ
// icon:  アイコン画像パス
// art:   一枚絵パス（モーダルで表示）
// links: リンク配列 { label: ボタン表示名, url: リンク先 }（空配列の場合はボタン非表示）
// song:  楽曲情報（長文OK、改行は \n で可）
const LINEUP_DATA = [
  { name: "To",               icon: "./icons/1.png",  art: "./art/1.png",  links: [], song: "楽曲情報 準備中..." },
  { name: "五島雅",           icon: "./icons/2.png",  art: "./art/2.png",  links: [], song: "楽曲情報 準備中..." },
  { name: "3-Sync",           icon: "./icons/3.png",  art: "./art/3.png",  links: [
      { label: "X (Twitter)", url: "https://x.com/LuarieTakamiya" }
    ], song: "楽曲情報 準備中..." },
  { name: "森川P",            icon: "./icons/4.png",  art: "./art/4.png",  links: [
      { label: "X (Twitter)", url: "https://x.com/Moriizu_AI" },
      { label: "Note記事", url: "https://note.com/moriizu/n/nbae0cc2bf5f9" }
    ], song: `「アニメタイトル」
永遠を抱くイヴ - A Soulless World -

・無魂劇
・Nosmetipsos Domino offeremus, Hanc canticum Domino offeremus.
・Soulless
・My Precious` },
  { name: "ゆーき",           icon: "./icons/5.png",  art: "./art/5.png",  links: [], song: "楽曲情報 準備中..." },
  { name: "ハルイロナツイロ", icon: "./icons/6.png",  art: "./art/6.png",  links: [
    { label: "X (Twitter)", url: "https://x.com/harunatsu_tuber" },
    { label: "YouTube",     url: "https://www.youtube.com/@Harunatsu-Shiki" },
    { label: "NOTE",  url: "https://note.com/shiki_harunatsu" },], song: `・孤高の賢者、名もなき少年　/　ごめんね…
・茜の空に響く空　/　茜
・宇宙戦姫エンジェル-GLORIA HISTORY-　/　グロリア
・きらめけ！アビス学園　/　それいけ！アビスセレナーデ！！
・ILiDeLia 私立彩音学園高等学校 第2軽音部　/　三色のアンサンブル
・「タイトル未定」　/　Voyage Memory
・「タイトル未定」　/　楽曲未定` },
  { name: "結音",             icon: "./icons/7.png",  art: "./art/7.png",  links: [], song: "楽曲情報 準備中..." },
  { name: "rui",              icon: "./icons/8.png",  art: "./art/8.png",  links: [], song: "楽曲情報 準備中..." },
  { name: "トミオ",           icon: "./icons/9.png",  art: "./art/9.png",  links: [], song: "楽曲情報 準備中..." },
  { name: "Felis Catus",      icon: "./icons/10.png", art: "./art/10.png", links: [], song: "楽曲情報 準備中..." },
  { name: "Sort5691",         icon: "./icons/11.jpg", art: "./art/11.png", links: [], song: "楽曲情報 準備中..." },
  { name: "ユミリアの夢案内", icon: "./icons/12.png", art: "./art/12.png", links: [
      { label: "相対性リボン",         url: "https://www.youtube.com/watch?v=UnLB8Tib8d4" },
      { label: "沈黙のカデンツァは誰の夢", url: "https://www.youtube.com/watch?v=zgLTfTLhucI" },
      { label: "＃すぴ",              url: "https://www.youtube.com/watch?v=XVx3hnGfdX0" },
      { label: "傀儡人形と白い彼岸花", url: "https://www.youtube.com/watch?v=yHdI9T2osLo" },
    ], song: `『ユミリアの夢案内』オリジナルMV

・相対性リボン
・沈黙のカデンツァは誰の夢
・＃すぴ
・傀儡人形と白い彼岸花` },
  { name: "Katsunn AI",       icon: "./icons/13.png", art: "./art/13.png", links: [], song: "楽曲情報 準備中..." },
  { name: "Hina",             icon: "./icons/14.png", art: "./art/14.png", links: [], song: "楽曲情報 準備中..." },
  { name: "LUCY",             icon: "./icons/15.png", art: "./art/15.png", links: [], song: "楽曲情報 準備中..." },
  { name: "前野凌",           icon: "./icons/16.png", art: "./art/16.png", links: [], song: "仮想通貨アイドル★さくらちゃん" },
];

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
  root.innerHTML = TIMETABLE_DATA.map(item => `
    <div class="time-row">
      <div class="time-label">${escapeHtml(item.time)}</div>
      <div class="time-content">
        <h3 class="time-title">${escapeHtml(item.title)}</h3>
        <p class="time-desc">${escapeHtml(item.desc)}</p>
      </div>
    </div>
  `).join('');
}

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTBhMGIwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRINWE0IDQgMCAwIDAtNCAydjIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4=';

function renderLineup() {
  const root = document.getElementById('lineup-root');
  if (!root) return;
  root.innerHTML = LINEUP_DATA.map((item, i) => `
    <div class="card creator-card" data-index="${i}" role="button" tabindex="0" aria-label="${escapeHtml(item.name)}の詳細を見る">
      <div class="card-header">
        <img src="${escapeHtml(item.icon)}" alt="${escapeHtml(item.name)}" class="creator-icon" onerror="this.src='${defaultAvatar}'" />
        <div>
          <div class="card-category">CREATOR</div>
          <h3 class="card-title">${escapeHtml(item.name)}</h3>
        </div>
      </div>
      <p class="card-desc card-song-preview">${escapeHtml((item.song || '').split('\n').find(l => l.trim()) || item.song)}</p>
      <div class="card-view-hint">クリックで詳細を見る →</div>
    </div>
  `).join('');

  // カードクリックでモーダルを開く
  root.querySelectorAll('.creator-card').forEach(card => {
    const open = () => openModal(parseInt(card.dataset.index));
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

function renderPetitEvents() {
  const root = document.getElementById('petit-events-root');
  if (!root) return;
  root.innerHTML = PETIT_EVENTS_DATA.map(item => `
    <div class="card">
      <div>
        <div class="card-category">${escapeHtml(item.category)}</div>
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
      </div>
      <p class="card-desc">${escapeHtml(item.desc)}</p>
      <div class="card-footer">
        <span class="card-meta">${escapeHtml(item.meta)}</span>
        ${item.link
          ? `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" style="font-weight:600;color:var(--accent-sf);transition:opacity 0.2s;" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1">会場へ →</a>`
          : `<span style="font-size:0.85rem;color:var(--text-secondary);font-weight:600;">Coming Soon</span>`
        }
      </div>
    </div>
  `).join('');
}

// --- Modal ---

function buildModal() {
  if (document.getElementById('creator-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'creator-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" id="modal-close" aria-label="閉じる">✕</button>
      <div class="modal-art-wrap">
        <img id="modal-art" src="" alt="" class="modal-art" />
      </div>
      <div class="modal-info">
        <p class="modal-creator-label">CREATOR</p>
        <h2 class="modal-name" id="modal-name"></h2>
        <div class="modal-song-wrap">
          <p class="modal-song" id="modal-song"></p>
        </div>
        <div class="modal-links" id="modal-links"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(index) {
  const item = LINEUP_DATA[index];
  if (!item) return;

  document.getElementById('modal-art').src = item.art || defaultAvatar;
  document.getElementById('modal-art').alt = item.name;
  document.getElementById('modal-name').textContent = item.name;

  // 楽曲情報：改行対応
  const songEl = document.getElementById('modal-song');
  songEl.innerHTML = escapeHtml(item.song || '').replace(/\n/g, '<br>');

  // リンクボタン：複数対応
  const linksEl = document.getElementById('modal-links');
  const links = item.links || [];
  if (links.length > 0) {
    linksEl.innerHTML = links.map(link => `
      <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="modal-link-btn">
        ${escapeHtml(link.label)} →
      </a>
    `).join('');
    linksEl.style.display = 'flex';
  } else {
    linksEl.innerHTML = '';
    linksEl.style.display = 'none';
  }

  const modal = document.getElementById('creator-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('creator-modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// --- Live Status Logic ---

const EVENT_START = new Date('2026-05-30T21:00:00+09:00');
const EVENT_END   = new Date('2026-05-30T23:00:00+09:00');

function renderLiveStatus() {
  const statusEl = document.getElementById('live-status');
  const buttonEl = document.getElementById('live-button');
  if (!statusEl || !buttonEl) return;
  const now = new Date();
  let badgeClass, badgeText, buttonClass = '', buttonText = '▶︎ LIVEを見る';

  if (now < EVENT_START) {
    badgeClass = 'pre-live'; badgeText = 'Coming Soon'; buttonText = '▶︎ 待機所へ';
  } else if (now <= EVENT_END) {
    badgeClass = 'is-live'; badgeText = 'Now Live'; buttonClass = 'is-live';
  } else {
    badgeClass = 'archived'; badgeText = 'Archive'; buttonClass = 'archived'; buttonText = '▶︎ アーカイブを見る';
  }

  statusEl.innerHTML = `<span class="live-badge ${badgeClass}"><span class="badge-dot"></span>${badgeText}</span>`;
  buttonEl.className = `live-button${buttonClass ? ' ' + buttonClass : ''}`;
  buttonEl.textContent = buttonText;
  buttonEl.href = '#archive';
}

// --- i18n ---

const TRANSLATIONS = {
  ja: {
    "nav.archive": "Live / Archive", "nav.timetable": "Timetable",
    "nav.lineup": "Lineup", "nav.petit": "Petit Events",
    "hero.subtitle": "Generative Anime Song Festival",
    "hero.title": "AI アニソン EXP",
    "hero.desc": "AI技術と人の感性が交差する、次世代音楽フェス。\n幻想と未来が共存するステージへようこそ。",
    "hero.catchcopy": "一夜限りのアニソンフェス、ここでしか聴けない音がある",
    "archive.caption": "※配信開始前は待機所となります。終了後はアーカイブをご視聴いただけます。",
    "timetable.desc": "当日の進行スケジュールです。",
    "lineup.desc": "出演クリエイター及び披露楽曲のご紹介",
    "petit.desc": "本編とあわせて楽しめる関連企画",
  },
  en: {
    "nav.archive": "Live / Archive", "nav.timetable": "Timetable",
    "nav.lineup": "Lineup", "nav.petit": "Petit Events",
    "hero.subtitle": "Generative Anime Song Festival",
    "hero.title": "AI Anison EXP",
    "hero.desc": "A next-gen music festival where AI meets human creativity.\nWelcome to a stage where fantasy and the future coexist.",
    "hero.catchcopy": "One night only — sounds you can only hear here.",
    "archive.caption": "※ This will serve as the waiting room before the stream. The archive will be available after the event.",
    "timetable.desc": "The schedule for the event day.",
    "lineup.desc": "Introducing the creators and their featured tracks.",
    "petit.desc": "Side events to enjoy alongside the main show.",
  }
};

let currentLang = 'ja';

function applyLang(lang) {
  currentLang = lang;
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key].replace(/\n/g, '<br>');
  });
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

function initLangSwitch() {
  const btn = document.getElementById('lang-switch');
  if (!btn) return;
  btn.addEventListener('click', () => applyLang(currentLang === 'ja' ? 'en' : 'ja'));
  applyLang('ja');
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  buildModal();
  initLangSwitch();
  renderLiveStatus();
  renderTimetable();
  renderLineup();
  renderPetitEvents();

  document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
});
