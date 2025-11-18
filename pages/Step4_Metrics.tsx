import React, { useState } from 'react';
import { usePlan } from '../contexts/PlanContext';
import { Trash2, Plus, Target, TrendingUp } from 'lucide-react';
import MetricModal from '../components/MetricModal';

export default function Step4_Metrics() {
  const { plan, removeMetric, addMetric } = usePlan();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<{id: string, name: string} | null>(null);

  // Extract unique goals from interviews (simplified logic for demo)
  // In a real app, you might normalize this data better.
  const goals = plan.interviews.length > 0 
    ? plan.interviews.map(i => ({ id: i.id, text: i.keyObjectives })) 
    : [{ id: 'default', text: 'Increase Operational Efficiency' }];

  const openAddMetric = (goalId: string, goalText: string) => {
    setSelectedGoal({ id: goalId, name: goalText });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">4. Measure Progress</h1>
        <p className="text-slate-500 mt-2">Select SMART metrics that demonstrate progress against commitments.</p>
      </header>

      <div className="grid gap-6">
        {goals.map((goal, index) => {
          // Filter metrics for this goal
          // Note: In this simple implementation, we just link by ID. 
          // If multiple interviews have same ID, it's a simplistic map.
          const goalMetrics = plan.metrics.filter(m => m.goalId === goal.id);

          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Target size={18} className="text-blue-600" /> Goal / Objective
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{goal.text}</p>
                </div>
                <button 
                  onClick={() => openAddMetric(goal.id, goal.text)}
                  className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 flex items-center gap-1 transition"
                >
                  <Plus size={14} /> Add Metric
                </button>
              </div>
              
              <div className="p-4">
                {goalMetrics.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No metrics defined yet.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {goalMetrics.map(metric => (
                      <div key={metric.id} className="p-3 border rounded-lg bg-white hover:border-blue-300 transition group relative">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp size={16} className="text-green-500" />
                          <span className="font-medium text-sm text-slate-800">{metric.name}</span>
                        </div>
                        <div className="text-xs text-slate-500 space-y-1">
                           <div className="flex justify-between">
                             <span>Baseline:</span> <span className="font-mono text-slate-700">{metric.baseline || 'N/A'}</span>
                           </div>
                           <div className="flex justify-between">
                             <span>Target:</span> <span className="font-mono font-bold text-blue-600">{metric.target}</span>
                           </div>
                        </div>
                        <button 
                          onClick={() => removeMetric(metric.id)}
                          className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MetricModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdd={addMetric}
        goalName={selectedGoal?.name || ''}
        goalId={selectedGoal?.id || ''}
      />
    </div>
  );
}
