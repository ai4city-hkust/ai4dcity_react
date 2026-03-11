import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, LOGO_CONFIG } from '../data/navigation';

export const Navbar = ({ currentPage, setPage}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 降低阈值，确保滚动瞬间就能触发颜色变化
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 核心逻辑：只有在首页且未滚动时，导航栏才显示为透明
  const isHome = currentPage === 'home';
  const shouldBeTransparent = isHome && !isScrolled;

  /**
   * 样式说明：
   * 1. 透明状态下：无背景，无边框，文字为纯白 (text-white)
   * 2. 滚动或非首页状态下：白背景 (bg-white/95)，带模糊感 (backdrop-blur)，文字为黑 (text-black)
   */
  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
    shouldBeTransparent 
      ? 'bg-transparent border-transparent text-white' 
      : 'bg-white/95 backdrop-blur-md border-gray-200 text-black shadow-sm'
  }`;

  const handleNavClick = (id) => {
    setPage(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={navClass}>
      <div className="max-w-[1920px] mx-auto px-6 w-full h-[81px] flex justify-between items-center">
        {/* 实验室 Logo */}
        <div
          className={`w-[60px] h-[60px] bg-cover bg-center rounded-full cursor-pointer hover:opacity-80 transition-all duration-300 shadow-sm ${
            shouldBeTransparent ? 'ring-2 ring-white/20' : ''
          }`}
          style={{ backgroundImage: "url('/images/frontPage/logo.png')" }}
          onClick={() => handleNavClick('home')}
        />

        {/* 桌面端菜单 */}
        <ul className="max-w-7xl hidden lg:flex gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <button 
                onClick={() => handleNavClick(link.id)}
                className={`text-lg font-medium hover:opacity-70 capitalize transition-colors ${
                  !shouldBeTransparent && currentPage === link.id ? 'text-blue-600 font-bold' : ''
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* 学校 Logo 区域 */}
        <div className="flex items-center gap-4">
          <a href="https://www.hkust-gz.edu.cn/" target="_blank" rel="noreferrer" className="hidden sm:block">
            <div
              className={`w-[200px] h-[80px] bg-contain bg-no-repeat bg-center transition-all duration-500 ${
                shouldBeTransparent ? 'brightness-0 invert' : '' 
              }`}
              style={{ backgroundImage: "url('/images/frontPage/logo-e-black-2x.png')" }}
            />
          </a>
          
          {/* 移动端汉堡菜单按钮 */}
          <button 
            className="lg:hidden p-2 rounded-full hover:bg-black/5 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 移动端侧边菜单容器 */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[81px] left-0 w-full bg-white shadow-2xl border-t border-gray-100 p-6 flex flex-col gap-4 text-black animate-in fade-in slide-in-from-top-2 duration-300">
          {NAV_LINKS.map(link => (
            <button 
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left py-4 text-xl font-medium border-b border-gray-50 last:border-0 ${
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