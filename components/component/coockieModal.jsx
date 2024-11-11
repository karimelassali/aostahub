"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CoockieModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer);
  }, [])

  return (
    (<AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6">
          <div
            className="bg-accent relative z-50 text-white  rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
            <div className="p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Cookie className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold mb-2">We Dont Use Cookies!</h2>
                <p className="text-sm md:text-base">
                  Relax! Were proud to be one of the first websites that doesnt track you or use any cookies. Your privacy is our priority.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsVisible(false)}
                  className="text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-secondary" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>)
  );
}