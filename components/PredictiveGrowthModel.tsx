import React, { useState, useEffect } from 'react';
import type { GlobalCityData, PredictiveGrowthModel as PredictiveModel } from '../types.ts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

interface PredictiveGrowthModelProps {
  location: GlobalCityData;
  timeHorizon: number;
  onModelComplete: (model: PredictiveModel) => void;
}

const PredictiveGrowthModel: React.FC<PredictiveGrowthModelProps> = ({
  location,
  timeHorizon,
  onModelComplete
}) => {
  const [isModeling, setIsModeling] = useState(false);
  const [model, setModel] = useState<PredictiveModel | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string>('baseline');

  const generateGrowthScenarios = (location: GlobalCityData, years: number) => {
    const scenarios = [
      {
        scenario: 'Conservative Growth',
        probability: 0.4,
        projectedGrowth: [],
        keyDrivers: ['Stable economic policies', 'Incremental infrastructure improvements', 'Moderate technology adoption'],
        interventions: ['Policy stability maintenance', 'Basic infrastructure upgrades']
      },
      {
        scenario: 'Moderate Growth',
        probability: 0.35,
        projectedGrowth: [],
        keyDrivers: ['Economic reforms', 'Infrastructure investments', 'Technology integration', 'Skilled labor development'],
        interventions: ['Economic policy reforms', 'Major infrastructure projects', 'Digital transformation initiatives']
      },
      {
        scenario: 'Aggressive Growth',
        probability: 0.25,
        projectedGrowth: [],
        keyDrivers: ['Major policy reforms', 'Large-scale infrastructure', 'Innovation ecosystem', 'International partnerships'],
        interventions: ['Comprehensive economic reforms', 'Mega infrastructure projects', 'Innovation hub development', 'Global partnership networks']
      }
    ];

    // Calculate growth projections for each scenario
    scenarios.forEach(scenario => {
      let currentGDP = location.gdp;
      const baseGrowthRate = location.growthRate / 100; // Convert percentage to decimal

      // Adjust growth rate based on scenario
      const scenarioMultiplier = scenario.scenario === 'Conservative Growth' ? 0.8 :
                                scenario.scenario === 'Moderate Growth' ? 1.0 : 1.3;

      for (let year = 0; year <= years; year++) {
        if (year === 0) {
          scenario.projectedGrowth.push(currentGDP);
        } else {
          // Add some randomness and scenario-specific acceleration
          const randomFactor = 0.95 + Math.random() * 0.1; // ±5% randomness
          const yearGrowth = baseGrowthRate * scenarioMultiplier * randomFactor;
          currentGDP *= (1 + yearGrowth);
          scenario.projectedGrowth.push(currentGDP);
        }
      }
    });

    return scenarios;
  };

  const generateRiskEvolution = (location: GlobalCityData, years: number) => {
    const riskEvolution = [];

    for (let year = 0; year <= years; year++) {
      let riskLevel = 5; // Base risk level (medium)

      // Infrastructure improvements reduce risk over time
      if (location.infrastructure.transportation > 8) riskLevel -= 0.5;
      if (location.infrastructure.digital > 8) riskLevel -= 0.5;

      // Economic stability factors
      if (location.businessEnvironment.corruptionIndex > 8) riskLevel -= 0.3;
      if (location.businessEnvironment.regulatoryQuality > 8) riskLevel -= 0.3;

      // Time-based improvements (assuming interventions)
      riskLevel = Math.max(1, riskLevel - (year * 0.1)); // Risk decreases over time with interventions

      // Add some year-specific risks
      if (year === 2) riskLevel += 0.5; // Implementation challenges
      if (year === 4) riskLevel -= 0.3; // Benefits start showing
      if (year >= 6) riskLevel = Math.max(2, riskLevel - 0.2); // Long-term stability

      riskEvolution.push({
        year: 2024 + year,
        riskLevel: Math.max(1, Math.min(10, riskLevel)),
        primaryRisks: getRisksForYear(year, riskLevel)
      });
    }

    return riskEvolution;
  };

  const getRisksForYear = (year: number, riskLevel: number): string[] => {
    const allRisks = [
      'Policy instability',
      'Infrastructure delays',
      'Labor skill gaps',
      'Market volatility',
      'Regulatory changes',
      'Competition pressure',
      'Technology disruption',
      'Funding constraints'
    ];

    // Return different risks based on year and risk level
    const riskCount = Math.min(allRisks.length, Math.ceil(riskLevel / 2));
    return allRisks.slice(0, riskCount);
  };

  const generateOpportunityWindows = (location: GlobalCityData, years: number) => {
    const opportunities = [
      {
        startYear: 2025,
        duration: 2,
        opportunityType: 'Infrastructure Development',
        potentialImpact: 7.5
      },
      {
        startYear: 2026,
        duration: 3,
        opportunityType: 'Technology Integration',
        potentialImpact: 8.2
      },
      {
        startYear: 2028,
        duration: 4,
        opportunityType: 'Market Expansion',
        potentialImpact: 9.1
      },
      {
        startYear: 2030,
        duration: 5,
        opportunityType: 'Innovation Ecosystem',
        potentialImpact: 8.8
      }
    ];

    return opportunities.filter(opp => opp.startYear <= 2024 + years);
  };

  const runPredictiveModel = async () => {
    setIsModeling(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      const growthScenarios = generateGrowthScenarios(location, timeHorizon);
      const riskEvolution = generateRiskEvolution(location, timeHorizon);
      const opportunityWindows = generateOpportunityWindows(location, timeHorizon);

      const predictiveModel: PredictiveModel = {
        location,
        timeHorizon,
        growthScenarios,
        riskEvolution,
        opportunityWindows
      };

      setModel(predictiveModel);
      onModelComplete(predictiveModel);

    } catch (error) {
      console.error('Predictive modeling failed:', error);
    } finally {
      setIsModeling(false);
    }
  };

  useEffect(() => {
    if (location.city) {
      runPredictiveModel();
    }
  }, [location, timeHorizon]);

  const chartData = model?.growthScenarios.map((scenario, index) => {
    const data: any = { year: 2024 };
    model.growthScenarios.forEach((s, i) => {
      data[s.scenario] = s.projectedGrowth[index] / 1000000000; // Convert to billions
    });
    return data;
  }) || [];

  // Add year data points
  for (let i = 1; i <= timeHorizon; i++) {
    const yearData: any = { year: 2024 + i };
    model?.growthScenarios.forEach((scenario) => {
      yearData[scenario.scenario] = scenario.projectedGrowth[i] / 1000000000;
    });
    chartData.push(yearData);
  }

  const riskData = model?.riskEvolution.map(risk => ({
    year: risk.year,
    riskLevel: risk.riskLevel,
    riskCount: risk.primaryRisks.length
  })) || [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shadow-md border border-green-200">
          <span className="text-2xl">📈</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Predictive Growth Model</h3>
          <p className="text-gray-600 text-sm">Forecast {timeHorizon}-year growth trajectories for {location.city}</p>
        </div>
      </div>

      {/* Model Controls */}
      <div className="mb-6">
        <button
          onClick={runPredictiveModel}
          disabled={isModeling}
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isModeling ? 'Running Predictive Model...' : 'Run Growth Forecast'}
        </button>
      </div>

      {model && (
        <div className="space-y-6">
          {/* Growth Scenarios Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">GDP Growth Projections (USD Billions)</h4>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`$${value.toFixed(1)}B`, '']} />
                  <Legend />
                  {model.growthScenarios.map((scenario, index) => (
                    <Line
                      key={scenario.scenario}
                      type="monotone"
                      dataKey={scenario.scenario}
                      stroke={['#8884d8', '#82ca9d', '#ffc658'][index]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scenario Details */}
          <div className="grid md:grid-cols-3 gap-4">
            {model.growthScenarios.map((scenario, index) => (
              <div key={scenario.scenario} className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2">{scenario.scenario}</h5>
                <div className="text-sm text-gray-600 mb-3">
                  <div>Probability: {(scenario.probability * 100).toFixed(0)}%</div>
                  <div className="mt-1">
                    Final GDP: ${(scenario.projectedGrowth[scenario.projectedGrowth.length - 1] / 1000000000).toFixed(1)}B
                  </div>
                </div>
                <div className="mb-3">
                  <div className="font-medium text-gray-700 mb-1">Key Drivers:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {scenario.keyDrivers.slice(0, 2).map((driver, i) => (
                      <li key={i}>• {driver}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Recommended Interventions:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {scenario.interventions.slice(0, 2).map((intervention, i) => (
                      <li key={i}>• {intervention}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Evolution */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="text-lg font-semibold text-red-800 mb-4">Risk Evolution Over Time</h4>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="riskLevel"
                    stroke="#dc2626"
                    fill="#fecaca"
                    name="Risk Level (1-10)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {model.riskEvolution.slice(0, 4).map((risk, index) => (
                <div key={risk.year} className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">Year {risk.year}</div>
                  <div className="text-sm text-gray-600">Risk Level: {risk.riskLevel.toFixed(1)}/10</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Key Risks: {risk.primaryRisks.slice(0, 2).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity Windows */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Strategic Opportunity Windows</h4>
            <div className="space-y-3">
              {model.opportunityWindows.map((opportunity, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-blue-900">{opportunity.opportunityType}</h5>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-700">
                        Impact: {opportunity.potentialImpact}/10
                      </div>
                      <div className="text-xs text-gray-500">
                        {opportunity.startYear} - {opportunity.startYear + opportunity.duration}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(opportunity.potentialImpact / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Strategic timing window for maximum impact and competitive advantage.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Strategic Recommendations</h4>
            <div className="space-y-2 text-sm text-green-700">
              <p>• <strong>Primary Scenario:</strong> Focus on {model.growthScenarios[1].scenario} (35% probability) for balanced risk-return profile</p>
              <p>• <strong>Risk Mitigation:</strong> Implement infrastructure improvements in years 1-2 to reduce long-term risk exposure</p>
              <p>• <strong>Opportunity Timing:</strong> Capitalize on technology integration window (2026-2029) for maximum growth impact</p>
              <p>• <strong>Monitoring Focus:</strong> Track risk levels quarterly and adjust interventions based on actual vs. projected performance</p>
            </div>
          </div>
        </div>
      )}

      {!model && !isModeling && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📈</div>
          <p>Click "Run Growth Forecast" to generate predictive models for {location.city}</p>
        </div>
      )}
    </div>
  );
};

export default PredictiveGrowthModel;