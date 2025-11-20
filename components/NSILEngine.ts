/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReportParameters, Tier, AiSuggestion } from '../types';

// NSIL™ (Nexus Simulation Intelligence Language) Matrix & Advanced AI Simulation Engine
export interface NSILAnalysis {
  urpIndex: number;
  agerRiskScore: number;
  gsmPartnerMatches: number;
  recommendedTier: string;
  calculatedPrice: number;
  keyOpportunities: string[];
  keyRisks: string[];
  summary: string;
  confidenceScore: number;
  escalationRequired: boolean;
}

export interface URPMetrics {
  economicPotential: number; // 0-10 scale
  marketAccessibility: number; // 0-10 scale
  infrastructureReadiness: number; // 0-10 scale
  regulatoryEnvironment: number; // 0-10 scale
  humanCapitalAvailability: number; // 0-10 scale
}

// Enhanced NSIL™ Language Matrix with more sophisticated analysis
const ENHANCED_NSIL_MATRIX = {
  urp: {
    exceptional:
      'demonstrates an exceptionally high Untapped Regional Potential (URP) of 8.5+, indicating a prime opportunity for strategic investment with transformative potential.',
    high: 'shows strong Untapped Regional Potential (URP) of 7.0-8.4, suggesting a solid foundation for growth with significant upside.',
    moderate:
      'presents moderate Untapped Regional Potential (URP) of 5.5-6.9, indicating selective opportunities requiring strategic focus.',
    limited:
      'exhibits limited Untapped Regional Potential (URP) of 4.0-5.4, suggesting careful evaluation and risk mitigation strategies.',
    low: 'shows constrained Untapped Regional Potential (URP) below 4.0, requiring innovative approaches or alternative market strategies.',
  },
  risk: {
    minimal:
      'Crucially, the region boasts a minimal risk profile (AGER-AI™ Score: 1.0-2.5), suggesting an exceptionally stable and predictable environment for investment.',
    low: 'The region maintains a low-risk profile (AGER-AI™ Score: 2.6-4.0), indicating a stable environment with manageable uncertainties.',
    moderate:
      'This potential is balanced by a moderate risk profile (AGER-AI™ Score: 4.1-6.0), requiring targeted due diligence and strategic risk mitigation.',
    elevated:
      'The opportunity comes with elevated risk factors (AGER-AI™ Score: 6.1-7.5), necessitating comprehensive risk management strategies.',
    high: 'This represents a high-risk, high-reward scenario (AGER-AI™ Score: 7.6-10.0) where navigating complex regulatory and political factors will be critical to success.',
  },
  opportunities: {
    'Market Expansion': [
      'Rapidly growing middle class with 15-25% annual income growth trajectory',
      'Under-served local markets with less than 30% market penetration',
      'Digital transformation creating new consumer touchpoints',
      'Government incentives for market development initiatives',
    ],
    'Supply Chain Optimization': [
      'Strategic port access reducing logistics costs by 20-35%',
      'Government manufacturing incentives and export facilitation',
      'Skilled labor availability at competitive wage rates',
      'Regional trade agreements providing preferential access',
    ],
    'FDI Attraction': [
      'Pro-investment policy reforms implemented in last 18 months',
      'Large, skilled talent pool with technical education infrastructure',
      'Special Economic Zones with 10-15 year tax holidays',
      'Government commitment to regulatory streamlining',
    ],
    'Regional Development': [
      '$2-5B government infrastructure budget allocation',
      'Special Economic Zone status with comprehensive incentives',
      'Public-private partnership frameworks established',
      'Regional development authority with fast-track approvals',
    ],
    'Technology Transfer': [
      'Government R&D incentives and innovation hubs',
      'University partnerships and research collaboration opportunities',
      'IP protection frameworks recently strengthened',
      'Technology incubator programs with government backing',
    ],
    'Resource Development': [
      'Untapped natural resource reserves with exploration potential',
      'Government mining/extraction policy reforms',
      'Infrastructure development for resource extraction',
      'International commodity demand driving development',
    ],
  },
  risks: {
    'Market Expansion': [
      'Complex local distribution networks requiring relationship building',
      'Strong brand loyalty to existing players (60-80% market share)',
      'Regulatory compliance requirements varying by sub-region',
      'Currency volatility affecting pricing strategies',
    ],
    'Supply Chain Optimization': [
      'Dependence on singular transport corridor creating bottlenecks',
      'Recent labor regulation changes affecting operational flexibility',
      'Infrastructure capacity constraints during peak seasons',
      'Geopolitical tensions affecting cross-border logistics',
    ],
    'FDI Attraction': [
      'Bureaucratic processes averaging 6-12 month approval cycles',
      'Competition for talent from established multinational players',
      'Local content requirements affecting operational flexibility',
      'Political transition risks affecting policy continuity',
    ],
    'Regional Development': [
      'Government project execution delays averaging 18-24 months',
      'Land acquisition complexities involving multiple stakeholders',
      'Environmental compliance requirements extending timelines',
      'Local community engagement and social license considerations',
    ],
    'Technology Transfer': [
      'IP protection enforcement inconsistencies',
      'Technology adaptation requirements for local conditions',
      'Skills gap requiring extensive training programs',
      'Regulatory approval processes for new technologies',
    ],
    'Resource Development': [
      'Environmental impact assessment and compliance costs',
      'Community relations and social license to operate',
      'Infrastructure development capital requirements',
      'Commodity price volatility affecting project viability',
    ],
  },
};

/**
 * Calculate URP Index based on 5 core metrics
 */
export function calculateURPIndex(params: ReportParameters): {
  urpIndex: number;
  metrics: URPMetrics;
  breakdown: string;
} {
  // Extract key factors from problem statement and context
  const problemText = (
    params.problemStatement +
    ' ' +
    (params.refinedProblemStatement || '')
  ).toLowerCase();

  // Economic Potential (0-10)
  let economicPotential = 5.0; // baseline
  if (problemText.includes('growth') || problemText.includes('expansion')) economicPotential += 1.5;
  if (problemText.includes('investment') || problemText.includes('capital'))
    economicPotential += 1.0;
  if (problemText.includes('market') || problemText.includes('opportunity'))
    economicPotential += 0.8;
  if (problemText.includes('revenue') || problemText.includes('profit')) economicPotential += 0.7;

  // Market Accessibility (0-10)
  let marketAccessibility = 5.5; // baseline
  if (problemText.includes('access') || problemText.includes('entry')) marketAccessibility += 1.2;
  if (problemText.includes('partnership') || problemText.includes('collaboration'))
    marketAccessibility += 1.0;
  if (problemText.includes('barrier') || problemText.includes('restriction'))
    marketAccessibility -= 1.5;
  if (problemText.includes('regulation') || problemText.includes('compliance'))
    marketAccessibility -= 0.8;

  // Infrastructure Readiness (0-10)
  let infrastructureReadiness = 6.0; // baseline
  if (problemText.includes('infrastructure') || problemText.includes('development'))
    infrastructureReadiness += 1.3;
  if (problemText.includes('technology') || problemText.includes('digital'))
    infrastructureReadiness += 1.0;
  if (problemText.includes('transport') || problemText.includes('logistics'))
    infrastructureReadiness += 0.8;
  if (problemText.includes('remote') || problemText.includes('rural'))
    infrastructureReadiness -= 1.2;

  // Regulatory Environment (0-10)
  let regulatoryEnvironment = 5.8; // baseline
  if (problemText.includes('government') || problemText.includes('policy'))
    regulatoryEnvironment += 0.8;
  if (problemText.includes('reform') || problemText.includes('improvement'))
    regulatoryEnvironment += 1.2;
  if (problemText.includes('bureaucracy') || problemText.includes('red tape'))
    regulatoryEnvironment -= 1.5;
  if (problemText.includes('corruption') || problemText.includes('transparency'))
    regulatoryEnvironment -= 1.0;

  // Human Capital Availability (0-10)
  let humanCapitalAvailability = 6.2; // baseline
  if (problemText.includes('skilled') || problemText.includes('talent'))
    humanCapitalAvailability += 1.2;
  if (problemText.includes('education') || problemText.includes('training'))
    humanCapitalAvailability += 1.0;
  if (problemText.includes('workforce') || problemText.includes('labor'))
    humanCapitalAvailability += 0.8;
  if (problemText.includes('shortage') || problemText.includes('scarcity'))
    humanCapitalAvailability -= 1.3;

  // Apply country-specific adjustments
  const countryMultipliers = getCountryMultipliers(params.country);
  economicPotential *= countryMultipliers.economic;
  marketAccessibility *= countryMultipliers.market;
  infrastructureReadiness *= countryMultipliers.infrastructure;
  regulatoryEnvironment *= countryMultipliers.regulatory;
  humanCapitalAvailability *= countryMultipliers.humanCapital;

  // Normalize to 0-10 scale
  const metrics: URPMetrics = {
    economicPotential: Math.min(10, Math.max(0, economicPotential)),
    marketAccessibility: Math.min(10, Math.max(0, marketAccessibility)),
    infrastructureReadiness: Math.min(10, Math.max(0, infrastructureReadiness)),
    regulatoryEnvironment: Math.min(10, Math.max(0, regulatoryEnvironment)),
    humanCapitalAvailability: Math.min(10, Math.max(0, humanCapitalAvailability)),
  };

  // Calculate weighted URP Index
  const urpIndex =
    metrics.economicPotential * 0.25 +
    metrics.marketAccessibility * 0.2 +
    metrics.infrastructureReadiness * 0.2 +
    metrics.regulatoryEnvironment * 0.2 +
    metrics.humanCapitalAvailability * 0.15;

  const breakdown = `URP Index Breakdown: Economic Potential (${metrics.economicPotential.toFixed(1)}/10), Market Access (${metrics.marketAccessibility.toFixed(1)}/10), Infrastructure (${metrics.infrastructureReadiness.toFixed(1)}/10), Regulatory Environment (${metrics.regulatoryEnvironment.toFixed(1)}/10), Human Capital (${metrics.humanCapitalAvailability.toFixed(1)}/10)`;

  return { urpIndex: Math.round(urpIndex * 10) / 10, metrics, breakdown };
}

/**
 * Get country-specific multipliers for URP calculation
 */
function getCountryMultipliers(country: string): {
  economic: number;
  market: number;
  infrastructure: number;
  regulatory: number;
  humanCapital: number;
} {
  // Default multipliers
  const defaults = {
    economic: 1.0,
    market: 1.0,
    infrastructure: 1.0,
    regulatory: 1.0,
    humanCapital: 1.0,
  };

  // Country-specific adjustments (simplified for demo)
  const countryAdjustments: Record<string, Partial<typeof defaults>> = {
    Australia: {
      economic: 1.1,
      market: 1.2,
      infrastructure: 1.15,
      regulatory: 1.2,
      humanCapital: 1.1,
    },
    Singapore: {
      economic: 1.15,
      market: 1.25,
      infrastructure: 1.2,
      regulatory: 1.25,
      humanCapital: 1.15,
    },
    'United States': {
      economic: 1.2,
      market: 1.15,
      infrastructure: 1.0,
      regulatory: 1.1,
      humanCapital: 1.1,
    },
    Germany: {
      economic: 1.1,
      market: 1.1,
      infrastructure: 1.15,
      regulatory: 1.15,
      humanCapital: 1.2,
    },
    Japan: {
      economic: 1.05,
      market: 0.95,
      infrastructure: 1.2,
      regulatory: 1.0,
      humanCapital: 1.15,
    },
    India: { economic: 1.3, market: 0.8, infrastructure: 0.7, regulatory: 0.8, humanCapital: 1.0 },
    China: { economic: 1.2, market: 0.9, infrastructure: 1.1, regulatory: 0.7, humanCapital: 1.0 },
    Brazil: { economic: 1.1, market: 0.9, infrastructure: 0.8, regulatory: 0.8, humanCapital: 0.9 },
  };

  return { ...defaults, ...(countryAdjustments[country] || {}) };
}

/**
 * Enhanced NSIL™ AI Analysis Engine
 */
export function runEnhancedNSILAnalysis(params: ReportParameters): NSILAnalysis {
  // Calculate URP Index with detailed metrics
  const { urpIndex, metrics, breakdown } = calculateURPIndex(params);

  // Calculate AGER-AI™ Risk Score (Advanced Geopolitical & Economic Risk)
  const agerRiskScore = calculateAGERRiskScore(params, metrics);

  // Calculate GSM-AI™ Partner Matches (Global Strategic Matching)
  const gsmPartnerMatches = calculateGSMPartnerMatches(params, urpIndex, agerRiskScore);

  // Determine objective category
  const objectiveCategory = determineObjectiveCategory(params.problemStatement);

  // Generate NSIL™ summary
  const summary = generateNSILSummary(params, urpIndex, agerRiskScore, objectiveCategory);

  // Determine recommended tier and pricing
  const { recommendedTier, calculatedPrice } = determineRecommendedTier(
    params,
    urpIndex,
    agerRiskScore
  );

  // Extract opportunities and risks
  const keyOpportunities =
    ENHANCED_NSIL_MATRIX.opportunities[objectiveCategory] ||
    ENHANCED_NSIL_MATRIX.opportunities['Market Expansion'];
  const keyRisks =
    ENHANCED_NSIL_MATRIX.risks[objectiveCategory] || ENHANCED_NSIL_MATRIX.risks['Market Expansion'];

  // Calculate confidence score
  const confidenceScore = calculateConfidenceScore(params, urpIndex, agerRiskScore);

  // Determine if escalation is required
  const escalationRequired = shouldEscalate(params, urpIndex, agerRiskScore, confidenceScore);

  return {
    urpIndex,
    agerRiskScore,
    gsmPartnerMatches,
    recommendedTier,
    calculatedPrice,
    keyOpportunities,
    keyRisks,
    summary: `${summary} ${breakdown}`,
    confidenceScore,
    escalationRequired,
  };
}

/**
 * Calculate AGER-AI™ Risk Score
 */
function calculateAGERRiskScore(params: ReportParameters, metrics: URPMetrics): number {
  let riskScore = 5.0; // baseline

  // Regulatory risk component
  riskScore += (10 - metrics.regulatoryEnvironment) * 0.3;

  // Market access risk
  riskScore += (10 - metrics.marketAccessibility) * 0.25;

  // Infrastructure risk
  riskScore += (10 - metrics.infrastructureReadiness) * 0.2;

  // Economic stability risk
  riskScore += (10 - metrics.economicPotential) * 0.15;

  // Human capital risk
  riskScore += (10 - metrics.humanCapitalAvailability) * 0.1;

  // Add contextual risk factors
  const problemText = params.problemStatement.toLowerCase();
  if (problemText.includes('political') || problemText.includes('instability')) riskScore += 1.5;
  if (problemText.includes('corruption') || problemText.includes('transparency')) riskScore += 1.2;
  if (problemText.includes('conflict') || problemText.includes('tension')) riskScore += 2.0;
  if (problemText.includes('sanctions') || problemText.includes('embargo')) riskScore += 1.8;

  return Math.min(10, Math.max(1, Math.round(riskScore * 10) / 10));
}

/**
 * Calculate GSM-AI™ Partner Matches
 */
function calculateGSMPartnerMatches(
  params: ReportParameters,
  urpIndex: number,
  riskScore: number
): number {
  let baseMatches = 5;

  // Higher URP = more potential partners
  if (urpIndex > 8.0) baseMatches += 4;
  else if (urpIndex > 7.0) baseMatches += 3;
  else if (urpIndex > 6.0) baseMatches += 2;
  else if (urpIndex > 5.0) baseMatches += 1;

  // Lower risk = more willing partners
  if (riskScore < 3.0) baseMatches += 3;
  else if (riskScore < 5.0) baseMatches += 2;
  else if (riskScore < 7.0) baseMatches += 1;
  else if (riskScore > 8.0) baseMatches -= 2;

  // Objective-specific adjustments
  const problemText = params.problemStatement.toLowerCase();
  if (problemText.includes('partnership') || problemText.includes('joint venture'))
    baseMatches += 2;
  if (problemText.includes('government') || problemText.includes('public sector')) baseMatches += 1;
  if (problemText.includes('technology') || problemText.includes('innovation')) baseMatches += 1;

  return Math.max(1, Math.min(15, baseMatches));
}

/**
 * Determine objective category from problem statement
 */
function determineObjectiveCategory(
  problemStatement: string
): keyof typeof ENHANCED_NSIL_MATRIX.opportunities {
  const text = problemStatement.toLowerCase();

  if (text.includes('market') && (text.includes('expansion') || text.includes('entry'))) {
    return 'Market Expansion';
  }
  if (
    text.includes('supply chain') ||
    text.includes('logistics') ||
    text.includes('manufacturing')
  ) {
    return 'Supply Chain Optimization';
  }
  if (
    text.includes('fdi') ||
    text.includes('foreign investment') ||
    text.includes('attract investment')
  ) {
    return 'FDI Attraction';
  }
  if (text.includes('regional development') || text.includes('infrastructure development')) {
    return 'Regional Development';
  }
  if (text.includes('technology') || text.includes('innovation') || text.includes('r&d')) {
    return 'Technology Transfer';
  }
  if (text.includes('resource') || text.includes('mining') || text.includes('extraction')) {
    return 'Resource Development';
  }

  // Default to Market Expansion
  return 'Market Expansion';
}

/**
 * Generate NSIL™ summary
 */
function generateNSILSummary(
  params: ReportParameters,
  urpIndex: number,
  riskScore: number,
  objectiveCategory: string
): string {
  let urpDescription: string;
  if (urpIndex >= 8.5) urpDescription = ENHANCED_NSIL_MATRIX.urp.exceptional;
  else if (urpIndex >= 7.0) urpDescription = ENHANCED_NSIL_MATRIX.urp.high;
  else if (urpIndex >= 5.5) urpDescription = ENHANCED_NSIL_MATRIX.urp.moderate;
  else if (urpIndex >= 4.0) urpDescription = ENHANCED_NSIL_MATRIX.urp.limited;
  else urpDescription = ENHANCED_NSIL_MATRIX.urp.low;

  let riskDescription: string;
  if (riskScore <= 2.5) riskDescription = ENHANCED_NSIL_MATRIX.risk.minimal;
  else if (riskScore <= 4.0) riskDescription = ENHANCED_NSIL_MATRIX.risk.low;
  else if (riskScore <= 6.0) riskDescription = ENHANCED_NSIL_MATRIX.risk.moderate;
  else if (riskScore <= 7.5) riskDescription = ENHANCED_NSIL_MATRIX.risk.elevated;
  else riskDescription = ENHANCED_NSIL_MATRIX.risk.high;

  return `NSIL™ Analysis: For your ${objectiveCategory.toLowerCase()} objective "${params.problemStatement.substring(0, 100)}...", our AI indicates the target region ${urpDescription} ${riskDescription}`;
}

/**
 * Determine recommended tier and pricing
 */
function determineRecommendedTier(
  params: ReportParameters,
  urpIndex: number,
  riskScore: number
): { recommendedTier: string; calculatedPrice: number } {
  let recommendedTier = 'Tier 1 Strategic Brief';
  let basePrice = 50000;

  // Tier determination logic
  if (riskScore > 6.5 || urpIndex > 8.0) {
    recommendedTier = 'Tier 3 Transformation Simulator';
    basePrice = 400000;
  } else if (riskScore > 4.5 || urpIndex > 7.0) {
    recommendedTier = 'Tier 2 Partnership Facilitator';
    basePrice = 150000;
  }

  // Persona-based adjustments
  if (params.persona === 'Government') {
    basePrice *= 1.2;
    if (riskScore > 5.0) {
      recommendedTier = 'Tier 3 Transformation Simulator';
      basePrice = 400000 * 1.2;
    }
  } else if (params.persona === 'Multi-lateral') {
    basePrice *= 1.5;
    recommendedTier = 'Tier 3 Transformation Simulator';
    basePrice = 400000 * 1.5;
  }

  // Organization size adjustments (if available)
  const orgText = (params.organization || '').toLowerCase();
  if (orgText.includes('enterprise') || orgText.includes('corporation')) {
    basePrice *= 1.5;
  }
  if (orgText.includes('multinational') || orgText.includes('global')) {
    basePrice *= 2.0;
  }

  return { recommendedTier, calculatedPrice: Math.round(basePrice) };
}

/**
 * Calculate confidence score for the analysis
 */
function calculateConfidenceScore(
  params: ReportParameters,
  urpIndex: number,
  riskScore: number
): number {
  let confidence = 75; // baseline

  // More detailed problem statement = higher confidence
  const problemLength = params.problemStatement.length;
  if (problemLength > 200) confidence += 10;
  else if (problemLength > 100) confidence += 5;
  else if (problemLength < 50) confidence -= 10;

  // Document upload increases confidence
  if (params.uploadedDocument) confidence += 8;

  // Refined problem statement increases confidence
  if (params.refinedProblemStatement) confidence += 5;

  // Extreme URP or risk scores reduce confidence
  if (urpIndex > 9.0 || urpIndex < 3.0) confidence -= 5;
  if (riskScore > 8.5 || riskScore < 1.5) confidence -= 5;

  // Country information increases confidence
  if (params.country && params.country !== 'Other...') confidence += 3;

  return Math.min(95, Math.max(45, confidence));
}

/**
 * Determine if escalation to human expert is required
 */
function shouldEscalate(
  params: ReportParameters,
  urpIndex: number,
  riskScore: number,
  confidenceScore: number
): boolean {
  // High-risk scenarios
  if (riskScore > 8.0) return true;

  // Low confidence scenarios
  if (confidenceScore < 60) return true;

  // Extreme URP scenarios
  if (urpIndex > 9.2 || urpIndex < 2.5) return true;

  // Large organization indicators
  const orgText = (params.organization || '').toLowerCase();
  if (
    orgText.includes('multinational') ||
    orgText.includes('government') ||
    orgText.includes('ministry')
  ) {
    return true;
  }

  // Complex problem statements
  const problemText = params.problemStatement.toLowerCase();
  if (
    problemText.includes('geopolitical') ||
    problemText.includes('sanctions') ||
    problemText.includes('conflict')
  ) {
    return true;
  }

  return false;
}

/**
 * Smart Trade Officer AI - Provides specialized guidance for permitting, zoning, and investor relations
 */
export interface SmartTradeOfficerResponse {
  guidance: string;
  actionItems: string[];
  timelineEstimate: string;
  riskFactors: string[];
  recommendedContacts: string[];
}

export function getSmartTradeOfficerGuidance(
  params: ReportParameters,
  nsilAnalysis: NSILAnalysis
): SmartTradeOfficerResponse {
  const objectiveCategory = determineObjectiveCategory(params.problemStatement);
  const country = params.country || 'Unknown';

  let guidance = `Based on your ${objectiveCategory.toLowerCase()} objective in ${country}, here's my specialized guidance:`;
  let actionItems: string[] = [];
  let timelineEstimate = '6-12 months';
  let riskFactors: string[] = [];
  let recommendedContacts: string[] = [];

  // Category-specific guidance
  switch (objectiveCategory) {
    case 'FDI Attraction':
      guidance +=
        ' Focus on establishing investment promotion agency relationships and preparing comprehensive investment packages.';
      actionItems = [
        'Engage with national investment promotion agency',
        'Prepare detailed investment proposal with financial projections',
        'Identify and approach potential anchor investors',
        'Develop investor-friendly policy framework',
      ];
      timelineEstimate = '8-18 months';
      riskFactors = [
        'Policy changes affecting investment incentives',
        'Competition from other regions',
        'Regulatory approval delays',
      ];
      recommendedContacts = [
        'Investment Promotion Agency Director',
        'Ministry of Finance Investment Division',
        'Chamber of Commerce International Relations',
      ];
      break;

    case 'Market Expansion':
      guidance +=
        ' Prioritize market research, regulatory compliance, and local partnership development.';
      actionItems = [
        'Conduct comprehensive market analysis and competitor mapping',
        'Establish local legal entity and regulatory compliance',
        'Identify and evaluate potential local partners',
        'Develop market entry strategy and go-to-market plan',
      ];
      timelineEstimate = '4-8 months';
      riskFactors = [
        'Local competition response',
        'Regulatory compliance complexity',
        'Cultural adaptation challenges',
      ];
      recommendedContacts = [
        'Local Chamber of Commerce',
        'Industry Association Representatives',
        'Legal and Regulatory Advisors',
      ];
      break;

    case 'Supply Chain Optimization':
      guidance +=
        ' Focus on logistics infrastructure assessment and supplier relationship development.';
      actionItems = [
        'Map existing supply chain infrastructure and identify bottlenecks',
        'Evaluate potential suppliers and logistics partners',
        'Assess regulatory requirements for cross-border operations',
        'Develop contingency plans for supply chain disruptions',
      ];
      timelineEstimate = '6-10 months';
      riskFactors = [
        'Infrastructure capacity constraints',
        'Supplier reliability issues',
        'Cross-border regulatory changes',
      ];
      recommendedContacts = [
        'Logistics Association Representatives',
        'Port Authority Officials',
        'Customs and Trade Facilitation Officers',
      ];
      break;

    default:
      actionItems = [
        'Conduct stakeholder mapping and engagement strategy',
        'Assess regulatory and compliance requirements',
        'Develop risk mitigation and contingency plans',
        'Establish monitoring and evaluation framework',
      ];
      riskFactors = [
        'Regulatory uncertainty',
        'Stakeholder alignment challenges',
        'Resource availability constraints',
      ];
      recommendedContacts = [
        'Government Relations Specialists',
        'Industry Experts',
        'Local Advisory Board Members',
      ];
  }

  // Risk-based adjustments
  if (nsilAnalysis.agerRiskScore > 7.0) {
    timelineEstimate = '12-24 months';
    riskFactors.unshift('High political/economic risk environment');
    actionItems.unshift('Develop comprehensive risk assessment and mitigation strategy');
  }

  // URP-based adjustments
  if (nsilAnalysis.urpIndex > 8.0) {
    actionItems.push('Fast-track implementation to capitalize on high potential');
    recommendedContacts.push('Senior Government Officials', 'Key Industry Leaders');
  }

  return {
    guidance,
    actionItems,
    timelineEstimate,
    riskFactors,
    recommendedContacts,
  };
}