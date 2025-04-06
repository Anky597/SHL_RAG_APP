
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-shl-gray rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-shl-blue">404</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 max-w-md mb-8">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          <div className="space-x-4">
            <Button asChild variant="default" className="btn-primary">
              <Link to="/">
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
