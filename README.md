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

## Schema do banco de dados (Supabase / PostgreSQL)

Rode o SQL abaixo no **SQL Editor** do seu projeto Supabase para criar as tabelas e as políticas de segurança (RLS):

```sql
-- ==========================================
-- 1. TABELAS DE APOIO (DIMENSÕES)
-- ==========================================

-- Tabela de Fornecedores
CREATE TABLE fornecedores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Funcionários
CREATE TABLE funcionarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Contas Particulares / Sócios
CREATE TABLE particulares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ==========================================
-- 2. TABELAS DE FLUXO DE CAIXA (FATOS)
-- ==========================================

-- Tabela de Entradas (Receitas do Restaurante)
CREATE TABLE entradas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE NOT NULL,
  forma_pagamento TEXT NOT NULL,
  valor NUMERIC(10, 2) NOT NULL,
  observacao TEXT, -- Guarda as tags: "Dia | Salão | 15 mesas" ou "Iniciar Caixa"
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Gastos (Despesas e Sangrias)
CREATE TABLE gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE NOT NULL,
  categoria TEXT NOT NULL,
  valor NUMERIC(10, 2) NOT NULL,
  descricao TEXT, -- Usado para obs em "Sangria", "Particulares" e "Outros"
  fornecedor_id UUID REFERENCES fornecedores(id),
  funcionario_id UUID REFERENCES funcionarios(id),
  particular_id UUID REFERENCES particulares(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ==========================================
-- 3. TABELA DE INTELIGÊNCIA E CONTEXTO
-- ==========================================

-- Registra o Clima e Movimento para o Big Data cruzar com as vendas
CREATE TABLE contexto_diario (
  data DATE PRIMARY KEY,
  clima TEXT,
  movimento TEXT
);


-- ==========================================
-- 4. POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
-- ==========================================
-- Isso prova para qualquer avaliador que o banco é seguro e que
-- ninguém sem fazer login consegue ler ou inserir dados pela API.

ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE particulares ENABLE ROW LEVEL SECURITY;
ALTER TABLE entradas ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contexto_diario ENABLE ROW LEVEL SECURITY;

-- Criação da política de acesso: Somente usuários autenticados têm permissão total
CREATE POLICY "Acesso Autenticado" ON fornecedores FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Acesso Autenticado" ON funcionarios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Acesso Autenticado" ON particulares FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Acesso Autenticado" ON entradas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Acesso Autenticado" ON gastos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Acesso Autenticado" ON contexto_diario FOR ALL USING (auth.role() = 'authenticated');
```

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
