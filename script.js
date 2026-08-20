const CHECKOUT_URL = "https://wa.me/+5548996758370";

const products = [
  {
    id: "camiseta-reserva",
    name: "Camiseta Reserva",
    price: "R$ 87,90",
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
    id: "polo-reserva",
    name: "Polo Reserva",
    price: "R$ 124,90",
    fabric: "Malha Peruana",
    sizes: ["M", "G", "GG"],
    composition: "98% Algodão + 2% Elastano",
    colors: [
      { name: "Preta", hex: "#141414", file: "polo-reserva-preta-completa.jpg", scale: 0.95 },
      { name: "Azul Marinho", hex: "#162133", file: "polo-reserva-marinho-completa.jpg", scale: 0.937 },
      { name: "Cinza", hex: "#a6a6a4", file: "polo-reserva-cinza-completa.jpg", scale: 0.949 },
      { name: "Marrom", hex: "#494237", file: "polo-reserva-marrom-completa.jpg", scale: 0.949 },
      { name: "Off-White", hex: "#f2efe5", file: "polo-reserva-off-white-completa.jpg", scale: 0.956 },
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
    id: "camiseta-brooksfield",
    name: "Camiseta Brooksfield",
    price: "R$ 124,90",
    fabric: "Malha Peruana",
    sizes: ["M", "G", "GG"],
    composition: "98% Algodão + 2% Elastano",
    colors: [
      { name: "Azul", hex: "#3e5874", file: "brooksfield-azul-completa.jpg", scale: 0.904 },
      { name: "Laranja", hex: "#d67a43", file: "brooksfield-azul-laranja.jpg", scale: 0.919 },
    ],
  },
  {
    id: "camiseta-tommy-hilfiger",
    name: "Camiseta Tommy Hilfiger",
    price: "R$ 87,90",
    fabric: "Malha Egípcia",
    sizes: ["P", "M", "G", "GG"],
    composition: "93% Algodão + 7% Elastano (40.1)",
    colors: [
      { name: "Preta", hex: "#121416", file: "tommy-hilfiger-preta-completa.jpg", scale: 0.948 },
      { name: "Off-White", hex: "#f1eee4", file: "tommy-hilfiger-off-white-completa.jpg", scale: 0.918 },
    ],
  },
  {
    id: "polo-tommy-hilfiger",
    name: "Polo Tommy Hilfiger",
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
    price: "R$ 87,90",
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
  {
    id: "camiseta-columbia",
    name: "Camiseta Columbia",
    price: "R$ 87,90",
    fabric: "Malha Egípcia",
    sizes: ["P", "M", "G", "GG"],
    composition: "93% Algodão + 7% Elastano (40.1)",
    colors: [
      { name: "Preta", hex: "#171717", file: "columbia-preta-completa.jpg", scale: 0.95 },
      { name: "Azul Marinho", hex: "#17263b", file: "columbia-marinho-completa.jpg", scale: 0.941 },
    ],
  },
  {
    id: "camiseta-fred-perry",
    name: "Camiseta Fred Perry",
    price: "R$ 87,90",
    fabric: "Malha Egípcia",
    sizes: ["P", "M", "G", "GG"],
    composition: "93% Algodão + 7% Elastano (40.1)",
    colors: [
      { name: "Cinza", hex: "#8c8c89", file: "fred-perry-cinza-completa.jpg", scale: 0.894 },
    ],
  },
];

const grid = document.querySelector("#product-grid");
const productView = document.querySelector("#product-view");
const detailImage = document.querySelector("#detail-image");
const colorOptions = document.querySelector("#color-options");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
let activeProduct = null;
let lastFocusedElement = null;

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
              availability: "https://schema.org/InStock",
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
            </div>
            <div class="product-meta">
              <h2>${product.name}</h2>
              <p>${product.price}</p>
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
  document.querySelector("#detail-name").textContent = product.name;
  document.querySelector("#detail-price").textContent = product.price;
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
  document.body.classList.add("is-locked");
  productView.scrollTop = 0;
  document.querySelector(".detail-close").focus();
  history.replaceState(null, "", `#${product.id}`);
}

function closeProduct() {
  productView.hidden = true;
  document.body.classList.remove("is-locked");
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
  if (event.key === "Escape" && !productView.hidden) closeProduct();
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

document.querySelector("#year").textContent = new Date().getFullYear();
addStructuredData();
renderProducts();

const initialProduct = products.find((product) => `#${product.id}` === location.hash);
if (initialProduct) openProduct(initialProduct);
