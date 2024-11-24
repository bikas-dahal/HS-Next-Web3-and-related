'use client';

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Loader2 className="w-12 h-12 text-gray-600 animate-spin" />
    </div>
  );
};

export default Loading;
