import { Calculator, Beaker, Ruler, Droplet, Zap, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CalculationType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  color: string;
}

const calculationTypes: CalculationType[] = [
  {
    id: "slope",
    title: "Slope Calculations",
    description: "Calculate slopes, grades, and angular measurements",
    icon: Ruler,
    category: "Civil Engineering",
    color: "engineering-blue"
  },
  {
    id: "ph",
    title: "pH & Chemical Balance",
    description: "pH calculations, buffer solutions, and titrations",
    icon: Beaker,
    category: "Chemical Engineering",
    color: "engineering-success"
  },
  {
    id: "head-pressure",
    title: "Head Pressure",
    description: "Fluid head calculations and pressure analysis",
    icon: Droplet,
    category: "Fluid Dynamics",
    color: "accent"
  },
  {
    id: "electrical",
    title: "Electrical Calculations",
    description: "Voltage, current, resistance, and power calculations",
    icon: Zap,
    category: "Electrical Engineering",
    color: "engineering-warning"
  },
  {
    id: "structural",
    title: "Structural Analysis",
    description: "Load calculations, beam analysis, and stress calculations",
    icon: Wrench,
    category: "Structural Engineering",
    color: "primary"
  },
  {
    id: "general",
    title: "General Calculations",
    description: "Unit conversions, basic math, and custom formulas",
    icon: Calculator,
    category: "General",
    color: "engineering-gray"
  }
];

interface DashboardProps {
  onSelectCalculation: (calculationType: CalculationType) => void;
}

export default function Dashboard({ onSelectCalculation }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Engineering Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Select a calculation type to get started with AI-powered engineering calculations
          </p>
        </div>

        {/* Calculation Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculationTypes.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Card 
                key={calc.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gradient-to-br from-card to-secondary/20"
                onClick={() => onSelectCalculation(calc)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${calc.color}/10 group-hover:bg-${calc.color}/20 transition-colors`}>
                      <IconComponent className={`h-6 w-6 text-${calc.color}`} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{calc.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {calc.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Start Calculation
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">AI-Powered Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Get accurate results with step-by-step work shown for verification
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-engineering-success/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Beaker className="h-6 w-6 text-engineering-success" />
            </div>
            <h3 className="font-semibold mb-2">Multiple Disciplines</h3>
            <p className="text-sm text-muted-foreground">
              Covers civil, chemical, electrical, and structural engineering
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Save & Print</h3>
            <p className="text-sm text-muted-foreground">
              Export your calculations with equations and work shown
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}