### Implementação de Autenticação e Autorização em React com Router v6/v7 e Vite

Vou assumir que você está usando React Router v6 (pois a v7 ainda não foi lançada oficialmente até o momento; se for uma beta, os conceitos são semelhantes). A estratégia que você descreveu é comum para apps SPAs: armazenar o token JWT em um cookie (para simplicidade e segurança básica, use `HttpOnly` se possível via backend, mas como é frontend, vamos com cookie acessível). Depois, enviar via header `Authorization: Bearer <token>` em todas as requisições.

Vou guiar passo a passo, com código pronto para copiar/colar. Usei `axios` para as requisições (instale com `npm install axios js-cookie`), pois facilita interceptors. Se preferir `fetch`, posso adaptar.

#### 1. **Instalação de Dependências**

No terminal do seu projeto Vite:

```
npm install axios js-cookie
```

#### 2. **Configuração do Cookie para o Token**

Use `js-cookie` para setar e ler o cookie. Crie um arquivo `src/utils/auth.js` para gerenciar isso:

```javascript
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token"; // Nome do cookie
const EXPIRY_DAYS = 7; // Expira em 7 dias (ajuste conforme o backend)

export const setAuthToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: EXPIRY_DAYS,
    secure: true,
    sameSite: "strict",
  });
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
```

- **Por quê cookie?** É persistente entre sessões, enviado automaticamente em requisições same-origin. Para cross-origin, configure CORS no backend.
- **Segurança:** Use `secure: true` (HTTPS) e `sameSite: 'strict'` para mitigar CSRF. Idealmente, torne HttpOnly no backend.

#### 3. **Handler de Login**

No seu componente de login (ex: `src/components/Login.jsx`), faça a requisição e set o token:

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/auth";
import apiClient from "../services/apiClient"; // Vamos criar isso no passo 4

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/login", { email, password }); // Ajuste o endpoint
      if (response.data.success) {
        setAuthToken(response.data.data.token);
        navigate("/dashboard"); // Redireciona para rota protegida
      }
    } catch (err) {
      setError("Login falhou!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
```

#### 4. **Cliente de API com Bearer Token Automático**

Crie `src/services/apiClient.js` para gerenciar todas as requisições. Use interceptor para adicionar o header do cookie:

```javascript
import axios from "axios";
import { getAuthToken } from "../utils/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api", // Ajuste para o seu backend
  timeout: 5000,
});

// Interceptor de request: Adiciona Bearer token se existir
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: Remove token se 401 (unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove token e redireciona para login
      removeAuthToken();
      window.location.href = "/login"; // Ou use navigate se em contexto Router
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

- **Como funciona?** Toda requisição via `apiClient` (ex: `apiClient.get('/users')`) pega o token do cookie e adiciona no header. Se o backend retornar 401, limpa o cookie.

#### 5. **Rotas Protegidas com React Router**

Use o Data Router (v6+). Crie `src/router.jsx` para definir rotas com loaders que verificam auth:

```jsx
import { createBrowserRouter } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // Exemplo de página protegida
import ErrorPage from "./components/ErrorPage";

// Loader para rotas protegidas: Verifica auth, senão redireciona
const protectedLoader = () => {
  if (!isAuthenticated()) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Rota pública
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: protectedLoader, // Protege a rota
    errorElement: <ErrorPage />,
  },
  // Adicione mais rotas protegidas com o mesmo loader
]);

export default router;
```

No `src/main.jsx` (Vite), use o router:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

- **Exemplo de Dashboard (protegido):**

```jsx
import React from "react";
import apiClient from "../services/apiClient";

const Dashboard = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    apiClient
      .get("/profile") // Requisição automática com Bearer
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <div>{data ? <p>Bem-vindo!</p> : <p>Carregando...</p>}</div>;
};

export default Dashboard;
```

#### 6. **Logout**

Adicione um botão de logout em componentes protegidos:

```jsx
import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "../utils/auth";

const handleLogout = () => {
  removeAuthToken();
  navigate("/login");
};
```

#### 7. **Dicas Extras**

- **Autorização (não só auth):** No backend, valide o token e roles/claims. No frontend, use loaders/actions para checar permissões específicas (ex: `if (!user.role === 'admin') throw redirect('/unauthorized')`).
- **Ambiente Dev:** Teste com `http://localhost`. Em prod, use HTTPS para cookies secure.
- **Erros Comuns:**
  - CORS: Configure no backend para permitir `credentials: 'include'` se cross-origin.
  - Token Expiry: Adicione refresh token se necessário (expanda o interceptor).
- **Se usar fetch nativo:** Crie um wrapper similar, mas sem interceptors (adicione header manualmente em cada call).

Se precisar de ajustes (ex: sem axios, ou para v7 específica), ou código para um arquivo em particular, me avise!
