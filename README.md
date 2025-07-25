# 📚 Diário de Leitura

Aplicativo mobile desenvolvido com **Ionic + Angular** para organizar e acompanhar o progresso de leitura de livros.

## ✨ Funcionalidades

- 🔍 **Busca de livros** através da [Google Books API](https://developers.google.com/books).
- ➕ **Adição de livros à estante** com título, autor, imagem de capa e status.
- 📊 **Registro e edição do progresso de leitura** (páginas lidas).
- 📖 **Visualização da estante** com filtros por status:
  - Lido
  - Lendo
  - Quero ler
- 📉 **Exibição do progresso (%) de leitura** em cada livro da estante.
- ❌ **Remoção de livros** da estante.
- 🧠 **Persistência de dados no localStorage** (offline-friendly).
- 📈 **Tela de estatísticas** com resumo numérico e gráfico de status de leitura.
- 🏆 **Sistema de conquistas**: desbloqueie conquistas ao atingir metas como:
  - Primeira página lida
  - 100, 500, 1000 páginas lidas
  - 3, 5, 10 livros finalizados
- 📦 **Detecção automática de conquistas** com base no progresso de leitura e status dos livros.
- 🎨 Interface moderna com **estilo clean**, **menu lateral com ícones** e **animações suaves** de transição.

## 🧱 Tecnologias Utilizadas

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Google Books API](https://developers.google.com/books)
- [Chart.js + ng2-charts](https://www.chartjs.org/)
- [@angular/animations](https://angular.io/guide/animations)
- HTML, SCSS, TypeScript
- localStorage para persistência de dados

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/FabioRG37/diario-leitura.git
   cd diario-leitura
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode o app no navegador:

   ```bash
   ionic serve
   ```

## 📱 Gerar APK Android (em breve)

Você poderá gerar o APK para Android com o Capacitor:

   ```bash
   ionic build
   npx cap add android
   npx cap open android
   ```

> Em breve será feita a configuração completa de build para Android.

## 🧩 Melhorias Futuras

* [x] Dark mode
* [x] Sistema de conquistas
* [ ] Sincronização em nuvem (Firebase ou similar)
* [ ] Compartilhamento de leituras com amigos
* [ ] Notificações para lembrete de leitura
* [ ] Acompanhamento de metas mensais

## 🧑‍💻 Autor

Desenvolvido por **Fábio Gonçalves**
📨 [falsilgon@gmail.com](mailto:falsilgon@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/f%C3%A1bio-gon%C3%A7alves-509bb330/)

```