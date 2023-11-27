import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = ({ request }) => {
  if (request.url.includes("?test")) {
    throw redirect("/other");
  }
  return null;
};

export default function Route() {
  return (
    <div>
      <ul>
        <li>
          <Link to="?test">trigger redirect to /other</Link>
        </li>
        <li>
          <Link to="?test" target="_blank">
            server redirect in new tab
          </Link>
        </li>
      </ul>
    </div>
  );
}
