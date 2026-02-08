// -----------------------------
// Variables globales
// -----------------------------
let problemas = [];
let fracciones = [];
let equivalentes = [];

// Elementos del DOM
const tipoElem = document.getElementById("tipo");
const contenidoElem = document.getElementById("contenido");
const resultadoElem = document.getElementById("resultado");
const btnAccion = document.getElementById("btn-accion");
const btnNuevo = document.getElementById("btn-nuevo");

// -----------------------------
// Función para cargar datos JSON
// -----------------------------
async function cargarDatos() {
  try {
    problemas = await fetch("data/problemas.json").then(res => res.json());
    fracciones = await fetch("data/fracciones.json").then(res => res.json());
    equivalentes = await fetch("data/equivalentes.json").then(res => res.json());
    console.log("Problemas:", problemas);
    console.log("Fracciones:", fracciones);
    console.log("Equivalentes:", equivalentes);
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
}


// -----------------------------
// Función para obtener un elemento aleatorio de un array
// -----------------------------
function aleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// -----------------------------
// Función para generar una nueva bola
// -----------------------------
function nuevoElemento() {
  // Ocultar elementos previos
  tipoElem.textContent = "";
  contenidoElem.textContent = "";
  resultadoElem.textContent = "";
  resultadoElem.classList.add("oculto");
  btnAccion.classList.add("oculto");

  // Elegir tipo de bola aleatorio: 0=problema, 1=fracción normal, 2=equivalente
  const tipoBola = Math.floor(Math.random() * 3);

  if (tipoBola === 0) {
    // -----------------------------
    // Problema
    // -----------------------------
    const bola = aleatorio(problemas);
    tipoElem.textContent = "Problema";
    contenidoElem.innerHTML = `<p>${bola.enunciado}</p><p><strong>${bola.pregunta}</strong></p>`;

    btnAccion.textContent = "Ver resultado";
    btnAccion.onclick = () => {
      resultadoElem.textContent = `Resultado: ${bola.resultado}`;
      resultadoElem.classList.remove("oculto");
    };
    btnAccion.classList.remove("oculto");

  } else if (tipoBola === 1) {
    // -----------------------------
    // Fracción normal
    // -----------------------------
    const bola = aleatorio(fracciones);
    tipoElem.textContent = "Fracción normal";
    contenidoElem.textContent = bola.fraccion;

  } else {
    // -----------------------------
    // Fracción equivalente
    // -----------------------------
    const bola = aleatorio(equivalentes);
    tipoElem.textContent = "Fracción equivalente";
    contenidoElem.textContent = bola.original;

    btnAccion.textContent = "Reducir fracción";
    btnAccion.onclick = () => {
      resultadoElem.textContent = `Irreducible: ${bola.irreducible}`;
      resultadoElem.classList.remove("oculto");
    };
    btnAccion.classList.remove("oculto");
  }
}

// -----------------------------
// Inicializar
// -----------------------------
window.addEventListener("load", async () => {
  await cargarDatos();
  console.log("Datos cargados ✅");
});
btnNuevo.addEventListener("click", nuevoElemento);
