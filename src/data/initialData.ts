import { FamilyMember, PhotoItem, MemoryStory, NewsAnnouncement, CalendarEvent } from '../types';

export const initialFamilyMembers: FamilyMember[] = [
  // Generation 1: Patriarchs & Matriarchs
  {
    id: 'mem-1',
    firstName: 'Arthur',
    lastName: 'Hawthorne',
    nickname: 'Grandpa Artie',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    birthDate: '1921-04-12',
    deathDate: '2008-11-19',
    isLiving: false,
    birthPlace: 'Boston, Massachusetts',
    generation: 1,
    spouseId: 'mem-2',
    bio: 'Arthur was a carpenter and Navy veteran of WWII (USS Intrepid). Known for his dry wit, handmade rocking chairs, and deep love for storytelling around the fireplace.',
    profession: 'Master Carpenter & Shipwright',
    militaryService: 'US Navy Petty Officer 2nd Class (1942–1945)',
    funFact: 'Could whistle four-part harmony tunes and never lost a game of cribbage.',
    favoriteMemory: 'Building the family cabin on Lake Winnipesaukee with his sons in 1968.',
    historicalDocuments: [
      {
        id: 'doc-1',
        title: 'US Navy Honorable Discharge Paper',
        type: 'military',
        date: '1945-12-04',
        description: 'Discharge document from US Naval Station Boston with commendation for service in the Pacific Theatre.',
        source: 'National Archives & Family Heirloom Chest',
      },
      {
        id: 'doc-2',
        title: '1930 US Federal Census Record',
        type: 'census',
        date: '1930-04-15',
        description: 'Listing Arthur at age 9 living with parents Joseph and Clara on Dorchester Ave, Boston.',
      }
    ]
  },
  {
    id: 'mem-2',
    firstName: 'Eleanor',
    lastName: 'Hawthorne',
    maidenName: 'O\'Connor',
    nickname: 'Nana Ellie',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    birthDate: '1924-09-08',
    deathDate: '2015-03-22',
    isLiving: false,
    birthPlace: 'Galway, Ireland',
    generation: 1,
    spouseId: 'mem-1',
    bio: 'Eleanor immigrated through Ellis Island in 1934. She became a beloved primary school teacher, master baker, and community choir singer. She kept every letter ever written to her.',
    profession: 'Elementary School Teacher & Musician',
    funFact: 'Her secret cardamom apple spice cake recipe won 1st prize at the 1962 County Fair.',
    favoriteMemory: 'The Sunday dinners when all the children and cousins packed into her kitchen in Roslindale.',
    historicalDocuments: [
      {
        id: 'doc-3',
        title: 'SS Laconia Passenger Manifest',
        type: 'immigration',
        date: '1934-06-18',
        description: 'Ship manifest showing 10-year-old Eleanor travelling with her mother Bridget from Cobh to Boston.',
      },
      {
        id: 'doc-4',
        title: 'Certificate of Marriage - St. Joseph\'s Parish',
        type: 'marriage',
        date: '1946-06-22',
        description: 'Marriage registry to Arthur Hawthorne, witnessed by Thomas Vance and Mary O\'Connor.',
      }
    ]
  },

  // Generation 2: Children of Arthur & Eleanor
  {
    id: 'mem-3',
    firstName: 'Thomas',
    lastName: 'Hawthorne',
    nickname: 'Tommy',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    birthDate: '1948-02-14',
    isLiving: true,
    birthPlace: 'Boston, Massachusetts',
    currentLocation: 'Portsmouth, New Hampshire',
    generation: 2,
    fatherId: 'mem-1',
    motherId: 'mem-2',
    spouseId: 'mem-4',
    bio: 'Thomas inherited his father\'s craftsmanship and ran Hawthorne Architectural Woodworking for 35 years. Passionate about sailing, vintage cars, and family genealogies.',
    profession: 'Architectural Woodworker (Retired)',
    funFact: 'Restored a 1967 Austin-Healey Sprite convertible by hand in his garage.',
    favoriteMemory: 'Teaching his daughter Clara how to steer a sailboat in Casco Bay.'
  },
  {
    id: 'mem-4',
    firstName: 'Marianne',
    lastName: 'Hawthorne',
    maidenName: 'Dupont',
    nickname: 'Mary',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    birthDate: '1951-11-03',
    isLiving: true,
    birthPlace: 'Montreal, Canada',
    currentLocation: 'Portsmouth, New Hampshire',
    generation: 2,
    spouseId: 'mem-3',
    bio: 'Botanist and master gardener. Marianne creates pressed flower botanical guides and maintains the famous family heirloom hydrangea collection.',
    profession: 'Botanist & High School Science Teacher',
    funFact: 'Speaks fluent French and can name over 400 native New England plant species on sight.',
    favoriteMemory: 'The 1986 summer road trip all the way to Nova Scotia with a canvas pop-up tent.'
  },
  {
    id: 'mem-5',
    firstName: 'Margaret',
    lastName: 'Sterling',
    maidenName: 'Hawthorne',
    nickname: 'Aunt Maggie',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    birthDate: '1953-07-29',
    isLiving: true,
    birthPlace: 'Boston, Massachusetts',
    currentLocation: 'Boulder, Colorado',
    generation: 2,
    fatherId: 'mem-1',
    motherId: 'mem-2',
    spouseId: 'mem-6',
    bio: 'Pediatric nurse practitioner and avid landscape photographer. Margaret has hiked every 4,000-footer in New England and several 14ers in Colorado.',
    profession: 'Pediatric Nurse Practitioner',
    funFact: 'Ran the Boston Marathon three times (1979, 1982, 1985).',
    favoriteMemory: 'Singing Irish folk songs around the campfire with Nana Ellie.'
  },
  {
    id: 'mem-6',
    firstName: 'David',
    lastName: 'Sterling',
    nickname: 'Dave',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    birthDate: '1950-05-18',
    isLiving: true,
    birthPlace: 'Denver, Colorado',
    currentLocation: 'Boulder, Colorado',
    generation: 2,
    spouseId: 'mem-5',
    bio: 'Civil engineer and amateur astronomer. Dave can point out every constellation and loves setting up his telescope on family reunion nights.',
    profession: 'Civil Engineer (Bridges & Waterways)',
    funFact: 'Built a 12-inch Dobsonian telescope in his workshop.',
    favoriteMemory: 'Watching Halley\'s Comet in 1986 with all the nephews and nieces.'
  },
  {
    id: 'mem-7',
    firstName: 'Robert',
    lastName: 'Hawthorne',
    nickname: 'Uncle Bob',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    birthDate: '1957-10-15',
    isLiving: true,
    birthPlace: 'Boston, Massachusetts',
    currentLocation: 'Seattle, Washington',
    generation: 2,
    fatherId: 'mem-1',
    motherId: 'mem-2',
    spouseId: 'mem-8',
    bio: 'Commercial pilot and aviation historian. Bob has flown across 45 countries and always brings back handcrafted souvenirs for the annual Christmas grab-bag.',
    profession: 'Airline Captain & Flight Instructor',
    funFact: 'Has logged over 18,000 hours in the cockpit without ever getting airsick.',
    favoriteMemory: 'Taking his parents Arthur & Eleanor on their 50th wedding anniversary flight over Cape Cod.'
  },
  {
    id: 'mem-8',
    firstName: 'Elena',
    lastName: 'Hawthorne',
    maidenName: 'Vega',
    nickname: 'Lena',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    birthDate: '1960-03-24',
    isLiving: true,
    birthPlace: 'San Francisco, California',
    currentLocation: 'Seattle, Washington',
    generation: 2,
    spouseId: 'mem-7',
    bio: 'Architect and watercolor artist. Elena designed the renovated family lake house and illustrated the Hawthorne Family Heirloom Cookbook.',
    profession: 'Architectural Designer & Artist',
    funFact: 'Maintains an orchard of heirloom apple trees in her backyard.',
    favoriteMemory: 'Painting plein-air watercolors at the 2010 Golden Gate family picnic.'
  },

  // Generation 3: Grandchildren
  {
    id: 'mem-9',
    firstName: 'Clara',
    lastName: 'Hawthorne-Chen',
    nickname: 'Clara',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    birthDate: '1982-06-11',
    isLiving: true,
    birthPlace: 'Cambridge, Massachusetts',
    currentLocation: 'Boston, Massachusetts',
    generation: 3,
    fatherId: 'mem-3',
    motherId: 'mem-4',
    spouseId: 'mem-10',
    bio: 'Software engineer, archivist of family digital records, and organizer of the annual family reunions. Mother to Maya and Leo.',
    profession: 'Software Systems Architect',
    funFact: 'Has digitized over 2,500 35mm film slides and Super 8 tapes from the attic.',
    favoriteMemory: 'Learning wood-carving with Grandpa Artie in his basement shop with sawdust everywhere.'
  },
  {
    id: 'mem-10',
    firstName: 'Marcus',
    lastName: 'Chen',
    nickname: 'Marc',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    birthDate: '1980-08-30',
    isLiving: true,
    birthPlace: 'San Jose, California',
    currentLocation: 'Boston, Massachusetts',
    generation: 3,
    spouseId: 'mem-9',
    bio: 'High school history teacher and barbecue enthusiast. Marcus takes charge of the smoker during every summer family gathering.',
    profession: 'High School American History Teacher',
    funFact: 'Master of Texas-style 14-hour brisket and sourdough pizza.',
    favoriteMemory: 'The 2021 Thanksgiving touch football game in 4 inches of fresh snow.'
  },
  {
    id: 'mem-11',
    firstName: 'Lucas',
    lastName: 'Sterling',
    nickname: 'Luke',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    birthDate: '1985-01-20',
    isLiving: true,
    birthPlace: 'Denver, Colorado',
    currentLocation: 'San Francisco, California',
    generation: 3,
    fatherId: 'mem-6',
    motherId: 'mem-5',
    bio: 'Documentary filmmaker and outdoor expedition guide. Travels the world capturing stories of traditional artisans and historic preservation.',
    profession: 'Documentary Cinematographer',
    funFact: 'Filmed penguins in Antarctica and summited Mount Kilimanjaro.',
    favoriteMemory: 'Campfire storytelling with Aunt Maggie under the Colorado stars.'
  },
  {
    id: 'mem-12',
    firstName: 'Julian',
    lastName: 'Hawthorne',
    nickname: 'Jules',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    birthDate: '1991-12-05',
    isLiving: true,
    birthPlace: 'Seattle, Washington',
    currentLocation: 'Brooklyn, New York',
    generation: 3,
    fatherId: 'mem-7',
    motherId: 'mem-8',
    bio: 'Jazz saxophonist and sound designer. Composes film scores and brings his acoustic guitar to every holiday gathering.',
    profession: 'Music Producer & Composer',
    funFact: 'Recorded acoustic versions of Nana Ellie\'s favorite Irish folk songs.',
    favoriteMemory: 'Playing the piano duet with Nana Ellie when he was 8 years old.'
  },

  // Generation 4: Great-Grandchildren (Youth / Kids)
  {
    id: 'mem-13',
    firstName: 'Maya',
    lastName: 'Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    birthDate: '2014-04-18',
    isLiving: true,
    birthPlace: 'Boston, Massachusetts',
    currentLocation: 'Boston, Massachusetts',
    generation: 4,
    fatherId: 'mem-10',
    motherId: 'mem-9',
    bio: 'Maya loves gymnastics, marine biology, and reading adventure books. She is the current family chess champion among the kids.',
    profession: '5th Grade Student & Aspiring Marine Biologist',
    funFact: 'Has read the entire Harry Potter and Percy Jackson series twice.',
    favoriteMemory: 'Finding a sea star at Cape Cod with Grandpa Tommy.'
  },
  {
    id: 'mem-14',
    firstName: 'Leo',
    lastName: 'Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=400&q=80',
    birthDate: '2018-09-27',
    isLiving: true,
    birthPlace: 'Boston, Massachusetts',
    currentLocation: 'Boston, Massachusetts',
    generation: 4,
    fatherId: 'mem-10',
    motherId: 'mem-9',
    bio: 'Leo loves LEGO architecture, building treehouses, and making dinosaur noises at dinner.',
    profession: '1st Grade Student & Master LEGO Builder',
    funFact: 'Can name 52 different dinosaur species by their scientific names.',
    favoriteMemory: 'Catching his first sunny fish with Uncle Luke in Lake Winnipesaukee.'
  }
];

export const initialPhotos: PhotoItem[] = [
  {
    id: 'p-1',
    title: 'Arthur & Eleanor Wedding Day in Roslindale',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    year: 1946,
    exactDate: '1946-06-22',
    decade: '1940s',
    location: 'Roslindale, Massachusetts',
    eventType: 'Wedding',
    taggedMemberIds: ['mem-1', 'mem-2'],
    description: 'Arthur and Eleanor right after their ceremony at St. Joseph\'s Parish. Arthur wore his Navy dress uniform with his ribbons, and Eleanor wore a handcrafted lace gown sewn by her sister Mary.',
    contributedBy: 'Thomas Hawthorne',
    colorTone: 'sepia',
    likes: 24,
    comments: [
      {
        id: 'c-1',
        author: 'Margaret Sterling',
        text: 'Look at that radiant smile on Nana Ellie! Mom always said her veil was borrowed from her Galway cousin.',
        date: '2024-03-12'
      },
      {
        id: 'c-2',
        author: 'Clara Hawthorne-Chen',
        text: 'I still have the lace handkerchief from this bouquet framed in our hallway.',
        date: '2024-04-05'
      }
    ],
    audioStory: {
      title: 'The Day We Wed',
      narrator: 'Eleanor Hawthorne (Recorded 1998)',
      durationSec: 142,
      transcript: 'It was a warm, bright Saturday in June. The church bells were ringing all down South Street. Artie was so nervous his hands were shaking when he slipped the gold band on my finger, but as soon as we stepped out onto the granite steps, he whispered: "We made it home, Ellie."'
    }
  },
  {
    id: 'p-2',
    title: 'Young Arthur in His Carpenter Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    year: 1938,
    exactDate: '1938-10-14',
    decade: '1930s',
    location: 'Dorchester, Massachusetts',
    eventType: 'Everyday Life',
    taggedMemberIds: ['mem-1'],
    description: 'Arthur at age 17 learning traditional dovetail jointing in his father Joseph\'s carpentry shop on Dorchester Ave. The hand planes in this photo are still in use today.',
    contributedBy: 'Thomas Hawthorne',
    colorTone: 'black-white',
    likes: 18,
    comments: [
      {
        id: 'c-3',
        author: 'Thomas Hawthorne',
        text: 'Those exact Stanley bench planes hanging on the wall are now on my workbench in Portsmouth!',
        date: '2023-11-20'
      }
    ]
  },
  {
    id: 'p-3',
    title: 'USS Intrepid Pacific Fleet Service',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    year: 1944,
    exactDate: '1944-08-19',
    decade: '1940s',
    location: 'Pacific Ocean',
    eventType: 'Military',
    taggedMemberIds: ['mem-1'],
    description: 'Arthur Hawthorne (front row, second from left) with fellow Navy shipwrights aboard the aircraft carrier USS Intrepid during operations in the Pacific.',
    contributedBy: 'Robert Hawthorne',
    colorTone: 'black-white',
    likes: 31,
    comments: [
      {
        id: 'c-4',
        author: 'Julian Hawthorne',
        text: 'Grandpa rarely spoke about the war, but he always spoke with immense reverence of his shipmates.',
        date: '2024-05-27'
      }
    ]
  },
  {
    id: 'p-4',
    title: 'First Family Car: 1952 Ford Customline Road Trip',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    year: 1954,
    exactDate: '1954-07-10',
    decade: '1950s',
    location: 'Cape Cod, Massachusetts',
    eventType: 'Summer Trip',
    taggedMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-5'],
    description: 'Arthur, Eleanor, young Tommy (age 6) and baby Margaret (age 1) packed into their brand-new turquoise Ford sedan for their first trip to Sandy Neck Beach.',
    contributedBy: 'Margaret Sterling',
    colorTone: 'vintage-color',
    likes: 27,
    comments: [
      {
        id: 'c-5',
        author: 'Thomas Hawthorne',
        text: 'I remember the smell of the vinyl seats and the cooler of ginger ale in the trunk. Best summer ever.',
        date: '2024-06-18'
      }
    ]
  },
  {
    id: 'p-5',
    title: 'Building the Lake Winnipesaukee Cabin',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',
    year: 1968,
    exactDate: '1968-08-15',
    decade: '1960s',
    location: 'Lake Winnipesaukee, New Hampshire',
    eventType: 'Milestone',
    taggedMemberIds: ['mem-1', 'mem-3', 'mem-7'],
    description: 'Arthur, Tommy (20), and young Bobby (11) raising the timber rafters of the lakeside cabin. Arthur milled every beam from local hemlock and pine.',
    contributedBy: 'Thomas Hawthorne',
    colorTone: 'vintage-color',
    likes: 38,
    comments: [
      {
        id: 'c-6',
        author: 'Robert Hawthorne',
        text: 'I was proud that Dad let me hammer in the top cedar shingles. That cabin has sheltered four generations now!',
        date: '2024-01-14'
      }
    ]
  },
  {
    id: 'p-6',
    title: 'Tommy & Marianne Wedding at Mount Auburn',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    year: 1975,
    exactDate: '1975-09-20',
    decade: '1970s',
    location: 'Cambridge, Massachusetts',
    eventType: 'Wedding',
    taggedMemberIds: ['mem-3', 'mem-4', 'mem-1', 'mem-2'],
    description: 'Thomas and Marianne celebrating their wedding amidst autumn foliage in Cambridge. Marianne had wildflowers woven into her hair.',
    contributedBy: 'Marianne Hawthorne',
    colorTone: 'vintage-color',
    likes: 29,
    comments: [
      {
        id: 'c-7',
        author: 'Clara Hawthorne-Chen',
        text: 'Mom\'s 70s dress with bell sleeves was so iconic. I love this photo so much.',
        date: '2024-02-19'
      }
    ]
  },
  {
    id: 'p-7',
    title: 'The Great Blizzard of 1978 in Roslindale',
    imageUrl: 'https://images.unsplash.com/photo-1517030330234-94c4fb948ebc?auto=format&fit=crop&w=1200&q=80',
    year: 1978,
    exactDate: '1978-02-08',
    decade: '1970s',
    location: 'Boston, Massachusetts',
    eventType: 'Everyday Life',
    taggedMemberIds: ['mem-1', 'mem-2', 'mem-5', 'mem-7'],
    description: 'Snowdrifts reaching the second-story porch! The family was snowed in for six straight days with wood fire, hot cider, and round-the-clock Monopoly tournaments.',
    contributedBy: 'Margaret Sterling',
    colorTone: 'vintage-color',
    likes: 42,
    comments: [
      {
        id: 'c-8',
        author: 'Robert Hawthorne',
        text: 'We dug a snow tunnel from the back door all the way to Mr. Higgins\' grocery store!',
        date: '2024-02-08'
      }
    ]
  },
  {
    id: 'p-8',
    title: 'Grandpa Artie & Toddler Clara in the Sawdust',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    year: 1984,
    exactDate: '1984-05-12',
    decade: '1980s',
    location: 'Roslindale, Massachusetts',
    eventType: 'Everyday Life',
    taggedMemberIds: ['mem-1', 'mem-9'],
    description: 'Two-year-old Clara sitting on Arthur\'s workbench wearing his oversized safety goggles and holding a wooden toy sailboat he just carved for her.',
    contributedBy: 'Clara Hawthorne-Chen',
    colorTone: 'vintage-color',
    likes: 35,
    comments: [
      {
        id: 'c-9',
        author: 'Clara Hawthorne-Chen',
        text: 'This is my favorite photo in the world. He taught me the names of every tree by smelling the wood shavings.',
        date: '2024-04-12'
      }
    ]
  },
  {
    id: 'p-9',
    title: '50th Wedding Anniversary Golden Gala',
    imageUrl: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80',
    year: 1996,
    exactDate: '1996-06-22',
    decade: '1990s',
    location: 'Boston, Massachusetts',
    eventType: 'Anniversary',
    taggedMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-5', 'mem-7', 'mem-9', 'mem-11'],
    description: 'Arthur and Eleanor surrounded by their three children and four grandchildren to celebrate fifty years of marriage. 120 friends and family attended the reception at the Harvard Faculty Club.',
    contributedBy: 'Thomas Hawthorne',
    colorTone: 'full-color',
    likes: 45,
    comments: [
      {
        id: 'c-10',
        author: 'Lucas Sterling',
        text: 'I remember Arthur taking the microphone and singing "When Irish Eyes Are Smiling" right to Eleanor. There wasn\'t a dry eye in the house.',
        date: '2024-06-22'
      }
    ]
  },
  {
    id: 'p-10',
    title: 'Millennium Family Reunion at Lake Tahoe',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    year: 2000,
    exactDate: '2000-07-24',
    decade: '2000s',
    location: 'Lake Tahoe, California',
    eventType: 'Reunion',
    taggedMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4', 'mem-5', 'mem-6', 'mem-7', 'mem-8', 'mem-9', 'mem-11', 'mem-12'],
    description: 'All 14 family members gathered on the Tahoe shoreline for the Y2K Millennium reunion. Matching forest-green windbreakers and a sunset barbecue.',
    contributedBy: 'Elena Hawthorne',
    colorTone: 'full-color',
    likes: 33,
    comments: [
      {
        id: 'c-11',
        author: 'Julian Hawthorne',
        text: 'Uncle Dave brought his telescope and we stayed up until 2 AM looking at Saturn\'s rings.',
        date: '2024-07-15'
      }
    ]
  },
  {
    id: 'p-11',
    title: 'Clara & Marcus Wedding in Arnold Arboretum',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    year: 2011,
    exactDate: '2011-09-17',
    decade: '2010s',
    location: 'Boston, Massachusetts',
    eventType: 'Wedding',
    taggedMemberIds: ['mem-9', 'mem-10', 'mem-3', 'mem-4'],
    description: 'Clara and Marcus exchanging vows beneath the century-old lilac grove at the Arnold Arboretum, surrounded by family, friends, and autumn sunshine.',
    contributedBy: 'Clara Hawthorne-Chen',
    colorTone: 'full-color',
    likes: 39,
    comments: [
      {
        id: 'c-12',
        author: 'Marcus Chen',
        text: 'Best day of my life. And Tommy gave the warmest welcoming speech into the family.',
        date: '2024-09-17'
      }
    ]
  },
  {
    id: 'p-12',
    title: 'Welcoming Baby Maya to the World',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80',
    year: 2014,
    exactDate: '2014-04-20',
    decade: '2010s',
    location: 'Boston, Massachusetts',
    eventType: 'New Baby',
    taggedMemberIds: ['mem-9', 'mem-10', 'mem-13', 'mem-2'],
    description: 'Nana Eleanor at 90 years old holding her great-granddaughter Maya (2 days old) in a four-generation embrace at Brigham and Women\'s Hospital.',
    contributedBy: 'Clara Hawthorne-Chen',
    colorTone: 'full-color',
    likes: 52,
    comments: [
      {
        id: 'c-13',
        author: 'Thomas Hawthorne',
        text: 'Nana held her so gently and whispered an old Gaelic lullaby into her ear. A moment etched into all of our hearts.',
        date: '2024-04-18'
      }
    ]
  },
  {
    id: 'p-13',
    title: 'Leo\'s 5th Birthday Treehouse Launch',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80',
    year: 2023,
    exactDate: '2023-09-27',
    decade: '2020s',
    location: 'Portsmouth, New Hampshire',
    eventType: 'Milestone',
    taggedMemberIds: ['mem-3', 'mem-14', 'mem-13', 'mem-9', 'mem-10'],
    description: 'Grandpa Tommy and Leo cutting the ribbon on the backyard oak treehouse, equipped with a periscope, rope ladder, and secret passcode door.',
    contributedBy: 'Thomas Hawthorne',
    colorTone: 'full-color',
    likes: 28,
    comments: [
      {
        id: 'c-14',
        author: 'Maya Chen',
        text: 'The password was "DIPLODOCUS-7" and I was the chief security officer!',
        date: '2024-08-01'
      }
    ]
  },
  {
    id: 'p-14',
    title: 'Thanksgiving Gathering & Great Turkey Carving',
    imageUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    year: 2024,
    exactDate: '2024-11-28',
    decade: '2020s',
    location: 'Portsmouth, New Hampshire',
    eventType: 'Holiday',
    taggedMemberIds: ['mem-3', 'mem-4', 'mem-9', 'mem-10', 'mem-13', 'mem-14', 'mem-12'],
    description: 'Full harvest dinner spread with four generations represented. Table loaded with Nana Ellie\'s stuffing, roasted butternut squash, and cranberry orange relish.',
    contributedBy: 'Marianne Hawthorne',
    colorTone: 'full-color',
    likes: 36,
    comments: [
      {
        id: 'c-15',
        author: 'Julian Hawthorne',
        text: 'Uncle Tommy let Leo do the honorary first slice of the turkey. Pure joy!',
        date: '2024-11-29'
      }
    ]
  }
];

export const initialMemories: MemoryStory[] = [
  {
    id: 'mem-story-1',
    title: 'Nana Ellie\'s Secret Cardamom Apple Spice Cake',
    category: 'Secret Recipe',
    author: 'Marianne Hawthorne',
    authorMemberId: 'mem-4',
    yearEstimated: 1962,
    decade: '1960s',
    content: 'Whenever autumn rolled into Boston, the house filled with the intoxicating warmth of freshly ground cardamom, cinnamon, and tart McIntosh apples. Eleanor guarded this handwritten recipe card inside an old tin tea canister. Before she passed, she sat Marianne down and had her bake three practice batches until the crumb texture was airy yet dense with spiced apples.',
    recipeIngredients: [
      '3 cups all-purpose unbleached flour',
      '1 tsp baking soda & 1/2 tsp fine sea salt',
      '1 1/2 tsp freshly ground green cardamom pods',
      '2 tsp ground Saigon cinnamon & 1/4 tsp freshly grated nutmeg',
      '1 3/4 cups organic granulated sugar',
      '1 cup neutral oil or melted unsalted butter',
      '3 large farm eggs at room temperature',
      '1 tbsp pure vanilla bean extract',
      '3 cups diced Honeycrisp or McIntosh apples (peeled)',
      '1 cup chopped toasted walnuts or pecans (optional)',
      'Warm salted butter caramel glaze for drizzling on top'
    ],
    recipeSteps: [
      'Preheat oven to 350°F (175°C). Heavily grease and flour a 10-cup bundt pan or 9x13 ceramic baker.',
      'In a large bowl, whisk together flour, baking soda, salt, cardamom, cinnamon, and nutmeg.',
      'In a stand mixer, beat eggs and sugar until pale and frothy (about 3 minutes), then slowly stream in oil and vanilla.',
      'Fold dry ingredients gently into wet until just combined. Fold in chopped apples and toasted nuts.',
      'Pour into prepared pan and bake for 55–65 minutes until a toothpick inserted into center comes out clean.',
      'Cool in pan for 15 minutes before turning onto wire rack. Drizzle warm caramel glaze generously while still warm.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    likes: 47,
    dateAdded: '2024-10-15',
    comments: [
      {
        id: 'rc-1',
        author: 'Clara Hawthorne-Chen',
        text: 'Made this for Maya\'s school bake sale and it was gone in 10 minutes flat!',
        date: '2024-10-22'
      }
    ]
  },
  {
    id: 'mem-story-2',
    title: 'Letters from the Pacific: Arthur\'s 1944 V-Mail to Eleanor',
    category: 'Love Letter',
    author: 'Clara Hawthorne-Chen (Archivist)',
    authorMemberId: 'mem-9',
    yearEstimated: 1944,
    decade: '1940s',
    content: '"Dearest Ellie, The night watch on deck is quiet tonight under a sky crowded with a million southern stars like I never saw over Boston Common. Whenever the engine hum softens, I close my eyes and hear you playing the upright piano in the parlor. Keep saving those Sunday walk pennies, my girl. When this war is won, we will build a front porch with room for swings and rocking chairs, and we will never let the fire go cold. All my love across the wide blue water, Artie."',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    likes: 58,
    dateAdded: '2024-05-10',
    comments: [
      {
        id: 'rc-2',
        author: 'Margaret Sterling',
        text: 'He kept every single one of her reply letters in his footlocker. True love across generations.',
        date: '2024-05-15'
      }
    ]
  },
  {
    id: 'mem-story-3',
    title: 'The Great 1978 Snow Cave & The Flying Sled',
    category: 'Family Lore',
    author: 'Robert Hawthorne',
    authorMemberId: 'mem-7',
    yearEstimated: 1978,
    decade: '1970s',
    content: 'When 27 inches of heavy snow shut down Massachusetts in February 1978, Tommy and I realized the snowdrift off the garage roof formed a natural 45-degree ski ramp. We spent three days carving out a three-room igloo equipped with candle alcoves and a snow couch. Grandpa Artie came out with his Thermos of tomato soup, inspected our engineering, and proclaimed it "fully code compliant."',
    imageUrl: 'https://images.unsplash.com/photo-1517030330234-94c4fb948ebc?auto=format&fit=crop&w=800&q=80',
    likes: 39,
    dateAdded: '2024-02-12'
  },
  {
    id: 'mem-story-4',
    title: 'Grandpa Artie\'s Rule of Craftsmanship',
    category: 'Life Lesson',
    author: 'Thomas Hawthorne',
    authorMemberId: 'mem-3',
    yearEstimated: 1965,
    decade: '1960s',
    content: 'Dad always said: "Measure twice, cut once, and sand the underside of the table just as smoothly as the top—because God and the spiders can see beneath it." He believed that integrity was how you treated the parts of your work and your life that nobody else was looking at.',
    likes: 64,
    dateAdded: '2024-01-20'
  }
];

export const initialNews: NewsAnnouncement[] = [
  {
    id: 'news-1',
    title: '2026 Annual Family Reunion at Lake Tahoe Announced!',
    category: 'Reunion Update',
    date: '2026-08-20',
    author: 'Clara Hawthorne-Chen',
    content: 'Mark your calendars! The 2026 Hawthorne-Sterling-Chen family gathering will be held July 17–21, 2026 at the Lake Tahoe Pines Lodge. We have booked the main lakefront cabin plus three adjacent cottages. Expect sunset pontoon boat cruises, Uncle Dave\'s astronomy stargazing night, and Marcus\'s legendary barbecue dinner on Saturday. RSVP below with headcounts!',
    pinned: true,
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    rsvpCount: 16,
    eventDate: 'July 17–21, 2026',
    location: 'Lake Tahoe Pines Lodge, CA'
  },
  {
    id: 'news-2',
    title: 'Maya Chen Wins 1st Place in Regional Science Fair!',
    category: 'Celebration',
    date: '2026-05-14',
    author: 'Marcus Chen',
    content: 'Proud parents announcement: Maya won 1st Place in the Eastern Massachusetts Junior Science Fair for her project studying tide pool biodiversity in Salem Sound! Grandpa Tommy helped her build the miniature water wave simulation tank. Congratulations Maya!',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-3',
    title: 'Julian\'s New Jazz Album Released on Vinyl & Streaming',
    category: 'Milestone',
    date: '2026-03-02',
    author: 'Elena Hawthorne',
    content: 'Julian\'s quartet "The Emerald Trio" has officially released their sophomore vinyl record "Echoes of Cobh", which features melodies inspired by Nana Eleanor\'s vintage Irish lullabies. You can listen on Spotify or ask Julian for a signed copy at the reunion!',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-4',
    title: '50th Anniversary Commemorative Photo Book Project',
    category: 'General',
    date: '2026-01-18',
    author: 'Clara Hawthorne-Chen',
    content: 'We are compiling a hardcover archival photo book to distribute at the summer reunion. Please upload your high-resolution scans of family weddings, vacations, and baby milestones using the "Add Memory / Photo" button on this site before June 1st!',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  // January
  {
    id: 'cal-1',
    title: "Lucas Sterling's Birthday",
    type: 'birthday',
    dateMonthDay: '01-20',
    fullDate: '1985-01-20',
    originalYear: 1985,
    memberId: 'mem-11',
    description: 'Lucas turns 41! Send adventurous birthday wishes to San Francisco.',
    location: 'San Francisco, CA'
  },
  // February
  {
    id: 'cal-2',
    title: "Thomas Hawthorne's Birthday",
    type: 'birthday',
    dateMonthDay: '02-14',
    fullDate: '1948-02-14',
    originalYear: 1948,
    memberId: 'mem-3',
    description: 'Valentine\'s Day baby! Celebrating Uncle Tommy in Portsmouth, NH.',
    location: 'Portsmouth, NH'
  },
  // March
  {
    id: 'cal-3',
    title: "Nana Eleanor Memorial Day",
    type: 'memorial',
    dateMonthDay: '03-22',
    fullDate: '2015-03-22',
    originalYear: 2015,
    memberId: 'mem-2',
    description: 'Remembering Nana Eleanor with a batch of her favorite tea and cardamom cake.',
    location: 'Family Homes'
  },
  {
    id: 'cal-4',
    title: "Elena Vega Hawthorne's Birthday",
    type: 'birthday',
    dateMonthDay: '03-24',
    fullDate: '1960-03-24',
    originalYear: 1960,
    memberId: 'mem-8',
    description: 'Aunt Elena\'s birthday in Seattle! Send watercolor art supplies or love.',
    location: 'Seattle, WA'
  },
  // April
  {
    id: 'cal-5',
    title: "Arthur Hawthorne Birthday Remembrance",
    type: 'memorial',
    dateMonthDay: '04-12',
    fullDate: '1921-04-12',
    originalYear: 1921,
    memberId: 'mem-1',
    description: 'Remembering Grandpa Artie and his woodcraft legacy.',
    location: 'Roslindale / Lake Cabin'
  },
  {
    id: 'cal-6',
    title: "Maya Chen's Birthday",
    type: 'birthday',
    dateMonthDay: '04-18',
    fullDate: '2014-04-18',
    originalYear: 2014,
    memberId: 'mem-13',
    description: 'Maya turns 12! Science kits, books, and gymnastics party.',
    location: 'Boston, MA'
  },
  // May
  {
    id: 'cal-7',
    title: "David Sterling's Birthday",
    type: 'birthday',
    dateMonthDay: '05-18',
    fullDate: '1950-05-18',
    originalYear: 1950,
    memberId: 'mem-6',
    description: 'Dave turns 76! Stargazing celebration in Boulder, CO.',
    location: 'Boulder, CO'
  },
  // June
  {
    id: 'cal-8',
    title: "Clara Hawthorne's Birthday",
    type: 'birthday',
    dateMonthDay: '06-11',
    fullDate: '1982-06-11',
    originalYear: 1982,
    memberId: 'mem-9',
    description: 'Clara\'s birthday! Family archivist and reunion organizer.',
    location: 'Boston, MA'
  },
  {
    id: 'cal-9',
    title: "Arthur & Eleanor Golden Anniversary",
    type: 'anniversary',
    dateMonthDay: '06-22',
    fullDate: '1946-06-22',
    originalYear: 1946,
    memberId: 'mem-1',
    memberSecondaryId: 'mem-2',
    description: '80th anniversary since their wedding day in Roslindale (1946).',
    location: 'Roslindale, MA'
  },
  // July
  {
    id: 'cal-10',
    title: "2026 Annual Family Reunion at Lake Tahoe",
    type: 'reunion',
    dateMonthDay: '07-17',
    fullDate: '2026-07-17',
    description: 'Five days of lakeside memories, boating, campfire songs, and reunion banquet!',
    location: 'Lake Tahoe Pines Lodge, CA'
  },
  {
    id: 'cal-11',
    title: "Margaret Sterling's Birthday",
    type: 'birthday',
    dateMonthDay: '07-29',
    fullDate: '1953-07-29',
    originalYear: 1953,
    memberId: 'mem-5',
    description: 'Aunt Maggie\'s birthday in Boulder! Trail hike and family dinner.',
    location: 'Boulder, CO'
  },
  // August
  {
    id: 'cal-12',
    title: "Marcus Chen's Birthday",
    type: 'birthday',
    dateMonthDay: '08-30',
    fullDate: '1980-08-30',
    originalYear: 1980,
    memberId: 'mem-10',
    description: 'Marcus\'s birthday! Barbecue master and history lover.',
    location: 'Boston, MA'
  },
  // September
  {
    id: 'cal-13',
    title: "Eleanor Hawthorne Birthday Remembrance",
    type: 'memorial',
    dateMonthDay: '09-08',
    fullDate: '1924-09-08',
    originalYear: 1924,
    memberId: 'mem-2',
    description: 'Remembering Nana Eleanor\'s loving spirit and voice.',
    location: 'Boston, MA'
  },
  {
    id: 'cal-14',
    title: "Clara & Marcus Wedding Anniversary",
    type: 'anniversary',
    dateMonthDay: '09-17',
    fullDate: '2011-09-17',
    originalYear: 2011,
    memberId: 'mem-9',
    memberSecondaryId: 'mem-10',
    description: 'Celebrating 15 years of marriage since the Arnold Arboretum lilac garden wedding.',
    location: 'Boston, MA'
  },
  {
    id: 'cal-15',
    title: "Tommy & Marianne Wedding Anniversary",
    type: 'anniversary',
    dateMonthDay: '09-20',
    fullDate: '1975-09-20',
    originalYear: 1975,
    memberId: 'mem-3',
    memberSecondaryId: 'mem-4',
    description: 'Celebrating 51 years of marriage and shared adventures!',
    location: 'Portsmouth, NH'
  },
  {
    id: 'cal-16',
    title: "Leo Chen's Birthday",
    type: 'birthday',
    dateMonthDay: '09-27',
    fullDate: '2018-09-27',
    originalYear: 2018,
    memberId: 'mem-14',
    description: 'Leo turns 8! LEGO party and treehouse adventures.',
    location: 'Boston, MA'
  },
  // October
  {
    id: 'cal-17',
    title: "Robert Hawthorne's Birthday",
    type: 'birthday',
    dateMonthDay: '10-15',
    fullDate: '1957-10-15',
    originalYear: 1957,
    memberId: 'mem-7',
    description: 'Uncle Bob\'s birthday in Seattle! High-flying celebration.',
    location: 'Seattle, WA'
  },
  // November
  {
    id: 'cal-18',
    title: "Marianne Dupont Hawthorne's Birthday",
    type: 'birthday',
    dateMonthDay: '11-03',
    fullDate: '1951-11-03',
    originalYear: 1951,
    memberId: 'mem-4',
    description: 'Aunt Marianne\'s birthday! Botanical garden visit and family tea.',
    location: 'Portsmouth, NH'
  },
  {
    id: 'cal-19',
    title: "Arthur Hawthorne Memorial Day",
    type: 'memorial',
    dateMonthDay: '11-19',
    fullDate: '2008-11-19',
    originalYear: 2008,
    memberId: 'mem-1',
    description: 'Remembering Arthur with candlelight and woodworking stories.',
    location: 'Family Homes'
  },
  // December
  {
    id: 'cal-20',
    title: "Julian Hawthorne's Birthday",
    type: 'birthday',
    dateMonthDay: '12-05',
    fullDate: '1991-12-05',
    originalYear: 1991,
    memberId: 'mem-12',
    description: 'Julian\'s birthday in Brooklyn! Jazz concert and celebration.',
    location: 'Brooklyn, NY'
  }
];
