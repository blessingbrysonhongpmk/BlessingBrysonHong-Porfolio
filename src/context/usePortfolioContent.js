import { useContext } from 'react';
import { PortfolioContext } from './PortfolioContextInstance';

export function usePortfolioContent() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolioContent must be used within a PortfolioProvider');
  }
  return ctx;
}
