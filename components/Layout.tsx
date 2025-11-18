import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart2, 
  PieChart, 
  Target, 
  FileText, 
  Menu, 
  X 
} from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/context', label: '1. Business Context', icon: MessageSquare },
    { path: '/capabilities', label: '2. Assess Capabilities', icon: BarChart2 },
    { path: '/budget', label: '3. Manage Budget', icon: PieChart },
    { path: '/metrics', label: '4. Measure Progress', icon: Target },
    { path: '/strategy', label: '5. Strategic Plan', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#002060] text-white p-4 flex justify-between items-center">
        <span className="font-bold text-lg">StratPlan</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#002060] text-white transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold tracking-tight">StratPlan</h1>
          <p className="text-blue-300 text-xs mt-1">IT Executive Toolkit</p>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#001540]">
          <p className="text-xs text-blue-400 text-center">Based on Gartner Best Practices</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <div className="max-w-7xl mx-auto p-6 md:p-10">
           {children}
        </div>
      </main>
    </div>
  );
}
