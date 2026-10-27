/* Rules reference data for 7TV 2nd Edition profile cards.
   Page references are to the 7TV Core Rulebook (Revised 2e). */
(function () {
  const GENRE_SETS = {
    core: {
      id: 'core',
      label: 'Core',
      blurb: 'The six genres of the Core Rulebook.',
      genres: [
        { key: 'action', name: 'Action', icon: 'assets/genres/core/action.png' },
        { key: 'adventure', name: 'Adventure', icon: 'assets/genres/core/adventure.png' },
        { key: 'fantasy', name: 'Fantasy', icon: 'assets/genres/core/fantasy.png' },
        { key: 'historical', name: 'Historical', icon: 'assets/genres/core/historical.png' },
        { key: 'horror', name: 'Horror', icon: 'assets/genres/core/horror.png' },
        { key: 'scifi', name: 'Sci-Fi', icon: 'assets/genres/core/scifi.png' }
      ]
    },
    '80s': {
      id: '80s',
      label: '80s',
      blurb: 'The six genres of 7TV 80s.',
      genres: [
        { key: 'coldwar', name: 'Cold War', icon: 'assets/genres/80s/coldwar.png' },
        { key: 'frightmare', name: 'Frightmare', icon: 'assets/genres/80s/frightmare.png' },
        { key: 'greedglamour', name: 'Greed & Glamour', icon: 'assets/genres/80s/greedglamour.png' },
        { key: 'hiredhelp', name: 'Hired Help', icon: 'assets/genres/80s/hiredhelp.png' },
        { key: 'rebelstate', name: 'Rebel State', icon: 'assets/genres/80s/rebelstate.png' },
        { key: 'silicondream', name: 'Silicon Dream', icon: 'assets/genres/80s/scifi80s.png' }
      ]
    }
  };

  /* Books the official profiles come from. A feature pack uses one of the genre sets for its card icons. */
  const BOOKS = {
    core: { id: 'core', label: 'Core', genreSet: 'core' },
    '80s': { id: '80s', label: '80s', genreSet: '80s' },
    steeljustice: { id: 'steeljustice', label: 'Steel Justice', genreSet: 'core' }
  };
  const bookOf = (p) => (p && (p.book || p.genreSet)) || 'core';

  /* Genre alignment from the 80s guide: each 80s genre matches one Core Rulebook genre.
     ALIGN[set][i] is the Core genre index for genre i of that set (card icon order). */
  const ALIGN = {
    core: [0, 1, 2, 3, 4, 5],
    '80s': [0, 4, 2, 1, 3, 5] // Cold War=Action, Frightmare=Horror, Greed & Glamour=Fantasy, Hired Help=Adventure, Rebel State=Historical, Silicon Dream=Sci-Fi
  };
  const toCore = (set, i) => (ALIGN[set] || ALIGN.core)[i];
  const fromCore = (set, c) => (ALIGN[set] || ALIGN.core).indexOf(c);
  const convertGenres = (from, to, list) => (list || []).map((i) => fromCore(to, toCore(from, i))).filter((i) => i >= 0).sort((a, b) => a - b);
  /* "Action / Cold War" style names for the six aligned genres, in Core order */
  const alignedName = (c) => `${GENRE_SETS.core.genres[c].name} / ${GENRE_SETS['80s'].genres[fromCore('80s', c)].name}`;

  /* Colours sampled from the official 2e cards. band = header/health band fill,
     accent = type pill / ratings / back heading text. */
  const KINDS = {
    star:      { label: 'Star',     band: '#9e2b2b', accent: '#b8282f', heading: '#b8282f', health: 3 },
    'co-star': { label: 'Co-Star',  band: '#23659c', accent: '#1475bc', heading: '#1475bc', health: 2 },
    extra:     { label: 'Extra',    band: '#d39a22', accent: '#e5a612', heading: '#58595b', health: 1 },
    vehicle:   { label: 'Vehicle',  band: '#842a84', accent: '#90278f', heading: '#90278f', health: 3 }
  };

  const AFFILIATIONS = { heroic: 'Heroic', villainous: 'Villainous', neutral: 'Neutral' };

  const STATS = {
    model: [
      { key: 'fight', label: 'Fight', colour: '#9b2024', side: 'left' },
      { key: 'shoot', label: 'Shoot', colour: '#ce7c17', side: 'left' },
      { key: 'defence', label: 'Defence', colour: '#d4ab2c', side: 'left' },
      { key: 'mind', label: 'Mind', colour: '#adb81f', side: 'right' },
      { key: 'body', label: 'Body', colour: '#2b963d', side: 'right' },
      { key: 'spirit', label: 'Spirit', colour: '#248fbd', side: 'right' }
    ],
    vehicle: [
      { key: 'capacity', label: 'Capacity', colour: '#3f8f50', side: 'left' },
      { key: 'speed', label: 'Speed', colour: '#2b93ba', side: 'left' },
      { key: 'defence', label: 'Defence', colour: '#d4ab2c', side: 'right' },
      { key: 'armour', label: 'Armour', colour: '#62809c', side: 'right' }
    ]
  };

  const ATTACK_TYPES = {
    fight: { label: 'Fight', base: (s) => (+s.fight || 0) + (+s.body || 0), formula: 'Fight + Body' },
    shoot: { label: 'Shoot', base: (s) => (+s.shoot || 0), formula: 'Shoot' },
    presence: { label: 'Presence', base: (s) => (+s.mind || 0) + (+s.spirit || 0), formula: 'Mind + Spirit' }
  };

  /* Attack tables, pp. 48-49. mod is added to the attack type's formula.
     addBody marks thrown weapons whose strike is Shoot + Body. */
  const ATTACK_TABLE = [
    { type: 'fight', name: 'Axe/Stone Axe', range: '0"', mod: 0, effect: '-1 Health', genres: 'All' },
    { type: 'fight', name: 'Bladed Weapon', range: '0"', mod: 0, effect: '-1 Health', genres: 'All' },
    { type: 'fight', name: 'Bo Staff', range: '1"', mod: 0, effect: 'Fast, 0 Health, Stunned', genres: 'All' },
    { type: 'fight', name: 'Brawl', range: '0"', mod: 0, effect: '0 Health, Weakened', genres: 'All' },
    { type: 'fight', name: 'Club/Cosh/Mace', range: '0"', mod: 1, effect: '0 Health, Stunned', genres: 'All' },
    { type: 'fight', name: 'Flaming Torch', range: '0"', mod: 1, effect: '0 Health, On Fire', genres: 'All' },
    { type: 'fight', name: 'Garrotte', range: '0"', mod: 0, effect: '-1 Health, Immobilised', genres: 'All' },
    { type: 'fight', name: 'Handcuffs', range: '0"', mod: -1, effect: '0 Health, Captured', genres: 'All' },
    { type: 'fight', name: 'Katana', range: '0"', mod: 0, effect: 'Deadly, -1 Health', genres: 'All' },
    { type: 'fight', name: 'Knife/Dagger', range: '0"', mod: 0, effect: 'Fast, -1 Health', genres: 'All' },
    { type: 'fight', name: 'Martial Arts', range: '1"', mod: 1, effect: 'Fast, 0 Health, Weakened', genres: 'All' },
    { type: 'fight', name: 'Spear/Trident', range: '1"', mod: 0, effect: 'Deadly vs Mount, -1 Health', genres: 'All' },
    { type: 'fight', name: 'Staff', range: '1"', mod: 1, effect: '0 Health, Knocked down', genres: 'All' },
    { type: 'fight', name: 'Whip', range: '2"', mod: 1, effect: 'Unwieldy, 0 Health, Captured', genres: 'All' },
    { type: 'shoot', name: 'Blaster', range: '16"', mod: 3, effect: 'Deadly, -1 Health', genres: 'Sci-Fi only' },
    { type: 'shoot', name: 'Crossbow', range: '18"', mod: 4, effect: '-1 Health, Readied', genres: 'All' },
    { type: 'shoot', name: 'Flintlock Pistol', range: '12"', mod: 3, effect: 'Unreliable, -1 Health', genres: 'All' },
    { type: 'shoot', name: 'Handgun', range: '12"', mod: 3, effect: '2 Shots, -1 Health', genres: 'All' },
    { type: 'shoot', name: 'High Calibre Pistol', range: '12"', mod: 4, effect: 'Deadly, -1 Health', genres: 'All' },
    { type: 'shoot', name: 'Machine Gun', range: '16"', mod: 3, effect: 'Spray, -1 Health', genres: 'All' },
    { type: 'shoot', name: 'Net', range: 'Thrown', mod: 0, addBody: true, effect: 'Barrier, 0 Health, Captured', genres: 'All' },
    { type: 'shoot', name: 'Pulse Rifle', range: '12"', mod: 4, effect: '-1 Health', genres: 'Sci-Fi only' },
    { type: 'shoot', name: 'Ray Gun', range: '12"', mod: 4, effect: '0 Health, On Fire', genres: 'Adventure and Sci-Fi only' },
    { type: 'shoot', name: 'Shortbow', range: '12"', mod: 3, effect: '-1 Health', genres: 'All' },
    { type: 'shoot', name: 'Shotgun', range: '8"', mod: 4, effect: '-1 Health', genres: 'All' },
    { type: 'shoot', name: 'Sling', range: '6"', mod: 3, effect: '0 Health, Stunned', genres: 'All' },
    { type: 'shoot', name: 'Spear', range: 'Thrown', mod: 0, addBody: true, effect: 'Deadly vs Mount, -1 Health', genres: 'All' },
    { type: 'shoot', name: 'Torch Dazzle', range: '6"', mod: 4, effect: '0 Health, Distracted', genres: 'Action, Adventure, Horror and Sci-Fi only' }
  ];

  /* Weapon effect keywords, pp. 171-174, used for autocomplete. */
  const WEAPON_EFFECTS = [
    '0 Health', '-1 Health', '-1D3 Health', '-1D6 Health', '2 Shots', 'Barrier', 'Beam', 'Blast 3"', 'Blast 5"',
    'Captured', 'Deadly', 'Deadly vs Mount', 'Distracted', 'Dominated', 'Fast', 'Immobilised', 'Infected',
    'Knocked down', 'On Fire', 'Poisoned', 'Push 1"', 'Push 2"', 'Push 3"', 'Readied', 'Scared', 'Spray',
    'Stunned', 'Teardrop', 'Thrown', 'Unreliable', 'Unwieldy', 'Weakened'
  ];

  /* Action symbols used on star qualities and special effects. */
  const ACTIONS = { '': 'None', F: 'Free', P: 'Passive', S: 'Special' };

  /* Customising Stars & Co-Stars, pp. 38-47. */
  const CUSTOMISE = {
    defencePerPoint: 2,
    statPerPoint: 1,
    maxStatsUp: 2,
    maxStatsDown: 2,
    genreSwap: 1,
    maxGenreSwaps: 1,
    maxEffectSwaps: 2,
    effectRemove: -1,
    maxEffectRemoves: 1,
    effectAdd: 1,
    perPlotPoint: 1,
    magicUserPerLevel: 2,
    movePerInch: 1,
    baseMove: 6,
    attackAdd: 1,
    maxAttackSwaps: 1,
    maxAttackAdds: 1
  };

  window.SEVENTV_RULES = { GENRE_SETS, BOOKS, bookOf, ALIGN, toCore, fromCore, convertGenres, alignedName, KINDS, AFFILIATIONS, STATS, ATTACK_TYPES, ATTACK_TABLE, WEAPON_EFFECTS, ACTIONS, CUSTOMISE };
})();
