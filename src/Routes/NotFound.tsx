import { Link } from 'react-router-dom';

function NotFound () {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl m-0">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/"
        className="text-blue-500 no-underline mt-4"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
