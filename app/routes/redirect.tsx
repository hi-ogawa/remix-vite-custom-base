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
      <Link to="?test">trigger redirect to /other</Link>
    </div>
  );
}
