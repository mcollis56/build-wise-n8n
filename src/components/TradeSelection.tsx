import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Hammer, 
  Wrench, 
  Zap, 
  Droplets, 
  Paintbrush, 
  TreePine,
  HardHat,
  Settings,
  Home,
  Layers,
  Shield,
  Drill
} from 'lucide-react';

interface TradeSelectionProps {
  selectedTrades: string[];
  onTradeUpdate: (trades: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const TradeSelection: React.FC<TradeSelectionProps> = ({
  selectedTrades,
  onTradeUpdate,
  onNext,
  onBack
}) => {
  const tradeCategories = [
    {
      category: 'Structural Trades',
      trades: [
        { 
          id: 'builder', 
          name: 'Builder/Project Manager', 
          description: 'Project coordination, site prep, framing',
          icon: HardHat,
          essential: true,
          nbPremium: 15
        },
        { 
          id: 'excavation', 
          name: 'Excavation Contractor', 
          description: 'Site clearing, foundations, drainage prep',
          icon: Drill,
          essential: false,
          nbPremium: 10
        },
        { 
          id: 'concreter', 
          name: 'Concreter', 
          description: 'Slabs, footings, driveways, decorative',
          icon: Layers,
          essential: false,
          nbPremium: 18
        },
        { 
          id: 'bricklayer', 
          name: 'Bricklayer/Mason', 
          description: 'Face brick, block work, stone, retaining walls',
          icon: Home,
          essential: false,
          nbPremium: 22
        },
        { 
          id: 'roofer', 
          name: 'Roofer', 
          description: 'Tile, metal, membrane roofing, guttering',
          icon: Shield,
          essential: false,
          nbPremium: 20
        }
      ]
    },
    {
      category: 'Mechanical Trades',
      trades: [
        { 
          id: 'plumber', 
          name: 'Plumber', 
          description: 'Rough-in, fixtures, hot water, gas fitting',
          icon: Droplets,
          essential: true,
          nbPremium: 15
        },
        { 
          id: 'electrician', 
          name: 'Electrician', 
          description: 'Wiring, power points, lighting, solar',
          icon: Zap,
          essential: true,
          nbPremium: 18
        },
        { 
          id: 'hvac', 
          name: 'HVAC Specialist', 
          description: 'Air conditioning, ventilation, heating',
          icon: Settings,
          essential: false,
          nbPremium: 16
        }
      ]
    },
    {
      category: 'Finishing Trades',
      trades: [
        { 
          id: 'carpenter', 
          name: 'Carpenter/Joiner', 
          description: 'Fit-out, kitchens, flooring, custom joinery',
          icon: Hammer,
          essential: false,
          nbPremium: 20
        },
        { 
          id: 'tiler', 
          name: 'Tiler', 
          description: 'Floor & wall tiles, waterproofing',
          icon: Wrench,
          essential: false,
          nbPremium: 25
        },
        { 
          id: 'painter', 
          name: 'Painter', 
          description: 'Interior/exterior painting, specialty finishes',
          icon: Paintbrush,
          essential: false,
          nbPremium: 12
        }
      ]
    },
    {
      category: 'Specialty Trades',
      trades: [
        { 
          id: 'landscaper', 
          name: 'Landscaper', 
          description: 'Gardens, paving, retaining walls, irrigation',
          icon: TreePine,
          essential: false,
          nbPremium: 15
        }
      ]
    }
  ];

  const handleTradeToggle = (tradeId: string) => {
    const newTrades = selectedTrades.includes(tradeId)
      ? selectedTrades.filter(id => id !== tradeId)
      : [...selectedTrades, tradeId];
    
    onTradeUpdate(newTrades);
  };

  const getSelectedCount = () => selectedTrades.length;
  const getEssentialCount = () => {
    const essentialTrades = tradeCategories.flatMap(cat => 
      cat.trades.filter(trade => trade.essential)
    );
    return essentialTrades.filter(trade => selectedTrades.includes(trade.id)).length;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Selection Summary */}
      <Card className="construction-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="construction-heading">Trade Selection</CardTitle>
              <CardDescription>
                Select the trades required for your Northern Beaches project
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{getSelectedCount()}</div>
              <div className="text-sm text-muted-foreground">Trades Selected</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-success/10 text-success">
              {getEssentialCount()} Essential Trades
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent">
              Northern Beaches Pricing
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Professional Installation
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Trade Categories */}
      {tradeCategories.map((category) => (
        <Card key={category.category} className="construction-card">
          <CardHeader>
            <CardTitle className="trade-title">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.trades.map((trade) => (
                <Card
                  key={trade.id}
                  className={`trade-card relative ${
                    selectedTrades.includes(trade.id) 
                      ? 'ring-2 ring-primary border-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => handleTradeToggle(trade.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <trade.icon className="w-8 h-8 text-primary mb-2" />
                      <Checkbox
                        checked={selectedTrades.includes(trade.id)}
                        onChange={() => handleTradeToggle(trade.id)}
                        className="pointer-events-none"
                      />
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {trade.name}
                      {trade.essential && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Essential
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {trade.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        NB Premium: +{trade.nbPremium}%
                      </span>
                      {selectedTrades.includes(trade.id) && (
                        <Badge variant="default" className="bg-success text-success-foreground">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Navigation */}
      <div className="flex justify-between items-center py-6">
        <Button variant="outline" onClick={onBack}>
          Back to Project Type
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {getSelectedCount()} trades selected
          </p>
          {getSelectedCount() === 0 && (
            <p className="text-xs text-warning">Select at least one trade to continue</p>
          )}
        </div>
        <Button 
          onClick={onNext} 
          disabled={getSelectedCount() === 0}
          className="gradient-primary"
        >
          Continue to Materials
        </Button>
      </div>
    </div>
  );
};

export default TradeSelection;