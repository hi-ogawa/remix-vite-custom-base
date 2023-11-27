import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import "../other.css";

export const loader: LoaderFunction = () => {
  return json({ message: "hi loader" });
};

export default function OtherRoute() {
  const loaderData = useLoaderData();
  return (
    <div>
      <div>OtherRoute</div>
      <pre>loaderData? {JSON.stringify(loaderData)}</pre>
      <span className="test-css">No FOUC?</span>
    </div>
  );
}
