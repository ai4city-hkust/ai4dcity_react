import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

import { MapPin, Mail, Linkedin, Twitter, Github, Menu, X, ChevronDown, ChevronUp, ChevronRight, Calendar, Clock, Video, ArrowRight, Globe, FileText, Database, GraduationCap } from 'lucide-react';

import { FadeInSection } from './FadeInSection';
import { ARTICLE_CONTENT } from '../data/articles';
import { HOME_RESOURCES_ITEMS } from '../data/research_field';
import { RESOURCES_LIST_ITEMS } from '../data/resources';

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
          className="absolute inset-0 w-full h-full object-cover opacity-60"
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
                className="cursor-pointer transition group max-w-2xl" 
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
                    className={`group relative w-full bg-white border border-gray-100 p-6 md:p-8 transition-all duration-300 rounded-2xl
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
        <FadeInSection className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-12">Research Focus</h2>
          <div className="space-y-16">
            {RESEARCH_FOCUS.map((focus, index) => (
              <div key={focus.id} className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-12 items-center group`}> 
                <div className="w-full md:w-3/5 aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all cursor-pointer" onClick={() => setPage('research')}>
                  <img src={focus.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={focus.title} />
                </div>
                <div className="w-full md:w-2/5">
                  <h3 className="text-3xl font-bold mb-6">{focus.title}</h3>
                  <p className="text-lg text-gray-600 mb-8 whitespace-pre-line leading-relaxed">{focus.desc}</p>
                  <a href={focus.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-blue-600 hover:underline">
                    {focus.example} <ChevronRight size={18}/> 
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Our Team</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 text-justify">
              Our team is a diverse and talented group of researchers, including PhD candidates, MPhil students, and visiting scholars from around the world.
            </p>
            <button onClick={() => { setPage('team'); window.scrollTo(0,0); }} className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
              Meet Our Team <ArrowRight size={20} />
            </button>
          </div>
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="/images/people/group.jpg" className="w-full h-full object-cover" alt="AI4City Team" />
          </div>
        </FadeInSection>

        <FadeInSection className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Resources <br/>& Data</h2>
            <button onClick={() => setPage('resources')} className="text-xl font-bold text-blue-600 hover:underline flex items-center gap-2">
              Explore Repository <ChevronRight size={20}/>
            </button>
          </div>
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {RESOURCES_LIST_ITEMS.slice(0, 4).map(item => (
              <div key={item.id} className="group bg-slate-50 border border-slate-100 p-8 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all cursor-pointer" onClick={() => item.link ? window.open(item.link, '_blank') : setPage('resources')}>
                <div className="w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden mb-6">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                </div>
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{item.title}</h3>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default HomePage;