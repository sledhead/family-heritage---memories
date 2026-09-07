/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  TextScale, 
  FamilyMember, 
  PhotoItem, 
  MemoryStory, 
  NewsAnnouncement, 
  CalendarEvent 
} from './types';
import { 
  initialFamilyMembers, 
  initialPhotos, 
  initialMemories, 
  initialNews, 
  initialCalendarEvents 
} from './data/initialData';
import { mergeArchiveData, loadArchiveFromUrl } from './utils/jsonArchive';
import { Header } from './components/Header';
import { TimelineSection } from './components/TimelineSection';
import { PhotoDetailModal } from './components/PhotoDetailModal';
import { GenealogySection } from './components/GenealogySection';
import { MemberDetailModal } from './components/MemberDetailModal';
import { MemoriesSection } from './components/MemoriesSection';
import { NewsSection } from './components/NewsSection';
import { CalendarSection } from './components/CalendarSection';
import { AddContentModal } from './components/AddContentModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { JsonArchiveModal } from './components/JsonArchiveModal';
import { 
  HeartHandshake, 
  Download, 
  Upload, 
  RotateCcw, 
  Camera, 
  GitFork, 
  BookOpen, 
  Bell, 
  Calendar,
  Sparkles,
  ShieldCheck,
  FileJson,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Persistence in LocalStorage
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('hawthorne_family_members');
    return saved ? JSON.parse(saved) : initialFamilyMembers;
  });

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const saved = localStorage.getItem('hawthorne_family_photos');
    return saved ? JSON.parse(saved) : initialPhotos;
  });

  const [memories, setMemories] = useState<MemoryStory[]>(() => {
    const saved = localStorage.getItem('hawthorne_family_memories');
    return saved ? JSON.parse(saved) : initialMemories;
  });

  const [news, setNews] = useState<NewsAnnouncement[]>(() => {
    const saved = localStorage.getItem('hawthorne_family_news');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('hawthorne_family_calendar');
    return saved ? JSON.parse(saved) : initialCalendarEvents;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('timeline');
  const [textScale, setTextScale] = useState<TextScale>('base');

  // Modals state
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('hawthorne_family_members', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('hawthorne_family_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('hawthorne_family_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('hawthorne_family_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('hawthorne_family_calendar', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  // Support automated JSON loading via URL parameter (?loadJson=... or ?archiveUrl=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const jsonParam = params.get('loadJson') || params.get('archiveUrl');
      if (jsonParam) {
        loadArchiveFromUrl(jsonParam).then((loaded) => {
          if (loaded.familyMembers && loaded.familyMembers.length > 0) {
            setFamilyMembers(loaded.familyMembers);
          }
          if (loaded.photos && loaded.photos.length > 0) {
            setPhotos(loaded.photos);
          }
          if (loaded.memories && loaded.memories.length > 0) {
            setMemories(loaded.memories);
          }
          if (loaded.news && loaded.news.length > 0) {
            setNews(loaded.news);
          }
          if (loaded.calendarEvents && loaded.calendarEvents.length > 0) {
            setCalendarEvents(loaded.calendarEvents);
          }
          setToastMessage(`Archive loaded automatically from "${jsonParam}"`);
          setTimeout(() => setToastMessage(null), 4000);
        }).catch((err) => {
          console.warn('Failed to load JSON from URL parameter:', err);
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Handlers for JSON Archive Loading
  const handleApplyArchive = (
    incoming: {
      familyMembers: FamilyMember[];
      photos: PhotoItem[];
      memories: MemoryStory[];
      news: NewsAnnouncement[];
      calendarEvents: CalendarEvent[];
    },
    mode: 'replace' | 'merge',
    sourceDescription?: string
  ) => {
    if (mode === 'replace') {
      setFamilyMembers(incoming.familyMembers);
      setPhotos(incoming.photos);
      setMemories(incoming.memories);
      setNews(incoming.news);
      setCalendarEvents(incoming.calendarEvents);
      setToastMessage(
        `Successfully loaded entire archive (${incoming.familyMembers.length} members, ${incoming.photos.length} photos, ${incoming.memories.length} stories) from ${sourceDescription || 'JSON file'}!`
      );
    } else {
      const current = { familyMembers, photos, memories, news, calendarEvents };
      const merged = mergeArchiveData(current, incoming);
      setFamilyMembers(merged.familyMembers);
      setPhotos(merged.photos);
      setMemories(merged.memories);
      setNews(merged.news);
      setCalendarEvents(merged.calendarEvents);
      setToastMessage(
        `Successfully merged records from ${sourceDescription || 'JSON file'} (Total: ${merged.familyMembers.length} members, ${merged.photos.length} photos)!`
      );
    }

    setTimeout(() => setToastMessage(null), 5000);
  };

  // Handlers for Add Operations
  const handleAddPhoto = (newPhoto: PhotoItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
    setActiveTab('timeline');
  };

  const handleAddMemory = (newMemory: MemoryStory) => {
    setMemories((prev) => [newMemory, ...prev]);
    setActiveTab('memories');
  };

  const handleAddNews = (newNews: NewsAnnouncement) => {
    setNews((prev) => [newNews, ...prev]);
    setActiveTab('news');
  };

  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents((prev) => [...prev, newEvent]);
    setActiveTab('calendar');
  };

  // Interactions
  const handleLikePhoto = (photoId: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto((prev) => (prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null));
    }
  };

  const handleAddPhotoComment = (photoId: string, author: string, text: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author,
      text,
      date: new Date().toISOString().split('T')[0]
    };

    setPhotos((prev) =>
      prev.map((p) =>
        p.id === photoId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );

    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : null
      );
    }
  };

  const handleLikeMemory = (storyId: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === storyId ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleAddMemoryComment = (memoryId: string, author: string, text: string) => {
    const newComment = {
      id: `rc-${Date.now()}`,
      author,
      text,
      date: new Date().toISOString().split('T')[0]
    };

    setMemories((prev) =>
      prev.map((m) =>
        m.id === memoryId
          ? { ...m, comments: [...(m.comments || []), newComment] }
          : m
      )
    );
  };

  const handleRsvpNews = (newsId: string) => {
    setNews((prev) =>
      prev.map((n) =>
        n.id === newsId ? { ...n, rsvpCount: (n.rsvpCount || 0) + 1 } : n
      )
    );
  };

  // Export / Backup JSON Data
  const handleExportData = () => {
    const fullBackup = {
      familyName: "Hawthorne Family Heritage Archive",
      archiveTitle: "Hawthorne Family Digital Heritage Archive",
      description: "Preserved vintage photos, genealogy lineage, oral history recollections, heirloom recipes, and announcements.",
      version: "2.0",
      exportedAt: new Date().toISOString(),
      familyMembers,
      photos,
      memories,
      news,
      calendarEvents
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hawthorne_family_archive_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to default archival demo data
  const handleResetData = () => {
    if (window.confirm('Reset family records to default heirloom archives?')) {
      setFamilyMembers(initialFamilyMembers);
      setPhotos(initialPhotos);
      setMemories(initialMemories);
      setNews(initialNews);
      setCalendarEvents(initialCalendarEvents);
      localStorage.clear();
      setToastMessage('Reset archive to default heirloom records.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const selectedMember = selectedMemberId
    ? familyMembers.find((m) => m.id === selectedMemberId) || null
    : null;

  return (
    <div className={`min-h-screen bg-[#FDFBF7] text-[#2D2926] flex flex-col font-sans text-size-${textScale}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-md bg-[#2D2926] text-[#FDFBF7] px-4 py-3 rounded-sm shadow-2xl border border-[#8C7355] flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-[#8C7355] shrink-0" />
          <p className="text-xs font-serif leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white text-xs ml-auto cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sticky Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        textScale={textScale}
        setTextScale={setTextScale}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenJsonArchiveModal={() => setIsJsonModalOpen(true)}
        photosCount={photos.length}
        membersCount={familyMembers.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'timeline' && (
          <TimelineSection
            photos={photos}
            members={familyMembers}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            onSelectMember={(mId) => setSelectedMemberId(mId)}
            onLikePhoto={handleLikePhoto}
          />
        )}

        {activeTab === 'genealogy' && (
          <GenealogySection
            members={familyMembers}
            photos={photos}
            onSelectMember={(mId) => setSelectedMemberId(mId)}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        )}

        {activeTab === 'memories' && (
          <MemoriesSection
            memories={memories}
            members={familyMembers}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onLikeMemory={handleLikeMemory}
            onAddMemoryComment={handleAddMemoryComment}
          />
        )}

        {activeTab === 'news' && (
          <NewsSection
            news={news}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onRsvp={handleRsvpNews}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarSection
            events={calendarEvents}
            members={familyMembers}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onSelectMember={(mId) => setSelectedMemberId(mId)}
          />
        )}
      </main>

      {/* Floating Bottom Quick Bar for Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#2D2926]/10 px-3 py-2 flex items-center justify-around shadow-lg">
        {[
          { id: 'timeline' as ActiveTab, label: 'Photos', icon: Camera },
          { id: 'genealogy' as ActiveTab, label: 'Tree', icon: GitFork },
          { id: 'memories' as ActiveTab, label: 'Stories', icon: BookOpen },
          { id: 'news' as ActiveTab, label: 'News', icon: Bell },
          { id: 'calendar' as ActiveTab, label: 'Dates', icon: Calendar }
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex flex-col items-center gap-0.5 p-1 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                isActive ? 'text-[#8C7355]' : 'text-[#2D2926]/50 hover:text-[#2D2926]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px]">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-[#2D2926] text-[#FDFBF7]/70 border-t border-[#2D2926] py-10 px-4 sm:px-6 pb-20 md:pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#8C7355] flex items-center justify-center text-white">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#FDFBF7]">
                Hawthorne &amp; Kin Heritage Archive
              </p>
              <p className="text-[#FDFBF7]/60 font-serif">
                Dedicated in loving memory to Arthur &amp; Eleanor Hawthorne • Preserving our family story since 1921
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-4 text-[#FDFBF7]/60">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-[#8C7355] transition-colors cursor-pointer font-medium"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Load / Import Archive (JSON)</span>
            </button>

            <span className="text-[#FDFBF7]/20">•</span>

            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 hover:text-[#8C7355] transition-colors cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Archive Backup (JSON)</span>
            </button>

            <span className="text-[#FDFBF7]/20">•</span>

            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 hover:text-rose-300 transition-colors cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Archive Demo</span>
            </button>
          </div>

        </div>
      </footer>

      {/* MODALS */}
      
      {/* JSON Archive Data Hub Modal */}
      <JsonArchiveModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        currentData={{
          familyMembers,
          photos,
          memories,
          news,
          calendarEvents
        }}
        onApplyArchive={handleApplyArchive}
      />

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          photos={photos}
          members={familyMembers}
          onClose={() => setSelectedPhoto(null)}
          onSelectMember={(mId) => {
            setSelectedPhoto(null);
            setSelectedMemberId(mId);
          }}
          onAddComment={handleAddPhotoComment}
          onLikePhoto={handleLikePhoto}
          onNavigatePhoto={(photo) => setSelectedPhoto(photo)}
        />
      )}

      {/* Member Profile Modal */}
      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          members={familyMembers}
          photos={photos}
          onClose={() => setSelectedMemberId(null)}
          onSelectMember={(mId) => setSelectedMemberId(mId)}
          onSelectPhoto={(photo) => {
            setSelectedMemberId(null);
            setSelectedPhoto(photo);
          }}
        />
      )}

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        members={familyMembers}
        onAddPhoto={handleAddPhoto}
        onAddMemory={handleAddMemory}
        onAddNews={handleAddNews}
        onAddCalendarEvent={handleAddCalendarEvent}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        photos={photos}
        members={familyMembers}
        memories={memories}
        news={news}
        onSelectPhoto={(photo) => {
          setIsSearchModalOpen(false);
          setSelectedPhoto(photo);
        }}
        onSelectMember={(mId) => {
          setIsSearchModalOpen(false);
          setSelectedMemberId(mId);
        }}
        onSelectMemoryTab={() => {
          setIsSearchModalOpen(false);
          setActiveTab('memories');
        }}
        onSelectNewsTab={() => {
          setIsSearchModalOpen(false);
          setActiveTab('news');
        }}
      />

    </div>
  );
}

