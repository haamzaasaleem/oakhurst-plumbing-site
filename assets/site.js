/* Oakhurst Plumbing — small, purposeful interactions only. */
(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".navtoggle");
  var links = document.querySelector(".navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // --- Scroll reveal (respects reduced motion) ---
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // --- Contact / request form (front-end only; no backend wired yet) ---
  var form = document.getElementById("requestForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = document.getElementById("formOk");
      var name = (document.getElementById("f-name") || {}).value || "there";
      if (ok) {
        ok.textContent =
          "Thanks, " + name.split(" ")[0] +
          ". Your request is ready to send. Call 559-683-2232 for same-day emergencies.";
        ok.classList.remove("hidden");
      }
      form.reset();
      if (ok) ok.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    });
  }

  // --- Footer year ---
  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
})();
