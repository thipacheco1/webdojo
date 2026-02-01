# 📘 Documentação de Testes Automatizados – WebDojo

## 1. Visão Geral

Este projeto contém a suíte de **testes automatizados end‑to‑end (E2E)** da aplicação **WebDojo**, desenvolvida utilizando o **Cypress**.

O objetivo principal é garantir a qualidade da aplicação por meio de testes automatizados confiáveis, fáceis de manter e simples de executar tanto localmente quanto em pipelines de CI/CD.

---

## 2. Tecnologias Utilizadas

* **Node.js**
* **Cypress** (Testes E2E)
* **JavaScript**
* **Serve** (para servir a aplicação em ambiente local)

---

## 3. Pré‑requisitos

Antes de executar o projeto, certifique‑se de ter instalado:

* **Node.js** (versão recomendada: LTS)
* **npm** ou **yarn**

Para verificar:

```bash
node -v
npm -v
```

---

## 4. Instalação do Projeto

Clone o repositório e instale as dependências:

```bash
npm install
```

---

## 5. Estrutura do Projeto

```text
cypress/
├── e2e/
│   └── login.cy.js        # Testes de login
├── fixtures/              # Dados mockados
├── support/
│   ├── commands.js        # Comandos customizados
│   └── e2e.js             # Configurações globais

cypress.config.js          # Configuração do Cypress
package.json
README.md
```

---

## 6. Scripts Disponíveis

Os testes e a aplicação podem ser executados através dos seguintes scripts definidos no `package.json`:

### ▶️ Subir a aplicação localmente

```bash
npm run dev
```

* Sobe a aplicação compilada (`dist`) na porta **3000**.

---

### 🧪 Executar todos os testes Cypress

```bash
npm run test
```

* Executa **todos os testes E2E** em modo headless.

---

### 🔐 Executar apenas os testes de login

```bash
npm run test:login
```

* Executa exclusivamente o arquivo:

  ```text
  cypress/e2e/login.cy.js
  ```

---

### 📱 Executar testes de login simulando mobile

```bash
npm run test:login:mobile
```

* Executa os testes de login com viewport configurado para **mobile**:

  * Largura: `414`
  * Altura: `896`

Ideal para validar comportamento responsivo.

---

## 7. Padrões Adotados

### ✔️ Boas práticas

* Testes focados em **comportamento do usuário**
* Uso de **comandos customizados** para evitar repetição de código
* Dados sensíveis isolados em **fixtures**
* Testes independentes e reutilizáveis

---

## 8. Execução em CI/CD (Sugestão)

O projeto está preparado para execução em pipelines, utilizando:

```bash
npx cypress run
```

Recomenda‑se executar os testes após o build da aplicação.

---

## 9. Troubleshooting

### Cypress não abre ou falha ao executar

* Verifique se a aplicação está rodando (`npm run dev`)
* Confirme a versão do Node.js
* Limpe cache se necessário:

```bash
npx cypress cache clear
```

---

## 10. Evoluções Futuras

* Inclusão de relatórios (Allure / Mochawesome)
* Execução paralela
* Integração com CI (GitHub Actions / Bitbucket Pipelines)
* Cobertura de testes de API

---

## 11. Contato

Projeto mantido pelo time de qualidade.

---

🚀 **Bons testes e bons trades no WebDojo!**
