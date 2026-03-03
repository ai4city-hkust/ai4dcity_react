import React, { useState } from 'react';
import { Twitter, Linkedin, Github, ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import './index.css';
import { TeamPage } from './components/TeamPage';
import { TEAM_DATA } from './data/team';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // 页面内容路由逻辑
  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return (
          <section className="relative h-screen bg-gray-900 flex items-center justify-center text-white text-center">
            <div className="z-10 px-6">
              <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">AI4CITY LAB</h1>
              <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                Pioneering AI-based processing strategies for sustainable urban development.
              </p>
              <div className="mt-10 flex gap-4 justify-center">
                <button 
                  onClick={() => setCurrentPage('team')}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  Our People
                </button>
                <button 
                  onClick={() => setCurrentPage('research')}
                  className="border border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* 这里的背景未来会换成 3drebuild.mp4 */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </section>
        );
      case 'team':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            
            <div>
               <TeamPage />
            </div>
            
          </div>
        );
      default:
        return (
          <div className="pt-32 px-6 md:px-20 min-h-screen max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold capitalize mb-6">{currentPage} Page</h1>
            <div className="inline-block p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-400">Section Under Construction</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-blue-100">
      {/* 引用 Navbar 组件 */}
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      {/* 页面内容区域 */}
      <main className="transition-opacity duration-300">
        {renderContent()}
      </main>

      {/* 基础 Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">AI4CITY LAB</h3>
            <p className="text-gray-500 mt-2">HKUST (Guangzhou) Society Hub</p>
          </div>
          <div className="flex gap-6">
            <Twitter className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Linkedin className="text-gray-400 hover:text-blue-700 cursor-pointer transition-colors" />
            <Github className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="text-center mt-12 text-sm text-gray-400">
          © 2026 AI4City Lab. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
}