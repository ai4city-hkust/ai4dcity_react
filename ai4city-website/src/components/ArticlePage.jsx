import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, ArrowLeft, Clock, MapPin, ExternalLink } from 'lucide-react';
import { ARTICLE_CONTENT } from '../data/articles';

/**
 * 内部模拟动画组件 (解决 ./FadeInSection 引用问题)
 * 在预览环境中保证动画效果一致
 */
const FadeInSection = ({ children, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};


export const ArticlePage = ({ articleId, setPage, externalData = null }) => {
  const content = externalData || MOCK_CONTENT;

  return (
    <div className="pt-[81px] w-full min-h-screen bg-white text-black">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        
        {/* 返回按钮 */}
        <FadeInSection className="mb-10">
          <button 
            onClick={() => { setPage && setPage('home'); window.scrollTo(0,0); }}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors group font-medium"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            返回上级
          </button>
        </FadeInSection>

        {/* 标题与元数据 */}
        <FadeInSection className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8 tracking-tight">
            {content.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-gray-500 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Calendar size={18} className="text-blue-500" />
              <span>{content.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <User size={18} className="text-blue-500" />
              <span>{content.author}</span>
            </div>
            {content.site && (
              <div className="flex items-center gap-2 text-sm md:text-base">
                <MapPin size={18} className="text-blue-500" />
                <span>{content.site}</span>
              </div>
            )}
          </div>
        </FadeInSection>

        {/* 文章头图 */}
        {content.img && (
          <FadeInSection className="mb-16">
            <div className="w-full aspect-video md:aspect-[21/9] bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src={content.img} 
                className="w-full h-full object-cover" 
                alt={content.title} 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </FadeInSection>
        )}

        {/* 文章正文 (Body) */}
        <div className="w-full">
          {content.body && content.body.length > 0 ? (
            <div className="space-y-12">
              {content.body.map((item, index) => {
                if (typeof item === 'string') {
                  return (
                    <FadeInSection key={index}>
                      {/* Markdown 渲染容器 */}
                      <div className="markdown-body text-gray-800 leading-relaxed text-justify text-lg
                        prose prose-blue max-w-none
                        [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-black
                        [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mt-6 [&>h4]:mb-3 [&>h4]:text-gray-900
                        [&>p]:mb-6
                        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
                        [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-800
                        [&>strong]:text-black">
                        <ReactMarkdown>
                          {item}
                        </ReactMarkdown>
                      </div>
                    </FadeInSection>
                  );
                } else if (item.type === 'image') {
                  return (
                    <FadeInSection key={index} className="my-16">
                      <div className="flex flex-col items-center">
                        <img 
                          src={item.src} 
                          alt={item.caption} 
                          className="w-full max-w-4xl shadow-2xl rounded-3xl border border-gray-100" 
                        />
                        {item.caption && (
                          <span className="mt-6 px-6 py-2 bg-gray-50 text-gray-500 text-sm italic rounded-full border border-gray-100">
                            {item.caption}
                          </span>
                        )}
                      </div>
                    </FadeInSection>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p className="text-gray-300 italic py-20 text-center">内容更新中...</p>
          )}
          
          {/* 底部活动详情信息 */}
          {content.details && content.details.length > 0 && (
            <FadeInSection className="mt-24">
              <div className="p-8 md:p-12 bg-blue-50 rounded-[2.5rem] border border-blue-100 shadow-sm">
                <h3 className="font-bold text-blue-900 mb-8 text-2xl flex items-center gap-3">
                  <Clock size={24} /> 活动详情 / Event Details
                </h3>
                <ul className="space-y-5">
                  {content.details.map((detail, index) => (
                    <li key={index} className="flex gap-4 items-start text-blue-800 text-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2.5 shrink-0" />
                      <span className="leading-snug">{detail.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;