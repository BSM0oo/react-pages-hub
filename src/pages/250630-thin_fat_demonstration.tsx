import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';

const ThinFatDemonstration = () => {
  const [activeDemo, setActiveDemo] = useState('arc');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(false);
  };

  const SwingArcDemo = () => {
    const clubAngle = (animationStep / 100) * 180 - 90;
    const wristExtended = animationStep > 60;
    
    // Normal vs Extended wrist paths
    const normalRadius = 100;
    const extendedRadius = wristExtended ? normalRadius + 15 : normalRadius - 10;
    
    const clubX = 200 + Math.cos(clubAngle * Math.PI / 180) * extendedRadius;
    const clubY = 150 + Math.sin(clubAngle * Math.PI / 180) * extendedRadius;
    
    const ballPosition = { x: 200, y: 240 };
    const groundLevel = 250;
    
    // Determine contact type
    let contactType = "perfect";
    if (animationStep > 85) {
      if (clubY < ballPosition.y - 10) contactType = "thin";
      else if (clubY > groundLevel - 5) contactType = "fat";
    }

    return (
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Swing Arc Visualization</h3>
        <svg width="400" height="300" className="border rounded">
          {/* Ground */}
          <line x1="0" y1={groundLevel} x2="400" y2={groundLevel} stroke="#8B4513" strokeWidth="3"/>
          <text x="10" y={groundLevel + 15} className="text-xs fill-amber-800">Ground</text>
          
          {/* Ball */}
          <circle cx={ballPosition.x} cy={ballPosition.y} r="8" fill="white" stroke="black" strokeWidth="2"/>
          <text x={ballPosition.x - 10} y={ballPosition.y - 15} className="text-xs">Ball</text>
          
          {/* Golfer position */}
          <circle cx="200" cy="150" r="4" fill="blue"/>
          <text x="160" y="140" className="text-xs">Golfer</text>
          
          {/* Club shaft */}
          <line x1="200" y1="150" x2={clubX} y2={clubY} stroke={wristExtended ? "red" : "green"} strokeWidth="4"/>
          
          {/* Clubhead */}
          <circle cx={clubX} cy={clubY} r="6" fill={wristExtended ? "red" : "green"}/>
          
          {/* Swing arc path */}
          <path 
            d={`M 100,150 Q 200,${groundLevel + 20} 300,150`} 
            fill="none" 
            stroke="lightblue" 
            strokeWidth="2" 
            strokeDasharray="5,5"
          />
          <text x="320" y="160" className="text-xs fill-blue-600">Normal Arc</text>
          
          {/* Extended arc path */}
          {wristExtended && (
            <path 
              d={`M 85,140 Q 200,${groundLevel + 35} 315,140`} 
              fill="none" 
              stroke="red" 
              strokeWidth="2" 
              strokeDasharray="3,3"
            />
          )}
          
          {/* Contact indicator */}
          {animationStep > 85 && (
            <text x="50" y="30" className={`text-sm font-bold ${
              contactType === 'thin' ? 'fill-orange-600' : 
              contactType === 'fat' ? 'fill-red-600' : 'fill-green-600'
            }`}>
              {contactType === 'thin' ? 'THIN SHOT!' : 
               contactType === 'fat' ? 'FAT SHOT!' : 'GOOD CONTACT!'}
            </text>
          )}
        </svg>
        
        <div className="mt-4 text-sm">
          <p className="mb-2"><span className="text-green-600 font-semibold">Green:</span> Proper wrist angles maintained</p>
          <p><span className="text-red-600 font-semibold">Red:</span> Lead wrist extended too early</p>
        </div>
      </div>
    );
  };

  const TimingDemo = () => {
    const progress = animationStep / 100;
    const wristExtensionPoint = 0.6; // When wrist extension begins
    
    return (
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Timing Demonstration</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Scenario 1: Fat Shot */}
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-red-600 mb-2">Fat Shot Scenario</h4>
            <div className="relative h-40 bg-gradient-to-b from-sky-200 to-green-200">
              {/* Ground */}
              <div className="absolute bottom-0 w-full h-8 bg-amber-800"></div>
              
              {/* Ball */}
              <div className="absolute bottom-8 left-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-400 transform -translate-x-1/2"></div>
              
              {/* Club impact point */}
              {progress > wristExtensionPoint && (
                <div 
                  className="absolute bottom-8 w-2 h-16 bg-red-600"
                  style={{ 
                    left: `${30 + (progress - wristExtensionPoint) * 50}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {progress > 0.8 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-600 whitespace-nowrap">
                      Hits ground first!
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs mt-2">Wrist extends → Club reaches ground before ball</p>
          </div>
          
          {/* Scenario 2: Thin Shot */}
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-orange-600 mb-2">Thin Shot Scenario</h4>
            <div className="relative h-40 bg-gradient-to-b from-sky-200 to-green-200">
              {/* Ground */}
              <div className="absolute bottom-0 w-full h-8 bg-amber-800"></div>
              
              {/* Ball */}
              <div className="absolute bottom-8 left-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-400 transform -translate-x-1/2"></div>
              
              {/* Club impact point */}
              {progress > wristExtensionPoint && (
                <div 
                  className="absolute w-2 h-8 bg-orange-600"
                  style={{ 
                    bottom: `${24 - (progress - wristExtensionPoint) * 20}px`,
                    left: `${40 + (progress - wristExtensionPoint) * 40}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {progress > 0.8 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-orange-600 whitespace-nowrap">
                      Hits ball high!
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs mt-2">Wrist extends → Club pulls up, contacts ball thin</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm"><strong>Key Insight:</strong> Same wrist extension timing, different contact points due to micro-adjustments and compensations.</p>
        </div>
      </div>
    );
  };

  const WristAngleDemo = () => {
    const extensionAngle = Math.sin(animationStep / 100 * Math.PI * 2) * 30;
    
    return (
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Wrist Angle Analysis</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {/* Proper Flexion */}
          <div className="bg-white p-4 rounded border text-center">
            <h4 className="font-semibold text-green-600 mb-2">Proper (Flexion)</h4>
            <svg width="80" height="100" className="mx-auto">
              <line x1="40" y1="20" x2="40" y2="60" stroke="black" strokeWidth="3"/>
              <line x1="40" y1="60" x2="25" y2="80" stroke="green" strokeWidth="4"/>
              <text x="5" y="95" className="text-xs">Hands ahead</text>
            </svg>
            <p className="text-xs mt-2">Lead wrist bowed forward</p>
          </div>
          
          {/* Extension Problem */}
          <div className="bg-white p-4 rounded border text-center">
            <h4 className="font-semibold text-red-600 mb-2">Problem (Extension)</h4>
            <svg width="80" height="100" className="mx-auto">
              <line x1="40" y1="20" x2="40" y2="60" stroke="black" strokeWidth="3"/>
              <line 
                x1="40" 
                y1="60" 
                x2={40 + Math.sin(Math.abs(extensionAngle) * Math.PI / 180) * 15} 
                y2={80 - Math.cos(Math.abs(extensionAngle) * Math.PI / 180) * 20} 
                stroke="red" 
                strokeWidth="4"
              />
              <text x="5" y="95" className="text-xs">Club ahead</text>
            </svg>
            <p className="text-xs mt-2">Lead wrist cupped/extended</p>
          </div>
          
          {/* Impact Comparison */}
          <div className="bg-white p-4 rounded border text-center">
            <h4 className="font-semibold text-blue-600 mb-2">Impact Result</h4>
            <div className="space-y-2">
              <div className="text-green-600 text-sm">✓ Ball first, then turf</div>
              <div className="text-red-600 text-sm">✗ Turf first OR ball thin</div>
              <div className="text-xs mt-2 p-2 bg-gray-100 rounded">
                Distance difference: ~50-60 yards!
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-100 rounded">
          <p className="text-sm"><strong>HackMotion Finding:</strong> Same golfer went from 116 yards to 174 yards by fixing wrist angles.</p>
        </div>
      </div>
    );
  };

  const CompensationDemo = () => {
    const [scenario, setScenario] = useState('fat');
    
    return (
      <div className="bg-orange-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Body Compensation Patterns</h3>
        
        <div className="mb-4">
          <button 
            onClick={() => setScenario('fat')}
            className={`mr-2 px-4 py-2 rounded ${scenario === 'fat' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            Fat Shot Pattern
          </button>
          <button 
            onClick={() => setScenario('thin')}
            className={`px-4 py-2 rounded ${scenario === 'thin' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
          >
            Thin Shot Pattern
          </button>
        </div>
        
        {scenario === 'fat' && (
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-red-600 mb-3">Fat Shot Compensation Chain</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                <p className="text-sm">Lead wrist extends early in downswing</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                <p className="text-sm">Club shaft and head overtake hands</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-300 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                <p className="text-sm">Swing arc becomes too wide too early</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                <p className="text-sm">Club contacts ground before ball</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">⚡</div>
                <p className="text-sm font-semibold">Result: Fat shot, ~50 yards lost</p>
              </div>
            </div>
          </div>
        )}
        
        {scenario === 'thin' && (
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-orange-600 mb-3">Thin Shot Compensation Chain</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                <p className="text-sm">Lead wrist extends early in downswing</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                <p className="text-sm">Subconscious fear of hitting ground</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                <p className="text-sm">Body compensates: "chicken wing" elbow</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                <p className="text-sm">Club pulls up, contacts ball thin/high</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">⚡</div>
                <p className="text-sm font-semibold">Result: Thin shot, ~50 yards lost</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p className="text-sm"><strong>Solution:</strong> Train lead wrist flexion to maintain shaft lean and prevent both compensations.</p>
        </div>
      </div>
    );
  };

  const demos = {
    arc: { component: SwingArcDemo, title: "Swing Arc Changes" },
    timing: { component: TimingDemo, title: "Timing Differences" },
    wrist: { component: WristAngleDemo, title: "Wrist Angle Analysis" },
    compensation: { component: CompensationDemo, title: "Body Compensations" }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thin vs Fat Shots: Same Problem, Different Outcomes
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Interactive demonstration of how lead wrist extension causes both thin and fat shots through different manifestations of the same fundamental problem.
        </p>
      </div>

      {/* Demo Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {Object.entries(demos).map(([key, demo]) => (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeDemo === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {demo.title}
            </button>
          ))}
        </div>

        {/* Animation Controls */}
        {(activeDemo === 'arc' || activeDemo === 'timing') && (
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {isAnimating ? <Pause size={16} /> : <Play size={16} />}
              {isAnimating ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={resetAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Active Demo */}
      <div className="mb-8">
        {React.createElement(demos[activeDemo].component)}
      </div>

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Info className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Key Insights</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">✓ The Root Cause</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Lead wrist extension (cupping) in downswing</li>
              <li>• Club shaft overtakes hands prematurely</li>
              <li>• Loss of proper impact geometry</li>
              <li>• Weight too far back at impact</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">⚡ The Manifestations</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• <strong>Fat:</strong> Swing arc too wide, ground first</li>
              <li>• <strong>Thin:</strong> Club pulls up, contacts ball high</li>
              <li>• <strong>Both:</strong> Massive distance loss (~50+ yards)</li>
              <li>• <strong>Timing:</strong> Micro-differences in compensation</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-gray-700">
            <strong>Bottom Line:</strong> Master lead wrist flexion (forward shaft lean) and proper weight transfer to eliminate both thin and fat shots simultaneously. The HackMotion sensor can help you identify and train the correct wrist positions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThinFatDemonstration;