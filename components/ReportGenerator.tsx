
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
import { ManualEntrySelect } from './ManualEntrySelect.tsx';
import { MarketDiversificationDashboard } from './MarketDiversificationModule.tsx';
import GlobalComparativeEngine from './GlobalComparativeEngine.tsx';
import StakeholderPerspectiveModule from './StakeholderPerspectiveModule.tsx';
import PredictiveGrowthModel from './PredictiveGrowthModel.tsx';
import AlternativeLocationMatcher from './AlternativeLocationMatcher.tsx';
import DueDiligenceSuite from './DueDiligenceSuite.tsx';
import PartnerIntelligenceDashboard from './PartnerIntelligenceDashboard.tsx';
import RelationshipBuilder from './RelationshipBuilder.tsx';
import RegionalComfortIndex from './RegionalComfortIndex.tsx';
import { GLOBAL_CITY_DATABASE } from '../constants.tsx';
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
    { id: 5, title: 'Due Diligence & Risk', page: 2 },
    { id: 6, title: 'Partner Intelligence', page: 2 },
    { id: 7, 'title': 'Relationship Building', page: 3 },
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
    const [isManualIndustry, setIsManualIndustry] = useState(false);
    const [manualIndustryValue, setManualIndustryValue] = useState('');

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
    
    const handleIndustryChange = (industryId: string) => {
        handleMultiSelectToggle('industry', industryId);
        if (industryId === 'Custom') {
            setIsManualIndustry(true);
        } else {
            setIsManualIndustry(false);
            setManualIndustryValue('');
        }
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
                                    <ManualEntrySelect
                                        label="Core Industry Focus *"
                                        options={INDUSTRIES}
                                        value={params.industry.length > 0 && !isManualIndustry ? INDUSTRIES.find(i => i.id === params.industry[0]) : undefined}
                                        onSelect={(option) => handleChange('industry', [option.id])}
                                        onManualChange={(value) => handleChange('customIndustry', value)}
                                        isManual={isManualIndustry}
                                        setIsManual={setIsManualIndustry}
                                        manualValue={params.customIndustry || ''}
                                        displayKey="title"
                                        valueKey="id"
                                        placeholder="Select or enter industry..."
                                    />
                                </div>
                                {params.industry.includes('Custom') && (
                                    <div className="mt-2">
                                        <label className={labelStyles}>Custom Industry Definition *</label>
                                        <textarea value={params.customIndustry} onChange={e => handleChange('customIndustry', e.target.value)} rows={2} className={inputStyles} placeholder="Describe the custom industry or niche sector..." />
                                    </div>
                                )}
                                {/* Original industry selection buttons - can be removed or kept for multi-select if ManualEntrySelect is adapted */}
                                {/* For now, keeping the ManualEntrySelect as a single-select for simplicity */}
                                {/* If multi-select is desired, the ManualEntrySelect would need to be more complex or this section would remain */}
                                {/* <div className="bg-nexus-surface-900 p-4 rounded-xl border border-nexus-border-medium mt-2">
                                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                        {INDUSTRIES.map((industry) => (
                                            <button key={industry.id} onClick={() => handleIndustryChange(industry.id)} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-800 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.industry.includes(industry.id) ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`}>
                                                <industry.icon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.industry.includes(industry.id) ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                                <span className="font-semibold text-nexus-text-primary text-xs leading-tight">{industry.title}</span>
                                            </button>
                                        ))}
                                        <button onClick={() => handleIndustryChange('Custom')} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-800 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.industry.includes('Custom') ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`} title="Define a custom industry">
                                            <CustomIndustryIcon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.industry.includes('Custom') ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                            <span className="font-semibold text-nexus-text-primary text-xs leading-tight">Custom</span>
                                        </button>
                                    </div>
                                </div> */}
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
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Conduct automated due diligence on potential partners to identify legal, financial, and reputational risks.</p>
                                <DueDiligenceSuite
                                    partnerName={params.idealPartnerProfile.split(',')[0] || 'Potential Partner'}
                                    partnerType="organization"
                                />
                            </StepCard>
                        );
                        case 6: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Explore a curated dashboard of potential partners, including government, NGO, and academic entities.</p>
                                <PartnerIntelligenceDashboard params={params} />
                            </StepCard>
                        );
                        case 7: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Access communication templates, cultural preparation guides, and track relationship milestones.</p>
                                <RelationshipBuilder
                                    partnerName={params.idealPartnerProfile.split(',')[0] || 'Target Partner'}
                                    partnerType="government"
                                />
                            </StepCard>
                        );
                        case 8: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Forecast growth trajectories and model the impact of strategic interventions over a defined time horizon.</p>
                                <PredictiveGrowthModel
                                    location={GLOBAL_CITY_DATABASE[targetCountry] || Object.values(GLOBAL_CITY_DATABASE)[0]}
                                    timeHorizon={5}
                                    onModelComplete={() => {}}
                                />
                            </StepCard>
                        );
                        case 9: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Analyze how different local stakeholders will perceive your project to anticipate challenges and build alignment.</p>
                                <StakeholderPerspectiveModule
                                    selectedPerspectives={['Government', 'Community', 'Investor']}
                                    onPerspectiveChange={() => {}}
                                    primaryObjective={params.problemStatement}
                                />
                            </StepCard>
                        );
                        case 10: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Assess the "human factor" of a region, including safety, political stability, and quality of life for expatriates and teams.</p>
                                <RegionalComfortIndex
                                    region={targetRegion}
                                    country={targetCountry}
                                />
                            </StepCard>
                        );
                        case 11: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Find and compare alternative global locations that may offer a better strategic fit for your requirements.</p>
                                <AlternativeLocationMatcher
                                    originalLocation={GLOBAL_CITY_DATABASE[targetCountry] || Object.values(GLOBAL_CITY_DATABASE)[0]}
                                    requirements={{
                                        minPopulation: 1000000,
                                        minInfrastructure: 7,
                                    }}
                                    onMatchesFound={() => {}}
                                />
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
        <div className="flex h-full bg-nexus-primary-900 font-sans text-nexus-text-primary border border-nexus-border-medium rounded-2xl shadow-2xl overflow-hidden">
            <div className="w-96 flex-shrink-0 bg-nexus-surface-900 border-r border-nexus-border-medium">
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