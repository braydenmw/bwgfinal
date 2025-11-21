import React from 'react';
import { NexusLogo, TargetIcon, BrainCircuitIcon, RoadmapIcon } from './Icons.tsx';

interface TermsAndConditionsProps {
  onAccept: () => void;
  onDecline: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="min-h-screen bg-nexus-primary-900 text-nexus-text-primary flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-nexus-surface-800 rounded-2xl shadow-2xl border border-nexus-border-medium overflow-hidden">
        <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
          
          {/* "How to Use" Section */}
          <div className="mb-10 pb-10 border-b border-nexus-border-medium">
            <div className="flex items-center gap-4 mb-6">
                <NexusLogo className="w-10 h-10 text-nexus-accent-cyan" />
                <h1 className="text-3xl font-bold text-nexus-text-primary">How to Use BW Nexus AI</h1>
            </div>
            <p className="text-lg text-nexus-text-secondary mb-6">
              You are about to use a powerful system designed to unlock the hidden potential of global regions. This is not a simple search engine. You are about to begin a structured, 12-step intelligence-gathering process guided by our AI co-pilot.
            </p>

            <h2 className="text-2xl font-semibold text-nexus-text-primary mb-4">Your Journey: The 12-Step Intelligence Framework</h2>
            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-nexus-surface-700 text-nexus-accent-cyan rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-nexus-text-primary">Phase 1: Scope & Context (Steps 1-3)</h3>
                  <p className="text-nexus-text-secondary text-sm">You will define <strong>who you are</strong> (your persona), <strong>where you are looking</strong> (your target region), and <strong>what you want to achieve</strong> (your core objective). This is the most critical phase, as it creates the "brief" for our AI.</p>
                </div>
              </div>
              {/* Phase 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-nexus-surface-700 text-nexus-accent-cyan rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-nexus-text-primary">Phase 2: Analysis & Strategy (Steps 4-6)</h3>
                  <p className="text-nexus-text-secondary text-sm">You will configure your <strong>AI analysis team</strong> and run advanced diagnostics. This includes conducting due diligence, assessing risk, and exploring a curated dashboard of potential partners.</p>
                </div>
              </div>
              {/* Phase 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-nexus-surface-700 text-nexus-accent-cyan rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-nexus-text-primary">Phase 3: Execution & Planning (Steps 7-9)</h3>
                  <p className="text-nexus-text-secondary text-sm">You will move from analysis to action. Here, you will use tools to forecast growth, model stakeholder perspectives, and build a framework for creating strong relationships.</p>
                </div>
              </div>
              {/* Phase 4 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-nexus-surface-700 text-nexus-accent-cyan rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-nexus-text-primary">Phase 4: Finalization & Generation (Steps 10-12)</h3>
                  <p className="text-nexus-text-secondary text-sm">You will assess the long-term viability of your strategy, review all your inputs, and, with a final click, instruct the multi-agent AI system to <strong>synthesize all 12 steps into a comprehensive Intelligence Blueprint.</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-nexus-surface-700 rounded-lg">
                <h3 className="font-semibold text-nexus-text-primary">The Outcome: A Partnership Toolkit</h3>
                <p className="text-nexus-text-secondary text-sm mt-1">At the end of this process, you will receive a world-class intelligence report and a professionally drafted outreach letter—a complete toolkit designed to help you start confident, data-driven conversations.</p>
            </div>
          </div>

          {/* Existing Terms and Conditions Section */}
          <div className="prose prose-invert max-w-none prose-sm">
            <h2 className="text-2xl font-bold text-nexus-text-primary">Terms & Conditions: BW Nexus AI Platform Agreement</h2>
            <p className="text-nexus-text-secondary">Welcome to BW Nexus AI. By clicking "Accept and Continue," you agree to be bound by the following terms and conditions. Please read them carefully.</p>
            
            <h4>1. Service Description</h4>
            <p>The BW Nexus AI platform provides AI-powered intelligence, analysis, and report generation services for regional development and strategic partnership identification. The service is provided "as-is" and is intended for guidance and decision-support only.</p>

            <h4>2. User Responsibilities</h4>
            <p>You are responsible for the accuracy of the information you provide and for independently verifying any information generated by the system before making strategic or financial commitments. You agree not to use the service for any unlawful purpose.</p>
            
            <h4>3. Data and Privacy</h4>
            <p>We are committed to protecting your privacy. Information you provide is used solely for the purpose of generating your requested reports and improving our services. We do not sell your data to third parties. Please refer to our full Privacy Policy for more details.</p>

            <h4>4. Intellectual Property</h4>
            <p>The reports and content generated for you are for your internal use. The underlying technology, proprietary models (including but not limited to RROI, TPT, SEAM), and the BW Nexus AI platform itself are the exclusive intellectual property of BW Global Advisory.</p>

            <h4>5. Limitation of Liability</h4>
            <p>BW Global Advisory makes no warranties as to the absolute completeness or accuracy of the AI-generated content. In no event shall BW Global Advisory be liable for any direct, indirect, incidental, or consequential damages arising out of the use of or inability to use the service.</p>

            <p>By accepting, you acknowledge that you have read, understood, and agree to these terms.</p>
          </div>
        </div>

        <div className="p-6 bg-nexus-surface-900 border-t border-nexus-border-medium flex justify-end items-center gap-4">
          <button 
            onClick={onDecline}
            className="px-6 py-2 text-nexus-text-secondary font-semibold rounded-lg hover:bg-nexus-surface-700 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={onAccept}
            className="px-8 py-2 bg-nexus-accent-cyan text-white font-bold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors shadow-md"
          >
            Accept and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;