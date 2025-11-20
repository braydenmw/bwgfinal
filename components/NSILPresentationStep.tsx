import React from 'react';
import type { ReportParameters } from '../types';

interface NSILPresentationStepProps {
  params: Partial<ReportParameters>;
  onChange: (params: Partial<ReportParameters>) => void;
}

const NSILPresentationStep: React.FC<NSILPresentationStepProps> = ({
  params,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-black mb-4">NSIL Intelligence Format</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Review the NSIL (Nexus Strategic Intelligence Layout) format. This proprietary structure ensures your analysis is presented in the most effective way for decision-makers.
        </p>
      </div>

      <div className="bwga-card bwga-card-lg bg-gray-50 border-gray-300 p-6">
        <h4 className="font-bold text-gray-900 mb-4">NSIL Framework Overview:</h4>
        <div className="space-y-3 text-sm text-gray-700">
          <div><strong>N</strong> - Nexus Context & Strategic Alignment</div>
          <div><strong>S</strong> - Strategic Intelligence & Market Analysis</div>
          <div><strong>I</strong> - Implementation Roadmap & Action Plan</div>
          <div><strong>L</strong> - Leadership & Decision Support</div>
        </div>
      </div>

      <div className="bwga-card bwga-card-lg bg-gray-50 border-gray-300 p-4">
        <h4 className="font-medium text-gray-900 mb-2">NSIL Benefits:</h4>
        <p className="text-sm text-gray-700">
          The NSIL format provides a comprehensive, actionable intelligence framework that integrates all analysis components into a decision-ready format.
        </p>
      </div>
    </div>
  );
};

export default NSILPresentationStep;