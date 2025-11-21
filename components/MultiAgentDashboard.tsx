import React, { useState, useEffect } from 'react';
import type { MultiAgentDashboardData, AgentHealthStatus, MultiAgentAnalysis } from '../types.ts';
import { getMultiAgentStatus, getAgentHealthStatus } from '../services/nexusService.ts';
import { NexusLogo, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ArrowUpIcon, CpuChipIcon, ArrowPathIcon } from './Icons.tsx';

interface MultiAgentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const MultiAgentDashboard: React.FC<MultiAgentDashboardProps> = ({ isOpen, onClose }) => {
  const [dashboardData, setDashboardData] = useState<MultiAgentDashboardData | null>(null);
  const [agentHealth, setAgentHealth] = useState<AgentHealthStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadDashboardData();
    }
  }, [isOpen]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [statusData, healthData] = await Promise.all([
        getMultiAgentStatus(),
        getAgentHealthStatus()
      ]);

      setDashboardData(statusData);
      setAgentHealth(healthData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'unhealthy': return 'text-red-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'degraded': return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
      case 'unhealthy': return <XCircleIcon className="w-4 h-4 text-red-500" />;
      case 'offline': return <XCircleIcon className="w-4 h-4 text-gray-500" />;
      default: return <XCircleIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-nexus-surface-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-nexus-border-medium">
          <div className="flex items-center gap-3">
            <div className="bg-nexus-accent-cyan/10 p-2 rounded-lg">
              <CpuChipIcon className="w-6 h-6 text-nexus-accent-cyan" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-nexus-text-primary">Multi-Agent Intelligence Dashboard</h2>
              <p className="text-sm text-nexus-text-secondary">Collaborative AI Analysis System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="p-2 text-nexus-text-secondary hover:text-nexus-accent-cyan transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-nexus-text-secondary hover:text-nexus-text-primary transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nexus-accent-cyan"></div>
              <span className="ml-2 text-nexus-text-secondary">Loading dashboard data...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 font-semibold">Error loading dashboard</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {dashboardData && (
            <div className="space-y-6">
              {/* System Status */}
              <div className="bg-nexus-surface-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">System Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${dashboardData.systemStatus === 'operational' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {dashboardData.systemStatus === 'operational' ? '●' : '●'}
                    </div>
                    <p className="text-sm text-nexus-text-secondary capitalize">{dashboardData.systemStatus}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-nexus-accent-cyan">
                      {dashboardData.activeTasks.length}
                    </div>
                    <p className="text-sm text-nexus-text-secondary">Active Tasks</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-nexus-accent-brown">
                      {agentHealth.length}
                    </div>
                    <p className="text-sm text-nexus-text-secondary">AI Agents</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-nexus-text-primary">
                      {dashboardData.performanceMetrics.consensusAccuracy.toFixed(1)}%
                    </div>
                    <p className="text-sm text-nexus-text-secondary">Accuracy</p>
                  </div>
                </div>
              </div>

              {/* Agent Health */}
              <div className="bg-nexus-surface-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">AI Agent Health</h3>
                <div className="grid gap-3">
                  {agentHealth.map((agent) => (
                    <div key={agent.agentId} className="flex items-center justify-between p-3 bg-nexus-surface-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(agent.status)}
                        <div>
                          <p className="font-semibold text-nexus-text-primary capitalize">
                            {agent.agentId.replace('-', ' ')}
                          </p>
                          <p className="text-sm text-nexus-text-secondary">
                            {agent.successRate.toFixed(1)}% success rate • {agent.averageResponseTime}ms avg response
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold capitalize ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </p>
                        <p className="text-xs text-nexus-text-secondary">
                          {agent.errorCount} errors
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-nexus-surface-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-nexus-surface-800/50 rounded-lg">
                    <div className="text-xl font-bold text-nexus-accent-cyan">
                      {dashboardData.performanceMetrics.averageResponseTime}ms
                    </div>
                    <p className="text-sm text-nexus-text-secondary">Avg Response Time</p>
                  </div>
                  <div className="text-center p-3 bg-nexus-surface-800/50 rounded-lg">
                    <div className="text-xl font-bold text-green-500">
                      {dashboardData.performanceMetrics.consensusAccuracy}%
                    </div>
                    <p className="text-sm text-nexus-text-secondary">Consensus Accuracy</p>
                  </div>
                  <div className="text-center p-3 bg-nexus-surface-800/50 rounded-lg">
                    <div className="text-xl font-bold text-nexus-accent-brown">
                      {dashboardData.performanceMetrics.costEfficiency}
                    </div>
                    <p className="text-sm text-nexus-text-secondary">Cost Efficiency</p>
                  </div>
                  <div className="text-center p-3 bg-nexus-surface-800/50 rounded-lg">
                    <div className="text-xl font-bold text-nexus-text-primary">
                      {Object.values(dashboardData.performanceMetrics.agentUptime).reduce((a, b) => a + b, 0) / Object.keys(dashboardData.performanceMetrics.agentUptime).length}%
                    </div>
                    <p className="text-sm text-nexus-text-secondary">Agent Uptime</p>
                  </div>
                </div>
              </div>

              {/* Recent Consensus */}
              {dashboardData.recentConsensus.length > 0 && (
                <div className="bg-nexus-surface-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Recent Consensus Results</h3>
                  <div className="space-y-3">
                    {dashboardData.recentConsensus.slice(0, 3).map((consensus, index) => (
                      <div key={index} className="p-3 bg-nexus-surface-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-nexus-accent-cyan">
                            {consensus.agreementLevel} consensus
                          </span>
                          <span className="text-sm text-nexus-text-secondary">
                            {(consensus.confidence * 100).toFixed(1)}% confidence
                          </span>
                        </div>
                        <p className="text-sm text-nexus-text-secondary line-clamp-2">
                          {consensus.consensusContent}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Tasks */}
              {dashboardData.activeTasks.length > 0 && (
                <div className="bg-nexus-surface-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-nexus-text-primary mb-3">Active Tasks</h3>
                  <div className="space-y-3">
                    {dashboardData.activeTasks.map((task) => (
                      <div key={task.task.id} className="p-3 bg-nexus-surface-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-nexus-text-primary capitalize">
                            {task.task.type} task
                          </span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            task.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                            task.status === 'processing' ? 'bg-blue-900/50 text-blue-400' :
                            'bg-red-900/50 text-red-400'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        <p className="text-sm text-nexus-text-secondary line-clamp-1">
                          {task.task.prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiAgentDashboard;