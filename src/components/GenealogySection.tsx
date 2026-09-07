import React, { useState, useMemo } from 'react';
import { FamilyMember, PhotoItem, HistoricalDocument } from '../types';
import { 
  GitFork, 
  Users, 
  FileText, 
  MapPin, 
  Calendar, 
  Award, 
  Search, 
  Filter, 
  ChevronRight, 
  Heart, 
  ShieldCheck,
  Compass,
  BookOpen
} from 'lucide-react';

interface GenealogySectionProps {
  members: FamilyMember[];
  photos: PhotoItem[];
  onSelectMember: (memberId: string) => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const GenealogySection: React.FC<GenealogySectionProps> = ({
  members,
  photos,
  onSelectMember,
  onSelectPhoto
}) => {
  const [activeSubView, setActiveSubView] = useState<'tree' | 'roster' | 'documents'>('tree');
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [livingFilter, setLivingFilter] = useState<'all' | 'living' | 'ancestors'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // All historical documents aggregated
  const allDocuments = useMemo(() => {
    const docs: { doc: HistoricalDocument; member: FamilyMember }[] = [];
    members.forEach((m) => {
      if (m.historicalDocuments) {
        m.historicalDocuments.forEach((d) => {
          docs.push({ doc: d, member: m });
        });
      }
    });
    return docs;
  }, [members]);

  // Filtered members for roster
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      if (selectedGen !== 'all' && m.generation !== selectedGen) return false;
      if (livingFilter === 'living' && !m.isLiving) return false;
      if (livingFilter === 'ancestors' && m.isLiving) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullName = `${m.firstName} ${m.lastName} ${m.maidenName || ''} ${m.nickname || ''}`.toLowerCase();
        const bio = (m.bio || '').toLowerCase();
        const place = (m.birthPlace || '').toLowerCase();
        const prof = (m.profession || '').toLowerCase();
        return fullName.includes(q) || bio.includes(q) || place.includes(q) || prof.includes(q);
      }
      return true;
    });
  }, [members, selectedGen, livingFilter, searchQuery]);

  // Grouped members by generation for the generational chart
  const gen1 = members.filter((m) => m.generation === 1);
  const gen2 = members.filter((m) => m.generation === 2);
  const gen3 = members.filter((m) => m.generation === 3);
  const gen4 = members.filter((m) => m.generation === 4);

  const getPhotosForMember = (memberId: string) => {
    return photos.filter((p) => p.taggedMemberIds.includes(memberId));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Heritage Banner */}
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
                Hawthorne-Sterling-Chen Lineage
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2D2926]">
              Genealogy Records & Pedigree Tree
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2926]/70 mt-1.5 max-w-2xl leading-relaxed">
              Spanning 4 generations from the 1920s to today. Explore ancestor biographies, birth records, immigration ship manifests, and family branches.
            </p>
          </div>

          {/* Sub-view switcher */}
          <div className="flex items-center p-1 rounded-sm bg-[#2D2926]/5 text-xs font-semibold uppercase tracking-wider shrink-0">
            <button
              onClick={() => setActiveSubView('tree')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeSubView === 'tree' ? 'bg-white text-[#2D2926] shadow-xs font-bold' : 'text-[#2D2926]/60 hover:text-[#2D2926]'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Family Tree</span>
            </button>

            <button
              onClick={() => setActiveSubView('roster')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeSubView === 'roster' ? 'bg-white text-[#2D2926] shadow-xs font-bold' : 'text-[#2D2926]/60 hover:text-[#2D2926]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Roster</span>
            </button>

            <button
              onClick={() => setActiveSubView('documents')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeSubView === 'documents' ? 'bg-white text-[#2D2926] shadow-xs font-bold' : 'text-[#2D2926]/60 hover:text-[#2D2926]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Vault ({allDocuments.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: Visual Interactive Family Tree */}
      {activeSubView === 'tree' && (
        <div className="space-y-8">
          
          {/* Generation 1: The Patriarchs & Matriarchs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-sm bg-[#8C7355] text-white text-[10px] uppercase tracking-widest font-bold">
                Generation 1 (1920s)
              </span>
              <h3 className="text-base font-serif font-bold text-[#2D2926]">
                Founding Patriarch & Matriarch
              </h3>
              <div className="h-[1px] bg-[#2D2926]/10 flex-1 ml-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {gen1.map((member) => (
                <TreeMemberCard
                  key={member.id}
                  member={member}
                  photosCount={getPhotosForMember(member.id).length}
                  onSelectMember={onSelectMember}
                />
              ))}
            </div>
          </div>

          {/* Tree Branch Connector */}
          <div className="flex flex-col items-center my-2">
            <div className="w-[1px] h-6 bg-[#8C7355]/40" />
            <div className="w-16 h-[1px] bg-[#8C7355]/40" />
            <div className="w-[1px] h-6 bg-[#8C7355]/40" />
          </div>

          {/* Generation 2: The Children */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-sm bg-[#2D2926] text-[#FDFBF7] text-[10px] uppercase tracking-widest font-bold">
                Generation 2 (1940s–1960s)
              </span>
              <h3 className="text-base font-serif font-bold text-[#2D2926]">
                Children & Spouses (Hawthorne, Sterling & Vega Branches)
              </h3>
              <div className="h-[1px] bg-[#2D2926]/10 flex-1 ml-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gen2.map((member) => (
                <TreeMemberCard
                  key={member.id}
                  member={member}
                  photosCount={getPhotosForMember(member.id).length}
                  onSelectMember={onSelectMember}
                />
              ))}
            </div>
          </div>

          {/* Tree Branch Connector */}
          <div className="flex flex-col items-center my-2">
            <div className="w-[1px] h-6 bg-[#8C7355]/40" />
            <div className="w-24 h-[1px] bg-[#8C7355]/40" />
            <div className="w-[1px] h-6 bg-[#8C7355]/40" />
          </div>

          {/* Generation 3: Grandchildren */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-sm bg-[#8C7355]/80 text-white text-[10px] uppercase tracking-widest font-bold">
                Generation 3 (1980s–1990s)
              </span>
              <h3 className="text-base font-serif font-bold text-[#2D2926]">
                Grandchildren & Spouses
              </h3>
              <div className="h-[1px] bg-[#2D2926]/10 flex-1 ml-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {gen3.map((member) => (
                <TreeMemberCard
                  key={member.id}
                  member={member}
                  photosCount={getPhotosForMember(member.id).length}
                  onSelectMember={onSelectMember}
                />
              ))}
            </div>
          </div>

          {/* Tree Branch Connector */}
          <div className="flex flex-col items-center my-2">
            <div className="w-[1px] h-6 bg-[#8C7355]/40" />
            <div className="w-16 h-[1px] bg-[#8C7355]/40" />
            <div className="w-[1px] h-6 bg-[#8C7355]/40" />
          </div>

          {/* Generation 4: Great-Grandchildren */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-sm bg-emerald-900 text-emerald-100 text-[10px] uppercase tracking-widest font-bold">
                Generation 4 (2010s–Present)
              </span>
              <h3 className="text-base font-serif font-bold text-[#2D2926]">
                Great-Grandchildren (Next Generation)
              </h3>
              <div className="h-[1px] bg-[#2D2926]/10 flex-1 ml-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {gen4.map((member) => (
                <TreeMemberCard
                  key={member.id}
                  member={member}
                  photosCount={getPhotosForMember(member.id).length}
                  onSelectMember={onSelectMember}
                />
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB-VIEW 2: Searchable Member Roster */}
      {activeSubView === 'roster' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-[#FDFBF7] rounded-sm p-4 sm:p-5 border border-[#2D2926]/10 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-[#8C7355] mb-1 uppercase tracking-wider">
                Search Member
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8C7355] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Name, birthplace, profession..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm pl-8 pr-3 py-2 text-xs font-medium text-[#2D2926] focus:outline-hidden focus:border-[#8C7355]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8C7355] mb-1 uppercase tracking-wider">
                Filter by Generation
              </label>
              <select
                value={selectedGen}
                onChange={(e) => setSelectedGen(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs font-medium text-[#2D2926] focus:outline-hidden focus:border-[#8C7355] cursor-pointer"
              >
                <option value="all">All Generations (1–4)</option>
                <option value={1}>Generation 1: Patriarchs & Matriarchs</option>
                <option value={2}>Generation 2: Children & In-laws</option>
                <option value={3}>Generation 3: Grandchildren</option>
                <option value={4}>Generation 4: Great-Grandchildren</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8C7355] mb-1 uppercase tracking-wider">
                Living Status
              </label>
              <select
                value={livingFilter}
                onChange={(e) => setLivingFilter(e.target.value as any)}
                className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3 py-2 text-xs font-medium text-[#2D2926] focus:outline-hidden focus:border-[#8C7355] cursor-pointer"
              >
                <option value="all">All ({members.length})</option>
                <option value="living">Living Family Members ({members.filter((m) => m.isLiving).length})</option>
                <option value="ancestors">Ancestors in Remembrance ({members.filter((m) => !m.isLiving).length})</option>
              </select>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => onSelectMember(member.id)}
                className="artistic-frame bg-[#FDFBF7] rounded-sm p-4 sm:p-5 border border-[#2D2926]/10 shadow-xs hover:border-[#8C7355]/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={member.avatarUrl}
                    alt={member.firstName}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-sm object-cover ring-1 ring-[#8C7355]/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-serif font-bold text-[#2D2926] group-hover:text-[#8C7355] transition-colors truncate">
                        {member.firstName} {member.lastName}
                      </h4>
                      {member.nickname && (
                        <span className="text-xs text-[#8C7355] italic">
                          &ldquo;{member.nickname}&rdquo;
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#2D2926]/60 mt-0.5 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-[#8C7355]" />
                      <span>{member.birthDate.slice(0, 4)}</span>
                      {member.deathDate && <span>– {member.deathDate.slice(0, 4)}</span>}
                      {member.isLiving && <span className="text-emerald-700 font-semibold">(Living)</span>}
                    </div>

                    <div className="text-xs text-[#2D2926]/60 mt-0.5 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-[#8C7355] shrink-0" />
                      <span className="truncate">{member.birthPlace}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#2D2926]/70 line-clamp-2 mt-3 font-serif leading-relaxed">
                  {member.bio}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#2D2926]/10 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-sm bg-[#2D2926]/5 text-[#2D2926] font-mono text-[10px]">
                    GEN {member.generation}
                  </span>

                  <span className="text-[#8C7355] font-bold uppercase tracking-wider text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    <span>View Record</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: Historical Records & Documents Vault */}
      {activeSubView === 'documents' && (
        <div className="space-y-4">
          <div className="bg-[#FDFBF7] rounded-sm p-5 border border-[#2D2926]/10 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#8C7355] shrink-0" />
            <div>
              <h3 className="text-sm font-serif font-bold text-[#2D2926]">
                Official Historical Documents & Archival Registries
              </h3>
              <p className="text-xs text-[#2D2926]/70">
                Archival materials preserved in the family safe, including passenger manifests, military honorable discharge papers, and census records.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allDocuments.map(({ doc, member }) => (
              <div
                key={doc.id}
                onClick={() => onSelectMember(member.id)}
                className="artistic-frame bg-[#FDFBF7] rounded-sm p-5 border border-[#2D2926]/10 shadow-xs hover:border-[#8C7355]/40 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm bg-[#8C7355]/10 text-[#8C7355] flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[#2D2926] text-sm">
                        {doc.title}
                      </h4>
                      <span className="text-xs text-[#2D2926]/60 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-[#8C7355]" />
                        <span>{doc.date}</span> • <span className="uppercase text-[10px] font-bold text-[#8C7355]">{doc.type}</span>
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-sm bg-[#2D2926]/5 text-[#2D2926] shrink-0">
                    {member.firstName} {member.lastName}
                  </span>
                </div>

                <p className="text-xs text-[#2D2926]/80 leading-relaxed font-serif bg-[#2D2926]/5 p-3 rounded-sm border border-[#2D2926]/10">
                  {doc.description}
                </p>

                {doc.source && (
                  <div className="text-[11px] text-[#8C7355] italic">
                    Preserved source: {doc.source}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

// Tree Member Visual Card
interface TreeMemberCardProps {
  member: FamilyMember;
  photosCount: number;
  onSelectMember: (id: string) => void;
}

const TreeMemberCard: React.FC<TreeMemberCardProps> = ({
  member,
  photosCount,
  onSelectMember
}) => {
  return (
    <div
      onClick={() => onSelectMember(member.id)}
      className="artistic-frame bg-[#FDFBF7] rounded-sm p-3.5 border border-[#2D2926]/10 shadow-2xs hover:border-[#8C7355]/40 transition-all cursor-pointer flex items-center gap-3.5 group"
    >
      <div className="relative shrink-0">
        <img
          src={member.avatarUrl}
          alt={member.firstName}
          referrerPolicy="no-referrer"
          className="w-13 h-13 rounded-sm object-cover ring-1 ring-[#8C7355]/30 group-hover:ring-[#8C7355] transition-all"
        />
        {!member.isLiving && (
          <span className="absolute -bottom-1 -right-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#2D2926] text-[#FDFBF7]">
            †
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4 className="font-serif font-bold text-sm text-[#2D2926] group-hover:text-[#8C7355] transition-colors truncate">
            {member.firstName} {member.lastName}
          </h4>
          {member.maidenName && (
            <span className="text-xs text-[#8C7355] font-sans">
              (née {member.maidenName})
            </span>
          )}
        </div>

        <p className="text-xs text-[#2D2926]/60 font-mono">
          {member.birthDate.slice(0, 4)} {member.deathDate ? `– ${member.deathDate.slice(0, 4)}` : '• Present'}
        </p>

        <p className="text-[11px] text-[#2D2926]/70 truncate mt-0.5">
          {member.profession || member.birthPlace}
        </p>
      </div>

      <div className="text-right shrink-0">
        <span className="text-[10px] font-mono font-semibold text-[#8C7355] bg-[#8C7355]/10 px-2 py-1 rounded-sm border border-[#8C7355]/20 block uppercase">
          {photosCount} {photosCount === 1 ? 'record' : 'records'}
        </span>
      </div>
    </div>
  );
};
