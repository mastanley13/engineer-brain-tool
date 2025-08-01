import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { calculationsByCategory, type SpecificCalculation } from "@/data/calculationTypes";
import { 
  calculateSlope,
  calculateGradePercent,
  calculateSlopeAngle,
  calculateHorizontalDistance,
  calculateVerticalRise,
  calculateQuadraticEquation,
  calculateTrigonometric,
  calculatePercentError,
  calculateOhmsLaw,
  calculatePowerVI,
  calculateResistanceSeries
} from "@/lib/api";

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

  // Handle form submit for all calculations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      let response: any;
      
      switch (selectedCalc?.id) {
        case "slope-basic":
          const { rise = "", run = "" } = inputs;
          if (!rise || !run) {
            setError("Please enter both rise and run values");
            return;
          }
          response = await calculateSlope(parseFloat(rise), parseFloat(run));
          break;
          
        case "grade-percent":
          const { rise: gradeRise = "", run: gradeRun = "" } = inputs;
          if (!gradeRise || !gradeRun) {
            setError("Please enter both rise and run values");
            return;
          }
          response = await calculateGradePercent(parseFloat(gradeRise), parseFloat(gradeRun));
          break;
          
        case "slope-angle":
          const { rise: angleRise = "", run: angleRun = "" } = inputs;
          if (!angleRise || !angleRun) {
            setError("Please enter both rise and run values");
            return;
          }
          response = await calculateSlopeAngle(parseFloat(angleRise), parseFloat(angleRun));
          break;
          
        case "horizontal-distance":
          const { rise: hdRise = "", slope: hdSlope = "" } = inputs;
          if (!hdRise || !hdSlope) {
            setError("Please enter both rise and slope values");
            return;
          }
          response = await calculateHorizontalDistance(parseFloat(hdRise), parseFloat(hdSlope));
          break;
          
        case "vertical-rise":
          const { slope: vrSlope = "", run: vrRun = "" } = inputs;
          if (!vrSlope || !vrRun) {
            setError("Please enter both slope and run values");
            return;
          }
          response = await calculateVerticalRise(parseFloat(vrSlope), parseFloat(vrRun));
          break;
          
        case "quadratic-equation":
          const { a = "", b = "", c = "" } = inputs;
          if (!a || !b || !c) {
            setError("Please enter all coefficients (a, b, c)");
            return;
          }
          response = await calculateQuadraticEquation(parseFloat(a), parseFloat(b), parseFloat(c));
          break;
          
        case "trigonometric":
          const { angle = "", angle_unit = "degrees" } = inputs;
          if (!angle) {
            setError("Please enter an angle value");
            return;
          }
          response = await calculateTrigonometric(parseFloat(angle), angle_unit);
          break;
          
        case "percent-error":
          const { experimental_value = "", theoretical_value = "" } = inputs;
          if (!experimental_value || !theoretical_value) {
            setError("Please enter both experimental and theoretical values");
            return;
          }
          response = await calculatePercentError(parseFloat(experimental_value), parseFloat(theoretical_value));
          break;
          
        case "ohms-law":
          const { voltage = "", current = "", resistance = "" } = inputs;
          const providedValues = [voltage, current, resistance].filter(v => v !== "");
          if (providedValues.length !== 2) {
            setError("Please provide exactly 2 of the 3 values (voltage, current, resistance)");
            return;
          }
          response = await calculateOhmsLaw(
            voltage ? parseFloat(voltage) : undefined,
            current ? parseFloat(current) : undefined,
            resistance ? parseFloat(resistance) : undefined
          );
          break;
          
        case "power-vi":
          const { voltage: pVoltage = "", current: pCurrent = "", resistance: pResistance = "" } = inputs;
          const powerProvidedValues = [pVoltage, pCurrent, pResistance].filter(v => v !== "");
          if (powerProvidedValues.length < 2) {
            setError("Please provide at least 2 of the 3 values (voltage, current, resistance)");
            return;
          }
          response = await calculatePowerVI(
            pVoltage ? parseFloat(pVoltage) : undefined,
            pCurrent ? parseFloat(pCurrent) : undefined,
            pResistance ? parseFloat(pResistance) : undefined
          );
          break;
          
        case "resistance-series":
          const { resistances = "" } = inputs;
          if (!resistances) {
            setError("Please enter resistance values (comma-separated)");
            return;
          }
          try {
            const resistanceArray = resistances.split(',').map(r => parseFloat(r.trim())).filter(r => !isNaN(r));
            if (resistanceArray.length === 0) {
              setError("Please enter valid resistance values");
              return;
            }
            response = await calculateResistanceSeries(resistanceArray);
          } catch {
            setError("Invalid resistance values format. Use comma-separated numbers.");
            return;
          }
          break;
          
        default:
          setError("Calculation not implemented yet.");
          return;
      }
      
      if (response.success) {
        setResult({ ...response.data, workShown: response.workShown });
      } else {
        setError(response.error);
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

  // Dynamic result rendering based on calculation type
  const renderResults = (result: any, calcId?: string) => {
    switch (calcId) {
      case "slope-basic":
        return (
          <>
            <p><strong>Slope:</strong> {result.slope}</p>
            <p><strong>Angle:</strong> {result.angle}°</p>
          </>
        );
        
      case "grade-percent":
        return (
          <>
            <p><strong>Grade Percentage:</strong> {result.gradePercent}%</p>
            <p><strong>Slope:</strong> {result.slope}</p>
            <p><strong>Angle:</strong> {result.angle}°</p>
          </>
        );
        
      case "slope-angle":
        return (
          <>
            <p><strong>Angle (Degrees):</strong> {result.angleDegrees}°</p>
            <p><strong>Angle (Radians):</strong> {result.angleRadians} rad</p>
            <p><strong>Slope:</strong> {result.slope}</p>
            <p><strong>Grade:</strong> {result.gradePercent}%</p>
          </>
        );
        
      case "horizontal-distance":
        return (
          <>
            <p><strong>Horizontal Distance (Run):</strong> {result.run} units</p>
            <p><strong>Slope:</strong> {result.slope}</p>
            <p><strong>Grade:</strong> {result.gradePercent}%</p>
            <p><strong>Angle:</strong> {result.angle}°</p>
          </>
        );
        
      case "vertical-rise":
        return (
          <>
            <p><strong>Vertical Rise:</strong> {result.rise} units</p>
            <p><strong>Slope:</strong> {result.slope}</p>
            <p><strong>Grade:</strong> {result.gradePercent}%</p>
            <p><strong>Angle:</strong> {result.angle}°</p>
          </>
        );
        
      case "quadratic-equation":
        return (
          <>
            <p><strong>Discriminant:</strong> {result.discriminant}</p>
            <p><strong>Solution Type:</strong> {result.solutionType}</p>
            {result.hasRealSolutions ? (
              <>
                <p><strong>x₁:</strong> {result.x1}</p>
                <p><strong>x₂:</strong> {result.x2}</p>
              </>
            ) : (
              <p><strong>Solutions:</strong> {result.message}</p>
            )}
          </>
        );
        
      case "trigonometric":
        return (
          <>
            <p><strong>Angle:</strong> {result.angleDegrees}° ({result.angleRadians} rad)</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p><strong>sin:</strong> {result.sin}</p>
                <p><strong>cos:</strong> {result.cos}</p>
                <p><strong>tan:</strong> {result.tan}</p>
              </div>
              <div>
                <p><strong>csc:</strong> {result.csc || 'undefined'}</p>
                <p><strong>sec:</strong> {result.sec || 'undefined'}</p>
                <p><strong>cot:</strong> {result.cot || 'undefined'}</p>
              </div>
            </div>
          </>
        );
        
      case "percent-error":
        return (
          <>
            <p><strong>Percent Error:</strong> {result.percentError}%</p>
            <p><strong>Absolute Error:</strong> {result.absoluteError}</p>
            <p><strong>Relative Error:</strong> {result.relativeError}</p>
            <p><strong>Experimental:</strong> {result.experimentalValue}</p>
            <p><strong>Theoretical:</strong> {result.theoreticalValue}</p>
          </>
        );
        
      case "ohms-law":
        return (
          <>
            <p><strong>Voltage:</strong> {result.voltage} V</p>
            <p><strong>Current:</strong> {result.current} A</p>
            <p><strong>Resistance:</strong> {result.resistance} Ω</p>
            <p><strong>Power:</strong> {result.power} W</p>
          </>
        );
        
      case "power-vi":
        return (
          <>
            <p><strong>Power:</strong> {result.power} W</p>
            <p><strong>Method:</strong> {result.method}</p>
            {result.voltage && <p><strong>Voltage:</strong> {result.voltage} V</p>}
            {result.current && <p><strong>Current:</strong> {result.current} A</p>}
            {result.resistance && <p><strong>Resistance:</strong> {result.resistance} Ω</p>}
          </>
        );
        
      case "resistance-series":
        return (
          <>
            <p><strong>Total Resistance:</strong> {result.totalResistance} Ω</p>
            <p><strong>Number of Resistors:</strong> {result.count}</p>
            <p><strong>Individual Resistors:</strong> {result.individualResistances.join(', ')} Ω</p>
            <p><strong>Min/Max:</strong> {result.minResistance} / {result.maxResistance} Ω</p>
            <p><strong>Average:</strong> {result.averageResistance} Ω</p>
          </>
        );
        
      default:
        // Generic display for any result object
        return (
          <div className="space-y-1">
            {Object.entries(result).filter(([key]) => key !== 'workShown').map(([key, value]) => (
              <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}</p>
            ))}
          </div>
        );
    }
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
              {selectedCalc.variables.map((variable) => {
                // Special handling for different input types
                if (variable === 'angle_unit') {
                  return (
                    <div key={variable}>
                      <label className="block mb-1 font-medium capitalize" htmlFor={variable}>Angle Unit</label>
                      <select
                        id={variable}
                        name={variable}
                        value={inputs[variable] || "degrees"}
                        onChange={(e) => setInputs(prev => ({ ...prev, [variable]: e.target.value }))}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                      >
                        <option value="degrees">Degrees</option>
                        <option value="radians">Radians</option>
                      </select>
                    </div>
                  );
                }
                
                if (variable === 'resistances') {
                  return (
                    <div key={variable}>
                      <label className="block mb-1 font-medium" htmlFor={variable}>Resistances (comma-separated)</label>
                      <input
                        id={variable}
                        name={variable}
                        type="text"
                        placeholder="10, 20, 30"
                        value={inputs[variable] || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">Enter resistance values separated by commas</p>
                    </div>
                  );
                }
                
                return (
                  <div key={variable}>
                    <label className="block mb-1 font-medium capitalize" htmlFor={variable}>
                      {variable.replace(/_/g, ' ')}
                    </label>
                    <input
                      id={variable}
                      name={variable}
                      type="number"
                      step="any"
                      value={inputs[variable] || ""}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                      required={!['voltage', 'current', 'resistance'].includes(variable) || 
                        (selectedCalc?.id !== 'ohms-law' && selectedCalc?.id !== 'power-vi')}
                    />
                  </div>
                );
              })}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Calculating..." : "Calculate"}
              </Button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {result && (
              <div className="mt-6 bg-muted/30 rounded p-4">
                <h3 className="font-semibold mb-2">Results:</h3>
                {/* Dynamic result display based on calculation type */}
                {renderResults(result, selectedCalc?.id)}
                {result.workShown && (
                  <div className="mt-3">
                    <h4 className="font-medium mb-1">Work Shown:</h4>
                    <pre className="bg-muted/50 rounded p-2 text-sm whitespace-pre-wrap">{result.workShown}</pre>
                  </div>
                )}
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