import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Star, Award, Droplets, Zap, Hammer, Paintbrush } from 'lucide-react';

interface MaterialSelectionProps {
  selectedTrades: string[];
  materials: Record<string, any>;
  onMaterialUpdate: (materials: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MaterialSelection: React.FC<MaterialSelectionProps> = ({
  selectedTrades,
  materials,
  onMaterialUpdate,
  onNext,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(selectedTrades[0] || 'plumber');

  const materialDatabase = {
    plumber: {
      icon: Droplets,
      name: 'Plumbing Materials',
      categories: [
        {
          name: 'Fixtures - Toilets',
          items: [
            { 
              id: 'toilet-budget', 
              name: 'Caroma Profile', 
              price: '320-450', 
              level: 'budget', 
              description: 'Standard dual flush, vitreous china',
              brand: 'Caroma'
            },
            { 
              id: 'toilet-mid', 
              name: 'Caroma Luna', 
              price: '480-650', 
              level: 'mid', 
              description: 'Comfort height, soft close seat',
              brand: 'Caroma'
            },
            { 
              id: 'toilet-premium', 
              name: 'Caroma Urbane', 
              price: '780-1200', 
              level: 'premium', 
              description: 'Wall hung, rimless technology',
              brand: 'Caroma'
            }
          ]
        },
        {
          name: 'Fixtures - Basins',
          items: [
            { 
              id: 'basin-budget', 
              name: 'Ceramic Wall Hung', 
              price: '180-320', 
              level: 'budget', 
              description: 'Standard ceramic, wall mounted',
              brand: 'Generic'
            },
            { 
              id: 'basin-mid', 
              name: 'Semi-Recessed Basin', 
              price: '320-580', 
              level: 'mid', 
              description: 'Designer ceramic, overflow protection',
              brand: 'Parisi'
            },
            { 
              id: 'basin-premium', 
              name: 'Natural Stone Basin', 
              price: '680-1500', 
              level: 'premium', 
              description: 'Granite/marble, custom fabrication',
              brand: 'Stone Italiana'
            }
          ]
        },
        {
          name: 'Tapware',
          items: [
            { 
              id: 'tap-budget', 
              name: 'Chrome Mixer Tap', 
              price: '120-250', 
              level: 'budget', 
              description: 'Standard chrome finish, ceramic disc',
              brand: 'Caroma'
            },
            { 
              id: 'tap-mid', 
              name: 'Brushed Finish Tap', 
              price: '250-480', 
              level: 'mid', 
              description: 'Brushed nickel, premium cartridge',
              brand: 'Methven'
            },
            { 
              id: 'tap-premium', 
              name: 'Matte Black Designer', 
              price: '480-850', 
              level: 'premium', 
              description: 'Matte black finish, architect designed',
              brand: 'Mizu'
            }
          ]
        }
      ]
    },
    electrician: {
      icon: Zap,
      name: 'Electrical Materials',
      categories: [
        {
          name: 'Power Points & Switches',
          items: [
            { 
              id: 'gpo-standard', 
              name: 'Standard GPO', 
              price: '12-25', 
              level: 'budget', 
              description: 'Double power outlet, white',
              brand: 'Clipsal'
            },
            { 
              id: 'gpo-usb', 
              name: 'USB Power Outlet', 
              price: '45-78', 
              level: 'mid', 
              description: 'USB charging + standard outlets',
              brand: 'Clipsal'
            },
            { 
              id: 'switch-smart', 
              name: 'Smart Dimmer Switch', 
              price: '65-150', 
              level: 'premium', 
              description: 'WiFi enabled, app control',
              brand: 'Philips Hue'
            }
          ]
        },
        {
          name: 'Lighting',
          items: [
            { 
              id: 'downlight-budget', 
              name: 'LED Downlight', 
              price: '15-35', 
              level: 'budget', 
              description: '90mm cutout, 3000K warm white',
              brand: 'Generic LED'
            },
            { 
              id: 'downlight-mid', 
              name: 'Adjustable Downlight', 
              price: '35-65', 
              level: 'mid', 
              description: 'Tiltable, dimmer compatible',
              brand: 'Brilliant'
            },
            { 
              id: 'downlight-premium', 
              name: 'Architectural Downlight', 
              price: '65-150', 
              level: 'premium', 
              description: 'Fire rated, colour changing',
              brand: 'Philips'
            }
          ]
        }
      ]
    },
    carpenter: {
      icon: Hammer,
      name: 'Carpentry Materials',
      categories: [
        {
          name: 'Flooring',
          items: [
            { 
              id: 'floor-engineered', 
              name: 'Engineered Timber', 
              price: '65-125', 
              level: 'mid', 
              description: 'European Oak, pre-finished',
              brand: 'Quick-Step'
            },
            { 
              id: 'floor-solid', 
              name: 'Solid Blackbutt', 
              price: '85-120', 
              level: 'premium', 
              description: 'Australian hardwood, site finished',
              brand: 'Boral'
            },
            { 
              id: 'floor-spotted-gum', 
              name: 'Spotted Gum Flooring', 
              price: '95-135', 
              level: 'premium', 
              description: 'Premium Australian timber',
              brand: 'Boral'
            }
          ]
        },
        {
          name: 'Kitchen Cabinetry',
          items: [
            { 
              id: 'kitchen-flatpack', 
              name: 'Flat Pack Kitchen', 
              price: '8000-15000', 
              level: 'budget', 
              description: 'Melamine finish, standard sizes',
              brand: 'Bunnings'
            },
            { 
              id: 'kitchen-semi', 
              name: 'Semi-Custom Kitchen', 
              price: '15000-35000', 
              level: 'mid', 
              description: 'Polyurethane doors, stone tops',
              brand: 'Freedom Kitchens'
            },
            { 
              id: 'kitchen-custom', 
              name: 'Custom Joinery', 
              price: '35000-80000', 
              level: 'premium', 
              description: 'Bespoke design, premium hardware',
              brand: 'Local Joiner'
            }
          ]
        }
      ]
    },
    painter: {
      icon: Paintbrush,
      name: 'Painting Materials',
      categories: [
        {
          name: 'Interior Paint',
          items: [
            { 
              id: 'paint-budget', 
              name: 'Taubmans 3-in-1', 
              price: '55-75', 
              level: 'budget', 
              description: 'Low sheen, 15L coverage',
              brand: 'Taubmans'
            },
            { 
              id: 'paint-mid', 
              name: 'Dulux Wash & Wear', 
              price: '85-105', 
              level: 'mid', 
              description: 'Easy clean, anti-bacterial',
              brand: 'Dulux'
            },
            { 
              id: 'paint-premium', 
              name: 'Dulux Vivid White', 
              price: '105-125', 
              level: 'premium', 
              description: 'Ultra premium, zero VOC',
              brand: 'Dulux'
            }
          ]
        }
      ]
    }
  };

  const handleMaterialSelect = (tradeId: string, categoryName: string, itemId: string) => {
    const newMaterials = {
      ...materials,
      [tradeId]: {
        ...materials[tradeId],
        [categoryName]: itemId
      }
    };
    onMaterialUpdate(newMaterials);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'budget': return 'bg-muted text-muted-foreground';
      case 'mid': return 'bg-primary/10 text-primary';
      case 'premium': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'budget': return DollarSign;
      case 'mid': return Star;
      case 'premium': return Award;
      default: return DollarSign;
    }
  };

  const availableTrades = selectedTrades.filter(trade => materialDatabase[trade as keyof typeof materialDatabase]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <Card className="construction-card">
        <CardHeader>
          <CardTitle className="construction-heading">Material Selection</CardTitle>
          <CardDescription>
            Choose materials and specifications for your selected trades with Northern Beaches pricing
          </CardDescription>
        </CardHeader>
      </Card>

      {availableTrades.length === 0 ? (
        <Card className="construction-card">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">
              No material selection required for the selected trades at this time.
            </p>
            <Button onClick={onNext} className="mt-4">
              Continue to Site Conditions
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="construction-card">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-8">
                {availableTrades.map((tradeId) => {
                  const trade = materialDatabase[tradeId as keyof typeof materialDatabase];
                  if (!trade) return null;
                  
                  const Icon = trade.icon;
                  return (
                    <TabsTrigger key={tradeId} value={tradeId} className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{trade.name.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {availableTrades.map((tradeId) => {
                const trade = materialDatabase[tradeId as keyof typeof materialDatabase];
                if (!trade) return null;

                return (
                  <TabsContent key={tradeId} value={tradeId} className="space-y-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <trade.icon className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="text-xl font-semibold">{trade.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Professional grade materials with Northern Beaches delivery
                        </p>
                      </div>
                    </div>

                    {trade.categories.map((category) => (
                      <Card key={category.name} className="construction-card">
                        <CardHeader>
                          <CardTitle className="trade-title">{category.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.items.map((item) => {
                              const LevelIcon = getLevelIcon(item.level);
                              const isSelected = materials[tradeId]?.[category.name] === item.id;
                              
                              return (
                                <Card
                                  key={item.id}
                                  className={`trade-card ${
                                    isSelected 
                                      ? 'ring-2 ring-primary border-primary bg-primary/5' 
                                      : ''
                                  }`}
                                  onClick={() => handleMaterialSelect(tradeId, category.name, item.id)}
                                >
                                  <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                      <Badge className={getLevelColor(item.level)}>
                                        <LevelIcon className="w-3 h-3 mr-1" />
                                        {item.level}
                                      </Badge>
                                      {isSelected && (
                                        <Badge variant="default" className="bg-success text-success-foreground">
                                          Selected
                                        </Badge>
                                      )}
                                    </div>
                                    <CardTitle className="text-base font-semibold">
                                      {item.name}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                      {item.description}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="pt-0">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="font-semibold text-accent">
                                          ${item.price}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {item.brand}
                                        </div>
                                      </div>
                                      <Button
                                        variant={isSelected ? "default" : "outline"}
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleMaterialSelect(tradeId, category.name, item.id);
                                        }}
                                      >
                                        {isSelected ? 'Selected' : 'Select'}
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center py-6">
        <Button variant="outline" onClick={onBack}>
          Back to Trade Selection
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Materials configured for {Object.keys(materials).length} trades
          </p>
        </div>
        <Button onClick={onNext} className="gradient-primary">
          Continue to Site Assessment
        </Button>
      </div>
    </div>
  );
};

export default MaterialSelection;