# 📖 Diário de Leitura

Aplicativo desenvolvido com **Ionic + Angular**, que permite buscar livros usando a **Google Books API**, organizá-los em uma estante personalizada e acompanhar o progresso de leitura.

## 🎯 Objetivo

Criar um diário de leitura digital com funcionalidades como:

- Buscar livros por título ou autor
- Visualizar detalhes dos livros
- Organizar livros nas listas: *Quero ler*, *Lendo*, *Lido*
- Acompanhar o progresso de leitura
- Visualizar estatísticas pessoais

## 🔧 Tecnologias utilizadas

- [Angular 16](https://angular.io/)
- [Ionic 7](https://ionicframework.com/)
- [Google Books API](https://developers.google.com/books)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)

## 🚀 Como executar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/diario-leitura.git
   cd diario-leitura
````

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode o servidor de desenvolvimento:

   ```bash
   ng serve
   ```

4. Acesse no navegador:

   ```
   http://localhost:4200
   ```

## ✅ Funcionalidades implementadas

* Página inicial com acesso às principais áreas do app
* Tela de busca integrada à Google Books API
* Exibição dos detalhes do livro com capa, título, autores, descrição, etc.
* Botão "Adicionar à estante" com seleção de status (Quero ler / Lendo / Lido)
* Armazenamento local com `localStorage`
* Tela "Estante" com lista de livros salvos
* Filtro por status na estante

## 🛠️ Próximas funcionalidades

* Alterar status de leitura direto na estante
* Remover livros da estante
* Tela de estatísticas (livros lidos, em andamento, etc.)
* Registro de progresso (% lido ou capítulos)

---

Feito com 💙 por \[Fábio Gonçalves]

