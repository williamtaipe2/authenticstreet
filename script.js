// Mostrar cookies solo si no aceptó antes
function verificarCookies() {
  let decision = localStorage.getItem("cookiesDecision");

  if (!decision) {
    document.getElementById("cookies").style.display = "flex";
  }
}

function aceptarCookies() {
  localStorage.setItem("cookiesDecision", "aceptadas");
  document.getElementById("cookies").style.display = "none";
}

function rechazarCookies() {
  localStorage.setItem("cookiesDecision", "rechazadas");
  document.getElementById("cookies").style.display = "none";
}

// Ejecutar al cargar
window.onload = function () {
  verificarCookies();
};

// =======================
// COOKIES
// =======================
function verificarCookies() {
  let decision = localStorage.getItem("cookiesDecision");

  if (!decision) {
    let banner = document.getElementById("cookies");
    if (banner) banner.style.display = "flex";
  }
}

function aceptarCookies() {
  localStorage.setItem("cookiesDecision", "aceptadas");
  document.getElementById("cookies").style.display = "none";
}


function rechazarCookies() {
  localStorage.setItem("cookiesDecision", "rechazadas");
  document.getElementById("cookies").style.display = "none";
}




function comprarWhatsApp() {
 

  carrito.forEach((item) => {
    mensaje += `- ${item.nombre} (Talla ${item.talla})\n`;
  });

  mensaje += "Total: S/ " + carrito.length * 30;

  let url = `https://wa.me/51912963421?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}







let tallaSeleccionada = "";

function selectTalla(talla) {
  tallaSeleccionada = talla;

  document.querySelectorAll(".tallas button").forEach(btn => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");
  let carrito = obtenerCarrito();

  let producto = {
    nombre: "Outlaw Star Negro",
    precio: 30,
    talla: tallaSeleccionada,
    cantidad: 1,
    img: "img/poloespalda.jpeg"
  };

  // Si ya existe, suma cantidad
  let existente = carrito.find(p => p.nombre === producto.nombre && p.talla === producto.talla);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push(producto);
  }

  guardarCarrito(carrito);

  mostrarToast("Producto agregado al carrito 🛒");
}

function cambiarImg(img) {
  document.querySelector(".principal").src = img.src;
}

// =======================
// btn ir al carrito a otro html carrito.html
// =======================

function ircar() {
  window.location.href = "carrito.html";
}




// =======================
// CONFIG GLOBAL
// =======================
const STORAGE_KEY = "carrito_authentic";
const WHATSAPP = "51912963421";

// =======================
// UTILIDADES
// =======================
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}


// =======================
// RENDER CARRITO
// =======================
function renderCarrito() {
  let carrito = obtenerCarrito();

  let contenedor = document.querySelector(".lista");
  let total = 0;

  if (!contenedor) return;

  contenedor.innerHTML = "<h2>CARRITO</h2>";

  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;

    contenedor.innerHTML += `
      <article class="item">
        <img src="${item.img}">

        <div class="info">
          <p>${item.nombre}</p>
          <span>Talla: ${item.talla}</span>
          <p>S/ ${item.precio}</p>
        </div>

        <div class="cantidad">
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </div>

        <p class="precio">S/ ${item.precio * item.cantidad}</p>

        <button class="btn-danger" onclick="eliminarProducto(${index})">Quitar</button>
      </article>

    `;
  });
  

  actualizarTotal(total);
  let totalesHTML = document.getElementById("totales");
    if (totalesHTML) {
      totalesHTML.innerText = "S/ " + total;
    } 
    
}




// =======================
// CANTIDAD
// =======================
function cambiarCantidad(index, cambio) {
  let carrito = obtenerCarrito();

  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito(carrito);
  renderCarrito();
}

// =======================
// ELIMINAR
// =======================
function eliminarProducto(index) {
  let carrito = obtenerCarrito();

  carrito.splice(index, 1);

  guardarCarrito(carrito);
  renderCarrito();
}

// =======================
// TOTAL
// =======================
function actualizarTotal(total) {
  let totalHTML = document.getElementById("total");
  if (totalHTML) {
    totalHTML.innerText = "S/ " + total;
  }
}

// =======================
// CHECKOUT → WHATSAPP
// =======================
function finalizarCompra() {
  let carrito = obtenerCarrito();

  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let distrito = document.getElementById("distrito").value;
  let sugerencias = document.getElementById("sugerencias");

  if (!nombre || !correo || !distrito) {
    mostrarToast("Completa todos los campos con * ⚠️");
    return;
  }

  let mensaje = `🛒 PEDIDO AUTHENTIC STREETWEAR\n\n`;

  carrito.forEach(item => {
    mensaje += `• ${item.nombre}\nTalla: ${item.talla}\nCantidad: ${item.cantidad}\n\n`;
  });

  let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  mensaje += `💰 Total: S/ ${total}\n`;
  mensaje += `💸 Adelanto: S/ 5 (Yape/Plin)\n\n`;

  mensaje += `👤 Cliente: ${nombre}\n📍 Distrito: ${distrito}\n📧 Correo: ${correo}\n\n`;

  if (sugerencias) {
    mensaje += `💡 Sugerencias: ${sugerencias}\n`;
  }

  mensaje += `\nEnviar comprobante por este medio.`;

  let url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}

// =======================
// AUTO INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();
  verificarCookies();
});


// toast

function mostrarToast(mensaje) {
  let toast = document.getElementById("toast");

  toast.innerText = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
function enviarReclamo(e) {
  e.preventDefault(); // evita recargar
  mostrarToast("Enviando reclamo a WhatsApp 📲");

  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let dni = document.getElementById("dni").value;
  let tipo = document.getElementById("tipo").value;
  let detalle = document.getElementById("detalle").value;

  let mensaje = `📋 LIBRO DE RECLAMACIONES\n\n`;

  mensaje += `👤 Nombre: ${nombre}\n`;
  mensaje += `📧 Correo: ${correo}\n`;
  mensaje += `🆔 DNI: ${dni}\n`;
  mensaje += `📌 Tipo: ${tipo}\n\n`;
  mensaje += `📝 Detalle:\n${detalle}`;

  let numero = "51912963421"; // CAMBIA SI QUIERES
  let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
  
}
