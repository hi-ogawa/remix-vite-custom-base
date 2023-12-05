import { unstable_viteServerBuildModuleId } from "@remix-run/dev";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";

installGlobals();

const vite =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then(({ createServer }) =>
        createServer({
          server: {
            middlewareMode: true,
          },
        })
      );

const rootApp = express();

rootApp.get("/", (_req, res) => {
  res.setHeader("content-type", "text/html");
  res.end(`Remix app is at <a href="/mybase">/mybase</a>`);
});

// example app outside of remix basename
rootApp.get("/out-of-base", (_req, res) => {
  res.end("This is outside of Remix app");
});

// remix app under basename
const app = express.Router();
rootApp.use("/mybase", app);

// handle asset requests
if (vite) {
  app.use(vite.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}
app.use(express.static("build/client", { maxAge: "1h" }));

// handle SSR requests
app.all(
  "*",
  createRequestHandler({
    build: vite
      ? () => vite.ssrLoadModule(unstable_viteServerBuildModuleId)
      : await import("./build/server/index.js"),
  })
);

const port = 3000;
rootApp.listen(port, () => console.log("http://localhost:" + port));
