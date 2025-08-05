
## 📝 Modelo Padrão de Pull Request (PR)


## 📋 Descrição

<!-- Descreva de forma breve e objetiva o que foi implementado nesta PR. Ex: -->
Implementação da tela de Edição de Perfil, permitindo que o usuário edite seu nome e altere sua senha. A funcionalidade está integrada com o Firebase Authentication e Firestore.

---

## 🔨 O que foi feito

- [x] Criação da página de Perfil.
- [x] Funcionalidade para editar o nome do usuário.
- [x] Alteração de senha com reautenticação.
- [x] Exibição do nome do usuário na toolbar (fallback para email).
- [x] Serviço de integração com Firestore (coleção `usuarios`).
- [x] Preparação do fluxo para upload de fotos futuramente.
- [x] Ajustes de segurança nas regras do Firestore.

---

## ✅ Checklist

- [ ] A aplicação está compilando sem erros.
- [ ] O nome do usuário é salvo e recuperado corretamente.
- [ ] A alteração de senha está funcionando com validação.
- [ ] O AuthGuard continua funcionando nas rotas protegidas.
- [ ] Testes manuais realizados nas páginas afetadas (Perfil, Toolbar, Login).
- [ ] (Opcional) Rodar Lighthouse para verificar performance/acessibilidade.

---

## 🔍 Como testar

1. Faça login no app.
2. Acesse a página de Perfil no menu.
3. Edite o nome e salve.
4. Alterne entre páginas e verifique se o nome foi atualizado.
5. Faça alteração de senha (precisa digitar a senha atual).
6. Logout e login novamente para validar persistência.

---

## 📝 Observações

- O upload de fotos será implementado futuramente após habilitação do Firebase Storage.
- As regras de segurança do Firestore estão aplicadas apenas à coleção `usuarios`.

---

## 🎥 Prévia (Screenshots ou GIFs)
<!-- Inclua aqui prints ou pequenos GIFs da funcionalidade funcionando -->

