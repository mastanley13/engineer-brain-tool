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
  
  // Get specific calculations for this category
  const specificCalculations = calculationsByCategory[calculationType.id as keyof typeof calculationsByCategory] || [];

  const handleCalculationClick = (calculation: SpecificCalculation) => {
    if (onSelectSpecificCalculation) {
      onSelectSpecificCalculation(calculation);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
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

        {/* Calculations Grid */}
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

        {/* Empty State */}
        {specificCalculations.length === 0 && (
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