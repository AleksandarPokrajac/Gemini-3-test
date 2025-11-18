import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StrategicPlan, DEFAULT_CAPABILITIES, BusinessPartnerInterview, Initiative, Capability, Metric } from '../types';

interface PlanContextType {
  plan: StrategicPlan;
  updatePlan: (updates: Partial<StrategicPlan>) => void;
  addInterview: (interview: BusinessPartnerInterview) => void;
  updateCapability: (capability: Capability) => void;
  addInitiative: (initiative: Initiative) => void;
  removeInitiative: (id: string) => void;
  addMetric: (metric: Metric) => void;
  removeMetric: (id: string) => void;
  addRisk: (risk: string) => void;
  removeRisk: (index: number) => void;
}

const defaultPlan: StrategicPlan = {
  companyName: '',
  interviews: [],
  capabilities: DEFAULT_CAPABILITIES,
  initiatives: [],
  metrics: [],
  risks: []
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<StrategicPlan>(() => {
    const saved = localStorage.getItem('stratPlan');
    return saved ? JSON.parse(saved) : defaultPlan;
  });

  useEffect(() => {
    localStorage.setItem('stratPlan', JSON.stringify(plan));
  }, [plan]);

  const updatePlan = (updates: Partial<StrategicPlan>) => {
    setPlan(prev => ({ ...prev, ...updates }));
  };

  const addInterview = (interview: BusinessPartnerInterview) => {
    setPlan(prev => ({ ...prev, interviews: [...prev.interviews, interview] }));
  };

  const updateCapability = (updatedCap: Capability) => {
    setPlan(prev => ({
      ...prev,
      capabilities: prev.capabilities.map(c => c.id === updatedCap.id ? updatedCap : c)
    }));
  };

  const addInitiative = (initiative: Initiative) => {
    setPlan(prev => ({ ...prev, initiatives: [...prev.initiatives, initiative] }));
  };

  const removeInitiative = (id: string) => {
    setPlan(prev => ({ ...prev, initiatives: prev.initiatives.filter(i => i.id !== id) }));
  };

  const addMetric = (metric: Metric) => {
    setPlan(prev => ({ ...prev, metrics: [...prev.metrics, metric] }));
  };

  const removeMetric = (id: string) => {
    setPlan(prev => ({ ...prev, metrics: prev.metrics.filter(m => m.id !== id) }));
  };

  const addRisk = (risk: string) => {
     setPlan(prev => ({ ...prev, risks: [...prev.risks, risk] }));
  };
  
  const removeRisk = (index: number) => {
     setPlan(prev => ({ ...prev, risks: prev.risks.filter((_, i) => i !== index) }));
  };

  return (
    <PlanContext.Provider value={{ 
      plan, updatePlan, addInterview, updateCapability, 
      addInitiative, removeInitiative, addMetric, removeMetric,
      addRisk, removeRisk 
    }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within a PlanProvider');
  return context;
};
