/* Episodes and tropes from the Core Rulebook (chapter 03, pp. 124-165) and the 80s book (chapter 02, pp. 44-101).
   Summaries are short paraphrases of what each one is about, not the books' text, and leave out set up and rules.
   g: genre keys (Core: action adventure fantasy historical horror scifi; 80s: coldwar frightmare greedglamour
   hiredhelp rebelstate silicondream). An empty list means any genre (the Core open play episodes). */
window.SEVENTV_EPISODES = [
  // Core Rulebook: open play episodes
  { t: 'The Battle', b: 'core', p: 126, type: 'Open play', g: [], s: 'An all-out clash between heroes and villains: the turning point of the story or its grand finale. Nothing is the same afterwards.' },
  { t: 'The Escape', b: 'core', p: 127, type: 'Open play', g: [], s: 'One cast has been caught in enemy territory with its cover blown, and has to fight its way out before it is captured.' },
  { t: 'The Race', b: 'core', p: 128, type: 'Open play', g: [], s: 'Both casts race for the same prize while the location falls apart around them.' },
  { t: 'The Raid', b: 'core', p: 129, type: 'Open play', g: [], s: 'One cast strikes behind enemy lines to take down a member of the other cast, as revenge or the end of a deep-cover mission.' },
  { t: 'The Rescue', b: 'core', p: 130, type: 'Open play', g: [], s: 'One cast holds a member of the other prisoner, in a tower, on the rocks or somewhere worse, and has to stop the rescue.' },
  { t: 'The Steal', b: 'core', p: 132, type: 'Open play', g: [], s: 'One cast tries to steal a breakthrough, treasure or relic that the other cast is moving in secret.' },
  // Core Rulebook: narrative episodes
  { t: 'The Sherwood Devil', b: 'core', p: 135, type: 'Narrative', g: ['historical', 'horror'], s: "On All Hallows' Eve a diabolist calls the Devil to Sherwood Forest, and Robin Hood's outlaws must stop his cloven-hoofed servants carrying off the villagers." },
  { t: 'Queen of the Sun', b: 'core', p: 138, type: 'Narrative', g: ['adventure', 'fantasy'], s: "Archaeologist Anna 'Anaheim' Smith finds a hollow world at the Earth's core, ruled by an immortal tyrant with fanatical cultists and giant lizards." },
  { t: 'The Moon Is Not Enough', b: 'core', p: 141, type: 'Narrative', g: ['action', 'scifi'], s: "Superspy Hemingford Grey infiltrates a mastermind's moonbase to stop a missile launch and rescue the kidnapped Miss World." },
  // 80s book: classic episodes
  { t: '8-Bittalion', b: '80s', p: 46, type: 'Classic episode', g: ['coldwar', 'silicondream'], s: "A squad of Vietnam veterans is uploaded into a malfunctioning military supercomputer to fight through a video-game jungle and shut it down from inside." },
  { t: 'Alien Dead 2', b: '80s', p: 48, type: 'Classic episode', g: ['frightmare'], s: 'Marines escort the sole survivor of the first film back to a colony planet overrun by the evil dead.' },
  { t: 'Neutron Nelson', b: '80s', p: 51, type: 'Classic episode', g: ['silicondream'], s: 'A pop star turned special agent, his band and his talking motorbike take on synthetic humanoids from another dimension.' },
  { t: 'Oddjobbers', b: '80s', p: 53, type: 'Classic episode', g: ['hiredhelp', 'frightmare'], s: "In Thatcher's Britain, a wheeler-dealer, an ex-con boxer and a bricklayer run a cut-price monster removal firm with nicked ghost-catching kit." },
  { t: 'Orlando Heat', b: '80s', p: 56, type: 'Classic episode', g: ['greedglamour'], s: 'Terrorists seize a theme park full of rich hostages, and two wisecracking cops are in the wrong place at the wrong time.' },
  { t: 'Outlaws of the Black Stump', b: '80s', p: 58, type: 'Classic episode', g: ['hiredhelp'], s: 'A team of fugitive do-gooders defends a small Outback town against a greedy mining corporation.' },
  { t: 'Pitch Darkness', b: '80s', p: 60, type: 'Classic episode', g: ['coldwar'], s: "Britain's underfunded secret service hunts a Soviet plot and a mole in its own ranks, with a football match as the backdrop." },
  { t: 'Santa Clara', b: '80s', p: 62, type: 'Classic episode', g: ['greedglamour', 'silicondream'], s: "A dynasty of ruthless millionaire sisters fights a visionary technologist's transhuman corporation in the boardroom and on the battlefield." },
  { t: 'Scream House 3', b: '80s', p: 65, type: 'Classic episode', g: ['frightmare'], s: "A demonic house that feeds on fear terrorises a new suburb, and only the first film's survivor and her odd friends can stop it." },
  { t: 'Star Killers', b: '80s', p: 68, type: 'Classic episode', g: ['rebelstate'], s: 'In a distant galaxy, rebels fight a desperate war against an empire of living machines.' },
  { t: 'Swordwinder', b: '80s', p: 70, type: 'Classic episode', g: ['frightmare'], s: 'A 500-year-old warrior and a New York woman face an undying sorcerer for the ultimate prize, with very big swords.' },
  { t: 'USAliens', b: '80s', p: 73, type: 'Classic episode', g: ['rebelstate'], s: 'The aliens came as friends, then took America. A handful of teenagers fights a guerrilla war against them.' },
  // 80s book: narrative episodes
  { t: 'Polygon', b: '80s', p: 77, type: 'Narrative', g: ['silicondream', 'greedglamour'], s: 'Four children are trapped inside an arcade cabinet and must beat the games of the mysterious Polygon to escape.' },
  { t: 'Blood Money', b: '80s', p: 80, type: 'Narrative', g: ['hiredhelp', 'frightmare'], s: "In a vampire-ruled Manhattan of 1997, a commando unit sent to stake the Master Vampire is really there to empty his vault." },
  { t: 'Red Square', b: '80s', p: 83, type: 'Narrative', g: ['rebelstate', 'coldwar'], s: "In a Britain occupied after a nuclear war, East End resistance fighters strike when the occupying general visits their square." }
];

window.SEVENTV_TROPES = [
  // Core Rulebook (p. 145), one genre each
  { t: 'City Riot', b: 'core', p: 148, g: ['action'], s: 'Tension on the streets boils over, and both casts are caught in a city tearing itself apart.' },
  { t: 'Hostage Situation', b: 'core', p: 149, g: ['action'], s: 'Bank robbers or mercenaries have taken prisoners, and the hostages need saving.' },
  { t: 'Ticking Time Bomb', b: 'core', p: 150, g: ['action'], s: 'Terrorists, saboteurs or thieves have planted a bomb, and the clock is running.' },
  { t: 'Cursed Treasure', b: 'core', p: 151, g: ['adventure'], s: 'Pirate gold or a damned soul\'s heirloom carries a curse that falls on whoever tries to claim it.' },
  { t: 'Lost Worlds', b: 'core', p: 152, g: ['adventure'], s: 'A forgotten city in an undiscovered corner of the world, full of treacherous ground.' },
  { t: 'The Doomed Temple', b: 'core', p: 153, g: ['adventure'], s: 'The treasures of a lost civilisation are there for the taking, but they do not come easily.' },
  { t: 'Tavern Crawl', b: 'core', p: 154, g: ['fantasy'], s: 'A tour of out-of-the-way taverns full of travellers, some friendly and some not.' },
  { t: 'There Be Dragons', b: 'core', p: 155, g: ['fantasy'], s: 'A dragon circles above the clouds, drawn to treasure, and dives on anyone who flaunts it.' },
  { t: 'The Road Goes Ever On...', b: 'core', p: 156, g: ['fantasy'], s: 'The journey is the adventure, and every land along the way brings its own dangers.' },
  { t: 'Battlefield', b: 'core', p: 157, g: ['historical'], s: 'The blood-soaked plain after a great battle, where the silence is worse than the screams.' },
  { t: 'Raiders', b: 'core', p: 158, g: ['historical'], s: 'Marauders under strange banners come over the ridge and sweep across the land.' },
  { t: 'Signs and Portents', b: 'core', p: 159, g: ['historical'], s: 'A temple, soothsayer or oracle tells your fortune, for good or ill.' },
  { t: 'Graveyard Shift', b: 'core', p: 160, g: ['horror'], s: 'A cemetery full of oddballs, dry ice and the restless dead.' },
  { t: 'Haunted House', b: 'core', p: 161, g: ['horror'], s: 'Creepy castles, moonlit mansions and murder houses. Take care once you cross the threshold.' },
  { t: 'Universal Horrors', b: 'core', p: 162, g: ['horror'], s: 'Legendary monsters wake after decades asleep, as they always do.' },
  { t: 'Bad Robot', b: 'core', p: 163, g: ['scifi'], s: 'The machines are revolting. Robots, replicants and androids turn on their makers.' },
  { t: 'Gate to the Edge of Forever', b: 'core', p: 164, g: ['scifi'], s: 'A doorway to another world or a rift in space and time, and who knows what lies on the other side.' },
  { t: 'Watch the Skies!', b: 'core', p: 165, g: ['scifi'], s: 'Visitors from other worlds arrive. Are they friendly, or do they want the Earth?' },
  // 80s book (p. 86)
  { t: 'Absurd Arsenal', b: '80s', p: 87, g: ['hiredhelp'], s: 'Locked in a barn before the enemy attacks, the cast builds an arsenal out of vegetables, leaf blowers and corrugated sheeting.' },
  { t: 'Be Careful Out There', b: '80s', p: 88, g: ['hiredhelp'], s: 'A busy precinct of overworked detectives, raging desk sergeants and cells full of undesirables.' },
  { t: 'East vs West', b: '80s', p: 90, g: ['coldwar'], s: 'Tension builds on the border between the superpowers, where diplomacy, spycraft and murder are all fair game.' },
  { t: 'High Rise', b: '80s', p: 91, g: ['greedglamour'], s: 'A gleaming corporate tower 500 feet above the city, where fortunes are won and lost.' },
  { t: 'Insert Coins', b: '80s', p: 93, g: ['silicondream'], s: 'An 8-bit wonderland of pixelated perils. Can you beat the high score?' },
  { t: 'Loading Bay 9', b: '80s', p: 94, g: ['silicondream'], s: 'The loading bay of a backwater spaceport, full of cargo, load lifters and things you cannot hear scream.' },
  { t: 'Murder House', b: '80s', p: 95, g: ['frightmare'], s: 'The derelict house at the end of the street, where the massacre happened years ago.' },
  { t: 'Neon Sanctum', b: '80s', p: 96, g: ['greedglamour'], s: 'The coolest club in the city and a night of hedonistic hazards.' },
  { t: 'Research Station Zero', b: '80s', p: 97, g: ['frightmare'], s: 'An isolated base far from anywhere, studying what lies buried in the ice.' },
  { t: 'Suburban Sprawl', b: '80s', p: 98, g: ['rebelstate'], s: 'Perfect streets and white picket fences. What really lies behind them?' },
  { t: 'Under Siege', b: '80s', p: 100, g: ['coldwar'], s: 'Hostile forces have seized a corporate tower, embassy or strongpoint.' },
  { t: 'Urban Decay', b: '80s', p: 101, g: ['rebelstate'], s: 'Grim, crowded inner-city streets of litter, barbed wire and police patrols.' }
];
