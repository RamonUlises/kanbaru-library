// ----------------------
// CATEGORÍAS
// ----------------------
let chartCategorias = null;

async function cargarGraficoCategorias() {
  try {
    const res = await fetch('/api/estadisticas/categorias');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return;

    const labels = data.map(d => d.categoria);
    const valores = data.map(d => d.total);
    const total = valores.reduce((a, b) => a + b, 0);

    const backgroundColor = [
      '#7B5E53', '#A0826F', '#937263', '#654E47', '#AD998F',
      '#CDBAB3', '#B8A69E', '#8D776E', '#B29487', '#D9C2B5'
    ];

    const canvas = document.getElementById('graficoCategorias');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (chartCategorias) chartCategorias.destroy();
    chartCategorias = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{ data: valores, backgroundColor }]
      },
      options: { plugins: { legend: { display: false } } }
    });

    // Leyendas
    const contenedor = document.getElementById('leyendasCategorias');
    contenedor.innerHTML = "";
    const datosOrdenados = labels.map((label, i) => ({
      label,
      valor: valores[i],
      porcentaje: ((valores[i] / total) * 100).toFixed(1),
      color: backgroundColor[i]
    })).sort((a, b) => b.valor - a.valor);

    datosOrdenados.forEach(({ label, porcentaje, color }) => {
      const span = document.createElement("span");
      span.className = "inline-flex items-center gap-1 text-sm whitespace-nowrap";
      span.innerHTML = `<span style="color:${color}; font-size: 1.2rem;">●</span> <span>${label} (${porcentaje}%)</span>`;
      contenedor.appendChild(span);
    });

    // Tabla
    const cuerpoTabla = document.getElementById("tablaCategorias");
    cuerpoTabla.innerHTML = "";
    datosOrdenados.forEach(({ label, valor, porcentaje }) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td class="px-3 py-1 border dark:border-zinc-600">${label}</td>
        <td class="px-3 py-1 border text-center dark:border-zinc-600">${valor}</td>
        <td class="px-3 py-1 border text-center dark:border-zinc-600">${porcentaje}%</td>
      `;
      cuerpoTabla.appendChild(fila);
    });

  } catch (err) {
    console.error("Error al cargar gráfico de categorías:", err);
  }
}

// ----------------------
// GRUPO DE EDAD
// ----------------------
let chartEdad = null;

async function cargarGraficoPrestamosEdad() {
  try {
    const res = await fetch('/api/estadisticas/prestamos-edad');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return;

    const labels = data.map(d => d.grupo);
    const valores = data.map(d => d.promedio);
    const promedioGeneral = valores.reduce((a, b) => a + b, 0) / valores.length;

    const canvas = document.getElementById('graficoPrestamosEdad');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (chartEdad) chartEdad.destroy();
    chartEdad = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Promedio por Grupo',
            data: valores,
            backgroundColor: '#8B5E3C',
            borderRadius: 12,
            barPercentage: 0.6,
          },
          {
            label: 'Promedio General',
            data: Array(valores.length).fill(promedioGeneral),
            type: 'line',
            borderColor: '#A9795A',
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });

    // Tabla
    const tabla = document.getElementById("tablaEdad");
    tabla.innerHTML = "";
    data.forEach(({ grupo, promedio }) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td class="px-3 py-1 border dark:border-zinc-600">${grupo}</td>
        <td class="px-3 py-1 border text-center dark:border-zinc-600">${promedio.toFixed(1)}</td>
      `;
      tabla.appendChild(fila);
    });

  } catch (err) {
    console.error("Error cargando gráfico de edad:", err);
  }
}

// ----------------------
// COMPARATIVO ANUAL
// ----------------------
let chartAnual = null;
let datosTotales = [];
let todosLosAnios = [];

async function cargarGraficoPrestamosAnuales() {
  try {
    const res = await fetch('/api/estadisticas/prestamos-anuales');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return;

    datosTotales = data;
    todosLosAnios = [...new Set(data.map(d => d.anio))].sort((a, b) => a - b);
    const ultimos = todosLosAnios.slice(-2);

    console.log("📊 Comparando años:", ultimos);
    dibujarGraficoYTabla(ultimos);

  } catch (err) {
    console.error("Error al cargar datos:", err);
  }
}

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function dibujarGraficoYTabla(aniosSeleccionados) {
  const canvas = document.getElementById("graficoPrestamosAnuales");
  const ctx = canvas.getContext("2d");

  if (chartAnual) chartAnual.destroy();

  const series = aniosSeleccionados.map(anio => {
    const valores = meses.map(mes => {
      const entrada = datosTotales.find(d => d.anio === anio && d.mes === mes);
      return entrada ? entrada.total : 0;
    });

    return {
      label: `Año ${anio}`,
      data: valores,
      fill: false,
      tension: 0.3,
      borderWidth: 2
    };
  });

  chartAnual = new Chart(ctx, {
    type: 'line',
    data: {
      labels: meses,
      datasets: series
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });

  // Tabla
  const cabecera = document.getElementById("cabeceraAnuales");
  cabecera.innerHTML = `
    <tr>
      <th class="px-3 py-2 border dark:border-zinc-600">Mes</th>
      ${aniosSeleccionados.map(a => `<th class="px-3 py-2 border text-center dark:border-zinc-600">${a}</th>`).join("")}
    </tr>
  `;

  const cuerpo = document.getElementById("tablaPrestamosAnuales");
  cuerpo.innerHTML = "";
  meses.forEach((mes, i) => {
    const fila = document.createElement("tr");
    const celdas = aniosSeleccionados.map(anio => {
      const d = datosTotales.find(x => x.anio === anio && x.mes === mes);
      return `<td class="px-3 py-1 border text-center dark:border-zinc-600">${d ? d.total : 0}</td>`;
    });
    fila.innerHTML = `<td class="px-3 py-1 border dark:border-zinc-600">${mes}</td>${celdas.join("")}`;
    cuerpo.appendChild(fila);
  });
}

// ----------------------
// INICIALIZACIÓN ÚNICA
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  cargarGraficoCategorias();
  cargarGraficoPrestamosEdad();
  cargarGraficoPrestamosAnuales();
});