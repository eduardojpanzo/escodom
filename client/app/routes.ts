import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home/page.tsx"),
  ...prefix("auth", [
    index("routes/auth/entrar.tsx"),
    // route("entrar", "routes/auth/entrar.tsx"),
    route("cadastro", "routes/auth/cadastro.tsx"),
  ]),
  ...prefix("dash", [
    layout("routes/dash/layout.tsx", [
      index("routes/dash/painel.tsx"),
      route("monitores", "routes/dash/monitores.tsx"),
      route("alunos", "routes/dash/alunos.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
