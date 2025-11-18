import React, { useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';
import { generateSmartMetrics } from '../services/gemini';
import { Metric } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (metric: Metric) => void;
  goalName: string;
  goalId: string;
}

export default function MetricModal({ isOpen, onClose, onAdd, goalName, goalId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [baseline, setBaseline] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!goalName) return;
    setIsLoading(true);
    const result = await generateSmartMetrics(goalName);
    try {
      const parsed = JSON.parse(result);
      setSuggestions(parsed);
    } catch (e) {
      console.error("Failed to parse AI response", e);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      goalId,
      name,
      target,
      baseline
    });
    onClose();
    setName('');
    setTarget('');
    setBaseline('');
    setSuggestions([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-lg text-slate-800">Add Metric for: {goalName}</h3>
          <button onClick={onClose}><X className="text-slate-400 hover:text-slate-600"/></button>
        </div>
        
        <div className="p-6">
          {/* AI Section */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600" /> AI Suggestions
              </h4>
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Thinking...' : 'Suggest Metrics'}
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {suggestions.map((s, i) => (
                  <div key={i} className="text-xs p-2 bg-white rounded border border-blue-100 cursor-pointer hover:border-blue-300"
                       onClick={() => { setName(s.metric); setTarget(s.target); }}>
                    <p className="font-medium text-slate-700">{s.metric}</p>
                    <p className="text-slate-500">Target: {s.target}</p>
                  </div>
                ))}
              </div>
            )}
             {suggestions.length === 0 && !isLoading && (
                 <p className="text-xs text-blue-400 italic">Click suggest to get SMART metrics based on your goal.</p>
             )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Metric Name</label>
              <input 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., Customer Churn Rate"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Baseline</label>
                <input 
                  value={baseline}
                  onChange={(e) => setBaseline(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Current value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target</label>
                <input 
                  required
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Goal value"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#002060] text-white py-2 rounded-lg font-medium hover:bg-blue-900 flex justify-center items-center gap-2">
              <Plus size={18} /> Add Metric
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
