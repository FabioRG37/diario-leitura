# Diário de Leitura 📚

Aplicativo desenvolvido com **Ionic + Angular** para organizar sua estante virtual de livros e acompanhar o progresso de leitura.

## Funcionalidades

- 🔍 **Busca de livros** usando a Google Books API.
- 📚 **Estante de leitura** com os seguintes status:
  - Quero ler
  - Lendo
  - Lido
- 🗑️ **Remoção de livros** diretamente pela estante.
- 📄 **Detalhes do livro** com título, autores e imagem de capa.
- 📂 **Armazenamento local** (localStorage) para persistência dos dados.
- 🎨 **Layout responsivo** com uso de `ion-card`, `ion-grid` e animações (`@angular/animations`).
- 📱 **Menu lateral (side menu)** para navegação entre páginas.

## Tecnologias utilizadas

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Google Books API](https://developers.google.com/books)
- [@angular/animations](https://angular.io/guide/animations)
- HTML5 + SCSS

## Pré-requisitos

- Node.js v18+
- Ionic CLI
- Angular CLI
- NPM

## Instalação

```bash
git clone https://github.com/FabioRG37/diario-leitura.git
cd diario-leitura
npm install
ionic serve
````

## Estrutura de diretórios

```
src/
├── app/
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas como estante e detalhes do livro
│   └── services/          # Serviços para manipulação de dados
├── assets/
│   └── sem-capa.png       # Imagem padrão para livros sem capa
```

## Próximas melhorias

* 📈 Indicador de progresso de leitura.
* 📝 Anotações e resumos por livro.
* 🔁 Sincronização com backend (futuramente).

---

Feito com 💙 por Fábio Gonçalves