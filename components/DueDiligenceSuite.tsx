import React, { useState, useEffect } from 'react';

interface DueDiligenceCheck {
  id: string;
  category: 'legal' | 'financial' | 'reputational' | 'operational' | 'compliance';
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: 'pass' | 'fail' | 'warning' | 'inconclusive';
  details?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  lastChecked?: string;
  automated: boolean;
}

interface DueDiligenceSuiteProps {
  partnerName?: string;
  partnerType?: string;
  onDueDiligenceComplete?: (results: DueDiligenceCheck[]) => void;
}

const DueDiligenceSuite: React.FC<DueDiligenceSuiteProps> = ({
  partnerName = 'Sample Partner',
  partnerType = 'organization',
  onDueDiligenceComplete
}) => {
  const [checks, setChecks] = useState<DueDiligenceCheck[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Initialize due diligence checks
  useEffect(() => {
    const initialChecks: DueDiligenceCheck[] = [
      {
        id: 'legal-registration',
        category: 'legal',
        title: 'Legal Registration & Incorporation',
        description: 'Verify official registration, incorporation documents, and legal status',
        status: 'pending',
        automated: true
      },
      {
        id: 'financial-health',
        category: 'financial',
        title: 'Financial Health Assessment',
        description: 'Review financial statements, credit ratings, and fiscal stability',
        status: 'pending',
        automated: true
      },
      {
        id: 'reputational-review',
        category: 'reputational',
        title: 'Reputational Analysis',
        description: 'Check news, social media, and industry reputation',
        status: 'pending',
        automated: true
      },
      {
        id: 'operational-capacity',
        category: 'operational',
        title: 'Operational Capacity',
        description: 'Assess infrastructure, staffing, and operational capabilities',
        status: 'pending',
        automated: false
      },
      {
        id: 'compliance-record',
        category: 'compliance',
        title: 'Regulatory Compliance',
        description: 'Verify licenses, certifications, and compliance history',
        status: 'pending',
        automated: true
      },
      {
        id: 'ownership-structure',
        category: 'legal',
        title: 'Ownership & Control Structure',
        description: 'Map ownership hierarchy and control relationships',
        status: 'pending',
        automated: true
      },
      {
        id: 'litigation-history',
        category: 'legal',
        title: 'Litigation & Legal Disputes',
        description: 'Review past and ongoing legal proceedings',
        status: 'pending',
        automated: true
      },
      {
        id: 'supply-chain',
        category: 'operational',
        title: 'Supply Chain Integrity',
        description: 'Assess supplier relationships and dependencies',
        status: 'pending',
        automated: false
      }
    ];

    setChecks(initialChecks);
  }, [partnerName, partnerType]);

  const runDueDiligence = async () => {
    setIsRunning(true);

    // Simulate running automated checks
    for (let i = 0; i < checks.length; i++) {
      if (!checks[i].automated) continue;

      setChecks(prev => prev.map((check, index) =>
        index === i ? { ...check, status: 'running' } : check
      ));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

      // Mock results - in real implementation, this would come from APIs
      const mockResults = {
        'legal-registration': { result: 'pass', riskLevel: 'low', details: 'Valid registration confirmed with current status' },
        'financial-health': { result: 'warning', riskLevel: 'medium', details: 'Stable financial position with moderate debt levels' },
        'reputational-review': { result: 'pass', riskLevel: 'low', details: 'Positive industry reputation with no major controversies' },
        'compliance-record': { result: 'pass', riskLevel: 'low', details: 'All required licenses and certifications current' },
        'ownership-structure': { result: 'pass', riskLevel: 'low', details: 'Clear ownership structure with transparent governance' },
        'litigation-history': { result: 'warning', riskLevel: 'medium', details: 'Minor historical disputes, all resolved favorably' }
      };

      const result = mockResults[checks[i].id as keyof typeof mockResults] || {
        result: 'inconclusive',
        riskLevel: 'medium',
        details: 'Unable to complete automated verification'
      };

      setChecks(prev => prev.map((check, index) =>
        index === i ? {
          ...check,
          status: 'completed',
          result: result.result as any,
          riskLevel: result.riskLevel as any,
          details: result.details,
          lastChecked: new Date().toISOString()
        } : check
      ));
    }

    setIsRunning(false);
    onDueDiligenceComplete?.(checks);
  };

  const filteredChecks = checks.filter(check =>
    selectedCategory === 'all' || check.category === selectedCategory
  );

  const getStatusColor = (status: string, result?: string) => {
    if (status === 'running') return 'text-blue-400';
    if (status === 'failed') return 'text-red-400';
    if (status === 'completed') {
      switch (result) {
        case 'pass': return 'text-green-400';
        case 'fail': return 'text-red-400';
        case 'warning': return 'text-yellow-400';
        default: return 'text-gray-400';
      }
    }
    return 'text-gray-400';
  };

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const overallRisk = React.useMemo(() => {
    const completedChecks = checks.filter(c => c.status === 'completed' && c.result);
    if (completedChecks.length === 0) return 'unknown';

    const highRisk = completedChecks.filter(c => c.riskLevel === 'high').length;
    const mediumRisk = completedChecks.filter(c => c.riskLevel === 'medium').length;

    if (highRisk > 0) return 'high';
    if (mediumRisk > 2) return 'high';
    if (mediumRisk > 0) return 'medium';
    return 'low';
  }, [checks]);

  const completedCount = checks.filter(c => c.status === 'completed').length;
  const totalAutomated = checks.filter(c => c.automated).length;

  return (
    <div className="due-diligence-suite space-y-6">
      <div className="bg-nexus-surface-800 p-6 rounded-xl border border-nexus-accent-cyan/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-nexus-text-primary flex items-center gap-3">
              <span className="text-nexus-accent-cyan">🔍</span>
              Due Diligence Suite
            </h2>
            <p className="text-nexus-text-secondary mt-1">
              Comprehensive background verification for {partnerName} ({partnerType})
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getRiskColor(overallRisk)}`}>
              {overallRisk.toUpperCase()}
            </div>
            <div className="text-sm text-nexus-text-secondary">Overall Risk</div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-nexus-surface-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-nexus-accent-cyan">{completedCount}</div>
            <div className="text-sm text-nexus-text-secondary">Checks Completed</div>
          </div>
          <div className="bg-nexus-surface-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-nexus-accent-brown">{totalAutomated}</div>
            <div className="text-sm text-nexus-text-secondary">Automated Checks</div>
          </div>
          <div className="bg-nexus-surface-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-nexus-text-primary">{checks.length - totalAutomated}</div>
            <div className="text-sm text-nexus-text-secondary">Manual Reviews</div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            {['all', 'legal', 'financial', 'reputational', 'operational', 'compliance'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-nexus-accent-cyan text-nexus-primary-900'
                    : 'bg-nexus-surface-700 text-nexus-text-secondary hover:bg-nexus-surface-600'
                }`}
              >
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={runDueDiligence}
            disabled={isRunning}
            className="px-6 py-2 bg-nexus-accent-cyan text-nexus-primary-900 font-bold rounded-lg hover:bg-nexus-accent-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-nexus-primary-900 border-t-transparent rounded-full animate-spin"></div>
                Running Checks...
              </>
            ) : (
              <>
                <span>🔍</span>
                Run Due Diligence
              </>
            )}
          </button>
        </div>

        {/* Checks List */}
        <div className="space-y-3">
          {filteredChecks.map(check => (
            <div key={check.id} className="bg-nexus-surface-700 p-4 rounded-lg border border-nexus-border-medium">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-nexus-text-primary">{check.title}</h3>
                    {check.automated && (
                      <span className="px-2 py-1 bg-nexus-accent-cyan/20 text-nexus-accent-cyan text-xs rounded">
                        Automated
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded ${
                      check.category === 'legal' ? 'bg-blue-900 text-blue-300' :
                      check.category === 'financial' ? 'bg-green-900 text-green-300' :
                      check.category === 'reputational' ? 'bg-purple-900 text-purple-300' :
                      check.category === 'operational' ? 'bg-orange-900 text-orange-300' :
                      'bg-gray-900 text-gray-300'
                    }`}>
                      {check.category}
                    </span>
                  </div>
                  <p className="text-sm text-nexus-text-secondary">{check.description}</p>
                </div>

                <div className="text-right ml-4">
                  <div className={`text-sm font-bold ${getStatusColor(check.status, check.result)}`}>
                    {check.status === 'running' && 'Running...'}
                    {check.status === 'completed' && check.result && check.result.toUpperCase()}
                    {check.status === 'pending' && 'Pending'}
                    {check.status === 'failed' && 'Failed'}
                  </div>
                  {check.riskLevel && (
                    <div className={`text-xs ${getRiskColor(check.riskLevel)}`}>
                      Risk: {check.riskLevel}
                    </div>
                  )}
                </div>
              </div>

              {check.details && (
                <div className="mt-3 p-3 bg-nexus-surface-600 rounded border-l-4 border-nexus-accent-cyan">
                  <p className="text-sm text-nexus-text-secondary">{check.details}</p>
                  {check.lastChecked && (
                    <p className="text-xs text-nexus-text-muted mt-1">
                      Last checked: {new Date(check.lastChecked).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {!check.automated && check.status === 'pending' && (
                <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <p className="text-sm text-yellow-300">
                    This check requires manual review. Please provide additional documentation or schedule an in-person assessment.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Risk Summary */}
        {completedCount > 0 && (
          <div className="mt-6 p-4 bg-nexus-surface-700 rounded-lg border border-nexus-border-medium">
            <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Risk Assessment Summary</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {checks.filter(c => c.riskLevel === 'low').length}
                </div>
                <div className="text-sm text-nexus-text-secondary">Low Risk</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {checks.filter(c => c.riskLevel === 'medium').length}
                </div>
                <div className="text-sm text-nexus-text-secondary">Medium Risk</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {checks.filter(c => c.riskLevel === 'high').length}
                </div>
                <div className="text-sm text-nexus-text-secondary">High Risk</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${getRiskColor(overallRisk)}`}>
                  {overallRisk.toUpperCase()}
                </div>
                <div className="text-sm text-nexus-text-secondary">Overall</div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-6 p-4 bg-nexus-surface-700 rounded-lg border border-nexus-accent-cyan/30">
          <h3 className="text-lg font-semibold text-nexus-accent-cyan mb-3">Due Diligence Recommendations</h3>
          <div className="space-y-2 text-sm text-nexus-text-secondary">
            <p>• <strong>Legal Review:</strong> Consult local legal counsel for jurisdiction-specific requirements</p>
            <p>• <strong>Site Visit:</strong> Schedule physical inspection of facilities and operations</p>
            <p>• <strong>Reference Checks:</strong> Contact previous partners and clients for testimonials</p>
            <p>• <strong>Financial Audit:</strong> Request audited financial statements for the past 3 years</p>
            <p>• <strong>Insurance Review:</strong> Ensure adequate coverage for partnership risks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueDiligenceSuite;