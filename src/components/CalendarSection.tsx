import React, { useState, useMemo } from 'react';
import { CalendarEvent, FamilyMember } from '../types';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Cake, 
  Heart, 
  Sparkles, 
  MapPin, 
  PartyPopper, 
  Users, 
  PlusCircle, 
  ChevronRight, 
  Gift, 
  BellRing
} from 'lucide-react';

interface CalendarSectionProps {
  events: CalendarEvent[];
  members: FamilyMember[];
  onOpenAddModal: () => void;
  onSelectMember: (memberId: string) => void;
}

const MONTH_NAMES = [
  'All Year',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  events,
  members,
  onOpenAddModal,
  onSelectMember
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // 0 = All Year
  const [selectedType, setSelectedType] = useState<string>('All');
  const [wishesSent, setWishesSent] = useState<Record<string, boolean>>({});

  const currentMonthNum = new Date().getMonth() + 1; // 1-12

  const handleCelebrate = (eventId: string, title: string) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setWishesSent((prev) => ({ ...prev, [eventId]: true }));
  };

  const filteredEvents = useMemo(() => {
    return events
      .filter((ev) => {
        // Month filter
        if (selectedMonth > 0) {
          const monthStr = selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`;
          if (!ev.dateMonthDay.startsWith(monthStr)) return false;
        }
        // Type filter
        if (selectedType !== 'All' && ev.type !== selectedType) return false;
        return true;
      })
      .sort((a, b) => {
        return a.dateMonthDay.localeCompare(b.dateMonthDay);
      });
  }, [events, selectedMonth, selectedType]);

  const getMember = (id?: string) => (id ? members.find((m) => m.id === id) : null);

  const getMonthName = (monthDay: string) => {
    const mNum = parseInt(monthDay.split('-')[0], 10);
    return MONTH_NAMES[mNum] || '';
  };

  const getDayNum = (monthDay: string) => {
    return parseInt(monthDay.split('-')[1], 10);
  };

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
                Hawthorne Family Almanac
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2D2926]">
              Birthday & Milestone Calendar
            </h2>
            <p className="text-xs sm:text-sm text-[#2D2926]/70 mt-1.5 max-w-2xl leading-relaxed">
              Never miss a cousin&apos;s birthday, wedding anniversary, or memorial day. Send instant family well wishes!
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white text-xs uppercase tracking-widest font-bold shadow-xs transition-all cursor-pointer shrink-0 self-start md:self-auto active:scale-98"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Event Date</span>
          </button>
        </div>

        {/* Months Scrubber */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 pt-5 border-t border-[#2D2926]/10 no-scrollbar">
          {MONTH_NAMES.map((mName, idx) => {
            const isSelected = selectedMonth === idx;
            const isCurrent = idx === currentMonthNum;
            return (
              <button
                key={mName}
                onClick={() => setSelectedMonth(idx)}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#8C7355] text-white shadow-xs'
                    : 'bg-transparent hover:bg-[#2D2926]/5 text-[#2D2926] border border-[#2D2926]/15 hover:border-[#8C7355]'
                }`}
              >
                <span>{mName}</span>
                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Type Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7355] shrink-0">Filter:</span>
        {['All', 'birthday', 'anniversary', 'reunion', 'memorial'].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`text-xs px-3 py-1 rounded-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              selectedType === t
                ? 'bg-[#2D2926] text-white'
                : 'bg-[#FDFBF7] text-[#2D2926] border border-[#2D2926]/20 hover:border-[#8C7355]'
            }`}
          >
            {t === 'All' ? 'All Types' : `${t}s`}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((ev) => {
          const member = getMember(ev.memberId);
          const spouse = getMember(ev.memberSecondaryId);
          const isCelebrated = wishesSent[ev.id];
          const monthName = getMonthName(ev.dateMonthDay);
          const dayNum = getDayNum(ev.dateMonthDay);

          return (
            <div
              key={ev.id}
              className="artistic-frame bg-[#FDFBF7] rounded-sm p-5 border border-[#2D2926]/10 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#8C7355]/40 transition-all group"
            >
              <div className="space-y-3">
                {/* Date & Type Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-sm bg-[#8C7355]/10 border border-[#8C7355]/20 text-[#2D2926] flex flex-col items-center justify-center font-mono shrink-0">
                      <span className="text-[9px] uppercase font-bold text-[#8C7355]">{monthName.slice(0, 3)}</span>
                      <span className="text-base font-bold leading-none">{dayNum}</span>
                    </div>

                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        ev.type === 'birthday'
                          ? 'bg-rose-100 text-rose-800'
                          : ev.type === 'anniversary'
                          ? 'bg-[#8C7355]/15 text-[#8C7355]'
                          : ev.type === 'reunion'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#2D2926]/5 text-[#2D2926]'
                      }`}>
                        {ev.type}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#2D2926] mt-1 line-clamp-1">
                        {ev.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Member avatars if attached */}
                {(member || spouse) && (
                  <div className="flex items-center gap-2 pt-1">
                    {member && (
                      <button
                        onClick={() => onSelectMember(member.id)}
                        className="flex items-center gap-1.5 text-xs text-[#2D2926] hover:text-[#8C7355] font-medium cursor-pointer"
                      >
                        <img
                          src={member.avatarUrl}
                          alt={member.firstName}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-sm object-cover ring-1 ring-[#8C7355]/30"
                        />
                        <span className="truncate">{member.firstName}</span>
                      </button>
                    )}
                    {spouse && (
                      <>
                        <span className="text-xs text-[#8C7355]">&amp;</span>
                        <button
                          onClick={() => onSelectMember(spouse.id)}
                          className="flex items-center gap-1.5 text-xs text-[#2D2926] hover:text-[#8C7355] font-medium cursor-pointer"
                        >
                          <img
                            src={spouse.avatarUrl}
                            alt={spouse.firstName}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-sm object-cover ring-1 ring-[#8C7355]/30"
                          />
                          <span className="truncate">{spouse.firstName}</span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-[#2D2926]/70 font-serif leading-relaxed">
                  {ev.description}
                </p>

                {/* Location */}
                {ev.location && (
                  <div className="text-[11px] text-[#2D2926]/60 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-[#8C7355]" />
                    <span>{ev.location}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#2D2926]/10 flex items-center justify-between">
                {ev.type === 'birthday' || ev.type === 'anniversary' ? (
                  <button
                    onClick={() => handleCelebrate(ev.id, ev.title)}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isCelebrated
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-[#2D2926]/5 hover:bg-[#8C7355]/10 hover:text-[#8C7355] text-[#2D2926]'
                    }`}
                  >
                    <PartyPopper className={`w-3.5 h-3.5 ${isCelebrated ? 'text-rose-600' : 'text-[#8C7355]'}`} />
                    <span>{isCelebrated ? 'Wishes Sent! 🎉' : 'Send Well Wishes'}</span>
                  </button>
                ) : (
                  <div className="text-[11px] font-mono text-[#8C7355] w-full text-center py-1 uppercase tracking-wider">
                    Hawthorne Family Record
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
