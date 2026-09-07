import React, { useState, useEffect, useRef } from 'react';
import { PhotoItem, FamilyMember, MemoryStory, NewsAnnouncement } from '../types';
import { 
  Search, 
  X, 
  Camera, 
  User, 
  BookOpen, 
  Bell, 
  MapPin, 
  Calendar, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  members: FamilyMember[];
  memories: MemoryStory[];
  news: NewsAnnouncement[];
  onSelectPhoto: (photo: PhotoItem) => void;
  onSelectMember: (memberId: string) => void;
  onSelectMemoryTab: () => void;
  onSelectNewsTab: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  photos,
  members,
  memories,
  news,
  onSelectPhoto,
  onSelectMember,
  onSelectMemoryTab,
  onSelectNewsTab
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedPhotos = q
    ? photos.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.year.toString().includes(q) ||
          p.decade.toLowerCase().includes(q)
      )
    : [];

  const matchedMembers = q
    ? members.filter(
        (m) =>
          `${m.firstName} ${m.lastName} ${m.nickname || ''} ${m.maidenName || ''}`
            .toLowerCase()
            .includes(q) ||
          m.bio.toLowerCase().includes(q) ||
          m.birthPlace.toLowerCase().includes(q) ||
          (m.profession && m.profession.toLowerCase().includes(q))
      )
    : [];

  const matchedStories = q
    ? memories.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.content.toLowerCase().includes(q) ||
          m.author.toLowerCase().includes(q)
      )
    : [];

  const matchedNews = q
    ? news.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedPhotos.length + matchedMembers.length + matchedStories.length + matchedNews.length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/80 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="artistic-frame relative bg-[#FDFBF7] w-full max-w-2xl rounded-sm shadow-2xl border border-[#2D2926]/20 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 bg-[#FDFBF7] border-b border-[#2D2926]/10 gap-3">
          <Search className="w-4 h-4 text-[#8C7355] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search photos, people, stories, recipes, places, years..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm sm:text-base text-[#2D2926] focus:outline-hidden placeholder:text-[#2D2926]/40 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#2D2926]/40 hover:text-[#2D2926] rounded-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[10px] font-mono px-2 py-0.5 bg-[#2D2926]/5 text-[#2D2926]/70 rounded-sm hover:bg-[#2D2926]/10 cursor-pointer uppercase"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1 divide-y divide-[#2D2926]/10">
          
          {!q && (
            <div className="py-8 text-center text-[#2D2926]/60 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C7355]">
                Quick Family Search
              </p>
              <p className="text-xs text-[#2D2926]/70 font-serif">
                Try searching for &ldquo;Lake Tahoe&rdquo;, &ldquo;Eleanor&rdquo;, &ldquo;1946&rdquo;, &ldquo;Recipe&rdquo;, &ldquo;Navy&rdquo;, or &ldquo;Cape Cod&rdquo;
              </p>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="py-8 text-center text-[#2D2926]/60 space-y-1">
              <p className="text-sm font-semibold text-[#2D2926] font-serif">No records found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#2D2926]/50">Try searching for a different person, place, or decade.</p>
            </div>
          )}

          {/* Matched People */}
          {matchedMembers.length > 0 && (
            <div className="pt-3 first:pt-0 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#8C7355]" />
                Family Members ({matchedMembers.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedMembers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onClose();
                      onSelectMember(m.id);
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-sm bg-[#FDFBF7] hover:bg-[#8C7355]/10 border border-[#2D2926]/10 text-left transition-all cursor-pointer group"
                  >
                    <img
                      src={m.avatarUrl}
                      alt={m.firstName}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-sm object-cover shrink-0 ring-1 ring-[#8C7355]/30"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2D2926] group-hover:text-[#8C7355] truncate font-serif">
                        {m.firstName} {m.lastName}
                      </h4>
                      <p className="text-[10px] text-[#2D2926]/60 truncate font-mono">
                        {m.birthDate.slice(0, 4)} • Gen {m.generation} • {m.birthPlace}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#2D2926]/30 group-hover:text-[#8C7355]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Photos */}
          {matchedPhotos.length > 0 && (
            <div className="pt-3 first:pt-0 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#8C7355]" />
                Vintage Photos ({matchedPhotos.length})
              </span>
              <div className="space-y-1.5">
                {matchedPhotos.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectPhoto(p);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-sm bg-[#FDFBF7] hover:bg-[#8C7355]/10 border border-[#2D2926]/10 text-left transition-all cursor-pointer group"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-10 rounded-sm object-cover bg-[#2D2926] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-[#8C7355] text-white">
                          {p.year}
                        </span>
                        <h4 className="text-xs font-bold text-[#2D2926] group-hover:text-[#8C7355] truncate font-serif">
                          {p.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-[#2D2926]/60 truncate mt-0.5">
                        {p.location} • {p.eventType}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#2D2926]/30 group-hover:text-[#8C7355]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Stories */}
          {matchedStories.length > 0 && (
            <div className="pt-3 first:pt-0 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8C7355]" />
                Stories & Recipes ({matchedStories.length})
              </span>
              <div className="space-y-1.5">
                {matchedStories.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onClose();
                      onSelectMemoryTab();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-sm bg-[#FDFBF7] hover:bg-[#8C7355]/10 border border-[#2D2926]/10 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C7355]">
                        {s.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#2D2926] group-hover:text-[#8C7355] truncate font-serif">
                        {s.title}
                      </h4>
                      <p className="text-[10px] text-[#2D2926]/60 truncate font-serif">
                        By {s.author} • Circa {s.yearEstimated}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#2D2926]/30 group-hover:text-[#8C7355]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched News */}
          {matchedNews.length > 0 && (
            <div className="pt-3 first:pt-0 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#8C7355]" />
                News & Dispatches ({matchedNews.length})
              </span>
              <div className="space-y-1.5">
                {matchedNews.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      onClose();
                      onSelectNewsTab();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-sm bg-[#FDFBF7] hover:bg-[#8C7355]/10 border border-[#2D2926]/10 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C7355]">
                        {n.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#2D2926] group-hover:text-[#8C7355] truncate font-serif">
                        {n.title}
                      </h4>
                      <p className="text-[10px] text-[#2D2926]/60 truncate font-mono">
                        {n.date} • {n.author}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#2D2926]/30 group-hover:text-[#8C7355]" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
