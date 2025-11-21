import React from 'react';
import { NexusLogo, BlueprintIcon, TargetIcon, BrainCircuitIcon, RoadmapIcon, UsersIcon, ShieldCheckIcon, PuzzleIcon, LightbulbIcon, CodeIcon, LetterIcon } from './Icons.tsx';
import type { View } from '../types';
import { Header } from './Header.tsx';

interface ReportSystemEntryProps {
  onProceedToTerms: () => void;
  onViewChange: (view: View) => void;
  currentView: View;
}

const PhaseCard: React.FC<{
    phase: string;
    title: string;
    description: string;
    steps: string[];
    whyItMatters: string;
}> = ({ phase, title, description, steps, whyItMatters }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-gray-300 flex flex-col h-full">
        <div className="flex-grow">
            <div className="mb-4">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-500">{phase}</p>
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-1">{description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Steps in this Phase:</h4>
                <div className="space-y-3">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="text-blue-600 font-semibold text-sm">✓</span>
                            <span className="text-sm font-medium text-gray-700">{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
            <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Why This Matters</h4>
            <p className="text-sm text-gray-700">{whyItMatters}</p>
        </div>
    </div>
);

const ReportSystemEntry: React.FC<ReportSystemEntryProps> = ({ onProceedToTerms, onViewChange, currentView }) => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen">
        <Header
            currentView={currentView}
            onViewChange={onViewChange}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 pt-32">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    How to Use BW Nexus AI
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Your guide to leveraging the world's first Strategic Symbiosis System for regional economic development and partnership creation.
                </p>
            </section>

            <section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Journey: The 12-Step Intelligence Framework</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Our systematic approach ensures comprehensive analysis and actionable insights. The process is broken down into four key phases, each designed to build upon the last.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <PhaseCard
                        phase="Phase 1"
                        title="Scope & Context"
                        description="This initial phase is about building the foundation for your entire analysis. You will establish your profile, define your geographic and industry focus, and articulate your core strategic goals."
                        whyItMatters="This phase ensures the AI's entire analysis is perfectly aligned with your unique identity and strategic goals, preventing generic outputs."
                        steps={[
                            'Step 1: Profile Setup',
                            'Step 2: Strategic Context',
                            'Step 3: Partnership & Objectives'
                        ]}
                    />
                    <PhaseCard
                        phase="Phase 2"
                        title="Analysis & Strategy"
                        description="With your brief established, you will configure your AI analysis team and run a suite of advanced diagnostics, including automated due diligence, risk assessment, and partner exploration."
                        whyItMatters="Here, you move from planning to action. The system runs deep analysis to identify opportunities, vet partners, and quantify risks."
                        steps={[
                            'Step 4: Analysis Configuration',
                            'Step 5: Due Diligence & Risk',
                            'Step 6: Partner Intelligence'
                        ]}
                    />
                    <PhaseCard
                        phase="Phase 3"
                        title="Execution & Planning"
                        description="This phase translates analysis into an actionable plan. You will access tools to build relationships, forecast growth, and model stakeholder perspectives to ensure your plan is robust."
                        whyItMatters="An opportunity is worthless without a plan. This phase builds the roadmap for successful execution and stakeholder management."
                        steps={[
                            'Step 7: Relationship Building',
                            'Step 8: Implementation Roadmap',
                            'Step 9: Resource Allocation'
                        ]}
                    />
                    <PhaseCard
                        phase="Phase 4"
                        title="Finalization & Generation"
                        description="In the final phase, you will define key performance metrics, assess long-term sustainability, and after a final review, instruct the AI to synthesize all inputs into a comprehensive Intelligence Blueprint."
                        whyItMatters="The final step where all data points are synthesized into a single, cohesive, and actionable intelligence document ready for decision-makers."
                        steps={[
                            'Step 10: Performance Metrics',
                            'Step 11: Sustainability & Final Setup',
                            'Step 12: Review & Generate'
                        ]}
                    />
                </div>
            </section>

            <section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">The Outcome: A Partnership Toolkit</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        At the end of this process, you will receive professional-grade deliverables that speak the language of global investors and partners.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><BlueprintIcon className="w-7 h-7" /></div>
                            <h3 className="text-2xl font-bold text-gray-900">World-Class Intelligence Report</h3>
                        </div>
                        <p className="text-gray-600">A comprehensive report featuring structured, data-driven analysis using proprietary frameworks to reveal economic DNA, ecosystem architectures, and strategic recommendations.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><LetterIcon className="w-7 h-7" /></div>
                            <h3 className="text-2xl font-bold text-gray-900">Partnership Blueprint & Economic Projections</h3>
                        </div>
                        <p className="text-gray-600">Evidence-backed partnership cases including insights into readiness for investment, symbiotic ecosystems, and simulations of policy or project impacts, all customized to specific goals.</p>
                    </div>
                </div>
            </section>

            <section className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Proceed to review our terms of service to access the report system.
                    </p>
                    <button
                        onClick={onProceedToTerms}
                        className="bg-gray-800 text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <BlueprintIcon className="w-6 h-6" />
                            T&C access to the report
                        </div>
                    </button>
                </div>
            </section>
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center mb-4">
                    <NexusLogo className="w-8 h-8 text-orange-500" />
                </div>
                <p className="font-semibold text-gray-300">BW Global Advisory</p>
                <p className="text-sm text-gray-400">ABN 55 978 113 300</p>
                <p className="text-xs text-gray-500 mt-2">&copy; 2024 BW Global Advisory. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
  );
};

export default ReportSystemEntry;