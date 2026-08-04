"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AnimationContextType {
  shouldAnimate: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  shouldAnimate: true,
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("vintax_visited");
    if (hasVisited) {
      setShouldAnimate(false);
    } else {
      sessionStorage.setItem("vintax_visited", "true");
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimationContext.Provider value={{ shouldAnimate }}>
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => useContext(AnimationContext);
