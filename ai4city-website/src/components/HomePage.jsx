import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

import { MapPin, Mail, Linkedin, Twitter, Github, Menu, X, ChevronDown, ChevronUp, ChevronRight, Calendar, Clock, Video, ArrowRight, Globe, FileText, Database, GraduationCap } from 'lucide-react';
import { FadeInSection } from './FadeInSection';
import { ARTICLE_CONTENT } from '../data/articles';
import { HOME_RESOURCES_ITEMS } from '../data/research_field';


export const HomePage = ({ 
  setPage, 
  RESEARCH_FOCUS = HOME_RESOURCES_ITEMS
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 将文章对象转换为数组
  const allArticles = Object.entries(ARTICLE_CONTENT);
  
  // 切片逻辑：默认只显示前 6 条
  const visibleArticles = isExpanded ? allArticles : allArticles.slice(0, 6);

  return (
    <div className="w-full pb-[240px] bg-white text-black">
      
      {/* 1. Hero Section */}
      <div className="relative w-full h-[320px] md:h-[100vh] bg-gray-900 text-white flex justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay loop muted playsInline
        >
          <source src="/3drebuildshort.mp4" type="video/mp4" />
        </video> 
        
        <div className="absolute bottom-16 md:bottom-24 w-full max-w-[1920px] mx-auto z-10 px-6">
          <FadeInSection>
            <h1 className="text-5xl md:text-[81px] font-bold leading-tight mb-8 drop-shadow-2xl">
              AI4CITY LAB
            </h1>
            
            {ARTICLE_CONTENT['seminar'] && (
              <div 
                className="cursor-pointer transition group max-w-3xl" 
                onClick={() => setPage('article', 'seminar')}
              > 
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">Upcoming Seminar</h2>
                <p className="text-lg md:text-xl font-medium leading-snug">{ARTICLE_CONTENT['seminar'].title}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
                  <span className="flex items-center gap-2"><Calendar size={16}/> {ARTICLE_CONTENT['seminar'].date}</span>
                  <span className="flex items-center gap-2"><Clock size={16}/> {ARTICLE_CONTENT['seminar'].site || 'HKUST(GZ)'}</span>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>
      </div>

      {/* 2. 内容容器 */}
      <div className="max-w-[1920px] mx-auto space-y-64 py-24">
        
        {/* --- News & Events 模块 --- */}
        <FadeInSection className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* 左侧标题区域 */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <h2 className="text-5xl md:text-7xl font-bold leading-none sticky top-24">
                News <br className="hidden lg:block"/>
                <span className="text-gray-300">&</span> <br className="hidden lg:block"/>
                Events
              </h2>
            </div>

            {/* 右侧列表区域 */}
            <div className="w-full lg:w-3/4 flex flex-col gap-4">
              {visibleArticles.map(([id, item]) => {
                // 跳转逻辑验证：有外部链接 OR 内部文章有正文内容
                const hasExternalLink = item.link && item.link.trim() !== "";
                const hasInternalContent = item.body && item.body.length > 0;
                const canNavigate = hasExternalLink || hasInternalContent;

                return (
                  <div 
                    key={id} 
                    className={`group relative w-full bg-white border border-gray-100 p-6 md:p-8 transition-all duration-300 rounded-lg
                      ${canNavigate 
                        ? 'hover:border-black hover:shadow-xl cursor-pointer hover:-translate-y-0.5' 
                        : 'cursor-default opacity-60'
                      }`}
                    onClick={() => {
                      if (!canNavigate) return;
                      if (hasExternalLink) {
                        window.open(item.link, '_blank');
                      } else if (setPage) {
                        setPage('article', id);
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs md:text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
                          {item.date}
                        </p>
                        <h3 className={`text-xl md:text-2xl font-bold leading-snug transition-colors
                          ${canNavigate ? 'group-hover:text-blue-600 text-black' : 'text-gray-500'}
                        `}>
                          {item.title}
                        </h3>
                        {item.abstract && (
                          <p className="mt-3 text-gray-500 text-sm line-clamp-1 italic">
                            {item.abstract}
                          </p>
                        )}
                      </div>

                      {/* 交互提示箭头：仅在可跳转时显示 */}
                      {canNavigate && (
                        <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 group-hover:bg-blue-600 transition-colors shrink-0">
                          <ArrowRight size={20} className="text-gray-300 group-hover:text-white transform group-hover:-rotate-45 transition-all duration-300" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* 展开/折叠控制按钮 */}
              {allArticles.length > 6 && (
                <div className="mt-8 flex justify-center lg:justify-start">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-md group"
                  >
                    {isExpanded ? (
                      <>Show Less <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform"/></>
                    ) : (
                      <>Show More News ({allArticles.length - 6}+) <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform"/></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeInSection>

        {/* --- 其他模块 (Research, People, Resources) --- */}
        <FadeInSection>
          <h2 className="px-5 text-4xl sm:text-[64px] font-bold mb-6">Research Focus</h2>
          {RESEARCH_FOCUS.map((focus, index) => (
            // 移除 gap, 背景透明/白色 (无底色), 直角
            <div key={focus.id} className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-0 items-center mb-8 group hover-zoom-container overflow-hidden`}> 
              <div 
                className="w-full md:w-3/4 aspect-[3/2] md:h-[350px] bg-gray-200 overflow-hidden rounded-none relative cursor-pointer" 
                onClick={() => setPage('research')}
              >
                <img 
                  src={focus.img} 
                  className="w-full h-full object-cover hover-zoom-img" 
                  alt={focus.title} 
                />
              </div>
              {/* 文字区域无背景色 bg-white/transparent */}
              <div className="w-full md:w-1/4 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">{focus.title}</h3>
                  <p className="text-lg text-black mb-6 text-left whitespace-pre-line">{focus.desc}</p>
                  <button onClick={() => setPage(focus.link)} className="text-black font-bold hover:underline flex items-center">{focus.example} <ChevronRight size={16}/> </button>
              </div>
            </div>
          ))}
        </FadeInSection>

        <FadeInSection>
          {/* 移除 gap, 背景透明/白色, 直角 */}
          <div className="flex flex-col md:flex-row gap-0 h-auto overflow-hidden rounded-none">
            <div className="w-full md:w-1/4 pt-0 pr-6 pb-6 pl-6 flex flex-col justify-top">
              <h2 className="px-5 text-4xl sm:text-[64px] font-bold leading-none text-left">People</h2>
              <div className="p-6 flex flex-col justify-center text-left">
                <p className="text-lg lg:text-lg text-black mb-6 text-left">
                  Our team is a diverse and talented group of researchers, including PhD candidates, MPhil students, Research Assistant (RAs), and visiting students from around the world. Each member brings unique expertise and perspectives from varied academic and professional backgrounds, creating a dynamic collaborative environment. Together, we are committed to advancing cutting-edge research in AI-driven urban modeling and making meaningful contributions to sustainable city development.
                </p>
                <button onClick={() => setPage('team')} className="text-black font-bold hover:underline flex items-center">Meet Our Team <ChevronRight size={16}/> </button>
              </div>
            </div>
            <div className="md:w-3/4 aspect-[3/2] md:aspect-auto md:h-[800px] bg-gray-300 relative overflow-hidden hover-zoom-container ">
              <img src="images/people/group.jpg" className="aspect-[1/2] inset-0 w-full h-full object-cover hover-zoom-img " alt="Team" />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="flex flex-col md:flex-row gap-0 lg:gap-0">
          <div className="w-full md:w-1/4">
              <h2 className="px-5 text-4xl sm:text-[64px] font-bold leading-none">Resource <br/>& <br/>Data</h2>
              <button onClick={() => setPage('resources')} className="px-5 mt-6 text-lg font-bold hover:underline flex items-center gap-2">
                  Find something good <ChevronRight size={16}/>
              </button>
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 lg:gap-8">
              {HOME_RESOURCES_ITEMS.map(item => (
                <div 
                    key={item.id} 
                    className="flex flex-col gap-3 group cursor-pointer hover-zoom-container" 
                    onClick={() => {
                        if (item.link) {
                            window.location.href = item.link;  // 如果有链接，跳转到链接
                        } else {
                            setPage('resources');  // 否则返回原本的资源页
                        }
                    }}
                > 
                  
                  {/* 图片容器 */}
                  <div className="aspect-square w-full bg-gray-200 overflow-hidden rounded-none relative">
                    {item.img ? (
                      // --- 方案 A: 如果有图片路径，渲染图片 ---
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-full object-cover hover-zoom-img" 
                      />
                    ) : (
                      // --- 方案 B: 如果没有图片，保留原来的文字占位样式 ---
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center hover-zoom-img text-gray-500 text-center p-4">
                        {item.title}
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-xl leading-tight group-hover:text-blue-600">{item.title}</h3>
                </div>
              ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default HomePage;