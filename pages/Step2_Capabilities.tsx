import React from 'react';
import { usePlan } from '../contexts/PlanContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

export default function Step2_Capabilities() {
  const { plan, updateCapability } = usePlan();

  // Transform data for chart
  const chartData = plan.capabilities.map(c => ({
    subject: c.name,
    A: c.currentMaturity,
    B: c.targetMaturity,
    fullMark: 5,
  }));

  const handleMaturityChange = (id: string, field: 'currentMaturity' | 'targetMaturity', value: number) => {
    const cap = plan.capabilities.find(c => c.id === id);
    if (cap) {
      updateCapability({ ...cap, [field]: value });
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">2. Assess Function Capabilities</h1>
        <p className="text-slate-500 mt-2">Determine how well-positioned your function is to deliver on strategy. Assess current vs target maturity.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Assessment Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Maturity Assessment</h2>
          <div className="space-y-6">
            {plan.capabilities.map((cap) => (
              <div key={cap.id} className="pb-6 border-b last:border-0">
                <div className="flex justify-between mb-2">
                  <label className="font-medium text-slate-700">{cap.name}</label>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    cap.importance === 'High' ? 'bg-red-100 text-red-700' : 
                    cap.importance === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {cap.importance} Priority
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Current</span>
                      <span>{cap.currentMaturity}/5</span>
                    </div>
                    <input 
                      type="range" min="1" max="5" step="1"
                      value={cap.currentMaturity}
                      onChange={(e) => handleMaturityChange(cap.id, 'currentMaturity', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Target</span>
                      <span>{cap.targetMaturity}/5</span>
                    </div>
                    <input 
                      type="range" min="1" max="5" step="1"
                      value={cap.targetMaturity}
                      onChange={(e) => handleMaturityChange(cap.id, 'targetMaturity', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Capability Gap Analysis</h2>
          <div className="flex-1 w-full min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Current Maturity" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                <Radar name="Target Maturity" dataKey="B" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-bold text-blue-900 mb-2">Analysis</h3>
            <p className="text-sm text-blue-800">
              The largest gaps typically require the most investment. Focus your budget on "High Priority" capabilities with large maturity gaps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
