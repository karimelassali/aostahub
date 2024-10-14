'use client'

import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from "@/utils/supabase/client";


export default function NotificationModalInfo({notificationText,receiver}) {
  const [dimmis, setDimmis] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
    const supabase = createClient();


  async function cleanNotifications() {
      const { data, error } = await supabase.from('notifications').delete().eq('receiver', receiver);
      if (data) {
        return;
      }
    }
  useEffect(() => {
    // Simulate a new notification after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer);
  }, [])

  return (
    (<AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 z-50 max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 flex items-start">
            <div className="flex-shrink-0">
              <div
                className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="ml-4 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New Notification
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {notificationText}
              </p>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={() => setIsVisible(false)}
                  className="bg-accent hover:bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded">
                  View
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-xs font-semibold py-2 px-4 rounded">
                  Dismiss
                </button>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => { setIsVisible(false);cleanNotifications(); }}
                className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>)
  );
}