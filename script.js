(function () {
  "use strict";

  var sections = ["about", "experience", "projects"];

  /* ── Theme toggle ── */
  var themeToggle = document.getElementById("cp-theme-toggle");
  var rootEl = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      rootEl.setAttribute("data-theme", "dark");
    } else {
      rootEl.removeAttribute("data-theme");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* ── Show more / less ── */
  var showMoreBtn = document.getElementById("cp-show-more");
  var moreWrap = document.querySelector(".cp-project-more");

  if (showMoreBtn && moreWrap) {
    showMoreBtn.addEventListener("click", function () {
      var expanded = showMoreBtn.getAttribute("aria-expanded") === "true";
      var next = !expanded;
      showMoreBtn.setAttribute("aria-expanded", String(next));
      moreWrap.hidden = !next;
      showMoreBtn.querySelector("span").textContent = next ? "show less" : "show more";
    });
  }

  /* ── Scroll-spy for sidebar nav ── */
  var navLinks = {};
  document.querySelectorAll(".cp-nav a[data-nav]").forEach(function (link) {
    navLinks[link.getAttribute("data-nav")] = link;
  });

  function onScroll() {
    var mid = window.innerHeight * 0.4;
    var current = sections[0];
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) current = id;
    });
    Object.keys(navLinks).forEach(function (id) {
      navLinks[id].classList.toggle("cp-active", id === current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Copy email ── */
  var mail = document.getElementById("cp-mail");
  var toast = document.getElementById("cp-copied-toast");
  var toastTimer;

  function copyEmail() {
    var email = "ashishlukka2005@gmail.com";
    var done = function () {
      if (!toast) return;
      toast.classList.add("cp-toast-show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove("cp-toast-show");
      }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, done);
    } else {
      done();
    }
  }

  if (mail) {
    mail.addEventListener("click", function (e) {
      e.preventDefault();
      copyEmail();
    });
    mail.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        copyEmail();
      }
    });
  }

  /* ── Gallery modal ── */
  var modal = document.getElementById("cp-modal");
  var modalTitle = document.getElementById("cp-modal-title");
  var modalGithub = document.getElementById("cp-modal-github");
  var modalDesc = document.getElementById("cp-modal-desc");
  var modalGallery = document.getElementById("cp-modal-gallery");
  var lastFocused;

  function openModal(card) {
    var key = card.getAttribute("data-gallery");
    var template = document.getElementById("gallery-" + key);
    if (!template || !modal) return;

    lastFocused = document.activeElement;
    modalTitle.textContent = card.getAttribute("data-title") || "";
    var descEl = card.querySelector(".cp-project-desc");
    if (modalDesc) {
      modalDesc.textContent = descEl ? descEl.textContent.trim() : "";
    }
    var repo = card.getAttribute("data-github");
    if (repo) {
      modalGithub.style.display = "";
      modalGithub.href = repo;
    } else {
      modalGithub.style.display = "none";
    }

    modalGallery.innerHTML = "";
    modalGallery.appendChild(template.content.cloneNode(true));

    modal.classList.add("cp-modal-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("cp-modal-locked");
    modal.querySelector(".cp-modal-panel").scrollTop = 0;
    var closeBtn = modal.querySelector(".cp-modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("cp-modal-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cp-modal-locked");
    modalGallery.innerHTML = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll(".cp-project-item[data-gallery]").forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("cp-modal-open")) {
        closeModal();
      }
    });
  }
})();
