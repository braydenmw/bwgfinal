import React, { useState } from 'react';
import type { StakeholderPerspective } from '../types.ts';
import { STAKEHOLDER_PERSPECTIVES } from '../constants.tsx';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface StakeholderPerspectiveModuleProps {
  selectedPerspectives: string[];
  onPerspectiveChange: (perspectives: string[]) => void;
  primaryObjective: string;
}

const StakeholderPerspectiveModule: React.FC<StakeholderPerspectiveModuleProps> = ({
  selectedPerspectives,
  onPerspectiveChange,
  primaryObjective
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const allPerspectives = Object.keys(STAKEHOLDER_PERSPECTIVES);
  const selectedPerspectiveData = selectedPerspectives
    .map(key => ({ key, ...STAKEHOLDER_PERSPECTIVES[key] }))
    .filter(p => p.persona);

  const handlePerspectiveToggle = (perspective: string) => {
    if (selectedPerspectives.includes(perspective)) {
      onPerspectiveChange(selectedPerspectives.filter(p => p !== perspective));
    } else {
      onPerspectiveChange([...selectedPerspectives, perspective]);
    }
  };

  const getPriorityScore = (perspective: StakeholderPerspective, objective: string): number => {
    // Simple scoring based on objective keywords
    const objectiveLower = objective.toLowerCase();
    let score = 5; // Base score

    if (objectiveLower.includes('economic growth') && perspective.priorities.includes('Economic Growth')) score += 3;
    if (objectiveLower.includes('job') && perspective.priorities.includes('Job Creation')) score += 3;
    if (objectiveLower.includes('investment') && perspective.priorities.includes('Political Capital')) score += 2;
    if (objectiveLower.includes('sustainable') && perspective.priorities.includes('Sustainability')) score += 3;
    if (objectiveLower.includes('market access') && perspective.priorities.includes('Operational Efficiency')) score += 2;
    if (objectiveLower.includes('profit') && perspective.priorities.includes('Profit Margins')) score += 3;
    if (objectiveLower.includes('return') && perspective.priorities.includes('Risk-Adjusted Returns')) score += 3;
    if (objectiveLower.includes('research') && perspective.priorities.includes('Research Impact')) score += 3;
    if (objectiveLower.includes('community') && perspective.priorities.includes('Quality of Life')) score += 3;

    return Math.min(score, 10);
  };

  const radarData = selectedPerspectiveData.map(perspective => ({
    perspective: perspective.persona,
    'Economic Growth': perspective.priorities.includes('Economic Growth') ? getPriorityScore(perspective, primaryObjective) : 0,
    'Job Creation': perspective.priorities.includes('Job Creation') ? getPriorityScore(perspective, primaryObjective) : 0,
    'Sustainability': perspective.priorities.includes('Sustainability') ? getPriorityScore(perspective, primaryObjective) : 0,
    'Market Access': perspective.priorities.includes('Operational Efficiency') ? getPriorityScore(perspective, primaryObjective) : 0,
    'Risk Management': perspective.priorities.includes('Risk Mitigation') ? getPriorityScore(perspective, primaryObjective) : 0,
    'Innovation': perspective.priorities.includes('Scalability') ? getPriorityScore(perspective, primaryObjective) : 0
  }));

  const priorityComparisonData = selectedPerspectiveData.map(perspective => ({
    stakeholder: perspective.persona,
    priorityScore: getPriorityScore(perspective, primaryObjective),
    concernLevel: perspective.concerns.length,
    metricCount: perspective.successMetrics.length
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shadow-md border border-purple-200">
          <span className="text-2xl">👥</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Stakeholder Perspective Analysis</h3>
          <p className="text-gray-600 text-sm">Understand how different stakeholders view your objectives</p>
        </div>
      </div>

      {/* Stakeholder Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Select Stakeholders to Analyze</h4>
        <div className="grid md:grid-cols-3 gap-3">
          {allPerspectives.map((perspective) => {
            const data = STAKEHOLDER_PERSPECTIVES[perspective];
            const isSelected = selectedPerspectives.includes(perspective);

            return (
              <label key={perspective} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'border-purple-300 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-200'
              }`}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handlePerspectiveToggle(perspective)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <div>
                  <div className="font-medium text-gray-900">{data.persona}</div>
                  <div className="text-xs text-gray-500">{data.priorities.slice(0, 2).join(', ')}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Analysis Tabs */}
      {selectedPerspectiveData.length > 0 && (
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            {['overview', 'priorities', 'concerns', 'alignment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Stakeholder Overview</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedPerspectiveData.map((perspective) => (
                    <div key={perspective.key} className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">{perspective.persona}</h5>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Priorities:</span>
                          <span className="text-gray-600 ml-1">{perspective.priorities.slice(0, 3).join(', ')}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Key Concerns:</span>
                          <span className="text-gray-600 ml-1">{perspective.concerns.slice(0, 2).join(', ')}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Success Metrics:</span>
                          <span className="text-gray-600 ml-1">{perspective.successMetrics.length} defined</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'priorities' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Priority Alignment Analysis</h4>
                <div style={{ width: '100%', height: 400 }}>
                  <ResponsiveContainer>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="perspective" />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} />
                      <Radar name="Economic Growth" dataKey="Economic Growth" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
                      <Radar name="Job Creation" dataKey="Job Creation" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
                      <Radar name="Sustainability" dataKey="Sustainability" stroke="#ffc658" fill="#ffc658" fillOpacity={0.1} />
                      <Radar name="Market Access" dataKey="Market Access" stroke="#ff7300" fill="#ff7300" fillOpacity={0.1} />
                      <Radar name="Risk Management" dataKey="Risk Management" stroke="#00ff00" fill="#00ff00" fillOpacity={0.1} />
                      <Radar name="Innovation" dataKey="Innovation" stroke="#ff0000" fill="#ff0000" fillOpacity={0.1} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'concerns' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Stakeholder Concerns & Priorities</h4>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={priorityComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stakeholder" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="priorityScore" fill="#8884d8" name="Priority Alignment Score" />
                      <Bar dataKey="concernLevel" fill="#82ca9d" name="Number of Concerns" />
                      <Bar dataKey="metricCount" fill="#ffc658" name="Success Metrics" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'alignment' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Objective Alignment Analysis</h4>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">Primary Objective: "{primaryObjective}"</h5>
                  <div className="space-y-3">
                    {selectedPerspectiveData.map((perspective) => {
                      const alignmentScore = getPriorityScore(perspective, primaryObjective);
                      const alignment = alignmentScore >= 7 ? 'High' :
                                       alignmentScore >= 5 ? 'Medium' : 'Low';

                      return (
                        <div key={perspective.key} className="flex items-center justify-between bg-white p-3 rounded border">
                          <div>
                            <span className="font-medium text-gray-900">{perspective.persona}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              Alignment: {alignment}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  alignment === 'High' ? 'bg-green-500' :
                                  alignment === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${(alignmentScore / 10) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 w-8">
                              {alignmentScore}/10
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-900 mb-2">Strategic Recommendations</h5>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Focus on stakeholders with high alignment scores first</li>
                    <li>• Address concerns of stakeholders with multiple risk factors</li>
                    <li>• Develop communication strategies tailored to each stakeholder's priorities</li>
                    <li>• Create success metrics that matter to all key stakeholders</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedPerspectiveData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">👥</div>
          <p>Select stakeholders above to analyze their perspectives on your objectives</p>
        </div>
      )}
    </div>
  );
};

export default StakeholderPerspectiveModule;