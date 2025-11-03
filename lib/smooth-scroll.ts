// Utility function for smooth scrolling to elements
export function smoothScrollTo(target: string, offset = 0) {
  const element = document.querySelector(target);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// Hook for handling smooth scroll navigation
export function useSmoothScroll() {
  const scrollToSection = (target: string, offset = 0) => {
    smoothScrollTo(target, offset);
  };

  return { scrollToSection };
}