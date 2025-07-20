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
- 🎨 Interface com animações de entrada para uma melhor experiência do usuário.

## 🧱 Tecnologias Utilizadas

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Google Books API](https://developers.google.com/books)
- HTML, SCSS, TypeScript
- localStorage para persistência de dados

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone hhttps://github.com/FabioRG37/diario-leitura.git
   cd seu-repositorio
````

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

* [ ] Melhorias no visual da interface (estilização avançada)
* [ ] Sincronização em nuvem (Firebase ou similar)
* [ ] Compartilhamento de leituras com amigos
* [ ] Dark mode

## 🧑‍💻 Autor

Desenvolvido por **Fábio Gonçalves**
Contato: [LinkedIn](https://www.linkedin.com/in/f%C3%A1bio-gon%C3%A7alves-509bb330/) | Email: [falsilgon@gmail.com](mailto:falsilgon@gmail.com)

---
