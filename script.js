(function () {
  "use strict";

  var sections = ["about", "experience", "papers", "projects"];

  /* Theme toggle */
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
      var next =
        rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* Show more / less */
  var showMoreBtn = document.getElementById("cp-show-more");
  var moreWrap = document.querySelector(".cp-project-more");

  if (showMoreBtn && moreWrap) {
    showMoreBtn.addEventListener("click", function () {
      var expanded = showMoreBtn.getAttribute("aria-expanded") === "true";
      var next = !expanded;
      showMoreBtn.setAttribute("aria-expanded", String(next));
      moreWrap.hidden = !next;
      showMoreBtn.querySelector("span").textContent = next
        ? "show less"
        : "show more";
    });
  }

  /* Scroll spy for sidebar navigation */
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

  /* Copy email */
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

  /* Project modal */
  var modal = document.getElementById("cp-modal");
  var modalTitle = document.getElementById("cp-modal-title");
  var modalGithub = document.getElementById("cp-modal-github");
  var modalDemo = document.getElementById("cp-modal-demo");
  var modalReadme = document.getElementById("cp-modal-readme");
  var modalScroll = document.getElementById("cp-modal-scroll");
  var lastFocused;
  var readmeCache = {};
  var readmeRequest = 0;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function inlineMarkdown(value) {
    return escapeHtml(value).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  function splitTableRow(row) {
    return row
      .replace(/^\s*\|/, "")
      .replace(/\|\s*$/, "")
      .split("|")
      .map(function (cell) {
        return cell.trim();
      });
  }

  function isTableDelimiter(line) {
    return /^\s*\|?\s*:?-{2,}/.test(line);
  }

  function renderMarkdown(markdown) {
    var lines = String(markdown).replace(/\r\n?/g, "\n").split("\n");
    var html = [];
    var i = 0;

    function isHeading(line) {
      return /^##\s+/.test(line);
    }

    function isUnordered(line) {
      return /^\s*[-*+]\s+/.test(line);
    }

    function isOrdered(line) {
      return /^\s*\d+\.\s+/.test(line);
    }

    function startsBlock(line, index) {
      return (
        isHeading(line) ||
        isUnordered(line) ||
        isOrdered(line) ||
        (line.indexOf("|") !== -1 &&
          lines[index + 1] &&
          isTableDelimiter(lines[index + 1]))
      );
    }

    while (i < lines.length) {
      var line = lines[i];

      if (!line.trim()) {
        i++;
        continue;
      }

      var heading = line.match(/^##\s+(.*)$/);
      if (heading) {
        html.push("<h2>" + inlineMarkdown(heading[1]) + "</h2>");
        i++;
        continue;
      }

      var onlyImage = line.match(/^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (onlyImage) {
        var alt = escapeHtml(onlyImage[1]);
        var src = escapeHtml(onlyImage[2].trim());
        html.push(
          '<figure class="cp-fig">' +
            '<a class="cp-fig-link" href="' +
            src +
            '" target="_blank" rel="noopener noreferrer">' +
            '<img src="' +
            src +
            '" alt="' +
            alt +
            '" loading="lazy" decoding="async"></a>' +
            "<figcaption>" +
            alt +
            "</figcaption></figure>",
        );
        i++;
        continue;
      }

      if (
        line.indexOf("|") !== -1 &&
        lines[i + 1] &&
        isTableDelimiter(lines[i + 1])
      ) {
        var headers = splitTableRow(line);
        i += 2;
        var rows = [];
        while (
          i < lines.length &&
          lines[i].trim() &&
          lines[i].indexOf("|") !== -1
        ) {
          rows.push(splitTableRow(lines[i]));
          i++;
        }
        var table = '<div class="cp-readme-table-wrap"><table><thead><tr>';
        headers.forEach(function (cell) {
          table += "<th>" + inlineMarkdown(cell) + "</th>";
        });
        table += "</tr></thead><tbody>";
        rows.forEach(function (row) {
          table += "<tr>";
          row.forEach(function (cell) {
            table += "<td>" + inlineMarkdown(cell) + "</td>";
          });
          table += "</tr>";
        });
        table += "</tbody></table></div>";
        html.push(table);
        continue;
      }

      if (isUnordered(line)) {
        var unordered = [];
        while (i < lines.length && isUnordered(lines[i])) {
          unordered.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
          i++;
        }
        html.push(
          "<ul>" +
            unordered
              .map(function (item) {
                return "<li>" + inlineMarkdown(item) + "</li>";
              })
              .join("") +
            "</ul>",
        );
        continue;
      }

      if (isOrdered(line)) {
        var ordered = [];
        while (i < lines.length && isOrdered(lines[i])) {
          ordered.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
          i++;
        }
        html.push(
          "<ol>" +
            ordered
              .map(function (item) {
                return "<li>" + inlineMarkdown(item) + "</li>";
              })
              .join("") +
            "</ol>",
        );
        continue;
      }

      var paragraph = [line];
      i++;
      while (i < lines.length && lines[i].trim() && !startsBlock(lines[i], i)) {
        paragraph.push(lines[i]);
        i++;
      }
      html.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
    }

    return html.join("");
  }

  function fallbackReadme(card) {
    var desc = card.querySelector(".cp-project-desc");
    return (
      "<p>" +
      escapeHtml(desc ? desc.textContent.trim() : "readme unavailable.") +
      "</p>"
    );
  }

  function loadReadme(card) {
    var src = card.getAttribute("data-readme");
    var request = ++readmeRequest;

    if (!src) {
      modalReadme.innerHTML = fallbackReadme(card);
      return;
    }

    if (readmeCache[src]) {
      modalReadme.innerHTML = readmeCache[src];
      return;
    }

    modalReadme.innerHTML =
      '<p class="cp-readme-loading">loading readme...</p>';

    fetch(src)
      .then(function (response) {
        if (!response.ok) throw new Error("readme not found");
        return response.text();
      })
      .then(function (markdown) {
        var rendered = renderMarkdown(markdown);
        readmeCache[src] = rendered;
        if (request === readmeRequest) modalReadme.innerHTML = rendered;
      })
      .catch(function () {
        if (request === readmeRequest)
          modalReadme.innerHTML = fallbackReadme(card);
      });
  }

  function setLink(element, href) {
    if (!element) return;
    if (href) {
      element.style.display = "";
      element.href = href;
    } else {
      element.style.display = "none";
      element.removeAttribute("href");
    }
  }

  function openModal(card) {
    if (!modal) return;

    lastFocused = document.activeElement;
    modalTitle.textContent = card.getAttribute("data-title") || "";
    setLink(modalGithub, card.getAttribute("data-github"));
    setLink(modalDemo, card.getAttribute("data-demo"));
    loadReadme(card);

    modal.classList.add("cp-modal-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("cp-modal-locked");
    modalScroll.scrollTop = 0;

    var panel = modal.querySelector(".cp-modal-panel");
    if (panel) panel.focus();
  }

  function closeModal() {
    if (!modal) return;
    readmeRequest++;
    modal.classList.remove("cp-modal-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cp-modal-locked");
    modalReadme.innerHTML = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll("[data-readme]").forEach(function (card) {
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
