"use strict";
const jump = document.getElementById("jump");
const slides = Array.from(document.querySelectorAll("section.slide"));
function revealEntry() {
  const el = document.getElementById(location.hash.slice(1));
  if (el?.classList.contains("entry")) el.querySelector("details").open = true;
}
if (!slides.length) {
  revealEntry();
  window.addEventListener("hashchange", revealEntry);
} else {
  const prev = document.getElementById("prev"), next = document.getElementById("next");
  let current;
  function show() {
    const match = /^#s(\d+)$/.exec(location.hash);
    const n = match ? Number(match[1]) : 1;
    current = n >= 1 && n <= slides.length ? n : 1;
    slides.forEach((slide,i) => { slide.hidden = i+1 !== current; });
    jump.value = String(current);
    prev.disabled = current === 1; next.disabled = current === slides.length;
    document.getElementById("progress").style.width = (current*100/slides.length) + "%";
    document.title = jump.selectedOptions[0].text + "｜交通教學簡報";
  }
  function go(n) { if (n >= 1 && n <= slides.length) location.hash = "s" + n; }
  prev.addEventListener("click", () => go(current-1));
  next.addEventListener("click", () => go(current+1));
  jump.addEventListener("change", () => go(Number(jump.value)));
  window.addEventListener("hashchange", () => { show(); window.scrollTo(0, 0); });
  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.target.closest("input,select,textarea,button,a,summary")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault(); go(current+(e.key === "ArrowRight" ? 1 : -1));
    }
  });
  show();
}