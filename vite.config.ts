import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from "remix-flat-routes";

export default defineConfig({
  clearScreen: false,
  plugins: [
    remix({
      publicPath: "/mybase/",
      routes: async (defineRoutes) =>
        flatRoutes("routes", defineRoutes, {
          // "/mybase/" breaks?
          basePath: "/mybase",
        }),
    }),
    tsconfigPaths(),
  ],
});
