# South Of France

Sistema de fechamento de caixa para restaurante. Feito para registrar entradas (por forma de pagamento), gastos por categoria e acompanhar o resumo financeiro do mês, com login próprio para cada usuário.

## Funcionalidades

- **Login** (`index.html`) com autenticação via Supabase Auth.
- **Dashboard** (`dashboard.html`):
  - Navegação por data (abre no dia de hoje, mas permite pular para outras datas).
  - Lançamento de entradas de caixa por forma de pagamento (Dinheiro, Cartão, iFood, 99, etc).
  - Lançamento de gastos por categoria, com opção "outros" para digitar livremente.
  - Resumo do mês com totais de entradas, gastos e saldo.
  - Cadastro de fornecedores, particulares e funcionários.

## Stack

- HTML/CSS/JS puro (sem framework)
- [Supabase](https://supabase.com) para banco de dados e autenticação
- Hospedagem sugerida: [Vercel](https://vercel.com) ou GitHub Pages

## Como rodar o projeto

1. Crie um projeto no [Supabase](https://supabase.com) e configure as tabelas necessárias (entradas, gastos, fornecedores, particulares, funcionários) e o Auth.
2. Copie `config.example.js` para `config.js`:
   ```bash
   cp config.example.js config.js
   ```
3. Edite `config.js` com a URL e a chave `anon` do seu projeto Supabase (encontradas em *Project Settings > API*).
4. Abra `index.html` no navegador (ou suba os arquivos para Vercel/GitHub Pages).

> ⚠️ O arquivo `config.js` contém credenciais do seu projeto e está no `.gitignore` — ele nunca deve ser commitado no repositório.

## Estrutura

```
├── index.html          # Tela de login
├── dashboard.html      # Painel principal de fechamento de caixa
├── config.example.js   # Modelo de configuração (copie para config.js)
├── .gitignore
└── README.md
```

## Licença

Sinta-se livre para usar e adaptar este projeto.
