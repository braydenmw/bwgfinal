import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { composeReport } from '../services/nexusService.ts';
import type { ReportParameters } from '../types';
import { Zap, Users, ShieldCheck, FileText, TrendingUp, Cog, HelpCircle, Settings, Layers, BrainCircuit, X, Lightbulb, BarChart, Check, File, FileSignature, BookOpen } from 'lucide-react';

const InfoButton = ({ text }: { text: string }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: '8px' }}>
      <HelpCircle size={16} color="#999" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)} style={{ cursor: 'pointer' }} />
      {showInfo && (
        <div style={{
          position: 'absolute',
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#333',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          width: '200px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 10,
        }}>{text}</div>
      )}
    </div>
  );
};

interface ReportGenerationModalProps {
  onClose: () => void;
  onConfirm: (reportType: string, reportLength: string) => void;
  isGenerating: boolean;
}

const InstantNexusIntelligencePlatform = ({
  onProfileUpdate,
  onReportUpdate,
  WIZARD_STEPS,
  STAGES,
  completedSteps,
  formData,
  currentStep,
  handleFormChange: handleFormChange,
  prevStep,
  nextStep,
}: any) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [showGenerationModal, setShowGenerationModal] = useState(false);


  const tiers = [
    { id: 'tier1', name: 'Essential', description: 'Core analysis for initial understanding.', icon: <Layers size={24} /> },
    { id: 'tier2', name: 'Advanced', description: 'In-depth diagnostics and ecosystem mapping.', icon: <Zap size={24} /> },
    { id: 'tier3', name: 'Strategic', description: 'Full suite with predictive modeling and negotiation intelligence.', icon: <BrainCircuit size={24} /> },
  ];

  const modules = [
    { id: 'rroi', name: 'RROI Diagnostic', description: 'Analyze regional readiness and opportunity.', icon: <TrendingUp size={20} /> },
    { id: 'seam', name: 'SEAM Ecosystem', description: 'Map potential partnership ecosystems.', icon: <Users size={20} /> },
    { id: 'tpt', name: 'TPT Simulation', description: 'Simulate impacts of strategic interventions.', icon: <Cog size={20} /> },
    { id: 'nni', name: 'Negotiation Intel', description: 'Model negotiation scenarios.', icon: <ShieldCheck size={20} /> },
  ];

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const goalAlignmentScore = useMemo(() => {
    let score = 0;
    if (formData.objective && formData.objective.length > 20) score += 25;
    if (selectedTier) score += 25;
    if (selectedModules.length > 0) score += selectedModules.length * 10;
    return Math.min(score, 100);
  }, [formData.objective, selectedTier, selectedModules]);

  const successLikelihood = useMemo(() => {
    let score = goalAlignmentScore;
    if (selectedTier === 'tier2') score += 10;
    if (selectedTier === 'tier3') score += 20;
    if (selectedModules.includes('nni')) score += 15;
    return Math.min(score, 100);
  }, [goalAlignmentScore, selectedTier, selectedModules]);

  const handleGenerate = async (reportType: string, reportLength: string) => {
    setIsGenerating(true);
    try {
      const params: ReportParameters = {
        ...formData,
        reportType,
        reportLength,
      };
      // The composeReport function expects an array of module IDs
      const result = await composeReport(selectedModules, params);
      console.log('Report generation started:', result);
      // You might want to handle the result, e.g., show a success message or navigate
      onReportUpdate(result); // Assuming this updates the main state with the report data/ID
    } catch (error) {
      console.error("Failed to generate report", error);
      // You should show an error message to the user here
    } finally {
      setIsGenerating(false);
      setShowGenerationModal(false);
    }
  };

  const ReportGenerationModal: React.FC<ReportGenerationModalProps> = ({ onClose, onConfirm, isGenerating }) => {
    const [reportType, setReportType] = useState('report');
    const [reportLength, setReportLength] = useState('standard');

    const Button = ({ isActive, onClick, children }: { isActive: boolean, onClick: () => void, children: React.ReactNode }) => (
        <button
            onClick={onClick}
            style={{
                flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer',
                border: `2px solid ${isActive ? '#ff6b35' : '#e5e7eb'}`,
                background: isActive ? '#fff7f5' : 'white',
                color: isActive ? '#ff6b35' : '#333',
                fontWeight: 600,
                transition: 'all 0.2s ease-in-out'
            }}
        >
            {children}
        </button>
    );

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10, 25, 47, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '600px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Generate Intelligence Output</h2>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '10px', color: '#333' }}>1. Select Output Format</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button isActive={reportType === 'report'} onClick={() => setReportType('report')}>Report</Button>
              <Button isActive={reportType === 'letter'} onClick={() => setReportType('letter')}>Letter</Button>
              <Button isActive={reportType === 'summary'} onClick={() => setReportType('summary')}>Summary</Button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '10px', color: '#333' }}>2. Select Report Length</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button isActive={reportLength === 'snapshot'} onClick={() => setReportLength('snapshot')}>Snapshot (2pg)</Button>
              <Button isActive={reportLength === 'standard'} onClick={() => setReportLength('standard')}>Standard (5-7pg)</Button>
              <Button isActive={reportLength === 'comprehensive'} onClick={() => setReportLength('comprehensive')}>Comprehensive (10+pg)</Button>
            </div>
          </div>

          <div style={{ background: '#f4f7f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '10px' }}>Pre-Summary Report</h3>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.5 }}>
              Based on your objective to "{(formData.objective || '').substring(0, 50)}...", this <strong>{reportLength} {reportType}</strong> will focus on the <strong>{selectedTier ? tiers.find(t => t.id === selectedTier)?.name : ''}</strong> analysis tier, utilizing the <strong>{selectedModules.map(m => m.toUpperCase()).join(', ')}</strong> modules. The primary insight will be...
            </p>
          </div>

          <button onClick={() => onConfirm(reportType, reportLength)} disabled={isGenerating} style={{ width: '100%', background: '#ff6b35', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '16px', opacity: isGenerating ? 0.6 : 1 }}>
            {isGenerating ? 'Generating...' : 'Confirm & Generate'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f4f7f9',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Left Sidebar */}
      <aside style={{ width: '280px', background: '#ffffff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a', marginBottom: '30px' }}>BW Nexus AI</h2>
        <nav>
          {/* Simplified nav for this view */}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a' }}>Generate Intelligence Report</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#e5e7eb', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer' }}>Save Draft</button>
            <button onClick={() => setShowGenerationModal(true)} style={{ background: '#ff6b35', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              {isGenerating ? 'Generating...' : 'Generate...'}
            </button>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          {/* Left Column: Inputs */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Report Name</label>
              <input
                type="text"
                value={formData.reportName || ''}
                onChange={(e) => handleFormChange('reportName', e.target.value)}
                placeholder="e.g., AgriTech Partners for Mindanao"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Strategic Objective</label>
              <textarea
                value={formData.objective || ''}
                onChange={(e) => handleFormChange('objective', e.target.value)}
                placeholder="Describe your goal or the problem you want to solve..."
                rows={4}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', resize: 'none' }} />
            </div>

            {/* Tier Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '15px' }}>
                Select Analysis Tier
                <InfoButton text="Tiers determine the depth of analysis. Higher tiers unlock more advanced modules." />
              </label>
              <div style={{ display: 'flex', gap: '15px' }}>
                {tiers.map(tier => (
                  <button key={tier.id} onClick={() => setSelectedTier(tier.id)} style={{
                    flex: 1, padding: '15px', borderRadius: '10px', border: `2px solid ${selectedTier === tier.id ? '#ff6b35' : '#e5e7eb'}`,
                    background: selectedTier === tier.id ? '#fff7f5' : 'white', cursor: 'pointer', textAlign: 'left'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, color: '#1a1a1a' }}>{tier.icon} {tier.name}</div>
                    <p style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>{tier.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Module Selection */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '15px' }}>
                Customize with Modules
                <InfoButton text="Select specific analytical modules to tailor the report to your needs." />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {modules.map(module => (
                  <button key={module.id} onClick={() => toggleModule(module.id)} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px',
                    border: `2px solid ${selectedModules.includes(module.id) ? '#ff6b35' : '#e5e7eb'}`,
                    background: selectedModules.includes(module.id) ? '#fff7f5' : 'white', cursor: 'pointer'
                  }}>
                    <div style={{ color: selectedModules.includes(module.id) ? '#ff6b35' : '#555' }}>{module.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{module.name}</div>
                      <p style={{ fontSize: '12px', color: '#666' }}>{module.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '15px' }}><Settings size={20} /> Report Settings</h3>
              {/* <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '8px' }}>AI Persona</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}>
                  <option>Strategic Advisor</option>
                  <option>Data Analyst</option>
                  <option>Risk Manager</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '8px' }}>Analytical Lens</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}>
                  <option>Economic Diversification</option>
                  <option>Foreign Direct Investment</option>
                  <option>Supply Chain Resilience</option>
                </select>
              </div> */}
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '20px' }}><BarChart size={20} /> Intelligence Summary</h3>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 600 }}>Goal Alignment</label>
                <div style={{ background: '#e5e7eb', borderRadius: '99px', height: '8px', marginTop: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${goalAlignmentScore}%`, background: '#34d399', height: '100%' }}></div>
                </div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600 }}>Success Likelihood</label>
                <div style={{ background: '#e5e7eb', borderRadius: '99px', height: '8px', marginTop: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${successLikelihood}%`, background: '#60a5fa', height: '100%' }}></div>
                </div>
              </div>
              <div style={{ marginTop: '20px', background: '#f0f9ff', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#0284c7' }}><Lightbulb size={18} /> AI Copilot Advice</h4>
                <p style={{ fontSize: '13px', color: '#0369a1', marginTop: '8px', lineHeight: 1.5 }}>
                  {successLikelihood > 70 ? "High success potential. Consider adding the 'Negotiation Intel' module to prepare for partnership discussions." : "To increase success likelihood, define your objective more specifically and select an 'Advanced' or 'Strategic' tier."}
                </p>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '15px' }}><FileText size={20} /> Configuration Summary</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#555' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Layers size={16} /> <strong>Tier:</strong> {selectedTier ? tiers.find(t => t.id === selectedTier)?.name : 'Not Selected'}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}><Users size={16} /> <strong>Modules:</strong> {selectedModules.length > 0 ? selectedModules.map(m => m.toUpperCase()).join(', ') : 'None'}</li>
              </ul>
            </div>
          </div>
        </div>
        {showGenerationModal && (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ReportGenerationModal onClose={() => setShowGenerationModal(false)} onConfirm={handleGenerate} isGenerating={isGenerating} />
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default InstantNexusIntelligencePlatform;