import React, { useState } from 'react';
import { NexusLogo } from './Icons.tsx';

interface TermsAndConditionsProps {
    onAccept: () => void;
    onDecline: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept, onDecline }) => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="bg-gray-50">
            <header className="text-center py-8 px-4 bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3">
                        Welcome to BW Nexus AI
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 leading-snug mb-4">
                        Unlock the hidden potential of global regions with AI-powered intelligence. Transform complex data into strategic opportunities. Discover untapped markets, forge strategic partnerships, and create sustainable growth? Let's begin your journey into regional intelligence.
                    </p>
                </div>
            </header>

            <div className="p-6 md:p-8 max-w-6xl mx-auto">
                {/* How to Use Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm p-6 md:p-8 mb-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How to Use BW Nexus AI</h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Your guide to leveraging the world's first Strategic Symbiosis System for regional economic development and partnership creation.
                        </p>
                    </div>
    
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Journey: The 12-Step Intelligence Framework</h3>
                        <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
                            Our systematic approach ensures comprehensive analysis and actionable insights. The process is broken down into four key phases, each designed to build upon the last.
                        </p>
    
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-lg font-bold text-blue-600 mb-2">Phase 1: Scope & Context</h4>
                                <p className="text-gray-700">Define <strong>who you are</strong>, <strong>where you are looking</strong>, and <strong>what you want to achieve</strong>. This creates the essential "brief" for our AI.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-lg font-bold text-blue-600 mb-2">Phase 2: Analysis & Strategy</h4>
                                <p className="text-gray-700">Configure your <strong>AI analysis team</strong> and run advanced diagnostics, including due diligence, risk assessment, and partner exploration.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-lg font-bold text-blue-600 mb-2">Phase 3: Execution & Planning</h4>
                                <p className="text-gray-700">Move from analysis to action. Use tools to forecast growth, model stakeholder perspectives, and build a framework for strong relationships.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-lg font-bold text-blue-600 mb-2">Phase 4: Finalization & Generation</h4>
                                <p className="text-gray-700">Assess long-term viability, review all your inputs, and instruct the multi-agent AI to synthesize everything into a comprehensive <strong>Intelligence Blueprint</strong>.</p>
                            </div>
                        </div>
                    </div>
    
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">The Outcome: A Partnership Toolkit</h3>
                        <p className="text-gray-700 mb-6 text-center">
                            At the end of this process, you will receive professional-grade deliverables that speak the language of global investors and partners.
                        </p>
    
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h4 className="font-bold text-gray-900 mb-2">World-Class Intelligence Report</h4>
                                <p className="text-gray-700 text-sm">A comprehensive report featuring structured, data-driven analysis using proprietary frameworks to reveal economic DNA, ecosystem architectures, and strategic recommendations.</p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <h4 className="font-bold text-gray-900 mb-2">Partnership Blueprint & Economic Projections</h4>
                                <p className="text-gray-700 text-sm">Evidence-backed partnership cases including insights into readiness for investment, symbiotic ecosystems, and simulations of policy or project impacts, all customized to specific goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
                        <div className="text-center mb-6 pb-4 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
                            <p className="text-sm text-gray-600">BW Nexus AI Platform Agreement</p>
                        </div>
                    <div className="prose max-w-none text-gray-700 text-xs leading-tight prose-p:mb-2 prose-strong:font-semibold prose-strong:text-gray-900">
                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">1. Acceptance of Terms</h3>
                            <p>By accessing and using the BW Nexus AI platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">2. Use License</h3>
                            <p className="mb-1">Permission is granted to temporarily access the materials (information or software) on BW Nexus AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                            <ul className="list-disc list-inside ml-3 space-y-0.5">
                                <li>modify or copy the materials</li>
                                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                                <li>attempt to decompile or reverse engineer any software contained on BW Nexus AI's website</li>
                                <li>remove any copyright or other proprietary notations from the materials</li>
                            </ul>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">3. Service Description</h3>
                            <p className="mb-1">BW Nexus AI provides regional intelligence analysis tools including:</p>
                            <ul className="list-disc list-inside ml-3 space-y-0.5">
                                <li>Regional Resilience & Opportunity Index (RROI) diagnostics</li>
                                <li>Transitional Pathway Theory (TPT) simulations</li>
                                <li>Symbiotic Ecosystem Architecture Model (SEAM) blueprints</li>
                                <li>AI-powered report generation and analysis</li>
                            </ul>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">4. Data Privacy & Security</h3>
                            <p>Your privacy is important to us. BW Nexus AI is committed to protecting your personal information and being transparent about the data we collect and how we use it. All analysis and reports generated are processed securely and confidentially.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">5. Accuracy of Information</h3>
                            <p>While we strive for accuracy, BW Nexus AI cannot guarantee that all information provided is complete, accurate, or current. Users should verify critical information through independent sources before making business decisions.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">6. Limitation of Liability</h3>
                            <p>In no event shall BW Nexus AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BW Nexus AI's website.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">7. Community Investment Program</h3>
                            <p>10% of all report fees are reinvested into community-identified development initiatives within the analyzed regions. This includes education, local health programs, and small-scale livelihood support.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">8. Governing Law</h3>
                            <p>These terms and conditions are governed by and construed in accordance with the laws of Australia, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">9. Changes to Terms</h3>
                            <p>BW Nexus AI reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                        </section>
                    </div>
                </div>

                {/* Footer with Checkbox and Buttons */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-start gap-3 mb-6">
                        <input
                            type="checkbox"
                            id="accept-terms"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="mt-1 h-4 w-4 text-nexus-accent-cyan focus:ring-nexus-accent-cyan border-gray-300 rounded"
                        />
                        <label htmlFor="accept-terms" className="text-sm text-gray-700 leading-relaxed">
                            I have read, understood, and agree to the Terms & Conditions outlined above.
                        </label>
                    </div>

                    <div className="flex gap-4 justify-end">
                        <button
                            onClick={onDecline}
                            className="px-6 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={onAccept}
                            disabled={!accepted}
                            className="px-8 py-2.5 bg-nexus-accent-cyan text-white font-bold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            Accept & Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;