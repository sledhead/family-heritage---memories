import React from 'react';
import { FamilyMember, PhotoItem } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Heart, 
  Award, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Users, 
  Camera,
  ChevronRight
} from 'lucide-react';

interface MemberDetailModalProps {
  member: FamilyMember | null;
  members: FamilyMember[];
  photos: PhotoItem[];
  onClose: () => void;
  onSelectMember: (memberId: string) => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  member,
  members,
  photos,
  onClose,
  onSelectMember,
  onSelectPhoto
}) => {
  if (!member) return null;

  const spouse = member.spouseId ? members.find((m) => m.id === member.spouseId) : null;
  const father = member.fatherId ? members.find((m) => m.id === member.fatherId) : null;
  const mother = member.motherId ? members.find((m) => m.id === member.motherId) : null;
  const children = members.filter(
    (m) => m.fatherId === member.id || m.motherId === member.id
  );
  const siblings = members.filter(
    (m) =>
      m.id !== member.id &&
      ((member.fatherId && m.fatherId === member.fatherId) ||
        (member.motherId && m.motherId === member.motherId))
  );

  const memberPhotos = photos.filter((p) => p.taggedMemberIds.includes(member.id));

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="artistic-frame relative bg-[#FDFBF7] w-full max-w-4xl rounded-sm shadow-2xl border border-[#2D2926]/20 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FDFBF7] border-b border-[#2D2926]/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-sm bg-[#8C7355] text-white">
              Generation {member.generation}
            </span>
            {member.isLiving ? (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm bg-emerald-100 text-emerald-800">
                Living Family Member
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm bg-[#2D2926]/5 text-[#2D2926]">
                Ancestor in Loving Memory
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-[#2D2926]/5 hover:bg-[#2D2926]/10 text-[#2D2926] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Profile Overview Card */}
          <div className="artistic-frame flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[#FDFBF7] p-6 rounded-sm border border-[#2D2926]/10 shadow-xs">
            <img
              src={member.avatarUrl}
              alt={member.firstName}
              referrerPolicy="no-referrer"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-sm object-cover ring-2 ring-[#8C7355]/30 shadow-xs shrink-0"
            />

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2926]">
                  {member.firstName} {member.lastName}
                </h2>
                {member.maidenName && (
                  <span className="text-sm font-serif text-[#2D2926]/60">
                    (née {member.maidenName})
                  </span>
                )}
                {member.nickname && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-sm bg-[#8C7355]/10 text-[#8C7355] border border-[#8C7355]/20 font-serif">
                    &ldquo;{member.nickname}&rdquo;
                  </span>
                )}
              </div>

              {/* Dates & Places */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#2D2926]/70 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8C7355]" />
                  <strong>Lifespan:</strong> {member.birthDate} {member.deathDate ? `– ${member.deathDate}` : '(Present)'}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8C7355]" />
                  <strong>Birthplace:</strong> {member.birthPlace}
                </span>

                {member.currentLocation && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <strong>Resides:</strong> {member.currentLocation}
                  </span>
                )}
              </div>

              {/* Profession */}
              {member.profession && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#2D2926] pt-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#8C7355]" />
                  <span><strong>Profession:</strong> {member.profession}</span>
                </div>
              )}

              {/* Military Service */}
              {member.militaryService && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-blue-900 bg-blue-50 px-3 py-1 rounded-sm border border-blue-200 w-fit">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span><strong>Military Service:</strong> {member.militaryService}</span>
                </div>
              )}
            </div>
          </div>

          {/* Biography & Storytelling */}
          <div className="artistic-frame bg-[#FDFBF7] p-6 rounded-sm border border-[#2D2926]/10 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#8C7355] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8C7355]" />
              Life Story & Recollections
            </h3>
            <p className="text-sm sm:text-base text-[#2D2926]/80 font-serif leading-relaxed">
              {member.bio}
            </p>

            {member.funFact && (
              <div className="mt-3 p-3.5 rounded-sm bg-[#8C7355]/5 border border-[#8C7355]/20 text-xs text-[#2D2926] space-y-1">
                <strong className="text-[#8C7355]">Family Fact:</strong> {member.funFact}
              </div>
            )}

            {member.favoriteMemory && (
              <div className="mt-2 p-3.5 rounded-sm bg-[#2D2926]/5 border border-[#2D2926]/10 text-xs text-[#2D2926] space-y-1 font-serif italic">
                <strong className="text-[#8C7355] not-italic">Cherished Recollection:</strong> &ldquo;{member.favoriteMemory}&rdquo;
              </div>
            )}
          </div>

          {/* Immediate Lineage & Family Ties */}
          <div className="artistic-frame bg-[#FDFBF7] p-6 rounded-sm border border-[#2D2926]/10 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-[#8C7355] uppercase tracking-widest flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#8C7355]" />
              Immediate Lineage & Family Ties
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Parents */}
              <div className="p-3 rounded-sm bg-transparent border border-[#2D2926]/15">
                <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block mb-1.5">
                  Parents
                </span>
                {father || mother ? (
                  <div className="space-y-1.5">
                    {father && (
                      <button
                        onClick={() => onSelectMember(father.id)}
                        className="text-xs text-[#2D2926] hover:text-[#8C7355] font-semibold block text-left truncate cursor-pointer"
                      >
                        Father: {father.firstName} {father.lastName}
                      </button>
                    )}
                    {mother && (
                      <button
                        onClick={() => onSelectMember(mother.id)}
                        className="text-xs text-[#2D2926] hover:text-[#8C7355] font-semibold block text-left truncate cursor-pointer"
                      >
                        Mother: {mother.firstName} {mother.lastName}
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-[#2D2926]/40 italic">Founding Generation</span>
                )}
              </div>

              {/* Spouse */}
              <div className="p-3 rounded-sm bg-transparent border border-[#2D2926]/15">
                <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block mb-1.5">
                  Spouse / Partner
                </span>
                {spouse ? (
                  <button
                    onClick={() => onSelectMember(spouse.id)}
                    className="text-xs text-[#2D2926] hover:text-[#8C7355] font-semibold text-left truncate cursor-pointer flex items-center gap-1"
                  >
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
                    <span>{spouse.firstName} {spouse.lastName}</span>
                  </button>
                ) : (
                  <span className="text-xs text-[#2D2926]/40 italic">None recorded</span>
                )}
              </div>

              {/* Children */}
              <div className="p-3 rounded-sm bg-transparent border border-[#2D2926]/15">
                <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block mb-1.5">
                  Children ({children.length})
                </span>
                {children.length > 0 ? (
                  <div className="space-y-1">
                    {children.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => onSelectMember(c.id)}
                        className="text-xs text-[#2D2926] hover:text-[#8C7355] font-semibold block text-left truncate cursor-pointer"
                      >
                        • {c.firstName} {c.lastName}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-[#2D2926]/40 italic">None recorded</span>
                )}
              </div>

              {/* Siblings */}
              <div className="p-3 rounded-sm bg-transparent border border-[#2D2926]/15">
                <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block mb-1.5">
                  Siblings ({siblings.length})
                </span>
                {siblings.length > 0 ? (
                  <div className="space-y-1">
                    {siblings.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onSelectMember(s.id)}
                        className="text-xs text-[#2D2926] hover:text-[#8C7355] font-semibold block text-left truncate cursor-pointer"
                      >
                        • {s.firstName} {s.lastName}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-[#2D2926]/40 italic">None recorded</span>
                )}
              </div>
            </div>
          </div>

          {/* Historical Documents Attached to Member */}
          {member.historicalDocuments && member.historicalDocuments.length > 0 && (
            <div className="artistic-frame bg-[#FDFBF7] p-6 rounded-sm border border-[#2D2926]/10 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#8C7355] uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#8C7355]" />
                Preserved Documents & Registries
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {member.historicalDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 rounded-sm bg-[#8C7355]/5 border border-[#8C7355]/20 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-xs text-[#2D2926]">
                        {doc.title}
                      </h4>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#8C7355]/15 text-[#8C7355]">
                        {doc.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#2D2926]/70 font-serif">
                      {doc.description}
                    </p>
                    <span className="text-[10px] font-mono text-[#8C7355] block pt-1">
                      Date of record: {doc.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tagged Photos Gallery for this Member */}
          <div className="artistic-frame bg-[#FDFBF7] p-6 rounded-sm border border-[#2D2926]/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#8C7355] uppercase tracking-widest flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-[#8C7355]" />
                Photographs Featuring {member.firstName} ({memberPhotos.length})
              </h3>
            </div>

            {memberPhotos.length === 0 ? (
              <p className="text-xs text-[#2D2926]/50 italic">No photos tagged for this member yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {memberPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      onClose();
                      onSelectPhoto(photo);
                    }}
                    className="group relative aspect-4/3 rounded-sm overflow-hidden bg-[#2D2926] border border-[#2D2926]/20 cursor-pointer shadow-xs hover:border-[#8C7355] transition-all"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#2D2926]/90 via-transparent to-transparent p-2.5 flex flex-col justify-end">
                      <span className="text-[10px] text-[#8C7355] font-mono font-bold">{photo.year}</span>
                      <h5 className="text-xs text-white font-medium line-clamp-1">{photo.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
