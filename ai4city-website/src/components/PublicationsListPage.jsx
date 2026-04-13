import React, { useState, useMemo } from 'react';
import { FadeInSection } from './FadeInSection';

export const PublicationsListPage = ({ title, description, items, type = 'default' }) => {
  const [selectedYear, setSelectedYear]   = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const { years, topics } = useMemo(() => {
    const uniqueYears = [
      ...new Set(items.map((i) => String(i.year ?? '')).filter(Boolean)),
    ].sort((a, b) => b - a);
    const uniqueTopics = [...new Set(items.map((i) => i.topic).filter(Boolean))];
    return { years: ['All', ...uniqueYears], topics: ['All', ...uniqueTopics] };
  }, [items]);

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const matchYear  = selectedYear  === 'All' || String(item.year ?? '') === selectedYear;
        const matchTopic = selectedTopic === 'All' || item.topic === selectedTopic;
        return matchYear && matchTopic;
      }),
    [items, selectedYear, selectedTopic],
  );

  return (
    <div className="pt-[81px] w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 mb-12">{description}</p>

        {/* Topic filter */}
        {topics.length > 1 && (
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 items-center">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`text-base transition-colors duration-200 ${
                  selectedTopic === topic
                    ? 'font-bold text-black'
                    : 'font-medium text-gray-500 hover:text-gray-800'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}

        {/* Year filter */}
        {years.length > 1 && (
          <div className="w-full border-b border-gray-200 mb-12">
            <div className="flex flex-wrap gap-x-8">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`pb-3 text-base font-medium transition-all relative ${
                    selectedYear === year ? 'text-black' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {year}
                  {selectedYear === year && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 translate-y-[1px]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Card list */}
        <div className="flex flex-col gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const hasLink = Boolean(item.link && item.link.trim());

              const inner = (
                <div className={`w-full p-6 md:p-8 flex flex-col gap-2${hasLink ? ' group' : ''}`}>
                  <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                    {item.topic && <span>{item.topic}</span>}
                    {item.topic && item.year && <span>•</span>}
                    {item.year  && <span>{item.year}</span>}
                  </div>

                  <h2 className={`text-lg md:text-xl font-bold leading-snug${
                    hasLink ? ' group-hover:text-blue-600 transition-colors duration-200' : ' text-gray-800'
                  }`}>
                    {item.title}
                  </h2>

                  {item.desc && item.desc.trim() && (
                    <p className="text-sm text-gray-600 leading-relaxed text-justify mt-1">
                      {item.desc.trim()}
                    </p>
                  )}

                  {item.date && item.date.trim() && (
                    <p className="text-xs text-gray-400 mt-2">{item.date.trim()}</p>
                  )}
                </div>
              );

              return (
                <FadeInSection key={item.id}>
                  {hasLink ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-gray-400 transition-all duration-200"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="bg-white border border-gray-100 rounded-2xl cursor-default">
                      {inner}
                    </div>
                  )}
                </FadeInSection>
              );
            })
          ) : (
            <div className="py-20 text-center text-gray-400">
              No items found matching the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};