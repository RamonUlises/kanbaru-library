import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Loader2, TrendingUp, Users, BookOpen, Calendar } from "lucide-react";

interface ChartRendererProps {
  variable1: string;
  chartType: any;
  timeFilter?: string;
}

const generateMockData = async (variable1: string, timeFilter?: string) => {
  console.log(variable1);
  try {
    const response = await fetch(`/api/graficas/${variable1}`);
    const data = await response.json();

    console.log(data);

    const backgroundColor = ["#A0826F", "#937263", "#7B5E53", "#654E47"];

    if (response.status !== 200) {
      return {
        labels: ["Sin datos"],
        data: [0],
        backgroundColor: ["#7B5E53"],
      };
    }

    return {
      labels: data.labels,
      data: data.data,
      backgroundColor,
    };
  } catch {
    return {
      labels: ["Sin datos"],
      data: [0],
      backgroundColor: ["#7B5E53"],
    };
  }
};

export default function ChartRenderer({
  variable1,
  chartType,
  timeFilter,
}: ChartRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!isMounted) return;

        const mockData = await generateMockData(variable1, timeFilter);
        setChartData(mockData);

        setIsLoading(false);
      } catch (e) {
        console.error(e);
        if (isMounted) {
          setError("Error al generar el gráfico");
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [variable1, timeFilter]);

  useEffect(() => {
    if (!canvasRef.current || !chartData) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: getVariableLabel(variable1),
            data: chartData.data,
            backgroundColor:
              chartType === "line"
                ? "rgba(59, 130, 246, 0.1)"
                : Array.isArray(chartData.backgroundColor)
                  ? chartData.backgroundColor
                  : [chartData.backgroundColor],
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
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [chartData, chartType, variable1]);

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
    };
    return labels[variable] || variable;
  };

  const getVariableIcon = (variable: string) => {
    if (variable.includes("prestamos")) return <BookOpen className="h-4 w-4" />;
    if (variable.includes("usuarios")) return <Users className="h-4 w-4" />;
    if (variable.includes("mes") || variable.includes("tiempo"))
      return <Calendar className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg">⚠️</div>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-slate-500">Intenta recargar la página</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-600">Generando gráfico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          {getVariableIcon(variable1)}
          {getVariableLabel(variable1)}
        </Badge>
        {timeFilter && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {timeFilter.replace("_", " ")}
          </Badge>
        )}
      </div>

      <div className="relative h-96 w-full bg-white rounded-lg border p-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {chartData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-principal-600 dark:text-slate-200">
              {chartData.data.reduce((a: number, b: number) => a + b, 0)}
            </div>
            <div className="text-sm text-slate-600">Total</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-principal-600 dark:text-slate-200">
              {Math.max(...chartData.data)}
            </div>
            <div className="text-sm text-slate-600">Máximo</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-principal-600 dark:text-slate-200">
              {Math.round(
                chartData.data.reduce((a: number, b: number) => a + b, 0) /
                  chartData.data.length,
              )}
            </div>
            <div className="text-sm text-slate-600">Promedio</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-principal-600 dark:text-slate-200">
              {chartData.labels.length}
            </div>
            <div className="text-sm text-slate-600">Categorías</div>
          </Card>
        </div>
      )}
    </div>
  );
}
