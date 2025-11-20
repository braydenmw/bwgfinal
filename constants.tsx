import React from 'react';
import { MissionIcon, OpportunitiesIcon, ReportIcon, ComplianceIcon, VentureCapitalistIcon, EconomistIcon, GeopoliticalStrategistIcon, EsgAnalystIcon, InfrastructurePlannerIcon, SupplyChainAnalystIcon, WorkforceSpecialistIcon, TechnologyIcon, RenewableEnergyIcon, InfrastructureIcon, HealthcareIcon, ManufacturingIcon, AgricultureIcon, FinanceIcon, MiningIcon, LogisticsIcon, TourismIcon, EducationIcon, MatchMakerIcon, ManualIcon } from './components/Icons.tsx';
import type { View, ReportParameters, AnalyticalModule, AnalyticalModuleGroup } from './types.ts';

export const ORIGINAL_NAV_ITEMS: { id: View, title: string, description: string, icon: React.FC<any> }[] = [ { id: 'who-we-are', title: 'Who Why & Need', description: 'About BWGA', icon: ManualIcon }, { id: 'opportunities', title: 'Data Hub', description: 'Live Intelligence', icon: OpportunitiesIcon }, { id: 'report', title: 'Workspace', description: 'Inquire & Report', icon: ReportIcon }, { id: 'compliance', title: 'Compliance', description: 'Data & Security', icon: ComplianceIcon }, ];

export const AI_PERSONAS: { id: string, title: string, description: string, icon: React.FC<any> }[] = [
    { id: 'Regional Economist', title: 'Regional Economist', description: 'Focuses on macroeconomic trends, supply chains, workforce analytics, and sustainable development impacts.', icon: EconomistIcon },
    { id: 'Venture Capitalist', title: 'Venture Capitalist', description: 'Focuses on market size, scalability, competitive landscape, ROI potential, and disruptive technology.', icon: VentureCapitalistIcon },
    { id: 'Geopolitical Strategist', title: 'Geopolitical Strategist', description: 'Focuses on trade policy, regulatory stability, international relations, and sovereign risk factors.', icon: GeopoliticalStrategistIcon },
    { id: 'ESG Analyst', title: 'ESG Analyst', description: 'Focuses on Environmental, Social, and Governance (ESG) compliance, sustainability, and impact investing.', icon: EsgAnalystIcon },
    { id: 'Infrastructure Planner', title: 'Infrastructure Planner', description: 'Focuses on logistics, utilities, transportation networks, and smart city development.', icon: InfrastructurePlannerIcon },
    { id: 'Supply Chain Analyst', title: 'Supply Chain Analyst', description: 'Focuses on value chain mapping, sourcing, logistical bottlenecks, and supply chain resilience.', icon: SupplyChainAnalystIcon },
    { id: 'Workforce Development Specialist', title: 'Workforce Specialist', description: 'Focuses on talent pools, skills gap analysis, education infrastructure, and labor market dynamics.', icon: WorkforceSpecialistIcon },
];

export const ANALYTICAL_LENSES = [
  "Default Lens",
  "Technology Adoption & Innovation",
  "SME Growth & Development",
  "Foreign Direct Investment (FDI) Attraction",
  "Public-Private Partnerships (PPP)",
  "Regulatory & Compliance Framework",
  "Climate Impact & Adaptation",
];

export const TONES_AND_STYLES = [
  "Professional & Balanced (Default)",
  "Formal & Academic",
  "Action-Oriented Executive Briefing",
  "Skeptical & Critical",
  "Optimistic & Opportunistic",
  "Data-Heavy & Quantitative",
];

export const ORGANIZATION_TYPES = [
  "Government (National)",
  "Government (State/Provincial)",
  "Government (Local/City)",
  "Investment Promotion Agency",
  "Private Enterprise",
  "Financial Institution / Bank",
  "Non-Profit / NGO",
  "Academic / Research",
  "Other"
].sort();

export const DASHBOARD_CATEGORIES = [
  "Supply Chain & Logistics",
  "Technology & Innovation",
  "Renewable Energy & Cleantech",
  "Geopolitical Shifts",
  "Infrastructure & Construction"
];

export const REGIONS_AND_COUNTRIES = [
  {
    name: "Asia-Pacific",
    countries: ["Australia", "Bangladesh", "China", "India", "Indonesia", "Japan", "Kazakhstan", "Malaysia", "New Zealand", "Pakistan", "Philippines", "Singapore", "South Korea", "Taiwan", "Thailand", "Vietnam"].sort()
  },
  {
    name: "Europe",
    countries: ["Austria", "Belgium", "Czech Republic", "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom"].sort()
  },
  {
    name: "Middle East & North Africa",
    countries: ["Algeria", "Egypt", "Iran", "Iraq", "Israel", "Kuwait", "Morocco", "Oman", "Qatar", "Saudi Arabia", "Turkey", "United Arab Emirates"].sort()
  },
  {
    name: "North America",
    countries: ["Canada", "Mexico", "United States"].sort()
  },
  {
    name: "South America",
    countries: ["Argentina", "Brazil", "Chile", "Colombia", "Ecuador", "Peru"].sort()
  },
  {
    name: "Sub-Saharan Africa",
    countries: ["Angola", "Ethiopia", "Kenya", "Nigeria", "South Africa"].sort()
  }
];

export const COUNTRIES = REGIONS_AND_COUNTRIES.flatMap(region => region.countries).sort();

export const GOVERNMENT_LEVELS = [
  "National Government",
  "Regional/State Government",
  "City/Local Government",
  "Municipal Government"
];

export const INDUSTRIES: { id: string, title: string, icon: React.FC<any> }[] = [
    { id: 'Technology & Innovation', title: 'Tech & Innovation', icon: TechnologyIcon },
    { id: 'Renewable Energy & Cleantech', title: 'Renewable Energy', icon: RenewableEnergyIcon },
    { id: 'Infrastructure & Construction', title: 'Infrastructure', icon: InfrastructureIcon },
    { id: 'Healthcare & Life Sciences', title: 'Healthcare', icon: HealthcareIcon },
    { id: 'Advanced Manufacturing', title: 'Manufacturing', icon: ManufacturingIcon },
    { id: 'Agriculture & AgriTech', title: 'AgriTech', icon: AgricultureIcon },
    { id: 'Financial Services & FinTech', title: 'Financial Services', icon: FinanceIcon },
    { id: 'Mining & Resources', title: 'Mining & Resources', icon: MiningIcon },
    { id: 'Logistics & Supply Chain', title: 'Logistics', icon: LogisticsIcon },
    { id: 'Tourism & Hospitality', title: 'Tourism', icon: TourismIcon },
    { id: 'Education & EdTech', title: 'EdTech', icon: EducationIcon },
    { id: 'Match Maker', title: 'Match Maker', icon: MatchMakerIcon },
];

export const TIERS_BY_ORG_TYPE: Record<string, { id: string, title: string, desc: string, features: string[] }[]> = {
  "Default": [
    { id: 'DirectMatchmaking', title: 'Direct Matchmaking', desc: 'Finds and profiles one ideal foreign partner based on your detailed criteria.', features: ['1 Ideal Partner Match', 'Core Synergy Analysis', 'Contact Strategy Outline'] },
    { id: 'CompetitiveLandscape', title: 'Competitive Landscape', desc: 'Profiles up to three potential partners and analyzes their competitive positioning.', features: ['Up to 3 Partner Matches', 'Comparative SWOT', 'Market Positioning'] },
    { id: 'PartnershipFacilitator', title: 'Partnership Facilitator', desc: 'In-depth analysis of three partners with contact strategy and simulated impact.', features: ['3 In-Depth Profiles', 'Stakeholder Mapping', 'Economic Impact Simulation'] },
    { id: 'StrategicAllianceBlueprint', title: 'Strategic Alliance Blueprint', desc: 'Outlines a joint venture or strategic alliance structure with a top partner.', features: ['In-Depth Partner Analysis', 'JV/Alliance Governance Model', 'Synergy & Risk Mapping'] },
  ],
  "Government": [
    { id: 'Policy Brief', title: 'Policy Brief', desc: 'Analyzes an issue and provides policy recommendations.', features: ['Situational Analysis', 'Comparative Policy Review', 'Actionable Recommendations'] },
    { id: 'FDI Attraction', title: 'FDI Attraction Blueprint', desc: 'Identifies and profiles ideal foreign investors for a specific sector.', features: ['Sector Strength Analysis', 'Ideal Investor Profiling', 'Value Proposition Outline'] },
    { id: 'Economic Impact', title: 'Economic Impact Analysis', desc: 'Models the potential economic effects of a major project or policy.', features: ['Input-Output Modeling', 'Job Creation Forecasting', 'Supply Chain Effects'] },
    { id: 'Workforce Plan', title: 'Workforce Development Plan', desc: 'Analyzes skills gaps and proposes a strategy to build a future-ready workforce.', features: ['Skills Gap Analysis', 'Education Infrastructure Review', 'Industry Partnership Strategy'] },
    { id: 'SupplyChainGap', title: 'Supply Chain Gap Analysis', desc: 'Deep-dive into a value chain to find critical gaps and investment opportunities.', features: ['Value Chain Mapping', 'Input/Output Analysis', 'Targeted Investor Profiles'] },
    { id: 'RegulatoryBenchmarking', title: 'Regulatory Benchmarking', desc: 'Compares your region’s policies against competitors to identify advantages.', features: ['Comparative Policy Matrix', 'Investor "Pain Point" ID', 'Actionable Reform Ideas'] },
    { id: 'SDGAlignment', title: 'SDG Alignment Report', desc: 'Assesses a project’s alignment with UN SDGs to attract impact-focused investment.', features: ['SDG Target Mapping', 'Impact Measurement Framework', '“Green” Finance Potential'] },
    { id: 'InfrastructurePlan', title: 'Infrastructure Master Plan', desc: 'Outlines a strategic plan for critical infrastructure development to support economic growth.', features: ['Infrastructure Gap Analysis', 'Project Prioritization Matrix', 'Investment Phasing Plan'] },
    { id: 'TradeFacilitation', title: 'Intergovernmental Trade Facilitation', desc: 'Connects governments for trade partnerships, tariff offset strategies, and economic diplomacy.', features: ['Government-to-Government Matchmaking', 'Tariff Offset Mechanisms', 'Trade Agreement Optimization', 'Economic Diplomacy Framework'] },
  ],
  "Private Enterprise": [
    { id: 'Market Entry', title: 'Market Entry Strategy', desc: 'Assesses a new market and outlines a strategic approach for entry.', features: ['Market Size & Growth', 'Competitive Landscape', 'Regulatory Analysis', 'Go-to-Market Plan'] },
    { id: 'Partner Vetting', title: 'Partner Vetting Report', desc: 'Conducts deep-dive due diligence on potential local partners.', features: ['Financial Health Analysis', 'Reputation & Track Record', 'Synergy & Risk Assessment'] },
    { id: 'Supply Chain', title: 'Supply Chain Resilience', desc: 'Maps a supply chain and identifies risks and optimization opportunities.', features: ['Value Chain Mapping', 'Bottleneck Identification', 'Geopolitical Risk Exposure'] },
    { id: 'Tech Scout', title: 'Technology Scouting', desc: 'Identifies emerging technologies and potential acquisition targets.', features: ['Innovation Landscape Scan', 'Startup Ecosystem Analysis', 'IP & Tech Due Diligence'] },
    { id: 'SiteSelection', title: 'Site Selection Matrix', desc: 'Compares potential locations for a new facility based on critical factors.', features: ['Logistics & Labor Scoring', 'Real Estate & Utility Costs', 'Local Incentive Review'] },
    { id: 'CompetitiveIntel', title: 'Competitive Intelligence', desc: 'Deep-dive on key competitors in a target market to inform strategy.', features: ['Competitor SWOT Analysis', 'Market Positioning Map', 'Implied Strategic Intent'] },
    { id: 'SDGAlignment', title: 'SDG Alignment Report', desc: 'Assesses a project’s alignment with UN SDGs to strengthen ESG credentials.', features: ['SDG Target Mapping', 'Impact Measurement Framework', '“Green” Finance Potential'] },
    { id: 'GeopoliticalRisk', title: 'Geopolitical Risk Assessment', desc: 'Analyzes the geopolitical landscape of a target market to identify risks and mitigation strategies.', features: ['Political Stability Analysis', 'Regulatory Risk Mapping', 'Supply Chain Vulnerability'] },
    { id: 'TradeOptimization', title: 'Trade Cost Optimization', desc: 'Identifies tariff offset mechanisms and trade cost reduction strategies.', features: ['Tariff Offset Analysis', 'Trade Agreement Utilization', 'Cost Optimization Strategies', 'Regulatory Compliance'] },
  ],
};
// Add aliases for different government levels
TIERS_BY_ORG_TYPE["Government (National)"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Government (State/Provincial)"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Government (Local/City)"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Investment Promotion Agency"] = TIERS_BY_ORG_TYPE["Government"];
// Add aliases for finance and other orgs
TIERS_BY_ORG_TYPE["Financial Institution / Bank"] = TIERS_BY_ORG_TYPE["Private Enterprise"];
TIERS_BY_ORG_TYPE["Non-Profit / NGO"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Academic / Research"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Other"] = TIERS_BY_ORG_TYPE["Default"];


export const ANALYTICAL_MODULES: Record<string, AnalyticalModuleGroup> = {
  economic: {
    title: 'Economic Intelligence',
    modules: [
      { id: 'marketStability', name: 'Market Stability Analysis', description: 'Advanced market stability metrics and predictions', status: 'Enterprise' },
      { id: 'economicForecasting', name: 'Economic Forecasting Engine', description: 'Multi-factor economic scenario modeling', status: 'Enterprise' },
      { id: 'tradeFlowAnalysis', name: 'Trade Flow Analytics', description: 'Global trade pattern analysis and prediction', status: 'Enterprise' },
    ],
  },
  environmental: {
    title: 'Environmental & Sustainability',
    modules: [
      { id: 'climateRisk', name: 'Climate Risk Assessment', description: 'Climate impact and adaptation analysis', status: 'Enterprise' },
      { id: 'environmentalCompliance', name: 'Environmental Compliance', description: 'Regulatory compliance and risk assessment', status: 'Enterprise' },
      { id: 'sustainabilityMetrics', name: 'Sustainability Analytics', description: 'ESG metrics and sustainability scoring', status: 'Enterprise' },
    ],
  },
  social: {
    title: 'Social Impact & Demographics',
    modules: [
      { id: 'demographicAnalysis', name: 'Demographic Intelligence', description: 'Population trends and demographic analysis', status: 'Enterprise' },
      { id: 'migrationPatterns', name: 'Migration Pattern Analysis', description: 'Population movement and impact assessment', status: 'Enterprise' },
      { id: 'socialImpact', name: 'Social Impact Assessment', description: 'Community and societal impact analysis', status: 'Enterprise' },
    ],
  },
  infrastructure: {
    title: 'Infrastructure & Development',
    modules: [
      { id: 'infrastructureGaps', name: 'Infrastructure Gap Analysis', description: 'Infrastructure needs and optimization', status: 'Enterprise' },
      { id: 'developmentPlanning', name: 'Development Planning Tools', description: 'Regional development strategy optimization', status: 'Enterprise' },
      { id: 'smartCityMetrics', name: 'Smart City Analytics', description: 'Urban development and smart city metrics', status: 'Enterprise' },
    ],
  },
  innovation: {
    title: 'Innovation & Technology',
    modules: [
      { id: 'innovationEcosystem', name: 'Innovation Ecosystem Analysis', description: 'Innovation capacity and ecosystem assessment', status: 'Enterprise' },
      { id: 'techTransferMetrics', name: 'Technology Transfer Analytics', description: 'Technology adoption and transfer analysis', status: 'Enterprise' },
      { id: 'startupEcosystem', name: 'Startup Ecosystem Analysis', description: 'Startup environment and support assessment', status: 'Enterprise' },
    ],
  },
  predictive: {
    title: 'Predictive Intelligence (Nexus Brain)',
    modules: [
      { id: 'trendForecasting', name: 'Emerging Trend Forecasting', description: 'Analyzes current data to forecast future market and technology trends.', status: 'Enterprise' },
      { id: 'scenarioModeling', name: 'Predictive Scenario Modeling', description: 'Simulates potential future scenarios based on key drivers and uncertainties.', status: 'Enterprise' },
      { id: 'disruptionAnalysis', name: 'Disruption & Opportunity Analysis', description: 'Identifies potential disruptive forces and the opportunities they create.', status: 'Enterprise' },
      { id: 'tradeDisruptionAnalysis', name: 'Global Trade Disruption Analysis', description: 'Mathematical modeling of tariff impacts, supply chain disruptions, and market diversification strategies.', status: 'Enterprise' },
      { id: 'marketDiversificationEngine', name: 'Market Diversification Engine', description: 'Advanced algorithms for identifying alternative markets and optimizing global trade portfolios.', status: 'Enterprise' },
      { id: 'tariffOffsetAnalysis', name: 'Tariff Offset & Trade Facilitation', description: 'Comprehensive analysis of tariff offset mechanisms, free trade agreements, and government-to-government trade facilitation strategies.', status: 'Enterprise' },
      { id: 'intergovernmentalTrade', name: 'Intergovernmental Trade Intelligence', description: 'Government-to-government matchmaking, economic diplomacy frameworks, and bilateral trade partnership analysis.', status: 'Enterprise' },
    ],
  },
  governance: {
    title: 'Governance & Policy',
    modules: [
      { id: 'policyImpact', name: 'Policy Impact Simulator', description: 'Policy implementation impact analysis', status: 'Enterprise' },
      { id: 'regulatoryAnalysis', name: 'Regulatory Environment Analysis', description: 'Regulatory framework assessment', status: 'Enterprise' },
      { id: 'governanceMetrics', name: 'Governance Quality Metrics', description: 'Governance effectiveness assessment', status: 'Enterprise' },
    ],
  },
};

// --- GLOBAL INTELLIGENCE DATASETS ---

export const GLOBAL_CITY_DATABASE: Record<string, any> = {
  // Major Global Cities
  'Singapore': {
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia-Pacific',
    population: 5900000,
    gdp: 340000000000,
    growthRate: 3.2,
    infrastructure: { transportation: 9.5, digital: 9.8, utilities: 9.7 },
    businessEnvironment: { easeOfDoingBusiness: 9.6, corruptionIndex: 9.4, regulatoryQuality: 9.5 },
    talentPool: { educationLevel: 9.8, skillsAvailability: 9.6, laborCosts: 7.2 },
    marketAccess: { domesticMarket: 8.5, exportPotential: 9.8, tradeRoutes: ['Asia', 'Europe', 'Americas'] }
  },
  'Tokyo': {
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia-Pacific',
    population: 13960000,
    gdp: 1800000000000,
    growthRate: 1.8,
    infrastructure: { transportation: 9.7, digital: 9.5, utilities: 9.6 },
    businessEnvironment: { easeOfDoingBusiness: 8.9, corruptionIndex: 9.2, regulatoryQuality: 9.1 },
    talentPool: { educationLevel: 9.6, skillsAvailability: 9.4, laborCosts: 6.8 },
    marketAccess: { domesticMarket: 9.8, exportPotential: 9.5, tradeRoutes: ['Asia', 'Americas', 'Europe'] }
  },
  'Shanghai': {
    city: 'Shanghai',
    country: 'China',
    region: 'Asia-Pacific',
    population: 24280000,
    gdp: 450000000000,
    growthRate: 6.2,
    infrastructure: { transportation: 8.9, digital: 8.7, utilities: 8.8 },
    businessEnvironment: { easeOfDoingBusiness: 7.8, corruptionIndex: 6.8, regulatoryQuality: 7.2 },
    talentPool: { educationLevel: 8.9, skillsAvailability: 9.1, laborCosts: 8.9 },
    marketAccess: { domesticMarket: 9.9, exportPotential: 9.2, tradeRoutes: ['Asia', 'Europe', 'Americas'] }
  },
  'New York': {
    city: 'New York',
    country: 'United States',
    region: 'North America',
    population: 8500000,
    gdp: 1800000000000,
    growthRate: 2.1,
    infrastructure: { transportation: 8.7, digital: 9.3, utilities: 8.9 },
    businessEnvironment: { easeOfDoingBusiness: 8.9, corruptionIndex: 8.8, regulatoryQuality: 8.7 },
    talentPool: { educationLevel: 9.4, skillsAvailability: 9.7, laborCosts: 5.8 },
    marketAccess: { domesticMarket: 9.9, exportPotential: 9.8, tradeRoutes: ['Americas', 'Europe', 'Asia'] }
  },
  'London': {
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    population: 9000000,
    gdp: 650000000000,
    growthRate: 2.8,
    infrastructure: { transportation: 9.1, digital: 9.2, utilities: 9.0 },
    businessEnvironment: { easeOfDoingBusiness: 8.7, corruptionIndex: 9.1, regulatoryQuality: 9.0 },
    talentPool: { educationLevel: 9.5, skillsAvailability: 9.3, laborCosts: 6.2 },
    marketAccess: { domesticMarket: 9.2, exportPotential: 9.6, tradeRoutes: ['Europe', 'Americas', 'Asia'] }
  },
  // Emerging Cities
  'Bangalore': {
    city: 'Bangalore',
    country: 'India',
    region: 'Asia-Pacific',
    population: 12000000,
    gdp: 110000000000,
    growthRate: 7.8,
    infrastructure: { transportation: 7.2, digital: 8.9, utilities: 7.8 },
    businessEnvironment: { easeOfDoingBusiness: 7.1, corruptionIndex: 6.9, regulatoryQuality: 7.3 },
    talentPool: { educationLevel: 8.7, skillsAvailability: 9.2, laborCosts: 9.1 },
    marketAccess: { domesticMarket: 9.5, exportPotential: 8.7, tradeRoutes: ['Asia', 'Middle East', 'Europe'] }
  },
  'Johannesburg': {
    city: 'Johannesburg',
    country: 'South Africa',
    region: 'Sub-Saharan Africa',
    population: 5000000,
    gdp: 75000000000,
    growthRate: 4.2,
    infrastructure: { transportation: 6.8, digital: 7.9, utilities: 7.2 },
    businessEnvironment: { easeOfDoingBusiness: 6.9, corruptionIndex: 5.8, regulatoryQuality: 6.7 },
    talentPool: { educationLevel: 7.8, skillsAvailability: 8.1, laborCosts: 8.7 },
    marketAccess: { domesticMarket: 8.2, exportPotential: 7.8, tradeRoutes: ['Africa', 'Europe', 'Asia'] }
  },
  'Santiago': {
    city: 'Santiago',
    country: 'Chile',
    region: 'South America',
    population: 6200000,
    gdp: 85000000000,
    growthRate: 3.8,
    infrastructure: { transportation: 8.1, digital: 8.3, utilities: 8.5 },
    businessEnvironment: { easeOfDoingBusiness: 8.2, corruptionIndex: 8.1, regulatoryQuality: 8.3 },
    talentPool: { educationLevel: 8.4, skillsAvailability: 8.2, laborCosts: 7.9 },
    marketAccess: { domesticMarket: 7.8, exportPotential: 8.9, tradeRoutes: ['Americas', 'Asia', 'Europe'] }
  }
};

export const SUCCESS_FACTORS: any[] = [
  {
    factor: 'Infrastructure Quality',
    weight: 0.25,
    description: 'Transportation, utilities, and digital connectivity infrastructure',
    dataSources: ['World Bank', 'World Economic Forum', 'Local Government Reports'],
    measurement: 'Infrastructure Development Index (0-10 scale)'
  },
  {
    factor: 'Talent Availability',
    weight: 0.20,
    description: 'Skilled workforce, education quality, and labor market flexibility',
    dataSources: ['UNESCO', 'World Bank Education Statistics', 'LinkedIn Workforce Data'],
    measurement: 'Human Capital Index + Skills Availability Score'
  },
  {
    factor: 'Business Environment',
    weight: 0.18,
    description: 'Regulatory quality, ease of doing business, corruption levels',
    dataSources: ['World Bank Doing Business Report', 'Transparency International'],
    measurement: 'Ease of Doing Business Score + Regulatory Quality Index'
  },
  {
    factor: 'Market Access',
    weight: 0.15,
    description: 'Domestic market size, export potential, and trade connectivity',
    dataSources: ['World Bank', 'UN Comtrade', 'Local Trade Ministries'],
    measurement: 'Market Size Score + Trade Connectivity Index'
  },
  {
    factor: 'Innovation Ecosystem',
    weight: 0.12,
    description: 'Startup activity, R&D investment, technology adoption',
    dataSources: ['Global Innovation Index', 'Startup Genome', 'Patent Databases'],
    measurement: 'Innovation Index + Startup Activity Score'
  },
  {
    factor: 'Cost Competitiveness',
    weight: 0.10,
    description: 'Labor costs, real estate, operational expenses',
    dataSources: ['World Bank Cost of Doing Business', 'Local Economic Data'],
    measurement: 'Cost Competitiveness Index (lower is better)'
  }
];

export const STAKEHOLDER_PERSPECTIVES: Record<string, any> = {
  Government: {
    persona: 'Government',
    priorities: ['Economic Growth', 'Job Creation', 'Tax Revenue', 'Political Capital', 'Sustainability'],
    concerns: ['Fiscal Impact', 'Regulatory Compliance', 'Political Risk', 'Public Perception'],
    successMetrics: ['GDP Growth', 'Employment Rate', 'Investment Attraction', 'Policy Effectiveness'],
    riskFactors: ['Political Instability', 'Regulatory Changes', 'Budget Constraints', 'Public Opposition'],
    valueProposition: 'Attract investment while maintaining policy objectives and public welfare'
  },
  Corporate: {
    persona: 'Corporate',
    priorities: ['Market Access', 'Profit Margins', 'Operational Efficiency', 'Risk Mitigation', 'Scalability'],
    concerns: ['Market Volatility', 'Regulatory Burden', 'Talent Acquisition', 'Supply Chain Risks'],
    successMetrics: ['Revenue Growth', 'Market Share', 'ROI', 'Customer Acquisition Cost'],
    riskFactors: ['Market Competition', 'Economic Downturns', 'Regulatory Changes', 'Geopolitical Events'],
    valueProposition: 'Optimize location strategy for maximum business performance and competitive advantage'
  },
  Investor: {
    persona: 'Investor',
    priorities: ['Risk-Adjusted Returns', 'Portfolio Diversification', 'Exit Strategies', 'Capital Preservation'],
    concerns: ['Market Volatility', 'Political Risk', 'Currency Fluctuations', 'Liquidity'],
    successMetrics: ['IRR', 'Cash-on-Cash Returns', 'Portfolio Performance', 'Risk-Adjusted Alpha'],
    riskFactors: ['Market Crashes', 'Geopolitical Events', 'Regulatory Changes', 'Liquidity Crises'],
    valueProposition: 'Identify high-potential opportunities with optimal risk-return profiles'
  },
  Academic: {
    persona: 'Academic',
    priorities: ['Research Impact', 'Knowledge Advancement', 'Collaboration Opportunities', 'Funding Access'],
    concerns: ['Research Funding', 'Institutional Support', 'Publication Opportunities', 'Talent Retention'],
    successMetrics: ['Citation Impact', 'Research Funding', 'Student Outcomes', 'Collaboration Networks'],
    riskFactors: ['Funding Cuts', 'Political Interference', 'Competition for Talent', 'Technological Disruption'],
    valueProposition: 'Access cutting-edge research opportunities and collaborative partnerships'
  },
  Community: {
    persona: 'Community',
    priorities: ['Local Economic Development', 'Quality of Life', 'Social Equity', 'Environmental Protection'],
    concerns: ['Displacement', 'Environmental Impact', 'Social Cohesion', 'Resource Strain'],
    successMetrics: ['Local Employment', 'Quality of Life Index', 'Environmental Quality', 'Social Equity Metrics'],
    riskFactors: ['Economic Displacement', 'Environmental Degradation', 'Social Division', 'Resource Overuse'],
    valueProposition: 'Ensure development benefits local communities and preserves quality of life'
  }
};

export const GLOBAL_LETTER_TEMPLATES: Record<string, any> = {
  investment_proposal: {
    type: 'investment_proposal',
    title: 'Investment Proposal Letter',
    description: 'Formal proposal for investment opportunities with detailed ROI projections',
    applicablePersonas: ['Government', 'Corporate', 'Investor'],
    sectors: ['All'],
    content: {
      introduction: 'Introduction to the investment opportunity and strategic rationale',
      body: [
        'Detailed opportunity description and market analysis',
        'Financial projections and ROI calculations',
        'Risk assessment and mitigation strategies',
        'Implementation timeline and resource requirements'
      ],
      conclusion: 'Call to action for investment commitment',
      callToAction: 'Schedule investment discussion and due diligence process'
    },
    customizationFields: ['Investment Amount', 'Expected ROI', 'Timeline', 'Risk Level'],
    successMetrics: ['Response Rate', 'Due Diligence Completion', 'Investment Commitment']
  },
  partnership_introduction: {
    type: 'partnership_introduction',
    title: 'Partnership Introduction Letter',
    description: 'Professional introduction for potential business partnerships',
    applicablePersonas: ['Corporate', 'Government', 'Academic'],
    sectors: ['All'],
    content: {
      introduction: 'Introduction of organizations and partnership rationale',
      body: [
        'Complementary capabilities and synergies',
        'Mutual benefits and value proposition',
        'Proposed partnership structure',
        'Next steps for engagement'
      ],
      conclusion: 'Expression of interest in collaboration',
      callToAction: 'Schedule introductory meeting or call'
    },
    customizationFields: ['Organization Capabilities', 'Synergy Points', 'Partnership Type'],
    successMetrics: ['Meeting Requests', 'Follow-up Communications', 'Partnership Formation']
  },
  joint_venture_proposal: {
    type: 'joint_venture_proposal',
    title: 'Joint Venture Proposal',
    description: 'Detailed proposal for joint venture partnerships',
    applicablePersonas: ['Corporate', 'Government'],
    sectors: ['Manufacturing', 'Technology', 'Infrastructure', 'Energy'],
    content: {
      introduction: 'Strategic rationale for joint venture',
      body: [
        'JV structure and governance model',
        'Resource contributions and responsibilities',
        'Financial projections and risk sharing',
        'Exit strategies and success metrics'
      ],
      conclusion: 'Invitation for JV discussions',
      callToAction: 'Initiate due diligence and term sheet development'
    },
    customizationFields: ['JV Structure', 'Equity Split', 'Governance Model'],
    successMetrics: ['Due Diligence Initiation', 'Term Sheet Development', 'JV Agreement']
  },
  funding_request: {
    type: 'funding_request',
    title: 'Funding Request Letter',
    description: 'Formal request for funding with detailed project justification',
    applicablePersonas: ['Government', 'Corporate', 'Academic'],
    sectors: ['All'],
    content: {
      introduction: 'Project overview and funding rationale',
      body: [
        'Detailed project description and objectives',
        'Budget breakdown and funding requirements',
        'Expected outcomes and impact metrics',
        'Sustainability and long-term viability'
      ],
      conclusion: 'Formal funding request',
      callToAction: 'Schedule funding discussion and proposal review'
    },
    customizationFields: ['Funding Amount', 'Project Timeline', 'Expected Impact'],
    successMetrics: ['Funding Discussions', 'Proposal Reviews', 'Funding Commitments']
  },
  policy_advocacy: {
    type: 'policy_advocacy',
    title: 'Policy Advocacy Letter',
    description: 'Advocacy for specific policy changes or support',
    applicablePersonas: ['Government', 'Corporate', 'Community'],
    sectors: ['All'],
    content: {
      introduction: 'Policy issue and advocacy rationale',
      body: [
        'Current policy landscape and challenges',
        'Proposed policy changes and benefits',
        'Economic and social impact analysis',
        'Implementation recommendations'
      ],
      conclusion: 'Call for policy support',
      callToAction: 'Schedule policy discussion and stakeholder engagement'
    },
    customizationFields: ['Policy Issue', 'Proposed Changes', 'Impact Analysis'],
    successMetrics: ['Policy Discussions', 'Stakeholder Engagement', 'Policy Changes']
  },
  government_partnership: {
    type: 'government_partnership',
    title: 'Government Partnership Proposal',
    description: 'Proposal for government-private sector partnerships',
    applicablePersonas: ['Government', 'Corporate'],
    sectors: ['Infrastructure', 'Education', 'Healthcare', 'Technology'],
    content: {
      introduction: 'Partnership opportunity and strategic alignment',
      body: [
        'Complementary objectives and mutual benefits',
        'Partnership structure and governance',
        'Resource commitments and risk sharing',
        'Success metrics and monitoring framework'
      ],
      conclusion: 'Invitation for partnership discussions',
      callToAction: 'Initiate partnership development process'
    },
    customizationFields: ['Partnership Type', 'Resource Commitments', 'Governance Structure'],
    successMetrics: ['Partnership Discussions', 'MOU Development', 'Partnership Agreements']
  },
  regulatory_compliance: {
    type: 'regulatory_compliance',
    title: 'Regulatory Compliance Letter',
    description: 'Communication regarding regulatory compliance and requirements',
    applicablePersonas: ['Government', 'Corporate'],
    sectors: ['All'],
    content: {
      introduction: 'Regulatory context and compliance requirements',
      body: [
        'Current compliance status and requirements',
        'Proposed compliance measures and timeline',
        'Resource requirements and support needs',
        'Monitoring and reporting framework'
      ],
      conclusion: 'Commitment to compliance and collaboration',
      callToAction: 'Schedule compliance review and implementation planning'
    },
    customizationFields: ['Compliance Requirements', 'Timeline', 'Resource Needs'],
    successMetrics: ['Compliance Reviews', 'Implementation Planning', 'Compliance Achievement']
  },
  public_private_partnership: {
    type: 'public_private_partnership',
    title: 'Public-Private Partnership Proposal',
    description: 'Comprehensive PPP proposal with detailed terms and benefits',
    applicablePersonas: ['Government', 'Corporate', 'Investor'],
    sectors: ['Infrastructure', 'Utilities', 'Transportation', 'Healthcare'],
    content: {
      introduction: 'PPP opportunity and strategic rationale',
      body: [
        'Project scope and objectives',
        'PPP structure and risk allocation',
        'Financial model and revenue sharing',
        'Performance standards and monitoring'
      ],
      conclusion: 'Invitation for PPP development',
      callToAction: 'Initiate PPP feasibility study and term development'
    },
    customizationFields: ['PPP Structure', 'Risk Allocation', 'Financial Model'],
    successMetrics: ['Feasibility Studies', 'Term Development', 'PPP Agreements']
  },
  market_entry_strategy: {
    type: 'market_entry_strategy',
    title: 'Market Entry Strategy Letter',
    description: 'Strategic market entry proposal with detailed implementation plan',
    applicablePersonas: ['Corporate', 'Government'],
    sectors: ['All'],
    content: {
      introduction: 'Market opportunity and entry rationale',
      body: [
        'Market analysis and opportunity assessment',
        'Entry strategy and implementation plan',
        'Resource requirements and partnerships',
        'Risk assessment and mitigation'
      ],
      conclusion: 'Proposal for market entry collaboration',
      callToAction: 'Schedule market entry strategy discussion'
    },
    customizationFields: ['Market Analysis', 'Entry Strategy', 'Resource Requirements'],
    successMetrics: ['Strategy Discussions', 'Implementation Planning', 'Market Entry Success']
  },
  supplier_relationship: {
    type: 'supplier_relationship',
    title: 'Supplier Relationship Letter',
    description: 'Establishing or enhancing supplier relationships',
    applicablePersonas: ['Corporate'],
    sectors: ['Manufacturing', 'Retail', 'Construction', 'Technology'],
    content: {
      introduction: 'Supplier relationship opportunity and mutual benefits',
      body: [
        'Supply chain requirements and capabilities',
        'Quality standards and performance metrics',
        'Pricing and terms negotiation',
        'Relationship development plan'
      ],
      conclusion: 'Invitation for supplier partnership',
      callToAction: 'Schedule supplier evaluation and relationship development'
    },
    customizationFields: ['Supply Requirements', 'Quality Standards', 'Pricing Terms'],
    successMetrics: ['Supplier Evaluations', 'Relationship Development', 'Supply Agreements']
  },
  distribution_channel: {
    type: 'distribution_channel',
    title: 'Distribution Channel Letter',
    description: 'Proposal for distribution channel partnerships',
    applicablePersonas: ['Corporate'],
    sectors: ['Manufacturing', 'Retail', 'Consumer Goods', 'Technology'],
    content: {
      introduction: 'Distribution opportunity and market expansion potential',
      body: [
        'Product/market fit and distribution requirements',
        'Channel strategy and market coverage',
        'Performance expectations and support',
        'Relationship terms and growth potential'
      ],
      conclusion: 'Invitation for distribution partnership',
      callToAction: 'Schedule distribution channel discussion and market analysis'
    },
    customizationFields: ['Market Coverage', 'Channel Strategy', 'Performance Expectations'],
    successMetrics: ['Channel Discussions', 'Market Analysis', 'Distribution Agreements']
  },
  technology_transfer: {
    type: 'technology_transfer',
    title: 'Technology Transfer Agreement',
    description: 'Proposal for technology transfer and knowledge sharing',
    applicablePersonas: ['Corporate', 'Academic', 'Government'],
    sectors: ['Technology', 'Manufacturing', 'Healthcare', 'Energy'],
    content: {
      introduction: 'Technology transfer opportunity and strategic value',
      body: [
        'Technology description and capabilities',
        'Transfer methodology and implementation',
        'Intellectual property and licensing terms',
        'Support and training requirements'
      ],
      conclusion: 'Invitation for technology transfer partnership',
      callToAction: 'Schedule technology evaluation and transfer planning'
    },
    customizationFields: ['Technology Description', 'Transfer Methodology', 'IP Terms'],
    successMetrics: ['Technology Evaluations', 'Transfer Planning', 'Transfer Agreements']
  },
  community_engagement: {
    type: 'community_engagement',
    title: 'Community Engagement Letter',
    description: 'Community outreach and engagement proposal',
    applicablePersonas: ['Corporate', 'Government', 'Community'],
    sectors: ['All'],
    content: {
      introduction: 'Community engagement opportunity and mutual benefits',
      body: [
        'Community needs and engagement objectives',
        'Engagement strategy and activities',
        'Resource commitments and partnerships',
        'Impact measurement and reporting'
      ],
      conclusion: 'Invitation for community collaboration',
      callToAction: 'Schedule community engagement planning and partnership development'
    },
    customizationFields: ['Community Needs', 'Engagement Strategy', 'Resource Commitments'],
    successMetrics: ['Engagement Planning', 'Partnership Development', 'Community Impact']
  },
  university_collaboration: {
    type: 'university_collaboration',
    title: 'University Collaboration Letter',
    description: 'Proposal for university-industry collaboration',
    applicablePersonas: ['Corporate', 'Academic', 'Government'],
    sectors: ['Technology', 'Healthcare', 'Engineering', 'Business'],
    content: {
      introduction: 'Research and collaboration opportunity',
      body: [
        'Research objectives and complementary capabilities',
        'Collaboration structure and activities',
        'Resource sharing and funding arrangements',
        'Knowledge transfer and commercialization'
      ],
      conclusion: 'Invitation for academic collaboration',
      callToAction: 'Schedule collaboration discussion and partnership development'
    },
    customizationFields: ['Research Objectives', 'Collaboration Structure', 'Resource Sharing'],
    successMetrics: ['Collaboration Discussions', 'Partnership Development', 'Research Outcomes']
  },
  industry_association: {
    type: 'industry_association',
    title: 'Industry Association Letter',
    description: 'Engagement with industry associations and trade groups',
    applicablePersonas: ['Corporate', 'Government'],
    sectors: ['All'],
    content: {
      introduction: 'Industry association opportunity and strategic alignment',
      body: [
        'Industry challenges and association objectives',
        'Membership benefits and participation opportunities',
        'Collaboration areas and joint initiatives',
        'Value proposition and mutual benefits'
      ],
      conclusion: 'Invitation for industry association engagement',
      callToAction: 'Schedule association discussion and membership exploration'
    },
    customizationFields: ['Industry Challenges', 'Membership Benefits', 'Collaboration Areas'],
    successMetrics: ['Association Discussions', 'Membership Exploration', 'Association Engagement']
  },
  international_organization: {
    type: 'international_organization',
    title: 'International Organization Letter',
    description: 'Engagement with international organizations and NGOs',
    applicablePersonas: ['Government', 'Corporate', 'Academic'],
    sectors: ['All'],
    content: {
      introduction: 'International collaboration opportunity and global impact',
      body: [
        'Global objectives and alignment with organizational mission',
        'Collaboration framework and activities',
        'Resource contributions and partnership terms',
        'Impact measurement and reporting'
      ],
      conclusion: 'Invitation for international collaboration',
      callToAction: 'Schedule international partnership discussion and planning'
    },
    customizationFields: ['Global Objectives', 'Collaboration Framework', 'Resource Contributions'],
    successMetrics: ['Partnership Discussions', 'Planning Sessions', 'International Agreements']
  }
};