(function () {
  var supportedLanguages = ["es", "en"];
  var defaultLanguage = "es";
  var currentLanguage = defaultLanguage;

  function getByPath(obj, path) {
    return path.split(".").reduce(function (acc, part) {
      if (acc && Object.prototype.hasOwnProperty.call(acc, part)) {
        return acc[part];
      }
      return null;
    }, obj);
  }

  function normalizeLanguage(lang) {
    if (!lang) {
      return defaultLanguage;
    }

    var short = String(lang).toLowerCase().split("-")[0];
    return supportedLanguages.indexOf(short) !== -1 ? short : defaultLanguage;
  }

  function updateSwitcherState(lang) {
    var buttons = document.querySelectorAll("[data-lang-switch]");
    Array.prototype.forEach.call(buttons, function (button) {
      var isActive = button.getAttribute("data-lang-switch") === lang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyTranslations(translations, lang) {
    var textNodes = document.querySelectorAll("[data-i18n]");
    Array.prototype.forEach.call(textNodes, function (node) {
      var value = getByPath(translations, node.getAttribute("data-i18n"));
      if (typeof value === "string") {
        node.textContent = value;
      }
    });

    var htmlNodes = document.querySelectorAll("[data-i18n-html]");
    Array.prototype.forEach.call(htmlNodes, function (node) {
      var value = getByPath(translations, node.getAttribute("data-i18n-html"));
      if (typeof value === "string") {
        node.innerHTML = value;
      }
    });

    var contentNodes = document.querySelectorAll("[data-i18n-content]");
    Array.prototype.forEach.call(contentNodes, function (node) {
      var value = getByPath(translations, node.getAttribute("data-i18n-content"));
      if (typeof value === "string") {
        node.setAttribute("content", value);
      }
    });

    var altNodes = document.querySelectorAll("[data-i18n-alt]");
    Array.prototype.forEach.call(altNodes, function (node) {
      var value = getByPath(translations, node.getAttribute("data-i18n-alt"));
      if (typeof value === "string") {
        node.setAttribute("alt", value);
      }
    });

    var ariaNodes = document.querySelectorAll("[data-i18n-aria-label]");
    Array.prototype.forEach.call(ariaNodes, function (node) {
      var value = getByPath(translations, node.getAttribute("data-i18n-aria-label"));
      if (typeof value === "string") {
        node.setAttribute("aria-label", value);
      }
    });

    document.documentElement.lang = lang;
    currentLanguage = lang;
    updateSwitcherState(lang);
  }

  function fetchTranslations(lang) {
    return fetch("lang/" + lang + ".json", { cache: "no-cache" }).then(function (response) {
      if (!response.ok) {
        throw new Error("Missing translation file");
      }
      return response.json();
    });
  }

  function setLanguage(lang) {
    var normalized = normalizeLanguage(lang);
    return fetchTranslations(normalized).then(function (translations) {
      applyTranslations(translations, normalized);
      window.localStorage.setItem("site-language", normalized);
      return normalized;
    }).catch(function () {
      if (normalized !== defaultLanguage) {
        return setLanguage(defaultLanguage);
      }
      return defaultLanguage;
    });
  }

  function getInitialLanguage() {
    var saved = window.localStorage.getItem("site-language");
    if (saved) {
      return normalizeLanguage(saved);
    }

    return normalizeLanguage(navigator.language || document.documentElement.lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-lang-switch]");
      if (!button) {
        return;
      }

      event.preventDefault();
      setLanguage(button.getAttribute("data-lang-switch"));
    });

    setLanguage(getInitialLanguage());
  });

  window.siteI18n = {
    getLanguage: function () {
      return currentLanguage;
    },
    setLanguage: setLanguage
  };
})();
