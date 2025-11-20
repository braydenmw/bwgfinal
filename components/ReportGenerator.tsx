
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReportParameters, UserProfile as UserProfileType, ReportSuggestions } from '../types.ts';
import { generateReportStream, startReportGeneration, checkReportStatus } from '../services/nexusService.ts';
import { REGIONS_AND_COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, ANALYTICAL_LENSES, TONES_AND_STYLES, TIERS_BY_ORG_TYPE, ANALYTICAL_MODULES } from '../constants.tsx';
import Spinner from './Spinner.tsx';
import { Inquire } from './Inquire.tsx';
import { CustomPersonaIcon, CustomIndustryIcon, ArrowUpIcon, NexusLogo } from './Icons.tsx';
import QualityAnalysis from './QualityAnalysis.tsx';
import { ProfileStep } from './ProfileStep.tsx';
import { TradeDisruptionDisplay, TradeDisruptionAnalyzer } from './TradeDisruptionModel.tsx';
import { MarketDiversificationDashboard } from './MarketDiversificationModule.tsx';
import GlobalComparativeEngine from './GlobalComparativeEngine.tsx';
import StakeholderPerspectiveModule from './StakeholderPerspectiveModule.tsx';
import PredictiveGrowthModel from './PredictiveGrowthModel.tsx';
import AlternativeLocationMatcher from './AlternativeLocationMatcher.tsx';
import IntelligenceDashboard from './IntelligenceDashboard.tsx';
import { runEnhancedNSILAnalysis, getSmartTradeOfficerGuidance } from './NSILEngine.ts';
import { ReviewStep } from './ReviewStep.tsx';
import Stepper from './Stepper';

interface ReportGeneratorProps {
    params: ReportParameters;
    onParamsChange: (params: ReportParameters) => void;
    onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
    onProfileUpdate: (profile: UserProfileType) => void;
    isGenerating: boolean; 
    onApplySuggestions: (suggestions: ReportSuggestions) => void;
    savedReports: ReportParameters[];
    onSaveReport: (params: ReportParameters) => void;
    onLoadReport: (params: ReportParameters) => void;
    onDeleteReport: (reportName: string) => void;
    onScopeComplete: () => void;
    wizardStep?: number;
    onNextStep?: () => void;
    onPrevStep?: () => void;
    canGoNext?: boolean;
    canGoPrev?: boolean;
}

const WIZARD_PAGES = [
    { id: 1, title: 'Scope & Context', steps: [1, 2, 3] },
    { id: 2, title: 'Analysis & Strategy', steps: [4, 5, 6] },
    { id: 3, title: 'Execution & Planning', steps: [7, 8, 9] },
    { id: 4, title: 'Finalization & Generation', steps: [10, 11, 12] }
];

const StepCard: React.FC<{ title: string; stepNumber: number; children: React.ReactNode }> = ({ title, stepNumber, children }) => (
    <div className="bg-nexus-surface-800 border border-nexus-border-medium rounded-xl shadow-lg">
        <header className="p-4 border-b border-nexus-border-medium flex items-center gap-4 bg-nexus-surface-900/50 rounded-t-xl">
            <div className="w-8 h-8 flex-shrink-0 bg-nexus-accent-cyan/10 text-nexus-accent-cyan rounded-full flex items-center justify-center font-bold text-sm">{stepNumber}</div>
            <h3 className="font-bold text-nexus-text-primary text-lg">{title}</h3>
        </header>
        <div className="p-6 space-y-6">
            {children}
        </div>
    </div>
);

const WIZARD_STEPS = [
    { id: 1, title: 'Profile Setup', page: 1 },
    { id: 2, title: 'Strategic Context', page: 1 },
    { id: 3, title: 'Partnership & Objectives', page: 1 },
    { id: 4, title: 'Analysis Configuration', page: 2 },
    { id: 5, title: 'Risk Assessment', page: 2 },
    { id: 6, title: 'SEAM Architecture', page: 2 },
    { id: 7, title: 'Technology Transfer', page: 3 },
    { id: 8, title: 'Implementation Roadmap', page: 3 },
    { id: 9, title: 'Resource Allocation', page: 3 },
    { id: 10, title: 'Performance Metrics', page: 4 },
    { id: 11, title: 'Sustainability & Final Setup', page: 4 },
    { id: 12, title: 'Review & Generate', page: 4 }
];

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
    params,
    onParamsChange,
    onReportUpdate,
    onProfileUpdate,
    isGenerating,
    ...restInquireProps
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [aiInteractionState, setAiInteractionState] = useState<'idle' | 'welcomed' | 'prompted' | 'answeredPrompt' | 'active'>('idle');

    const [targetRegion, setTargetRegion] = useState('');
    const [targetCountry, setTargetCountry] = useState('');
    const [targetCity, setTargetCity] = useState('');

    // NSIL Analysis state
    const [nsilAnalysis, setNsIlAnalysis] = useState<any>(null);
    const [smartTradeGuidance, setSmartTradeGuidance] = useState<any>(null);

    const handleStepClick = (stepNumber: number) => {
        const page = WIZARD_STEPS.find(s => s.id === stepNumber)?.page || 1;
        if (page < currentPage)
            setCurrentPage(page);
    };

    // DEBUG: Force default organization type if missing
    useEffect(() => {
        if (!params.organizationType || params.organizationType === '') {
            handleChange('organizationType', 'Default');
        }
    }, [params.organizationType]);

    const [showScroll, setShowScroll] = useState(false);
    const scrollPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;
        const handleScroll = () => setShowScroll(panel.scrollTop > 300);
        panel.addEventListener('scroll', handleScroll);
        return () => panel.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => scrollPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        if (params.reportName.trim() && aiInteractionState !== 'active') {
            setAiInteractionState('active');
        }
    }, [params.reportName, aiInteractionState]);

    const handleChange = (field: keyof ReportParameters, value: any) => {
        onParamsChange({ ...params, [field]: value });
    };

    // Handle organization type changes - reset location fields when switching between government and non-government orgs
    useEffect(() => {
        const isGovernmentOrg = params.organizationType?.includes('Government') ||
                               params.organizationType === 'Investment Promotion Agency';

        if (isGovernmentOrg && params.userTier) {
            // For government orgs, we use userTier instead of region
            setTargetRegion('');
            setTargetCountry(params.userCountry || '');
            setTargetCity('');
        } else if (!isGovernmentOrg) {
            // For non-government orgs, handle region-based location
            const regionValue = params.region;
            if (regionValue) {
                const parts = regionValue.split(',').map(p => p.trim());
                const potentialCountry = parts[parts.length - 1];
                const foundRegionData = REGIONS_AND_COUNTRIES.find(r => r.countries.includes(potentialCountry));

                if (foundRegionData) {
                    setTargetRegion(foundRegionData.name);
                    setTargetCountry(potentialCountry);
                    setTargetCity(parts.slice(0, -1).join(', '));
                } else {
                    setTargetRegion('');
                    setTargetCountry('');
                    setTargetCity('');
                }
            } else {
                setTargetRegion('');
                setTargetCountry('');
                setTargetCity('');
            }
        }
    }, [params.region, params.organizationType, params.userTier, params.userCountry]);
    
    useEffect(() => {
        const combinedRegion = [targetCity, targetCountry].filter(Boolean).join(', ');
        if (combinedRegion !== params.region) {
            handleChange('region', combinedRegion);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetCity, targetCountry]);

    const handleMultiSelectToggle = (field: 'aiPersona' | 'analyticalLens' | 'toneAndStyle' | 'industry' | 'tier', value: string) => {
        const currentValues = params[field] as string[] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        
        if ((field === 'aiPersona' || field === 'industry') && newValues.length === 0 && (params[field] as string[]).length > 0) {
            return;
        }

        onParamsChange({ ...params, [field]: newValues });
    };
    
    const getValidationErrors = useCallback((page: number): string[] => {
        const errors: string[] = [];
        switch(page) {
            case 1:
                if (!params.userName.trim()) errors.push("Your Name is required.");
                if (!params.reportName.trim()) errors.push("Report Name is required.");
                if (!params.region.trim()) errors.push("A target location is required.");
                if (params.industry.length === 0) errors.push("At least one Core Industry must be selected.");
                if (params.industry.includes('Custom') && !params.customIndustry?.trim()) errors.push("Custom Industry Definition is required.");
                if (!params.idealPartnerProfile.trim()) errors.push("Ideal Partner Profile is required.");
                if (!params.problemStatement.trim()) errors.push("Core Objective is required.");
                break;
            case 2:
                if (params.tier.length === 0) errors.push("At least one Report Tier must be selected.");
                if (params.aiPersona.length === 0) errors.push("At least one AI Analyst persona must be selected.");
                if (params.aiPersona.includes('Custom') && !params.customAiPersona?.trim()) errors.push("Custom Persona Definition is required.");
                break;
            default: break;
        }
        return errors;
    }, [params]);

    const nextPage = () => {
        setError(null);
        scrollToTop();
        const validationErrors = getValidationErrors(currentPage);
        if (validationErrors.length === 0) {
            if (currentPage < WIZARD_PAGES.length) setCurrentPage(p => p + 1);
        } else {
            setError(validationErrors.join(' '));
        }
    };

    const prevPage = () => {
        setError(null);
        scrollToTop();
        if (currentPage > 1) setCurrentPage(p => p - 1);
    };

    const handleScopeComplete = () => {
        // This might need adjustment based on new flow
        setCurrentPage(1);
        scrollToTop();
    };

    const handleGenerateReport = useCallback(async () => {
        setError(null);
        const allErrors = [...getValidationErrors(1), ...getValidationErrors(2), ...getValidationErrors(3), ...getValidationErrors(4)];
        if (allErrors.length > 0) {
            setError("Please complete all required fields. Missing: " + allErrors.join(', '));
            return;
        }

        onProfileUpdate({ userName: params.userName, userDepartment: params.userDepartment, organizationType: params.organizationType, userCountry: params.userCountry, userTier: params.userTier });
        onReportUpdate(params, '', null, true);

        try {
            // Use new async job queue system
            const jobId = await startReportGeneration(params);

            // Poll for completion
            const pollForCompletion = async () => {
                try {
                    const status = await checkReportStatus(jobId);
                    if (status.status === 'complete') {
                        onReportUpdate(params, status.result || '', null, false);
                    } else if (status.status === 'failed') {
                        onReportUpdate(params, '', status.error || 'Report generation failed', false);
                    } else {
                        // Still processing, poll again in 2 seconds
                        setTimeout(pollForCompletion, 2000);
                    }
                } catch (pollError) {
                    console.error('Polling error:', pollError);
                    setTimeout(pollForCompletion, 2000);
                }
            };

            // Start polling
            setTimeout(pollForCompletion, 2000);

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            setError(errorMessage);
            onReportUpdate(params, '', errorMessage, false);
        }
    }, [params, onReportUpdate, onProfileUpdate, getValidationErrors]);

    const inputStyles = "w-full p-3 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg focus:ring-2 focus:ring-nexus-accent-cyan focus:outline-none transition-all duration-200 placeholder:text-nexus-text-muted text-nexus-text-primary shadow-sm text-sm";
    const labelStyles = "block text-sm font-semibold text-nexus-text-primary mb-2";
    const currentTiers = TIERS_BY_ORG_TYPE[params.organizationType] || TIERS_BY_ORG_TYPE['Default'] || [];

    const renderPageContent = () => {
        const stepsForPage = WIZARD_STEPS.filter(s => s.page === currentPage);

        return (
            <div className="space-y-8">
                {stepsForPage.map(step => {
                    switch (step.id) {
                        case 1: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Set up your profile and define the high-level scope of your intelligence report.</p>
                                <ProfileStep params={params} handleChange={handleChange} inputStyles={inputStyles} labelStyles={labelStyles} />
                            </StepCard>
                        );
                        case 2: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Define your market opportunity and geographic focus.</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Target Region *</label>
                                        <select value={targetRegion} onChange={e => { setTargetRegion(e.target.value); setTargetCountry(''); setTargetCity(''); }} className={`${inputStyles} text-base`} aria-label="Target Region">
                                            <option value="">Select Global Region</option>
                                            {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Target Country *</label>
                                        <select value={targetCountry} onChange={e => setTargetCountry(e.target.value)} disabled={!targetRegion} className={`${inputStyles} disabled:bg-nexus-surface-900 disabled:text-nexus-text-muted text-base`} aria-label="Target Country">
                                            <option value="">Select Country</option>
                                            {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Target City / Area</label>
                                        <input type="text" value={targetCity} onChange={e => setTargetCity(e.target.value)} className={`${inputStyles} text-base`} placeholder="e.g., Davao City, Metro Manila" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Analysis Timeframe</label>
                                        <select value={params.analysisTimeframe} onChange={e => handleChange('analysisTimeframe', e.target.value)} className={`${inputStyles} text-base`} aria-label="Analysis Timeframe">
                                            <option>Any Time</option><option>Last 6 Months</option><option>Last 12 Months</option><option>Last 2 Years</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={`${labelStyles} text-base`}>Core Industry Focus *</label>
                                    <div className="bg-nexus-surface-900 p-4 rounded-xl border border-nexus-border-medium mt-2">
                                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                            {INDUSTRIES.map((industry) => (
                                                <button key={industry.id} onClick={() => handleMultiSelectToggle('industry', industry.id)} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-800 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.industry.includes(industry.id) ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`}>
                                                    <industry.icon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.industry.includes(industry.id) ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                                    <span className="font-semibold text-nexus-text-primary text-xs leading-tight">{industry.title}</span>
                                                </button>
                                            ))}
                                            <button onClick={() => handleMultiSelectToggle('industry', 'Custom')} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-800 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.industry.includes('Custom') ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`} title="Define a custom industry">
                                                <CustomIndustryIcon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.industry.includes('Custom') ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                                <span className="font-semibold text-nexus-text-primary text-xs leading-tight">Custom</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {params.industry.includes('Custom') && (
                                    <div className="mt-2">
                                        <label className={labelStyles}>Custom Industry Definition *</label>
                                        <textarea value={params.customIndustry} onChange={e => handleChange('customIndustry', e.target.value)} rows={2} className={inputStyles} placeholder="Describe the custom industry or niche sector..." />
                                    </div>
                                )}
                            </StepCard>
                        );
                        case 3: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Define your ideal partner and core strategic objectives.</p>
                                <div>
                                    <label className={`${labelStyles} text-base`}>Describe Your Ideal Partner *</label>
                                    <textarea value={params.idealPartnerProfile} onChange={e => handleChange('idealPartnerProfile', e.target.value)} rows={4} className={`${inputStyles} text-base resize-y`} placeholder="Describe your ideal strategic partner in detail..." />
                                    <p className="text-xs text-nexus-text-muted mt-2">Specificity enables precise matching algorithms.</p>
                                </div>
                                <div>
                                    <label className={`${labelStyles} text-base`}>Define Core Strategic Objective (The 'Why') *</label>
                                    <textarea value={params.problemStatement} onChange={e => handleChange('problemStatement', e.target.value)} rows={5} className={`${inputStyles} text-base resize-y`} placeholder="Articulate your strategic objective. What challenge are you addressing? What opportunity are you pursuing?" />
                                    <p className="text-xs text-nexus-text-muted mt-2">Clear objectives enable targeted, actionable intelligence.</p>
                                </div>
                            </StepCard>
                        );
                        case 4: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Configure your analysis frameworks and AI intelligence settings.</p>
                                <div>
                                    <h4 className="text-base font-bold text-nexus-text-primary mb-2">Analysis Tiers (Methodology)</h4>
                                    <p className="text-nexus-text-secondary text-sm mb-4">Select one or more strategic frameworks for your report. The AI will synthesize the outputs into a single, cohesive intelligence blueprint.</p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {currentTiers.length > 0 ? currentTiers.map((tier) => (
                                            <label key={tier.id} className={`p-4 rounded-xl text-left border-2 transition-all duration-300 w-full flex flex-col h-full cursor-pointer bg-nexus-surface-900 hover:bg-nexus-surface-700 shadow-sm hover:shadow-lg ${params.tier.includes(tier.id) ? 'border-nexus-accent-cyan scale-105 shadow-xl ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-nexus-text-primary text-lg">{tier.title}</span>
                                                    <input type="checkbox" checked={params.tier.includes(tier.id)} onChange={() => handleMultiSelectToggle('tier', tier.id)} className="h-5 w-5 rounded border-nexus-border-strong bg-nexus-surface-700 text-nexus-accent-cyan focus:ring-nexus-accent-cyan focus:ring-2" />
                                                </div>
                                                <p className="text-sm text-nexus-text-secondary mb-4 flex-grow">{tier.desc}</p>
                                                <div className="border-t border-nexus-border-medium pt-3">
                                                    <p className="text-xs font-bold text-nexus-text-primary mb-2 uppercase tracking-wide">Capabilities</p>
                                                    <ul className="text-xs text-nexus-text-secondary space-y-1">
                                                        {tier.features.map(f => <li key={f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-nexus-accent-cyan rounded-full"></span> {f}</li>)}
                                                    </ul>
                                                </div>
                                            </label>
                                        )) : (
                                            <div className="col-span-2 p-6 text-center bg-nexus-surface-900 border-2 border-dashed border-nexus-border-medium rounded-xl">
                                                <p className="text-nexus-text-secondary">No tiers available for the selected organization type.</p>
                                                <p className="text-xs text-nexus-text-muted mt-2">Please select a different organization type or contact support.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-nexus-border-medium">
                                    <label className={`${labelStyles} text-base`}>Configure Your AI Analyst Team *</label>
                                    <p className="text-nexus-text-secondary text-sm mt-2 mb-4">Select one or more AI personas. The AI will synthesize their expertise to provide a multi-faceted analysis.</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {AI_PERSONAS.map((persona) => (
                                            <button key={persona.id} onClick={() => handleMultiSelectToggle('aiPersona', persona.id)} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-900 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.aiPersona.includes(persona.id) ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`} title={persona.description}>
                                                <persona.icon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.aiPersona.includes(persona.id) ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                                <span className="font-semibold text-nexus-text-primary text-xs leading-tight">{persona.title}</span>
                                            </button>
                                        ))}
                                        <button onClick={() => handleMultiSelectToggle('aiPersona', 'Custom')} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-900 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.aiPersona.includes('Custom') ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`} title="Define a custom persona">
                                            <CustomPersonaIcon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.aiPersona.includes('Custom') ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                            <span className="font-semibold text-nexus-text-primary text-xs leading-tight">Custom</span>
                                        </button>
                                    </div>
                                    {params.aiPersona.includes('Custom') && (
                                        <div className="mt-4">
                                            <label className={labelStyles}>Custom Persona Definition *</label>
                                            <textarea value={params.customAiPersona} onChange={e => handleChange('customAiPersona', e.target.value)} rows={3} className={inputStyles} placeholder="Describe the persona's expertise, focus, and tone..." />
                                        </div>
                                    )}
                                </div>
                            </StepCard>
                        );
                        case 5: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Comprehensive risk assessment using NSIL AI analysis framework.</p>
                                <div className="space-y-6">
                                    {!nsilAnalysis ? (
                                        <div className="text-center py-8">
                                            <button
                                                onClick={() => {
                                                    const analysis = runEnhancedNSILAnalysis(params);
                                                    setNsIlAnalysis(analysis);
                                                }}
                                                className="px-6 py-3 bg-nexus-accent-cyan text-white font-semibold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors"
                                            >
                                                Run NSIL Risk Assessment
                                            </button>
                                            <p className="text-xs text-nexus-text-muted mt-4">Click to generate comprehensive risk analysis using AI-powered NSIL framework</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                                <h4 className="font-semibold text-nexus-accent-cyan mb-2">NSIL Risk Assessment Results</h4>
                                                <div className="grid md:grid-cols-3 gap-4 mb-4">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-nexus-accent-brown">{nsilAnalysis.urpIndex}</div>
                                                        <div className="text-xs text-nexus-text-secondary">URP Index</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-red-400">{nsilAnalysis.agerRiskScore}</div>
                                                        <div className="text-xs text-nexus-text-secondary">Risk Score</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-green-400">{nsilAnalysis.gsmPartnerMatches}</div>
                                                        <div className="text-xs text-nexus-text-secondary">Partner Matches</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-nexus-text-secondary">{nsilAnalysis.summary}</p>
                                            </div>

                                            <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                                <h4 className="font-semibold text-nexus-accent-cyan mb-2">Key Risk Factors</h4>
                                                <ul className="space-y-2">
                                                    {nsilAnalysis.keyRisks.map((risk: string, index: number) => (
                                                        <li key={index} className="flex items-start gap-2 text-sm">
                                                            <span className="text-red-400 mt-1">⚠️</span>
                                                            <span className="text-nexus-text-secondary">{risk}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </StepCard>
                        );
                        case 6: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Design symbiotic ecosystem architecture for strategic partnerships.</p>
                                <div className="space-y-6">
                                    {nsilAnalysis && (
                                        <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                            <h4 className="font-semibold text-nexus-accent-cyan mb-2">SEAM Architecture Analysis</h4>
                                            <p className="text-sm text-nexus-text-secondary mb-4">
                                                Based on your URP Index of {nsilAnalysis.urpIndex} and risk score of {nsilAnalysis.agerRiskScore},
                                                we've identified {nsilAnalysis.gsmPartnerMatches} potential strategic partners.
                                            </p>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-nexus-surface-800 rounded">
                                                    <span className="text-sm font-medium">Anchor Partners</span>
                                                    <span className="text-nexus-accent-cyan">High Priority</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-nexus-surface-800 rounded">
                                                    <span className="text-sm font-medium">Innovation Partners</span>
                                                    <span className="text-nexus-accent-brown">Medium Priority</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-nexus-surface-800 rounded">
                                                    <span className="text-sm font-medium">Capital Partners</span>
                                                    <span className="text-green-400">Strategic Focus</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center py-4">
                                        <p className="text-nexus-text-secondary">SEAM Architecture visualization will be implemented here</p>
                                        <p className="text-xs text-nexus-text-muted mt-2">Interactive partner ecosystem mapping</p>
                                    </div>
                                </div>
                            </StepCard>
                        );
                        case 7: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Plan technology transfer and innovation integration strategies.</p>
                                <div className="space-y-6">
                                    {nsilAnalysis && (
                                        <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                            <h4 className="font-semibold text-nexus-accent-cyan mb-2">Technology Transfer Assessment</h4>
                                            <div className="space-y-3">
                                                {nsilAnalysis.keyOpportunities.filter((opp: string) => opp.toLowerCase().includes('technology') || opp.toLowerCase().includes('innovation')).map((tech: string, index: number) => (
                                                    <div key={index} className="p-3 bg-nexus-surface-800 rounded">
                                                        <p className="text-sm text-nexus-text-secondary">{tech}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center py-4">
                                        <p className="text-nexus-text-secondary">Technology transfer roadmap will be implemented here</p>
                                        <p className="text-xs text-nexus-text-muted mt-2">Innovation integration planning</p>
                                    </div>
                                </div>
                            </StepCard>
                        );
                        case 8: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Develop comprehensive implementation roadmap with milestones.</p>
                                <div className="space-y-6">
                                    {nsilAnalysis && (
                                        <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                            <h4 className="font-semibold text-nexus-accent-cyan mb-2">Implementation Timeline</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 p-2 bg-nexus-surface-800 rounded">
                                                    <div className="w-3 h-3 bg-nexus-accent-cyan rounded-full"></div>
                                                    <span className="text-sm">Phase 1: Planning & Setup (0-3 months)</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-2 bg-nexus-surface-800 rounded">
                                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                                    <span className="text-sm">Phase 2: Initial Implementation (3-9 months)</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-2 bg-nexus-surface-800 rounded">
                                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                    <span className="text-sm">Phase 3: Scaling & Optimization (9-18 months)</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center py-4">
                                        <p className="text-nexus-text-secondary">Interactive roadmap builder will be implemented here</p>
                                        <p className="text-xs text-nexus-text-muted mt-2">Milestone planning and dependency mapping</p>
                                    </div>
                                </div>
                            </StepCard>
                        );
                        case 9: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Optimize resource allocation and budget planning.</p>
                                <div className="space-y-6">
                                    {nsilAnalysis && (
                                        <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                            <h4 className="font-semibold text-nexus-accent-cyan mb-2">Resource Allocation Analysis</h4>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="text-center p-3 bg-nexus-surface-800 rounded">
                                                    <div className="text-lg font-bold text-nexus-accent-brown">${nsilAnalysis.calculatedPrice.toLocaleString()}</div>
                                                    <div className="text-xs text-nexus-text-secondary">Recommended Budget</div>
                                                </div>
                                                <div className="text-center p-3 bg-nexus-surface-800 rounded">
                                                    <div className="text-lg font-bold text-green-400">{nsilAnalysis.confidenceScore}%</div>
                                                    <div className="text-xs text-nexus-text-secondary">Confidence Level</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center py-4">
                                        <p className="text-nexus-text-secondary">Resource optimization tools will be implemented here</p>
                                        <p className="text-xs text-nexus-text-muted mt-2">Budget planning and ROI analysis</p>
                                    </div>
                                </div>
                            </StepCard>
                        );
                        case 10: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Define success metrics and monitoring frameworks.</p>
                                <div className="space-y-6">
                                    <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                        <h4 className="font-semibold text-nexus-accent-cyan mb-2">Performance Metrics Framework</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-nexus-surface-800 rounded">
                                                <h5 className="font-medium text-nexus-text-primary">Financial Metrics</h5>
                                                <ul className="text-xs text-nexus-text-secondary mt-1 space-y-1">
                                                    <li>• ROI and IRR calculations</li>
                                                    <li>• Cost-benefit analysis</li>
                                                    <li>• Budget vs. actual tracking</li>
                                                </ul>
                                            </div>
                                            <div className="p-3 bg-nexus-surface-800 rounded">
                                                <h5 className="font-medium text-nexus-text-primary">Operational Metrics</h5>
                                                <ul className="text-xs text-nexus-text-secondary mt-1 space-y-1">
                                                    <li>• Timeline adherence</li>
                                                    <li>• Milestone completion rates</li>
                                                    <li>• Stakeholder satisfaction</li>
                                                </ul>
                                            </div>
                                            <div className="p-3 bg-nexus-surface-800 rounded">
                                                <h5 className="font-medium text-nexus-text-primary">Impact Metrics</h5>
                                                <ul className="text-xs text-nexus-text-secondary mt-1 space-y-1">
                                                    <li>• Economic development indicators</li>
                                                    <li>• Job creation metrics</li>
                                                    <li>• Regional growth contributions</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <p className="text-nexus-text-secondary">Interactive metrics dashboard will be implemented here</p>
                                        <p className="text-xs text-nexus-text-muted mt-2">KPI definition and monitoring setup</p>
                                    </div>
                                </div>
                            </StepCard>
                        );
                        case 11: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Develop long-term sustainability and monitoring plans.</p>
                                <div className="space-y-6">
                                    <div className="bg-nexus-surface-900 p-4 rounded-lg border border-nexus-border-medium">
                                        <h4 className="font-semibold text-nexus-accent-cyan mb-2">Sustainability Framework</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-nexus-surface-800 rounded">
                                                <h5 className="font-medium text-nexus-text-primary">Environmental Sustainability</h5>
                                                <p className="text-xs text-nexus-text-secondary mt-1">Carbon footprint reduction, resource conservation, environmental impact monitoring</p>
                                            </div>
                                            <div className="p-3 bg-nexus-surface-800 rounded">
                                                <h5 className="font-medium text-nexus-text-primary">Economic Sustainability</h5>
                                                <p className="text-xs text-nexus-text-secondary mt-1">Long-term financial viability, economic diversification, wealth creation</p>
                                            </div>
                                            <div className="p-3 bg-nexus-surface-800 rounded">
                                                <h5 className="font-medium text-nexus-text-primary">Social Sustainability</h5>
                                                <p className="text-xs text-nexus-text-secondary mt-1">Community development, stakeholder engagement, social impact measurement</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <p className="text-nexus-text-secondary">Sustainability planning tools will be implemented here</p>
                                        <p className="text-xs text-nexus-text-muted mt-2">Long-term viability assessment</p>
                                    </div>
                                </div>
                            </StepCard>
                        );
                        case 12: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Review all configurations and prepare for report generation.</p>
                                <ReviewStep
                                    reportData={{
                                        type: 'Intelligence Blueprint',
                                        title: params.reportName || 'Untitled Report',
                                        sections: [
                                            { title: 'Strategic Context', content: params.problemStatement || 'Not defined' },
                                            { title: 'Target Region', content: params.region || 'Not specified' },
                                            { title: 'Analysis Framework', content: params.tier.join(', ') || 'Not selected' },
                                            { title: 'AI Analysis Team', content: params.aiPersona.join(', ') || 'Not configured' }
                                        ],
                                        analysisPoints: [
                                            'Regional opportunity assessment completed',
                                            'Risk analysis framework established',
                                            'Partner ecosystem mapped',
                                            'Implementation roadmap defined'
                                        ],
                                        recommendations: [
                                            'Proceed with intelligence blueprint generation',
                                            'Schedule stakeholder engagement sessions',
                                            'Initiate partner outreach program',
                                            'Establish monitoring and evaluation framework'
                                        ]
                                    }}
                                    updateReportData={() => {}} // Read-only for review
                                />
                            </StepCard>
                        );
                        default: return null;
                    }
                })}
            </div>
        );
    };


    // Reset terms acceptance on page refresh
    useEffect(() => {
        localStorage.removeItem('bwga-nexus-terms-accepted');
    }, []);

    return (
        <div className="flex h-screen bg-nexus-primary-900 font-sans text-nexus-text-primary">
            <div className="w-96 flex-shrink-0 bg-nexus-surface-900 border-r border-nexus-border-medium shadow-lg">
                <Inquire // The left-hand AI co-pilot panel
                    {...restInquireProps}
                    params={params}
                    wizardStep={currentPage}
                    aiInteractionState={aiInteractionState}
                    onAiInteractionStateChange={setAiInteractionState}
                    onScopeComplete={handleScopeComplete}
                    onReportUpdate={onReportUpdate}
                    onProfileUpdate={onProfileUpdate}
                    isGenerating={isGenerating}
                    onNextStep={nextPage}
                    onPrevStep={prevPage}
                    canGoNext={currentPage < WIZARD_PAGES.length}
                    canGoPrev={currentPage > 1}
                />
            </div>
            <div ref={scrollPanelRef} className="flex-grow overflow-y-auto bg-nexus-primary-800">
                <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col min-h-full">
                    <header className="py-6 md:py-8 flex-shrink-0">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-nexus-text-primary tracking-tight mb-2 text-center">
                            Nexus Intelligence System
                        </h2>
                        <p className="text-base md:text-lg text-nexus-text-secondary max-w-2xl mx-auto text-center">
                            12-Step Regional Intelligence Framework - From strategic context to sustainability planning.
                        </p>
                        <div className="mt-8">
                            <Stepper steps={WIZARD_PAGES.map(p => p.title)} currentStep={currentPage} onStepClick={handleStepClick} />
                        </div>
                    </header>

                    <main className="flex-grow pb-16 relative">
                        {renderPageContent()}
                    </main>

                    {/* Footer with navigation buttons */}
                    <footer className="flex-shrink-0 py-4 border-t border-nexus-border-medium bg-nexus-surface-900/80 backdrop-blur-sm sticky bottom-0 z-10">
                        {error && <p className="text-red-400 text-center mb-4 text-sm bg-red-900/20 p-3 rounded-md border border-red-500/30">{error}</p>}

                        <div className="flex justify-between items-center max-w-5xl mx-auto px-4 md:px-6">
                            {currentPage > 1 ? (
                                <button onClick={prevPage} disabled={isGenerating} className="px-6 py-2.5 bg-nexus-surface-700 text-nexus-text-primary font-semibold rounded-lg hover:bg-nexus-surface-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
                            ) : <div></div>}

                            {currentPage < WIZARD_PAGES.length ? (
                                <button
                                    onClick={nextPage}
                                    disabled={isGenerating}
                                    className="px-8 py-3 bg-nexus-accent-cyan text-white font-bold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next: {WIZARD_PAGES.find(p => p.id === currentPage + 1)?.title} &rarr;
                                </button>
                            ) : (
                                <button onClick={handleGenerateReport} disabled={isGenerating} className="px-8 py-3 bg-nexus-accent-cyan text-white font-bold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {isGenerating ? <><Spinner /> Generating...</> : '🚀 Generate Intelligence Blueprint'}
                                </button>
                            )}
                        </div>
                    </footer>
                </div>
            </div>

            {showScroll && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-8 bg-nexus-accent-cyan text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-nexus-accent-cyan-dark transition-all duration-300 z-50"
                    aria-label="Back to top"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ReportGenerator;