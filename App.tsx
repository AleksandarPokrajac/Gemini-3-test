import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PlanProvider } from './contexts/PlanContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Step1_Context from './pages/Step1_Context';
import Step2_Capabilities from './pages/Step2_Capabilities';
import Step3_Budget from './pages/Step3_Budget';
import Step4_Metrics from './pages/Step4_Metrics';
import Step5_Strategy from './pages/Step5_Strategy';

function App() {
  return (
    <PlanProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/context" element={<Step1_Context />} />
            <Route path="/capabilities" element={<Step2_Capabilities />} />
            <Route path="/budget" element={<Step3_Budget />} />
            <Route path="/metrics" element={<Step4_Metrics />} />
            <Route path="/strategy" element={<Step5_Strategy />} />
          </Routes>
        </Layout>
      </Router>
    </PlanProvider>
  );
}

export default App;
