import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";

export default function App() {
  const navigate = useNavigate();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h4>Nav</h4>
        <ul>
          <li>
            <Link to="/">/</Link>
          </li>
          <li>
            <Link to="/other">/other</Link>
          </li>
          <li>
            <Link to="/other" prefetch="intent">
              /other (with prefetch)
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/other");
              }}
            >
              useNavigate to /other
            </button>
          </li>
          <li>
            <Link to="/redirect">/redirect</Link>
          </li>
        </ul>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
