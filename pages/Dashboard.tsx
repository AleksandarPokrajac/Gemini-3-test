import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart2, PieChart, Target, FileText } from 'lucide-react';
import { usePlan } from '../contexts/PlanContext';

export default function Dashboard() {
  const { plan } = usePlan();
  
  const stats = [
    { label: 'Interviews Logged', value: plan.interviews.length },
    { label: 'Initiatives Planned', value: plan.initiatives.length },
    { label: 'Metrics Defined', value: plan.metrics.length },
    { label: 'Avg Maturity', value: (plan.capabilities.reduce((a,b) => a + b.currentMaturity, 0) / plan.capabilities.length).toFixed(1) },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#002060] to-blue-800 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Strategic Planning Toolkit</h1>
        <p className="text-blue-100 max-w-2xl">
          Follow the 5 proven best practices to build an impactful IT strategy. 
          Align with business goals, optimize costs, and measure what matters.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle className="text-green-500" /> Your Planning Journey
          </h2>
          
          <Link to="/context" className="group block bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">1. Verify Business Context</h3>
                <p className="text-sm text-slate-500 mt-1">Interview stakeholders & understand goals.</p>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          <Link to="/capabilities" className="group block bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <BarChart2 className="mt-1 text-slate-400 group-hover:text-blue-500"/>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">2. Assess Capabilities</h3>
                  <p className="text-sm text-slate-500 mt-1">Identify gaps in your IT function.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/budget" className="group block bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <PieChart className="mt-1 text-slate-400 group-hover:text-blue-500"/>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">3. Manage Budgets</h3>
                  <p className="text-sm text-slate-500 mt-1">Prioritize initiatives by value vs cost.</p>
                </div>
              </div>
            </div>
          </Link>

           <Link to="/metrics" className="group block bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <Target className="mt-1 text-slate-400 group-hover:text-blue-500"/>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">4. Measure Progress</h3>
                  <p className="text-sm text-slate-500 mt-1">Define SMART metrics for your goals.</p>
                </div>
              </div>
            </div>
          </Link>

           <Link to="/strategy" className="group block bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 text-slate-400 group-hover:text-blue-500"/>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">5. Document Strategy</h3>
                  <p className="text-sm text-slate-500 mt-1">Generate your one-page strategic plan.</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Column: Quick Tips / Info */}
        <div className="bg-slate-100 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-4">Did you know?</h3>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-600 italic">"68% of CEOs are working on a strategy that integrates human employees and machines to boost productivity."</p>
                    <p className="text-xs text-slate-400 mt-2 text-right">- 2025 CEO Survey</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-600">Top priority is <strong>Growth</strong>. Ensure your IT initiatives clearly map to revenue generation or operational efficiency.</p>
                </div>
                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium mb-2">AI Assistant Ready</p>
                    <p className="text-xs text-blue-600">Look for the "Sparkles" icon in Step 1 and Step 4 to use Gemini AI for brainstorming questions and metrics.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
