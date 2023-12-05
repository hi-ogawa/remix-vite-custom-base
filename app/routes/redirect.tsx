import { LoaderFunction, redirect, redirectDocument } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = ({ request }) => {
  if (request.url.includes("?out-of-base")) {
    // need to specify full url even if it's under the same domain
    const url = new URL(request.url);
    throw redirectDocument(url.origin + "/out-of-base");

    // or actually this seems to work
    // throw redirectDocument("/../out-of-base");
  }
  if (request.url.includes("?test")) {
    throw redirect("/other");
  }
  return null;
};

export default function Route() {
  return (
    <div>
      <h4>Loader redirect examples</h4>
      <ul>
        <li>
          <Link to="?test">trigger redirect to /other</Link>
        </li>
        <li>
          <Link to="?test" target="_blank">
            server redirect in new tab
          </Link>
        </li>
        <li>
          <Link to="?out-of-base">
            trigger <code>redirectDocument</code> to outside of basename (test
            it on <code>pnpm dev:custom</code>)
          </Link>
        </li>
      </ul>
    </div>
  );
}
