import React from 'react';
import { motion } from 'framer-motion';

const SettingsView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your profile and preferences.
        </p>
      </header>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Settings */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Profile Settings
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Aditya"
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="aditya@example.com"
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Save Changes
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Security
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Two-Factor Authentication
              </span>
              <button className="px-4 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Change Password
              </span>
              <button className="px-4 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                Update
              </button>
            </div>
          </div>
        </div>

      </section>
    </motion.div>
  );
};

export default SettingsView;