import * as path from 'path';
import { promises as fs } from 'fs';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';

import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';

// define o formato do nosso JSON de histórico
type HistoryContent = { text: string; from: string };
type HistoryDB = Record<string, HistoryContent[]>;

export class LangChainAgent {
  private historyPath = path.resolve(__dirname, 'messages.json');
  private prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `Você é um assistente de IA que está integrado com o whatsapp dos teus brother. Sempre que alguém te perturbar, mande se fuder responda com uma grosseria absurda."`,
    ],
    ['placeholder', '{chat_history}'],
    ['human', '{input}'],
    ['placeholder', '{agent_scratchpad}'],
  ]);

  private llm = new ChatOpenAI({
    model: 'gpt-4o-mini',
  });

  private tools = [];

  private agent = createToolCallingAgent({
    llm: this.llm,
    tools: this.tools,
    prompt: this.prompt,
  });

  private executor = new AgentExecutor({
    agent: this.agent,
    verbose: true,
    tools: this.tools,
  });

  // lê o histórico e retorna só o texto
  private async loadHistory(phone: string): Promise<HistoryContent[]> {
    let db: HistoryDB = {};
    try {
      const raw = await fs.readFile(this.historyPath, 'utf-8');
      db = JSON.parse(raw) as HistoryDB;
    } catch {
      // arquivo não existe ou JSON inválido -> db fica {}
    }
    return (
      db[phone]?.map((entry) => ({ text: entry.text, from: entry.from })) || []
    );
  }

  // salva uma mensagem (user ou agent) no JSON
  private async saveMessage(
    phone: string,
    from: 'contact' | 'me',
    text: string,
  ): Promise<void> {
    let db: HistoryDB = {};
    try {
      const raw = await fs.readFile(this.historyPath, 'utf-8');
      db = JSON.parse(raw) as HistoryDB;
    } catch {
      // sem histórico ainda, cria novo objeto
    }
    if (!db[phone]) db[phone] = [];
    db[phone].push({
      text,
      from,
    });
    await fs.writeFile(this.historyPath, JSON.stringify(db, null, 2), 'utf-8');
  }

  constructor() {}

  public async run(phone: string, message: string) {
    // 1) carrega e monta histórico como string
    const historyArr = await this.loadHistory(phone);
    console.log('HISTÓRICO:', historyArr);
    const historyString = JSON.stringify(historyArr);

    // 2) invoca o agente passando chat_history
    const result = await this.executor.invoke({
      input: message,
      chat_history: historyString,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = result.output;

    console.log('Mensagem recebida:', message);
    console.log('RESPOSTA DO AGENTE:', response);

    // 3) grava both user e agent no JSON
    await this.saveMessage(phone, 'contact', message);
    await this.saveMessage('phone', 'me', response);

    return response as string;
  }
}
