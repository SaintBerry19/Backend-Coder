import HomePage from "./HomePage.tsx";
import { Application, Context, Router } from "./deps.ts";

const app = new Application();
const router = new Router();
let lista: any[] = [];
router.get("/", (ctx: Context) => {
  ctx.response.type = ".html";
  ctx.response.body = HomePage(lista);
});

router.post("/", async (ctx: Context) => {
  const body = await ctx.request.body();
  const value = await body.value
  const newElement = await value.get("color")
  lista.push(newElement);
  ctx.response.redirect("/");
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx) => {
    ctx.response.status = 404;
    ctx.response.body = "Not Found";
  });

console.log("Server runnig in http://localhost:8080");

await app.listen({ port: 8080 });
