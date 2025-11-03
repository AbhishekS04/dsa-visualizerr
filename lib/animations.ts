// Animation constants for consistent timing and easing across the application
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  SLOWER: 800,
} as const;

export const EASING = {
  // Standard easing curves as cubic-bezier values for Framer Motion
  STANDARD: [0.2, 0, 0, 1],
  STANDARD_ACCELERATE: [0.3, 0, 1, 1],
  STANDARD_DECELERATE: [0, 0, 0, 1],
  EMPHASIZED: [0.2, 0, 0, 1],
  EMPHASIZED_ACCELERATE: [0.3, 0, 0.8, 0.15],
  EMPHASIZED_DECELERATE: [0.05, 0.7, 0.1, 1],
  
  // Custom easing for specific use cases
  BOUNCE: [0.68, -0.55, 0.265, 1.55],
  SMOOTH: [0.16, 1, 0.3, 1],
} as const;

// Predefined animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: ANIMATION_DURATION.NORMAL / 1000,
        ease: EASING.STANDARD 
      }
    }
  },
  
  fadeOut: {
    visible: { opacity: 1 },
    hidden: { 
      opacity: 0,
      transition: { 
        duration: ANIMATION_DURATION.NORMAL / 1000,
        ease: EASING.STANDARD 
      }
    }
  },
  
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: ANIMATION_DURATION.NORMAL / 1000,
        ease: EASING.STANDARD 
      }
    }
  },
  
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: ANIMATION_DURATION.NORMAL / 1000,
        ease: EASING.STANDARD 
      }
    }
  },
  
  slideInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: ANIMATION_DURATION.NORMAL / 1000,
        ease: EASING.STANDARD 
      }
    }
  },
  
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: ANIMATION_DURATION.NORMAL / 1000,
        ease: EASING.SMOOTH 
      }
    }
  },
  
  scaleOut: {
    visible: { opacity: 1, scale: 1 },
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      transition: { 
        duration: ANIMATION_DURATION.NORMAL / 1000,
        ease: EASING.STANDARD 
      }
    }
  }
} as const;

// CSS classes for Tailwind-based animations
export const ANIMATION_CLASSES = {
  transitionFast: `transition-all duration-[${ANIMATION_DURATION.FAST}ms] ease-[cubic-bezier(0.2,0,0,1)]`,
  transitionNormal: `transition-all duration-[${ANIMATION_DURATION.NORMAL}ms] ease-[cubic-bezier(0.2,0,0,1)]`,
  transitionSlow: `transition-all duration-[${ANIMATION_DURATION.SLOW}ms] ease-[cubic-bezier(0.2,0,0,1)]`,
  smoothHover: `transition-all duration-[${ANIMATION_DURATION.NORMAL}ms] ease-[cubic-bezier(0.16,1,0.3,1)]`,
} as const;