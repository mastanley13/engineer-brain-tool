import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { calculationsByCategory, type SpecificCalculation } from "@/data/calculationTypes";

interface CalculationType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  color: string;
}

interface CalculationInterfaceProps {
  calculationType: CalculationType;
  onBack: () => void;
  onSelectSpecificCalculation?: (calculation: SpecificCalculation) => void;
}

export default function CalculationInterface({ calculationType, onBack, onSelectSpecificCalculation }: CalculationInterfaceProps) {
  const IconComponent = calculationType.icon;
  const specificCalculations = calculationsByCategory[calculationType.id as keyof typeof calculationsByCategory] || [];

  // New: Track selected specific calculation
  const [selectedCalc, setSelectedCalc] = useState<SpecificCalculation | null>(null);
  // New: Track form state and result
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculationClick = (calculation: SpecificCalculation) => {
    setSelectedCalc(calculation);
    setInputs({});
    setResult(null);
    setError(null);
  };

  // New: Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // New: Handle form submit for slope calculation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Only handle slope-basic for now
      if (selectedCalc?.id === "slope-basic") {
        const { rise = "", run = "" } = inputs;
        const res = await fetch(
          `https://engineering-calc-api.vercel.app/api/slope?rise=${encodeURIComponent(rise)}&run=${encodeURIComponent(run)}`
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setResult(data);
      } else {
        setError("Calculation not implemented yet.");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // New: Back to list of specific calculations
  const handleBackToList = () => {
    setSelectedCalc(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={selectedCalc ? handleBackToList : onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {selectedCalc ? "Back to Calculations" : "Back to Dashboard"}
          </Button>
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-lg bg-${calculationType.color}/10`}>
              <IconComponent className={`h-6 w-6 text-${calculationType.color}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{calculationType.title}</h1>
              <p className="text-lg text-muted-foreground">{calculationType.description}</p>
            </div>
          </div>
        </div>

        {/* If a specific calculation is selected, show its form */}
        {selectedCalc ? (
          <div className="max-w-md mx-auto bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-2">{selectedCalc.title}</h2>
            {selectedCalc.formula && (
              <div className="text-sm font-mono bg-muted/50 px-2 py-1 rounded mb-2 text-center">
                {selectedCalc.formula}
              </div>
            )}
            <p className="mb-4 text-muted-foreground">{selectedCalc.description}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedCalc.variables.map((variable) => (
                <div key={variable}>
                  <label className="block mb-1 font-medium capitalize" htmlFor={variable}>{variable.replace(/_/g, ' ')}</label>
                  <input
                    id={variable}
                    name={variable}
                    type="number"
                    step="any"
                    value={inputs[variable] || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    required
                  />
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Calculating..." : "Calculate"}
              </Button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {result && (
              <div className="mt-6 bg-muted/30 rounded p-4">
                <p><strong>Slope:</strong> {result.slope}%</p>
                <p><strong>Angle:</strong> {result.angle}°</p>
                <pre className="bg-muted/50 rounded p-2 mt-2 whitespace-pre-wrap">{result.workShown}</pre>
              </div>
            )}
          </div>
        ) : (
          // Otherwise, show the grid of specific calculations
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specificCalculations.map((calculation) => (
              <Card 
                key={calculation.id}
                className="hover:shadow-md transition-all duration-200 cursor-pointer group bg-gradient-to-br from-card to-secondary/10"
                onClick={() => handleCalculationClick(calculation)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight">{calculation.title}</CardTitle>
                  {calculation.formula && (
                    <div className="text-sm font-mono bg-muted/50 px-2 py-1 rounded text-center">
                      {calculation.formula}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-3">
                    {calculation.description}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground mb-3">
                    <strong>Variables:</strong> {calculation.variables.join(", ")}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Calculator className="h-3 w-3 mr-2" />
                    Calculate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!selectedCalc && specificCalculations.length === 0 && (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No calculations available</h3>
            <p className="text-muted-foreground">
              Calculations for this category are being developed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}