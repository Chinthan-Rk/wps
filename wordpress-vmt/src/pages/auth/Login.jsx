import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 rounded-lg p-3 mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">WordPress VMT</h1>
          <p className="text-gray-500 mt-2">Security Dashboard</p>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-lg p-4 text-indigo-700 text-sm">
            <p>
              Welcome to the WordPress Vulnerability Management Tool. Click the
              button below to login.
            </p>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Login to Dashboard</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 WordPress VMT. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
