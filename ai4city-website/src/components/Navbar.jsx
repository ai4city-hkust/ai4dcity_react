import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, LOGO_CONFIG } from '../data/navigation';

export const Navbar = ({ currentPage, setPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';
  
  // 动态背景逻辑：首页未滚动时透明，其他情况白色背景
  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
    isHome && !isScrolled 
      ? 'bg-transparent border-transparent text-white' 
      : 'bg-white border-gray-200 text-black shadow-sm'
  }`;

  const handleNavClick = (id) => {
    setPage(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={navClass}>
      <div className="max-w-[1920px] mx-auto px-6 w-full h-[81px] flex justify-between items-center">
        {/* 实验室 Logo */}
        <div
          className="w-[60px] h-[60px] bg-cover bg-center rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
          style={{ backgroundImage: `url(${LOGO_CONFIG.labLogo})` }}
          onClick={() => handleNavClick('home')}
        />

        {/* 桌面菜单 */}
        <ul className="hidden lg:flex gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <button 
                onClick={() => handleNavClick(link.id)}
                className={`text-lg font-medium hover:opacity-70 capitalize transition-colors ${
                  currentPage === link.id && !isHome ? 'text-blue-600 font-bold' : ''
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* 右侧 Logo 和 移动端触发按钮 */}
        <div className="flex items-center gap-4">
          <a href={LOGO_CONFIG.universityLink} target="_blank" rel="noreferrer" className="hidden sm:block">
            <div
              className="w-[200px] h-[80px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${LOGO_CONFIG.universityLogo})` }}
            />
          </a>
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 移动端菜单面板 */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[81px] left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {NAV_LINKS.map(link => (
            <button 
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left py-3 text-xl font-medium capitalize border-b border-gray-50 last:border-0 ${
                currentPage === link.id ? 'text-blue-600 font-bold' : 'text-gray-800'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
