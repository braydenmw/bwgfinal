import React from 'react';
import type { ReportParameters } from '../types';

interface RROIDiagnosticStepProps {
  params: Partial<ReportParameters>;
  onChange: (params: Partial<ReportParameters>) => void;
  inputStyles: string;
  labelStyles: string;
}

const RROIDiagnosticStep: React.FC<RROIDiagnosticStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-black mb-4">RROI Diagnostic Analysis</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Regional Readiness & Opportunity Index (RROI) analysis evaluates the economic, political, and social factors affecting your target region.
        </p>
      </div>

      <div className="bwga-card bwga-card-lg bg-gray-50 border-gray-300">
        <h4 className="font-semibold mb-2">RROI Analysis:</h4>
        <p className="text-sm text-gray-700">
          We'll analyze regional readiness indicators including infrastructure, regulatory environment, market maturity, and investment climate.
        </p>
      </div>
    </div>
  );
};

export default RROIDiagnosticStep;