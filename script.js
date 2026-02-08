// -----------------------------
// Variables globales
// -----------------------------
let problemas = [];
let fracciones = [];
let equivalentes = [];

// Historial de bolas ya salidas
let historialProblemas = [];
let historialFracciones = [];
let historialEquivalentes = [];

// Elementos del DOM
const tipoElem = document.getElementById("tipo");
const contenidoElem = document.getElementById("contenido");
const resultadoElem = document.getElementById("resultado");
const btnAccion = document.getElementById("btn-accion");
const btnNuevo = document.getElementById("btn-nuevo");
const btnReiniciar = document.getElementById("btn-reiniciar");

// -----------------------------
// Función para cargar datos JSON
// -----------------------------
async function cargarDatos() {
  try {
    problemas = await fetch("data/problemas.json").then(res => res.json());
    fracciones = await fetch("data/fracciones.json").then(res => res.json());
    equivalentes = await fetch("data/equivalentes.json").then(res => res.json());
    console.log("Datos cargados ✅");
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
}

// -----------------------------
// Función para obtener un elemento aleatorio sin repetir
// -----------------------------
function aleatorioSinRepetir(lista, historial) {
  const disponibles = lista.filter(item => !historial.includes(item.id));
  if (disponibles.length === 0) return null; // Se acabaron
  const elegido = disponibles[Math.floor(Math.random() * disponibles.length)];
  historial.push(elegido.id);
  return elegido;
}

// -----------------------------
// Función para generar una nueva bola
// -----------------------------
function nuevoElemento() {
  tipoElem.textContent = "";
  contenidoElem.textContent = "";
  resultadoElem.textContent = "";
  resultadoElem.classList.add("oculto");
  btnAccion.classList.add("oculto");

  const tipoBola = Math.floor(Math.random() * 3);
  let bola;

  if (tipoBola === 0) {
    bola = aleatorioSinRepetir(problemas, historialProblemas);
    tipoElem.textContent = "Problema";
    if (!bola) {
      contenidoElem.textContent = "¡Se acabaron los problemas!";
      return;
    }
    contenidoElem.innerHTML = `<p>${bola.enunciado}</p><p><strong>${bola.pregunta}</strong></p>`;
    btnAccion.textContent = "Ver resultado";
    btnAccion.onclick = () => {
      resultadoElem.textContent = `Resultado: ${bola.resultado}`;
      resultadoElem.classList.remove("oculto");
    };
    btnAccion.classList.remove("oculto");

  } else if (tipoBola === 1) {
    bola = aleatorioSinRepetir(fracciones, historialFracciones);
    tipoElem.textContent = "Fracción normal";
    if (!bola) {
      contenidoElem.textContent = "¡Se acabaron las fracciones normales!";
      return;
    }
    contenidoElem.textContent = bola.fraccion;

  else {
    bola = aleatorioSinRepetir(equivalentes, historialEquivalentes);
    tipoElem.textContent = "Fracción equivalente";
    if (!bola) {
      contenidoElem.textContent = "¡Se acabaron las fracciones equivalentes!";
      return;
    }
    contenidoElem.innerHTML = `<p>Simplifica la siguiente fracción:</p><p><strong>${bola.original}</strong></p>`;
    btnAccion.textContent = "Simplificar fracción";
    btnAccion.onclick = () => {
      resultadoElem.textContent = `Fracción irreducible: ${bola.irreducible}`;
      resultadoElem.classList.remove("oculto");
    };
    btnAccion.classList.remove("oculto");
  }

}

// -----------------------------
// Función para reiniciar bingo
// -----------------------------
function reiniciarBingo() {
  location.reload(); // recarga toda la página
}


// -----------------------------
// Inicializar
// -----------------------------
window.addEventListener("DOMContentLoaded", async () => {
  await cargarDatos();
  btnNuevo.addEventListener("click", nuevoElemento);
  btnReiniciar.addEventListener("click", reiniciarBingo);
});


