"use client";

import { Moon, SunDim } from "lucide-react";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ANIMATION_DURATION, EASING } from "@/lib/animations";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: ANIMATION_DURATION.SLOW,
        easing: "cubic-bezier(0.3, 0, 0, 1)", // Standard easing for theme transitions
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };
  
  return (
    <motion.button 
      ref={buttonRef} 
      onClick={changeTheme} 
      className={cn("relative", className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        duration: ANIMATION_DURATION.FAST / 1000
      }}
    >
      <motion.div
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ 
          duration: ANIMATION_DURATION.NORMAL / 1000,
          ease: EASING.SMOOTH
        }}
      >
        {isDarkMode ? (
          <SunDim className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </motion.div>
    </motion.button>
  );
};