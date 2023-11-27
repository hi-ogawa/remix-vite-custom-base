import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  return json({ message: "hi loader" });
};

export default function OtherRoute() {
  const loaderData = useLoaderData();
  return (
    <div>
      OtherRoute: <pre>loaderData = {JSON.stringify(loaderData)}</pre>
    </div>
  );
}
