import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import CalculationInterface from "@/components/CalculationInterface";

interface CalculationType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  color: string;
}

const Index = () => {
  const [selectedCalculation, setSelectedCalculation] = useState<CalculationType | null>(null);

  const handleSelectCalculation = (calculationType: CalculationType) => {
    setSelectedCalculation(calculationType);
  };

  const handleBack = () => {
    setSelectedCalculation(null);
  };

  if (selectedCalculation) {
    return (
      <CalculationInterface 
        calculationType={selectedCalculation} 
        onBack={handleBack}
      />
    );
  }

  return <Dashboard onSelectCalculation={handleSelectCalculation} />;
};

export default Index;
