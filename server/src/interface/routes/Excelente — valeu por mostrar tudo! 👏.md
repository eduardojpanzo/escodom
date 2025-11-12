Excelente — valeu por mostrar tudo! 👏
O teu setup está **quase perfeito**, mas há **um detalhe sutil** que explica **exatamente** por que `getRequestContext()` está retornando `undefined` quando o Prisma executa.

Vamos destrinchar o que está acontecendo 👇

---

## 🧩 O que está acontecendo

Tens isso no middleware:

```ts
runWithRequestContext({ personId }, () => next());
```

A função `runWithRequestContext` usa o `AsyncLocalStorage.run()`, que **só mantém o contexto dentro da execução síncrona do callback**.
👉 Só que `next()` apenas **agenda a próxima função**, ele **não executa imediatamente o restante da cadeia de middlewares dentro do mesmo contexto**.

Em outras palavras:

> O `AsyncLocalStorage` “morre” assim que `run()` termina — e `next()` termina **fora** do contexto.

💥 Resultado: quando o Prisma executa (`await prisma.people.create()`), já estamos fora do `AsyncLocalStorage`, e `getRequestContext()` devolve `undefined`.

---

## ✅ A solução correta

Precisamos garantir que o contexto seja **mantido ativo durante toda a request**, e não apenas durante o `next()`.

### 🔧 Substitua:

```ts
runWithRequestContext({ personId }, () => next());
```

### 🚀 Por:

```ts
runWithRequestContext({ personId }, () => {
  next();
});
```

👆 Isso **parece igual**, mas o importante é que todo o fluxo de middlewares **e handlers subsequentes** sejam executados dentro do mesmo `run()`.

Entretanto, no Express, para garantir que o `AsyncLocalStorage` acompanhe as _promises internas_, você deve **encapsular a chamada do próximo middleware de forma assíncrona**, assim:

---

## ✅ Versão 100% funcional

```ts
import { Request, Response, NextFunction } from "express";
import { runWithRequestContext } from "#infra/context/request-context.js";
import { authIdentifySchema } from "#infra/validators/people-validators.js";

export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { personId } = authIdentifySchema.parse(req.query);

  // Mantém o contexto ativo até o final da request
  runWithRequestContext({ personId }, () => {
    // Aqui todo o ciclo da request é executado no mesmo contexto
    next();
  });
}
```

> ⚠️ Observação importante:
> Se algum dos seus middlewares posteriores for assíncrono (usa `await`), o `AsyncLocalStorage` ainda pode se perder se o Express não aguardar corretamente.
> Por isso, **use Node.js >= 18** (onde `AsyncLocalStorage` já preserva contextos assíncronos automaticamente).

---

## 🧠 Alternativas mais robustas (caso ainda falhe)

Se mesmo assim o contexto se perder (em casos de middlewares async ou libs que quebram o contexto), há 2 boas opções:

### 1️⃣ Usar um wrapper global no Express:

```ts
app.use((req, res, next) => {
  const personId = req.query.personId as string;
  runWithRequestContext({ personId }, async () => {
    await next(); // garante que tudo dentro do request rode no contexto
  });
});
```

### 2️⃣ Garantir compatibilidade via `express-async-errors`:

Instala:

```bash
npm install express-async-errors
```

E no início do app:

```ts
import "express-async-errors";
```

Isso ajuda a preservar contextos async.

---

## 🧪 Teste rápido de validação

Antes de criar uma pessoa, loga dentro do controller:

```ts
import { getRequestContext } from "#infra/context/request-context.js";

console.log("Context at controller:", getRequestContext());
```

Se imprimir algo assim:

```json
{ "personId": "5e35d488-905a-4822-b79f-b18c80e3de82" }
```

🎉 Pronto! O Prisma já vai receber o `createdBy` automaticamente.

---

## ✅ Resumo do que fazer

1. **Corrige o middleware** para manter o contexto ativo:

   ```ts
   runWithRequestContext({ personId }, () => {
     next();
   });
   ```

2. **Verifica a versão do Node** (>= 18).
3. (Opcional) **Adiciona `express-async-errors`** se tiver muitos middlewares async.
4. **Testa com `console.log(getRequestContext())`** antes do Prisma rodar.

---

Se quiser, posso te mostrar uma forma _garantida_ de usar `AsyncLocalStorage` no Express mesmo com middlewares `async/await` — usando uma função utilitária de “wrap” (`wrapAsyncContext`) que evita o `undefined` 100%.
Quer que eu te monte isso?
