const materias = {
  "Álgebra Superior": { semestre: 1, desbloquea: ["Termodinámica"] },
  "Cálculo I": { semestre: 1, desbloquea: ["Cálculo II", "Ecuaciones Diferenciales"] },
  "Ciencia y Sociedad": { semestre: 1 },
  "Física I": { semestre: 1, desbloquea: ["Física II", "Lab. de Física"] },
  "Química General I": { semestre: 1, desbloquea: ["Química General II"] },
  "La Universidad Libre de Violencia de Género": { semestre: 1 },

  "Cálculo II": { semestre: 2 },
  "Estructura de la Materia": { semestre: 2, desbloquea: ["Química Inorgánica I", "Química Orgánica I"] },
  "Física II": { semestre: 2, desbloquea: ["Fundamentos de Espectroscopia"] },
  "Lab. de Física": { semestre: 2, desbloquea: ["Metrología"] },
  "Química General II": { semestre: 2, desbloquea: ["Química Analítica I"] },
  "Termodinámica": { semestre: 2, desbloquea: ["Equilibrio y Cinética"] },

  "Ecuaciones Diferenciales": { semestre: 3 },
  "Equilibrio y Cinética": { semestre: 3 },
  "Fundamentos de Espectroscopia": { semestre: 3, desbloquea: ["Química Cuántica I"] },
  "Química Inorgánica I": { semestre: 3, desbloquea: ["Química Inorgánica II"] },
  "Química Orgánica I": { semestre: 3, desbloquea: ["Química Orgánica II"] },

  "Estadística": { semestre: 4, desbloquea: ["Metrología"] },
  "Fisicoquímica de Iónica y Electródica": { semestre: 4 },
  "Química Analítica I": { semestre: 4, desbloquea: ["Química Analítica II"] },
  "Química Cuántica I": { semestre: 4 },
  "Química Inorgánica II": { semestre: 4, desbloquea: ["Química Inorgánica III"] },
  "Química Orgánica II": { semestre: 4, desbloquea: ["Química Orgánica III"] },

  "Fisicoquímica de Interfases": { semestre: 5 },
  "Metrología": { semestre: 5 },
  "Química Analítica II": { semestre: 5, desbloquea: ["Química Analítica III", "Química Analítica Instrumental I", "Química Analítica Instrumental II"] },
  "Química Inorgánica III": { semestre: 5, desbloquea: ["Química Inorgánica IV"] },
  "Química Orgánica III": { semestre: 5, desbloquea: ["Química Orgánica IV"] },
  "Optativa Sociohumanística": { semestre: 5 },

  "Analítica Experimental I": { semestre: 6, desbloquea: ["Analítica Experimental II", "Analítica Experimental III"] },
  "Cinética Química": { semestre: 6, desbloquea: ["Lab. Unificado de Fisicoquímica"] },
  "Química Analítica III": { semestre: 6 },
  "Química Inorgánica IV": { semestre: 6 },
  "Química Orgánica IV": { semestre: 6, desbloquea: ["Bioquímica General"] },
  "Optativa Sociohumanística": { semestre: 6 },

  "Comunicación Científica": { semestre: 7 },
  "Química Analítica Instrumental I": { semestre: 7 },
  "Analítica Experimental II": { semestre: 7 },
  "Bioquímica General": { semestre: 7 },
  "Lab. Unificado de Fisicoquímica": { semestre: 7 },
  "Optativa Disciplinaria Tipo A": { semestre: 7 },

  "Analítica Experimental III": { semestre: 8 },
  "Química Analítica Instrumental II": { semestre: 8 },
  "Seminario I": { semestre: 8, desbloquea: ["Seminario II"] },
  "Trabajo de Investigación I": { semestre: 8, desbloquea: ["Trabajo de Investigación II"] },
  "Optativas Disciplinarias Tipo B": { semestre: 8 },

  "Trabajo de Investigación II": { semestre: 9 },
  "Seminario II": { semestre: 9 },
  "Optativas Disciplinarias Tipo B": { semestre: 9 },
  "Química de Coordinación": { semestre: 9 },
  "Química Organometálica": { semestre: 9 },
  "Química Covalente": { semestre: 9 },
  "Química del Estado Sólido": { semestre: 9 },
  "Métodos Electrométricos de Análisis": { semestre: 9 },
  "Métodos Espectroscópicos Cuantitativos": { semestre: 9 },
  "Métodos Espectroscópicos Estructurales": { semestre: 9 },
  "Métodos Analíticos de Separación": { semestre: 9 }
};

const aprobadas = new Set();
const botones = {};

function crearMalla() {
  const contenedor = document.getElementById("malla");
  const ordenadas = Object.keys(materias).sort((a, b) => materias[a].semestre - materias[b].semestre);

  ordenadas.forEach(nombre => {
    const div = document.createElement("div");
    div.textContent = nombre;
    div.classList.add("materia");
    div.dataset.nombre = nombre;

    if (materias[nombre].desbloquea && materias[nombre].desbloquea.length) {
      div.title = "Desbloquea: " + materias[nombre].desbloquea.join(", ");
    }

    div.addEventListener("click", () => toggleAprobada(nombre));
    botones[nombre] = div;
    contenedor.appendChild(div);
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
  Object.keys(materias).forEach(nombre => {
    const prerequisitos = Object.keys(materias).filter(m =>
      materias[m].desbloquea && materias[m].desbloquea.includes(nombre)
    );

    const desbloqueada = prerequisitos.every(p => aprobadas.has(p)) || prerequisitos.length === 0;

    if (desbloqueada) {
      botones[nombre].classList.remove("bloqueada");
    } else {
      botones[nombre].classList.add("bloqueada");
    }
  });
}

crearMalla();
