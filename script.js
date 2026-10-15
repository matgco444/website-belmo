const CHECKOUT_URL = "https://wa.me/+5548996758370";
const LAUNCH_GROUP_URL = "https://chat.whatsapp.com/ExXaLXrEnwV3JYqu047RjP?s=cl&p=i&mlu=0&ilr=0&amv=0";
// Site estático: substitua pelo URL de implantação /exec do Google Apps Script.
const LEAD_CAPTURE_URL = "https://script.google.com/macros/s/AKfycbwWQFCZvcdxfP4USs0_naXGqWxXuyaJoiMolCuffkTcfUJEnMd5OwRnYkT87VyUdWRp/exec";
const LEAD_REGISTERED_KEY = "belmo_cadastro_realizado";
const LEAD_SKIPPED_KEY = "belmo_cadastro_pulado";
const LEAD_MODAL_DELAY = 0;
const LEAD_REQUEST_TIMEOUT = 15000;

const products = [
  {
    id: "camiseta-reserva",
    name: "Camiseta Reserva",
    soldOut: true,
    price: "R$ 89,90",
    fabric: "Malha Egípcia",
    sizes: ["P", "M", "G", "GG"],
    composition: "93% Algodão + 7% Elastano (40.1)",
    colors: [
      { name: "Preta", hex: "#151719", file: "reserva-preta-completa.jpg", scale: 0.92 },
      { name: "Off-White", hex: "#f1eee4", file: "reserva-off-white-completa.jpg", scale: 0.92 },
      { name: "Marrom", hex: "#5b412c", file: "reserva-marrom-completa.jpg", scale: 0.95 },
    ],
  },
  {
    id: "polo-brooksfield",
    name: "Polo Brooksfield",
    price: "R$ 124,90",
    fabric: "Malha Peruana",
    sizes: ["M", "G", "GG"],
    composition: "98% Algodão + 2% Elastano",
    colors: [
      { name: "Marrom", hex: "#494237", file: "polo-brooksfield-marrom-completa.jpg", scale: 0.949 },
      { name: "Cinza", hex: "#a6a6a4", file: "polo-brooksfield-cinza-completa.jpg", scale: 0.949 },
      { name: "Preta", hex: "#141414", file: "polo-brooksfield-preta-completa.jpg", scale: 0.95 },
      { name: "Azul Marinho", hex: "#162133", file: "polo-brooksfield-marinho-completa.jpg", scale: 0.937 },
      { name: "Off-White", hex: "#f2efe5", file: "polo-brooksfield-off-white-completa.jpg", scale: 0.956 },
    ],
  },
  {
    id: "camiseta-tommy-hilfiger",
    name: "Camiseta Tommy Hilfiger",
    price: "R$ 89,90",
    fabric: "Malha Egípcia",
    sizes: ["P", "M", "G", "GG"],
    composition: "93% Algodão + 7% Elastano (40.1)",
    colors: [
      { name: "Azul Marinho", hex: "#17233b", file: "tommy-marinho-completa.png", scale: 0.948 },
      { name: "Marrom", hex: "#553724", file: "tommy-marrom-completa.png", scale: 0.948 },
      { name: "Preta", hex: "#151617", file: "tommy-preta-completa.png", scale: 0.948 },
      { name: "Off-White", hex: "#f1eee4", file: "tommy-hilfiger-off-white-completa.jpg", scale: 0.918 },
    ],
  },
  {
    id: "polo-tommy-hilfiger",
    name: "Polo Tommy Hilfiger",
    soldOut: true,
    price: "R$ 127,90",
    fabric: "Malha Tecnológica",
    sizes: ["P", "M", "G", "GG"],
    composition: "85% Poliamida + 15% Elastano",
    colors: [
      { name: "Preta", hex: "#121416", file: "polo-tommy-hilfiger-preta-completa.jpg", scale: 0.95 },
      { name: "Azul Marinho", hex: "#1b2a42", file: "polo-tommy-hilfiger-marinho-completa.jpg", scale: 0.95 },
    ],
  },
  {
    id: "camiseta-lacoste",
    name: "Camiseta Lacoste",
    price: "R$ 89,90",
    fabric: "Malha Egípcia",
    sizes: ["P", "M", "G", "GG"],
    composition: "93% Algodão + 7% Elastano (40.1)",
    colors: [
      { name: "Azul Marinho", hex: "#1c2738", file: "lacoste-marinha-completa.jpg", scale: 0.974 },
      { name: "Verde Escuro", hex: "#263c32", file: "lacoste-verde-escuro-completa.jpg", scale: 0.926 },
      { name: "Verde", hex: "#53745b", file: "lacoste-verde-completa.jpg", scale: 0.948 },
      { name: "Preta", hex: "#161616", file: "lacoste-preta-completa.jpg", scale: 0.929 },
    ],
  },
];

const grid = document.querySelector("#product-grid");
const productView = document.querySelector("#product-view");
const detailImage = document.querySelector("#detail-image");
const colorOptions = document.querySelector("#color-options");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const leadModal = document.querySelector("#lead-modal");
const leadForm = document.querySelector("#lead-form");
const leadRegistered = document.querySelector("#lead-registered");
const leadRegisteredClose = document.querySelector("#lead-registered-close");
const leadName = document.querySelector("#lead-name");
const leadWhatsapp = document.querySelector("#lead-whatsapp");
const leadSubmit = document.querySelector("#lead-submit");
const leadSubmitLabel = leadSubmit.querySelector(".lead-submit-label");
const leadSkip = document.querySelector("#lead-skip");
const leadStatus = document.querySelector("#lead-status");
const leadConfirmation = document.querySelector("#lead-confirmation");
let activeProduct = null;
let lastFocusedElement = null;
let leadLastFocusedElement = null;
let leadSubmitting = false;
let confirmationAudioContext = null;
let confirmationTimer = null;
let leadCloseTimer = null;

function updateBodyLock() {
  document.body.classList.toggle("is-locked", !productView.hidden || !leadModal.hidden);
}

function hasStorageValue(storageName, key) {
  try {
    return window[storageName].getItem(key) !== null;
  } catch (error) {
    console.warn(`Não foi possível consultar ${key}.`, error);
    return false;
  }
}

function setStorageValue(storageName, key) {
  try {
    window[storageName].setItem(key, "true");
  } catch (error) {
    console.warn(`Não foi possível salvar ${key}.`, error);
  }
}

function shouldShowLeadModal() {
  return !hasStorageValue("localStorage", LEAD_REGISTERED_KEY) && !hasStorageValue("sessionStorage", LEAD_SKIPPED_KEY);
}

function openLeadModal(force = false) {
  if ((!force && !shouldShowLeadModal()) || leadSubmitting) return;
  if (!leadModal.hidden && leadModal.classList.contains("is-visible")) return;
  window.clearTimeout(leadCloseTimer);
  leadLastFocusedElement = mobileMenu.contains(document.activeElement)
    ? menuToggle : document.activeElement;
  const registered = hasStorageValue("localStorage", LEAD_REGISTERED_KEY);
  leadForm.hidden = registered;
  leadRegistered.hidden = !registered;
  document.querySelector("#lead-title").textContent = registered
    ? "Você já está cadastrado!"
    : "Fique por dentro das novidades da Belmo";
  document.querySelector("#lead-description").textContent = registered
    ? "Você já acessou o grupo de lançamentos? Entre para acompanhar as novidades da Belmo."
    : "Cadastre-se para receber novidades, lançamentos, reposições e ofertas em primeira mão.";
  leadModal.hidden = false;
  updateBodyLock();
  window.requestAnimationFrame(() => {
    leadModal.classList.add("is-visible");
    window.requestAnimationFrame(() => {
      if (!leadModal.hidden && leadModal.classList.contains("is-visible")) {
        (registered ? leadRegisteredClose : leadName).focus({ preventScroll: true });
      }
    });
  });
}

function closeLeadModal() {
  window.clearTimeout(leadCloseTimer);
  leadModal.classList.remove("is-visible");
  leadCloseTimer = window.setTimeout(() => {
    leadModal.hidden = true;
    if (hasStorageValue("localStorage", LEAD_REGISTERED_KEY)) {
      leadSubmitting = false;
      leadSubmit.disabled = false;
      leadSkip.disabled = false;
      leadSubmit.classList.remove("is-loading");
      leadSubmitLabel.textContent = "Quero me cadastrar";
      leadForm.removeAttribute("aria-busy");
    }
    updateBodyLock();
    if (!productView.hidden) {
      document.querySelector(".detail-close").focus();
    } else {
      leadLastFocusedElement?.focus();
    }
  }, 280);
}
function skipLeadCapture() {
  if (leadSubmitting) return;
  setStorageValue("sessionStorage", LEAD_SKIPPED_KEY);
  closeLeadModal();
}

function digitsOnly(value) {
  return value.replace(/\D/g, "");
}

function formatWhatsapp(value) {
  const digits = digitsOnly(value).slice(0, 11);
  if (!digits) return "";
  if (digits.length < 3) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const number = digits.slice(2);
  if (number.length <= 4) return `(${areaCode}) ${number}`;
  if (number.length <= 8) return `(${areaCode}) ${number.slice(0, 4)}-${number.slice(4)}`;
  return `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`;
}

function showLeadStatus(message, success = false) {
  leadStatus.textContent = message;
  leadStatus.classList.toggle("is-success", success);
}

function prepareConfirmationSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    confirmationAudioContext ||= new AudioContextClass();
    if (confirmationAudioContext.state === "suspended") {
      confirmationAudioContext.resume().catch(() => {});
    }
  } catch (error) {
    console.warn("Não foi possível preparar o som de confirmação.", error);
  }
}

function playConfirmationSound() {
  if (!confirmationAudioContext) return;

  try {
    const startAt = confirmationAudioContext.currentTime;
    [659.25, 783.99, 987.77].forEach((frequency, index) => {
      const oscillator = confirmationAudioContext.createOscillator();
      const gain = confirmationAudioContext.createGain();
      const noteStart = startAt + index * 0.1;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.24);
      oscillator.connect(gain);
      gain.connect(confirmationAudioContext.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.25);
    });
  } catch (error) {
    console.warn("Não foi possível tocar o som de confirmação.", error);
  }
}

function showLeadConfirmation() {
  window.clearTimeout(confirmationTimer);
  leadConfirmation.hidden = false;
  window.requestAnimationFrame(() => leadConfirmation.classList.add("is-visible"));
  playConfirmationSound();

  confirmationTimer = window.setTimeout(() => {
    leadConfirmation.classList.remove("is-visible");
    window.setTimeout(() => {
      leadConfirmation.hidden = true;
    }, 240);
  }, 4200);
}

function validateLeadForm() {
  const name = leadName.value.trim();
  const whatsapp = digitsOnly(leadWhatsapp.value);
  leadName.removeAttribute("aria-invalid");
  leadWhatsapp.removeAttribute("aria-invalid");

  if (!name) {
    leadName.setAttribute("aria-invalid", "true");
    showLeadStatus("Informe seu nome para continuar.");
    leadName.focus();
    return null;
  }

  if (whatsapp.length < 10 || whatsapp.length > 11) {
    leadWhatsapp.setAttribute("aria-invalid", "true");
    showLeadStatus("Informe um WhatsApp válido com DDD.");
    leadWhatsapp.focus();
    return null;
  }

  return { nome: name, whatsapp, origem: "Site Belmo" };
}

async function submitLead(event) {
  event.preventDefault();
  if (leadSubmitting) return;

  const payload = validateLeadForm();
  if (!payload) return;

  prepareConfirmationSound();
  leadSubmitting = true;
  leadSubmit.disabled = true;
  leadSkip.disabled = true;
  leadSubmit.classList.add("is-loading");
  leadSubmitLabel.textContent = "Enviando";
  leadForm.setAttribute("aria-busy", "true");
  showLeadStatus("Enviando seu cadastro...");
  const controller = new AbortController();
  const requestTimeout = window.setTimeout(() => controller.abort(), LEAD_REQUEST_TIMEOUT);

  try {
    if (!/^https:\/\//i.test(LEAD_CAPTURE_URL) || LEAD_CAPTURE_URL.includes("COLE_AQUI")) {
      throw new Error("URL do Google Apps Script ainda não configurada.");
    }

    const response = await fetch(LEAD_CAPTURE_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Falha no envio: HTTP ${response.status}.`);

    const responseType = response.headers.get("content-type") || "";
    if (!responseType.includes("application/json")) {
      throw new Error("O serviço não retornou uma confirmação JSON válida.");
    }

    const result = await response.json();
    const wasConfirmed = result.success === true || result.ok === true || result.status === "success";
    if (!wasConfirmed) {
      throw new Error(result.message || "O serviço não confirmou o cadastro.");
    }

    setStorageValue("localStorage", LEAD_REGISTERED_KEY);
    showLeadStatus("Cadastro realizado.", true);
    leadSubmitLabel.textContent = "Cadastro realizado";
    showLeadConfirmation();
    window.setTimeout(closeLeadModal, 220);
  } catch (error) {
    console.error("Não foi possível enviar o cadastro.", error);
    showLeadStatus("Não foi possível concluir o cadastro. Verifique sua conexão e tente novamente.");
    leadSubmitting = false;
    leadSubmit.disabled = false;
    leadSkip.disabled = false;
    leadSubmit.classList.remove("is-loading");
    leadSubmitLabel.textContent = "Quero me cadastrar";
    leadForm.removeAttribute("aria-busy");
  } finally {
    window.clearTimeout(requestTimeout);
  }
}

function imagePath(product, color) {
  return color.file;
}

function addStructuredData() {
  const siteUrl = "https://www.belmoloja.com/";
  const organizationId = `${siteUrl}#organization`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Belmo",
        url: siteUrl,
        logo: new URL("logo-openai-belmo-removebg-preview.png", siteUrl).href,
        sameAs: ["https://instagram.com/belmooo"],
      },
      {
        "@type": "WebSite",
        name: "Belmo",
        url: siteUrl,
        publisher: { "@id": organizationId },
        inLanguage: "pt-BR",
      },
      {
        "@type": "ItemList",
        name: "Camisetas e camisas polo premium",
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: new URL(`#${product.id}`, siteUrl).href,
          item: {
            "@type": "Product",
            name: product.name,
            image: product.colors.map((color) => new URL(imagePath(product, color), siteUrl).href),
            description: `${product.name} em ${product.fabric}, disponível nos tamanhos ${product.sizes.join(", ")}.`,
            brand: {
              "@type": "Brand",
              name: product.name.replace(/^(Camiseta|Polo) /, ""),
            },
            offers: {
              "@type": "Offer",
              price: product.price.replace("R$ ", "").replace(",", "."),
              priceCurrency: "BRL",
              availability: `https://schema.org/${product.soldOut ? "OutOfStock" : "InStock"}`,
              itemCondition: "https://schema.org/NewCondition",
              url: new URL(`#${product.id}`, siteUrl).href,
              seller: { "@id": organizationId },
            },
          },
        })),
      },
    ],
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.append(script);
}

function renderProducts() {
  document.querySelector("#product-count").textContent = String(products.length).padStart(2, "0");
  grid.innerHTML = products
    .map((product, index) => {
      const swatches = product.colors
        .map((color) => `<span class="mini-swatch" style="background:${color.hex}" title="${color.name}"></span>`)
        .join("");

      return `
        <article class="product-card">
          <button class="product-open" type="button" data-product-id="${product.id}" aria-label="Ver ${product.name}">
            <div class="product-image">
              <img src="${imagePath(product, product.colors[0])}" alt="${product.name} — ${product.colors[0].name}" style="--piece-scale:${product.colors[0].scale}" decoding="async" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
              ${product.soldOut ? '<span class="sold-out-badge">Esgotado</span>' : ""}
            </div>
            <div class="product-meta">
              <h2>${product.name}</h2>
              <p>${product.soldOut ? "Esgotado" : product.price}</p>
            </div>
            <div class="product-colors-preview" aria-label="${product.colors.length} cores disponíveis">${swatches}</div>
          </button>
        </article>`;
    })
    .join("");
}

function openProduct(product) {
  activeProduct = product;
  lastFocusedElement = document.activeElement;
  productView.classList.toggle("is-sold-out", Boolean(product.soldOut));
  document.querySelector("#detail-name").textContent = product.name;
  document.querySelector("#detail-price").textContent = product.soldOut ? "Esgotado" : product.price;
  document.querySelector("#buy-button").textContent = product.soldOut
    ? "Aguardar relançamento ↗"
    : "Comprar pelo WhatsApp ↗";
  document.querySelector(".buy-note").textContent = product.soldOut
    ? "Entre no grupo para acompanhar o próximo relançamento."
    : "Ao continuar, o WhatsApp será aberto com sua mensagem pronta.";
  document.querySelector("#detail-fabric").textContent = product.fabric;
  document.querySelector("#detail-composition").textContent = product.composition;
  document.querySelector("#detail-sizes").innerHTML = product.sizes.map((size) => `<span>${size}</span>`).join("");
  colorOptions.innerHTML = product.colors
    .map(
      (color, index) => `
        <button
          class="color-button${index === 0 ? " is-active" : ""}"
          type="button"
          style="--swatch:${color.hex}"
          data-color-index="${index}"
          aria-label="${color.name}"
          aria-pressed="${index === 0}"
          title="${color.name}">
        </button>`,
    )
    .join("");

  selectColor(0, false);
  productView.hidden = false;
  updateBodyLock();
  productView.scrollTop = 0;
  document.querySelector(".detail-close").focus();
  history.replaceState(null, "", `#${product.id}`);
}

function closeProduct() {
  productView.hidden = true;
  updateBodyLock();
  history.replaceState(null, "", `${location.pathname}${location.search}#produtos`);
  lastFocusedElement?.focus();
  activeProduct = null;
}

function selectColor(index, animate = true) {
  if (!activeProduct) return;
  const color = activeProduct.colors[index];
  const update = () => {
    detailImage.src = imagePath(activeProduct, color);
    detailImage.alt = `${activeProduct.name} — ${color.name}`;
    detailImage.style.setProperty("--piece-scale", color.scale);
    document.querySelector("#selected-color").textContent = color.name;
    document.querySelector("#image-index").textContent = `${String(index + 1).padStart(2, "0")} / ${String(activeProduct.colors.length).padStart(2, "0")}`;
    document.querySelectorAll(".color-button").forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    detailImage.classList.remove("is-changing");
  };

  if (animate) {
    detailImage.classList.add("is-changing");
    window.setTimeout(update, 140);
  } else {
    update();
  }
}

function buyProduct() {
  if (!activeProduct) return;
  if (activeProduct.soldOut) {
    window.open(LAUNCH_GROUP_URL, "_blank", "noopener,noreferrer");
    return;
  }
  const message = `Olá, gostei da peça ${activeProduct.name}, gostaria de mais informações!`;
  const checkoutLink = `${CHECKOUT_URL}?text=${encodeURIComponent(message)}`;
  window.open(checkoutLink, "_blank", "noopener,noreferrer");
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".product-open");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.productId);
  if (product) openProduct(product);
});

colorOptions.addEventListener("click", (event) => {
  const button = event.target.closest(".color-button");
  if (button) selectColor(Number(button.dataset.colorIndex));
});

document.querySelector(".detail-close").addEventListener("click", closeProduct);
document.querySelector("#buy-button").addEventListener("click", buyProduct);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !leadModal.hidden) {
    skipLeadCapture();
    return;
  }
  if (event.key === "Escape" && !productView.hidden) closeProduct();

  if (event.key === "Tab" && !leadModal.hidden) {
    const focusable = [...leadModal.querySelectorAll('input, button:not(:disabled), a[href]')]
      .filter((element) => element.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!leadModal.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

leadWhatsapp.addEventListener("input", () => {
  leadWhatsapp.value = formatWhatsapp(leadWhatsapp.value);
  leadWhatsapp.removeAttribute("aria-invalid");
});

leadName.addEventListener("input", () => leadName.removeAttribute("aria-invalid"));
leadForm.addEventListener("submit", submitLead);
leadSkip.addEventListener("click", skipLeadCapture);
leadRegisteredClose.addEventListener("click", closeLeadModal);
document.querySelectorAll("[data-open-newsletter]").forEach((button) => {
  button.addEventListener("click", () => openLeadModal(true));
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "Fechar" : "Menu";
});

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "Menu";
});

function initializeVsl() {
  const video = document.querySelector(".vsl-video");
  const section = document.querySelector(".vsl-section");
  const store = document.querySelector(".store");
  const soundButton = document.querySelector(".vsl-sound-button");
  if (!video || !section || !store || !soundButton) return;

  let playbackAllowed = null;
  let animationFrame = null;
  let playRequest = 0;
  video.muted = false;

  const canPlay = () => window.scrollY <= 2 && !document.hidden && productView.hidden;

  async function startPlayback() {
    const request = ++playRequest;
    try {
      await video.play();
      if (request !== playRequest) return;
      if (!canPlay()) video.pause();
      soundButton.hidden = !video.muted;
    } catch (error) {
      if (request !== playRequest || !canPlay() || error.name === "AbortError") return;
      soundButton.hidden = false;
      if (error.name === "NotAllowedError" && !video.muted) {
        // Try sound first; preserve autoplay with a sound button when the browser blocks it.
        video.muted = true;
        try {
          await video.play();
          if (request === playRequest && !canPlay()) video.pause();
        } catch (_) {
          // The visitor can start playback using the sound button or native controls.
        }
      }
    }
  }

  function syncPlayback() {
    const allowed = canPlay();
    if (!allowed) {
      playbackAllowed = false;
      playRequest++;
      video.pause();
      return;
    }
    if (playbackAllowed) return;
    playbackAllowed = true;
    startPlayback();
  }

  soundButton.addEventListener("click", () => {
    video.muted = false;
    if (video.volume === 0) video.volume = 1;
    if (canPlay()) startPlayback();
  });
  video.addEventListener("volumechange", () => {
    soundButton.hidden = !video.muted && video.volume > 0;
  });

  function updateOverlap() {
    animationFrame = null;
    const videoBounds = section.getBoundingClientRect();
    const gridBounds = grid.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      (videoBounds.bottom - gridBounds.top) / Math.max(videoBounds.height, 1),
    ));
    store.style.setProperty("--vsl-progress", progress.toFixed(3));
  }

  function updateVsl() {
    syncPlayback();
    if (animationFrame === null) animationFrame = window.requestAnimationFrame(updateOverlap);
  }

  window.addEventListener("scroll", updateVsl, { passive: true });
  window.addEventListener("resize", updateVsl);
  window.addEventListener("pageshow", updateVsl);
  document.addEventListener("visibilitychange", syncPlayback);
  video.addEventListener("loadedmetadata", updateVsl);
  video.addEventListener("play", () => {
    if (!canPlay()) video.pause();
  });
  new MutationObserver(syncPlayback).observe(productView, {
    attributes: true,
    attributeFilter: ["hidden"],
  });
  updateVsl();
}
document.querySelector("#year").textContent = new Date().getFullYear();
addStructuredData();
renderProducts();

const initialProduct = products.find((product) => `#${product.id}` === location.hash);
if (initialProduct) openProduct(initialProduct);
initializeVsl();

window.setTimeout(openLeadModal, LEAD_MODAL_DELAY);
