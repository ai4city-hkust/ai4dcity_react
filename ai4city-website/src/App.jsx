import React, { useState } from 'react';
import { Twitter, Linkedin, Github, ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
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
          <div className="w-full min-h-screen">
            
            <div>
               <HomePage />
            </div>
            
          </div>
        );
      case 'team':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            
            <div>
               <TeamPage />
            </div>
            
          </div>
        );
      
      case 'about':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            
            <div>
               <AboutPage />
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
      <Footer currentPage={currentPage} setPage={setCurrentPage} />
    </div>
  );
}