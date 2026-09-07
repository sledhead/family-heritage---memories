import React from 'react';
import { ActiveTab, TextScale } from '../types';
import { 
  Camera, 
  GitFork, 
  BookOpen, 
  Bell, 
  Calendar, 
  PlusCircle, 
  Search, 
  Type, 
  FileJson,
  HeartHandshake
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  onOpenAddModal: () => void;
  onOpenSearch: () => void;
  onOpenJsonArchiveModal: () => void;
  photosCount: number;
  membersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  textScale,
  setTextScale,
  onOpenAddModal,
  onOpenSearch,
  onOpenJsonArchiveModal,
  photosCount,
  membersCount
}) => {
  const tabs = [
    { id: 'timeline' as ActiveTab, label: 'Timeline', count: photosCount },
    { id: 'genealogy' as ActiveTab, label: 'Genealogy & Tree', count: membersCount },
    { id: 'memories' as ActiveTab, label: 'Stories & Recipes' },
    { id: 'news' as ActiveTab, label: 'Bulletin' },
    { id: 'calendar' as ActiveTab, label: 'Calendar' },
  ];

  const cycleTextScale = () => {
    const scales: TextScale[] = ['sm', 'base', 'lg', 'xl'];
    const nextIndex = (scales.indexOf(textScale) + 1) % scales.length;
    setTextScale(scales[nextIndex]);
  };

  const scaleLabels: Record<TextScale, string> = {
    sm: 'Text: A',
    base: 'Text: A+',
    lg: 'Text: A++',
    xl: 'Text: Max'
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2D2926]/10 selection:bg-[#8C7355] selection:text-white">
      {/* Top Banner / Family Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-5 pb-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          
          {/* Masthead Header */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#2D2926] leading-none">
                HAWTHORNE <span className="text-[#8C7355] italic font-serif">&amp;</span> KIN
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C7355] bg-[#8C7355]/10 px-2 py-0.5 rounded-sm">
                Est. 1921
              </span>
            </div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] mt-2 text-[#8C7355] font-semibold">
              A Digital Heritage Archive
            </p>
          </div>

          {/* Action Bar (Search, Accessibility Size Scaler, JSON Loader, Add Button) */}
          <div className="flex items-center flex-wrap gap-2.5 self-start md:self-end">
            {/* Quick Search */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              aria-label="Search family records"
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-transparent hover:bg-[#8C7355]/10 text-[#2D2926] text-xs font-semibold uppercase tracking-wider border border-[#2D2926]/20 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#8C7355]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-[#2D2926]/5 rounded text-[#2D2926]/70">
                ⌘K
              </kbd>
            </button>

            {/* Quick JSON Archive Loader / Sync */}
            <button
              id="header-json-loader-btn"
              onClick={onOpenJsonArchiveModal}
              title="Load family archive from a JSON file or export backup"
              aria-label="Load archive from JSON file"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#8C7355]/10 hover:bg-[#8C7355]/20 text-[#2D2926] text-xs font-bold uppercase tracking-wider border border-[#8C7355]/30 transition-all cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5 text-[#8C7355]" />
              <span>Load JSON File</span>
            </button>

            {/* Accessibility Font Resizer */}
            <button
              id="header-text-scale-btn"
              onClick={cycleTextScale}
              title="Change reading text size for better readability"
              aria-label="Toggle text size"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-transparent hover:bg-[#8C7355]/10 text-[#2D2926] text-xs font-semibold uppercase tracking-wider border border-[#2D2926]/20 transition-all cursor-pointer"
            >
              <Type className="w-3.5 h-3.5 text-[#8C7355]" />
              <span className="font-bold text-[10px]">{scaleLabels[textScale]}</span>
            </button>

            {/* Contribute / Add Memory */}
            <button
              id="header-add-memory-btn"
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white text-xs uppercase tracking-widest font-bold shadow-xs transition-all cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Contribute</span>
            </button>
          </div>
        </div>


        {/* Editorial Navigation Tabs */}
        <nav aria-label="Main Navigation" className="mt-5 flex items-center gap-6 sm:gap-8 overflow-x-auto border-t border-[#2D2926]/10 pt-3 no-scrollbar text-xs uppercase tracking-[0.2em] font-bold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2.5 transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'border-b-2 border-[#8C7355] text-[#2D2926]'
                    : 'text-[#2D2926]/60 hover:text-[#8C7355] border-b-2 border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#8C7355] text-white' : 'bg-[#2D2926]/5 text-[#2D2926]/70'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
