document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Script cargado");

  const canvas = document.getElementById("graficoSexo");
  if (!canvas) {
    console.warn("⚠️ Canvas no encontrado");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.warn("⚠️ No se pudo obtener el contexto del canvas");
    return;
  }

  try {
    const response = await fetch("/api/books/countsex");
    const data = await response.json();
    console.log("📊 Datos recibidos:", data);

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((d) => d.sexo),
        datasets: [{
          label: "Usuarios",
          data: data.map((d) => d.cantidad),
          backgroundColor: ["#7B5E53", "#EFEBE5"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });

    console.log("✅ Gráfico generado correctamente");
  } catch (err) {
    console.error("Error al generar el gráfico:", err);
  }
});
