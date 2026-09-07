import React, { useState } from 'react';
import { 
  FamilyMember, 
  PhotoItem, 
  MemoryStory, 
  NewsAnnouncement, 
  CalendarEvent, 
  Decade, 
  EventCategory 
} from '../types';
import { 
  X, 
  Camera, 
  BookOpen, 
  Bell, 
  Calendar, 
  Upload, 
  Check, 
  Users, 
  MapPin, 
  Sparkles,
  Plus
} from 'lucide-react';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: FamilyMember[];
  onAddPhoto: (photo: PhotoItem) => void;
  onAddMemory: (memory: MemoryStory) => void;
  onAddNews: (news: NewsAnnouncement) => void;
  onAddCalendarEvent: (event: CalendarEvent) => void;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({
  isOpen,
  onClose,
  members,
  onAddPhoto,
  onAddMemory,
  onAddNews,
  onAddCalendarEvent
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'story' | 'news' | 'date'>('photo');

  // Photo form states
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoYear, setPhotoYear] = useState<number>(1975);
  const [photoExactDate, setPhotoExactDate] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [photoEvent, setPhotoEvent] = useState<EventCategory>('Everyday Life');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoContributor, setPhotoContributor] = useState('');
  const [photoTone, setPhotoTone] = useState<'sepia' | 'black-white' | 'vintage-color' | 'full-color'>('sepia');
  const [photoTagged, setPhotoTagged] = useState<string[]>([]);
  const [photoAudioTranscript, setPhotoAudioTranscript] = useState('');
  const [photoAudioNarrator, setPhotoAudioNarrator] = useState('');

  // Story / Recipe form states
  const [storyTitle, setStoryTitle] = useState('');
  const [storyCategory, setStoryCategory] = useState<'Secret Recipe' | 'Oral History' | 'Love Letter' | 'Life Lesson' | 'Family Lore'>('Oral History');
  const [storyAuthor, setStoryAuthor] = useState('');
  const [storyYear, setStoryYear] = useState<number>(1965);
  const [storyContent, setStoryContent] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeSteps, setRecipeSteps] = useState('');
  const [storyImageUrl, setStoryImageUrl] = useState('');

  // News form states
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'Celebration' | 'Reunion Update' | 'New Arrival' | 'Milestone' | 'General'>('Celebration');
  const [newsAuthor, setNewsAuthor] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsEventDate, setNewsEventDate] = useState('');
  const [newsLocation, setNewsLocation] = useState('');

  // Calendar form states
  const [calTitle, setCalTitle] = useState('');
  const [calType, setCalType] = useState<'birthday' | 'anniversary' | 'memorial' | 'reunion'>('birthday');
  const [calMonthDay, setCalMonthDay] = useState('06-15');
  const [calYear, setCalYear] = useState<number>(1980);
  const [calMemberId, setCalMemberId] = useState('');
  const [calDescription, setCalDescription] = useState('');

  if (!isOpen) return null;

  const calculateDecade = (year: number): Decade => {
    const d = Math.floor(year / 10) * 10;
    return `${d}s` as Decade;
  };

  const handleToggleTaggedMember = (mId: string) => {
    setPhotoTagged((prev) =>
      prev.includes(mId) ? prev.filter((id) => id !== mId) : [...prev, mId]
    );
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Photo
  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle.trim()) return;

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}`,
      title: photoTitle.trim(),
      imageUrl: photoUrl.trim() || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
      year: Number(photoYear) || 1970,
      exactDate: photoExactDate.trim() || undefined,
      decade: calculateDecade(Number(photoYear) || 1970),
      location: photoLocation.trim() || 'Family Home',
      eventType: photoEvent,
      taggedMemberIds: photoTagged,
      description: photoDescription.trim(),
      contributedBy: photoContributor.trim() || 'Family Member',
      colorTone: photoTone,
      comments: [],
      likes: 0,
      audioStory: photoAudioTranscript.trim()
        ? {
            title: `Memories of ${photoTitle}`,
            narrator: photoAudioNarrator.trim() || photoContributor || 'Family Elder',
            durationSec: 90,
            transcript: photoAudioTranscript.trim()
          }
        : undefined
    };

    onAddPhoto(newPhoto);
    onClose();
  };

  // Submit Story / Recipe
  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim() || !storyContent.trim()) return;

    const ingredients = recipeIngredients
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    const steps = recipeSteps
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newStory: MemoryStory = {
      id: `story-${Date.now()}`,
      title: storyTitle.trim(),
      category: storyCategory,
      author: storyAuthor.trim() || 'Family Member',
      yearEstimated: Number(storyYear) || 1970,
      decade: calculateDecade(Number(storyYear) || 1970),
      content: storyContent.trim(),
      recipeIngredients: ingredients.length > 0 ? ingredients : undefined,
      recipeSteps: steps.length > 0 ? steps : undefined,
      imageUrl: storyImageUrl.trim() || undefined,
      likes: 0,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onAddMemory(newStory);
    onClose();
  };

  // Submit News
  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;

    const newNewsItem: NewsAnnouncement = {
      id: `news-${Date.now()}`,
      title: newsTitle.trim(),
      category: newsCategory,
      date: new Date().toISOString().split('T')[0],
      author: newsAuthor.trim() || 'Family Member',
      content: newsContent.trim(),
      eventDate: newsEventDate.trim() || undefined,
      location: newsLocation.trim() || undefined,
      rsvpCount: newsCategory === 'Reunion Update' ? 1 : undefined
    };

    onAddNews(newNewsItem);
    onClose();
  };

  // Submit Calendar
  const handleCalendarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calTitle.trim()) return;

    const newCal: CalendarEvent = {
      id: `cal-${Date.now()}`,
      title: calTitle.trim(),
      type: calType,
      dateMonthDay: calMonthDay,
      originalYear: Number(calYear) || undefined,
      memberId: calMemberId || undefined,
      description: calDescription.trim() || `${calTitle} celebrated by the Hawthorne family.`
    };

    onAddCalendarEvent(newCal);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="artistic-frame relative bg-[#FDFBF7] w-full max-w-3xl rounded-sm shadow-2xl border border-[#2D2926]/20 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FDFBF7] border-b border-[#2D2926]/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#8C7355] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2D2926]">
                Contribute to the Family Archive
              </h2>
              <p className="text-xs text-[#2D2926]/60">
                Preserve heirloom photos, secret recipes, memories, or milestone dates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-[#2D2926]/5 hover:bg-[#2D2926]/10 text-[#2D2926] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#2D2926]/10 bg-[#FDFBF7] px-6 pt-2 gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'photo', label: 'Vintage Photo', icon: Camera },
            { id: 'story', label: 'Story or Recipe', icon: BookOpen },
            { id: 'news', label: 'News / Dispatch', icon: Bell },
            { id: 'date', label: 'Birthday / Date', icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'border-[#8C7355] text-[#2D2926] bg-[#8C7355]/10 rounded-t-sm shadow-2xs'
                    : 'border-transparent text-[#2D2926]/50 hover:text-[#2D2926]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          
          {/* TAB 1: Add Photo */}
          {activeTab === 'photo' && (
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grandpa Artie Building the Lake Winnipesaukee Cabin"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                {/* Photo Upload or URL */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider">
                    Photo Image (Upload or Web Link) *
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-sm bg-transparent hover:bg-[#2D2926]/5 border border-dashed border-[#2D2926]/30 text-[#2D2926] text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-[#8C7355]" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileUpload}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-[#2D2926]/40">or image URL:</span>

                    <input
                      type="url"
                      placeholder="https://..."
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="flex-1 w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                    />
                  </div>

                  {photoUrl && (
                    <div className="mt-2 w-24 h-24 rounded-sm overflow-hidden bg-[#2D2926] border border-[#2D2926]/20 shadow-xs">
                      <img
                        src={photoUrl}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Year & Exact Date */}
                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Year Taken *
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2030"
                    required
                    value={photoYear}
                    onChange={(e) => setPhotoYear(Number(e.target.value))}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Exact Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={photoExactDate}
                    onChange={(e) => setPhotoExactDate(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden font-mono"
                  />
                </div>

                {/* Location & Event Type */}
                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cape Cod, MA or Lake Tahoe"
                    value={photoLocation}
                    onChange={(e) => setPhotoLocation(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Event Type Category
                  </label>
                  <select
                    value={photoEvent}
                    onChange={(e) => setPhotoEvent(e.target.value as EventCategory)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Everyday Life">Everyday Life</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Holiday">Holiday (Thanksgiving/Christmas)</option>
                    <option value="Reunion">Family Reunion</option>
                    <option value="Summer Trip">Summer Vacation / Trip</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Military">Military Service</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="New Baby">New Baby Arrival</option>
                    <option value="Milestone">Milestone & Celebrations</option>
                  </select>
                </div>

                {/* Contributor Name & Tone */}
                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Contributed / Archived By
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Clara Hawthorne)"
                    value={photoContributor}
                    onChange={(e) => setPhotoContributor(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Archival Color Tone Style
                  </label>
                  <select
                    value={photoTone}
                    onChange={(e) => setPhotoTone(e.target.value as any)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden cursor-pointer"
                  >
                    <option value="sepia">Warm Archival Sepia</option>
                    <option value="black-white">Classic Black & White</option>
                    <option value="vintage-color">Vintage Color</option>
                    <option value="full-color">Full Modern Color</option>
                  </select>
                </div>

                {/* Tag Family Members */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1.5">
                    Tag Family Members in Photo ({photoTagged.length} selected)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2.5 bg-[#FDFBF7] rounded-sm border border-[#2D2926]/20">
                    {members.map((m) => {
                      const isTagged = photoTagged.includes(m.id);
                      return (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => handleToggleTaggedMember(m.id)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-sm text-xs font-medium transition-all text-left cursor-pointer ${
                            isTagged
                              ? 'bg-[#8C7355] text-white font-semibold'
                              : 'bg-[#2D2926]/5 hover:bg-[#2D2926]/10 text-[#2D2926]'
                          }`}
                        >
                          <img
                            src={m.avatarUrl}
                            alt={m.firstName}
                            referrerPolicy="no-referrer"
                            className="w-4 h-4 rounded-sm object-cover"
                          />
                          <span className="truncate">{m.firstName} {m.lastName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Photo Memory & Context *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe what was happening on that day, funny details, or why this photo is special..."
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-3 text-sm text-[#2D2926] font-serif focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                {/* Optional Oral History Audio Transcript */}
                <div className="sm:col-span-2 p-4 rounded-sm bg-[#8C7355]/5 border border-[#8C7355]/20 space-y-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider">
                    Optional Oral History / Voice Transcript
                  </label>
                  <input
                    type="text"
                    placeholder="Narrator Name (e.g. Nana Eleanor, Recorded 1998)"
                    value={photoAudioNarrator}
                    onChange={(e) => setPhotoAudioNarrator(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                  <textarea
                    rows={2}
                    placeholder="Spoken words / story verbatim..."
                    value={photoAudioTranscript}
                    onChange={(e) => setPhotoAudioTranscript(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-2.5 text-xs text-[#2D2926] font-serif focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white font-bold uppercase tracking-widest text-xs shadow-xs transition-all cursor-pointer"
              >
                Archive & Save Photo
              </button>
            </form>
          )}

          {/* TAB 2: Add Story or Secret Recipe */}
          {activeTab === 'story' && (
            <form onSubmit={handleStorySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grandma Rose's Apple Cinnamon Strudel"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={storyCategory}
                    onChange={(e) => setStoryCategory(e.target.value as any)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Secret Recipe">Secret Family Recipe</option>
                    <option value="Oral History">Oral History & Recollection</option>
                    <option value="Love Letter">Heirloom Letter</option>
                    <option value="Life Lesson">Life Lesson / Advice</option>
                    <option value="Family Lore">Family Lore & Legend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Approximate Year / Era
                  </label>
                  <input
                    type="number"
                    value={storyYear}
                    onChange={(e) => setStoryYear(Number(e.target.value))}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Shared / Told By *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Aunt Marianne)"
                    value={storyAuthor}
                    onChange={(e) => setStoryAuthor(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Story / History Prose *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write the background, origins, or memories connected to this recipe or story..."
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-3 text-sm text-[#2D2926] font-serif focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                {storyCategory === 'Secret Recipe' && (
                  <>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                        Ingredients (One item per line)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="3 cups flour&#10;1 tsp cinnamon&#10;1 cup organic butter"
                        value={recipeIngredients}
                        onChange={(e) => setRecipeIngredients(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-3 text-xs text-[#2D2926] font-mono focus:border-[#8C7355] focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                        Preparation Steps (One step per line)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Preheat oven to 350°F&#10;Whisk dry ingredients together in large ceramic bowl&#10;Bake for 45 minutes until golden brown"
                        value={recipeSteps}
                        onChange={(e) => setRecipeSteps(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-3 text-xs text-[#2D2926] font-serif focus:border-[#8C7355] focus:outline-hidden"
                      />
                    </div>
                  </>
                )}

              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white font-bold uppercase tracking-widest text-xs shadow-xs transition-all cursor-pointer"
              >
                Save Family Story / Recipe
              </button>
            </form>
          )}

          {/* TAB 3: Add News Announcement */}
          {activeTab === 'news' && (
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Announcement Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2026 Reunion Lake Tahoe Cabin Reservation Details"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value as any)}
                      className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden cursor-pointer"
                    >
                      <option value="Reunion Update">Reunion Update</option>
                      <option value="Celebration">Celebration</option>
                      <option value="Milestone">Milestone</option>
                      <option value="New Arrival">New Baby Arrival</option>
                      <option value="General">General Announcement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                      Posted By *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={newsAuthor}
                      onChange={(e) => setNewsAuthor(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                      Event Date (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. July 17–21, 2026"
                      value={newsEventDate}
                      onChange={(e) => setNewsEventDate(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lake Tahoe, CA"
                      value={newsLocation}
                      onChange={(e) => setNewsLocation(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Announcement Body *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Details about the reunion itinerary, RSVP deadlines, lodging, potluck signups..."
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-3 text-sm text-[#2D2926] font-serif focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white font-bold uppercase tracking-widest text-xs shadow-xs transition-all cursor-pointer"
              >
                Post Bulletin Notice
              </button>
            </form>
          )}

          {/* TAB 4: Add Birthday or Anniversary */}
          {activeTab === 'date' && (
            <form onSubmit={handleCalendarSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aunt Maggie's Birthday"
                    value={calTitle}
                    onChange={(e) => setCalTitle(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-sm text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                      Event Type
                    </label>
                    <select
                      value={calType}
                      onChange={(e) => setCalType(e.target.value as any)}
                      className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden cursor-pointer"
                    >
                      <option value="birthday">Birthday Celebration</option>
                      <option value="anniversary">Wedding Anniversary</option>
                      <option value="reunion">Family Gathering / Reunion</option>
                      <option value="memorial">Memorial Remembrance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                      Month &amp; Day (MM-DD) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 07-29"
                      value={calMonthDay}
                      onChange={(e) => setCalMonthDay(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] font-mono focus:border-[#8C7355] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Associate Family Member
                  </label>
                  <select
                    value={calMemberId}
                    onChange={(e) => setCalMemberId(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden cursor-pointer"
                  >
                    <option value="">None / General Event</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.firstName} {m.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8C7355] uppercase tracking-wider mb-1">
                    Notes / Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Celebration ideas, gift suggestions, or milestone notes..."
                    value={calDescription}
                    onChange={(e) => setCalDescription(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-3 text-xs text-[#2D2926] font-serif focus:border-[#8C7355] focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white font-bold uppercase tracking-widest text-xs shadow-xs transition-all cursor-pointer"
              >
                Save to Family Calendar
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
