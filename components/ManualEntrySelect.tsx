import React, { useState } from 'react';

interface ManualEntrySelectProps<T> {
  label: string;
  options: T[];
  value?: T;
  onSelect: (value: T) => void;
  onManualChange: (value: string) => void;
  isManual: boolean;
  setIsManual: (manual: boolean) => void;
  manualValue: string;
  displayKey?: keyof T;
  valueKey?: keyof T;
  placeholder?: string;
  isLoading?: boolean;
}

export function ManualEntrySelect<T extends Record<string, any>>({
  label,
  options,
  value,
  onSelect,
  onManualChange,
  isManual,
  setIsManual,
  manualValue,
  displayKey = 'title' as keyof T,
  valueKey = 'id' as keyof T,
  placeholder = "Select an option...",
  isLoading = false
}: ManualEntrySelectProps<T>) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (option: T) => {
    onSelect(option);
    setShowDropdown(false);
    setIsManual(false);
  };

  const handleManualToggle = () => {
    setIsManual(!isManual);
    if (!isManual) {
      // Switching to manual, clear selection
      onSelect({} as T);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-nexus-text-primary mb-2">{label}</label>

      <div className="relative">
        {!isManual ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full p-3 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg focus:ring-2 focus:ring-nexus-accent-cyan focus:outline-none transition-all text-left flex justify-between items-center"
              disabled={isLoading}
            >
              <span className={value && value[displayKey] ? 'text-nexus-text-primary' : 'text-nexus-text-muted'}>
                {value && value[displayKey] ? value[displayKey] : placeholder}
              </span>
              <svg className={`w-5 h-5 text-nexus-text-muted transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-nexus-surface-800 border border-nexus-border-medium rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {options.map((option, index) => (
                  <button
                    key={option[valueKey] || index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full px-3 py-2 text-left hover:bg-nexus-surface-700 focus:bg-nexus-surface-700 focus:outline-none transition-colors"
                  >
                    {option[displayKey]}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <input
            type="text"
            value={manualValue}
            onChange={(e) => onManualChange(e.target.value)}
            placeholder={`Enter custom ${label.toLowerCase()}...`}
            className="w-full p-3 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg focus:ring-2 focus:ring-nexus-accent-cyan focus:outline-none transition-all"
            disabled={isLoading}
          />
        )}

        <button
          type="button"
          onClick={handleManualToggle}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-nexus-text-muted hover:text-nexus-text-primary underline focus:outline-none"
          title={isManual ? "Use predefined options" : "Enter manually"}
        >
          {isManual ? "Use options" : "Manual entry"}
        </button>
      </div>

      <p className="text-xs text-nexus-text-muted">
        {isManual
          ? "Enter your custom value above"
          : `Select from ${options.length} predefined options or use manual entry`
        }
      </p>
    </div>
  );
}