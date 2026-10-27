/* Units (Core Rulebook p. 37, 80s book p. 29, Steel Justice Feature Pack p. 9).
   A unit is a group of models rallied under a unit leader, whose Unit Leader special effect lets
   unit members within 6" activate with them. You do not need every member type or the maximum
   number, but the leader cannot activate more than the maximum listed for each type.
   Each slot lists the profile names it can be filled with ("or" choices); names resolve to the
   unit's own book first, then the other book (the 80s table marks Core profiles in italics). */
window.SEVENTV_UNITS = [
  { id: 'city-watch', book: 'core', page: 'Core Rulebook p. 37', name: 'City Watch', leader: ['Noble'], slots: [
    { text: '1-6 Guards', max: 6, opts: ['Guard'] },
    { text: '1 Knight', max: 1, opts: ['Knight'] },
    { text: '1 Dog Handler', max: 1, opts: ['Dog Handler'] },
    { text: '1-3 Dogs', max: 3, opts: ['Dog'] },
    { text: '1 Steed', max: 1, opts: ['Steed'] }] },
  { id: 'criminal-gang', book: 'core', page: 'Core Rulebook p. 37', name: 'Criminal Gang', leader: ['Enforcer'], slots: [
    { text: '1-6 Thugs', max: 6, opts: ['Thug'] },
    { text: '1 Henchman', max: 1, opts: ['Henchman'] },
    { text: '1 Assassin', max: 1, opts: ['Assassin'] },
    { text: '1 Getaway Car', max: 1, opts: ['Getaway Car'] }] },
  { id: 'invasion-force', book: 'core', page: 'Core Rulebook p. 37', name: 'Invasion Force', leader: ['Commander'], slots: [
    { text: '1-4 Alien Invaders', max: 4, opts: ['Alien Invader'] },
    { text: '1-4 Imperial Troopers', max: 4, opts: ['Imperial Trooper'] },
    { text: '1 Monster of the Week', max: 1, opts: ['Monster of the Week'] },
    { text: '1 Shuttlecraft', max: 1, opts: ['Shuttlecraft'] }] },
  { id: 'law-enforcement', book: 'core', page: 'Core Rulebook p. 37', name: 'Law Enforcement', leader: ['Agent'], slots: [
    { text: '1-6 Cops', max: 6, opts: ['Cop'] },
    { text: '1 Rookie', max: 1, opts: ['Rookie'] },
    { text: '1 Sharpshooter', max: 1, opts: ['Sharpshooter'] },
    { text: '1 Squad Car', max: 1, opts: ['Squad Car'] }] },
  { id: 'military-outfit', book: 'core', page: 'Core Rulebook p. 37', name: 'Military Outfit', leader: ['Sarge'], slots: [
    { text: '1-6 Soldiers', max: 6, opts: ['Soldier'] },
    { text: '1 Heavy Weapons Team', max: 1, opts: ['Heavy Weapons Team'] },
    { text: '1 Physician', max: 1, opts: ['Physician'] },
    { text: '1 Jeep or Truck', max: 1, opts: ['Jeep', 'Truck'] }] },
  { id: 'minion-squad', book: 'core', page: 'Core Rulebook p. 37', name: 'Minion Squad', leader: ['Sarge'], slots: [
    { text: '1-8 Goons', max: 8, opts: ['Goon'] },
    { text: '1 Scientist', max: 1, opts: ['Scientist'] },
    { text: '1 Killer Robot or 1 Heavy Weapons Team', max: 1, opts: ['Killer Robot', 'Heavy Weapons Team'] },
    { text: '1 Chopper', max: 1, opts: ['Chopper'] }] },
  { id: 'rebel-faction', book: 'core', page: 'Core Rulebook p. 37', name: 'Rebel Faction', leader: ['Commander'], slots: [
    { text: '1-6 Freedom Fighters', max: 6, opts: ['Freedom Fighter'] },
    { text: '1-3 Space Commandos', max: 3, opts: ['Space Commando'] },
    { text: '1 Daredevil', max: 1, opts: ['Daredevil'] },
    { text: '1 Jeep or Shuttlecraft', max: 1, opts: ['Jeep', 'Shuttlecraft'] }] },
  { id: 'security-detail', book: 'core', page: 'Core Rulebook p. 37', name: 'Security Detail', leader: ['Agent'], slots: [
    { text: '1-6 Security Guards', max: 6, opts: ['Security Guard'] },
    { text: '1 Dog Handler', max: 1, opts: ['Dog Handler'] },
    { text: '1-3 Dogs', max: 3, opts: ['Dog'] },
    { text: '1 VIP', max: 1, opts: ['VIP'] },
    { text: '1 Limo', max: 1, opts: ['Limo'] }] },

  { id: 'corporate-suits', book: '80s', page: '80s book p. 29', name: 'Corporate Suits', leader: ['Executive'], slots: [
    { text: '1-4 Bodyguards', max: 4, opts: ['Bodyguard'] },
    { text: '1 Secretary or Yuppie or Lawyer', max: 1, opts: ['Secretary', 'Yuppie', 'Lawyer'] },
    { text: '1 Military Robot', max: 1, opts: ['Military Robot'] },
    { text: '1 Limo or Sports Car', max: 1, opts: ['Limo', 'Sports Car'] }] },
  { id: 'crime-syndicate', book: '80s', page: '80s book p. 29', name: 'Crime Syndicate', leader: ['Criminal Boss'], slots: [
    { text: '1-6 Criminals or 1-6 Eurotrash Gangsters', max: 6, opts: ['Criminal', 'Eurotrash Gangster'] },
    { text: '1 Drug Runner or Yakuza or Driver', max: 1, opts: ['Drug Runner', 'Yakuza', 'Driver'] },
    { text: '1 Getaway Car or Motorbike', max: 1, opts: ['Getaway Car', 'Motorbike'] }] },
  { id: 'fright-club', book: '80s', page: '80s book p. 29', name: 'Fright Club', leader: ['Ghoulish Host'], slots: [
    { text: '1-8 Deadites', max: 8, opts: ['Deadite'] },
    { text: '1 Hellion', max: 1, opts: ['Hellion'] },
    { text: '1 Demonic Dog', max: 1, opts: ['Demonic Dog'] }] },
  { id: 'imperial-detachment', book: '80s', page: '80s book p. 29', name: 'Imperial Detachment', leader: ['Imperial Officer'], slots: [
    { text: '1-4 Imperial Troopers', max: 4, opts: ['Imperial Trooper'] },
    { text: '1 Heavy Weapons Team', max: 1, opts: ['Heavy Weapons Team'] },
    { text: '1 Undercover Alien', max: 1, opts: ['Undercover Alien'] },
    { text: '1 Shuttlecraft', max: 1, opts: ['Shuttlecraft'] }] },
  { id: 'mass-of-things', book: '80s', page: '80s book p. 29', name: 'Mass of Things', leader: ['Head Thing'], slots: [
    { text: '1-4 Spider Things', max: 4, opts: ['Spider Thing'] },
    { text: '1-2 Dog Things', max: 2, opts: ['Dog Thing'] },
    { text: '1 Human Thing', max: 1, opts: ['Human Thing'] }] },
  { id: 'police-squad', book: '80s', page: '80s book p. 29', name: 'Police Squad', leader: ['Police Sergeant'], slots: [
    { text: '1-6 Cops', max: 6, opts: ['Cop'] },
    { text: '1 Plainclothes Cop', max: 1, opts: ['Plainclothes Cop'] },
    { text: '1 SWAT Officer', max: 1, opts: ['SWAT Officer'] },
    { text: '1 Squad Car or Armoured Van', max: 1, opts: ['Squad Car', 'Armoured Van'] }] },
  { id: 'school-class', book: '80s', page: '80s book p. 29', name: 'School Class', leader: ['Coach', 'Prom Queen'], slots: [
    { text: '1-8 Schoolkids', max: 8, opts: ['Schoolkid'] },
    { text: '1 Cool Kid or Nerd', max: 1, opts: ['Cool Kid', 'Nerd'] },
    { text: '1 Athlete', max: 1, opts: ['Athlete'] },
    { text: '1 School Bus', max: 1, opts: ['Schoolbus'] }] },
  { id: 'security-team', book: '80s', page: '80s book p. 29', name: 'Security Team', leader: ['Crooked Official'], slots: [
    { text: '1-6 Private Security', max: 6, opts: ['Private Security'] },
    { text: '1 VIP or Bureaucrat', max: 1, opts: ['VIP', 'Bureaucrat'] },
    { text: '1 Mercenary', max: 1, opts: ['Mercenary'] },
    { text: '1 Armoured Van', max: 1, opts: ['Armoured Van'] }] },
  { id: 'sheriffs-department', book: '80s', page: '80s book p. 29', name: "Sheriff's Department", leader: ['Sheriff'], slots: [
    { text: '1-6 Cops or 1-6 State Troopers', max: 6, opts: ['Cop', 'State Trooper'] },
    { text: '1 Informant', max: 1, opts: ['Informant'] },
    { text: '1 Motorbike or Squad Car', max: 1, opts: ['Motorbike', 'Squad Car'] }] },
  { id: 'starship-marines', book: '80s', page: '80s book p. 29', name: 'Starship Marines', leader: ['Galactic Marine Sarge'], slots: [
    { text: '1-4 Galactic Marines', max: 4, opts: ['Galactic Marine'] },
    { text: '1 Galactic Heavy Gunner', max: 1, opts: ['Galactic Heavy Gunner'] },
    { text: '1 Android', max: 1, opts: ['Android'] },
    { text: '1 Shuttlecraft', max: 1, opts: ['Shuttlecraft'] }] },
  { id: 'video-wave', book: '80s', page: '80s book p. 29', name: 'Video Wave', leader: ['Operator'], slots: [
    { text: '1-6 Video Invaders', max: 6, opts: ['Video Invader'] },
    { text: '1 Video Ghost', max: 1, opts: ['Video Ghost'] },
    { text: '1 Electron Hunter', max: 1, opts: ['Electron Hunter'] }] },
  { id: 'warsaw-pack', book: '80s', page: '80s book p. 29', name: 'Warsaw Pack', leader: ['Kommisar'], slots: [
    { text: '1-6 Kold Warriors', max: 6, opts: ['Kold Warrior'] },
    { text: '1 Foreign Agent', max: 1, opts: ['Foreign Agent'] },
    { text: '1 Special Forces', max: 1, opts: ['Special Forces'] },
    { text: '1 Truck or Chopper', max: 1, opts: ['Truck', 'Chopper'] }] },

  /* Steel Justice Feature Pack p. 9. Cops and Thugs are Core profiles. The pack has no card for the
     OCPD Riot Sergeant, so that leader does not resolve to a profile. */
  { id: 'corporate-kill-squad', book: 'steeljustice', page: 'Steel Justice p. 9', name: 'Corporate Kill Squad', leader: ['Contract Killer'], slots: [
    { text: '1-2 Cyborg Assassins', max: 2, opts: ['Cyborg Assassin'] },
    { text: '1-4 Hired Guns', max: 4, opts: ['Hired Gun'] }] },
  { id: 'corpsec-protection-detail', book: 'steeljustice', page: 'Steel Justice p. 9', name: 'CorpSec Protection Detail', leader: ['CorpSec Officer'], slots: [
    { text: '1-3 CorpSec Troopers', max: 3, opts: ['CorpSec Trooper'] },
    { text: '1-6 CorpSec Guards', max: 6, opts: ['CorpSec Guard'] }] },
  { id: 'mutant-cell', book: 'steeljustice', page: 'Steel Justice p. 9', name: 'Mutant Cell', leader: ['Mutant Leader'], slots: [
    { text: '1-3 Toxic Mutants', max: 3, opts: ['Toxic Mutant'] },
    { text: '1-3 Mongrols', max: 3, opts: ['Mongrol'] }] },
  { id: 'ocpd-assault-team', book: 'steeljustice', page: 'Steel Justice p. 9', name: 'OCPD Assault Team', leader: ['OCPD Riot Sergeant'], slots: [
    { text: '1-3 OCPD Riot Officers', max: 3, opts: ['OCPD Riot Officer'] },
    { text: '1-6 Cops', max: 6, opts: ['Cop'] }] },
  { id: 'slick-crew', book: 'steeljustice', page: 'Steel Justice p. 9', name: 'Slick Crew', leader: ['Klorox Joe'], slots: [
    { text: '1-4 Slicks', max: 4, opts: ['Slick'] },
    { text: '1 Slick Sanitiser', max: 1, opts: ['Slick Sanitiser'] }] },
  { id: 'viddy-gang', book: 'steeljustice', page: 'Steel Justice p. 9', name: 'Viddy Gang', leader: ['Big Belly Borg Boss'], slots: [
    { text: '1-6 Viddy Gangers', max: 6, opts: ['Viddy Ganger'] },
    { text: '1-3 Thugs', max: 3, opts: ['Thug'] }] }
];
