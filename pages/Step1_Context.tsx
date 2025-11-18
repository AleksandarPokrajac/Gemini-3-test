import React, { useState } from 'react';
import { usePlan } from '../contexts/PlanContext';
import { MessageSquare, Plus, Sparkles, User, Trash2 } from 'lucide-react';
import { generateInterviewQuestions } from '../services/gemini';

export default function Step1_Context() {
  const { plan, addInterview } = usePlan();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form State
  const [partnerName, setPartnerName] = useState('');
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [keyObjectives, setKeyObjectives] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [successFactors, setSuccessFactors] = useState('');
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestions, setAiQuestions] = useState('');

  const handleAiGenerate = async () => {
    if (!role) return alert("Please enter a role first.");
    setAiLoading(true);
    const questions = await generateInterviewQuestions(role, industry);
    setAiQuestions(questions);
    setAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInterview({
      id: Date.now().toString(),
      partnerName,
      role,
      keyObjectives,
      painPoints,
      successFactors
    });
    setIsFormOpen(false);
    // Reset
    setPartnerName('');
    setRole('');
    setKeyObjectives('');
    setPainPoints('');
    setSuccessFactors('');
    setAiQuestions('');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">1. Verify Business Context</h1>
        <p className="text-slate-500 mt-2">Confirm enterprise mission and goals. Align your function's goals with C-level stakeholders.</p>
      </header>

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-700">Stakeholder Interviews</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-[#002060] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-900 transition"
        >
          <Plus size={18} /> Log New Interview
        </button>
      </div>

      {/* List of Interviews */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.interviews.length === 0 && !isFormOpen && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border-dashed border-2 border-slate-200">
            <MessageSquare className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500">No interviews logged yet. Start by talking to your business partners.</p>
          </div>
        )}

        {plan.interviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                  {interview.partnerName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{interview.partnerName}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{interview.role}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Key Objectives</p>
                <p className="text-sm text-slate-700 line-clamp-3">{interview.keyObjectives}</p>
              </div>
               <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Pain Points</p>
                <p className="text-sm text-slate-700 line-clamp-2">{interview.painPoints}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-slate-800">Log Stakeholder Interview</h2>
                <button type="button" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                  Close
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Partner Name</label>
                  <input required className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={partnerName} onChange={e => setPartnerName(e.target.value)} placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role / Title</label>
                  <input required className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={role} onChange={e => setRole(e.target.value)} placeholder="Chief Financial Officer" />
                </div>
              </div>

              {/* AI Generator Section */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600"/> AI Conversation Guide
                  </h3>
                  <button 
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={aiLoading || !role}
                    className="text-xs bg-white text-blue-700 border border-blue-200 px-3 py-1 rounded font-medium hover:bg-blue-50 disabled:opacity-50"
                  >
                    {aiLoading ? 'Generating...' : 'Generate Questions'}
                  </button>
                </div>
                {aiQuestions ? (
                  <div className="prose prose-sm max-h-40 overflow-y-auto text-slate-700 text-sm whitespace-pre-wrap">
                    {aiQuestions}
                  </div>
                ) : (
                  <p className="text-xs text-blue-400 italic">Enter a role above and click generate to get suggested interview questions.</p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">What are their key business objectives (next 2-5 years)?</label>
                  <textarea required rows={3} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={keyObjectives} onChange={e => setKeyObjectives(e.target.value)} placeholder="e.g. Expand into Asian market..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">What are their primary pain points?</label>
                  <textarea rows={2} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={painPoints} onChange={e => setPainPoints(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Key Success Factors</label>
                  <textarea rows={2} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={successFactors} onChange={e => setSuccessFactors(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button type="submit" className="bg-[#002060] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-900 transition">
                  Save Interview Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
