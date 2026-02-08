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

  let bola;
  let tiposDisponibles = [0, 1, 2]; // 0=problema,1=fracción normal,2=fracción equivalente

  while (tiposDisponibles.length > 0) {
    const tipoBola = tiposDisponibles[Math.floor(Math.random() * tiposDisponibles.length)];

    if (tipoBola === 0) {
      bola = aleatorioSinRepetir(problemas, historialProblemas);
      if (bola) {
        tipoElem.textContent = "Problema";
        contenidoElem.innerHTML = `<p>${bola.enunciado}</p><p><strong>${bola.pregunta}</strong></p>`;
        btnAccion.textContent = "Ver resultado";
        btnAccion.onclick = () => {
          resultadoElem.textContent = `Resultado: ${bola.resultado}`;
          resultadoElem.classList.remove("oculto");
        };
        btnAccion.classList.remove("oculto");
        return;
      } else {
        // quitar tipo de la lista de disponibles
        tiposDisponibles = tiposDisponibles.filter(t => t !== 0);
      }

    } else if (tipoBola === 1) {
      bola = aleatorioSinRepetir(fracciones, historialFracciones);
      if (bola) {
        tipoElem.textContent = "Fracción normal";
        contenidoElem.textContent = bola.fraccion;
        return;
      } else {
        tiposDisponibles = tiposDisponibles.filter(t => t !== 1);
      }

    } else if (tipoBola === 2) {
      bola = aleatorioSinRepetir(equivalentes, historialEquivalentes);
      if (bola) {
        tipoElem.textContent = "Fracción equivalente";
        contenidoElem.innerHTML = `
          <p><strong>Simplifica la siguiente fracción:</strong></p>
          <p style="font-size:1.5rem; margin-top:0.5rem;"><strong>${bola.original}</strong></p>
        `;
        btnAccion.textContent = "Simplificar fracción";
        btnAccion.onclick = () => {
          resultadoElem.textContent = `Fracción irreducible: ${bola.irreducible}`;
          resultadoElem.classList.remove("oculto");
        };
        btnAccion.classList.remove("oculto");
        return;
      } else {
        tiposDisponibles = tiposDisponibles.filter(t => t !== 2);
      }
    }
  }

  // Si llegamos aquí, se acabaron todas las bolas
  tipoElem.textContent = "";
  contenidoElem.textContent = "¡Se han agotado todas las bolas del bingo!";
  btnAccion.classList.add("oculto");
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






