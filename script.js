const products = [
  { id: 1, title: "Coffe Shake", price: 19.90, desc: "50ml de espresso em 210g de sorvete de creme.", img: "img/PRODUTO.PNG" },
  { id: 2, title: "Capuccino Tradicional", price: 12.00, desc: "70g de capuccino e 100ml de leite cremoso.", img: "img/PRODUTO2.jpg" },
  { id: 3, title: "Affogato", price: 20.90, desc: "30ml de espresso, 140g de sorvete de creme, 15ml de calda de caramelo e chantily.", img: "img/PRODUTO 3.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const totalEl = document.getElementById("total");

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="product-info">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="product-price">R$ ${p.price.toFixed(2)}</div>
        <button onclick="openModal(${p.id})">Ver detalhes</button>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

function openModal(id) {
  const product = products.find(p => p.id === id);
  document.getElementById("modal-img").src = product.img;
  document.getElementById("modal-title").textContent = product.title;
  document.getElementById("modal-desc").textContent = product.desc;
  document.getElementById("modal-price").textContent = product.price.toFixed(2);
  document.getElementById("modal-add-btn").onclick = () => {
    addToCart(product.id);
    closeModal();
  };
  document.getElementById("product-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("product-modal").style.display = "none";
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = "";
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div>
        <h4>${item.title}</h4>
        <p>R$ ${(item.price * item.qty).toFixed(2)}</p>
        <button onclick="removeFromCart(${item.id})">Remover</button>
      </div>
      <div>Qtd: ${item.qty}</div>
    `;
    cartContainer.appendChild(div);
  });
  cartCount.textContent = cart.length;
  subtotalEl.textContent = subtotal.toFixed(2);
  const shipping = cart.length ? 19.90 : 0;
  shippingEl.textContent = shipping.toFixed(2);
  totalEl.textContent = (subtotal + shipping).toFixed(2);
}

function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  cart = [];
  saveCart();
}

renderProducts();
renderCart();
