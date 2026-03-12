import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import './index.css';
import { TeamPage } from './components/TeamPage';
import { ResourcesListPage } from './components/ResourcesListPage';
import { RESOURCES_LIST_ITEMS } from './data/resources';
import { PublicationsListPage } from './components/PublicationsListPage';
import { PUBLICATION_ITEMS } from './data/publications';
import { ResearchListPage } from './components/ResearchListPage';
import { RESEARCH_PROJECTS } from './data/research';
import { ArticlePage } from './components/ArticlePage';


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [articleId, setArticleId] = useState(null);

  // setPage now accepts an optional second argument: articleId
  const setPage = (page, id = null) => {
    setCurrentPage(page);
    if (id !== null) setArticleId(id);
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div className="w-full min-h-screen">
            <HomePage setPage={setPage} />
          </div>
        );
      case 'article':
        return (
          <div className="w-full min-h-screen">
            <ArticlePage articleId={articleId} setPage={setPage} />
          </div>
        );
      case 'team':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            <TeamPage />
          </div>
        );
      case 'research':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            <ResearchListPage
              title="Research"
              description="Open datasets and tools for urban research."
              items={RESEARCH_PROJECTS}
              type="publication"
            />
          </div>
        );
      case 'publication':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            <PublicationsListPage
              title="Publications"
              description="Open datasets and tools for urban research."
              items={PUBLICATION_ITEMS}
              type="publication"
            />
          </div>
        );
      case 'resources':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            <ResourcesListPage
              title="Resource & Data"
              description="Open datasets and tools for urban research."
              items={RESOURCES_LIST_ITEMS}
              type="resources"
            />
          </div>
        );
      case 'about':
        return (
          <div className="pt-[81px] w-full min-h-screen">
            <AboutPage />
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
      <Navbar currentPage={currentPage} setPage={setPage} />
      <main className="transition-opacity duration-300">
        {renderContent()}
      </main>
      <Footer currentPage={currentPage} setPage={setPage} />
    </div>
  );
}
