import React, { useState } from 'react';
import { PhotoItem, FamilyMember } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  Heart, 
  MessageSquare, 
  Volume2, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Send,
  Download,
  Share2,
  Check,
  Sparkles
} from 'lucide-react';

interface PhotoDetailModalProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  members: FamilyMember[];
  onClose: () => void;
  onSelectMember: (memberId: string) => void;
  onAddComment: (photoId: string, author: string, text: string) => void;
  onLikePhoto: (photoId: string) => void;
  onNavigatePhoto: (photo: PhotoItem) => void;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
  photo,
  photos,
  members,
  onClose,
  onSelectMember,
  onAddComment,
  onLikePhoto,
  onNavigatePhoto
}) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [colorFilter, setColorFilter] = useState<'original' | 'sepia' | 'bw'>('original');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const prevPhoto = currentIndex > 0 ? photos[currentIndex - 1] : null;
  const nextPhoto = currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const author = commentAuthor.trim() || 'Family Member';
    onAddComment(photo.id, author, commentText.trim());
    setCommentText('');
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getMember = (id: string) => members.find((m) => m.id === id);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        className="artistic-frame relative bg-[#FDFBF7] w-full max-w-5xl rounded-sm shadow-2xl border border-[#2D2926]/20 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FDFBF7] border-b border-[#2D2926]/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-sm bg-[#8C7355] text-white">
              {photo.decade}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm bg-[#2D2926]/5 text-[#2D2926]">
              {photo.eventType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Prev / Next */}
            {prevPhoto && (
              <button
                onClick={() => onNavigatePhoto(prevPhoto)}
                title="Previous photo"
                className="p-1.5 rounded-sm bg-transparent hover:bg-[#2D2926]/5 border border-[#2D2926]/20 text-[#2D2926] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {nextPhoto && (
              <button
                onClick={() => onNavigatePhoto(nextPhoto)}
                title="Next photo"
                className="p-1.5 rounded-sm bg-transparent hover:bg-[#2D2926]/5 border border-[#2D2926]/20 text-[#2D2926] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-1.5 px-2.5 rounded-sm bg-transparent hover:bg-[#2D2926]/5 border border-[#2D2926]/20 text-[#2D2926] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-[#2D2926]/5 hover:bg-[#2D2926]/10 text-[#2D2926] transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body (2 columns on tablet/desktop) */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#2D2926]/10">
          
          {/* Left Column: Big Image Display & Tone Controls */}
          <div className="lg:col-span-7 bg-[#2D2926] p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[320px] lg:min-h-[500px]">
            
            <div className="w-full h-full max-h-[550px] flex items-center justify-center overflow-hidden rounded-sm bg-black/40 border border-white/10">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className={`max-h-[520px] w-auto max-w-full object-contain rounded-xs shadow-2xl transition-all duration-300 ${
                  colorFilter === 'sepia'
                    ? 'sepia contrast-110'
                    : colorFilter === 'bw'
                    ? 'grayscale contrast-125'
                    : photo.colorTone === 'sepia'
                    ? 'sepia-[0.35]'
                    : photo.colorTone === 'black-white'
                    ? 'grayscale'
                    : ''
                }`}
              />
            </div>

            {/* Image Filter Toggles */}
            <div className="mt-3 flex items-center gap-2 bg-[#2D2926]/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 text-xs text-white/80">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider mr-1">Tone View:</span>
              <button
                onClick={() => setColorFilter('original')}
                className={`px-2 py-0.5 rounded-xs font-semibold uppercase text-[10px] tracking-wider cursor-pointer transition-colors ${
                  colorFilter === 'original' ? 'bg-[#8C7355] text-white font-bold' : 'hover:text-white'
                }`}
              >
                Original
              </button>
              <button
                onClick={() => setColorFilter('sepia')}
                className={`px-2 py-0.5 rounded-xs font-semibold uppercase text-[10px] tracking-wider cursor-pointer transition-colors ${
                  colorFilter === 'sepia' ? 'bg-[#8C7355] text-white font-bold' : 'hover:text-white'
                }`}
              >
                Archival Sepia
              </button>
              <button
                onClick={() => setColorFilter('bw')}
                className={`px-2 py-0.5 rounded-xs font-semibold uppercase text-[10px] tracking-wider cursor-pointer transition-colors ${
                  colorFilter === 'bw' ? 'bg-[#8C7355] text-white font-bold' : 'hover:text-white'
                }`}
              >
                B&W
              </button>
            </div>
          </div>

          {/* Right Column: Metadata, Oral History, Tagged People, Comments */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
            
            <div className="space-y-4">
              
              {/* Photo Title & Location */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D2926] leading-snug">
                  {photo.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#2D2926]/70 mt-2 font-mono">
                  <span className="flex items-center gap-1 font-semibold text-[#8C7355] bg-[#8C7355]/10 px-2 py-0.5 rounded-sm border border-[#8C7355]/20">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{photo.year}</span>
                    {photo.exactDate && <span>({photo.exactDate})</span>}
                  </span>

                  <span className="flex items-center gap-1 text-[#2D2926]/70">
                    <MapPin className="w-3.5 h-3.5 text-[#8C7355]" />
                    <span>{photo.location}</span>
                  </span>
                </div>
              </div>

              {/* Contributed by */}
              <div className="text-xs text-[#2D2926]/60 flex items-center gap-1.5 pt-1">
                <User className="w-3.5 h-3.5 text-[#8C7355]" />
                <span>Archived by <strong className="text-[#2D2926]">{photo.contributedBy}</strong></span>
              </div>

              {/* Tagged Family Members */}
              {photo.taggedMemberIds.length > 0 && (
                <div className="pt-3 border-t border-[#2D2926]/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] block mb-2">
                    Family in this Photograph:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {photo.taggedMemberIds.map((mId) => {
                      const member = getMember(mId);
                      if (!member) return null;
                      return (
                        <button
                          key={mId}
                          onClick={() => {
                            onClose();
                            onSelectMember(mId);
                          }}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm bg-[#FDFBF7] hover:bg-[#8C7355]/10 border border-[#2D2926]/15 hover:border-[#8C7355] transition-all cursor-pointer shadow-2xs group"
                        >
                          <img
                            src={member.avatarUrl}
                            alt={member.firstName}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-sm object-cover"
                          />
                          <span className="text-xs font-semibold text-[#2D2926] group-hover:text-[#8C7355]">
                            {member.firstName} {member.lastName}
                          </span>
                          <span className="text-[10px] font-mono text-[#8C7355]">GEN {member.generation}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="pt-3 border-t border-[#2D2926]/10">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] mb-1.5">
                  Story & Historical Context:
                </h4>
                <p className="text-sm text-[#2D2926]/80 leading-relaxed font-serif">
                  {photo.description}
                </p>
              </div>

              {/* Oral History Audio Card (if present) */}
              {photo.audioStory && (
                <div className="rounded-sm bg-[#8C7355]/5 border border-[#8C7355]/20 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-sm bg-[#8C7355] text-white flex items-center justify-center">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2D2926]">
                          {photo.audioStory.title}
                        </h4>
                        <p className="text-[11px] text-[#8C7355]">
                          Narrated by {photo.audioStory.narrator}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="px-3 py-1 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingAudio ? 'Pause Voice' : 'Listen'}</span>
                    </button>
                  </div>

                  {/* Transcript quote */}
                  <div className="bg-white/80 rounded-sm p-3 border border-[#8C7355]/15 text-xs text-[#2D2926]/80 italic font-serif leading-relaxed">
                    &ldquo;{photo.audioStory.transcript}&rdquo;
                  </div>
                </div>
              )}

              {/* Likes & Reactions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onLikePhoto(photo.id)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-transparent hover:bg-rose-50 border border-[#2D2926]/20 hover:border-rose-300 text-xs font-semibold text-[#2D2926] hover:text-rose-700 transition-all cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${photo.likes ? 'text-rose-500 fill-rose-500' : 'text-[#8C7355]'}`} />
                  <span className="font-mono">{photo.likes || 0} Likes</span>
                </button>

                <span className="text-xs text-[#2D2926]/60 font-mono">
                  {photo.comments.length} {photo.comments.length === 1 ? 'Comment' : 'Comments'}
                </span>
              </div>

              {/* Family Comments & Recollections Thread */}
              <div className="pt-3 border-t border-[#2D2926]/10 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8C7355]" />
                  Family Recollections & Notes:
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {photo.comments.length === 0 ? (
                    <p className="text-xs text-[#2D2926]/50 italic">No notes added yet. Be the first to share a recollection!</p>
                  ) : (
                    photo.comments.map((comment) => (
                      <div key={comment.id} className="bg-[#2D2926]/5 rounded-sm p-2.5 border border-[#2D2926]/10 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[#2D2926]/60">
                          <strong className="text-[#2D2926] font-semibold">{comment.author}</strong>
                          <span className="text-[10px] font-mono">{comment.date}</span>
                        </div>
                        <p className="text-[#2D2926]/80">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="space-y-2 pt-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="col-span-1 bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-2.5 py-1.5 text-xs text-[#2D2926] focus:outline-hidden focus:border-[#8C7355]"
                    />
                    <input
                      type="text"
                      placeholder="Write a memory about this photo..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="col-span-2 bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-2.5 py-1.5 text-xs text-[#2D2926] focus:outline-hidden focus:border-[#8C7355]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white text-xs uppercase tracking-wider font-bold disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post Memory Note</span>
                  </button>
                </form>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
