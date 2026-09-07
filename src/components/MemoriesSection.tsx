import React, { useState } from 'react';
import { MemoryStory, FamilyMember } from '../types';
import { 
  BookOpen, 
  Utensils, 
  Heart, 
  Sparkles, 
  Calendar, 
  User, 
  Volume2, 
  PlusCircle, 
  ChefHat, 
  Scroll, 
  Flame, 
  Send,
  MessageSquare,
  Check
} from 'lucide-react';

interface MemoriesSectionProps {
  memories: MemoryStory[];
  members: FamilyMember[];
  onOpenAddModal: () => void;
  onLikeMemory: (id: string) => void;
  onAddMemoryComment: (memoryId: string, author: string, text: string) => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({
  memories,
  members,
  onOpenAddModal,
  onLikeMemory,
  onAddMemoryComment
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const categories = [
    'All',
    'Secret Recipe',
    'Oral History',
    'Love Letter',
    'Life Lesson',
    'Family Lore'
  ];

  const filteredMemories = memories.filter((m) => {
    if (selectedCategory !== 'All' && m.category !== selectedCategory) return false;
    return true;
  });

  const handleSpeak = (story: MemoryStory) => {
    if (!('speechSynthesis' in window)) return;
    
    if (speakingId === story.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${story.title}. A ${story.category} shared by ${story.author}. ${story.content}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(story.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCommentSubmit = (e: React.FormEvent, memoryId: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddMemoryComment(memoryId, newCommentAuthor.trim() || 'Family Member', newCommentText.trim());
    setNewCommentText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Heritage Banner */}
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
                Oral Histories & Culinary Lore
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2D2926]">
              Heirloom Stories & Secret Recipes
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2926]/70 mt-1.5 max-w-2xl leading-relaxed">
              Cherished recipes passed down through kitchen tables, wartime love letters, and folklore told around campfires.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white text-xs uppercase tracking-widest font-bold shadow-xs transition-all cursor-pointer shrink-0 self-start md:self-auto active:scale-98"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Contribute</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 pt-5 border-t border-[#2D2926]/10 no-scrollbar">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#8C7355] text-white shadow-xs'
                    : 'bg-transparent hover:bg-[#2D2926]/5 text-[#2D2926] border border-[#2D2926]/15 hover:border-[#8C7355]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stories & Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMemories.map((story) => {
          const isRecipe = story.category === 'Secret Recipe';
          const isAudioPlaying = speakingId === story.id;

          return (
            <div
              key={story.id}
              className={`artistic-frame bg-[#FDFBF7] rounded-sm p-6 border shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                isRecipe ? 'border-[#8C7355]/40 ring-1 ring-[#8C7355]/20' : 'border-[#2D2926]/10'
              }`}
            >
              <div className="space-y-3">
                
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm flex items-center gap-1.5 ${
                    isRecipe 
                      ? 'bg-[#8C7355]/10 text-[#8C7355] border border-[#8C7355]/30' 
                      : 'bg-[#2D2926]/5 text-[#2D2926] border border-[#2D2926]/10'
                  }`}>
                    {isRecipe ? <ChefHat className="w-3 h-3" /> : <Scroll className="w-3 h-3" />}
                    <span>{story.category}</span>
                  </span>

                  <span className="text-[10px] font-mono text-[#8C7355] bg-[#8C7355]/10 px-2.5 py-1 rounded-sm uppercase">
                    Circa {story.yearEstimated} ({story.decade})
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-[#2D2926] leading-snug">
                  {story.title}
                </h3>

                {/* Author attribution */}
                <div className="flex items-center gap-2 text-xs text-[#2D2926]/60">
                  <User className="w-3.5 h-3.5 text-[#8C7355]" />
                  <span>Shared by <strong className="text-[#2D2926]">{story.author}</strong></span>
                </div>

                {/* Optional Image */}
                {story.imageUrl && (
                  <div className="aspect-16/9 rounded-sm overflow-hidden bg-[#2D2926] border border-[#2D2926]/10">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Main Prose Content */}
                <p className="text-sm text-[#2D2926]/80 font-serif leading-relaxed">
                  {story.content}
                </p>

                {/* Recipe Ingredients & Steps (if recipe) */}
                {isRecipe && story.recipeIngredients && (
                  <div className="mt-4 p-4 rounded-sm bg-[#8C7355]/5 border border-[#8C7355]/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5 text-[#8C7355]" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7355]">
                        Heirloom Ingredients:
                      </h4>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#2D2926]/80">
                      {story.recipeIngredients.map((ing, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#8C7355] font-bold">•</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>

                    {story.recipeSteps && (
                      <div className="pt-3 border-t border-[#8C7355]/20 space-y-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7355]">
                          Preparation Notes:
                        </h4>
                        <ol className="space-y-1.5 text-xs text-[#2D2926]/80 list-decimal list-inside leading-relaxed font-serif">
                          {story.recipeSteps.map((step, idx) => (
                            <li key={idx} className="pl-1">
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Footer with Read Aloud, Like, and Comments */}
              <div className="pt-4 border-t border-[#2D2926]/10 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Read Aloud button */}
                    <button
                      onClick={() => handleSpeak(story)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        isAudioPlaying
                          ? 'bg-[#8C7355] text-white animate-pulse'
                          : 'bg-transparent hover:bg-[#8C7355]/10 text-[#2D2926] border border-[#2D2926]/20'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#8C7355]" />
                      <span>{isAudioPlaying ? 'Stop Audio' : 'Listen'}</span>
                    </button>

                    {/* Like button */}
                    <button
                      onClick={() => onLikeMemory(story.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-transparent hover:bg-rose-50 hover:text-rose-600 text-[#2D2926] border border-[#2D2926]/20 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${story.likes > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                      <span className="font-mono text-xs">{story.likes}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveStoryId(activeStoryId === story.id ? null : story.id)}
                    className="text-xs uppercase tracking-wider font-bold text-[#8C7355] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{story.comments ? story.comments.length : 0} Notes</span>
                  </button>
                </div>

                {/* Comments Accordion */}
                {activeStoryId === story.id && (
                  <div className="pt-3 border-t border-[#2D2926]/10 space-y-2.5">
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355]">
                      Family Notes:
                    </h5>

                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {story.comments && story.comments.length > 0 ? (
                        story.comments.map((c) => (
                          <div key={c.id} className="bg-[#2D2926]/5 rounded-sm p-2 text-xs">
                            <div className="flex items-center justify-between text-[#2D2926]/60 text-[10px] font-mono">
                              <strong className="text-[#2D2926]">{c.author}</strong>
                              <span>{c.date}</span>
                            </div>
                            <p className="text-[#2D2926]/80 mt-0.5">{c.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[#2D2926]/50 italic">No notes yet. Add one below!</p>
                      )}
                    </div>

                    <form onSubmit={(e) => handleCommentSubmit(e, story.id)} className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newCommentAuthor}
                          onChange={(e) => setNewCommentAuthor(e.target.value)}
                          className="col-span-1 bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-2.5 py-1.5 text-xs text-[#2D2926] focus:outline-hidden focus:border-[#8C7355]"
                        />
                        <input
                          type="text"
                          placeholder="Leave a note or memory..."
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          className="col-span-2 bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-2.5 py-1.5 text-xs text-[#2D2926] focus:outline-hidden focus:border-[#8C7355]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!newCommentText.trim()}
                        className="w-full py-1.5 rounded-sm bg-[#8C7355] text-white text-xs uppercase tracking-wider font-bold disabled:opacity-50 hover:bg-[#735D43] transition-colors cursor-pointer"
                      >
                        Add Note
                      </button>
                    </form>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
