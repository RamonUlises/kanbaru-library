import { BarChart3, PieChart, TrendingUp } from "lucide-react"

export const variables = {
  prestamos: {
    label: "Préstamos",
    options: [
      { value: "cantidad_prestamos", label: "Cantidad de préstamos" },
      { value: "prestamos_pendientes", label: "Préstamos pendientes vs devueltos" },
      { value: "prestamos_por_mes", label: "Préstamos por mes" },
    ],
  },
  usuarios: {
    label: "Usuarios",
    options: [
      { value: "edad_usuarios", label: "Edad de usuarios" },
      { value: "sexo_usuarios", label: "Sexo de usuarios" },
      { value: "tipo_usuarios", label: "Tipo de usuarios" },
    ],
  },
  libros: {
    label: "Libros",
    options: [
      { value: "categoria_libros", label: "Categoría de libros" },
      { value: "libros_mas_prestados", label: "Libros más prestados" },
    ],
  }
}

export const variablesTiempo = {
  tiempo: {
    label: "Tiempo",
    options: [
      { value: "ultimo_mes", label: "Último mes" },
      { value: "ultimo_trimestre", label: "Último trimestre" },
      { value: "ultimo_año", label: "Último año" },
      { value: "por_meses", label: "Por meses" },
    ],
  },
}

export const chartTypes = [
  { value: "bar", label: "Gráfico de Barras", icon: BarChart3 },
  { value: "pie", label: "Gráfico de Pastel", icon: PieChart },
  { value: "line", label: "Gráfico de Líneas", icon: TrendingUp },
]
