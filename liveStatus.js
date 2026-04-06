const eventStart = new Date("2026-05-30T21:00:00+09:00");
const eventEnd   = new Date("2026-05-30T23:30:00+09:00");

function updateLiveStatus() {
  const now = new Date();
  const el  = document.getElementById("live-status");
  const btn = document.getElementById("live-button");
  if (!el || !btn) return;

  if (now < eventStart) {
    // --- 配信前: カウントダウン ---
    const diff = eventStart - now;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    el.innerHTML = `
      <div class="countdown-wrap">
        <span class="live-badge pre-live">
          <span class="badge-dot"></span>Coming Soon
        </span>
        <div class="countdown">
          <div class="countdown-unit"><span class="countdown-num">${String(days).padStart(2,'0')}</span><span class="countdown-label">DAYS</span></div>
          <span class="countdown-sep">:</span>
          <div class="countdown-unit"><span class="countdown-num">${String(hours).padStart(2,'0')}</span><span class="countdown-label">HRS</span></div>
          <span class="countdown-sep">:</span>
          <div class="countdown-unit"><span class="countdown-num">${String(minutes).padStart(2,'0')}</span><span class="countdown-label">MIN</span></div>
          <span class="countdown-sep">:</span>
          <div class="countdown-unit"><span class="countdown-num">${String(seconds).padStart(2,'0')}</span><span class="countdown-label">SEC</span></div>
        </div>
      </div>`;
    btn.className   = "live-button";
    btn.textContent = "▶︎ 待機所へ";

  } else if (now <= eventEnd) {
    // --- 配信中 ---
    el.innerHTML = `
      <span class="live-badge is-live">
        <span class="badge-dot"></span>Now Live
      </span>`;
    btn.className   = "live-button is-live";
    btn.textContent = "▶︎ LIVEを見る";

  } else {
    // --- アーカイブ ---
    el.innerHTML = `
      <span class="live-badge archived">
        <span class="badge-dot"></span>Archive
      </span>`;
    btn.className   = "live-button archived";
    btn.textContent = "▶︎ アーカイブを見る";
  }
}

// 1秒ごとに更新
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    updateLiveStatus();
    setInterval(updateLiveStatus, 1000);
  });
} else {
  updateLiveStatus();
  setInterval(updateLiveStatus, 1000);
}
