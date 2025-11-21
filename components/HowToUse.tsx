import React from 'react';
import { NexusLogo, BlueprintIcon, TargetIcon, BrainCircuitIcon, RoadmapIcon } from './Icons.tsx';
import type { View } from '../types';
import { Header } from './Header.tsx';

interface HowToUseProps {
  onProceedToTerms: () => void;
  onViewChange: (view: View) => void;
  currentView: View;
}

const StepCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-orange-200">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const HowToUse: React.FC<HowToUseProps> = ({ onProceedToTerms, onViewChange, currentView }) => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen">
        {/* Main App Header */}
        <Header
            currentView={currentView}
            onViewChange={onViewChange}
            onOpenMultiAgentDashboard={() => {}}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 pt-32">
            {/* Return Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => onViewChange('who-we-are')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-semibold"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Return to Home
                </button>
            </div>

            {/* Hero Section */}
            <section className="text-center py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    How to Use BW Nexus AI
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Your guide to leveraging the world's first Strategic Symbiosis System for regional economic development and partnership creation.
                </p>
            </section>

            {/* The 4-Phase Process */}
            <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Journey: The 12-Step Intelligence Framework</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Our systematic approach ensures comprehensive analysis and actionable insights. The process is broken down into four key phases, each designed to build upon the last.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StepCard icon={<TargetIcon className="w-8 h-8 text-orange-600" />} title="Phase 1: Scope & Context">
                        Define <strong>who you are</strong>, <strong>where you are looking</strong>, and <strong>what you want to achieve</strong>. This creates the essential "brief" for our AI.
                    </StepCard>
                    <StepCard icon={<BrainCircuitIcon className="w-8 h-8 text-orange-600" />} title="Phase 2: Analysis & Strategy">
                        Configure your <strong>AI analysis team</strong> and run advanced diagnostics, including due diligence, risk assessment, and partner exploration.
                    </StepCard>
                    <StepCard icon={<RoadmapIcon className="w-8 h-8 text-orange-600" />} title="Phase 3: Execution & Planning">
                        Move from analysis to action. Use tools to forecast growth, model stakeholder perspectives, and build a framework for strong relationships.
                    </StepCard>
                    <StepCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.95 14.95 0 00-5.84-2.56m0 0a14.95 14.95 0 01-5.84 2.56m5.84-2.56v-4.82a6 6 0 015.84-7.38v4.82a14.95 14.95 0 00-5.84 2.56z" />
                            </svg>
                        }
                        title="Phase 4: Finalization & Generation"
                    >
                        Assess long-term viability, review all your inputs, and instruct the multi-agent AI to synthesize everything into a comprehensive <strong>Intelligence Blueprint</strong>.
                    </StepCard>
                </div>
            </section>

            {/* What You Get */}
            <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">The Outcome: A Partnership Toolkit</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        At the end of this process, you will receive professional-grade deliverables that speak the language of global investors and partners.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                     <img src="https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Professional report document on a desk" className="rounded-xl shadow-lg object-cover w-full h-full" />
                    <div className="space-y-6">
                        <div className="border-l-4 border-orange-500 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">World-Class Intelligence Report</h3>
                            <p className="text-gray-600">A comprehensive report featuring structured, data-driven analysis using proprietary frameworks to reveal economic DNA, ecosystem architectures, and strategic recommendations.</p>
                        </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Professionally Drafted Outreach Letter</h3>
                        <p className="text-gray-600">A letter that reduces perceived risk, builds genuine interest, and initiates confident dialogue, enabling you to start conversations like, "We believe we have something that could be of benefit to both of us."</p>
                    </div>
                </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-12">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Enter the Report System</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Proceed to review our terms of service and begin your journey into regional intelligence.
                    </p>
                    <button
                        onClick={onProceedToTerms}
                        className="bg-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <BlueprintIcon className="w-6 h-6" />
                            Read Terms & Enter
                        </div>
                    </button>
                </div>
            </section>
        </main>

        {/* Footer */}
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

export default HowToUse;