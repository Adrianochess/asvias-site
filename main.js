// Ano automático
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Drawer mobile
const openDrawerBtn = document.getElementById("openDrawer");
const closeDrawerBtn = document.getElementById("closeDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawer = document.getElementById("drawer");

function openDrawer(){
  if (!drawer || !drawerOverlay) return;
  drawer.classList.add("open");
  drawerOverlay.classList.add("open");
  drawerOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeDrawer(){
  if (!drawer || !drawerOverlay) return;
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("open");
  drawerOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (openDrawerBtn) openDrawerBtn.addEventListener("click", openDrawer);
if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);
window.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeDrawer(); });

// Header auto-hide (some ao descer, reaparece ao subir)
const header = document.getElementById("siteHeader");
let lastY = window.scrollY;
let ticking = false;

window.addEventListener("scroll", () => {
  if (!header) return;
  if (ticking) return;
  ticking = true;

  window.requestAnimationFrame(() => {
    const y = window.scrollY;
    const delta = y - lastY;

    const nearTop = y < 24;
    const goingDown = delta > 6;
    const goingUp = delta < -6;

    const drawerOpen = drawer && drawer.classList.contains("open");

    if (drawerOpen || nearTop) header.classList.remove("hide");
    else if (goingDown) header.classList.add("hide");
    else if (goingUp) header.classList.remove("hide");

    lastY = y;
    ticking = false;
  });
}, { passive: true });
