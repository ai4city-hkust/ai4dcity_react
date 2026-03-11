import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { MapPin, Mail, Linkedin, Twitter, Github, Menu, X, ChevronRight, Calendar, Clock, Video, ArrowRight, Globe, FileText, Database, GraduationCap } from 'lucide-react';
import { FadeInSection } from './FadeInSection';
import { PUBLICATION_ITEMS } from '../data/publications';

export const PublicationsListPage = ({ title, description, items, type = "default" }) => {
              // --- 状态管理 ---
              const [selectedYear, setSelectedYear] = useState('All');
              const [selectedTopic, setSelectedTopic] = useState('All');

              // --- 1. 自动提取可用的年份和主题 (去重 + 排序) ---
              const { years, topics } = useMemo(() => {
                  const uniqueYears = [...new Set(items.map(item => item.year).filter(Boolean))].sort().reverse(); // 降序
                  const uniqueTopics = [...new Set(items.map(item => item.topic).filter(Boolean))];
                  
                  return {
                      years: ['All', ...uniqueYears],
                      topics: ['All', ...uniqueTopics]
                  };
              }, [items]);

              // --- 2. 核心筛选逻辑 ---
              const filteredItems = useMemo(() => {
                  return items.filter(item => {
                      const matchYear = selectedYear === 'All' || (item.year && item.year.toString() === selectedYear.toString());
                      const matchTopic = selectedTopic === 'All' || item.topic === selectedTopic;
                      return matchYear && matchTopic;
                  });
              }, [items, selectedYear, selectedTopic]);

              return (
                  <div className="pt-[81px] w-full min-h-screen">
                      <div className="max-w-7xl mx-auto px-6 py-16">
                          <h1 className="text-4xl md:text-6xl font-bold mb-8">{title}</h1>
                          <p className="text-gray-500 mb-12">{description}</p>

                          {/* --- 筛选器区域 (Filter Bar) --- */}
                          <div className="mb-16">
                              {/* Topic Row (主题) */}
                              {topics.length > 1 && (
                                  <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 items-center">
                                      {topics.map((topic) => (
                                          <button
                                              key={topic}
                                              onClick={() => setSelectedTopic(topic)}
                                              className={`text-base transition-colors duration-200 
                                                  ${selectedTopic === topic 
                                                      ? 'font-bold text-black' 
                                                      : 'font-medium text-gray-500 hover:text-gray-800'
                                                  }`}
                                          >
                                              {topic}
                                          </button>
                                      ))}
                                  </div>
                              )}

                              {/* Year Row (年份) - 带底部灰线和高亮条 */}
                              {years.length > 1 && (
                                  <div className="w-full border-b border-gray-200">
                                      <div className="flex flex-wrap gap-x-8">
                                          {years.map((year) => (
                                              <button
                                                  key={year}
                                                  onClick={() => setSelectedYear(year)}
                                                  className={`pb-3 text-base font-medium transition-all relative
                                                      ${selectedYear === year 
                                                          ? 'text-black' 
                                                          : 'text-gray-500 hover:text-gray-800'
                                                      }`}
                                              >
                                                  {year}
                                                  {/* 橙色高亮条 */}
                                                  {selectedYear === year && (
                                                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 translate-y-[1px]" />
                                                  )}
                                              </button>
                                          ))}
                                      </div>
                                  </div>
                              )}
                          </div>

                          {/* --- 列表卡片显示区域 --- */}
                          <div className="flex flex-col gap-8">
                              {filteredItems.length > 0 ? (
                                  filteredItems.map((item) => (
                                      <FadeInSection key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 hover:shadow-xl transition-shadow duration-300">
                                          <div className="flex-1 flex flex-col justify-center order-2 md:order-1">
                                              {/* 显示 Topic 和 Year 的小标签 (可选) */}
                                              <div className="mb-2 flex gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                                                  {item.topic && <span>{item.topic}</span>}
                                                  {item.topic && item.year && <span>•</span>}
                                                  {item.year && <span>{item.year}</span>}
                                              </div>

                                              <a href={item.link} className="hover:text-blue-600 transition-colors duration-300 block w-fit cursor-pointer">
                                                  <h2 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h2>
                                              </a>
                                              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed text-justify">{item.desc}</p>
                                              <div className="mt-auto pt-4 border-t border-gray-100 text-sm text-gray-400">
                                                  {item.date}
                                              </div>
                                          </div>
                                          
                                          {/* 图片/图标区域 */}
                                          <div className="w-full md:w-1/3 aspect-video md:h-[250px] flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden order-1 md:order-2">
                                              {item.img ? (
                                                  <a href={item.link} className="block w-full h-full cursor-pointer">
                                                      <img 
                                                          src={item.img} 
                                                          alt={item.title} 
                                                          className="w-full h-full object-cover hover:scale-105 transition duration-500" 
                                                      />
                                                  </a>
                                              ) : (
                                                  type === 'resources' ? (
                                                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                                          <Database size={48} />
                                                      </div>
                                                  ) : null
                                              )}
                                          </div>
                                      </FadeInSection>
                                  ))
                              ) : (
                                  // 空状态：当筛选结果为空时显示
                                  <div className="py-20 text-center text-gray-400">
                                      No items found matching the selected filters.
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              );
          };