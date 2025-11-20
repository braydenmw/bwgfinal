import React, { useState, useEffect } from 'react';

interface RegionalComfortMetrics {
  safetyIndex: number; // 0-100
  politicalStability: number; // 0-100
  businessEnvironment: number; // 0-100
  infrastructure: number; // 0-100
  healthcare: number; // 0-100
  connectivity: number; // 0-100
  costOfLiving: number; // 0-100 (lower is better)
  easeOfDoingBusiness: number; // 0-100
}

interface CulturalInsights {
  greeting: string;
  businessHours: string;
  holidays: string[];
  communication: {
    directness: 'high' | 'medium' | 'low';
    hierarchy: 'high' | 'medium' | 'low';
    relationshipBuilding: string;
  };
  etiquette: string[];
  taboos: string[];
}

interface LogisticsSupport {
  visaRequirements: string;
  transportation: string[];
  accommodation: string[];
  emergencyContacts: Array<{
    service: string;
    number: string;
    english: boolean;
  }>;
  insurance: string[];
}

interface RegionalComfortData {
  region: string;
  country: string;
  metrics: RegionalComfortMetrics;
  culturalInsights: CulturalInsights;
  logisticsSupport: LogisticsSupport;
  comfortScore: number; // Overall 0-100
  lastUpdated: string;
}

interface RegionalComfortIndexProps {
  region?: string;
  country?: string;
  onComfortUpdate?: (comfortData: RegionalComfortData) => void;
}

const RegionalComfortIndex: React.FC<RegionalComfortIndexProps> = ({
  region = 'East Africa',
  country = 'Kenya',
  onComfortUpdate
}) => {
  const [comfortData, setComfortData] = useState<RegionalComfortData | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<'overview' | 'safety' | 'culture' | 'logistics'>('overview');

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    const mockData: RegionalComfortData = {
      region,
      country,
      metrics: {
        safetyIndex: 72,
        politicalStability: 68,
        businessEnvironment: 75,
        infrastructure: 71,
        healthcare: 65,
        connectivity: 78,
        costOfLiving: 45, // Lower is better
        easeOfDoingBusiness: 73
      },
      culturalInsights: {
        greeting: "Kenya has a rich cultural heritage with 42 ethnic groups. Business culture emphasizes relationship-building and respect for hierarchy.",
        businessHours: "Monday-Friday: 8:00 AM - 5:00 PM, Lunch: 1:00-2:00 PM",
        holidays: ["New Year's Day", "Good Friday", "Easter Monday", "Labour Day", "Madaraka Day", "Jamhuri Day", "Christmas Day"],
        communication: {
          directness: 'medium',
          hierarchy: 'high',
          relationshipBuilding: 'Personal relationships are crucial for business success'
        },
        etiquette: [
          "Always greet elders and superiors first",
          "Use titles and surnames until invited to use first names",
          "Business cards are exchanged with both hands",
          "Punctuality is appreciated but flexibility is common",
          "Gift giving is common but avoid expensive items initially"
        ],
        taboos: [
          "Avoid discussing politics unless you know the person's views",
          "Don't use left hand for eating or giving items",
          "Avoid showing soles of feet",
          "Don't point with index finger"
        ]
      },
      logisticsSupport: {
        visaRequirements: "East African Tourist Visa available. Business visas require invitation letter and company documentation.",
        transportation: [
          "Jomo Kenyatta International Airport (NBO) - Well connected",
          "Matatus (minibus taxis) for local transport",
          "Ride-hailing apps (Uber, Bolt, Little) available",
          "Rail connection to Tanzania and Uganda"
        ],
        accommodation: [
          "International hotels in Nairobi and major cities",
          "Serviced apartments for longer stays",
          "Budget guesthouses in rural areas",
          "Home stays for cultural immersion"
        ],
        emergencyContacts: [
          { service: "Police Emergency", number: "999", english: true },
          { service: "Fire Emergency", number: "999", english: true },
          { service: "Ambulance", number: "999", english: true },
          { service: "Tourist Police", number: "+254-719-230-000", english: true },
          { service: "Kenya Airways", number: "+254-711-101-000", english: true }
        ],
        insurance: [
          "Travel insurance mandatory for visa",
          "Medical evacuation coverage recommended",
          "Business interruption insurance",
          "Political risk insurance for investments"
        ]
      },
      comfortScore: 71,
      lastUpdated: '2024-11-15'
    };

    setComfortData(mockData);
    onComfortUpdate?.(mockData);
  }, [region, country, onComfortUpdate]);

  if (!comfortData) {
    return (
      <div className="regional-comfort-loading bg-nexus-surface-800 p-6 rounded-xl border border-nexus-accent-cyan/30">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-nexus-surface-700 rounded w-1/3"></div>
          <div className="h-4 bg-nexus-surface-700 rounded w-1/2"></div>
          <div className="h-32 bg-nexus-surface-700 rounded"></div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number, invert: boolean = false) => {
    const effectiveScore = invert ? 100 - score : score;
    if (effectiveScore >= 80) return 'text-green-400';
    if (effectiveScore >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const MetricBar = ({ label, value, invert = false }: { label: string; value: number; invert?: boolean }) => (
    <div className="bg-nexus-surface-700 p-3 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-nexus-text-secondary">{label}</span>
        <span className={`text-sm font-bold ${getScoreColor(value, invert)}`}>{value}/100</span>
      </div>
      <div className="w-full bg-nexus-surface-600 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            invert
              ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500'
              : 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500'
          }`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="regional-comfort-index space-y-6">
      <div className="bg-nexus-surface-800 p-6 rounded-xl border border-nexus-accent-cyan/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-nexus-text-primary flex items-center gap-3">
              <span className="text-nexus-accent-cyan">🛡️</span>
              Regional Comfort Index
            </h2>
            <p className="text-nexus-text-secondary mt-1">
              {comfortData.country}, {comfortData.region} - Building confidence for successful engagement
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(comfortData.comfortScore)}`}>
              {comfortData.comfortScore}
            </div>
            <div className="text-sm text-nexus-text-secondary">Comfort Score</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-nexus-border-medium">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'safety', label: 'Safety & Environment', icon: '🛡️' },
            { id: 'culture', label: 'Culture & Etiquette', icon: '🤝' },
            { id: 'logistics', label: 'Logistics & Support', icon: '🚀' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedAspect(tab.id as any)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 ${
                selectedAspect === tab.id
                  ? 'bg-nexus-accent-cyan text-nexus-primary-900 border-b-2 border-nexus-accent-cyan'
                  : 'text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-surface-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Areas */}
        {selectedAspect === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-nexus-accent-cyan/10 to-nexus-accent-brown/10 p-4 rounded-lg border border-nexus-accent-cyan/30">
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-2">Welcome to {comfortData.country}</h3>
              <p className="text-nexus-text-secondary">{comfortData.culturalInsights.greeting}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-4">Key Comfort Indicators</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricBar label="Safety Index" value={comfortData.metrics.safetyIndex} />
                <MetricBar label="Business Environment" value={comfortData.metrics.businessEnvironment} />
                <MetricBar label="Infrastructure" value={comfortData.metrics.infrastructure} />
                <MetricBar label="Healthcare" value={comfortData.metrics.healthcare} />
                <MetricBar label="Connectivity" value={comfortData.metrics.connectivity} />
                <MetricBar label="Cost of Living" value={comfortData.metrics.costOfLiving} invert />
                <MetricBar label="Political Stability" value={comfortData.metrics.politicalStability} />
                <MetricBar label="Ease of Doing Business" value={comfortData.metrics.easeOfDoingBusiness} />
              </div>
            </div>

            <div className="bg-nexus-surface-700 p-4 rounded-lg">
              <h4 className="font-semibold text-nexus-accent-cyan mb-2">💡 Confidence Building Tips</h4>
              <ul className="text-sm text-nexus-text-secondary space-y-1">
                <li>• Start with local partners who understand both cultures</li>
                <li>• Schedule initial meetings during standard business hours</li>
                <li>• Prepare for relationship-focused communication style</li>
                <li>• Have contingency plans for transportation and connectivity</li>
                <li>• Research local customs and appropriate business attire</li>
              </ul>
            </div>
          </div>
        )}

        {selectedAspect === 'safety' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-4">Safety & Security</h3>
                <div className="space-y-4">
                  <MetricBar label="Overall Safety" value={comfortData.metrics.safetyIndex} />
                  <MetricBar label="Political Stability" value={comfortData.metrics.politicalStability} />
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-2">Safety Recommendations</h4>
                    <ul className="text-sm text-nexus-text-secondary space-y-1">
                      <li>• Use reputable transportation services</li>
                      <li>• Stay in well-established areas</li>
                      <li>• Keep emergency contacts readily available</li>
                      <li>• Register with your embassy if required</li>
                      <li>• Purchase comprehensive travel insurance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-4">Business Environment</h3>
                <div className="space-y-4">
                  <MetricBar label="Business Environment" value={comfortData.metrics.businessEnvironment} />
                  <MetricBar label="Ease of Doing Business" value={comfortData.metrics.easeOfDoingBusiness} />
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-2">Business Considerations</h4>
                    <ul className="text-sm text-nexus-text-secondary space-y-1">
                      <li>• Understand local regulatory requirements</li>
                      <li>• Build relationships before formal agreements</li>
                      <li>• Be prepared for bureaucratic processes</li>
                      <li>• Consider local business partners</li>
                      <li>• Plan for currency and banking differences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedAspect === 'culture' && (
          <div className="space-y-6">
            <div className="bg-nexus-surface-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Communication & Business Culture</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-nexus-accent-cyan capitalize">
                    {comfortData.culturalInsights.communication.directness}
                  </div>
                  <div className="text-sm text-nexus-text-secondary">Directness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nexus-accent-cyan capitalize">
                    {comfortData.culturalInsights.communication.hierarchy}
                  </div>
                  <div className="text-sm text-nexus-text-secondary">Hierarchy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nexus-accent-cyan">
                    Relationship
                  </div>
                  <div className="text-sm text-nexus-text-secondary">Focus</div>
                </div>
              </div>
              <p className="text-sm text-nexus-text-secondary">
                {comfortData.culturalInsights.communication.relationshipBuilding}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Business Etiquette</h3>
                <ul className="space-y-2">
                  {comfortData.culturalInsights.etiquette.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-nexus-surface-700 rounded-lg">
                      <span className="text-nexus-accent-cyan mt-1">•</span>
                      <span className="text-sm text-nexus-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Cultural Considerations</h3>
                <div className="space-y-3">
                  <div className="bg-nexus-surface-700 p-3 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-1">Business Hours</h4>
                    <p className="text-sm text-nexus-text-secondary">{comfortData.culturalInsights.businessHours}</p>
                  </div>
                  <div className="bg-nexus-surface-700 p-3 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-1">Major Holidays</h4>
                    <p className="text-sm text-nexus-text-secondary">{comfortData.culturalInsights.holidays.slice(0, 3).join(', ')}</p>
                  </div>
                  <div className="bg-nexus-surface-700 p-3 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-brown mb-1">Important Taboos</h4>
                    <ul className="text-sm text-nexus-text-secondary space-y-1">
                      {comfortData.culturalInsights.taboos.map((taboo, index) => (
                        <li key={index}>• {taboo}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedAspect === 'logistics' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Travel & Visa Requirements</h3>
                <div className="space-y-3">
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-2">Visa Information</h4>
                    <p className="text-sm text-nexus-text-secondary">{comfortData.logisticsSupport.visaRequirements}</p>
                  </div>
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-2">Transportation Options</h4>
                    <ul className="text-sm text-nexus-text-secondary space-y-1">
                      {comfortData.logisticsSupport.transportation.map((option, index) => (
                        <li key={index}>• {option}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Accommodation & Insurance</h3>
                <div className="space-y-3">
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-2">Accommodation Options</h4>
                    <ul className="text-sm text-nexus-text-secondary space-y-1">
                      {comfortData.logisticsSupport.accommodation.map((option, index) => (
                        <li key={index}>• {option}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-2">Recommended Insurance</h4>
                    <ul className="text-sm text-nexus-text-secondary space-y-1">
                      {comfortData.logisticsSupport.insurance.map((type, index) => (
                        <li key={index}>• {type}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Emergency Contacts</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comfortData.logisticsSupport.emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-nexus-surface-700 p-4 rounded-lg">
                    <h4 className="font-medium text-nexus-accent-cyan mb-1">{contact.service}</h4>
                    <p className="text-sm font-mono text-nexus-text-primary mb-1">{contact.number}</p>
                    <p className="text-xs text-nexus-text-secondary">
                      {contact.english ? 'English speaking' : 'Local language'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-nexus-border-medium">
          <div className="flex justify-between items-center text-sm text-nexus-text-secondary">
            <span>Last updated: {new Date(comfortData.lastUpdated).toLocaleDateString()}</span>
            <span className="text-nexus-accent-cyan">Data sources: World Bank, UN, Local Authorities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalComfortIndex;