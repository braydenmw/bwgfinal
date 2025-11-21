import { GoogleGenAI } from '@google/genai';
import type { AIAgentConfig, MultiAgentTask, AgentResponse } from '../../types.ts';

export class GoogleGeminiAgent {
  public config: AIAgentConfig;
  private genAI: GoogleGenAI;

  constructor(config: AIAgentConfig) {
    this.config = config;
    this.genAI = new GoogleGenAI({ apiKey: config.apiKey });
  }

  async executeTask(task: MultiAgentTask): Promise<AgentResponse> {
    const startTime = Date.now();

    try {
      const model = (this.genAI as any).getGenerativeModel({ model: this.config.model });

      const prompt = this.buildPrompt(task);
      const result = await model.generateContent(prompt);
      const content = result.response.text();

      const processingTime = Date.now() - startTime;
      const tokensUsed = this.estimateTokens(content);

      return {
        agentId: `${this.config.provider}-${this.config.model}`,
        provider: this.config.provider,
        model: this.config.model,
        content,
        confidence: this.calculateConfidence(content),
        reasoning: 'Analysis completed using Google Gemini AI with comprehensive reasoning capabilities',
        processingTime,
        tokensUsed,
        timestamp: new Date().toISOString(),
        metadata: {
          // Add any relevant metadata here
          model: this.config.model,
          provider: this.config.provider
        }
      };
    } catch (error) {
      console.error('Google Gemini Agent error:', error);
      throw new Error(`Google Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildPrompt(task: MultiAgentTask): string {
    const basePrompt = `You are an expert AI analyst specializing in ${this.config.specializations.join(', ')}.

Task Type: ${task.type}
Context: ${JSON.stringify(task.context || {})}

Instructions:
- Provide detailed, accurate analysis
- Use evidence-based reasoning
- Be comprehensive but concise
- Maintain objectivity and accuracy

Question/Prompt: ${task.prompt}

Please provide your analysis:`;

    return basePrompt;
  }

  private calculateConfidence(content: string): number {
    // Simple confidence calculation based on content length and structure
    const lengthScore = Math.min(content.length / 1000, 1) * 0.3;
    const structureScore = (content.includes('analysis') || content.includes('conclusion')) ? 0.4 : 0.2;
    const detailScore = (content.split('.').length > 5) ? 0.3 : 0.1;

    return Math.min(lengthScore + structureScore + detailScore, 0.95);
  }

  private estimateTokens(content: string): number {
    // Rough estimation: ~4 characters per token for English text
    return Math.ceil(content.length / 4);
  }

  async healthCheck(): Promise<boolean> {
    try {
      const testTask: MultiAgentTask = {
        id: 'health-check',
        type: 'analysis',
        prompt: 'Respond with "OK" if you can process this message.',
        requiredAgents: 1,
        timeout: 5000,
        priority: 'low',
        consensusMethod: 'majority-vote'
      };

      await this.executeTask(testTask);
      return true;
    } catch (error) {
      console.error('Google Gemini health check failed:', error);
      return false;
    }
  }

  getCapabilities() {
    return {
      provider: this.config.provider,
      model: this.config.model,
      specializations: this.config.specializations,
      maxTokens: this.config.maxTokens,
      temperature: this.config.temperature
    };
  }
}