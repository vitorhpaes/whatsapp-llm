<p align="center">
  <img src="https://img.shields.io/badge/whatsapp--llm-v0.0.1-blue?style=for-the-badge&logo=whatsapp" alt="whatsapp-llm">
  <img src="https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg?style=for-the-badge" alt="license">
  <img src="https://img.shields.io/badge/build-passing-green?style=for-the-badge" alt="build status">
  <img src="https://img.shields.io/badge/coverage-—%25-yellow?style=for-the-badge" alt="coverage">
</p>

<h1 align="center">🤖 whatsapp-llm</h1>
<p align="center">Um bot inteligente para WhatsApp via Z-API + LangChain + NestJS 🚀</p>

---
## 🛠️ Como Contribuir

> 🌟 **Por que contribuir?**
>
> - 🤖 Faça uma fork e crie um bot mais útil e inteligente para contribuir com os usuários!!  

Pronto para colaborar?  
1. ⭐ Faça um fork do projeto  
2. 📥 Crie uma branch: `git checkout -b feature/nome-da-sua-ideia`  
3. 📝 Implemente suas mudanças
4. 🔍 Rode `yarn test` e `yarn lint`  
5. 📤 Abra um Pull Request descrevendo suas melhorias  

Agradecemos cada contribuição – juntos vamos construir algo incrível! 🚀

## 📖 Visão Geral

**whatsapp-llm** é um _middleware_ que recebe mensagens de WhatsApp via **Z-API Webhook**, processa-as com um agente (powered by LangChain + OpenAI) e responde automaticamente ao usuário no próprio WhatsApp. Ideal para criar chatbots de atendimento, assistentes virtuais e automações inteligentes.

---

## 🚀 Tecnologias

- **NestJS** _(v11)_ – Framework Node.js modular e escalável  
- **LangChain** _(core & openai)_ – Orquestração de agentes LLM  
- **Z-API** – Integração com WhatsApp via webhook  
- **TypeScript** – Tipagem estática  
- **dotenv** – Gerenciamento de variáveis de ambiente  
- **Zod** – Validação de schemas  
- **Jest** – Testes unitários & e2e  
- **ESLint + Prettier** – Linting & formatação  

---

## 🔧 Instalação

1. Clone o repositório  
   ```bash
   git clone https://github.com/vitorhpaes/whatsapp-llm.git
   cd whatsapp-llm
