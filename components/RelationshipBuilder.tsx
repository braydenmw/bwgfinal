import React, { useState, useEffect } from 'react';

interface CommunicationTemplate {
  id: string;
  name: string;
  category: 'introduction' | 'follow-up' | 'negotiation' | 'problem-solving' | 'celebration';
  partnerType: string;
  formality: 'formal' | 'semi-formal' | 'casual';
  content: string;
  tips: string[];
}

interface CulturalPreparation {
  partnerType: string;
  keyPhrases: Array<{
    local: string;
    english: string;
    context: string;
  }>;
  meetingEtiquette: string[];
  giftGuidelines: string[];
  communicationDoDont: Array<{
    do: string;
    dont: string;
  }>;
}

interface RelationshipMilestone {
  id: string;
  title: string;
  description: string;
  timeline: string;
  completed: boolean;
  category: 'trust-building' | 'communication' | 'collaboration' | 'commitment';
}

interface RelationshipBuilderProps {
  partnerType?: string;
  partnerName?: string;
  onTemplateSelect?: (template: CommunicationTemplate) => void;
  onMilestoneUpdate?: (milestones: RelationshipMilestone[]) => void;
}

const RelationshipBuilder: React.FC<RelationshipBuilderProps> = ({
  partnerType = 'government',
  partnerName = 'Partner Organization',
  onTemplateSelect,
  onMilestoneUpdate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('introduction');
  const [selectedFormality, setSelectedFormality] = useState<string>('formal');
  const [milestones, setMilestones] = useState<RelationshipMilestone[]>([]);
  const [culturalPrep, setCulturalPrep] = useState<CulturalPreparation | null>(null);

  // Communication templates
  const templates: CommunicationTemplate[] = [
    {
      id: 'gov-intro-formal',
      name: 'Government Partnership Introduction',
      category: 'introduction',
      partnerType: 'government',
      formality: 'formal',
      content: `Dear [Minister/Director Name],

I am writing to express our strong interest in exploring partnership opportunities with [Government Agency Name] in the area of [specific area of collaboration].

Our organization has extensive experience in [relevant expertise] and we believe there is significant potential for mutually beneficial collaboration that could contribute to [national/regional development goals].

We would welcome the opportunity to discuss how our capabilities might support [specific government priorities or initiatives].

Thank you for considering this partnership opportunity. We look forward to the possibility of working together for the benefit of [country/region].

Best regards,
[Your Name]
[Your Position]
[Your Organization]`,
      tips: [
        'Research the specific government priorities and use them in your communication',
        'Be prepared to provide detailed information about your organization\'s track record',
        'Follow up with a formal letter if initial contact is via email',
        'Allow sufficient time for government processes and decision-making'
      ]
    },
    {
      id: 'ngo-intro-semi-formal',
      name: 'NGO Partnership Introduction',
      category: 'introduction',
      partnerType: 'ngo',
      formality: 'semi-formal',
      content: `Dear [Contact Person],

I hope this email finds you well. My name is [Your Name] and I work with [Your Organization] as [Your Position].

We're reaching out because we're impressed by the important work [NGO Name] is doing in [specific area of their work]. We believe there could be valuable opportunities for collaboration between our organizations.

Our work in [your area of expertise] aligns well with [NGO]'s mission to [their mission]. We'd love to explore how we might work together to amplify our combined impact.

Would you be open to a brief call to discuss potential areas of collaboration?

Best regards,
[Your Name]`,
      tips: [
        'Show genuine knowledge of their work and mission',
        'Focus on shared values and mutual benefits',
        'Keep initial communication concise and focused',
        'Be prepared to share your organization\'s impact metrics'
      ]
    },
    {
      id: 'academic-intro-formal',
      name: 'Academic Partnership Introduction',
      category: 'introduction',
      partnerType: 'academic',
      formality: 'formal',
      content: `Dear Professor [Last Name],

I am writing as [Your Position] at [Your Organization] to inquire about potential research collaboration opportunities with [University Name].

Our organization is particularly interested in [specific research area] and we were impressed by the groundbreaking work being done by your research team in [specific research focus].

We believe there could be significant synergies between our practical experience in [industry/application area] and your academic expertise in [research area].

We would be honored to discuss how we might collaborate on [specific project or research initiative].

Thank you for your time and consideration.

Sincerely,
[Your Name]
[Your Position]
[Your Organization]
[Contact Information]`,
      tips: [
        'Reference specific research publications or projects',
        'Connect academic research to practical applications',
        'Be clear about resources you can provide (funding, data, facilities)',
        'Respect academic timelines and peer review processes'
      ]
    },
    {
      id: 'follow-up-gov',
      name: 'Government Follow-up Communication',
      category: 'follow-up',
      partnerType: 'government',
      formality: 'formal',
      content: `Dear [Contact Name],

I hope this email finds you well. I wanted to follow up on our previous correspondence regarding potential collaboration opportunities between [Your Organization] and [Government Agency].

Since our last communication, we have [mention any relevant developments or preparations you've made].

We remain very interested in exploring how we might contribute to [specific government priority or initiative]. Our team has prepared [mention any materials or proposals you've prepared].

Would it be possible to schedule a meeting or call to discuss this further?

Thank you for your continued consideration.

Best regards,
[Your Name]`,
      tips: [
        'Reference previous communications specifically',
        'Show progress or preparation since last contact',
        'Be patient with government timelines',
        'Offer specific next steps or materials'
      ]
    }
  ];

  // Cultural preparation data
  useEffect(() => {
    const culturalData: Record<string, CulturalPreparation> = {
      government: {
        partnerType: 'government',
        keyPhrases: [
          { local: 'Asante sana', english: 'Thank you very much', context: 'Formal thank you' },
          { local: 'Karibu', english: 'Welcome', context: 'Greeting visitors' },
          { local: 'Hakuna matata', english: 'No worries', context: 'Casual reassurance' },
          { local: 'Pole pole', english: 'Slowly slowly', context: 'Take your time, no rush' }
        ],
        meetingEtiquette: [
          'Arrive 10-15 minutes early for meetings',
          'Dress formally - business suits are expected',
          'Wait to be seated until invited',
          'Use titles and surnames until invited to do otherwise',
          'Business cards should be exchanged with both hands',
          'Be prepared for lengthy discussions and consensus-building'
        ],
        giftGuidelines: [
          'Small, thoughtful gifts are acceptable but not expected',
          'Avoid expensive gifts that could be seen as bribery',
          'Cultural items or books about your country are appreciated',
          'Present gifts with both hands',
          'Gifts should be modest and not ostentatious'
        ],
        communicationDoDont: [
          { do: 'Be patient and allow time for thorough discussion', dont: 'Rush decisions or show impatience' },
          { do: 'Show respect for hierarchy and formal processes', dont: 'Bypass official channels' },
          { do: 'Prepare detailed proposals and documentation', dont: 'Expect quick decisions' },
          { do: 'Follow up politely but persistently', dont: 'Be overly aggressive in follow-up' }
        ]
      },
      ngo: {
        partnerType: 'ngo',
        keyPhrases: [
          { local: 'Jambo', english: 'Hello', context: 'Casual greeting' },
          { local: 'Hujambo', english: 'How are you?', context: 'How are you?' },
          { local: 'Nzuri', english: 'Fine/Good', context: 'Response to greeting' },
          { local: 'Lala salama', english: 'Sleep well', context: 'Good night' }
        ],
        meetingEtiquette: [
          'Business casual attire is typically acceptable',
          'Be prepared for flexible scheduling',
          'Focus on shared mission and values',
          'Be ready to discuss impact and sustainability',
          'Expect participatory decision-making',
          'Small talk about community impact is appreciated'
        ],
        giftGuidelines: [
          'Modest contributions to their work are meaningful',
          'Books or resources related to their mission',
          'Small tokens showing appreciation for their work',
          'Avoid anything that could be seen as conditional',
          'Focus on meaningful rather than expensive gifts'
        ],
        communicationDoDont: [
          { do: 'Emphasize shared values and mission alignment', dont: 'Focus only on business benefits' },
          { do: 'Be flexible and adaptable to their processes', dont: 'Expect corporate-style efficiency' },
          { do: 'Show genuine interest in their community impact', dont: 'Treat them as just another business partner' },
          { do: 'Be patient with limited resources and capacity', dont: 'Demand immediate responses or actions' }
        ]
      },
      academic: {
        partnerType: 'academic',
        keyPhrases: [
          { local: 'Shikamoo', english: 'I respect you', context: 'Respectful greeting to elders' },
          { local: 'Marahaba', english: 'I accept (your respect)', context: 'Response to shikamoo' },
          { local: 'Mwalimu', english: 'Teacher', context: 'Respectful term for educators' },
          { local: 'Daktari', english: 'Doctor/Professor', context: 'Title for academics' }
        ],
        meetingEtiquette: [
          'Address academics by their professional titles',
          'Be prepared for intellectual discussions',
          'Respect academic freedom and peer review processes',
          'Academic calendars may affect availability',
          'Research proposals should be evidence-based',
          'Expect thorough evaluation of proposals'
        ],
        giftGuidelines: [
          'Academic books or publications are highly valued',
          'Research materials or equipment if relevant',
          'Small tokens showing appreciation for their work',
          'Consider sponsoring student research or activities',
          'Focus on intellectual rather than material gifts'
        ],
        communicationDoDont: [
          { do: 'Reference specific research and publications', dont: 'Make unsubstantiated claims' },
          { do: 'Respect academic timelines and processes', dont: 'Expect quick decisions' },
          { do: 'Connect proposals to academic interests', dont: 'Focus only on practical applications' },
          { do: 'Be prepared for rigorous evaluation', dont: 'Take criticism personally' }
        ]
      }
    };

    setCulturalPrep(culturalData[partnerType] || culturalData.government);
  }, [partnerType]);

  // Initialize relationship milestones
  useEffect(() => {
    const initialMilestones: RelationshipMilestone[] = [
      {
        id: 'initial-contact',
        title: 'Initial Contact Established',
        description: 'First meeting or communication with partner',
        timeline: 'Week 1',
        completed: false,
        category: 'communication'
      },
      {
        id: 'mutual-understanding',
        title: 'Mutual Understanding Achieved',
        description: 'Both parties understand each other\'s goals and constraints',
        timeline: 'Week 2-3',
        completed: false,
        category: 'trust-building'
      },
      {
        id: 'joint-planning',
        title: 'Joint Planning Session',
        description: 'Collaborative planning of initial activities',
        timeline: 'Month 1',
        completed: false,
        category: 'collaboration'
      },
      {
        id: 'first-delivery',
        title: 'First Deliverable Completed',
        description: 'Successful completion of initial commitment',
        timeline: 'Month 2-3',
        completed: false,
        category: 'commitment'
      },
      {
        id: 'relationship-review',
        title: 'Relationship Review',
        description: 'Formal review of partnership progress and adjustments',
        timeline: 'Month 6',
        completed: false,
        category: 'trust-building'
      }
    ];

    setMilestones(initialMilestones);
  }, [partnerName]);

  const filteredTemplates = templates.filter(template =>
    template.category === selectedCategory &&
    template.partnerType === partnerType &&
    template.formality === selectedFormality
  );

  const toggleMilestone = (id: string) => {
    const updatedMilestones = milestones.map(milestone =>
      milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone
    );
    setMilestones(updatedMilestones);
    onMilestoneUpdate?.(updatedMilestones);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'introduction': return '🤝';
      case 'follow-up': return '📧';
      case 'negotiation': return '⚖️';
      case 'problem-solving': return '🔧';
      case 'celebration': return '🎉';
      default: return '💬';
    }
  };

  const getMilestoneIcon = (category: string) => {
    switch (category) {
      case 'trust-building': return '🤝';
      case 'communication': return '💬';
      case 'collaboration': return '👥';
      case 'commitment': return '📋';
      default: return '📌';
    }
  };

  return (
    <div className="relationship-builder space-y-6">
      <div className="bg-nexus-surface-800 p-6 rounded-xl border border-nexus-accent-cyan/30">
        <h2 className="text-2xl font-bold text-nexus-text-primary mb-4 flex items-center gap-3">
          <span className="text-nexus-accent-cyan">🌱</span>
          Relationship Builder
        </h2>
        <p className="text-nexus-text-secondary mb-6">
          Tools and guidance for building strong, lasting relationships with {partnerName} ({partnerType})
        </p>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-nexus-border-medium">
          {[
            { id: 'communication', label: 'Communication', icon: '💬' },
            { id: 'cultural', label: 'Cultural Prep', icon: '🌍' },
            { id: 'milestones', label: 'Milestones', icon: '📋' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === tab.id
                  ? 'bg-nexus-accent-cyan text-nexus-primary-900 border-b-2 border-nexus-accent-cyan'
                  : 'text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-surface-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Communication Templates */}
        {selectedCategory === 'communication' && (
          <div className="space-y-6">
            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-nexus-text-secondary mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg text-nexus-text-primary"
                >
                  <option value="introduction">Introduction</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="problem-solving">Problem Solving</option>
                  <option value="celebration">Celebration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-nexus-text-secondary mb-2">Formality</label>
                <select
                  value={selectedFormality}
                  onChange={(e) => setSelectedFormality(e.target.value)}
                  className="px-3 py-2 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg text-nexus-text-primary"
                >
                  <option value="formal">Formal</option>
                  <option value="semi-formal">Semi-Formal</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTemplates.map(template => (
                <div key={template.id} className="bg-nexus-surface-700 p-4 rounded-lg border border-nexus-border-medium">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-nexus-text-primary flex items-center gap-2">
                        <span>{getCategoryIcon(template.category)}</span>
                        {template.name}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="px-2 py-1 bg-nexus-accent-cyan/20 text-nexus-accent-cyan text-xs rounded">
                          {template.formality}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onTemplateSelect?.(template)}
                      className="px-4 py-2 bg-nexus-accent-cyan text-nexus-primary-900 font-medium rounded-lg hover:bg-nexus-accent-cyan/90 transition-colors"
                    >
                      Use Template
                    </button>
                  </div>

                  <div className="bg-nexus-surface-600 p-3 rounded border-l-4 border-nexus-accent-cyan mb-3">
                    <pre className="text-sm text-nexus-text-secondary whitespace-pre-wrap font-sans">
                      {template.content}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium text-nexus-accent-cyan mb-2">Communication Tips:</h4>
                    <ul className="text-sm text-nexus-text-secondary space-y-1">
                      {template.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Preparation */}
        {selectedCategory === 'cultural' && culturalPrep && (
          <div className="space-y-6">
            <div className="bg-nexus-surface-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Key Phrases</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {culturalPrep.keyPhrases.map((phrase, index) => (
                  <div key={index} className="bg-nexus-surface-600 p-3 rounded">
                    <div className="font-medium text-nexus-accent-cyan">{phrase.local}</div>
                    <div className="text-sm text-nexus-text-primary">"{phrase.english}"</div>
                    <div className="text-xs text-nexus-text-secondary">{phrase.context}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Meeting Etiquette</h3>
                <ul className="space-y-2">
                  {culturalPrep.meetingEtiquette.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 bg-nexus-surface-700 rounded">
                      <span className="text-nexus-accent-cyan mt-1">•</span>
                      <span className="text-sm text-nexus-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Gift Guidelines</h3>
                <ul className="space-y-2">
                  {culturalPrep.giftGuidelines.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 bg-nexus-surface-700 rounded">
                      <span className="text-nexus-accent-cyan mt-1">•</span>
                      <span className="text-sm text-nexus-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Communication Do's and Don'ts</h3>
              <div className="space-y-3">
                {culturalPrep.communicationDoDont.map((item, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 p-3 bg-nexus-surface-700 rounded">
                    <div>
                      <div className="text-sm font-medium text-green-400 mb-1">✓ DO:</div>
                      <div className="text-sm text-nexus-text-secondary">{item.do}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-400 mb-1">✗ DON'T:</div>
                      <div className="text-sm text-nexus-text-secondary">{item.dont}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Relationship Milestones */}
        {selectedCategory === 'milestones' && (
          <div className="space-y-6">
            <div className="bg-nexus-surface-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Relationship Building Milestones</h3>
              <p className="text-sm text-nexus-text-secondary mb-4">
                Track your progress in building a strong, trusting relationship with {partnerName}
              </p>

              <div className="space-y-4">
                {milestones.map(milestone => (
                  <div key={milestone.id} className="flex items-center gap-4 p-3 bg-nexus-surface-600 rounded-lg">
                    <button
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        milestone.completed
                          ? 'bg-nexus-accent-cyan border-nexus-accent-cyan'
                          : 'border-nexus-border-medium hover:border-nexus-accent-cyan'
                      }`}
                    >
                      {milestone.completed && <span className="text-nexus-primary-900 text-sm">✓</span>}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getMilestoneIcon(milestone.category)}</span>
                        <h4 className={`font-medium ${milestone.completed ? 'text-nexus-accent-cyan line-through' : 'text-nexus-text-primary'}`}>
                          {milestone.title}
                        </h4>
                      </div>
                      <p className={`text-sm ${milestone.completed ? 'text-nexus-text-muted' : 'text-nexus-text-secondary'}`}>
                        {milestone.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-nexus-text-muted">Timeline: {milestone.timeline}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          milestone.category === 'trust-building' ? 'bg-blue-900 text-blue-300' :
                          milestone.category === 'communication' ? 'bg-green-900 text-green-300' :
                          milestone.category === 'collaboration' ? 'bg-purple-900 text-purple-300' :
                          'bg-orange-900 text-orange-300'
                        }`}>
                          {milestone.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-nexus-surface-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Relationship Health Score</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-full bg-nexus-surface-600 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-brown h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(milestones.filter(m => m.completed).length / milestones.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-lg font-bold text-nexus-accent-cyan">
                  {Math.round((milestones.filter(m => m.completed).length / milestones.length) * 100)}%
                </div>
              </div>
              <p className="text-sm text-nexus-text-secondary mt-2">
                {milestones.filter(m => m.completed).length} of {milestones.length} milestones completed
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelationshipBuilder;