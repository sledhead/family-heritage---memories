import React, { useState } from 'react';
import { NewsAnnouncement } from '../types';
import { 
  Bell, 
  Pin, 
  Calendar, 
  MapPin, 
  Users, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  Tag,
  Share2
} from 'lucide-react';

interface NewsSectionProps {
  news: NewsAnnouncement[];
  onOpenAddModal: () => void;
  onRsvp: (newsId: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  onOpenAddModal,
  onRsvp
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [userRsvpStatus, setUserRsvpStatus] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Reunion Update',
    'Celebration',
    'Milestone',
    'New Arrival',
    'General'
  ];

  const handleRsvpClick = (id: string) => {
    setUserRsvpStatus((prev) => ({ ...prev, [id]: !prev[id] }));
    onRsvp(id);
  };

  const filteredNews = news.filter((item) => {
    if (selectedCat !== 'All' && item.category !== selectedCat) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="artistic-frame rounded-sm bg-[#FDFBF7] p-6 sm:p-8 border border-[#2D2926]/10 relative overflow-hidden">
        {/* Decorative corner tick marks */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#8C7355]/40" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#8C7355]/40" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#8C7355]/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#8C7355]/40" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C7355]">
                Hawthorne Kin Gazette
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2D2926]">
              Family News & Reunion Bulletins
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2926]/70 mt-1.5 max-w-2xl leading-relaxed">
              Stay connected with upcoming reunions, new baby arrivals, graduations, family milestones, and community announcements.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white text-xs uppercase tracking-widest font-bold shadow-xs transition-all cursor-pointer shrink-0 self-start md:self-auto active:scale-98"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post Dispatch</span>
          </button>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 pt-5 border-t border-[#2D2926]/10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCat === cat
                  ? 'bg-[#8C7355] text-white shadow-xs'
                  : 'bg-transparent hover:bg-[#2D2926]/5 text-[#2D2926] border border-[#2D2926]/15 hover:border-[#8C7355]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item) => {
          const isRsvpd = userRsvpStatus[item.id];
          return (
            <div
              key={item.id}
              className={`artistic-frame bg-[#FDFBF7] rounded-sm p-6 border shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                item.pinned
                  ? 'border-[#8C7355] ring-1 ring-[#8C7355]/30'
                  : 'border-[#2D2926]/10'
              }`}
            >
              <div className="space-y-3">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.pinned && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#8C7355] text-white text-[10px] uppercase tracking-widest font-bold shadow-xs">
                        <Pin className="w-3 h-3" />
                        <span>Pinned Notice</span>
                      </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#2D2926]/5 text-[#2D2926]">
                      {item.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-[#8C7355]">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-[#2D2926] leading-snug">
                  {item.title}
                </h3>

                {/* Event date / location if reunion */}
                {(item.eventDate || item.location) && (
                  <div className="flex flex-wrap items-center gap-3 text-xs bg-[#8C7355]/10 p-3 rounded-sm border border-[#8C7355]/20 text-[#2D2926] font-mono">
                    {item.eventDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8C7355]" />
                        <span>{item.eventDate}</span>
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8C7355]" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                )}

                {/* Image */}
                {item.imageUrl && (
                  <div className="aspect-16/9 rounded-sm overflow-hidden bg-[#2D2926] border border-[#2D2926]/10">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content text */}
                <p className="text-sm text-[#2D2926]/80 font-serif leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#2D2926]/10 flex items-center justify-between text-xs text-[#2D2926]/60">
                <span>Dispatched by <strong className="text-[#2D2926]">{item.author}</strong></span>

                {item.category === 'Reunion Update' && (
                  <button
                    onClick={() => handleRsvpClick(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm uppercase tracking-wider text-xs font-bold transition-all cursor-pointer ${
                      isRsvpd
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#8C7355] hover:bg-[#735D43] text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isRsvpd ? 'Attending' : `RSVP (${(item.rsvpCount || 0) + (isRsvpd ? 1 : 0)})`}</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
