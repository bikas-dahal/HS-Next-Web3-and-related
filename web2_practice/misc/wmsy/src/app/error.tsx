'use client';

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center rounded-md bg-gray-100 text-gray-900 px-6">
      <div className="animate-pulse mb-6">
        <AlertTriangle size={64} className="text-red-500" />
      </div>
      <h1 className="text-4xl font-bold mb-2 opacity-0 animate-fade-in">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-800 mb-6 text-center opacity-0 animate-fade-in delay-100">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button
        variant="secondary"
        size="lg"
        className="opacity-0 animate-fade-in delay-200 bg-red-600 hover:bg-red-700 text-white border-none"
        asChild
      >
        <Link href={`/`}>Go Back Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
