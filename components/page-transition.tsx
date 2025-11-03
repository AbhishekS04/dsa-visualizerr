"use client";

import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "@/lib/animations";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={ANIMATION_VARIANTS.slideInUp}
    >
      {children}
    </motion.div>
  );
}