export type Decade =
  | 'All'
  | '1920s'
  | '1930s'
  | '1940s'
  | '1950s'
  | '1960s'
  | '1970s'
  | '1980s'
  | '1990s'
  | '2000s'
  | '2010s'
  | '2020s';

export type EventCategory =
  | 'All'
  | 'Wedding'
  | 'Holiday'
  | 'Reunion'
  | 'Graduation'
  | 'Military'
  | 'Anniversary'
  | 'Summer Trip'
  | 'Everyday Life'
  | 'Immigration & Journey'
  | 'New Baby'
  | 'Milestone';

export interface HistoricalDocument {
  id: string;
  title: string;
  type: 'census' | 'immigration' | 'military' | 'marriage' | 'letter' | 'certificate';
  date: string;
  description: string;
  source?: string;
  documentUrl?: string;
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  nickname?: string;
  avatarUrl: string;
  birthDate: string; // YYYY-MM-DD or YYYY
  deathDate?: string; // YYYY-MM-DD or YYYY
  isLiving: boolean;
  birthPlace: string;
  currentLocation?: string;
  generation: 1 | 2 | 3 | 4; // 1 = Great-Grandparents, 2 = Grandparents/Parents, 3 = Current Gen, 4 = Children
  fatherId?: string;
  motherId?: string;
  spouseId?: string;
  bio: string;
  profession?: string;
  militaryService?: string;
  funFact?: string;
  favoriteMemory?: string;
  historicalDocuments?: HistoricalDocument[];
}

export interface PhotoComment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  date: string;
}

export interface AudioStory {
  title: string;
  narrator: string;
  durationSec: number;
  transcript: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  imageUrl: string;
  year: number;
  exactDate?: string;
  decade: Decade;
  location: string;
  eventType: EventCategory;
  taggedMemberIds: string[];
  description: string;
  contributedBy: string;
  colorTone?: 'black-white' | 'sepia' | 'vintage-color' | 'full-color';
  comments: PhotoComment[];
  audioStory?: AudioStory;
  likes?: number;
}

export interface MemoryStory {
  id: string;
  title: string;
  category: 'Oral History' | 'Secret Recipe' | 'Heirloom Story' | 'Love Letter' | 'Life Lesson' | 'Family Lore';
  author: string;
  authorMemberId?: string;
  yearEstimated: number;
  decade: Decade;
  content: string;
  recipeIngredients?: string[];
  recipeSteps?: string[];
  imageUrl?: string;
  likes: number;
  dateAdded: string;
  comments?: PhotoComment[];
}

export interface NewsAnnouncement {
  id: string;
  title: string;
  category: 'Celebration' | 'Reunion Update' | 'New Arrival' | 'Milestone' | 'General' | 'Memorial';
  date: string;
  author: string;
  content: string;
  pinned?: boolean;
  imageUrl?: string;
  rsvpCount?: number;
  eventDate?: string;
  location?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'birthday' | 'anniversary' | 'memorial' | 'reunion';
  dateMonthDay: string; // "MM-DD" e.g. "04-18"
  fullDate?: string; // "YYYY-MM-DD"
  originalYear?: number; // year born or married
  memberId?: string;
  memberSecondaryId?: string; // for anniversary spouse
  description: string;
  location?: string;
}

export type ActiveTab = 'timeline' | 'genealogy' | 'memories' | 'news' | 'calendar';
export type TextScale = 'sm' | 'base' | 'lg' | 'xl';

export interface FamilyArchiveData {
  familyName?: string;
  archiveTitle?: string;
  description?: string;
  establishedYear?: number | string;
  familyMembers?: FamilyMember[];
  photos?: PhotoItem[];
  memories?: MemoryStory[];
  news?: NewsAnnouncement[];
  calendarEvents?: CalendarEvent[];
  exportedAt?: string;
  version?: string;
}

export interface ArchiveValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    membersCount: number;
    photosCount: number;
    memoriesCount: number;
    newsCount: number;
    calendarEventsCount: number;
  };
  sanitizedData?: {
    familyMembers: FamilyMember[];
    photos: PhotoItem[];
    memories: MemoryStory[];
    news: NewsAnnouncement[];
    calendarEvents: CalendarEvent[];
    familyName?: string;
    archiveTitle?: string;
    description?: string;
  };
}
