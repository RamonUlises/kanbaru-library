"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Separator } from "@/components/ui/Separator"
import { Database, Filter } from "lucide-react"
import ChartRenderer from "./ChartRenderer"
import { chartTypes, variables } from "@/utils/variablesGraficas"

export default function DynamicCharts() {
  const [selectedVariable1, setSelectedVariable1] = useState("")
  const [selectedVariable2, setSelectedVariable2] = useState("")
  const [selectedChartType, setSelectedChartType] = useState("")
  const [timeFilter, setTimeFilter] = useState("")
  const [showChart, setShowChart] = useState(false)

  const handleGenerateChart = () => {
    if (selectedVariable1 && selectedChartType) {
      setShowChart(true)
    }
  }

  const resetForm = () => {
    setSelectedVariable1("")
    setSelectedVariable2("")
    setSelectedChartType("")
    setTimeFilter("")
    setShowChart(false)
  }

  return (
    <div className="p-4 z-99999 w-full md:mt-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <Database className="h-8 w-8 text-principal-600" />
            Dashboard de Estadísticas
          </h1>
          <p className="text-slate-600 text-lg">
            Genera gráficos dinámicos seleccionando variables de tu base de datos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Configuración */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur p-0">
              <CardHeader className="bg-gradient-to-r from-principal-600 to-principal-400 text-white rounded-t-lg pt-4">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Configuración del Gráfico
                </CardTitle>
                <CardDescription className="text-blue-100">Selecciona las variables y tipo de gráfico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Variable Principal */}
                <div className="space-y-2">
                  <Label htmlFor="variable1" className="text-sm font-semibold text-slate-700">
                    Variable Principal (Eje X)
                  </Label>
                  <Select value={selectedVariable1} onValueChange={setSelectedVariable1}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona la variable principal" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(variables).map(([category, data]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs font-semibold text-slate-500 uppercase">{data.label}</div>
                          {data.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Variable Secundaria */}
                <div className="space-y-2">
                  <Label htmlFor="variable2" className="text-sm font-semibold text-slate-700">
                    Variable Secundaria (Opcional)
                  </Label>
                  <Select value={selectedVariable2} onValueChange={setSelectedVariable2}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona variable para agrupar" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(variables).map(([category, data]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs font-semibold text-slate-500 uppercase">{data.label}</div>
                          {data.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Tipo de Gráfico */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">Tipo de Gráfico</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {chartTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <Button
                          key={type.value}
                          variant={selectedChartType === type.value ? "default" : "outline"}
                          className="justify-start h-auto p-3"
                          onClick={() => setSelectedChartType(type.value)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                {/* Filtro de Tiempo */}
                <div className="space-y-2">
                  <Label htmlFor="timeFilter" className="text-sm font-semibold text-slate-700">
                    Filtro de Tiempo
                  </Label>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona período de tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      {variables.tiempo.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Botones de Acción */}
                <div className="space-y-2">
                  <Button
                    onClick={handleGenerateChart}
                    disabled={!selectedVariable1 || !selectedChartType}
                    className="w-full bg-gradient-to-r from-principal-600 to-principal-400 hover:from-principal-700 hover:to-principal-800 transition-colors duration-300 cursor-pointer"
                  >
                    Generar Gráfico
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="w-full cursor-pointer">
                    Limpiar Selección
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel del Gráfico */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-slate-800">
                  {showChart ? "Gráfico Generado" : "Vista Previa del Gráfico"}
                </CardTitle>
                <CardDescription>
                  {showChart
                    ? `${selectedVariable1}${selectedVariable2 ? ` agrupado por ${selectedVariable2}` : ""}${timeFilter ? ` - ${timeFilter}` : ""}`
                    : "Selecciona las variables y tipo de gráfico para generar la visualización"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {showChart ? (
                  <ChartRenderer
                    variable1={selectedVariable1}
                    variable2={selectedVariable2}
                    chartType={selectedChartType}
                    timeFilter={timeFilter}
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                    <div className="text-center space-y-2">
                      <Database className="h-12 w-12 text-slate-400 mx-auto" />
                      <p className="text-slate-500 font-medium">Configura las opciones para generar tu gráfico</p>
                      <p className="text-sm text-slate-400">
                        Selecciona al menos una variable principal y un tipo de gráfico
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
