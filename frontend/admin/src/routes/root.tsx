import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";

export const Root = () => {
  return <div className="h-screen">{/* Root */}</div>;
};

export function RootErrorBoundary() {
  const error = useRouteError() as unknown;

  if (isRouteErrorResponse(error)) {
    return (
      <div className="mx-auto max-w-sm p-6 py-12 text-center lg:py-24">
        <div className="mb-6 flex flex-col gap-3 text-gray-600">
          <h1 className="text-7xl font-semibold md:text-9xl">{error.status}</h1>
          <h2 className="text-lg font-medium md:text-2xl">
            {error.statusText}
          </h2>
        </div>
        <p className="font-light md:text-lg">{error.data}</p>
        <Link
          className="mt-6 flex cursor-pointer items-center justify-center gap-1 font-semibold underline"
          to="/"
        >
          Home <FaExternalLinkAlt />
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-gray-900">
        <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-red-500">
            Something went wrong
          </h1>
          <p className="mb-6 text-lg text-gray-700">{error.message}</p>

          <div className="overflow-x-auto rounded-lg bg-gray-100 p-4">
            <p className="mb-2 font-medium text-gray-800">Stack trace:</p>
            <pre className="text-sm break-words whitespace-pre-wrap text-gray-700">
              {error.stack}
            </pre>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-gray-900">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-red-600">
            Unknown Error
          </h1>
          <p className="mb-6 text-gray-700">
            An unexpected issue occurred. Please try refreshing the page or come
            back later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}
