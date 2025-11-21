import OpenAI from 'openai';
import type { AIAgentConfig, MultiAgentTask, AgentResponse } from '../../types.ts';

export class OpenAIAgent {
  public config: AIAgentConfig;
  private client: OpenAI;

  constructor(config: AIAgentConfig) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey,
    });
  }

  async executeTask(task: MultiAgentTask): Promise<AgentResponse> {
    const startTime = Date.now();

    try {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `You are an expert AI analyst specializing in ${this.config.specializations.join(', ')}. Provide detailed, accurate analysis with high confidence.`
        },
        {
          role: 'user',
          content: this.buildPrompt(task)
        }
      ];

      const completion = await this.client.chat.completions.create({
        model: this.config.model,
        messages,
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 4096,
      });

      const content = completion.choices[0]?.message?.content || '';
      const processingTime = Date.now() - startTime;
      const tokensUsed = completion.usage?.total_tokens || this.estimateTokens(content);

      return {
        agentId: `${this.config.provider}-${this.config.model}`,
        provider: this.config.provider,
        model: this.config.model,
        content,
        confidence: this.calculateConfidence(content, completion.choices[0]?.finish_reason),
        reasoning: 'Analysis completed using OpenAI GPT with advanced reasoning capabilities',
        processingTime,
        tokensUsed,
        timestamp: new Date().toISOString(),
        metadata: {
          finishReason: completion.choices[0]?.finish_reason,
          usage: completion.usage
        }
      };
    } catch (error) {
      console.error('OpenAI Agent error:', error);
      throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
- Cross-validate information where possible

Question/Prompt: ${task.prompt}

Please provide your analysis with confidence scoring:`;

    return basePrompt;
  }

  private calculateConfidence(content: string, finishReason?: string): number {
    // Base confidence from content quality
    const lengthScore = Math.min(content.length / 1000, 1) * 0.4;
    const structureScore = (content.includes('analysis') || content.includes('conclusion')) ? 0.3 : 0.1;
    const detailScore = (content.split('.').length > 5) ? 0.3 : 0.1;

    let confidence = lengthScore + structureScore + detailScore;

    // Adjust based on finish reason
    if (finishReason === 'stop') {
      confidence = Math.min(confidence + 0.1, 0.95); // Natural completion
    } else if (finishReason === 'length') {
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
      console.error('OpenAI health check failed:', error);
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