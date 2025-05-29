"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Loader2, TrendingUp, Users, BookOpen, Calendar } from "lucide-react"

interface ChartRendererProps {
  variable1: string
  variable2?: string
  chartType: string
  timeFilter?: string
}

// Datos de ejemplo basados en la estructura de la BD
const generateMockData = (variable1: string, variable2?: string, timeFilter?: string) => {
  const dataMap: Record<string, any> = {
    cantidad_prestamos: {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
      data: [45, 52, 38, 67, 73, 59],
      backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
    },
    edad_usuarios: {
      labels: ["18-25", "26-35", "36-45", "46-55", "56+"],
      data: [120, 89, 67, 45, 23],
      backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"],
    },
    categoria_libros: {
      labels: ["Ficción", "Ciencia", "Historia", "Biografías", "Tecnología", "Arte"],
      data: [234, 156, 98, 87, 145, 76],
      backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
    },
    libros_mas_prestados: {
      labels: ["El Quijote", "Cien Años de Soledad", "Harry Potter", "El Principito", "1984"],
      data: [89, 76, 145, 67, 98],
      backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"],
    },
    sexo_usuarios: {
      labels: ["Femenino", "Masculino", "Otro"],
      data: [156, 134, 12],
      backgroundColor: ["#8B5CF6", "#3B82F6", "#10B981"],
    },
    prestamos_por_mes: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      data: [45, 52, 38, 67, 73, 59, 84, 91, 76, 68, 55, 49],
      backgroundColor: "#3B82F6",
    },
    prestamos_pendientes: {
      labels: ["Pendientes", "Devueltos"],
      data: [45, 155],
      backgroundColor: ["#EF4444", "#10B981"],
    },
    tipo_usuarios: {
      labels: ["Estudiante", "Profesor", "Investigador", "Público General"],
      data: [89, 45, 23, 67],
      backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"],
    },
  }

  return (
    dataMap[variable1] || {
      labels: ["Sin datos"],
      data: [0],
      backgroundColor: ["#94A3B8"],
    }
  )
}

export default function ChartRenderer({ variable1, variable2, chartType, timeFilter }: ChartRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadChartJS = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simular carga de datos
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (!isMounted) return

        const mockData = generateMockData(variable1, variable2, timeFilter)
        setChartData(mockData)

        // Cargar Chart.js desde CDN
        if (!window.Chart) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script")
            script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        if (!isMounted) return

        if (canvasRef.current && window.Chart) {
          const ctx = canvasRef.current.getContext("2d")

          // Destruir gráfico anterior si existe
          if (chartRef.current) {
            chartRef.current.destroy()
          }

          if (ctx) {
            const config = {
              type: chartType,
              data: {
                labels: mockData.labels,
                datasets: [
                  {
                    label: getVariableLabel(variable1),
                    data: mockData.data,
                    backgroundColor:
                      chartType === "line"
                        ? "rgba(59, 130, 246, 0.1)"
                        : Array.isArray(mockData.backgroundColor)
                          ? mockData.backgroundColor
                          : [mockData.backgroundColor],
                    borderColor: chartType === "line" ? "#3B82F6" : undefined,
                    borderWidth: chartType === "line" ? 3 : 1,
                    fill: chartType === "line",
                    tension: chartType === "line" ? 0.4 : undefined,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: chartType === "pie",
                    position: "bottom",
                  },
                  tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "white",
                    bodyColor: "white",
                    borderColor: "#3B82F6",
                    borderWidth: 1,
                  },
                },
                scales:
                  chartType !== "pie"
                    ? {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: "rgba(0, 0, 0, 0.1)",
                          },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                      }
                    : undefined,
              },
            }

            chartRef.current = new window.Chart(ctx, config)
          }
        }

        if (isMounted) {
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Error loading chart:", err)
        if (isMounted) {
          setError("Error al cargar el gráfico")
          setIsLoading(false)
        }
      }
    }

    loadChartJS()

    return () => {
      isMounted = false
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [variable1, variable2, chartType, timeFilter])

  const getVariableLabel = (variable: string) => {
    const labels: Record<string, string> = {
      cantidad_prestamos: "Cantidad de Préstamos",
      edad_usuarios: "Usuarios por Edad",
      categoria_libros: "Libros por Categoría",
      libros_mas_prestados: "Libros Más Prestados",
      sexo_usuarios: "Usuarios por Sexo",
      prestamos_por_mes: "Préstamos Mensuales",
      prestamos_pendientes: "Estado de Préstamos",
      tipo_usuarios: "Tipos de Usuarios",
    }
    return labels[variable] || variable
  }

  const getVariableIcon = (variable: string) => {
    if (variable.includes("prestamos")) return <BookOpen className="h-4 w-4" />
    if (variable.includes("usuarios")) return <Users className="h-4 w-4" />
    if (variable.includes("mes") || variable.includes("tiempo")) return <Calendar className="h-4 w-4" />
    return <TrendingUp className="h-4 w-4" />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg">⚠️</div>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-slate-500">Intenta recargar la página</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-600">Generando gráfico...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Información del gráfico */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          {getVariableIcon(variable1)}
          {getVariableLabel(variable1)}
        </Badge>
        {variable2 && (
          <Badge variant="outline" className="flex items-center gap-1">
            {getVariableIcon(variable2)}
            Agrupado por: {getVariableLabel(variable2)}
          </Badge>
        )}
        {timeFilter && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {timeFilter.replace("_", " ")}
          </Badge>
        )}
      </div>

      {/* Gráfico */}
      <div className="relative h-96 w-full bg-white rounded-lg border p-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Estadísticas rápidas */}
      {chartData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {chartData.data.reduce((a: number, b: number) => a + b, 0)}
            </div>
            <div className="text-sm text-slate-600">Total</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{Math.max(...chartData.data)}</div>
            <div className="text-sm text-slate-600">Máximo</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(chartData.data.reduce((a: number, b: number) => a + b, 0) / chartData.data.length)}
            </div>
            <div className="text-sm text-slate-600">Promedio</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{chartData.labels.length}</div>
            <div className="text-sm text-slate-600">Categorías</div>
          </Card>
        </div>
      )}
    </div>
  )
}

// Declaración global para TypeScript
declare global {
  interface Window {
    Chart: any
  }
}
