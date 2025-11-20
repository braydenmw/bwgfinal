import React from 'react';
import { BlueprintIcon, NexusLogo } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans antialiased">
            {/* Hero Section */}
            <section className="relative py-28 md:py-40">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Asian country village"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Your Region's Value, Understood Globally.
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        For decades, regional economies have been the unsung engines of national prosperity, yet their true value remains invisible to the global market. BW Nexus AI is the world's first Strategic Symbiosis System designed to translate your region's potential into a language that builds confidence, attracts investment, and forges the partnerships you deserve.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

                {/* Section: The Problem & The Founder */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="space-y-6 text-center max-w-4xl mx-auto">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">The 100-Year Confidence Gap</h2>
                            <p className="mt-4 text-lg text-gray-600">For a century, the primary barrier to regional investment has not been a lack of opportunity, but a lack of confidence. This confidence gap is created by three things: the high cost of acquiring on-the-ground intelligence, the fear of unknown risks (political, social, operational), and the inability for local leaders and global investors to speak the same strategic language.</p>
                        </div>
                        <div className="text-gray-600 space-y-4 text-base">
                            <p>This friction between global capital and regional potential is the result of a century of evolving information costs and risk perception.</p>
                        </div>
                    </div>
                </section>

                {/* Section: The Founder */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="space-y-12">
                         <div className="grid md:grid-cols-2 gap-12 items-center">
                            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A person working on a laptop with data visualizations, representing the intersection of technology and human insight." className="rounded-xl shadow-lg object-cover w-full h-full max-h-96" />
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">A Message from the Founder</h3>
                                <blockquote className="text-lg italic font-medium text-gray-700 leading-relaxed">
                                    "I built this system after years of working directly with local leaders who had the will, the people, and the resources—but not the platform to show it. Nexus AI is the tool I wish they had. It's a bridge of confidence, designed to help the world rediscover the value of places—and the people—that have long been underestimated."
                                </blockquote>
                                <p className="mt-6 font-semibold text-gray-800">— The Founder, BW Global Advisory</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: The BWGA Nexus Platform */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">The Evolution of Intelligence</h2>
                        <p className="mt-2 max-w-3xl mx-auto text-lg text-gray-600">To solve the Confidence Gap, we must first understand its origins.</p>
                    </div>
                    {/* Timeline Section */}
                    <div className="relative">
                        {/* The connecting line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>

                        <div className="space-y-16">
                            {/* Timeline Item 1 */}
                            <div className="relative flex items-start">
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
                                <div className="w-1/2 pr-8 text-right">
                                    <h4 className="text-xl font-bold text-gray-800">The Age of Infrastructure</h4>
                                    <p className="text-sm text-gray-500">Early 20th C.</p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <p className="text-gray-600">Investment followed physical assets like ports and railways. On-the-ground intelligence was scarce and expensive, so capital clustered in a few known hubs. <strong>The pattern began: capital follows certainty.</strong></p>
                                </div>
                            </div>

                            {/* Timeline Item 2 */}
                            <div className="relative flex items-start">
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
                                <div className="w-1/2 pr-8 text-right">
                                    <p className="text-gray-600">Consulting firms emerged to provide standardized analysis of entire countries for multinational corporations. Regional nuances were ignored. <strong>The unit of analysis became the nation-state.</strong></p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <h4 className="text-xl font-bold text-gray-800">The Age of National Analysis</h4>
                                    <p className="text-sm text-gray-500">Mid 20th C.</p>
                                </div>
                            </div>

                            {/* Timeline Item 3 */}
                            <div className="relative flex items-start">
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
                                <div className="w-1/2 pr-8 text-right">
                                    <h4 className="text-xl font-bold text-gray-800">The Age of Efficiency</h4>
                                    <p className="text-sm text-gray-500">Late 20th C.</p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <p className="text-gray-600">Globalization demanded simple metrics like cheap labor. Investment flocked to a few special economic zones, creating intense competition while <strong>overlooking potential just a few hundred kilometers away.</strong></p>
                                </div>
                            </div>

                            {/* Timeline Item 4 - The Spark */}
                            <div className="relative flex items-start">
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full ring-4 ring-orange-200"></div>
                                <div className="w-1/2 pr-8 text-right">
                                    <p className="text-gray-600">The problem is no longer a lack of data, but an overabundance of chaotic, untrustworthy information. The cost of making sense of it for an unknown region is enormous. <strong>This is the "Crisis of Clarity."</strong></p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <h4 className="text-xl font-bold text-orange-600">The Spark: Information Overload</h4>
                                    <p className="text-sm text-gray-500">Today</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: The Solution */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">The Nexus AI Advantage: Your AI Agent on the Ground</h2>
                            <p className="text-gray-600 mb-6">BW Nexus AI is designed to be the "agent on the ground" that was once a person, and then a team of consultants, but is now an AI. It directly attacks the "crisis of clarity" by:</p>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">1. Automating Sense-Making</h4>
                                    <p className="text-gray-600">It does what a team of analysts would do in months, but in minutes, ingesting chaotic data and structuring it using a proprietary framework.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">2. Lowering the Cost of "First Look"</h4>
                                    <p className="text-gray-600">It makes it economically feasible to analyze ten potential regions instead of just one, encouraging exploration beyond the obvious hubs.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">3. Translating Local to Global</h4>
                                    <p className="text-gray-600">It acts as a universal translator between the language of a local mayor ("we have hardworking people") and a global CFO ("human capital is cost-competitive").</p>
                                </div>
                                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">4. Revealing "Latent" Value</h4>
                                    <p className="text-gray-600">By applying sophisticated models, it can identify potential that isn't visible in surface-level data, such as seeing AgriTech potential in a region known only for tourism.</p>
                                </div>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A diverse team working on a complex project, representing symbiosis." className="rounded-xl shadow-lg object-cover w-full h-full" />
                    </div>
                </section>

                {/* Section: What it Produces & For Whom */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">What BW Nexus AI Produces</h2>
                            <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">The system generates a comprehensive Partnership Toolkit tailored for early engagement and sustained development:</p>
                            <ul className="space-y-4 text-gray-700 max-w-3xl mx-auto">
                                <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0"></div>A world-class intelligence report featuring structured, data-driven analysis using proprietary frameworks to reveal economic DNA, ecosystem architectures, and strategic recommendations.</li>
                                <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0"></div>A professionally drafted outreach letter that reduces perceived risk, builds genuine interest, and initiates confident dialogue, enabling users to start conversations like "We believe we have something that could be of benefit to both of us."</li>
                                <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0"></div>Evidence-backed cases for partnerships, including insights into readiness for investment, symbiotic ecosystems, and simulations of policy or project impacts, all customized to specific goals such as attracting FDI, entering new markets, or modeling socio-economic effects.</li>
                            </ul>
                        </div>
                        <div>
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">For Whom</h2>
                                <p className="mt-2 max-w-3xl mx-auto text-lg text-gray-600">It's built for a diverse range of stakeholders in global regional development who seek to foster change and clarify overlooked opportunities:</p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">Governments</h4>
                                    <p className="text-gray-600 mb-4">To highlight regional strengths, draw in strategic investments, and craft policies that drive sustainable growth in areas often dismissed as peripheral.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">Private Enterprise</h4>
                                    <p className="text-gray-600 mb-4">To navigate expansions into hidden markets, vet partners, and optimize supply chains in regions where traditional analysis falls short.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">Financial Institutions & Banks</h4>
                                    <p className="text-gray-600 mb-4">To assess project viability, align with ESG standards, and forecast economic outlooks for asset classes that others ignore.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">NGOs & Academia</h4>
                                    <p className="text-gray-600 mb-4">To conduct impact studies, synthesize data for research, and model development programs that give voice to communities taken for granted.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: In Essence: The World's First Strategic Symbiosis System */}
                <section className="text-center bg-gray-800 text-white rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">The World's First Strategic Symbiosis System</h2>
                    <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto">
                        BW Nexus AI is not just another AI platform. It is the world’s first Strategic Symbiosis System—designed to connect vision with reality, ambition with opportunity, and people with purpose. It takes a single idea—what if we could see the world clearly, region by region?—and turns it into a living intelligence engine that makes understanding accessible to everyone. Because the first spark of understanding is where every great partnership begins.
                    </p>
                    <div className="my-8 py-6 border-t border-b border-gray-700 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">Simple, Transparent Access</h3>
                        <p className="text-gray-300 mb-2">Gain full access to the BW Nexus AI platform with unlimited usage.</p>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white mb-2">$15</p>
                            <p className="text-gray-300 font-semibold mb-4">for 7 day access</p>
                            <p className="text-lg font-bold text-white mb-2">3 months subscription $175 • 6 months subscription $395 • 12 months subscription $595</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onViewChange('report')}
                        className="bg-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <BlueprintIcon className="w-6 h-6" />
                            Launch the Workspace
                        </div>
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <div className="flex justify-center mb-6">
                        <NexusLogo className="w-10 h-10 text-gray-500" />
                    </div>
                    <p className="font-semibold text-gray-600">BW Global Advisory</p>
                    <p className="text-sm mb-4">ABN 55 978 113 300</p>
                    <p className="text-xs">&copy; 2024 BW Global Advisory. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WhoWeAre;