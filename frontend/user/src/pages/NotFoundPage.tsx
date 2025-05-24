import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-primary text-9xl font-bold">404</h1>
      <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
        Page not found
      </h2>
      <p className="mt-2 text-gray-600">
        The link you followed may be broken or the page may have been removed.
      </p>
      <Link
        to="/"
        className="text-primary mt-6 font-semibold underline hover:no-underline"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFoundPage;
