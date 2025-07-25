import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calculator, Download, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

// Sample calculation forms for different types
const getCalculationForm = (type: string) => {
  switch (type) {
    case "slope":
      return {
        fields: [
          { name: "rise", label: "Rise (vertical distance)", unit: "ft", type: "number" },
          { name: "run", label: "Run (horizontal distance)", unit: "ft", type: "number" },
          { name: "length", label: "Total Length (optional)", unit: "ft", type: "number", optional: true }
        ],
        description: "Calculate slope percentage, angle, and grade from rise and run measurements"
      };
    case "ph":
      return {
        fields: [
          { name: "concentration", label: "Concentration", unit: "M", type: "number" },
          { name: "volume", label: "Volume", unit: "L", type: "number" },
          { name: "temperature", label: "Temperature", unit: "°C", type: "number", optional: true }
        ],
        description: "Calculate pH, pOH, and hydrogen ion concentration"
      };
    case "head-pressure":
      return {
        fields: [
          { name: "height", label: "Height", unit: "ft", type: "number" },
          { name: "density", label: "Fluid Density", unit: "lb/ft³", type: "number" },
          { name: "gravity", label: "Gravitational Acceleration", unit: "ft/s²", type: "number", value: "32.2" }
        ],
        description: "Calculate hydrostatic pressure and head pressure in fluid systems"
      };
    case "electrical":
      return {
        fields: [
          { name: "voltage", label: "Voltage", unit: "V", type: "number" },
          { name: "current", label: "Current", unit: "A", type: "number" },
          { name: "resistance", label: "Resistance", unit: "Ω", type: "number", optional: true }
        ],
        description: "Calculate electrical properties using Ohm's law and power formulas"
      };
    default:
      return {
        fields: [
          { name: "value1", label: "Value 1", unit: "", type: "number" },
          { name: "value2", label: "Value 2", unit: "", type: "number" }
        ],
        description: "Enter your values for calculation"
      };
  }
};

export default function CalculationInterface({ calculationType, onBack }: CalculationInterfaceProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");
  const [workShown, setWorkShown] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const form = getCalculationForm(calculationType.id);
  const IconComponent = calculationType.icon;

  const handleInputChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const simulateAICalculation = async () => {
    setIsCalculating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample calculation based on type
    let calculationResult = "";
    let work = "";
    
    switch (calculationType.id) {
      case "slope":
        const rise = parseFloat(inputs.rise || "0");
        const run = parseFloat(inputs.run || "0");
        const slopePercent = run !== 0 ? (rise / run) * 100 : 0;
        const angle = Math.atan(rise / run) * (180 / Math.PI);
        
        calculationResult = `Slope: ${slopePercent.toFixed(2)}%\nAngle: ${angle.toFixed(2)}°`;
        work = `Given:
• Rise = ${rise} ft
• Run = ${run} ft

Calculations:
• Slope (%) = (Rise ÷ Run) × 100
• Slope (%) = (${rise} ÷ ${run}) × 100 = ${slopePercent.toFixed(2)}%

• Angle (θ) = arctan(Rise ÷ Run)
• Angle (θ) = arctan(${rise} ÷ ${run}) = ${angle.toFixed(2)}°`;
        break;
        
      case "ph":
        const concentration = parseFloat(inputs.concentration || "0");
        const ph = -Math.log10(concentration);
        
        calculationResult = `pH: ${ph.toFixed(2)}\npOH: ${(14 - ph).toFixed(2)}`;
        work = `Given:
• [H⁺] = ${concentration} M

Calculations:
• pH = -log₁₀[H⁺]
• pH = -log₁₀(${concentration}) = ${ph.toFixed(2)}

• pOH = 14 - pH
• pOH = 14 - ${ph.toFixed(2)} = ${(14 - ph).toFixed(2)}`;
        break;
        
      default:
        calculationResult = "Calculation completed successfully";
        work = "Sample calculation with step-by-step work shown here...";
    }
    
    setResult(calculationResult);
    setWorkShown(work);
    setIsCalculating(false);
  };

  const handleSave = () => {
    toast({
      title: "Calculation Saved",
      description: "Your calculation has been saved to your workspace.",
    });
  };

  const handleExport = () => {
    const exportData = `${calculationType.title}\n\n${result}\n\nWork Shown:\n${workShown}`;
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculationType.id}-calculation.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className={`p-3 rounded-lg bg-${calculationType.color}/10`}>
              <IconComponent className={`h-6 w-6 text-${calculationType.color}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{calculationType.title}</h1>
              <p className="text-muted-foreground">{form.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>
                Enter the values you have available. Required fields are marked with an asterisk.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label} {!field.optional && "*"}
                    {field.unit && <span className="text-muted-foreground ml-1">({field.unit})</span>}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    value={inputs[field.name] || field.value || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
              
              <Button 
                onClick={simulateAICalculation} 
                disabled={isCalculating}
                className="w-full mt-6"
              >
                <Calculator className="h-4 w-4 mr-2" />
                {isCalculating ? "Calculating..." : "Calculate with AI"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                AI-calculated results with step-by-step work shown
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Final Results */}
                  <div className="p-4 bg-engineering-success/10 rounded-lg border border-engineering-success/20">
                    <h3 className="font-semibold text-engineering-success mb-2">Final Results</h3>
                    <pre className="text-sm whitespace-pre-wrap">{result}</pre>
                  </div>

                  {/* Work Shown */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Work Shown</h3>
                    <Textarea
                      value={workShown}
                      readOnly
                      className="min-h-[200px] font-mono text-sm"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button onClick={handleSave} variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleExport} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your parameters and click "Calculate with AI" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}