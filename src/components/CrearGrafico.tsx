"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Separator } from "@/components/ui/Separator"
import { Database, Filter } from "lucide-react"
import ChartRenderer from "./ChartRenderer"
import { chartTypes, variables, variablesTiempo } from "@/utils/variablesGraficas"

export default function DynamicCharts() {
  const [selectedVariable1, setSelectedVariable1] = useState("")
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
    setSelectedChartType("")
    setTimeFilter("")
    setShowChart(false)
  }

  return (
    <div className="p-4 z-99999 w-full md:mt-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="md:text-4xl font-bold text-slate-800 flex items-center justify-center gap-2 dark:text-slate-200">
            <Database className="h-8 w-8 text-principal-600 dark:text-slate-200" />
            Dashboard de Estadísticas
          </h1>
          <p className="text-slate-600 md:text-lg dark:text-slate-200">
            Genera gráficos dinámicos seleccionando variables de tu base de datos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur p-0 dark:bg-zinc-800">
              <CardHeader className="bg-gradient-to-r from-principal-600 to-principal-400 text-white rounded-t-lg pt-4 dark:from-zinc-700 dark:to-zinc-800">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Configuración del Gráfico
                </CardTitle>
                <CardDescription className="text-blue-100 dark:text-slate-200">Selecciona las variables y tipo de gráfico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="variable1" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Variable Principal
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

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tipo de Gráfico</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="timeFilter" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Filtro de Tiempo
                  </Label>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona período de tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      {variablesTiempo.tiempo.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    onClick={handleGenerateChart}
                    disabled={!selectedVariable1 || !selectedChartType}
                    className="w-full bg-gradient-to-r from-principal-600 to-principal-400 hover:from-principal-700 hover:to-principal-800 transition-colors duration-300 cursor-pointer dark:from-zinc-700 dark:to-zinc-800 dark:text-slate-200 dark:hover:from-zinc-800 dark:hover:to-zinc-700"
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur dark:bg-zinc-800">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-200">
                  {showChart ? "Gráfico Generado" : "Vista Previa del Gráfico"}
                </CardTitle>
                <CardDescription>
                  {showChart
                    ? `${selectedVariable1}${timeFilter ? ` - ${timeFilter}` : ""}`
                    : "Selecciona las variables y tipo de gráfico para generar la visualización"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {showChart ? (
                  <ChartRenderer
                    variable1={selectedVariable1}
                    chartType={selectedChartType}
                    timeFilter={timeFilter}
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 dark:bg-zinc-700">
                    <div className="text-center space-y-2 p-2">
                      <Database className="h-12 w-12 text-slate-400 mx-auto dark:text-slate-200" />
                      <p className="text-slate-500 font-medium dark:text-slate-200">Configura las opciones para generar tu gráfico</p>
                      <p className="text-sm text-slate-400 dark:text-slate-200">
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
