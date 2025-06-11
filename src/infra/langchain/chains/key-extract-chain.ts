import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';

const model = new ChatOpenAI({
  // model: 'gpt-3.5-turbo',
  model: 'gpt-4o-mini',
});

const outputParser = new StringOutputParser();

interface KeyExtractChainInputs {
  schema: string;
  entry: string;
}

const template = PromptTemplate.fromTemplate<KeyExtractChainInputs>(
  ` 
  Você deve extrair do JSON Schema (JSONSchema7) passado somente as chaves necessárias para resolver a interação do usuário:
  Seja o mais objetivo possível, removendo todos os campos que não são relevantes para resolver diretamente a pergunta do usuário.

  JSON Schema (JSONSchema7):
  ####
  {schema}
  ####

  Interação:
  ####
  {entry}
  ####

  A extração deve ocorrer no seguinte formato:
  key1;key2;key3;key4;key5

  - Se houver valores em objetos filhos, posicione a key assim:
    key1.chaveFilha;key2.chaveFilha;key3;key4

  - Se houver valores em objetos filhos dentro de arrays, posicione a key assim:
    key1[].chaveFilhaEmArray;key2[].chaveFilhaEmArray;key3;key4

  Siga os exemplos:

  ####
  JSON Schema:
  {{
    "type": "object",
    "properties": {{
      "nome":           {{ "type": "string" }},
      "idade":          {{ "type": "number" }},
      "salario":        {{ "type": "number" }},
      "quantidadeFilhos": {{ "type": "number" }}
    }},
    "required": ["nome", "idade", "salario", "quantidadeFilhos"]
  }}
  Interação: "Qual o nome das pessoas acima de 40 anos?"
  Resposta (somente as chaves):
  "nome;idade"
  ####

  ####
  JSON Schema:
  {{
    "type": "object",
    "properties": {{
      "nome":    {{ "type": "string" }},
      "idade":   {{ "type": "number" }},
      "salario": {{ "type": "number" }},
      "quantidadeFilhos": {{ "type": "number" }}
    }},
    "required": ["nome", "idade", "salario", "quantidadeFilhos"]
  }}
  Interação: "Qual o salário médio das pessoas entre 25 e 30 anos?"
  Resposta (somente as chaves):
  "salario;idade"
  ####

  ####
  JSON Schema:
  {{
    "type": "object",
    "properties": {{
      "nome":  {{ "type": "string" }},
      "idade": {{ "type": "number" }},
      "salario": {{ "type": "number" }},
      "filhos": {{
        "type": "array",
        "items": {{
          "type": "object",
          "properties": {{
            "nome":  {{ "type": "string" }},
            "idade": {{ "type": "number" }}
          }},
          "required": ["nome", "idade"]
        }}
      }}
    }},
    "required": ["nome", "idade", "salario", "filhos"]
  }}
  Interação: "Qual o nome dos filhos das pessoas de 20 anos?"
  Resposta (somente as chaves):
  "idade;filhos[].nome"
  ####

  Não inclua mais nada na resposta, somente as chaves neste formato.
  `.trim(),
);

const keyExtractChain = template.pipe(model).pipe(outputParser);

export default keyExtractChain;
