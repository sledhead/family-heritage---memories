import React, { useState, useMemo } from 'react';
import { 
  PhotoItem, 
  FamilyMember, 
  Decade, 
  EventCategory 
} from '../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Filter, 
  Volume2, 
  Heart, 
  MessageSquare, 
  Grid3X3, 
  Sparkles, 
  Clock, 
  X,
  SlidersHorizontal,
  Share2
} from 'lucide-react';

interface TimelineSectionProps {
  photos: PhotoItem[];
  members: FamilyMember[];
  onSelectPhoto: (photo: PhotoItem) => void;
  onSelectMember: (memberId: string) => void;
  onLikePhoto: (photoId: string) => void;
}

const DECADES: Decade[] = [
  'All',
  '1920s',
  '1930s',
  '1940s',
  '1950s',
  '1960s',
  '1970s',
  '1980s',
  '1990s',
  '2000s',
  '2010s',
  '2020s'
];

const EVENT_CATEGORIES: EventCategory[] = [
  'All',
  'Wedding',
  'Holiday',
  'Reunion',
  'Graduation',
  'Military',
  'Anniversary',
  'Summer Trip',
  'Everyday Life',
  'New Baby',
  'Milestone'
];

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  photos,
  members,
  onSelectPhoto,
  onSelectMember,
  onLikePhoto
}) => {
  const [selectedDecade, setSelectedDecade] = useState<Decade>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventCategory>('All');
  const [selectedPersonId, setSelectedPersonId] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Extract unique locations
  const availableLocations = useMemo(() => {
    const locs = Array.from(new Set(photos.map((p) => p.location.split(',')[0].trim())));
    return ['All', ...locs.sort()];
  }, [photos]);

  // Decade photo counts
  const decadeCounts = useMemo(() => {
    const map: Record<string, number> = { All: photos.length };
    DECADES.forEach((d) => {
      if (d !== 'All') {
        map[d] = photos.filter((p) => p.decade === d).length;
      }
    });
    return map;
  }, [photos]);

  // Filtered & Sorted Photos
  const filteredPhotos = useMemo(() => {
    return photos
      .filter((photo) => {
        // Decade filter
        if (selectedDecade !== 'All' && photo.decade !== selectedDecade) {
          return false;
        }
        // Event type filter
        if (selectedEvent !== 'All' && photo.eventType !== selectedEvent) {
          return false;
        }
        // Person filter
        if (selectedPersonId !== 'All' && !photo.taggedMemberIds.includes(selectedPersonId)) {
          return false;
        }
        // Location filter
        if (selectedLocation !== 'All' && !photo.location.includes(selectedLocation)) {
          return false;
        }
        // Keyword Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = photo.title.toLowerCase().includes(q);
          const matchDesc = photo.description.toLowerCase().includes(q);
          const matchLoc = photo.location.toLowerCase().includes(q);
          const matchContributor = photo.contributedBy.toLowerCase().includes(q);
          const matchPeople = photo.taggedMemberIds.some((mid) => {
            const m = members.find((mem) => mem.id === mid);
            return m && `${m.firstName} ${m.lastName} ${m.nickname || ''}`.toLowerCase().includes(q);
          });
          return matchTitle || matchDesc || matchLoc || matchContributor || matchPeople;
        }
        return true;
      })
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
      });
  }, [
    photos,
    selectedDecade,
    selectedEvent,
    selectedPersonId,
    selectedLocation,
    searchQuery,
    sortOrder,
    members
  ]);

  // Group photos by Decade for the timeline view
  const groupedByDecade = useMemo(() => {
    const groups: { [key: string]: PhotoItem[] } = {};
    filteredPhotos.forEach((photo) => {
      const dec = photo.decade || `${Math.floor(photo.year / 10) * 10}s`;
      if (!groups[dec]) groups[dec] = [];
      groups[dec].push(photo);
    });
    return groups;
  }, [filteredPhotos]);

  const activeFilterCount =
    (selectedDecade !== 'All' ? 1 : 0) +
    (selectedEvent !== 'All' ? 1 : 0) +
    (selectedPersonId !== 'All' ? 1 : 0) +
    (selectedLocation !== 'All' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedDecade('All');
    setSelectedEvent('All');
    setSelectedPersonId('All');
    setSelectedLocation('All');
    setSearchQuery('');
  };

  const getMember = (id: string) => members.find((m) => m.id === id);

  return (
    <div className="space-y-6">
      
      {/* Intro Heritage Banner */}
      <div className="artistic-frame rounded-sm bg-[#FDFBF7] p-6 sm:p-8 border border-[#2D2926]/10 relative overflow-hidden">
        {/* Subtle decorative corner tick marks */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#8C7355]/40" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#8C7355]/40" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#8C7355]/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#8C7355]/40" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C7355]">
                Centennial Photographic Record
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2D2926]">
              Interactive Photographic Timeline
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2926]/70 mt-1.5 max-w-2xl leading-relaxed">
              Spanning from the 1920s to present day. Filter by era, wedding, reunion, person, or location to explore generations of family lore.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-[#2D2926]/5 rounded-sm text-xs font-semibold uppercase tracking-wider">
              <button
                id="timeline-view-mode-btn"
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                  viewMode === 'timeline'
                    ? 'bg-white text-[#2D2926] shadow-xs font-bold'
                    : 'text-[#2D2926]/60 hover:text-[#2D2926]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Timeline</span>
              </button>
              <button
                id="grid-view-mode-btn"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#2D2926] shadow-xs font-bold'
                    : 'text-[#2D2926]/60 hover:text-[#2D2926]'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Gallery</span>
              </button>
            </div>

            {/* Sort Direction */}
            <button
              id="timeline-sort-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title="Toggle Chronological Order"
              className="px-3 py-2 rounded-sm bg-transparent hover:bg-[#8C7355]/10 border border-[#2D2926]/20 text-[#2D2926] text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
            >
              {sortOrder === 'asc' ? 'Chronological' : 'Reverse'}
            </button>
          </div>
        </div>

        {/* Decade Scrubber */}
        <div className="mt-6 pt-5 border-t border-[#2D2926]/10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7355] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8C7355]" />
              Select Era:
            </span>
            {selectedDecade !== 'All' && (
              <button
                onClick={() => setSelectedDecade('All')}
                className="text-xs text-[#8C7355] hover:underline font-semibold uppercase tracking-wider cursor-pointer"
              >
                View All Eras
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {DECADES.map((decade) => {
              const count = decadeCounts[decade] || 0;
              const isSelected = selectedDecade === decade;
              return (
                <button
                  key={decade}
                  id={`decade-btn-${decade}`}
                  onClick={() => setSelectedDecade(decade)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#8C7355] text-white shadow-xs'
                      : 'bg-transparent hover:bg-[#2D2926]/5 text-[#2D2926] border border-[#2D2926]/15 hover:border-[#8C7355]'
                  }`}
                >
                  <span>{decade}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-black/20 text-white' : 'bg-[#2D2926]/10 text-[#2D2926]/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Bar (Facets: Person, Location, Event Type, Search) */}
      <div className="bg-[#FDFBF7] rounded-sm p-4 sm:p-5 border border-[#2D2926]/10 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Quick Event Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full sm:max-w-2xl no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] shrink-0">Events:</span>
            {EVENT_CATEGORIES.slice(0, 7).map((ev) => {
              const active = selectedEvent === ev;
              return (
                <button
                  key={ev}
                  onClick={() => setSelectedEvent(ev)}
                  className={`text-xs px-2.5 py-1 rounded-sm font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                    active
                      ? 'bg-[#2D2926] text-[#FDFBF7]'
                      : 'bg-transparent border border-[#2D2926]/15 text-[#2D2926]/80 hover:bg-[#2D2926]/5'
                  }`}
                >
                  {ev}
                </button>
              );
            })}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-xs text-[#8C7355] font-semibold flex items-center gap-1 hover:underline px-2 cursor-pointer shrink-0 uppercase tracking-wider"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{showAdvancedFilters ? 'Fewer' : 'More...'}</span>
            </button>
          </div>

          {/* Active Filter Clear Tag */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs text-rose-800 hover:text-rose-900 font-semibold bg-rose-50 px-2.5 py-1 rounded-sm border border-rose-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>

        {/* Dropdowns for Person & Location & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-3 border-t border-[#2D2926]/10">
          
          {/* Person Filter */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-[#8C7355] mb-1 uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3 h-3 text-[#8C7355]" />
              Filter by Person
            </label>
            <select
              id="filter-person-select"
              value={selectedPersonId}
              onChange={(e) => setSelectedPersonId(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs font-medium text-[#2D2926] focus:outline-hidden focus:border-[#8C7355] cursor-pointer"
            >
              <option value="All">All Family Members ({members.length})</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.firstName} {m.lastName} {m.nickname ? `(${m.nickname})` : ''} - Gen {m.generation}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-[#8C7355] mb-1 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#8C7355]" />
              Filter by Location
            </label>
            <select
              id="filter-location-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs font-medium text-[#2D2926] focus:outline-hidden focus:border-[#8C7355] cursor-pointer"
            >
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Event Category Dropdown */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-[#8C7355] mb-1 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#8C7355]" />
              Event Category
            </label>
            <select
              id="filter-event-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value as EventCategory)}
              className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs font-medium text-[#2D2926] focus:outline-hidden focus:border-[#8C7355] cursor-pointer"
            >
              {EVENT_CATEGORIES.map((ev) => (
                <option key={ev} value={ev}>
                  {ev === 'All' ? 'All Event Types' : ev}
                </option>
              ))}
            </select>
          </div>

          {/* Search Query */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-[#8C7355] mb-1 uppercase tracking-wider">
              Search Memories
            </label>
            <input
              id="timeline-search-input"
              type="text"
              placeholder="e.g. wedding, sailboat, cabin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs font-medium text-[#2D2926] focus:outline-hidden focus:border-[#8C7355]"
            />
          </div>
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-[#2D2926]/60 px-1 font-mono">
        <span>
          ARCHIVE ITEMS: <strong className="text-[#2D2926]">{filteredPhotos.length}</strong>
          {selectedDecade !== 'All' && ` | ERA: ${selectedDecade}`}
          {selectedEvent !== 'All' && ` | EVENT: ${selectedEvent}`}
        </span>
        {filteredPhotos.length === 0 && (
          <button
            onClick={clearAllFilters}
            className="text-[#8C7355] hover:underline font-semibold cursor-pointer"
          >
            Clear filters to show all
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="bg-[#FDFBF7] rounded-sm p-12 text-center border border-[#2D2926]/10 max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#8C7355]/10 text-[#8C7355] flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#2D2926]">No photos match your filter</h3>
          <p className="text-xs text-[#2D2926]/70">
            Try choosing &apos;All&apos; decades or clearing specific location and person filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-sm bg-[#8C7355] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#735D43] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* VIEW MODE 1: Interactive Timeline Flow */}
      {viewMode === 'timeline' && filteredPhotos.length > 0 && (
        <div className="relative pl-4 sm:pl-8 space-y-12 before:absolute before:left-2 sm:before:left-4 before:top-3 before:bottom-3 before:w-[1px] before:bg-linear-to-b before:from-[#8C7355] before:via-[#2D2926]/20 before:to-[#8C7355]">
          {(Object.entries(groupedByDecade) as [string, PhotoItem[]][]).map(([decade, decadePhotos]) => (
            <div key={decade} className="relative space-y-6">
              
              {/* Decade Marker Ribbon */}
              <div className="flex items-center gap-3 -ml-4 sm:-ml-8">
                <div className="w-8 h-8 rounded-full bg-[#8C7355] text-white flex items-center justify-center font-serif font-bold text-xs shadow-md border-2 border-[#FDFBF7] shrink-0 z-10">
                  {decade.slice(2, 4)}
                </div>
                <div className="flex items-center gap-2 bg-[#2D2926] text-[#FDFBF7] px-4 py-1.5 rounded-sm shadow-xs">
                  <span className="font-serif font-bold text-sm tracking-wide">{decade}</span>
                  <span className="text-[10px] text-[#8C7355] font-mono">({decadePhotos.length} {decadePhotos.length === 1 ? 'record' : 'records'})</span>
                </div>
              </div>

              {/* Photos Cards in this Decade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
                {decadePhotos.map((photo) => (
                  <TimelinePhotoCard
                    key={photo.id}
                    photo={photo}
                    members={members}
                    getMember={getMember}
                    onSelectPhoto={onSelectPhoto}
                    onSelectMember={onSelectMember}
                    onLikePhoto={onLikePhoto}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: Gallery Grid */}
      {viewMode === 'grid' && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <TimelinePhotoCard
              key={photo.id}
              photo={photo}
              members={members}
              getMember={getMember}
              onSelectPhoto={onSelectPhoto}
              onSelectMember={onSelectMember}
              onLikePhoto={onLikePhoto}
            />
          ))}
        </div>
      )}

    </div>
  );
};

// Reusable Polaroid-Framed Archival Photo Card
interface TimelinePhotoCardProps {
  photo: PhotoItem;
  members: FamilyMember[];
  getMember: (id: string) => FamilyMember | undefined;
  onSelectPhoto: (photo: PhotoItem) => void;
  onSelectMember: (memberId: string) => void;
  onLikePhoto: (photoId: string) => void;
}

const TimelinePhotoCard: React.FC<TimelinePhotoCardProps> = ({
  photo,
  getMember,
  onSelectPhoto,
  onSelectMember,
  onLikePhoto
}) => {
  return (
    <div
      id={`photo-card-${photo.id}`}
      className="artistic-frame bg-[#FDFBF7] rounded-sm overflow-hidden border border-[#2D2926]/10 flex flex-col group transition-all duration-200 hover:border-[#8C7355]/40"
    >
      {/* Archival Photo Image Frame */}
      <div 
        onClick={() => onSelectPhoto(photo)}
        className="relative aspect-4/3 bg-[#2D2926] overflow-hidden cursor-pointer"
      >
        <img
          src={photo.imageUrl}
          alt={photo.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            photo.colorTone === 'sepia'
              ? 'sepia-[0.35] contrast-105'
              : photo.colorTone === 'black-white'
              ? 'grayscale contrast-110'
              : ''
          }`}
          loading="lazy"
        />

        {/* Year Pill Tag */}
        <div className="absolute top-3 left-3 bg-[#2D2926]/90 backdrop-blur-md text-[#FDFBF7] text-xs font-serif font-bold px-2.5 py-1 rounded-sm border border-white/10 shadow-xs">
          {photo.year}
        </div>

        {/* Event Category Tag */}
        <div className="absolute top-3 right-3 bg-[#8C7355]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm border border-[#8C7355]/40 shadow-xs">
          {photo.eventType}
        </div>

        {/* Audio Story Badge if present */}
        {photo.audioStory && (
          <div className="absolute bottom-3 left-3 bg-[#2D2926]/90 backdrop-blur-md text-[#8C7355] text-[10px] font-mono px-2.5 py-1 rounded-sm flex items-center gap-1.5 border border-[#8C7355]/30">
            <Volume2 className="w-3.5 h-3.5 text-[#8C7355] animate-pulse" />
            <span className="uppercase tracking-widest font-bold">Oral Audio Record</span>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Location & Exact Date */}
          <div className="flex items-center gap-3 text-[11px] text-[#2D2926]/60 mb-1 font-mono">
            <span className="flex items-center gap-1 truncate max-w-[60%]">
              <MapPin className="w-3 h-3 text-[#8C7355] shrink-0" />
              <span className="truncate">{photo.location}</span>
            </span>
            {photo.exactDate && (
              <span className="text-[#8C7355]">
                {new Date(photo.exactDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectPhoto(photo)}
            className="text-base sm:text-lg font-serif font-bold text-[#2D2926] group-hover:text-[#8C7355] transition-colors cursor-pointer line-clamp-1"
          >
            {photo.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-[#2D2926]/70 mt-1 line-clamp-2 leading-relaxed">
            {photo.description}
          </p>
        </div>

        {/* Tagged Family Members Avatars */}
        {photo.taggedMemberIds.length > 0 && (
          <div className="pt-3 border-t border-[#2D2926]/10">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center -space-x-1.5 overflow-hidden">
                {photo.taggedMemberIds.slice(0, 5).map((mId) => {
                  const mem = getMember(mId);
                  if (!mem) return null;
                  return (
                    <button
                      key={mId}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMember(mId);
                      }}
                      title={`${mem.firstName} ${mem.lastName}`}
                      className="inline-block w-6 h-6 rounded-full ring-2 ring-[#FDFBF7] hover:scale-110 transition-transform cursor-pointer overflow-hidden shrink-0 border border-[#8C7355]/30"
                    >
                      <img
                        src={mem.avatarUrl}
                        alt={mem.firstName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
                {photo.taggedMemberIds.length > 5 && (
                  <span className="w-6 h-6 rounded-full bg-[#8C7355]/20 text-[#2D2926] text-[9px] font-bold flex items-center justify-center ring-2 ring-[#FDFBF7]">
                    +{photo.taggedMemberIds.length - 5}
                  </span>
                )}
              </div>
              
              <span className="text-[10px] text-[#8C7355] uppercase tracking-wider font-mono truncate max-w-[150px]">
                {photo.taggedMemberIds.length} {photo.taggedMemberIds.length === 1 ? 'PERSON' : 'PEOPLE'} TAGGED
              </span>
            </div>
          </div>
        )}

        {/* Footer Actions (Likes, Comments, View) */}
        <div className="pt-3 flex items-center justify-between border-t border-[#2D2926]/10 text-xs text-[#2D2926]/60">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLikePhoto(photo.id);
              }}
              className="flex items-center gap-1 text-[#2D2926]/70 hover:text-rose-600 transition-colors cursor-pointer group/like"
            >
              <Heart className={`w-3.5 h-3.5 ${photo.likes ? 'text-rose-500 fill-rose-500' : 'group-hover/like:text-rose-500'}`} />
              <span className="font-mono text-xs">{photo.likes || 0}</span>
            </button>

            <button
              onClick={() => onSelectPhoto(photo)}
              className="flex items-center gap-1 text-[#2D2926]/70 hover:text-[#8C7355] transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">{photo.comments.length}</span>
            </button>
          </div>

          <button
            onClick={() => onSelectPhoto(photo)}
            className="text-xs uppercase tracking-widest font-bold text-[#8C7355] hover:text-[#735D43] flex items-center gap-1 cursor-pointer"
          >
            <span>View Record</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
};
