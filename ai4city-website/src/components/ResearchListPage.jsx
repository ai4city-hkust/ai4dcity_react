import React, { useState, useMemo } from 'react';
import { Database } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

// ---------------------------------------------------------------------------
// MediaSlot — renders the top "thumbnail" area of each card.
//
// Supported mediaType values:
//   "image"   — src in mediaContent  (default / backward-compatible)
//   "video"   — YouTube URL or direct .mp4 URL in mediaContent
//   "map"     — any iframe-embeddable URL in mediaContent
//   "custom"  — pass a React element in mediaContent (JSX widget)
//   undefined — falls back to a neutral placeholder icon
// ---------------------------------------------------------------------------
const MediaSlot = ({ mediaType, mediaContent, title }) => {
  const base =
    'w-full aspect-video flex-shrink-0 bg-gray-100 overflow-hidden rounded-t-2xl';

  if (mediaType === 'image' && mediaContent) {
    return (
      <div className={base}>
        <img
          src={mediaContent}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>
    );
  }

  if (mediaType === 'video' && mediaContent) {
    // Accept both YouTube share links and direct video URLs
    const isYoutube =
      mediaContent.includes('youtube.com') ||
      mediaContent.includes('youtu.be');
    const embedSrc = isYoutube
      ? mediaContent
          .replace('watch?v=', 'embed/')
          .replace('youtu.be/', 'youtube.com/embed/')
      : null;

    return (
      <div className={base}>
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Direct video file
          <video
            src={mediaContent}
            controls
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  if (mediaType === 'map' && mediaContent) {
    return (
      <div className={base}>
        <iframe
          src={mediaContent}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  // "custom" — caller passes a ready-made React element
  if (mediaType === 'custom' && mediaContent) {
    return (
      <div className={base + ' flex items-center justify-center'}>
        {mediaContent}
      </div>
    );
  }

  // Fallback placeholder
  return (
    <div className={base + ' flex items-center justify-center text-slate-400'}>
      <Database size={40} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// ResearchCard — a single paper / project card
// ---------------------------------------------------------------------------
const ResearchCard = ({ item }) => (
  <FadeInSection className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
    {/* Media area */}
    <a href={item.link} className="block cursor-pointer">
      <MediaSlot
        mediaType={item.mediaType}
        mediaContent={item.mediaContent}
        title={item.title}
      />
    </a>

    {/* Body */}
    <div className="flex flex-col flex-1 p-5">
      {/* Topic + year badges */}
      <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-orange-600">
        {item.topic && <span>{item.topic}</span>}
        {item.topic && item.year && <span>•</span>}
        {item.year && <span>{item.year}</span>}
      </div>

      {/* Title */}
      <a
        href={item.link}
        className="hover:text-blue-600 transition-colors duration-300 block mb-3"
      >
        <h3 className="text-base md:text-lg font-bold leading-snug">
          {item.title}
        </h3>
      </a>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed text-justify flex-1 line-clamp-4">
        {item.desc}
      </p>

      {/* Footer: venue + extra links */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>{item.venue ?? item.date}</span>
        <div className="flex gap-3">
          {item.paperLink && (
            <a
              href={item.paperLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              paper ↗
            </a>
          )}
          {item.codeLink && (
            <a
              href={item.codeLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              code ↗
            </a>
          )}
          {item.demoLink && (
            <a
              href={item.demoLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  </FadeInSection>
);

// ---------------------------------------------------------------------------
// ResearchListPage — main export
// ---------------------------------------------------------------------------
// 在组件外定义固定顺序
const TOPIC_ORDER = [
  'AI based 3D City Modeling',
  'Spatio-temporal (4D) Data Fusion',
  'Urban Env-Understanding',
  
  
];
export const ResearchListPage = ({ title, description, items, type = 'default' }) => {
  const [selectedYear, setSelectedYear] = useState('All');

  // Derive sorted unique years & ordered unique topics from data
  const { years, topics } = useMemo(() => {
  const uniqueYears = [
    ...new Set(items.map((i) => i.year).filter(Boolean)),
  ].sort((a, b) => b - a);

  // 收集数据里实际出现的所有 topic
  const presentTopics = new Set(items.map((i) => i.topic).filter(Boolean));

  // 先按固定顺序排，再把不在 TOPIC_ORDER 里的追加到末尾
  const uniqueTopics = [
    ...TOPIC_ORDER.filter((t) => presentTopics.has(t)),
    ...[...presentTopics].filter((t) => !TOPIC_ORDER.includes(t)),
  ];

  return { years: ['All', ...uniqueYears], topics: uniqueTopics };
}, [items]);

  // Filter by year; grouping by topic happens below
  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          selectedYear === 'All' ||
          (item.year && item.year.toString() === selectedYear.toString()),
      ),
    [items, selectedYear],
  );

  // Group into columns keyed by topic
  const columns = useMemo(() => {
    const map = {};
    for (const topic of topics) map[topic] = [];
    for (const item of filteredItems) {
      if (item.topic && map[item.topic]) {
        map[item.topic].push(item);
      }
    }
    return map;
  }, [filteredItems, topics]);

  return (
    <div className="pt-[81px] w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Page header */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 mb-12">{description}</p>

        {/* ── Year filter bar ── */}
        {years.length > 1 && (
          <div className="w-full border-b border-gray-200 mb-12">
            <div className="flex flex-wrap gap-x-8">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`pb-3 text-base font-medium transition-all relative
                    ${
                      selectedYear === year
                        ? 'text-black'
                        : 'text-gray-500 hover:text-gray-800'
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

        {/* ── Three-column grid ── */}
        {topics.length > 0 ? (
          <div
            className="grid gap-x-8 gap-y-0 items-start"
            style={{
              gridTemplateColumns: `repeat(${Math.min(topics.length, 3)}, minmax(0, 1fr))`,
            }}
          >
            {topics.map((topic) => (
              <div key={topic} className="flex flex-col">
                {/* Column header — matches existing site style */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">{topic}</h2>
                  <div className="h-[1px] bg-gray-300 rounded-full" />
                </div>

                {/* Cards stacked in column */}
                <div className="flex flex-col gap-6">
                  {columns[topic].length > 0 ? (
                    columns[topic].map((item) => (
                      <ResearchCard key={item.id} item={item} />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm py-8 text-center">
                      No items for {selectedYear}.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400">
            No items found matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
