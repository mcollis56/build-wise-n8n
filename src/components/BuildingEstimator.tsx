import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calculator, Building2, MapPin, Hammer, Droplets, Zap } from 'lucide-react';

interface ProjectData {
  projectType: string;
  location: string;
  selectedTrades: string[];
  materials: Record<string, any>;
}

const BuildingEstimator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectType: '',
    location: 'Northern Beaches',
    selectedTrades: [],
    materials: {}
  });

  const steps = [
    { id: 1, title: 'Project Type', description: 'Define your construction project' },
    { id: 2, title: 'Trade Selection', description: 'Choose required trades' },
    { id: 3, title: 'Materials', description: 'Select materials and quality' },
    { id: 4, title: 'Estimate', description: 'Review cost breakdown' }
  ];

  const projectTypes = [
    { id: 'new-construction', title: 'New Construction', description: 'Ground-up construction projects', icon: Building2 },
    { id: 'renovation', title: 'Renovation', description: 'Interior and exterior renovations', icon: Calculator },
    { id: 'extension', title: 'Extension', description: 'Home additions and extensions', icon: MapPin }
  ];

  const availableTrades = [
    { id: 'builder', name: 'Builder/Project Manager', icon: Building2, essential: true },
    { id: 'plumber', name: 'Plumber', icon: Droplets, essential: true },
    { id: 'electrician', name: 'Electrician', icon: Zap, essential: true },
    { id: 'carpenter', name: 'Carpenter/Joiner', icon: Hammer, essential: false }
  ];

  const handleProjectTypeSelect = (type: string) => {
    setProjectData(prev => ({ ...prev, projectType: type }));
    setCurrentStep(2);
  };

  const handleTradeToggle = (tradeId: string) => {
    const newTrades = projectData.selectedTrades.includes(tradeId)
      ? projectData.selectedTrades.filter(id => id !== tradeId)
      : [...projectData.selectedTrades, tradeId];
    
    setProjectData(prev => ({ ...prev, selectedTrades: newTrades }));
  };

  const calculateEstimate = () => {
    const basePrices = {
      builder: 45000,
      plumber: 15000,
      electrician: 12000,
      carpenter: 25000
    };

    let total = 0;
    projectData.selectedTrades.forEach(trade => {
      total += basePrices[trade as keyof typeof basePrices] || 0;
    });

    return total * 1.18; // Northern Beaches premium
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              N8N Building Estimator
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Professional construction cost estimation for Northern Beaches projects
            </p>
            <div className="flex items-center justify-center mt-6 space-x-2 text-primary-foreground/80">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Northern Beaches, NSW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
            </h2>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <Card className="construction-card mb-8">
              <CardHeader className="text-center">
                <CardTitle className="construction-heading">Select Your Project Type</CardTitle>
                <CardDescription className="text-base">
                  Choose the type of construction project you're planning in the Northern Beaches area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {projectTypes.map((type) => (
                    <Card
                      key={type.id}
                      className="trade-card cursor-pointer"
                      onClick={() => handleProjectTypeSelect(type.id)}
                    >
                      <CardHeader className="text-center">
                        <type.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <CardTitle className="trade-title">{type.title}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <Card className="construction-card">
              <CardHeader>
                <CardTitle className="construction-heading">Select Required Trades</CardTitle>
                <CardDescription>
                  Choose the trades and specialists needed for your {projectData.projectType.replace('-', ' ')} project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {availableTrades.map((trade) => (
                    <Card
                      key={trade.id}
                      className={`trade-card cursor-pointer ${
                        projectData.selectedTrades.includes(trade.id)
                          ? 'ring-2 ring-primary border-primary bg-primary/5'
                          : ''
                      }`}
                      onClick={() => handleTradeToggle(trade.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <trade.icon className="w-8 h-8 text-primary" />
                          <input
                            type="checkbox"
                            checked={projectData.selectedTrades.includes(trade.id)}
                            onChange={() => handleTradeToggle(trade.id)}
                            className="pointer-events-none"
                          />
                        </div>
                        <CardTitle className="trade-title">{trade.name}</CardTitle>
                        {trade.essential && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                            Essential
                          </span>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back to Project Type
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={projectData.selectedTrades.length === 0}
                    className="gradient-primary"
                  >
                    Continue to Materials
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <Card className="construction-card">
              <CardHeader>
                <CardTitle className="construction-heading">Material Selection</CardTitle>
                <CardDescription>
                  Material selection interface coming soon - premium materials available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-6">
                    Comprehensive material database with Northern Beaches suppliers under development
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back to Trade Selection
                    </Button>
                    <Button onClick={() => setCurrentStep(4)} className="gradient-primary">
                      Continue to Estimate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto">
            <Card className="construction-card">
              <CardHeader>
                <CardTitle className="construction-heading">Project Cost Estimate</CardTitle>
                <CardDescription>
                  Professional estimate for your Northern Beaches construction project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-card p-8 rounded-lg text-center">
                  <div className="text-4xl font-bold text-accent mb-4">
                    ${calculateEstimate().toLocaleString('en-AU')}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Estimated total cost including Northern Beaches premium
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-background/50 p-4 rounded">
                      <h4 className="font-semibold mb-2">Selected Trades</h4>
                      <ul className="text-sm space-y-1">
                        {projectData.selectedTrades.map(tradeId => {
                          const trade = availableTrades.find(t => t.id === tradeId);
                          return trade ? (
                            <li key={tradeId} className="flex items-center space-x-2">
                              <trade.icon className="w-4 h-4" />
                              <span>{trade.name}</span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                    <div className="bg-background/50 p-4 rounded">
                      <h4 className="font-semibold mb-2">Project Details</h4>
                      <ul className="text-sm space-y-1">
                        <li className="capitalize">{projectData.projectType.replace('-', ' ')}</li>
                        <li>{projectData.location}</li>
                        <li>Professional grade materials</li>
                        <li>Licensed contractors</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      Back to Materials
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentStep(1);
                        setProjectData({
                          projectType: '',
                          location: 'Northern Beaches',
                          selectedTrades: [],
                          materials: {}
                        });
                      }}
                      className="gradient-primary"
                    >
                      Start New Estimate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingEstimator;