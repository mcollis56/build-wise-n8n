import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, RefreshCw, Calculator, Clock, MapPin, DollarSign } from 'lucide-react';

interface EstimateResultsProps {
  projectData: {
    projectType: string;
    location: string;
    selectedTrades: string[];
    materials: Record<string, any>;
    siteConditions: Record<string, any>;
  };
  onBack: () => void;
  onRestart: () => void;
}

const EstimateResults: React.FC<EstimateResultsProps> = ({
  projectData,
  onBack,
  onRestart
}) => {
  // Pricing calculation logic
  const calculateEstimate = () => {
    const basePrices = {
      builder: { labor: 15000, materials: 25000 },
      excavation: { labor: 8000, materials: 5000 },
      concreter: { labor: 12000, materials: 8000 },
      bricklayer: { labor: 18000, materials: 15000 },
      roofer: { labor: 12000, materials: 18000 },
      plumber: { labor: 8000, materials: 6000 },
      electrician: { labor: 9000, materials: 4000 },
      hvac: { labor: 6000, materials: 12000 },
      carpenter: { labor: 15000, materials: 20000 },
      tiler: { labor: 8000, materials: 6000 },
      painter: { labor: 6000, materials: 3000 },
      landscaper: { labor: 10000, materials: 8000 }
    };

    const nbPremiums = {
      builder: 0.15,
      excavation: 0.10,
      concreter: 0.18,
      bricklayer: 0.22,
      roofer: 0.20,
      plumber: 0.15,
      electrician: 0.18,
      hvac: 0.16,
      carpenter: 0.20,
      tiler: 0.25,
      painter: 0.12,
      landscaper: 0.15
    };

    let totalLabor = 0;
    let totalMaterials = 0;
    const tradeBreakdown: Record<string, any> = {};

    projectData.selectedTrades.forEach(tradeId => {
      const basePrice = basePrices[tradeId as keyof typeof basePrices];
      const premium = nbPremiums[tradeId as keyof typeof nbPremiums] || 0;
      
      if (basePrice) {
        const laborCost = basePrice.labor * (1 + premium);
        const materialCost = basePrice.materials * (1 + premium);
        
        // Apply material premium based on selections
        let materialMultiplier = 1;
        const tradeMaterials = projectData.materials[tradeId];
        if (tradeMaterials) {
          const materialValues = Object.values(tradeMaterials);
          if (materialValues.some(m => String(m).includes('premium'))) {
            materialMultiplier = 1.4;
          } else if (materialValues.some(m => String(m).includes('mid'))) {
            materialMultiplier = 1.2;
          }
        }
        
        const finalLaborCost = Math.round(laborCost);
        const finalMaterialCost = Math.round(materialCost * materialMultiplier);
        
        totalLabor += finalLaborCost;
        totalMaterials += finalMaterialCost;
        
        tradeBreakdown[tradeId] = {
          labor: finalLaborCost,
          materials: finalMaterialCost,
          total: finalLaborCost + finalMaterialCost,
          premium: Math.round(premium * 100)
        };
      }
    });

    const subtotal = totalLabor + totalMaterials;
    const contingency = Math.round(subtotal * 0.10); // 10% contingency
    const total = subtotal + contingency;

    return {
      labor: totalLabor,
      materials: totalMaterials,
      subtotal,
      contingency,
      total,
      breakdown: tradeBreakdown
    };
  };

  const estimate = calculateEstimate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTradeDisplayName = (tradeId: string) => {
    const names: Record<string, string> = {
      builder: 'Builder/Project Manager',
      excavation: 'Excavation Contractor',
      concreter: 'Concreter',
      bricklayer: 'Bricklayer/Mason',
      roofer: 'Roofer',
      plumber: 'Plumber',
      electrician: 'Electrician',
      hvac: 'HVAC Specialist',
      carpenter: 'Carpenter/Joiner',
      tiler: 'Tiler',
      painter: 'Painter',
      landscaper: 'Landscaper'
    };
    return names[tradeId] || tradeId;
  };

  const estimatedTimeline = Math.ceil(projectData.selectedTrades.length * 2.5); // Rough timeline calculation

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <Card className="construction-card bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Project Cost Estimate
          </CardTitle>
          <CardDescription className="text-lg">
            Northern Beaches Construction Project - Professional Estimate
          </CardDescription>
          <div className="flex justify-center items-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{projectData.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{estimatedTimeline} weeks estimated</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cost Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="construction-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Cost Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Total Labor</span>
                <span className="font-semibold">{formatCurrency(estimate.labor)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Total Materials</span>
                <span className="font-semibold">{formatCurrency(estimate.materials)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{formatCurrency(estimate.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-muted-foreground">Contingency (10%)</span>
                <span className="font-semibold text-muted-foreground">{formatCurrency(estimate.contingency)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-3 bg-primary/5 px-4 rounded-lg">
                <span className="text-xl font-bold">Project Total</span>
                <span className="text-2xl font-bold text-accent">{formatCurrency(estimate.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Trade Breakdown */}
          <Card className="construction-card">
            <CardHeader>
              <CardTitle>Detailed Trade Breakdown</CardTitle>
              <CardDescription>
                Individual costs by trade with Northern Beaches premiums applied
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(estimate.breakdown).map(([tradeId, costs]) => (
                  <div key={tradeId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold">{getTradeDisplayName(tradeId)}</h4>
                        <Badge variant="outline" className="text-xs">
                          +{costs.premium}% NB Premium
                        </Badge>
                      </div>
                      <span className="font-bold text-accent">
                        {formatCurrency(costs.total)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>Labor: {formatCurrency(costs.labor)}</div>
                      <div>Materials: {formatCurrency(costs.materials)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Summary & Actions */}
        <div className="space-y-6">
          <Card className="construction-card">
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Project Type</h5>
                <Badge variant="secondary" className="capitalize">
                  {projectData.projectType.replace('-', ' ')}
                </Badge>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Selected Trades</h5>
                <div className="space-y-1">
                  {projectData.selectedTrades.map(trade => (
                    <Badge key={trade} variant="outline" className="mr-1 mb-1 text-xs">
                      {getTradeDisplayName(trade)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Northern Beaches location premiums included</li>
                  <li>• Professional installation standards</li>
                  <li>• 10% contingency for unforeseen costs</li>
                  <li>• Material quality levels factored</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="construction-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Next Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full gradient-primary" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download PDF Estimate
              </Button>
              
              <Button variant="outline" className="w-full" onClick={onRestart}>
                <RefreshCw className="w-4 h-4 mr-2" />
                New Estimate
              </Button>

              <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded">
                <strong>Important:</strong> This estimate is indicative only. Final quotes should be obtained from licensed contractors. Prices may vary based on site conditions, accessibility, and current market rates.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center py-6">
        <Button variant="outline" onClick={onBack}>
          Back to Site Assessment
        </Button>
        <Button onClick={onRestart} className="gradient-primary">
          Start New Estimate
        </Button>
      </div>
    </div>
  );
};

export default EstimateResults;