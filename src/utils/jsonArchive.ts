import { 
  FamilyMember, 
  PhotoItem, 
  MemoryStory, 
  NewsAnnouncement, 
  CalendarEvent, 
  FamilyArchiveData, 
  ArchiveValidationResult 
} from '../types';

/**
 * Validates and sanitizes raw input (object or JSON string) into a structured FamilyArchiveData.
 */
export function validateArchiveJson(input: unknown): ArchiveValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  let data: any = input;

  // If input is string, attempt parsing
  if (typeof input === 'string') {
    try {
      data = JSON.parse(input);
    } catch (e: any) {
      return {
        valid: false,
        errors: [`Invalid JSON format: ${e.message || 'Syntax error in JSON string'}`],
        warnings: [],
        stats: { membersCount: 0, photosCount: 0, memoriesCount: 0, newsCount: 0, calendarEventsCount: 0 }
      };
    }
  }

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: ['The loaded JSON is empty or not an object.'],
      warnings: [],
      stats: { membersCount: 0, photosCount: 0, memoriesCount: 0, newsCount: 0, calendarEventsCount: 0 }
    };
  }

  // Support both full archive object OR direct arrays (e.g. if someone uploaded just an array of photos)
  let rawMembers: any[] = [];
  let rawPhotos: any[] = [];
  let rawMemories: any[] = [];
  let rawNews: any[] = [];
  let rawCalendar: any[] = [];

  if (Array.isArray(data)) {
    // Determine type of array
    if (data.length > 0 && ('firstName' in data[0] || 'generation' in data[0])) {
      rawMembers = data;
      warnings.push('Detected a direct array of family members.');
    } else if (data.length > 0 && ('imageUrl' in data[0] || 'decade' in data[0])) {
      rawPhotos = data;
      warnings.push('Detected a direct array of photos.');
    } else if (data.length > 0 && ('recipeIngredients' in data[0] || 'category' in data[0])) {
      rawMemories = data;
      warnings.push('Detected a direct array of stories/recipes.');
    } else {
      errors.push('Array format unrecognized. Expected an object with familyMembers, photos, memories, news, or calendarEvents.');
    }
  } else {
    rawMembers = Array.isArray(data.familyMembers) ? data.familyMembers : (Array.isArray(data.members) ? data.members : []);
    rawPhotos = Array.isArray(data.photos) ? data.photos : (Array.isArray(data.vintagePhotos) ? data.vintagePhotos : []);
    rawMemories = Array.isArray(data.memories) ? data.memories : (Array.isArray(data.stories) ? data.stories : []);
    rawNews = Array.isArray(data.news) ? data.news : (Array.isArray(data.announcements) ? data.announcements : []);
    rawCalendar = Array.isArray(data.calendarEvents) ? data.calendarEvents : (Array.isArray(data.events) ? data.events : (Array.isArray(data.calendar) ? data.calendar : []));
  }

  // Check if anything at all was found
  const totalItems = rawMembers.length + rawPhotos.length + rawMemories.length + rawNews.length + rawCalendar.length;
  if (totalItems === 0) {
    errors.push('No recognized data collections found. Expected at least one of: familyMembers, photos, memories, news, calendarEvents.');
  }

  // Sanitize Family Members
  const sanitizedMembers: FamilyMember[] = rawMembers.map((m, idx) => {
    const id = m.id ? String(m.id) : `mem-${Date.now()}-${idx}`;
    const firstName = String(m.firstName || m.name?.split(' ')[0] || 'Family');
    const lastName = String(m.lastName || m.name?.split(' ').slice(1).join(' ') || 'Member');
    const gen = (m.generation === 1 || m.generation === 2 || m.generation === 3 || m.generation === 4) ? m.generation : 2;
    return {
      id,
      firstName,
      lastName,
      maidenName: m.maidenName ? String(m.maidenName) : undefined,
      nickname: m.nickname ? String(m.nickname) : undefined,
      avatarUrl: m.avatarUrl || m.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      birthDate: String(m.birthDate || m.born || '1950'),
      deathDate: m.deathDate ? String(m.deathDate) : (m.died ? String(m.died) : undefined),
      isLiving: typeof m.isLiving === 'boolean' ? m.isLiving : (m.deathDate ? false : true),
      birthPlace: String(m.birthPlace || m.place || 'Unknown Place'),
      currentLocation: m.currentLocation ? String(m.currentLocation) : undefined,
      generation: gen as (1 | 2 | 3 | 4),
      fatherId: m.fatherId ? String(m.fatherId) : undefined,
      motherId: m.motherId ? String(m.motherId) : undefined,
      spouseId: m.spouseId ? String(m.spouseId) : undefined,
      bio: String(m.bio || m.description || `${firstName} is a cherished member of the family lineage.`),
      profession: m.profession ? String(m.profession) : undefined,
      militaryService: m.militaryService ? String(m.militaryService) : undefined,
      funFact: m.funFact ? String(m.funFact) : undefined,
      favoriteMemory: m.favoriteMemory ? String(m.favoriteMemory) : undefined,
      historicalDocuments: Array.isArray(m.historicalDocuments) ? m.historicalDocuments : undefined
    };
  });

  // Sanitize Photos
  const sanitizedPhotos: PhotoItem[] = rawPhotos.map((p, idx) => {
    const id = p.id ? String(p.id) : `photo-${Date.now()}-${idx}`;
    const year = Number(p.year) || 1960;
    const decade = p.decade || (`${Math.floor(year / 10) * 10}s` as any);
    return {
      id,
      title: String(p.title || `Family Photograph (${year})`),
      imageUrl: String(p.imageUrl || p.url || p.src || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80'),
      year,
      exactDate: p.exactDate ? String(p.exactDate) : undefined,
      decade: decade || '1960s',
      location: String(p.location || 'Family Gathering'),
      eventType: p.eventType || 'Everyday Life',
      taggedMemberIds: Array.isArray(p.taggedMemberIds) ? p.taggedMemberIds.map(String) : [],
      description: String(p.description || 'Preserved family photograph.'),
      contributedBy: String(p.contributedBy || 'Family Archivist'),
      colorTone: p.colorTone || (year < 1965 ? 'sepia' : 'full-color'),
      comments: Array.isArray(p.comments) ? p.comments : [],
      audioStory: p.audioStory ? p.audioStory : undefined,
      likes: typeof p.likes === 'number' ? p.likes : 0
    };
  });

  // Sanitize Memories & Stories
  const sanitizedMemories: MemoryStory[] = rawMemories.map((m, idx) => {
    const id = m.id ? String(m.id) : `story-${Date.now()}-${idx}`;
    const yearEstimated = Number(m.yearEstimated) || 1970;
    const decade = m.decade || (`${Math.floor(yearEstimated / 10) * 10}s` as any);
    return {
      id,
      title: String(m.title || 'Family Recollection'),
      category: m.category || (m.recipeIngredients ? 'Secret Recipe' : 'Oral History'),
      author: String(m.author || 'Family Member'),
      authorMemberId: m.authorMemberId ? String(m.authorMemberId) : undefined,
      yearEstimated,
      decade,
      content: String(m.content || m.story || m.text || ''),
      recipeIngredients: Array.isArray(m.recipeIngredients) ? m.recipeIngredients.map(String) : undefined,
      recipeSteps: Array.isArray(m.recipeSteps) ? m.recipeSteps.map(String) : undefined,
      imageUrl: m.imageUrl ? String(m.imageUrl) : undefined,
      likes: typeof m.likes === 'number' ? m.likes : 0,
      dateAdded: String(m.dateAdded || new Date().toISOString().split('T')[0]),
      comments: Array.isArray(m.comments) ? m.comments : []
    };
  });

  // Sanitize News / Bulletin
  const sanitizedNews: NewsAnnouncement[] = rawNews.map((n, idx) => {
    const id = n.id ? String(n.id) : `news-${Date.now()}-${idx}`;
    return {
      id,
      title: String(n.title || 'Family Notice'),
      category: n.category || 'General',
      date: String(n.date || new Date().toISOString().split('T')[0]),
      author: String(n.author || 'Family Organizer'),
      content: String(n.content || n.message || ''),
      pinned: typeof n.pinned === 'boolean' ? n.pinned : false,
      imageUrl: n.imageUrl ? String(n.imageUrl) : undefined,
      rsvpCount: typeof n.rsvpCount === 'number' ? n.rsvpCount : 0,
      eventDate: n.eventDate ? String(n.eventDate) : undefined,
      location: n.location ? String(n.location) : undefined
    };
  });

  // Sanitize Calendar Events
  const sanitizedCalendar: CalendarEvent[] = rawCalendar.map((c, idx) => {
    const id = c.id ? String(c.id) : `cal-${Date.now()}-${idx}`;
    return {
      id,
      title: String(c.title || 'Family Date'),
      type: c.type || 'birthday',
      dateMonthDay: String(c.dateMonthDay || c.date || '01-01'),
      fullDate: c.fullDate ? String(c.fullDate) : undefined,
      originalYear: typeof c.originalYear === 'number' ? c.originalYear : undefined,
      memberId: c.memberId ? String(c.memberId) : undefined,
      memberSecondaryId: c.memberSecondaryId ? String(c.memberSecondaryId) : undefined,
      description: String(c.description || ''),
      location: c.location ? String(c.location) : undefined
    };
  });

  const valid = errors.length === 0;

  return {
    valid,
    errors,
    warnings,
    stats: {
      membersCount: sanitizedMembers.length,
      photosCount: sanitizedPhotos.length,
      memoriesCount: sanitizedMemories.length,
      newsCount: sanitizedNews.length,
      calendarEventsCount: sanitizedCalendar.length
    },
    sanitizedData: valid ? {
      familyMembers: sanitizedMembers,
      photos: sanitizedPhotos,
      memories: sanitizedMemories,
      news: sanitizedNews,
      calendarEvents: sanitizedCalendar,
      familyName: data.familyName ? String(data.familyName) : undefined,
      archiveTitle: data.archiveTitle ? String(data.archiveTitle) : undefined,
      description: data.description ? String(data.description) : undefined
    } : undefined
  };
}

/**
 * Downloads a structured JSON file to the user's computer.
 */
export function exportArchiveJson(data: FamilyArchiveData, filename?: string): void {
  const jsonOutput = {
    familyName: data.familyName || 'Hawthorne Family',
    archiveTitle: data.archiveTitle || 'Family Heritage & Vintage Photo Archive',
    description: data.description || 'Complete digital repository of family members, vintage photos, oral histories, secret recipes, news bulletins, and calendar events.',
    exportedAt: new Date().toISOString(),
    version: '2.0',
    familyMembers: data.familyMembers || [],
    photos: data.photos || [],
    memories: data.memories || [],
    news: data.news || [],
    calendarEvents: data.calendarEvents || []
  };

  const jsonString = JSON.stringify(jsonOutput, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  const defaultName = `family_archive_${new Date().toISOString().split('T')[0]}.json`;
  link.setAttribute('download', filename || defaultName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Fetches JSON archive data from an absolute or relative URL.
 */
export async function loadArchiveFromUrl(url: string): Promise<FamilyArchiveData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load JSON archive from URL (${response.status} ${response.statusText})`);
  }
  const json = await response.json();
  const validation = validateArchiveJson(json);
  if (!validation.valid || !validation.sanitizedData) {
    throw new Error(`Invalid archive format in JSON: ${validation.errors.join(', ')}`);
  }
  return validation.sanitizedData;
}

/**
 * Merges incoming archive data with current archive data, deduplicating by ID.
 */
export function mergeArchiveData(
  current: {
    familyMembers: FamilyMember[];
    photos: PhotoItem[];
    memories: MemoryStory[];
    news: NewsAnnouncement[];
    calendarEvents: CalendarEvent[];
  },
  incoming: {
    familyMembers: FamilyMember[];
    photos: PhotoItem[];
    memories: MemoryStory[];
    news: NewsAnnouncement[];
    calendarEvents: CalendarEvent[];
  }
) {
  const mergeById = <T extends { id: string }>(currentList: T[], incomingList: T[]): T[] => {
    const existingIds = new Set(currentList.map(item => item.id));
    const newItems = incomingList.filter(item => !existingIds.has(item.id));
    return [...currentList, ...newItems];
  };

  return {
    familyMembers: mergeById(current.familyMembers, incoming.familyMembers),
    photos: mergeById(current.photos, incoming.photos),
    memories: mergeById(current.memories, incoming.memories),
    news: mergeById(current.news, incoming.news),
    calendarEvents: mergeById(current.calendarEvents, incoming.calendarEvents)
  };
}

/**
 * Generates a clean Starter Template with sample data and documentation.
 */
export function generateStarterTemplate(): FamilyArchiveData {
  return {
    familyName: 'Your Family Name',
    archiveTitle: 'Our Family Heritage & Vintage Photo Archive',
    description: 'Quick start template for setting up family lineage, photographs, recipes, and milestones.',
    version: '2.0',
    familyMembers: [
      {
        id: 'mem-gen1-1',
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'Grandpa John',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        birthDate: '1930-05-15',
        deathDate: '2010-08-20',
        isLiving: false,
        birthPlace: 'Chicago, Illinois',
        generation: 1,
        spouseId: 'mem-gen1-2',
        bio: 'Patriarch and beloved grandfather. Dedicated his life to education and carpentry.',
        profession: 'High School Principal & Woodworker',
        funFact: 'Built his own wooden canoe in 1964.',
        favoriteMemory: 'Summers by the lake with all the grandchildren.'
      },
      {
        id: 'mem-gen1-2',
        firstName: 'Margaret',
        lastName: 'Doe',
        maidenName: 'Smith',
        nickname: 'Maggie',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        birthDate: '1932-11-04',
        isLiving: true,
        birthPlace: 'Springfield, Illinois',
        currentLocation: 'Chicago, IL',
        generation: 1,
        spouseId: 'mem-gen1-1',
        bio: 'Matriarch, master gardener, and legendary baker of pecan pies.',
        profession: 'Botanist & Community Leader'
      },
      {
        id: 'mem-gen2-1',
        firstName: 'Robert',
        lastName: 'Doe',
        nickname: 'Robbie',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        birthDate: '1960-03-22',
        isLiving: true,
        birthPlace: 'Chicago, Illinois',
        generation: 2,
        fatherId: 'mem-gen1-1',
        motherId: 'mem-gen1-2',
        bio: 'Architect, avid hiker, and family historian.',
        profession: 'Landscape Architect'
      }
    ],
    photos: [
      {
        id: 'photo-sample-1',
        title: 'Grandpa John & Maggie Wedding Day',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        year: 1954,
        exactDate: '1954-06-12',
        decade: '1950s',
        location: 'St. Mary Church, Chicago, IL',
        eventType: 'Wedding',
        taggedMemberIds: ['mem-gen1-1', 'mem-gen1-2'],
        description: 'Sunny afternoon after the ceremony surrounded by family and friends.',
        contributedBy: 'Margaret Doe',
        colorTone: 'sepia',
        comments: [],
        likes: 12
      }
    ],
    memories: [
      {
        id: 'story-sample-1',
        title: 'Nana Maggie\'s Famous Pecan Pie',
        category: 'Secret Recipe',
        author: 'Margaret Doe',
        yearEstimated: 1968,
        decade: '1960s',
        content: 'Passed down from Great-Grandma Clara, this pie was the centerpiece of every Thanksgiving table.',
        recipeIngredients: [
          '1 unbaked 9-inch pie crust',
          '3 large farm-fresh eggs',
          '1 cup dark brown sugar',
          '1 cup dark corn syrup or pure maple syrup',
          '1/3 cup melted unsalted butter',
          '1 tsp vanilla extract',
          '1 1/2 cups fresh Georgia pecan halves'
        ],
        recipeSteps: [
          'Preheat oven to 350°F (175°C).',
          'In a medium mixing bowl, whisk eggs, brown sugar, syrup, butter, and vanilla until smooth.',
          'Arrange pecan halves neatly across the bottom of the pie crust.',
          'Gently pour egg mixture over pecans (they will naturally float to top).',
          'Bake for 50 to 55 minutes until center is slightly set.',
          'Cool completely on wire rack before slicing.'
        ],
        likes: 18,
        dateAdded: '2026-01-15'
      }
    ],
    news: [
      {
        id: 'news-sample-1',
        title: 'Annual Summer Family Reunion 2026',
        category: 'Reunion Update',
        date: '2026-07-20',
        author: 'Robert Doe',
        content: 'Mark your calendars for our annual reunion gathering! Bring photos, memories, and your favorite dish.',
        eventDate: 'July 24–26, 2026',
        location: 'Lake Michigan Lakeside Park',
        pinned: true,
        rsvpCount: 14
      }
    ],
    calendarEvents: [
      {
        id: 'cal-sample-1',
        title: 'Nana Maggie\'s Birthday',
        type: 'birthday',
        dateMonthDay: '11-04',
        originalYear: 1932,
        memberId: 'mem-gen1-2',
        description: 'Send handmade birthday cards and floral bouquets!'
      }
    ]
  };
}
