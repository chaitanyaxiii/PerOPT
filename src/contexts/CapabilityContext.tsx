import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface DeviceCapability {
  memory: number; // GB
  cores: number;
  networkQuality: string;
  benchmarkScore: number;
  totalScore: number;
  bucket: 'slow' | 'medium' | 'fast';
  memoryUsage: number; // MB
}

interface CapabilityContextType {
  capability: DeviceCapability | null;
  isSlimMode: boolean;
  refreshCapability: () => void;
}

const CapabilityContext = createContext<CapabilityContextType | undefined>(undefined);

// Micro-benchmark for CPU speed
const runBenchmark = (): number => {
  const start = performance.now();
  let count = 0;
  
  // CPU-intensive loop
  for (let i = 0; i < 1000000; i++) {
    count += Math.sqrt(i) * Math.random();
  }
  
  // RAF test
  const rafStart = performance.now();
  requestAnimationFrame(() => {});
  const rafEnd = performance.now();
  
  const totalTime = performance.now() - start;
  const rafTime = rafEnd - rafStart;
  
  // Lower is better, normalize to 0-100 scale (inverted)
  const score = Math.max(0, Math.min(100, 100 - (totalTime / 2)));
  
  return Math.round(score);
};

// Calculate capability scores
const calculateCapability = (): DeviceCapability => {
  // Get device memory (in GB)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Get CPU cores
  const cores = navigator.hardwareConcurrency || 4;
  
  // Get network quality
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const networkQuality = connection?.effectiveType || '4g';
  
  // Run benchmark
  const benchmarkScore = runBenchmark();
  
  // Calculate individual scores
  const memoryScore = memory <= 2 ? 20 : memory <= 4 ? 40 : memory <= 6 ? 80 : 100;
  const coreScore = cores <= 2 ? 20 : cores <= 4 ? 40 : cores <= 6 ? 80 : 100;
  const networkScore = networkQuality === 'slow-2g' || networkQuality === '2g' ? 20 
    : networkQuality === '3g' ? 40 
    : networkQuality === '4g' ? 80 
    : 100;
  
  // Weighted total score
  const totalScore = Math.round(
    benchmarkScore * 0.30 +
    memoryScore * 0.30 +
    coreScore * 0.20 +
    networkScore * 0.20
  );
  
  // Determine bucket
  const bucket = totalScore <= 70 ? 'slow' : totalScore <= 90 ? 'medium' : 'fast';
  
  // Get memory usage
  const memoryUsage = (performance as any).memory?.usedJSHeapSize 
    ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) 
    : 0;
  
  return {
    memory,
    cores,
    networkQuality,
    benchmarkScore,
    totalScore,
    bucket,
    memoryUsage
  };
};

export const CapabilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [capability, setCapability] = useState<DeviceCapability | null>(null);
  
  const refreshCapability = () => {
    const cap = calculateCapability();
    setCapability(cap);
    
    // Apply slim mode class to body if needed
    if (cap.bucket === 'slow') {
      document.body.classList.add('slim-mode');
    } else {
      document.body.classList.remove('slim-mode');
    }
    
    // Store capability in localStorage for server-side detection
    localStorage.setItem('deviceCapability', JSON.stringify(cap));
  };
  
  useEffect(() => {
    // Initial capability detection
    refreshCapability();
    
    // Refresh every 30 seconds
    const interval = setInterval(refreshCapability, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const isSlimMode = capability?.bucket === 'slow';
  
  return (
    <CapabilityContext.Provider value={{ capability, isSlimMode, refreshCapability }}>
      {children}
    </CapabilityContext.Provider>
  );
};

export const useCapability = () => {
  const context = useContext(CapabilityContext);
  if (context === undefined) {
    throw new Error('useCapability must be used within a CapabilityProvider');
  }
  return context;
};
