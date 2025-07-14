const materias = {
  1: [
    { nombre: "Álgebra Superior", desbloquea: ["Termodinámica"] },
    { nombre: "Cálculo I", desbloquea: ["Cálculo II", "Ecuaciones Diferenciales"] },
    { nombre: "Ciencia y Sociedad" },
    { nombre: "Física I", desbloquea: ["Física II", "Lab. de Física"] },
    { nombre: "Química General I", desbloquea: ["Química General II"] },
    { nombre: "La Universidad Libre de Violencia de Género" }
  ],
  2: [
    { nombre: "Cálculo II" },
    { nombre: "Estructura de la Materia", desbloquea: ["Química Inorgánica I", "Química Orgánica I"] },
    { nombre: "Física II", desbloquea: ["Fundamentos de Espectroscopia"] },
    { nombre: "Lab. de Física", desbloquea: ["Metrología"] },
    { nombre: "Química General II", desbloquea: ["Química Analítica I"] },
    { nombre: "Termodinámica", desbloquea: ["Equilibrio y Cinética"] }
  ],
  3: [
    { nombre: "Ecuaciones Diferenciales" },
    { nombre: "Equilibrio y Cinética" },
    { nombre: "Fundamentos de Espectroscopia", desbloquea: ["Química Cuántica I"] },
    { nombre: "Química Inorgánica I", desbloquea: ["Química Inorgánica II"] },
    { nombre: "Química Orgánica I", desbloquea: ["Química Orgánica II"] }
  ],
  4: [
    { nombre: "Estadística", desbloquea: ["Metrología"] },
    { nombre: "Fisicoquímica de Iónica y Electródica" },
    { nombre: "Química Analítica I", desbloquea: ["Química Analítica II"] },
    { nombre: "Química Cuántica I" },
    { nombre: "Química Inorgánica II", desbloquea: ["Química Inorgánica III"] },
    { nombre: "Química Orgánica II", desbloquea: ["Química Orgánica III"] }
  ],
  5: [
    { nombre: "Fisicoquímica de Interfases" },
    { nombre: "Metrología" },
    { nombre: "Química Analítica II", desbloquea: ["Química Analítica III", "Química Analítica Instrumental I", "Química Analítica Instrumental II"] },
    { nombre: "Química Inorgánica III", desbloquea: ["Química Inorgánica IV"] },
    { nombre: "Química Orgánica III", desbloquea: ["Química Orgánica IV"] },
    { nombre: "Optativa Sociohumanística" }
  ],
  6: [
    { nombre: "Analítica Experimental I", desbloquea: ["Analítica Experimental II", "Analítica Experimental III"] },
    { nombre: "Cinética Química", desbloquea: ["Lab. Unificado de Fisicoquímica"] },
    { nombre: "Química Analítica III" },
    { nombre: "Química Inorgánica IV" },
    { nombre: "Química Orgánica IV", desbloquea: ["Bioquímica General"] },
    { nombre: "Optativa Sociohumanística" }
  ],
  7: [
    { nombre: "Comunicación Científica" },
    { nombre: "Química Analítica Instrumental I" },
    { nombre: "Analítica Experimental II" },
    { nombre: "Bioquímica General" },
    { nombre: "Lab. Unificado de Fisicoquímica" },
    { nombre: "Optativa Disciplinaria Tipo A" }
  ],
  8: [
    { nombre: "Analítica Experimental III" },
    { nombre: "Química Analítica Instrumental II" },
    { nombre: "Seminario I", desbloquea: ["Seminario II"] },
    { nombre: "Trabajo de Investigación I", desbloquea: ["Trabajo de Investigación II"] },
    { nombre: "Optativas Disciplinarias Tipo B" }
  ],
  9: [
    { nombre: "Trabajo de Investigación II" },
    { nombre: "Seminario II" },
    { nombre: "Optativas Disciplinarias Tipo B" },
    { nombre: "Química de Coordinación" },
    { nombre: "Química Organometálica" },
    { nombre: "Química Covalente" },
    { nombre: "Química del Estado Sólido" },
    { nombre: "Métodos Electrométricos de Análisis" },
    { nombre: "Métodos Espectroscópicos Cuantitativos" },
    { nombre: "Métodos Espectroscópicos Estructurales" },
    { nombre: "Métodos Analíticos de Separación" }
  ]
};

const aprobadas = new Set();
const botones = {};

function crearMalla() {
  const contenedor = document.getElementById("malla");

  Object.keys(materias).forEach(semestre => {
    const divSemestre = document.createElement("div");
    divSemestre.classList.add("semestre");

    const titulo = document.createElement("h2");
    titulo.textContent = `${semestre}° Semestre`;

    const divMaterias = document.createElement("div");
    divMaterias.classList.add("materias");

    materias[semestre].forEach(m => {
      const div = document.createElement("div");
      div.classList.add("materia");
      div.textContent = m.nombre;
      div.dataset.nombre = m.nombre;
      div.addEventListener("click", () => toggleAprobada(m.nombre));

      botones[m.nombre] = div;
      divMaterias.appendChild(div);
    });

    divSemestre.appendChild(titulo);
    divSemestre.appendChild(divMaterias);
    contenedor.appendChild(divSemestre);
  });

  actualizarBloqueos();
}

function toggleAprobada(nombre) {
  if (botones[nombre].classList.contains("bloqueada")) return;

  if (aprobadas.has(nombre)) {
    aprobadas.delete(nombre);
    botones[nombre].classList.remove("aprobada");
  } else {
    aprobadas.add(nombre);
    botones[nombre].classList.add("aprobada");
  }

  actualizarBloqueos();
}

function actualizarBloqueos() {
  Object.keys(botones).forEach(nombre => {
    const prerequisitos = [];
    Object.values(materias).forEach(lista => {
      lista.forEach(m => {
        if (m.desbloquea && m.desbloquea.includes(nombre)) {
          prerequisitos.push(m.nombre);
        }
      });
    });

    const desbloqueada = prerequisitos.every(p => aprobadas.has(p)) || prerequisitos.length === 0;

    if (desbloqueada) {
      botones[nombre].classList.remove("bloqueada");
    } else {
      botones[nombre].classList.add("bloqueada");
    }
  });
}

crearMalla();
