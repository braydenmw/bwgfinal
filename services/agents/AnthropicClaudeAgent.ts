import Anthropic from '@anthropic-ai/sdk';
import type { AIAgentConfig, MultiAgentTask, AgentResponse } from '../../types.ts';

export class AnthropicClaudeAgent {
  public config: AIAgentConfig;
  private client: Anthropic;

  constructor(config: AIAgentConfig) {
    this.config = config;
    this.client = new Anthropic({
      apiKey: config.apiKey,
    });
  }

  async executeTask(task: MultiAgentTask): Promise<AgentResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = `You are an expert AI analyst specializing in ${this.config.specializations.join(', ')}. You are known for ethical analysis, safety considerations, and comprehensive reasoning. Provide detailed, accurate analysis with high confidence and safety considerations.`;

      const userPrompt = this.buildPrompt(task);

      const message = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens || 4096,
        temperature: this.config.temperature || 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      });

      const content = message.content[0]?.type === 'text' ? message.content[0].text : '';
      const processingTime = Date.now() - startTime;
      const tokensUsed = message.usage?.input_tokens + (message.usage?.output_tokens || 0) || this.estimateTokens(content);

      return {
        agentId: `${this.config.provider}-${this.config.model}`,
        provider: this.config.provider,
        model: this.config.model,
        content,
        confidence: this.calculateConfidence(content, message.stop_reason),
        reasoning: 'Analysis completed using Anthropic Claude with ethical AI reasoning and safety considerations',
        processingTime,
        tokensUsed,
        timestamp: new Date().toISOString(),
        metadata: {
          stopReason: message.stop_reason,
          usage: message.usage
        }
      };
    } catch (error) {
      console.error('Anthropic Claude Agent error:', error);
      throw new Error(`Anthropic API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildPrompt(task: MultiAgentTask): string {
    const basePrompt = `You are an expert AI analyst specializing in ${this.config.specializations.join(', ')} with a focus on ethical analysis and safety considerations.

Task Type: ${task.type}
Context: ${JSON.stringify(task.context || {})}

Instructions:
- Provide detailed, accurate analysis with ethical considerations
- Use evidence-based reasoning with safety checks
- Be comprehensive but concise
- Maintain objectivity and accuracy
- Consider potential biases and safety implications
- Cross-validate information for reliability

Question/Prompt: ${task.prompt}

Please provide your analysis with confidence scoring and safety considerations:`;

    return basePrompt;
  }

  private calculateConfidence(content: string, stopReason?: string): number {
    // Base confidence from content quality
    const lengthScore = Math.min(content.length / 1000, 1) * 0.35;
    const structureScore = (content.includes('analysis') || content.includes('conclusion')) ? 0.3 : 0.1;
    const detailScore = (content.split('.').length > 5) ? 0.25 : 0.05;
    const safetyScore = (content.includes('safety') || content.includes('ethical')) ? 0.1 : 0.05;

    let confidence = lengthScore + structureScore + detailScore + safetyScore;

    // Adjust based on stop reason
    if (stopReason === 'end_turn') {
      confidence = Math.min(confidence + 0.1, 0.95); // Natural completion
    } else if (stopReason === 'max_tokens') {
      confidence = Math.min(confidence, 0.85); // Hit token limit
    }

    return Math.max(0.1, Math.min(confidence, 0.95));
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
      console.error('Anthropic Claude health check failed:', error);
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