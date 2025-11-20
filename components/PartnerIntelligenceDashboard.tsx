import React, { useState, useEffect } from 'react';
import type { ReportParameters } from '../types';

interface PartnerProfile {
  id: string;
  name: string;
  type: 'government' | 'ngo' | 'academic' | 'community' | 'business' | 'international';
  credibilityScore: number;
  trackRecord: Array<{
    project: string;
    outcome: 'success' | 'partial' | 'failure';
    year: number;
    description: string;
  }>;
  expertise: string[];
  culturalContext: {
    communicationStyle: string;
    decisionMaking: string;
    relationshipBuilding: string;
    conflictResolution: string;
  };
  riskFactors: Array<{
    category: string;
    level: 'low' | 'medium' | 'high';
    description: string;
  }>;
  contactInfo: {
    primary: string;
    backup?: string;
    preferredMethod: 'email' | 'phone' | 'in-person' | 'formal-letter';
  };
  lastUpdated: string;
}

interface PartnerIntelligenceDashboardProps {
  params: Partial<ReportParameters>;
  onPartnerSelect?: (partner: PartnerProfile) => void;
}

const PartnerIntelligenceDashboard: React.FC<PartnerIntelligenceDashboardProps> = ({
  params,
  onPartnerSelect
}) => {
  const [partners, setPartners] = useState<PartnerProfile[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    const mockPartners: PartnerProfile[] = [
      {
        id: 'gov-ministry-energy',
        name: 'Ministry of Energy - Kenya',
        type: 'government',
        credibilityScore: 87,
        trackRecord: [
          { project: 'Solar Farm Initiative', outcome: 'success', year: 2023, description: 'Successfully implemented 200MW solar capacity' },
          { project: 'Rural Electrification', outcome: 'success', year: 2022, description: 'Connected 50,000 households to grid' }
        ],
        expertise: ['Energy Policy', 'Infrastructure Development', 'Regulatory Framework'],
        culturalContext: {
          communicationStyle: 'Formal and hierarchical',
          decisionMaking: 'Consensus-based with ministerial approval',
          relationshipBuilding: 'Long-term partnerships valued',
          conflictResolution: 'Mediation through formal channels'
        },
        riskFactors: [
          { category: 'Political', level: 'medium', description: 'Government changes can affect commitments' },
          { category: 'Bureaucratic', level: 'low', description: 'Standard approval processes in place' }
        ],
        contactInfo: {
          primary: 'perm-sec@energy.go.ke',
          preferredMethod: 'formal-letter'
        },
        lastUpdated: '2024-11-15'
      },
      {
        id: 'ngo-green-development',
        name: 'Green Development Initiative',
        type: 'ngo',
        credibilityScore: 92,
        trackRecord: [
          { project: 'Community Solar Training', outcome: 'success', year: 2023, description: 'Trained 500 local technicians' },
          { project: 'Sustainable Agriculture', outcome: 'success', year: 2022, description: 'Implemented in 20 villages' }
        ],
        expertise: ['Community Development', 'Sustainable Energy', 'Capacity Building'],
        culturalContext: {
          communicationStyle: 'Collaborative and community-focused',
          decisionMaking: 'Participatory with community input',
          relationshipBuilding: 'Trust-based, long-term engagement',
          conflictResolution: 'Community mediation preferred'
        },
        riskFactors: [
          { category: 'Funding', level: 'medium', description: 'Dependent on donor funding cycles' },
          { category: 'Capacity', level: 'low', description: 'Strong local network and expertise' }
        ],
        contactInfo: {
          primary: 'director@gdi.org',
          backup: '+254-700-123456',
          preferredMethod: 'email'
        },
        lastUpdated: '2024-11-18'
      },
      {
        id: 'academic-tech-university',
        name: 'Technical University of Kenya',
        type: 'academic',
        credibilityScore: 89,
        trackRecord: [
          { project: 'Engineering Research Partnership', outcome: 'success', year: 2023, description: 'Joint research on renewable energy' },
          { project: 'Student Internship Program', outcome: 'success', year: 2022, description: 'Placed 200 students in industry' }
        ],
        expertise: ['Engineering Education', 'Research & Development', 'Technical Training'],
        culturalContext: {
          communicationStyle: 'Academic and evidence-based',
          decisionMaking: 'Committee-based with academic review',
          relationshipBuilding: 'Knowledge-sharing and collaboration',
          conflictResolution: 'Academic dispute resolution processes'
        },
        riskFactors: [
          { category: 'Academic Calendar', level: 'low', description: 'Semester-based availability' },
          { category: 'Funding', level: 'medium', description: 'Research grant dependencies' }
        ],
        contactInfo: {
          primary: 'research@tukenya.ac.ke',
          preferredMethod: 'email'
        },
        lastUpdated: '2024-11-12'
      }
    ];
    setPartners(mockPartners);
  }, []);

  const filteredPartners = partners.filter(partner => {
    const matchesType = filterType === 'all' || partner.type === filterType;
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getCredibilityColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="partner-intelligence-dashboard space-y-6">
      <div className="bg-nexus-surface-800 p-6 rounded-xl border border-nexus-accent-cyan/30">
        <h2 className="text-2xl font-bold text-nexus-text-primary mb-4 flex items-center gap-3">
          <span className="text-nexus-accent-cyan">🤝</span>
          Partner Intelligence Dashboard
        </h2>
        <p className="text-nexus-text-secondary mb-6">
          Comprehensive intelligence on potential partners across government, NGO, academic, and community sectors.
          Build confidence through verified track records, cultural insights, and risk assessments.
        </p>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search partners by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg text-nexus-text-primary placeholder-nexus-text-muted focus:ring-2 focus:ring-nexus-accent-cyan focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'government', 'ngo', 'academic', 'community', 'business', 'international'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === type
                    ? 'bg-nexus-accent-cyan text-nexus-primary-900'
                    : 'bg-nexus-surface-700 text-nexus-text-secondary hover:bg-nexus-surface-600'
                }`}
              >
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Partner Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartners.map(partner => (
            <div
              key={partner.id}
              className="partner-card bg-nexus-surface-700 p-4 rounded-lg border border-nexus-border-medium hover:border-nexus-accent-cyan/50 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedPartner(partner);
                onPartnerSelect?.(partner);
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-nexus-text-primary text-lg">{partner.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    partner.type === 'government' ? 'bg-blue-900 text-blue-300' :
                    partner.type === 'ngo' ? 'bg-green-900 text-green-300' :
                    partner.type === 'academic' ? 'bg-purple-900 text-purple-300' :
                    partner.type === 'community' ? 'bg-orange-900 text-orange-300' :
                    'bg-gray-900 text-gray-300'
                  }`}>
                    {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getCredibilityColor(partner.credibilityScore)}`}>
                    {partner.credibilityScore}
                  </div>
                  <div className="text-xs text-nexus-text-secondary">Credibility</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-nexus-text-secondary mb-2">Key Expertise:</div>
                <div className="flex flex-wrap gap-1">
                  {partner.expertise.slice(0, 2).map(exp => (
                    <span key={exp} className="text-xs bg-nexus-surface-600 px-2 py-1 rounded">
                      {exp}
                    </span>
                  ))}
                  {partner.expertise.length > 2 && (
                    <span className="text-xs text-nexus-text-muted">+{partner.expertise.length - 2} more</span>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-nexus-text-secondary mb-1">Recent Success:</div>
                <div className="text-sm text-nexus-text-primary">
                  {partner.trackRecord[0]?.project || 'No recent projects'}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-nexus-text-secondary">
                <span>Risk Level: <span className={getRiskColor(partner.riskFactors[0]?.level || 'low')}>
                  {partner.riskFactors[0]?.level || 'low'}
                </span></span>
                <span>Updated: {new Date(partner.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Partner View Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-nexus-surface-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-nexus-border-medium">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-nexus-text-primary">{selectedPartner.name}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    selectedPartner.type === 'government' ? 'bg-blue-900 text-blue-300' :
                    selectedPartner.type === 'ngo' ? 'bg-green-900 text-green-300' :
                    selectedPartner.type === 'academic' ? 'bg-purple-900 text-purple-300' :
                    selectedPartner.type === 'community' ? 'bg-orange-900 text-orange-300' :
                    'bg-gray-900 text-gray-300'
                  }`}>
                    {selectedPartner.type.charAt(0).toUpperCase() + selectedPartner.type.slice(1)} Partner
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="text-nexus-text-secondary hover:text-nexus-text-primary text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Credibility Overview */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-nexus-surface-700 p-4 rounded-lg text-center">
                  <div className={`text-3xl font-bold ${getCredibilityColor(selectedPartner.credibilityScore)}`}>
                    {selectedPartner.credibilityScore}
                  </div>
                  <div className="text-sm text-nexus-text-secondary">Credibility Score</div>
                </div>
                <div className="bg-nexus-surface-700 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-nexus-accent-cyan">
                    {selectedPartner.trackRecord.length}
                  </div>
                  <div className="text-sm text-nexus-text-secondary">Projects Completed</div>
                </div>
                <div className="bg-nexus-surface-700 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-nexus-accent-brown">
                    {selectedPartner.expertise.length}
                  </div>
                  <div className="text-sm text-nexus-text-secondary">Expertise Areas</div>
                </div>
              </div>

              {/* Track Record */}
              <div>
                <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Track Record</h4>
                <div className="space-y-3">
                  {selectedPartner.trackRecord.map((record, index) => (
                    <div key={index} className="bg-nexus-surface-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-nexus-text-primary">{record.project}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${
                          record.outcome === 'success' ? 'bg-green-900 text-green-300' :
                          record.outcome === 'partial' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {record.outcome}
                        </span>
                      </div>
                      <p className="text-sm text-nexus-text-secondary">{record.description}</p>
                      <div className="text-xs text-nexus-text-muted mt-1">{record.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Context */}
              <div>
                <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Cultural & Communication Context</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h5 className="font-medium text-nexus-accent-cyan mb-2">Communication Style</h5>
                    <p className="text-sm text-nexus-text-secondary">{selectedPartner.culturalContext.communicationStyle}</p>
                  </div>
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h5 className="font-medium text-nexus-accent-cyan mb-2">Decision Making</h5>
                    <p className="text-sm text-nexus-text-secondary">{selectedPartner.culturalContext.decisionMaking}</p>
                  </div>
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h5 className="font-medium text-nexus-accent-cyan mb-2">Relationship Building</h5>
                    <p className="text-sm text-nexus-text-secondary">{selectedPartner.culturalContext.relationshipBuilding}</p>
                  </div>
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h5 className="font-medium text-nexus-accent-cyan mb-2">Conflict Resolution</h5>
                    <p className="text-sm text-nexus-text-secondary">{selectedPartner.culturalContext.conflictResolution}</p>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div>
                <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Risk Assessment</h4>
                <div className="space-y-3">
                  {selectedPartner.riskFactors.map((risk, index) => (
                    <div key={index} className="bg-nexus-surface-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-nexus-text-primary">{risk.category} Risk</h5>
                        <span className={`text-sm px-2 py-1 rounded ${getRiskColor(risk.level)} bg-current bg-opacity-20`}>
                          {risk.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-nexus-text-secondary">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Contact Information</h4>
                <div className="bg-nexus-surface-700 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-nexus-text-secondary">Primary Contact: </span>
                      <span className="text-sm text-nexus-text-primary">{selectedPartner.contactInfo.primary}</span>
                    </div>
                    {selectedPartner.contactInfo.backup && (
                      <div>
                        <span className="text-sm font-medium text-nexus-text-secondary">Backup Contact: </span>
                        <span className="text-sm text-nexus-text-primary">{selectedPartner.contactInfo.backup}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-medium text-nexus-text-secondary">Preferred Method: </span>
                      <span className="text-sm text-nexus-accent-cyan capitalize">{selectedPartner.contactInfo.preferredMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerIntelligenceDashboard;