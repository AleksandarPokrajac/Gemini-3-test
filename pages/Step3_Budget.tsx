import React, { useState } from 'react';
import { usePlan } from '../contexts/PlanContext';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import { Initiative } from '../types';

export default function Step3_Budget() {
  const { plan, addInitiative, removeInitiative } = usePlan();
  
  // Form State
  const [name, setName] = useState('');
  const [val, setVal] = useState(5);
  const [cost, setCost] = useState(5);
  const [quarter, setQuarter] = useState<'Q1'|'Q2'|'Q3'|'Q4'>('Q1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInitiative({
      id: Date.now().toString(),
      name,
      description: '',
      strategicValue: val,
      costEffort: cost,
      status: 'Proposed',
      quarter
    });
    setName('');
    setVal(5);
    setCost(5);
  };

  return (
    <div className="space-y-8">
       <header>
        <h1 className="text-2xl font-bold text-slate-800">3. Strategically Manage Budgets</h1>
        <p className="text-slate-500 mt-2">Prioritize cost and investment decisions. Map initiatives by Value vs Cost/Effort.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add Initiative</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Initiative Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} 
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. AI Customer Support" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">Strategic Value (1-10)</label>
                <span className="text-sm font-bold text-blue-600">{val}</span>
              </div>
              <input type="range" min="1" max="10" value={val} onChange={e => setVal(parseInt(e.target.value))} 
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                 <label className="block text-sm font-medium text-slate-700">Cost / Effort (1-10)</label>
                 <span className="text-sm font-bold text-red-500">{cost}</span>
              </div>
              <input type="range" min="1" max="10" value={cost} onChange={e => setCost(parseInt(e.target.value))}
                 className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Target Quarter</label>
               <select value={quarter} onChange={e => setQuarter(e.target.value as any)}
                className="w-full border rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                 <option value="Q1">Q1</option>
                 <option value="Q2">Q2</option>
                 <option value="Q3">Q3</option>
                 <option value="Q4">Q4</option>
               </select>
            </div>

            <button type="submit" className="w-full bg-[#002060] text-white py-2.5 rounded-lg font-medium hover:bg-blue-900 transition flex justify-center items-center gap-2">
              <Plus size={18} /> Add Initiative
            </button>
          </form>
          
          <div className="mt-8">
             <h3 className="text-sm font-bold text-slate-700 mb-3">Prioritized List</h3>
             <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {plan.initiatives.sort((a,b) => b.strategicValue - a.strategicValue).map(i => (
                  <div key={i.id} className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100 text-sm group">
                    <div>
                      <p className="font-medium text-slate-800">{i.name}</p>
                      <p className="text-xs text-slate-500">Val: {i.strategicValue} | Cost: {i.costEffort} | {i.quarter}</p>
                    </div>
                    <button onClick={() => removeInitiative(i.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Matrix Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Cost Optimization Matrix</h2>
          <p className="text-sm text-slate-500 mb-6">Identify "Quick Wins" (High Value, Low Cost) vs "Money Pits" (Low Value, High Cost).</p>
          
          <div className="flex-1 w-full min-h-[500px] relative">
            {/* Quadrant Labels Background */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
               <div className="border-r border-b border-dashed border-slate-200 p-4 flex items-start justify-end text-xs font-bold text-slate-300 uppercase">Low Value / Low Cost</div>
               <div className="border-b border-dashed border-slate-200 p-4 flex items-start justify-start text-xs font-bold text-green-600/20 uppercase">Quick Wins (High Value / Low Cost)</div>
               <div className="border-r border-dashed border-slate-200 p-4 flex items-end justify-end text-xs font-bold text-red-600/20 uppercase">Money Pits (Low Value / High Cost)</div>
               <div className="p-4 flex items-end justify-start text-xs font-bold text-blue-600/20 uppercase">Strategic Bets (High Value / High Cost)</div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="costEffort" name="Cost/Effort" domain={[0, 10]} label={{ value: 'Cost & Effort ->', position: 'bottom', offset: 0 }} />
                <YAxis type="number" dataKey="strategicValue" name="Strategic Value" domain={[0, 10]} label={{ value: 'Strategic Value ->', angle: -90, position: 'left' }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 shadow-lg rounded border border-slate-100 text-xs">
                        <p className="font-bold">{data.name}</p>
                        <p>Value: {data.strategicValue}</p>
                        <p>Cost: {data.costEffort}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Scatter name="Initiatives" data={plan.initiatives} fill="#2563eb">
                   {/* We can't easily put custom labels inside Scatter in this version of Recharts without custom shape, relying on Tooltip */}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
