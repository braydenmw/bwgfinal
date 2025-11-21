import { LiveServerMessage, Modality, Blob } from "@google/genai";

export type View = 'opportunities' | 'report' | 'compliance' | 'sample-report' | 'technical-manual' | 'who-we-are' | 'how-to-use' | 'terms-and-conditions' | 'report-entry';

export interface AnalyticalModule {
  id: string;
  name: string;
  description: string;
  status: 'Core' | 'Enterprise' | 'Future';
}

export interface AnalyticalModuleGroup {
  title: string;
  modules: AnalyticalModule[];
}

export type ReportLength = 'snapshot' | 'brief' | 'standard' | 'comprehensive';
export type OutputFormat = 'report' | 'letter' | 'both';

export interface ReportParameters {
  reportName: string;
  tier: string[];
  userName: string;
  userDepartment: string;
  organizationType: string;
  userCountry: string;
  userTier: UserTier;
  governmentLevel?: string; // For government organizations
  aiPersona: string[];
  customAiPersona?: string;
  analyticalLens?: string[];
  toneAndStyle?: string[];
  region: string;
  industry: string[];
  customIndustry?: string;
  idealPartnerProfile: string;
  problemStatement: string;
  analysisTimeframe: string;
  analyticalModules: string[];
  reportLength: ReportLength;
  outputFormat: OutputFormat;
  // NSIL Engine fields
  refinedProblemStatement?: string;
  country?: string;
  persona?: string;
  organization?: string;
  uploadedDocument?: boolean;
  // 12-step workflow fields
  strategicContext?: string;
  opportunityScore?: OpportunityScore;
  moduleScore?: ModuleScore;
  complexityScore?: ComplexityScore;
}

export type ReportSuggestions = Partial<Pick<ReportParameters, 'reportName' | 'region' | 'problemStatement' | 'idealPartnerProfile' | 'tier' | 'aiPersona'>> & {
    industry?: string; // Keep as string for simple suggestion
};

export interface ResearchAndScopeResult {
    summary: string;
    suggestions: ReportSuggestions;
}


export interface LiveOpportunityItem {
  project_name: string;
  country: string;
  sector: string;
  value: string;
  summary: string;
  source_url: string;
  ai_feasibility_score?: number;
  ai_risk_assessment?: string;
  isUserAdded?: boolean;
}

export interface SymbiosisContext {
  topic: string;
  originalContent: string;
  reportParameters?: ReportParameters;
}

export type UserTier = 'basic' | 'professional' | 'enterprise';

export interface Tier {
  id: string;
  title: string;
  desc: string;
  features: string[];
}

export interface AiSuggestion {
  type: 'parameter' | 'content' | 'structure';
  field: string;
  value: any;
  confidence: number;
  reasoning: string;
}

export interface UserProfile {
  userName: string;
  userDepartment:string;
  organizationType: string;
  userCountry: string;
  userTier: UserTier;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface DashboardIntelligence {
    category: string;
    items: {
        company: string;
        details: string;
        implication: string;
        source: string;
        url: string;
    }[];
}

export interface NewsContent {
    headline: string;
    summary: string;
    source: string;
    link: string;
    region: string;
}

export interface IndicatorContent {
    name: string;
    value: string;
    change: number;
    region: string;
}

export type FeedPost = {
    id: string;
    timestamp: string;
} & (
    | { type: 'opportunity'; content: LiveOpportunityItem }
    | { type: 'news'; content: NewsContent }
    | { type: 'indicator'; content: IndicatorContent }
);

export interface InquireResult {
  answer: string;
  sources: { web: { uri: string; title: string; } }[];
}

export interface LiveOpportunitiesResponse {
    feed: FeedPost[];
    isMockData?: boolean;
}

export interface UNComtradeOptions {
  reporter?: string;
  partner?: string;
  tradeFlow?: string;
  year?: string;
  classification?: string;
}

export interface UNComtradeResponse {
  commodity: string;
  commodityCode: string;
  reporter: string;
  partner: string;
  tradeFlow: string;
  tradeValue: number;
  netWeight: number;
  year: string;
  period: string;
}

export interface WorldBankOptions {
  country?: string;
  date?: string;
  format?: string;
}

export interface WorldBankResponse {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface AiCapability {
  title: string;
  description: string;
  prompt: string;
}

export interface AiCapabilitiesResponse {
    greeting: string;
    capabilities: AiCapability[];
}

export interface EconomicData {
  gdp?: { value: number; year: string };
  population?: { value: number; year: string };
  inflation?: { value: number; year: string };
  fdi?: { value: number; year: string };
}

export interface PredictiveAnalysis {
  emergingTrends: { trend: string; justification: string; }[];
  futureOpportunities: { opportunity: string; rationale: string; }[];
  potentialDisruptions: { disruption: string; impact: string; }[];
}

// --- NEXUS BRAIN TYPES V1 ---
export type NexusBrainAction = 'diagnose' | 'simulate' | 'architect' | 'generate_model';

// Layer 1: RROI (Diagnostic)
export interface RROI_Component {
  name: string;
  score: number; // 0-100
  analysis: string;
}
export interface RROI_Index {
  overallScore: number;
  summary: string;
  components: {
    humanCapital: RROI_Component;
    infrastructure: RROI_Component;
    agglomeration: RROI_Component;
    economicComposition: RROI_Component; // Based on LQ and Shift-Share
    governance: RROI_Component;
    qualityOfLife: RROI_Component;
  }
}

// Layer 2: TPT (Predictive)
export interface TPT_Simulation {
  scenario: string;
  intervention: string;
  timeline: string;
  impactAnalysis: string;
  predictedOutcomes: {
    metric: string;
    startValue: number;
    endValue: number;
  }[];
}

// Layer 3: SEAM (Prescriptive)
export interface EcosystemPartner {
  type: 'Anchor' | 'Infrastructure' | 'Innovation' | 'Capital' | 'Government' | 'Community';
  entity: string; // e.g., "Netafim (Israel)"
  rationale: string;
}
export interface SEAM_Blueprint {
  strategicObjective: string;
  ecosystemSummary: string;
  partners: EcosystemPartner[];
}

// API Response Types
export type NexusBrainResponse = RROI_Index | TPT_Simulation | SEAM_Blueprint;

// --- NEXUS BRAIN TYPES V2 (Digital Twin) ---
export interface DigitalTwinIntervention {
  type: 'Partner' | 'Policy' | 'Infrastructure';
  description: string;
  timeline?: string; // e.g., "5-10 years"
}

export interface GenerativeModel {
  modelName: string;
  corePrinciples: { principle: string; rationale: string; }[];
  summary: string;
}

export interface NexusBrainState {
  diagnosis: RROI_Index | null;
  simulation: TPT_Simulation | null;
  ecosystem: SEAM_Blueprint | null;
  // V2 State
  generativeModel: GenerativeModel | null;
}

// --- GLOBAL INTELLIGENCE TYPES ---

export interface GlobalCityData {
  city: string;
  country: string;
  region: string;
  population: number;
  gdp: number;
  growthRate: number;
  infrastructure: {
    transportation: number;
    digital: number;
    utilities: number;
  };
  businessEnvironment: {
    easeOfDoingBusiness: number;
    corruptionIndex: number;
    regulatoryQuality: number;
  };
  talentPool: {
    educationLevel: number;
    skillsAvailability: number;
    laborCosts: number;
  };
  marketAccess: {
    domesticMarket: number;
    exportPotential: number;
    tradeRoutes: string[];
  };
}

export interface SuccessFactor {
  factor: string;
  weight: number;
  description: string;
  dataSources: string[];
  measurement: string;
}

export interface ComparativeAnalysis {
  primaryLocation: GlobalCityData;
  alternativeLocations: GlobalCityData[];
  successFactors: SuccessFactor[];
  comparativeScores: {
    location: string;
    totalScore: number;
    factorScores: Record<string, number>;
    strengths: string[];
    weaknesses: string[];
  }[];
  recommendations: {
    bestFit: string;
    rationale: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    investmentPotential: number;
  };
}

export interface StakeholderPerspective {
  persona: 'Government' | 'Corporate' | 'Investor' | 'Academic' | 'Community';
  priorities: string[];
  concerns: string[];
  successMetrics: string[];
  riskFactors: string[];
  valueProposition: string;
}

export interface PredictiveGrowthModel {
  location: GlobalCityData;
  timeHorizon: number; // years
  growthScenarios: {
    scenario: string;
    probability: number;
    projectedGrowth: number[];
    keyDrivers: string[];
    interventions: string[];
  }[];
  riskEvolution: {
    year: number;
    riskLevel: number;
    primaryRisks: string[];
  }[];
  opportunityWindows: {
    startYear: number;
    duration: number;
    opportunityType: string;
    potentialImpact: number;
  }[];
}

export interface AlternativeLocationMatch {
  originalLocation: GlobalCityData;
  matchedLocations: {
    location: GlobalCityData;
    matchScore: number;
    matchReasons: string[];
    improvementAreas: string[];
    transitionChallenges: string[];
  }[];
  relocationStrategy: {
    timeline: string;
    resourceRequirements: string[];
    riskMitigation: string[];
    successProbability: number;
  };
}

export interface GlobalIntelligenceReport {
  executiveSummary: string;
  comparativeAnalysis: ComparativeAnalysis;
  stakeholderPerspectives: StakeholderPerspective[];
  predictiveModels: PredictiveGrowthModel;
  alternativeMatches: AlternativeLocationMatch;
  recommendations: {
    primaryRecommendation: string;
    alternativeOptions: string[];
    implementationRoadmap: string[];
    monitoringMetrics: string[];
  };
  riskAssessment: {
    overallRisk: 'Low' | 'Medium' | 'High';
    riskFactors: string[];
    mitigationStrategies: string[];
    contingencyPlans: string[];
  };
}

// Enhanced Letter Types for Global Intelligence
export type GlobalLetterType =
  | 'investment_proposal'
  | 'partnership_introduction'
  | 'joint_venture_proposal'
  | 'funding_request'
  | 'policy_advocacy'
  | 'government_partnership'
  | 'regulatory_compliance'
  | 'public_private_partnership'
  | 'market_entry_strategy'
  | 'supplier_relationship'
  | 'distribution_channel'
  | 'technology_transfer'
  | 'community_engagement'
  | 'university_collaboration'
  | 'industry_association'
  | 'international_organization';

export interface GlobalLetterTemplate {
  type: GlobalLetterType;
  title: string;
  description: string;
  applicablePersonas: ('Government' | 'Corporate' | 'Investor' | 'Academic' | 'Community')[];
  sectors: string[];
  content: {
    introduction: string;
    body: string[];
    conclusion: string;
    callToAction: string;
  };
  customizationFields: string[];
  successMetrics: string[];
}

// --- 12-STEP INTELLIGENCE SYSTEM TYPES ---

export interface OpportunityScore {
  marketPotential: number; // 0-100
  investmentAttractiveness: number; // 0-100
  competitiveAdvantage: number; // 0-100
  riskFactors: number; // 0-100 (lower is better)
  totalScore: number; // 0-100
}

export interface ModuleScore {
  complexityLevel: number; // 0-100
  resourceRequirements: number; // 0-100
  implementationTimeline: number; // 0-100 (lower is better)
  successProbability: number; // 0-100
  totalScore: number; // 0-100
}

export interface ComplexityScore {
  technicalComplexity: number; // 0-100
  stakeholderInvolvement: number; // 0-100
  regulatoryCompliance: number; // 0-100
  marketVolatility: number; // 0-100
  totalScore: number; // 0-100
}

export type IntelligenceStep =
  | 'strategic-context'
  | 'rroi-analysis'
  | 'seam-architecture'
  | 'opportunity-identification'
  | 'partner-network-analysis'
  | 'risk-assessment'
  | 'technology-transfer'
  | 'implementation-roadmap'
  | 'resource-allocation'
  | 'performance-metrics'
  | 'sustainability-planning'
  | 'intelligence-dashboard';

export interface WorkflowProgress {
  currentStep: number; // 1-12
  completedSteps: IntelligenceStep[];
  stepData: Record<IntelligenceStep, any>;
}

export interface ReportData {
  type: string;
  title: string;
  sections: {
    title: string;
    content: string;
  }[];
  analysisPoints: string[];
  recommendations: string[];
}

// --- MULTI-AGENT AI SYSTEM TYPES ---

export type AIAgentProvider = 'google-gemini' | 'openai-gpt' | 'anthropic-claude';

export interface AIAgentConfig {
  provider: AIAgentProvider;
  model: string;
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  enabled: boolean;
  priority: number; // Higher number = higher priority
  specializations: string[]; // Areas this agent excels at
  rateLimits: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
}

export interface AgentResponse {
  agentId: string;
  provider: AIAgentProvider;
  model: string;
  content: string;
  confidence: number; // 0-1
  reasoning: string;
  processingTime: number; // milliseconds
  tokensUsed: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ConsensusResult {
  consensusContent: string;
  confidence: number; // 0-1
  agreementLevel: 'unanimous' | 'majority' | 'split' | 'conflicting';
  participatingAgents: string[];
  dissentingOpinions: {
    agentId: string;
    alternativeContent: string;
    reasoning: string;
  }[];
  metadata: {
    totalAgents: number;
    consensusMethod: 'weighted-voting' | 'majority-vote' | 'confidence-weighted';
    processingTime: number;
  };
}

export interface MultiAgentTask {
  id: string;
  type: 'analysis' | 'research' | 'validation' | 'generation' | 'consensus';
  prompt: string;
  context?: Record<string, any>;
  requiredAgents: number;
  timeout: number; // milliseconds
  priority: 'low' | 'medium' | 'high' | 'critical';
  consensusMethod: 'weighted-voting' | 'majority-vote' | 'confidence-weighted';
}

export interface MultiAgentAnalysis {
  task: MultiAgentTask;
  responses: AgentResponse[];
  consensus: ConsensusResult;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  error?: string;
}

export interface AgentHealthStatus {
  agentId: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'offline';
  lastResponseTime: number;
  errorCount: number;
  successRate: number; // 0-1
  rateLimitRemaining: number;
  averageResponseTime: number;
}

export interface MultiAgentOrchestratorConfig {
  enabledAgents: string[];
  defaultConsensusMethod: 'weighted-voting' | 'majority-vote' | 'confidence-weighted';
  minConsensusThreshold: number; // 0-1
  maxParallelTasks: number;
  taskTimeout: number;
  retryAttempts: number;
  fallbackToSingleAgent: boolean;
}

export interface MultiAgentDashboardData {
  activeTasks: MultiAgentAnalysis[];
  agentHealth: AgentHealthStatus[];
  recentConsensus: ConsensusResult[];
  performanceMetrics: {
    averageResponseTime: number;
    consensusAccuracy: number;
    agentUptime: Record<string, number>;
    costEfficiency: number;
  };
  systemStatus: 'operational' | 'degraded' | 'maintenance';
}

export interface AgentSpecialization {
  category: string;
  description: string;
  agents: {
    provider: AIAgentProvider;
    model: string;
    expertise: string[];
    performance: number; // 0-1
  }[];
}

// Multi-agent enhanced versions of existing types
export interface MultiAgentReportParameters extends ReportParameters {
  multiAgentEnabled: boolean;
  selectedAgents: string[];
  consensusMethod: 'weighted-voting' | 'majority-vote' | 'confidence-weighted';
  minConsensusThreshold: number;
}

export interface MultiAgentCapabilitiesResponse extends AiCapabilitiesResponse {
  multiAgentFeatures: {
    availableAgents: AIAgentConfig[];
    consensusMethods: string[];
    specializations: AgentSpecialization[];
    performanceMetrics: {
      accuracy: number;
      speed: number;
      cost: number;
    };
  };
}