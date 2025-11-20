import React from 'react';
import type { ReportData } from '../types';

interface ReviewStepProps {
  reportData: ReportData;
  updateReportData: (data: Partial<ReportData>) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  reportData,
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Review Your Report
        </h3>
        <p className="text-gray-600 mt-1">
          Review all sections before generating the final report
        </p>
      </div>

      <div className="border rounded-lg divide-y">
        <div className="p-4">
          <h4 className="font-medium text-gray-900">Report Type</h4>
          <p className="mt-1 text-gray-600">{reportData.type}</p>
        </div>

        <div className="p-4">
          <h4 className="font-medium text-gray-900">Report Title</h4>
          <p className="mt-1 text-gray-600">{reportData.title}</p>
        </div>

        <div className="p-4">
          <h4 className="font-medium text-gray-900">Sections</h4>
          <div className="mt-2 space-y-4">
            {reportData.sections.map((section, index) => (
              <div key={index} className="pl-4 border-l-2 border-gray-200">
                <h5 className="font-medium text-gray-900">{section.title}</h5>
                <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-medium text-gray-900">Key Findings</h4>
          <ul className="mt-2 space-y-2">
            {reportData.analysisPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h4 className="font-medium text-gray-900">Recommendations</h4>
          <ul className="mt-2 space-y-2">
            {reportData.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Ready to Generate
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Please review all sections carefully. Once you proceed, the report
                will be generated and saved to your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};