import { createRequestHandler } from "@remix-run/express";
import express from "express";

const viteDevServer =
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
  res.end(`Remix app is at <a href="/mybase/">/mybase/</a>`);
});

// example app outside of remix basename
rootApp.get("/out-of-base", (_req, res) => {
  res.end("This is outside of Remix app");
});

// remix app under basename
const remixApp = express.Router();
rootApp.use("/mybase", remixApp);

// handle asset requests
if (viteDevServer) {
  remixApp.use(viteDevServer.middlewares);
} else {
  remixApp.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  remixApp.use(express.static("build/client", { maxAge: "1h" }));
}

// handle SSR requests
remixApp.all(
  "*",
  createRequestHandler({
    build: viteDevServer
      ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
      : await import("./build/server/index.js"),
  })
);

const port = 3000;
rootApp.listen(port, () => console.log("http://localhost:" + port));
