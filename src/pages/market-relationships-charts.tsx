import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Coins, BarChart3, Activity, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const MarketRelationshipsCharts = () => {
  const [activeScenario, setActiveScenario] = useState('neutral');
  const [activeCrisis, setActiveCrisis] = useState('normal');
  const [animationStep, setAnimationStep] = useState(0);

  // Normal market scenarios data
  const normalScenarios = {
    neutral: {
      name: "Neutral Market",
      description: "Balanced economic conditions with moderate growth and stable inflation",
      data: [
        { asset: 'Bond Prices', value: 100, change: 0, direction: 'neutral' },
        { asset: 'Bond Yields', value: 100, change: 0, direction: 'neutral' },
        { asset: 'US Dollar', value: 100, change: 0, direction: 'neutral' },
        { asset: 'Gold', value: 100, change: 0, direction: 'neutral' }
      ],
      forces: {
        'Fed Policy': 'Neutral',
        'Inflation': 'Target 2%',
        'Growth': 'Moderate',
        'Risk Sentiment': 'Balanced'
      }
    },
    fedHiking: {
      name: "Fed Rate Hikes",
      description: "Federal Reserve raising interest rates to combat inflation",
      data: [
        { asset: 'Bond Prices', value: 85, change: -15, direction: 'down' },
        { asset: 'Bond Yields', value: 125, change: 25, direction: 'up' },
        { asset: 'US Dollar', value: 115, change: 15, direction: 'up' },
        { asset: 'Gold', value: 90, change: -10, direction: 'down' }
      ],
      forces: {
        'Fed Policy': 'Hawkish',
        'Inflation': 'Above Target',
        'Growth': 'Strong',
        'Risk Sentiment': 'Risk-Off'
      }
    },
    fedCutting: {
      name: "Fed Rate Cuts",
      description: "Federal Reserve lowering rates to stimulate economy",
      data: [
        { asset: 'Bond Prices', value: 115, change: 15, direction: 'up' },
        { asset: 'Bond Yields', value: 75, change: -25, direction: 'down' },
        { asset: 'US Dollar', value: 85, change: -15, direction: 'down' },
        { asset: 'Gold', value: 110, change: 10, direction: 'up' }
      ],
      forces: {
        'Fed Policy': 'Dovish',
        'Inflation': 'Below Target',
        'Growth': 'Weak',
        'Risk Sentiment': 'Risk-On'
      }
    },
    inflation: {
      name: "Rising Inflation",
      description: "Inflation expectations increasing rapidly",
      data: [
        { asset: 'Bond Prices', value: 80, change: -20, direction: 'down' },
        { asset: 'Bond Yields', value: 140, change: 40, direction: 'up' },
        { asset: 'US Dollar', value: 95, change: -5, direction: 'down' },
        { asset: 'Gold', value: 125, change: 25, direction: 'up' }
      ],
      forces: {
        'Fed Policy': 'Behind Curve',
        'Inflation': 'Rising Fast',
        'Growth': 'Uncertain',
        'Risk Sentiment': 'Inflation Hedge'
      }
    },
    recession: {
      name: "Recession Fears",
      description: "Economic growth slowing, recession concerns mounting",
      data: [
        { asset: 'Bond Prices', value: 120, change: 20, direction: 'up' },
        { asset: 'Bond Yields', value: 70, change: -30, direction: 'down' },
        { asset: 'US Dollar', value: 105, change: 5, direction: 'up' },
        { asset: 'Gold', value: 115, change: 15, direction: 'up' }
      ],
      forces: {
        'Fed Policy': 'Supportive',
        'Inflation': 'Falling',
        'Growth': 'Negative',
        'Risk Sentiment': 'Flight to Quality'
      }
    }
  };

  // Crisis scenarios data
  const crisisScenarios = {
    normal: {
      name: "Normal Market",
      description: "Stable market conditions with normal correlations",
      data: [
        { asset: 'Treasury Bonds', value: 100, change: 0, stress: 'low' },
        { asset: 'US Dollar', value: 100, change: 0, stress: 'low' },
        { asset: 'Gold', value: 100, change: 0, stress: 'low' },
        { asset: 'Credit Spreads', value: 100, change: 0, stress: 'low' }
      ],
      indicators: {
        'VIX': 18,
        'Credit Spreads': 'Normal',
        'Flight to Quality': 'None',
        'Liquidity': 'Ample'
      }
    },
    financial2008: {
      name: "2008 Financial Crisis",
      description: "Banking system collapse, massive flight to quality",
      data: [
        { asset: 'Treasury Bonds', value: 130, change: 30, stress: 'low' },
        { asset: 'US Dollar', value: 120, change: 20, stress: 'low' },
        { asset: 'Gold', value: 115, change: 15, stress: 'medium' },
        { asset: 'Credit Spreads', value: 300, change: 200, stress: 'high' }
      ],
      indicators: {
        'VIX': 65,
        'Credit Spreads': 'Extreme',
        'Flight to Quality': 'Massive',
        'Liquidity': 'Frozen'
      }
    },
    covid: {
      name: "COVID Pandemic",
      description: "Global lockdowns, massive monetary stimulus",
      data: [
        { asset: 'Treasury Bonds', value: 125, change: 25, stress: 'low' },
        { asset: 'US Dollar', value: 110, change: 10, stress: 'medium' },
        { asset: 'Gold', value: 140, change: 40, stress: 'low' },
        { asset: 'Credit Spreads', value: 180, change: 80, stress: 'high' }
      ],
      indicators: {
        'VIX': 45,
        'Credit Spreads': 'Elevated',
        'Flight to Quality': 'Strong',
        'Liquidity': 'Central Bank Support'
      }
    },
    dalioWarning: {
      name: "Dalio Warning Signals",
      description: "Bonds down + Dollar down + Gold up = Monetary system stress",
      data: [
        { asset: 'Treasury Bonds', value: 75, change: -25, stress: 'high' },
        { asset: 'US Dollar', value: 85, change: -15, stress: 'high' },
        { asset: 'Gold', value: 135, change: 35, stress: 'low' },
        { asset: 'Credit Spreads', value: 150, change: 50, stress: 'high' }
      ],
      indicators: {
        'VIX': 35,
        'Credit Spreads': 'Widening',
        'Flight to Quality': 'Alternative Assets',
        'Liquidity': 'Supply/Demand Imbalance'
      }
    },
    stagflation: {
      name: "Stagflation Risk",
      description: "High inflation + Low growth + Rising unemployment",
      data: [
        { asset: 'Treasury Bonds', value: 70, change: -30, stress: 'high' },
        { asset: 'US Dollar', value: 90, change: -10, stress: 'medium' },
        { asset: 'Gold', value: 160, change: 60, stress: 'low' },
        { asset: 'Credit Spreads', value: 140, change: 40, stress: 'high' }
      ],
      indicators: {
        'VIX': 28,
        'Credit Spreads': 'Rising',
        'Flight to Quality': 'Real Assets',
        'Liquidity': 'Policy Uncertainty'
      }
    }
  };

  // Animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const getDirectionIcon = (direction) => {
    switch(direction) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStressColor = (stress) => {
    switch(stress) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">
            Value: {payload[0].value}
          </p>
          <p className={payload[0].payload.change > 0 ? "text-green-600" : payload[0].payload.change < 0 ? "text-red-600" : "text-gray-600"}>
            Change: {payload[0].payload.change > 0 ? '+' : ''}{payload[0].payload.change}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Market Relationships Dashboard</h1>
          <p className="text-blue-200">Interactive visualization of bond, dollar, and gold dynamics</p>
        </div>

        {/* Normal Market Conditions Chart */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-blue-600 p-4">
            <div className="flex items-center gap-2 text-white">
              <BarChart3 className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Normal Market Conditions</h2>
            </div>
          </div>
          
          <div className="p-6">
            {/* Scenario Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Select Economic Scenario:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.entries(normalScenarios).map(([key, scenario]) => (
                  <button
                    key={key}
                    onClick={() => setActiveScenario(key)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                      activeScenario === key
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-semibold">{scenario.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Scenario Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-bold text-lg text-gray-800 mb-2">
                {normalScenarios[activeScenario].name}
              </h4>
              <p className="text-gray-600 mb-3">{normalScenarios[activeScenario].description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(normalScenarios[activeScenario].forces).map(([force, value]) => (
                  <div key={force} className="text-center">
                    <div className="text-sm text-gray-500">{force}</div>
                    <div className="font-semibold text-gray-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div>
                <h4 className="font-semibold mb-3">Asset Performance</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={normalScenarios[activeScenario].data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="asset" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      fill={(entry) => entry?.change > 0 ? '#10b981' : entry?.change < 0 ? '#ef4444' : '#6b7280'}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Asset Cards */}
              <div className="space-y-3">
                <h4 className="font-semibold">Live Impact Analysis</h4>
                {normalScenarios[activeScenario].data.map((asset, index) => (
                  <div key={asset.asset} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {getDirectionIcon(asset.direction)}
                      </div>
                      <div>
                        <div className="font-semibold">{asset.asset}</div>
                        <div className="text-sm text-gray-600">Current Level: {asset.value}</div>
                      </div>
                    </div>
                    <div className={`text-right ${asset.change > 0 ? 'text-green-600' : asset.change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      <div className="font-bold">
                        {asset.change > 0 ? '+' : ''}{asset.change}%
                      </div>
                      <div className="text-xs">vs baseline</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Scenarios Chart */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-red-600 p-4">
            <div className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Crisis Response Patterns</h2>
            </div>
          </div>
          
          <div className="p-6">
            {/* Crisis Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Select Crisis Scenario:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.entries(crisisScenarios).map(([key, scenario]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCrisis(key)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                      activeCrisis === key
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <div className="font-semibold">{scenario.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Crisis Info */}
            <div className="bg-red-50 rounded-xl p-4 mb-6 border-l-4 border-red-500">
              <h4 className="font-bold text-lg text-red-800 mb-2">
                {crisisScenarios[activeCrisis].name}
              </h4>
              <p className="text-red-700 mb-3">{crisisScenarios[activeCrisis].description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(crisisScenarios[activeCrisis].indicators).map(([indicator, value]) => (
                  <div key={indicator} className="text-center">
                    <div className="text-sm text-red-600">{indicator}</div>
                    <div className="font-semibold text-red-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crisis Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stress Level Chart */}
              <div>
                <h4 className="font-semibold mb-3">Asset Stress Levels</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={crisisScenarios[activeCrisis].data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="asset" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      fill={(entry, index) => {
                        const stress = crisisScenarios[activeCrisis].data[index]?.stress;
                        return getStressColor(stress);
                      }}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Crisis Asset Analysis */}
              <div className="space-y-3">
                <h4 className="font-semibold">Crisis Response Analysis</h4>
                {crisisScenarios[activeCrisis].data.map((asset, index) => (
                  <div key={asset.asset} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{asset.asset}</div>
                      <div className={`px-2 py-1 rounded text-xs font-bold text-white`} 
                           style={{backgroundColor: getStressColor(asset.stress)}}>
                        {asset.stress.toUpperCase()} STRESS
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Crisis Level: {asset.value}
                      </div>
                      <div className={`font-bold ${asset.change > 0 ? 'text-green-600' : asset.change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                        {asset.change > 0 ? '+' : ''}{asset.change}%
                      </div>
                    </div>
                    {/* Stress indicator bar */}
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.abs(asset.change) * 2}%`,
                          backgroundColor: getStressColor(asset.stress)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dalio Warning Box */}
            {activeCrisis === 'dalioWarning' && (
              <div className="mt-6 bg-amber-50 border-2 border-amber-500 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <h4 className="font-bold text-amber-800">Ray Dalio's Crisis Signal</h4>
                </div>
                <p className="text-amber-700 mb-3">
                  "Watch when the bond market goes down at the same time as the dollar goes down, 
                  at the same time as gold goes up - it is reflecting a shift in the capital market."
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <div className="text-red-800 font-bold">Bonds ↓</div>
                    <div className="text-sm text-red-600">Supply overwhelms demand</div>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <div className="text-red-800 font-bold">Dollar ↓</div>
                    <div className="text-sm text-red-600">Currency confidence falls</div>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="text-green-800 font-bold">Gold ↑</div>
                    <div className="text-sm text-green-600">Alternative store of wealth</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Relationships Summary */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Market Relationships</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">Bond Prices vs Yields</h4>
              <p className="text-sm text-blue-700">Always move in opposite directions. When yields rise, prices fall.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Dollar Strength</h4>
              <p className="text-sm text-green-700">Higher rates typically strengthen USD, making gold less attractive.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Gold as Hedge</h4>
              <p className="text-sm text-yellow-700">Rises during inflation, crisis, or currency debasement fears.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-800 mb-2">Crisis Correlations</h4>
              <p className="text-sm text-red-700">Normal relationships can break down during systemic stress.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketRelationshipsCharts;