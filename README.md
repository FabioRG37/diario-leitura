# 📚 Diário de Leitura

Aplicativo criado com **Ionic + Angular** para auxiliar no acompanhamento de livros em leitura. Permite buscar livros, adicioná-los à estante virtual com diferentes status, acompanhar o progresso de leitura por páginas e remover livros facilmente.

## 🧩 Funcionalidades

- 🔍 **Busca de livros** usando a API do Google Books
- 📚 **Estante virtual** com os seguintes filtros:
  - Todos
  - Quero Ler
  - Lendo
  - Lido
- ➕ **Adição de livros** à estante com seleção de status
- ✏️ **Edição de progresso de leitura** com base no número de páginas lidas
- 📈 **Exibição de barra de progresso** com a porcentagem lida
- 🧮 **Inserção manual de total de páginas** para livros que não fornecem essa informação
- 🗑️ **Remoção de livros** da estante
- 🧭 **Navegação entre páginas** por menu lateral

## 📷 Capturas de Tela

> Adicione aqui prints das páginas: busca, estante, editar progresso.

## 🚀 Tecnologias Utilizadas

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Google Books API](https://developers.google.com/books)

## ▶️ Como Rodar o Projeto

1. **Clone o repositório**
```bash
git clone https://github.com/FabioRG37/diario-leitura.git
cd diario-leitura
````

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o app em ambiente de desenvolvimento**

```bash
ionic serve
```

## 📁 Estrutura de Páginas

* `/busca` – página para pesquisar livros
* `/estante` – página principal com a estante e filtros
* `/editar-progresso/:id` – página para atualizar progresso de leitura
* `/detalhes/:id` – página com mais informações do livro

## ✅ Status do Projeto

✅ Funcional
🔄 Melhorias futuras:

* Marcar livro como finalizado ao atingir 100%
* Sincronizar com conta do usuário
* Histórico de leituras anteriores

## 🧑‍💻 Desenvolvedor

Fábio Gonçalves
Desenvolvedor em transição para Ciência de Dados | [LinkedIn](https://www.linkedin.com/in/seu-usuario)
