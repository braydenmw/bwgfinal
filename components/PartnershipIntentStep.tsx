import React from 'react';
import type { ReportParameters } from '../types';

interface PartnershipIntentStepProps {
  params: Partial<ReportParameters>;
  onChange: (params: Partial<ReportParameters>) => void;
  inputStyles: string;
  labelStyles: string;
}

const PartnershipIntentStep: React.FC<PartnershipIntentStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-black mb-4">Partnership Intent</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Let's clarify your partnership intentions. This step determines what type of collaboration would be most effective for your goals.
        </p>
      </div>

      <div>
        <label className={labelStyles}>Ideal Partner Profile *</label>
        <textarea
          value={params.idealPartnerProfile || ''}
          onChange={(e) => onChange({ ...params, idealPartnerProfile: e.target.value })}
          className={`${inputStyles} resize-none`}
          rows={4}
          placeholder="Describe the characteristics of your ideal foreign partner company..."
        />
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-900 mb-2">Partnership Analysis:</h4>
        <p className="text-sm text-purple-800">
          Based on your description, we'll identify the most suitable partnership types and recommend potential partner companies.
        </p>
      </div>
    </div>
  );
};

export default PartnershipIntentStep;