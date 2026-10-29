/* Film inspiration for the Genres page: films from the 1950s on.
   g: genre keys from both sets (Core: action adventure fantasy historical horror scifi;
      80s: coldwar frightmare greedglamour hiredhelp rebelstate silicondream).
   cast: [character, actor, role, suggested profile id]. Role is affiliation + type:
      hs/vs/ns = heroic/villainous/neutral Star, hc/vc/nc = Co-Star, he/ve/ne = Extra, nv = vehicle.
   Profiles are suggestions for a starting point, not official casting. */
(function () {
  const M = (t, y, g, pitch, cast) => ({ t, y, decade: Math.floor(y / 10) * 10, g: g.split(' '), pitch, cast });
  window.SEVENTV_MOVIES = [
    // 1980s
    M('Escape from New York', 1981, 'action scifi rebelstate hiredhelp', 'A one-eyed convict has 24 hours to pull the President out of Manhattan, now a walled prison island.', [
      ['Snake Plissken', 'Kurt Russell', 'hs', 'nam-vet-80s'], ['Bob Hauk', 'Lee Van Cleef', 'nc', 'relentless-pursuer-80s'], ['Cabbie', 'Ernest Borgnine', 'hc', 'everyman'],
      ['The Duke of New York', 'Isaac Hayes', 'vs', 'kingpin'], ['The Duke\'s gang', '', 've', 'thug']]),
    M('Raiders of the Lost Ark', 1981, 'adventure historical fantasy hiredhelp', 'An archaeologist races Nazi agents across the globe for the Ark of the Covenant.', [
      ['Indiana Jones', 'Harrison Ford', 'hs', 'intrepid-adventurer'], ['Marion Ravenwood', 'Karen Allen', 'hc', 'daring-rebel'], ['Sallah', 'John Rhys-Davies', 'hc', 'loyal-sidekick'],
      ['René Belloq', 'Paul Freeman', 'vs', 'mastermind'], ['Major Toht', 'Ronald Lacey', 'vc', 'red-right-hand'], ['German soldiers', '', 've', 'soldier']]),
    M('The Thing', 1982, 'horror scifi frightmare', 'A shape-shifting alien picks off an Antarctic research team one by one. Nobody can be trusted.', [
      ['R.J. MacReady', 'Kurt Russell', 'hs', 'grizzled-veteran'], ['Childs', 'Keith David', 'hc', 'practical-mechanic-80s'],
      ['The Thing', '', 'vs', 'horrific-thing-80s'], ['Blair', 'Wilford Brimley', 'vc', 'mad-scientist'], ['Infected crew', '', 've', 'shapeshifter']]),
    M('Blade Runner', 1982, 'scifi silicondream hiredhelp', 'A burned-out blade runner hunts four replicants through a rain-soaked Los Angeles.', [
      ['Rick Deckard', 'Harrison Ford', 'hs', 'grizzled-veteran'], ['Rachael', 'Sean Young', 'hc', 'daring-rebel'], ['Gaff', 'Edward James Olmos', 'nc', 'relentless-pursuer-80s'],
      ['Roy Batty', 'Rutger Hauer', 'vs', 'cybernetic-organism-80s'], ['Pris', 'Daryl Hannah', 'vc', 'shinzu-sj'], ['Leon', 'Brion James', 've', 'android-80s']]),
    M('Scarface', 1983, 'action greedglamour', 'A Cuban refugee claws his way to the top of the Miami cocaine trade, and over the edge.', [
      ['Tony Montana', 'Al Pacino', 'vs', 'kingpin'], ['Manny Ribera', 'Steven Bauer', 'vc', 'red-right-hand'], ['Elvira Hancock', 'Michelle Pfeiffer', 'vc', 'career-criminal'],
      ['Alejandro Sosa', 'Paul Shenar', 'vc', 'organised-criminal-80s'], ['Sosa\'s hitmen', '', 've', 'assassin']]),
    M('The Terminator', 1984, 'action scifi horror silicondream frightmare', 'A cyborg assassin from the future hunts a waitress; a lone soldier follows it back to protect her.', [
      ['Kyle Reese', 'Michael Biehn', 'hs', 'grizzled-veteran'], ['Sarah Connor', 'Linda Hamilton', 'hc', 'final-girl'],
      ['The Terminator', 'Arnold Schwarzenegger', 'vs', 'red-eye-sj'], ['Lt. Traxler', 'Paul Winfield', 'he', 'cop']]),
    M('A Nightmare on Elm Street', 1984, 'horror frightmare', 'A burned killer stalks teenagers in their dreams. If he gets you there, you die for real.', [
      ['Nancy Thompson', 'Heather Langenkamp', 'hs', 'innocent-soul'], ['Glen Lantz', 'Johnny Depp', 'hc', 'brat-packer-80s'],
      ['Freddy Krueger', 'Robert Englund', 'vs', 'dream-stalker-80s'], ['Lt. Thompson', 'John Saxon', 'he', 'cop']]),
    M('Beverly Hills Cop', 1984, 'action greedglamour', 'A Detroit street cop follows his friend\'s killers to the mansions of Beverly Hills.', [
      ['Axel Foley', 'Eddie Murphy', 'hs', 'unlikely-interloper-80s'], ['Billy Rosewood', 'Judge Reinhold', 'hc', 'loyal-sidekick'], ['Sgt. Taggart', 'John Ashton', 'hc', 'maverick-cop-80s'],
      ['Victor Maitland', 'Steven Berkoff', 'vs', 'kingpin'], ['Zack', 'Jonathan Banks', 'vc', 'red-right-hand']]),
    M('Ghostbusters', 1984, 'horror fantasy adventure frightmare', 'Three sacked parapsychologists start a ghost-catching business just as an ancient god comes to New York.', [
      ['Peter Venkman', 'Bill Murray', 'hs', 'unlikely-interloper-80s'], ['Egon Spengler', 'Harold Ramis', 'hc', 'quirky-investigator'], ['Ray Stantz', 'Dan Aykroyd', 'hc', 'practical-mechanic-80s'],
      ['Winston Zeddemore', 'Ernie Hudson', 'hc', 'everyman'], ['Gozer', '', 'vs', 'dark-shadow'], ['Stay Puft Marshmallow Man', '', 'vs', 'raging-brute-80s']]),
    M('Commando', 1985, 'action hiredhelp rebelstate', 'A retired special forces colonel has eleven hours to get his kidnapped daughter back from a gang planning a coup.', [
      ['John Matrix', 'Arnold Schwarzenegger', 'hs', 'nam-vet-80s'], ['Cindy', 'Rae Dawn Chong', 'hc', 'everyman'],
      ['Bennett', 'Vernon Wells', 'vs', 'warmonger'], ['Arius', 'Dan Hedaya', 'vs', 'stern-authoritarian-80s'], ['Sully', 'David Patrick Kelly', 'vc', 'cruel-bully'], ['Arius\'s mercenaries', '', 've', 'mercenary']]),
    M('Rambo: First Blood Part II', 1985, 'action coldwar rebelstate', 'Rambo goes back to Vietnam to find prisoners of war, and finds he was sent to fail.', [
      ['John Rambo', 'Sylvester Stallone', 'hs', 'nam-vet-80s'], ['Co Bao', 'Julia Nickson', 'hc', 'daring-rebel'], ['Col. Trautman', 'Richard Crenna', 'hc', 'wise-mentor'],
      ['Lt. Col. Podovsky', 'Steven Berkoff', 'vs', 'warmonger'], ['Marshall Murdock', 'Charles Napier', 'vc', 'spy-catcher-80s'], ['Soviet soldiers', '', 've', 'kold-warrior-80s']]),
    M('Back to the Future', 1985, 'scifi adventure silicondream', 'A teenager rides a time-travelling DeLorean to 1955 and has to make sure his parents fall in love.', [
      ['Marty McFly', 'Michael J. Fox', 'hs', 'innocent-soul'], ['Doc Brown', 'Christopher Lloyd', 'hc', 'wise-mentor'],
      ['Biff Tannen', 'Thomas F. Wilson', 'vc', 'cruel-bully'], ['Libyan terrorists', '', 've', 'urban-guerrilla-80s'], ['The DeLorean', '', 'nv', 'supercar']]),
    M('Aliens', 1986, 'scifi horror action silicondream frightmare', 'Ripley returns to the alien planet with a squad of Colonial Marines who think it is a bug hunt.', [
      ['Ellen Ripley', 'Sigourney Weaver', 'hs', 'unlikely-interloper-80s'], ['Cpl. Hicks', 'Michael Biehn', 'hc', 'hardened-grunt-80s'], ['Bishop', 'Lance Henriksen', 'he', 'android-80s'],
      ['The Alien Queen', '', 'vs', 'great-monstrosity'], ['Carter Burke', 'Paul Reiser', 'vc', 'white-collar-80s'], ['Xenomorphs', '', 've', 'xeno-80s']]),
    M('Cobra', 1986, 'action horror frightmare', 'An LAPD Zombie Squad cop guards the only witness who can identify a cult of axe-wielding killers terrorising the city.', [
      ['Lt. Marion Cobretti', 'Sylvester Stallone', 'hs', 'grizzled-veteran'], ['Ingrid Knudsen', 'Brigitte Nielsen', 'hc', 'everyman'], ['Sgt. Tony Gonzales', 'Reni Santoni', 'hc', 'lieutenant-anderson-sj'],
      ['The Night Slasher', 'Brian Thompson', 'vs', 'sadistic-slasher'], ['Nancy Stalk', 'Lee Garlington', 'vc', 'red-right-hand'], ['The New World', '', 've', 'cultist']]),
    M('Big Trouble in Little China', 1986, 'fantasy action adventure hiredhelp', 'A loud-mouthed trucker follows his friend into a sorcerer\'s underworld beneath Chinatown.', [
      ['Jack Burton', 'Kurt Russell', 'hs', 'loveable-scoundrel'], ['Wang Chi', 'Dennis Dun', 'hc', 'loyal-sidekick'], ['Gracie Law', 'Kim Cattrall', 'hc', 'daring-rebel'], ['Egg Shen', 'Victor Wong', 'hc', 'wise-mentor'],
      ['Lo Pan', 'James Hong', 'vs', 'dark-shadow'], ['The Three Storms', '', 'vc', 'sinister-mystic']]),
    M('Predator', 1987, 'action scifi horror coldwar frightmare', 'A special forces rescue team in a Central American jungle is hunted by an invisible alien trophy hunter.', [
      ['Dutch', 'Arnold Schwarzenegger', 'hs', 'grizzled-veteran'], ['Dillon', 'Carl Weathers', 'hc', 'spy-catcher-80s'], ['Anna', 'Elpidia Carrillo', 'hc', 'lone-survivor'],
      ['The Predator', '', 'vs', 'hunter-alien-80s'], ['Dutch\'s team', '', 'he', 'special-forces-80s'], ['Guerrillas', '', 've', 'jungle-fighter-80s']]),
    M('Lethal Weapon', 1987, 'action hiredhelp greedglamour', 'A suicidal cop and a by-the-book partner take on a heroin ring run by ex-special forces mercenaries.', [
      ['Martin Riggs', 'Mel Gibson', 'hs', 'grizzled-veteran'], ['Roger Murtaugh', 'Danny Glover', 'hc', 'maverick-cop-80s'],
      ['General McAllister', 'Mitchell Ryan', 'vs', 'kingpin'], ['Mr. Joshua', 'Gary Busey', 'vc', 'red-right-hand'], ['Shadow Company mercenaries', '', 've', 'mercenary']]),
    M('RoboCop', 1987, 'action scifi silicondream greedglamour rebelstate', 'A murdered Detroit cop comes back as a corporate cyborg and goes after his killers.', [
      ['RoboCop', 'Peter Weller', 'hs', 'cop-zero-zero-one-sj'], ['Anne Lewis', 'Nancy Allen', 'hc', 'lieutenant-anderson-sj'],
      ['Clarence Boddicker', 'Kurtwood Smith', 'vs', 'kingpin'], ['Dick Jones', 'Ronny Cox', 'vc', 'white-collar-80s'], ['ED-209', '', 've', 'terrabot-sj'], ['Boddicker\'s gang', '', 've', 'street-punk-80s']]),
    M('The Running Man', 1987, 'scifi action rebelstate greedglamour', 'A framed cop is thrown into a deadly TV game show and hunted by costumed killers.', [
      ['Ben Richards', 'Arnold Schwarzenegger', 'hs', 'grizzled-veteran'], ['Amber Mendez', 'María Conchita Alonso', 'hc', 'daring-rebel'],
      ['Damon Killian', 'Richard Dawson', 'vs', 'darrin-killjoy-sj'], ['Buzzsaw', 'Gus Rethwisch', 've', 'ripsaw-sj'], ['Subzero', 'Toru Tanaka', 've', 'slapshot-sj'], ['Resistance fighters', '', 'he', 'resistance-fighter-sj'],
      ['Captain Freedom', 'Jesse Ventura', 'vc', 'captain-terra-sj'], ['Fireball', 'Jim Brown', 've', 'scorch-sj'], ['Dynamo', 'Erland van Lidth', 've', 'volt-sj'], ['Laughlin and Weiss', '', 'he', 'challenger-sj']]),
    M('Die Hard', 1988, 'action greedglamour', 'An off-duty New York cop is the only man loose in a skyscraper taken over by thieves posing as terrorists.', [
      ['John McClane', 'Bruce Willis', 'hs', 'unlikely-interloper-80s'], ['Sgt. Al Powell', 'Reginald VelJohnson', 'hc', 'loyal-sidekick'], ['Holly Gennero', 'Bonnie Bedelia', 'he', 'hostage-80s'],
      ['Hans Gruber', 'Alan Rickman', 'vs', 'bold-planner-80s'], ['Karl', 'Alexander Godunov', 'vc', 'red-right-hand'], ['Gruber\'s crew', '', 've', 'eurotrash-gangster-80s']]),
    M('They Live', 1988, 'scifi horror rebelstate greedglamour', 'A drifter finds sunglasses that reveal the alien elite ruling Earth through hidden messages.', [
      ['Nada', 'Roddy Piper', 'hs', 'unlikely-interloper-80s'], ['Frank Armitage', 'Keith David', 'hc', 'everyman'], ['Holly Thompson', 'Meg Foster', 'vc', 'white-collar-80s'],
      ['The alien elite', '', 'vs', 'stern-authoritarian-80s'], ['Disguised aliens', '', 've', 'undercover-alien-80s']]),
    M('The Naked Gun: From the Files of Police Squad!', 1988, 'action greedglamour', 'The LAPD\'s most accidental detective stumbles into a conspiracy to assassinate the Queen of England.', [
      ['Lt. Frank Drebin', 'Leslie Nielsen', 'hs', 'unlikely-interloper-80s'], ['Ed Hocken', 'George Kennedy', 'hc', 'loyal-sidekick'], ['Jane Spencer', 'Priscilla Presley', 'hc', 'everyman'],
      ['Vincent Ludwig', 'Ricardo Montalban', 'vs', 'mastermind'], ['Ludwig\'s men', '', 've', 'thug']]),
    M('Lethal Weapon 2', 1989, 'action hiredhelp coldwar greedglamour', 'Two LA cops go to war with South African diplomats using diplomatic immunity as a licence to run drugs and kill.', [
      ['Martin Riggs', 'Mel Gibson', 'hs', 'grizzled-veteran'], ['Roger Murtaugh', 'Danny Glover', 'hc', 'maverick-cop-80s'], ['Rika van den Haas', 'Patsy Kensit', 'hc', 'everyman'],
      ['Arjen Rudd', 'Joss Ackland', 'vs', 'stern-authoritarian-80s'], ['Pieter Vorstedt', 'Derrick O\'Connor', 'vc', 'red-right-hand'], ['Diplomatic thugs', '', 've', 'mercenary']]),
    M('Tango & Cash', 1989, 'action greedglamour hiredhelp', 'Two rival LA supercops are framed by a drug lord, thrown in prison together, and forced to break out to clear their names.', [
      ['Ray Tango', 'Sylvester Stallone', 'hs', 'grizzled-veteran'], ['Gabriel Cash', 'Kurt Russell', 'hc', 'maverick-cop-80s'], ['Kiki', 'Teri Hatcher', 'hc', 'daring-rebel'],
      ['Yves Perret', 'Jack Palance', 'vs', 'kingpin'], ['Perret\'s thugs', '', 've', 'thug']]),

    // 1990s
    M('Die Hard 2', 1990, 'action coldwar hiredhelp', 'McClane is stuck at a snowbound airport while rogue soldiers seize it to free a drug-lord dictator.', [
      ['John McClane', 'Bruce Willis', 'hs', 'unlikely-interloper-80s'], ['Holly McClane', 'Bonnie Bedelia', 'he', 'hostage-80s'],
      ['Col. Stuart', 'William Sadler', 'vs', 'warmonger'], ['General Esperanza', 'Franco Nero', 'vc', 'organised-criminal-80s'], ['Major Grant', 'John Amos', 'vc', 'red-right-hand'], ['Stuart\'s soldiers', '', 've', 'mercenary']]),
    M('RoboCop 2', 1990, 'action scifi silicondream greedglamour', 'RoboCop takes on a messianic drug lord pushing Nuke, while OCP builds a new cyborg around the brain of the worst criminal in Detroit.', [
      ['RoboCop', 'Peter Weller', 'hs', 'cop-zero-zero-one-sj'], ['Anne Lewis', 'Nancy Allen', 'hc', 'lieutenant-anderson-sj'],
      ['The Old Man', 'Dan O\'Herlihy', 'vs', 'silas-caine-sj'], ['Cain', 'Tom Noonan', 'vc', 'roid-sj'], ['RoboCop 2', '', 'vc', 'terrabot-2000-sj'],
      ['Dr. Juliette Faxx', 'Belinda Bauer', 'vc', 'mad-scientist'], ['Hob', 'Gabriel Damon', 'vc', 'career-criminal'], ['Cain\'s gang', '', 've', 'thug']]),
    M('Total Recall', 1990, 'scifi action rebelstate silicondream', 'A construction worker buys a memory implant and wakes up as a secret agent in the middle of a Martian rebellion.', [
      ['Douglas Quaid', 'Arnold Schwarzenegger', 'hs', 'secret-agent'], ['Melina', 'Rachel Ticotin', 'hc', 'daring-rebel'], ['Kuato', 'Marshall Bell', 'hc', 'flash-proctor-sj'],
      ['Vilos Cohaagen', 'Ronny Cox', 'vs', 'silas-caine-sj'], ['Richter', 'Michael Ironside', 'vc', 'ruthless-nemesis'], ['Mutant rebels', '', 'he', 'toxic-mutant-sj']]),
    M('Terminator 2: Judgment Day', 1991, 'scifi action silicondream', 'A reprogrammed Terminator protects young John Connor from a liquid-metal assassin.', [
      ['The T-800', 'Arnold Schwarzenegger', 'hs', 'cybernetic-organism-80s'], ['Sarah Connor', 'Linda Hamilton', 'hc', 'lone-survivor'], ['John Connor', 'Edward Furlong', 'hc', 'whiz-kid-80s'],
      ['The T-1000', 'Robert Patrick', 'vs', 'red-eye-sj'], ['Miles Dyson', 'Joe Morton', 'ne', 'scientist']]),
    M('Universal Soldier', 1992, 'action scifi silicondream coldwar', 'Two soldiers killed in Vietnam are revived as super-soldiers, and one remembers too much.', [
      ['Luc Deveraux', 'Jean-Claude Van Damme', 'hs', 'cybernetic-organism-80s'], ['Veronica Roberts', 'Ally Walker', 'hc', 'private-investigator-80s'],
      ['Sgt. Andrew Scott', 'Dolph Lundgren', 'vs', 'nam-vet-80s'], ['Col. Perry', 'Ed O\'Ross', 'vc', 'spy-catcher-80s'], ['UniSols', '', 've', 'cyborg-assassin-sj']]),
    M('Under Siege', 1992, 'action coldwar hiredhelp', 'Mercenaries hijack a battleship to steal its nuclear missiles. They forgot about the cook.', [
      ['Casey Ryback', 'Steven Seagal', 'hs', 'secret-agent'], ['Jordan Tate', 'Erika Eleniak', 'hc', 'everyman'],
      ['William Strannix', 'Tommy Lee Jones', 'vs', 'warmonger'], ['Cmdr. Krill', 'Gary Busey', 'vc', 'red-right-hand'], ['Strannix\'s crew', '', 've', 'mercenary']]),
    M('Army of Darkness', 1992, 'fantasy horror historical frightmare', 'A shotgun-toting store clerk is thrown back to the Middle Ages to fight an army of the dead.', [
      ['Ash Williams', 'Bruce Campbell', 'hs', 'unlikely-interloper-80s'], ['Sheila', 'Embeth Davidtz', 'hc', 'daring-rebel'], ['Wiseman', 'Ian Abercrombie', 'hc', 'wise-mentor'],
      ['Evil Ash', 'Bruce Campbell', 'vs', 'dark-shadow'], ['Deadites', '', 've', 'deadite-80s'], ['Skeleton army', '', 've', 'skeleton']]),
    M('Hard Target', 1993, 'action hiredhelp greedglamour', 'A drifting ex-Marine takes on a gang that sells the thrill of hunting homeless men for sport in New Orleans.', [
      ['Chance Boudreaux', 'Jean-Claude Van Damme', 'hs', 'nam-vet-80s'], ['Natasha Binder', 'Yancy Butler', 'hc', 'everyman'], ['Uncle Douvee', 'Wilford Brimley', 'hc', 'loyal-sidekick'],
      ['Emil Fouchon', 'Lance Henriksen', 'vs', 'kingpin'], ['Pik van Cleaf', 'Arnold Vosloo', 'vc', 'red-right-hand'], ['Hired hunters', '', 've', 'mercenary']]),
    M('Demolition Man', 1993, 'scifi action rebelstate', 'A frozen cop is thawed out to stop a frozen psychopath loose in a peaceful, over-polite future.', [
      ['John Spartan', 'Sylvester Stallone', 'hs', 'grizzled-veteran'], ['Lenina Huxley', 'Sandra Bullock', 'hc', 'lieutenant-anderson-sj'], ['Edgar Friendly', 'Denis Leary', 'hc', 'daring-rebel'],
      ['Simon Phoenix', 'Wesley Snipes', 'vs', 'kingpin'], ['Dr. Raymond Cocteau', 'Nigel Hawthorne', 'vs', 'stern-authoritarian-80s'], ['Scraps', '', 'he', 'resistance-fighter-sj']]),
    M('True Lies', 1994, 'action coldwar greedglamour', 'A spy who has hidden his job from his family for years drags his wife into a nuclear terror plot.', [
      ['Harry Tasker', 'Arnold Schwarzenegger', 'hs', 'secret-agent'], ['Helen Tasker', 'Jamie Lee Curtis', 'hc', 'everyman'], ['Gib', 'Tom Arnold', 'hc', 'loyal-sidekick'],
      ['Salim Abu Aziz', 'Art Malik', 'vs', 'warmonger'], ['Juno Skinner', 'Tia Carrere', 'vc', 'rogue-trader-80s'], ['Crimson Jihad', '', 've', 'urban-guerrilla-80s']]),
    M('Speed', 1994, 'action greedglamour', 'A bomb on a city bus will explode if it drops below 50 miles an hour.', [
      ['Jack Traven', 'Keanu Reeves', 'hs', 'unlikely-interloper-80s'], ['Annie Porter', 'Sandra Bullock', 'hc', 'everyman'], ['Harry Temple', 'Jeff Daniels', 'hc', 'loyal-sidekick'],
      ['Howard Payne', 'Dennis Hopper', 'vs', 'mastermind'], ['LAPD SWAT', '', 'he', 'swat-officer-80s']]),
    M('Die Hard with a Vengeance', 1995, 'action greedglamour', 'Hans Gruber\'s brother sends McClane and a Harlem shopkeeper on a bomb-riddled race across New York.', [
      ['John McClane', 'Bruce Willis', 'hs', 'unlikely-interloper-80s'], ['Zeus Carver', 'Samuel L. Jackson', 'hc', 'everyman'],
      ['Simon Gruber', 'Jeremy Irons', 'vs', 'bold-planner-80s'], ['Katya', 'Sam Phillips', 'vc', 'red-right-hand'], ['Simon\'s crew', '', 've', 'eurotrash-gangster-80s']]),
    M('GoldenEye', 1995, 'action coldwar silicondream', 'Bond faces a former friend who plans to wipe out London\'s finances with a stolen Soviet space weapon.', [
      ['James Bond', 'Pierce Brosnan', 'hs', 'special-agent-80s'], ['Natalya Simonova', 'Izabella Scorupco', 'hc', 'whiz-kid-80s'], ['Jack Wade', 'Joe Don Baker', 'he', 'agent'],
      ['Alec Trevelyan', 'Sean Bean', 'vs', 'mastermind'], ['Xenia Onatopp', 'Famke Janssen', 'vc', 'red-right-hand'], ['Gen. Ourumov', 'Gottfried John', 'vc', 'ruthless-nemesis'], ['Boris Grishenko', 'Alan Cumming', 've', 'nerd-80s']]),
    M('Bad Boys', 1995, 'action greedglamour', 'Two Miami detectives swap lives to protect the witness to a murder over stolen heroin.', [
      ['Mike Lowrey', 'Will Smith', 'hs', 'grizzled-veteran'], ['Marcus Burnett', 'Martin Lawrence', 'hc', 'maverick-cop-80s'], ['Julie Mott', 'Téa Leoni', 'hc', 'everyman'],
      ['Fouchet', 'Tchéky Karyo', 'vs', 'kingpin'], ['Fouchet\'s crew', '', 've', 'eurotrash-gangster-80s']]),
    M('The Rock', 1996, 'action coldwar hiredhelp', 'An FBI chemist and the only man to escape Alcatraz break into the island, held by rogue Marines with nerve gas.', [
      ['John Mason', 'Sean Connery', 'hs', 'secret-agent'], ['Stanley Goodspeed', 'Nicolas Cage', 'hc', 'quirky-investigator'],
      ['Gen. Hummel', 'Ed Harris', 'vs', 'warmonger'], ['Capt. Darrow', 'Tony Todd', 'vc', 'hardened-grunt-80s'], ['Hummel\'s Marines', '', 've', 'soldier']]),
    M('Face/Off', 1997, 'action hiredhelp', 'An FBI agent takes a terrorist\'s face to find a bomb. Then the terrorist takes his.', [
      ['Sean Archer', 'John Travolta', 'hs', 'grizzled-veteran'], ['FBI team', '', 'he', 'agent'],
      ['Castor Troy', 'Nicolas Cage', 'vs', 'bold-planner-80s'], ['Pollux Troy', 'Alessandro Nivola', 'vc', 'career-criminal'], ['Sasha Hassler', 'Gina Gershon', 'vc', 'career-criminal']]),
    M('Metro', 1997, 'action greedglamour', 'A San Francisco hostage negotiator goes after a vicious jewel thief who has made it personal.', [
      ['Scott Roper', 'Eddie Murphy', 'hs', 'loveable-scoundrel'], ['Kevin McCall', 'Michael Rapaport', 'he', 'sharpshooter'], ['Ronnie Tate', 'Carmen Ejogo', 'he', 'love-interest'],
      ['Michael Korda', 'Michael Wincott', 'vs', 'bold-planner-80s'], ['Korda\'s crew', '', 've', 'thug']]),
    M('Starship Troopers', 1997, 'scifi action rebelstate silicondream', 'Eager young recruits of a militarised future Earth go to war against giant alien bugs.', [
      ['Johnny Rico', 'Casper Van Dien', 'hs', 'innocent-soul'], ['Lt. Rasczak', 'Michael Ironside', 'hc', 'hardened-grunt-80s'], ['Dizzy Flores', 'Dina Meyer', 'hc', 'loyal-sidekick'],
      ['The Brain Bug', '', 'vs', 'great-monstrosity'], ['Arachnid warriors', '', 've', 'swarm'], ['Mobile Infantry', '', 'he', 'galactic-marine-80s']]),
    M('Rush Hour', 1998, 'action greedglamour', 'A Hong Kong inspector and a motor-mouthed LAPD detective hunt the kidnappers of a consul\'s daughter.', [
      ['Inspector Lee', 'Jackie Chan', 'hs', 'wonder-warrior-80s'], ['James Carter', 'Chris Tucker', 'hc', 'maverick-cop-80s'], ['Soo Yung', 'Julia Hsu', 'he', 'vip'],
      ['Juntao', 'Tom Wilkinson', 'vs', 'mastermind'], ['Sang', 'Ken Leung', 'vc', 'red-right-hand']]),
    M('The Matrix', 1999, 'scifi action silicondream rebelstate', 'A hacker learns the world is a machine-made simulation and joins the rebels fighting it.', [
      ['Neo', 'Keanu Reeves', 'hs', 'innocent-soul'], ['Morpheus', 'Laurence Fishburne', 'hc', 'wise-mentor'], ['Trinity', 'Carrie-Anne Moss', 'hc', 'daring-rebel'],
      ['Agent Smith', 'Hugo Weaving', 'vs', 'digital-avatar-80s'], ['Cypher', 'Joe Pantoliano', 'vc', 'red-right-hand'], ['Agents', '', 've', 'agent']]),
    M('The Mummy', 1999, 'adventure fantasy horror historical frightmare', 'A legionnaire and a librarian wake a cursed high priest in a lost Egyptian city.', [
      ['Rick O\'Connell', 'Brendan Fraser', 'hs', 'intrepid-adventurer'], ['Evelyn Carnahan', 'Rachel Weisz', 'hc', 'quirky-investigator'], ['Jonathan Carnahan', 'John Hannah', 'hc', 'loyal-sidekick'], ['Ardeth Bay', 'Oded Fehr', 'hc', 'mythic-champion'],
      ['Imhotep', 'Arnold Vosloo', 'vs', 'dark-shadow'], ['Beni', 'Kevin J. O\'Connor', 'vc', 'career-criminal'], ['Mummies', '', 've', 'mummy']]),
    M('Lethal Weapon 3', 1992, 'action hiredhelp greedglamour', 'Riggs and Murtaugh chase a dirty cop flooding the streets with stolen police hardware, days before Roger\'s retirement.', [
      ['Martin Riggs', 'Mel Gibson', 'hs', 'grizzled-veteran'], ['Roger Murtaugh', 'Danny Glover', 'hc', 'maverick-cop-80s'], ['Lorna Cole', 'Rene Russo', 'hc', 'daring-rebel'],
      ['Jack Travis', 'Stuart Wilson', 'vs', 'kingpin'], ['Travis\'s crew', '', 've', 'thug']]),
    M('Timecop', 1994, 'action scifi', 'A time-travel enforcement cop hunts a corrupt senator rewriting history to steal his way to the White House.', [
      ['Max Walker', 'Jean-Claude Van Damme', 'hs', 'secret-agent'], ['Melissa Walker', 'Mia Sara', 'hc', 'everyman'],
      ['Senator McComb', 'Ron Silver', 'vs', 'stern-authoritarian-80s'], ['TEC agents', '', 'he', 'agent']]),
    M('Desperado', 1995, 'action hiredhelp greedglamour', 'A guitar-case-toting gunman tears through a Mexican border town hunting the drug lord who destroyed his life.', [
      ['El Mariachi', 'Antonio Banderas', 'hs', 'grizzled-veteran'], ['Carolina', 'Salma Hayek', 'hc', 'daring-rebel'], ['Buscemi', 'Steve Buscemi', 'hc', 'loyal-sidekick'],
      ['Bucho', 'Joaquim de Almeida', 'vs', 'kingpin'], ['Cartel enforcers', '', 've', 'mercenary']]),
    M('Judge Dredd', 1995, 'action scifi rebelstate', 'Mega-City One\'s toughest lawman is framed by his cloned brother, stripped of his badge, and cast into the wasteland.', [
      ['Judge Dredd', 'Sylvester Stallone', 'hs', 'cop-zero-zero-one-sj'], ['Herman Ferguson', 'Rob Schneider', 'hc', 'everyman'], ['Judge Hershey', 'Diane Lane', 'hc', 'lieutenant-anderson-sj'],
      ['Rico Dredd', 'Armand Assante', 'vs', 'dark-shadow'], ['Street criminals', '', 've', 'urban-guerrilla-80s']]),
    M('Escape from L.A.', 1996, 'action scifi rebelstate', 'Snake Plissken is blackmailed into infiltrating the island of Los Angeles to retrieve a world-ending device before sunrise.', [
      ['Snake Plissken', 'Kurt Russell', 'hs', 'nam-vet-80s'], ['Map to the Stars Eddie', 'Steve Buscemi', 'hc', 'rogue-trader-80s'], ['Pipeline', 'Pam Grier', 'hc', 'daring-rebel'],
      ['Cuervo Jones', 'George Corraface', 'vs', 'kingpin'], ['Malloy', 'Stacy Keach', 'nc', 'relentless-pursuer-80s']]),
    M('Lethal Weapon 4', 1998, 'action hiredhelp greedglamour', 'An unstoppable Chinese Triad enforcer drags the ageing LAPD duo back into action while they juggle grandchildren and retirement.', [
      ['Martin Riggs', 'Mel Gibson', 'hs', 'grizzled-veteran'], ['Roger Murtaugh', 'Danny Glover', 'hc', 'maverick-cop-80s'], ['Lee Butters', 'Chris Rock', 'hc', 'maverick-cop-80s'],
      ['Wah Sing Ku', 'Jet Li', 'vs', 'yaga-sj'], ['Hong Kong Triad', '', 've', 'martial-artist-80s']]),
    M('Blade', 1998, 'action horror frightmare', 'A half-vampire hunter wages a secret war to stop the vampire aristocracy from raising an ancient blood god.', [
      ['Blade', 'Wesley Snipes', 'hs', 'masked-crusader'], ['Abraham Whistler', 'Kris Kristofferson', 'hc', 'wise-mentor'], ['Karen Jenson', 'N\'Bushe Wright', 'hc', 'quirky-investigator'],
      ['Deacon Frost', 'Stephen Dorff', 'vs', 'mastermind'], ['Vampires', '', 've', 'vampire']]),

    // 2000s
    M('Gladiator', 2000, 'historical action rebelstate', 'A betrayed Roman general fights his way up through the arenas to face the emperor who murdered his family.', [
      ['Maximus', 'Russell Crowe', 'hs', 'bold-blade'], ['Proximo', 'Oliver Reed', 'hc', 'wise-mentor'], ['Juba', 'Djimon Hounsou', 'hc', 'loyal-sidekick'],
      ['Commodus', 'Joaquin Phoenix', 'vs', 'corrupt-authority'], ['Praetorian Guard', '', 've', 'guard'], ['Gladiators', '', 'he', 'warrior']]),
    M('Pitch Black', 2000, 'scifi horror frightmare hiredhelp', 'Crash survivors on a desert planet must trust a convicted killer when the eclipse brings out the monsters.', [
      ['Richard B. Riddick', 'Vin Diesel', 'hs', 'loveable-scoundrel'], ['Carolyn Fry', 'Radha Mitchell', 'hc', 'final-girl'], ['Imam', 'Keith David', 'hc', 'wise-mentor'],
      ['William J. Johns', 'Cole Hauser', 'vc', 'ruthless-nemesis'], ['Bioraptors', '', 've', 'swarm']]),
    M('The Lord of the Rings: The Fellowship of the Ring', 2001, 'fantasy adventure', 'A hobbit and eight companions set out to destroy the One Ring before the Dark Lord reclaims it.', [
      ['Frodo Baggins', 'Elijah Wood', 'hs', 'innocent-soul'], ['Aragorn', 'Viggo Mortensen', 'hc', 'mythic-champion'], ['Gandalf', 'Ian McKellen', 'hc', 'wise-mentor'],
      ['Sauron', '', 'vs', 'evil-overlord'], ['Saruman', 'Christopher Lee', 'vc', 'sinister-mystic'], ['Ringwraiths', '', 've', 'phantom'], ['Uruk-hai', '', 've', 'brutish-footsoldier']]),
    M('The Bourne Identity', 2002, 'action coldwar', 'An amnesiac pulled from the sea finds he has a killer\'s skills, and a CIA programme that wants him dead.', [
      ['Jason Bourne', 'Matt Damon', 'hs', 'special-agent-80s'], ['Marie Kreutz', 'Franka Potente', 'hc', 'everyman'],
      ['Alexander Conklin', 'Chris Cooper', 'vs', 'stern-authoritarian-80s'], ['The Professor', 'Clive Owen', 'vc', 'red-right-hand'], ['Treadstone assets', '', 've', 'assassin']]),
    M('28 Days Later', 2002, 'horror scifi frightmare', 'A man wakes from a coma into an empty London overrun by the rage-infected.', [
      ['Jim', 'Cillian Murphy', 'hs', 'innocent-soul'], ['Selena', 'Naomie Harris', 'hc', 'lone-survivor'], ['Frank', 'Brendan Gleeson', 'hc', 'everyman'],
      ['Major West', 'Christopher Eccleston', 'vs', 'warmonger'], ['The Infected', '', 've', 'zombie']]),
    M('Equilibrium', 2002, 'scifi action rebelstate', 'In a future that outlaws emotion, an elite enforcer stops taking his suppressant and joins the resistance.', [
      ['John Preston', 'Christian Bale', 'hs', 'rebel-commander-80s'], ['Mary O\'Brien', 'Emily Watson', 'hc', 'daring-rebel'],
      ['Vice-Counsel DuPont', 'Angus Macfadyen', 'vs', 'stern-authoritarian-80s'], ['Brandt', 'Taye Diggs', 'vc', 'ruthless-nemesis'], ['Sweepers', '', 've', 'secret-police-80s']]),
    M('Kill Bill: Volume 1', 2003, 'action hiredhelp', 'A former assassin wakes from a coma and works through a list of the killers who left her for dead.', [
      ['The Bride', 'Uma Thurman', 'hs', 'wonder-warrior-80s'], ['Hattori Hanzo', 'Sonny Chiba', 'hc', 'wise-mentor'],
      ['O-Ren Ishii', 'Lucy Liu', 'vs', 'kingpin'], ['Bill', 'David Carradine', 'vs', 'mastermind'], ['Gogo Yubari', 'Chiaki Kuriyama', 'vc', 'red-right-hand'], ['The Crazy 88', '', 've', 'yakuza-80s']]),
    M('Pirates of the Caribbean: The Curse of the Black Pearl', 2003, 'adventure fantasy historical', 'A rogue captain and a blacksmith chase cursed pirates who turn to skeletons in the moonlight.', [
      ['Jack Sparrow', 'Johnny Depp', 'hs', 'loveable-scoundrel'], ['Will Turner', 'Orlando Bloom', 'hc', 'mythic-champion'], ['Elizabeth Swann', 'Keira Knightley', 'hc', 'daring-rebel'],
      ['Captain Barbossa', 'Geoffrey Rush', 'vs', 'dark-shadow'], ['Cursed pirates', '', 've', 'skeleton'], ['Royal Navy', '', 'ne', 'soldier']]),
    M('Collateral', 2004, 'action hiredhelp', 'A Los Angeles cab driver is forced to drive a hitman between five killings in one night.', [
      ['Max Durocher', 'Jamie Foxx', 'hs', 'unlikely-interloper-80s'], ['Annie Farrell', 'Jada Pinkett Smith', 'hc', 'everyman'], ['Det. Fanning', 'Mark Ruffalo', 'he', 'cop'],
      ['Vincent', 'Tom Cruise', 'vc', 'red-right-hand'], ['Felix Reyes-Torrena', 'Javier Bardem', 'vs', 'kingpin']]),
    M('Man on Fire', 2004, 'action hiredhelp', 'A burned-out ex-Marine bodyguard tears Mexico City apart to find the girl he was hired to protect.', [
      ['John Creasy', 'Denzel Washington', 'hs', 'nam-vet-80s'], ['Paul Rayburn', 'Christopher Walken', 'hc', 'wise-mentor'], ['Pita', 'Dakota Fanning', 'he', 'vip'],
      ['The Voice', '', 'vs', 'kingpin'], ['Kidnappers', '', 've', 'criminal-80s'], ['Corrupt police', '', 've', 'enforcer']]),
    M('Serenity', 2005, 'scifi adventure rebelstate hiredhelp', 'A smuggler crew shelters a psychic fugitive while a government assassin closes in.', [
      ['Malcolm Reynolds', 'Nathan Fillion', 'hs', 'loveable-scoundrel'], ['River Tam', 'Summer Glau', 'hs', 'psychic-prodigy-80s'], ['Zoe Washburne', 'Gina Torres', 'hc', 'hardened-grunt-80s'], ['Jayne Cobb', 'Adam Baldwin', 'he', 'mercenary'],
      ['The Operative', 'Chiwetel Ejiofor', 'vs', 'special-agent-80s'], ['Reavers', '', 've', 'raider']]),
    M('Casino Royale', 2006, 'action coldwar greedglamour', 'A newly promoted 007 takes on a terrorists\' banker across a high-stakes poker table.', [
      ['James Bond', 'Daniel Craig', 'hs', 'special-agent-80s'], ['Vesper Lynd', 'Eva Green', 'hc', 'white-collar-80s'], ['M', 'Judi Dench', 'hc', 'wise-mentor'],
      ['Le Chiffre', 'Mads Mikkelsen', 'vs', 'mastermind'], ['Mollaka', 'Sébastien Foucan', 've', 'daredevil']]),
    M('Apocalypto', 2006, 'historical action', 'A Maya hunter captured for sacrifice escapes and runs for home, with a raiding party on his heels.', [
      ['Jaguar Paw', 'Rudy Youngblood', 'hs', 'innocent-soul'], ['Seven', 'Dalia Hernández', 'he', 'love-interest'],
      ['Zero Wolf', 'Raoul Trujillo', 'vs', 'warmonger'], ['Middle Eye', 'Gerardo Taracena', 'vc', 'cruel-bully'], ['Raiders', '', 've', 'raider']]),
    M('300', 2006, 'historical fantasy action', 'King Leonidas and 300 Spartans hold the pass at Thermopylae against the Persian army.', [
      ['King Leonidas', 'Gerard Butler', 'hs', 'bold-blade'], ['Stelios', 'Michael Fassbender', 'hc', 'loyal-sidekick'], ['Spartans', '', 'he', 'warrior'],
      ['Xerxes', 'Rodrigo Santoro', 'vs', 'evil-overlord'], ['Ephialtes', 'Andrew Tiernan', 'vc', 'red-right-hand'], ['The Immortals', '', 've', 'brutish-footsoldier']]),
    M('Children of Men', 2006, 'scifi rebelstate', 'In an infertile, collapsing Britain, a burned-out official escorts the first pregnant woman in 18 years.', [
      ['Theo Faron', 'Clive Owen', 'hs', 'unlikely-interloper-80s'], ['Julian Taylor', 'Julianne Moore', 'hc', 'daring-rebel'], ['Jasper', 'Michael Caine', 'hc', 'wise-mentor'], ['Kee', 'Clare-Hope Ashitey', 'he', 'vip'],
      ['Luke', 'Chiwetel Ejiofor', 'vc', 'red-right-hand'], ['Army patrols', '', 've', 'soldier']]),
    M('Live Free or Die Hard', 2007, 'action scifi silicondream', 'McClane and a young hacker try to stop a cyber attack that is switching off America.', [
      ['John McClane', 'Bruce Willis', 'hs', 'grizzled-veteran'], ['Matt Farrell', 'Justin Long', 'hc', 'whiz-kid-80s'],
      ['Thomas Gabriel', 'Timothy Olyphant', 'vs', 'bold-planner-80s'], ['Mai Linh', 'Maggie Q', 'vc', 'red-right-hand'], ['Rand', 'Cyril Raffaelli', 've', 'daredevil']]),
    M('Taken', 2008, 'action hiredhelp greedglamour', 'A retired spy has 96 hours to find his kidnapped daughter in the Paris underworld.', [
      ['Bryan Mills', 'Liam Neeson', 'hs', 'secret-agent'], ['Kim Mills', 'Maggie Grace', 'he', 'vip'],
      ['Patrice Saint-Clair', 'Gérard Watkins', 'vs', 'kingpin'], ['Marko', 'Arben Bajraktaraj', 'vc', 'organised-criminal-80s'], ['Jean-Claude', 'Olivier Rabourdin', 'vc', 'red-right-hand'], ['Traffickers', '', 've', 'thug']]),
    M('Rambo', 2008, 'action rebelstate hiredhelp', 'An aging Rambo takes mercenaries into Burma to rescue aid workers from a brutal army unit.', [
      ['John Rambo', 'Sylvester Stallone', 'hs', 'nam-vet-80s'], ['Sarah Miller', 'Julie Benz', 'hc', 'everyman'], ['School Boy', 'Matthew Marsden', 'he', 'sharpshooter'], ['Mercenaries', '', 'he', 'mercenary'],
      ['Maj. Pa Tee Tint', 'Maung Maung Khin', 'vs', 'warmonger'], ['Burmese soldiers', '', 've', 'soldier']]),
    M('District 9', 2009, 'scifi action rebelstate greedglamour', 'A pencil-pusher evicting stranded aliens from a Johannesburg slum starts turning into one of them.', [
      ['Wikus van de Merwe', 'Sharlto Copley', 'hs', 'unlikely-interloper-80s'], ['Christopher Johnson', 'Jason Cope', 'hc', 'practical-mechanic-80s'], ['Prawns', '', 'ne', 'timid-alien-80s'],
      ['Koobus Venter', 'David James', 'vc', 'ruthless-nemesis'], ['MNU', '', 'vs', 'corrupt-authority'], ['Obesandjo', 'Eugene Khumbanyiwa', 'vc', 'organised-criminal-80s']]),
    M('Inglourious Basterds', 2009, 'historical action', 'A squad of Jewish-American soldiers and a vengeful cinema owner both plot to kill the Nazi high command.', [
      ['Lt. Aldo Raine', 'Brad Pitt', 'hs', 'grizzled-veteran'], ['Shosanna Dreyfus', 'Mélanie Laurent', 'hc', 'daring-rebel'], ['Donny Donowitz', 'Eli Roth', 'hc', 'hardened-grunt-80s'], ['The Basterds', '', 'he', 'soldier'],
      ['Col. Hans Landa', 'Christoph Waltz', 'vs', 'mastermind'], ['German soldiers', '', 've', 'soldier']]),

    // 2010s
    M('Inception', 2010, 'scifi action greedglamour silicondream', 'A thief who steals secrets from dreams takes one last job: planting an idea instead.', [
      ['Dom Cobb', 'Leonardo DiCaprio', 'hs', 'bold-planner-80s'], ['Arthur', 'Joseph Gordon-Levitt', 'hc', 'loyal-sidekick'], ['Ariadne', 'Elliot Page', 'hc', 'whiz-kid-80s'], ['Saito', 'Ken Watanabe', 'ns', 'millionaire-meddler-80s'],
      ['Mal', 'Marion Cotillard', 'vc', 'incorporeal-advisor-80s'], ['Dream security', '', 've', 'private-security-80s']]),
    M('The Expendables', 2010, 'action hiredhelp rebelstate', 'A team of aging mercenaries takes a job to topple an island dictator and his rogue CIA backer.', [
      ['Barney Ross', 'Sylvester Stallone', 'hs', 'nam-vet-80s'], ['Lee Christmas', 'Jason Statham', 'hc', 'hardened-grunt-80s'], ['Yin Yang', 'Jet Li', 'he', 'martial-artist-80s'],
      ['General Garza', 'David Zayas', 'vs', 'stern-authoritarian-80s'], ['James Munroe', 'Eric Roberts', 'vc', 'spy-catcher-80s'], ['Paine', 'Steve Austin', 'vc', 'red-right-hand']]),
    M('The Raid', 2011, 'action rebelstate', 'A rookie SWAT officer fights floor by floor up a tower block run by a crime lord.', [
      ['Rama', 'Iko Uwais', 'hs', 'wonder-warrior-80s'], ['Jaka', 'Joe Taslim', 'he', 'sarge'], ['SWAT team', '', 'he', 'swat-officer-80s'],
      ['Tama Riyadi', 'Ray Sahetapy', 'vs', 'kingpin'], ['Mad Dog', 'Yayan Ruhian', 'vc', 'red-right-hand'], ['Andi', 'Doni Alamsyah', 'vc', 'career-criminal'], ['Tama\'s gang', '', 've', 'thug']]),
    M('Dredd', 2012, 'scifi action rebelstate', 'Judge Dredd and a psychic rookie are trapped in a 200-storey slum block ruled by a drug lord.', [
      ['Judge Dredd', 'Karl Urban', 'hs', 'cop-zero-zero-one-sj'], ['Judge Anderson', 'Olivia Thirlby', 'hs', 'psychic-prodigy-80s'],
      ['Ma-Ma', 'Lena Headey', 'vs', 'kingpin'], ['Kay', 'Wood Harris', 'vc', 'red-right-hand'], ['Clan Techie', 'Domhnall Gleeson', 'ne', 'nerd-80s'], ['Ma-Ma\'s gang', '', 've', 'street-punk-80s']]),
    M('Skyfall', 2012, 'action coldwar silicondream', 'A former agent turned cyber-terrorist comes for M, and Bond has to bring her home to make a stand.', [
      ['James Bond', 'Daniel Craig', 'hs', 'special-agent-80s'], ['M', 'Judi Dench', 'hc', 'wise-mentor'], ['Eve Moneypenny', 'Naomie Harris', 'hc', 'loyal-sidekick'], ['Q', 'Ben Whishaw', 'hc', 'whiz-kid-80s'],
      ['Raoul Silva', 'Javier Bardem', 'vs', 'mastermind'], ['Silva\'s men', '', 've', 'mercenary']]),
    M('Looper', 2012, 'scifi action hiredhelp', 'A hitman who kills targets sent back from the future is ordered to kill his older self.', [
      ['Joe', 'Joseph Gordon-Levitt', 'hs', 'loveable-scoundrel'], ['Old Joe', 'Bruce Willis', 'ns', 'nam-vet-80s'], ['Sara', 'Emily Blunt', 'hc', 'everyman'], ['Cid', 'Pierce Gagnon', 'ns', 'psychic-prodigy-80s'],
      ['Abe', 'Jeff Daniels', 'vs', 'kingpin'], ['Gat Men', '', 've', 'thug']]),
    M('Django Unchained', 2012, 'historical action hiredhelp', 'A freed slave teams up with a bounty hunter to rescue his wife from a Mississippi plantation owner.', [
      ['Django', 'Jamie Foxx', 'hs', 'mysterious-stranger'], ['Dr. King Schultz', 'Christoph Waltz', 'hc', 'relentless-pursuer-80s'],
      ['Calvin Candie', 'Leonardo DiCaprio', 'vs', 'corrupt-authority'], ['Stephen', 'Samuel L. Jackson', 'vc', 'red-right-hand'], ['Candie\'s men', '', 've', 'gunslinger']]),
    M('The Conjuring', 2013, 'horror frightmare', 'Paranormal investigators Ed and Lorraine Warren help a family haunted by a witch\'s spirit.', [
      ['Lorraine Warren', 'Vera Farmiga', 'hs', 'mysterious-stranger'], ['Ed Warren', 'Patrick Wilson', 'hc', 'quirky-investigator'], ['Roger Perron', 'Ron Livingston', 'he', 'bystander'],
      ['Bathsheba', '', 'vs', 'dark-shadow'], ['Spirits', '', 've', 'phantom']]),
    M('Edge of Tomorrow', 2014, 'scifi action rebelstate', 'A cowardly officer relives the same alien invasion battle every time he dies, and gets better at it.', [
      ['William Cage', 'Tom Cruise', 'hs', 'unlikely-interloper-80s'], ['Rita Vrataski', 'Emily Blunt', 'hs', 'wonder-warrior-80s'], ['Master Sgt. Farell', 'Bill Paxton', 'hc', 'hardened-grunt-80s'],
      ['The Omega', '', 'vs', 'great-monstrosity'], ['Mimics', '', 've', 'alien-invader']]),
    M('John Wick', 2014, 'action hiredhelp', 'A retired hitman goes after the Russian mob boss\'s son who killed his dog.', [
      ['John Wick', 'Keanu Reeves', 'hs', 'yaga-sj'], ['Marcus', 'Willem Dafoe', 'he', 'sharpshooter'], ['Daisy', '', 'he', 'dog'],
      ['Viggo Tarasov', 'Michael Nyqvist', 'vs', 'kingpin'], ['Iosef Tarasov', 'Alfie Allen', 'vc', 'cruel-bully'], ['Ms. Perkins', 'Adrianne Palicki', 'vc', 'red-right-hand'], ['Russian mobsters', '', 've', 'thug']]),
    M('Kingsman: The Secret Service', 2014, 'action adventure coldwar greedglamour', 'A gentleman spy recruits a street kid just as a tech billionaire plots to cull humanity.', [
      ['Eggsy', 'Taron Egerton', 'hs', 'innocent-soul'], ['Harry Hart', 'Colin Firth', 'hc', 'wise-mentor'], ['Merlin', 'Mark Strong', 'hc', 'loyal-sidekick'],
      ['Richmond Valentine', 'Samuel L. Jackson', 'vs', 'millionaire-meddler-80s'], ['Gazelle', 'Sofia Boutella', 'vc', 'red-right-hand'], ['Valentine\'s guards', '', 've', 'private-security-80s']]),
    M('Mad Max: Fury Road', 2015, 'scifi action rebelstate', 'A road warrior and a rebel war-rig driver flee a desert tyrant with his captive wives.', [
      ['Imperator Furiosa', 'Charlize Theron', 'hs', 'rebel-commander-80s'], ['Max Rockatansky', 'Tom Hardy', 'hc', 'lone-survivor'], ['Nux', 'Nicholas Hoult', 'nc', 'practical-mechanic-80s'],
      ['Immortan Joe', 'Hugh Keays-Byrne', 'vs', 'stern-authoritarian-80s'], ['Rictus Erectus', 'Nathan Jones', 'vc', 'unstoppable-beast'], ['War Boys', '', 've', 'raider'], ['The War Rig', '', 'nv', 'truck']]),
    M('Sicario', 2015, 'action hiredhelp', 'An idealistic FBI agent joins a shadowy task force crossing the border to hunt a cartel boss.', [
      ['Kate Macer', 'Emily Blunt', 'hs', 'unlikely-interloper-80s'], ['Alejandro', 'Benicio del Toro', 'ns', 'nam-vet-80s'], ['Matt Graver', 'Josh Brolin', 'nc', 'spy-catcher-80s'],
      ['Fausto Alarcón', 'Julio Cedillo', 'vs', 'kingpin'], ['Cartel sicarios', '', 've', 'drug-runner-80s']]),
    M('Train to Busan', 2016, 'horror action frightmare', 'Passengers on a high-speed train fight a zombie outbreak between Seoul and Busan.', [
      ['Seok-woo', 'Gong Yoo', 'hs', 'unlikely-interloper-80s'], ['Sang-hwa', 'Ma Dong-seok', 'hc', 'lone-survivor'], ['Su-an', 'Kim Su-an', 'he', 'kid'],
      ['Yon-suk', 'Kim Eui-sung', 'vc', 'cruel-bully'], ['The infected', '', 've', 'zombie']]),
    M('The Nice Guys', 2016, 'action hiredhelp greedglamour', 'A hired enforcer and a hapless private eye uncover a conspiracy in 1977 Los Angeles.', [
      ['Holland March', 'Ryan Gosling', 'hc', 'private-investigator-80s'], ['Jackson Healy', 'Russell Crowe', 'hc', 'ex-con-80s'], ['Holly March', 'Angourie Rice', 'he', 'kid'],
      ['Judith Kuttner', 'Kim Basinger', 'vs', 'corrupt-authority'], ['John Boy', 'Matt Bomer', 'vc', 'red-right-hand']]),
    M('Atomic Blonde', 2017, 'action coldwar', 'An MI6 agent hunts a stolen list of double agents in Berlin as the Wall comes down.', [
      ['Lorraine Broughton', 'Charlize Theron', 'hs', 'special-agent-80s'], ['Delphine Lasalle', 'Sofia Boutella', 'hc', 'loyal-sidekick'], ['Spyglass', 'Eddie Marsan', 'he', 'informant-80s'],
      ['Aleksander Bremovych', 'Roland Møller', 'vs', 'corrupt-authority'], ['David Percival', 'James McAvoy', 'vc', 'spy-catcher-80s'], ['KGB agents', '', 've', 'foreign-agent-80s']]),
    M('Baby Driver', 2017, 'action greedglamour', 'A young getaway driver with a soundtrack for every job tries to get out of a robbery crew.', [
      ['Baby', 'Ansel Elgort', 'hs', 'innocent-soul'], ['Debora', 'Lily James', 'hc', 'everyman'],
      ['Doc', 'Kevin Spacey', 'vs', 'bold-planner-80s'], ['Buddy', 'Jon Hamm', 'vc', 'career-criminal'], ['Bats', 'Jamie Foxx', 'vc', 'red-right-hand'], ['The getaway car', '', 'nv', 'getaway-car']]),
    M('Blade Runner 2049', 2017, 'scifi silicondream greedglamour', 'A replicant blade runner uncovers a secret that could end the line between humans and replicants.', [
      ['K', 'Ryan Gosling', 'hs', 'cybernetic-organism-80s'], ['Joi', 'Ana de Armas', 'hc', 'incorporeal-advisor-80s'], ['Rick Deckard', 'Harrison Ford', 'hc', 'private-investigator-80s'],
      ['Niander Wallace', 'Jared Leto', 'vs', 'silas-caine-sj'], ['Luv', 'Sylvia Hoeks', 'vc', 'shinzu-sj']]),
    M('Mission: Impossible – Fallout', 2018, 'action coldwar', 'Ethan Hunt\'s team must recover stolen plutonium, shadowed by a CIA assassin.', [
      ['Ethan Hunt', 'Tom Cruise', 'hs', 'special-agent-80s'], ['Ilsa Faust', 'Rebecca Ferguson', 'hc', 'daring-rebel'], ['Benji Dunn', 'Simon Pegg', 'hc', 'whiz-kid-80s'],
      ['Solomon Lane', 'Sean Harris', 'vs', 'mastermind'], ['August Walker', 'Henry Cavill', 'vc', 'ruthless-nemesis'], ['The Apostles', '', 've', 'mercenary']]),
    M('Upgrade', 2018, 'scifi action silicondream', 'A paralysed mechanic gets an AI chip that moves his body for him, and takes revenge.', [
      ['Grey Trace', 'Logan Marshall-Green', 'hs', 'cybernetic-organism-80s'], ['STEM', 'Simon Maiden', 'hc', 'incorporeal-advisor-80s'], ['Det. Cortez', 'Betty Gabriel', 'hc', 'maverick-cop-80s'],
      ['Eron Keen', 'Harrison Gilbertson', 'vs', 'millionaire-meddler-80s'], ['Fisk', 'Benedict Hardie', 'vc', 'shinzu-sj']]),

    M('Den of Thieves', 2018, 'action greedglamour hiredhelp', 'A bullish Los Angeles sheriff\'s detective hunts a crew of ex-Marines planning to rob the Federal Reserve, and the driver they trust has plans of his own.', [
      ['Nick "Big Nick" O\'Brien', 'Gerard Butler', 'hs', 'grizzled-veteran'], ['Ray Merrimen', 'Pablo Schreiber', 'vs', 'bold-planner-80s'], ['Enson Levoux', '50 Cent', 'vc', 'career-criminal'],
      ['Donnie Wilson', 'O\'Shea Jackson Jr.', 've', 'driver-80s'], ['Bosco and the crew', 'Evan Jones', 've', 'mercenary'], ['Major Crimes detectives', '', 'he', 'plainclothes-cop-80s']]),
    // 2020s
    M('Tenet', 2020, 'action scifi coldwar greedglamour', 'A secret agent learns to move against the flow of time to stop an arms dealer ending the world.', [
      ['The Protagonist', 'John David Washington', 'hs', 'special-agent-80s'], ['Neil', 'Robert Pattinson', 'hc', 'loyal-sidekick'], ['Kat', 'Elizabeth Debicki', 'hc', 'everyman'],
      ['Andrei Sator', 'Kenneth Branagh', 'vs', 'warmonger'], ['Volkov', 'Yuri Kolokolnikov', 'vc', 'red-right-hand'], ['Sator\'s soldiers', '', 've', 'mercenary']]),
    M('Extraction', 2020, 'action hiredhelp', 'A black-market mercenary is hired to rescue a crime lord\'s kidnapped son from Dhaka.', [
      ['Tyler Rake', 'Chris Hemsworth', 'hs', 'nam-vet-80s'], ['Nik Khan', 'Golshifteh Farahani', 'hc', 'hardened-grunt-80s'], ['Ovi Mahajan', 'Rudhraksh Jaiswal', 'he', 'vip'],
      ['Saju', 'Randeep Hooda', 'nc', 'relentless-pursuer-80s'], ['Amir Asif', 'Priyanshu Painyuli', 'vs', 'kingpin'], ['Asif\'s gang', '', 've', 'thug']]),
    M('Nobody', 2021, 'action hiredhelp', 'A mild suburban dad with a hidden past makes an enemy of the Russian mob.', [
      ['Hutch Mansell', 'Bob Odenkirk', 'hs', 'grizzled-veteran'], ['David Mansell', 'Christopher Lloyd', 'hc', 'wise-mentor'], ['Harry Mansell', 'RZA', 'hc', 'loyal-sidekick'],
      ['Yulian Kuznetsov', 'Aleksei Serebryakov', 'vs', 'kingpin'], ['Yulian\'s thugs', '', 've', 'thug']]),
    M('Dune', 2021, 'scifi adventure rebelstate', 'The heir of House Atreides survives a massacre on the desert planet Arrakis and flees to the Fremen.', [
      ['Paul Atreides', 'Timothée Chalamet', 'hs', 'innocent-soul'], ['Duncan Idaho', 'Jason Momoa', 'hc', 'mythic-champion'], ['Lady Jessica', 'Rebecca Ferguson', 'hc', 'wise-mentor'], ['Fremen', '', 'he', 'freedom-fighter'],
      ['Baron Harkonnen', 'Stellan Skarsgård', 'vs', 'evil-overlord'], ['Glossu Rabban', 'Dave Bautista', 'vc', 'red-right-hand'], ['Sardaukar', '', 've', 'imperial-trooper']]),
    M('The Northman', 2022, 'historical fantasy', 'A Viking prince grows up to avenge his murdered father, guided by seers and visions.', [
      ['Amleth', 'Alexander Skarsgård', 'hs', 'bold-blade'], ['Olga', 'Anya Taylor-Joy', 'hc', 'daring-rebel'], ['The Seeress', 'Björk', 'hc', 'wise-mentor'],
      ['Fjölnir', 'Claes Bang', 'vs', 'warmonger'], ['The Mound Dweller', '', 'vc', 'unstoppable-beast'], ['Viking raiders', '', 've', 'warrior']]),
    M('Everything Everywhere All at Once', 2022, 'scifi fantasy adventure silicondream', 'A laundromat owner fighting a tax audit must borrow skills from her other selves across the multiverse.', [
      ['Evelyn Wang', 'Michelle Yeoh', 'hs', 'unlikely-interloper-80s'], ['Waymond Wang', 'Ke Huy Quan', 'hc', 'loyal-sidekick'],
      ['Jobu Tupaki', 'Stephanie Hsu', 'vs', 'dark-shadow'], ['Deirdre Beaubeirdre', 'Jamie Lee Curtis', 'vc', 'white-collar-80s'], ['Alphaverse fighters', '', 've', 'martial-artist-80s']]),
    M('RRR', 2022, 'historical action adventure rebelstate', 'Two revolutionaries in 1920s India, one undercover in the colonial police, forge a friendship and take on the Raj.', [
      ['Komaram Bheem', 'N.T. Rama Rao Jr.', 'hs', 'wonder-warrior-80s'], ['Alluri Sitarama Raju', 'Ram Charan', 'hs', 'rebel-commander-80s'], ['Jenny', 'Olivia Morris', 'he', 'love-interest'],
      ['Governor Scott Buxton', 'Ray Stevenson', 'vs', 'corrupt-authority'], ['Catherine Buxton', 'Alison Doody', 'vc', 'cruel-bully'], ['Colonial troops', '', 've', 'soldier']]),
    M('Bullet Train', 2022, 'action hiredhelp', 'An unlucky assassin\'s simple job on a Tokyo bullet train collides with a car full of other killers.', [
      ['Ladybug', 'Brad Pitt', 'hs', 'loveable-scoundrel'], ['Tangerine', 'Aaron Taylor-Johnson', 'vc', 'career-criminal'], ['Lemon', 'Brian Tyree Henry', 'vc', 'career-criminal'],
      ['The White Death', 'Michael Shannon', 'vs', 'kingpin'], ['The Prince', 'Joey King', 'vs', 'seductive-schemer-80s'], ['The Wolf', 'Bad Bunny', 'vc', 'ruthless-nemesis']]),
    M('Prey', 2022, 'historical horror scifi frightmare', 'A young Comanche hunter in 1719 sets out to prove herself and meets a Predator.', [
      ['Naru', 'Amber Midthunder', 'hs', 'innocent-soul'], ['Taabe', 'Dakota Beavers', 'hc', 'mythic-champion'], ['Sarii', '', 'he', 'dog'],
      ['The Predator', '', 'vs', 'hunter-alien-80s'], ['French trappers', '', 've', 'raider']]),
    M('John Wick: Chapter 4', 2023, 'action hiredhelp greedglamour', 'Wick takes on the High Table, with a duel at sunrise in Paris as his way out.', [
      ['John Wick', 'Keanu Reeves', 'hs', 'yaga-sj'], ['Caine', 'Donnie Yen', 'nc', 'relentless-pursuer-80s'], ['Shimazu Koji', 'Hiroyuki Sanada', 'hc', 'wise-mentor'],
      ['Marquis de Gramont', 'Bill Skarsgård', 'vs', 'corrupt-authority'], ['Killa Harkan', 'Scott Adkins', 'vc', 'organised-criminal-80s'], ['High Table assassins', '', 've', 'assassin']]),
    M('Godzilla Minus One', 2023, 'scifi horror historical frightmare', 'A guilt-ridden former kamikaze pilot joins a civilian plan to stop Godzilla in post-war Japan.', [
      ['Kōichi Shikishima', 'Ryunosuke Kamiki', 'hs', 'unlikely-interloper-80s'], ['Noriko Ōishi', 'Minami Hamabe', 'hc', 'everyman'], ['Kenji Noda', 'Hidetaka Yoshioka', 'hc', 'quirky-investigator'], ['Sōsaku Tachibana', 'Munetaka Aoki', 'hc', 'practical-mechanic-80s'],
      ['Godzilla', '', 'vs', 'great-monstrosity']]),
    M('Mission: Impossible – Dead Reckoning Part One', 2023, 'action scifi silicondream coldwar', 'Ethan Hunt races everyone else for the key to a rogue AI that can rewrite the truth.', [
      ['Ethan Hunt', 'Tom Cruise', 'hs', 'special-agent-80s'], ['Grace', 'Hayley Atwell', 'hc', 'daring-rebel'], ['Benji Dunn', 'Simon Pegg', 'hc', 'whiz-kid-80s'],
      ['The Entity', '', 'vs', 'digital-avatar-80s'], ['Gabriel', 'Esai Morales', 'vc', 'ruthless-nemesis'], ['Paris', 'Pom Klementieff', 'vc', 'red-right-hand']]),
    M('Dune: Part Two', 2024, 'scifi adventure rebelstate', 'Paul rises among the Fremen and leads a war against the Harkonnens and the Emperor.', [
      ['Paul Atreides', 'Timothée Chalamet', 'hs', 'rebel-commander-80s'], ['Chani', 'Zendaya', 'hc', 'daring-rebel'], ['Stilgar', 'Javier Bardem', 'hc', 'wise-mentor'], ['Fremen warriors', '', 'he', 'freedom-fighter'],
      ['Emperor Shaddam IV', 'Christopher Walken', 'vs', 'corrupt-authority'], ['Feyd-Rautha', 'Austin Butler', 'vc', 'ruthless-nemesis'], ['Sardaukar', '', 've', 'imperial-trooper']]),
    M('Furiosa: A Mad Max Saga', 2024, 'scifi action rebelstate', 'Stolen from her home as a child, Furiosa spends years in the Wasteland plotting revenge on a biker warlord.', [
      ['Furiosa', 'Anya Taylor-Joy', 'hs', 'rebel-commander-80s'], ['Praetorian Jack', 'Tom Burke', 'hc', 'hardened-grunt-80s'],
      ['Dementus', 'Chris Hemsworth', 'vs', 'warmonger'], ['Immortan Joe', 'Lachy Hulme', 'vs', 'stern-authoritarian-80s'], ['Biker horde', '', 've', 'raider']]),
    M('Civil War', 2024, 'action rebelstate', 'War journalists drive across a divided America to reach Washington before it falls.', [
      ['Lee Smith', 'Kirsten Dunst', 'hs', 'grizzled-veteran'], ['Jessie Cullen', 'Cailee Spaeny', 'hc', 'private-investigator-80s'], ['Joel', 'Wagner Moura', 'hc', 'loyal-sidekick'], ['Sammy', 'Stephen McKinley Henderson', 'hc', 'wise-mentor'],
      ['The soldier', 'Jesse Plemons', 'vc', 'ruthless-nemesis'], ['Western Forces', '', 'ne', 'soldier']]),
    M('Alien: Romulus', 2024, 'scifi horror frightmare silicondream', 'Young colonists scavenging a derelict station wake up something they cannot outrun.', [
      ['Rain Carradine', 'Cailee Spaeny', 'hs', 'unlikely-interloper-80s'], ['Andy', 'David Jonsson', 'hc', 'loyal-sidekick'], ['Tyler', 'Archie Renaux', 'hc', 'brat-packer-80s'],
      ['The Offspring', '', 'vc', 'unstoppable-beast'], ['Rook', '', 'vc', 'mad-scientist'], ['Facehuggers and Xenomorphs', '', 've', 'xeno-80s']]),
    M('Monkey Man', 2024, 'action greedglamour rebelstate', 'An underground fighter infiltrates the elite of a corrupt city to avenge his mother.', [
      ['Kid', 'Dev Patel', 'hs', 'wonder-warrior-80s'], ['Alpha', 'Vipin Sharma', 'hc', 'wise-mentor'], ['Sita', 'Sobhita Dhulipala', 'he', 'love-interest'],
      ['Baba Shakti', 'Makarand Deshpande', 'vs', 'corrupt-authority'], ['Rana Singh', 'Sikandar Kher', 'vc', 'red-right-hand'], ['Queenie Kapoor', 'Ashwini Kalsekar', 'vc', 'organised-criminal-80s']]),
    M('The Fall Guy', 2024, 'action adventure greedglamour hiredhelp', 'A broken-down stuntman goes looking for a missing movie star and lands in a murder plot.', [
      ['Colt Seavers', 'Ryan Gosling', 'hs', 'loveable-scoundrel'], ['Jody Moreno', 'Emily Blunt', 'hc', 'daring-rebel'], ['Dan Tucker', 'Winston Duke', 'hc', 'loyal-sidekick'],
      ['Tom Ryder', 'Aaron Taylor-Johnson', 'vs', 'seductive-schemer-80s'], ['Gail Meyer', 'Hannah Waddingham', 'vc', 'white-collar-80s'], ['Ryder\'s goons', '', 've', 'thug']]),
    M('Sinners', 2025, 'horror historical frightmare', 'Twin brothers open a juke joint in 1932 Mississippi, and a vampire comes to the opening night.', [
      ['Smoke', 'Michael B. Jordan', 'hs', 'grizzled-veteran'], ['Stack', 'Michael B. Jordan', 'hc', 'loyal-sidekick'], ['Sammie Moore', 'Miles Caton', 'hc', 'ex-con-80s'], ['Annie', 'Wunmi Mosaku', 'hc', 'wise-mentor'],
      ['Remmick', 'Jack O\'Connell', 'vs', 'dark-shadow'], ['Vampires', '', 've', 'vampire']]),
    M('28 Years Later', 2025, 'horror scifi frightmare', 'A boy from a quarantined island leaves the causeway for the infected mainland for the first time.', [
      ['Spike', 'Alfie Williams', 'hs', 'innocent-soul'], ['Jamie', 'Aaron Taylor-Johnson', 'hc', 'lone-survivor'], ['Dr. Ian Kelson', 'Ralph Fiennes', 'hc', 'wise-mentor'],
      ['Samson, the Alpha', '', 'vc', 'unstoppable-beast'], ['The infected', '', 've', 'zombie']]),
    // From the Core Rulebook and 80s bibliographies (films only; TV, cartoons, games and the more obscure films left out)
    M('The War of the Worlds', 1953, 'scifi horror', 'Martian war machines land in California and lay waste to everything the military throws at them.', [
      ['Dr. Clayton Forrester', 'Gene Barry', 'hs', 'unlikely-interloper-80s'], ['Sylvia Van Buren', 'Ann Robinson', 'hc', 'everyman'], ['US Army', '', 'ne', 'soldier'],
      ['The Martian war machines', '', 'vs', 'great-monstrosity'], ['Martians', '', 've', 'alien-invader']]),
    M('Seven Samurai', 1954, 'historical action hiredhelp', 'A village of farmers hires seven masterless samurai to protect them from bandits at harvest time.', [
      ['Kambei', 'Takashi Shimura', 'hs', 'grizzled-veteran'], ['Kikuchiyo', 'Toshiro Mifune', 'hc', 'loyal-sidekick'], ['Kyuzo', 'Seiji Miyaguchi', 'hc', 'mythic-champion'],
      ['Farmers', '', 'he', 'militia'], ['The bandit chief', '', 'vs', 'warmonger'], ['Bandits', '', 've', 'raider']]),
    M('Forbidden Planet', 1956, 'scifi adventure silicondream', 'A starship crew finds the lone survivor of a lost colony living with his daughter and a robot, and something invisible.', [
      ['Commander Adams', 'Leslie Nielsen', 'hs', 'grizzled-veteran'], ['Altaira', 'Anne Francis', 'hc', 'everyman'], ['Robby the Robot', '', 'ne', 'service-droid-80s'],
      ['C-57D crew', '', 'he', 'space-commando'], ['Dr. Morbius', 'Walter Pidgeon', 'vc', 'mad-scientist'], ['The Monster from the Id', '', 'vs', 'great-monstrosity']]),
    M('Dracula', 1958, 'horror historical frightmare', 'Doctor Van Helsing hunts Count Dracula after the vampire kills his friend and preys on his family.', [
      ['Doctor Van Helsing', 'Peter Cushing', 'hs', 'mysterious-stranger'], ['Arthur Holmwood', 'Michael Gough', 'hc', 'everyman'], ['Count Dracula', 'Christopher Lee', 'vs', 'dark-shadow'],
      ['Dracula\'s brides', '', 've', 'vampire']]),
    M('The 7th Voyage of Sinbad', 1958, 'fantasy adventure historical', 'Sinbad must take a sorcerer back to the monster-filled island of Colossa to restore a princess shrunk by magic.', [
      ['Sinbad', 'Kerwin Mathews', 'hs', 'bold-blade'], ['Princess Parisa', 'Kathryn Grant', 'hc', 'everyman'], ['Sokurah', 'Torin Thatcher', 'vs', 'dark-shadow'],
      ['The Cyclops', '', 'vc', 'unstoppable-beast'], ['Skeleton warrior', '', 've', 'skeleton']]),
    M('Ben-Hur', 1959, 'historical action adventure', 'A Jewish prince betrayed into slavery by his Roman friend survives the galleys to face him in the chariot race.', [
      ['Judah Ben-Hur', 'Charlton Heston', 'hs', 'bold-blade'], ['Sheik Ilderim', 'Hugh Griffith', 'hc', 'wise-mentor'], ['Messala', 'Stephen Boyd', 'vs', 'corrupt-authority'],
      ['Roman legionaries', '', 've', 'soldier'], ['The chariot', '', 'nv', 'carriage']]),
    M('Rio Bravo', 1959, 'historical action', 'A small-town sheriff, a drunk and an old cripple hold a killer in jail against his rancher brother\'s army.', [
      ['Sheriff John T. Chance', 'John Wayne', 'hs', 'grizzled-veteran'], ['Dude', 'Dean Martin', 'hc', 'loyal-sidekick'], ['Stumpy', 'Walter Brennan', 'hc', 'everyman'],
      ['Colorado Ryan', 'Ricky Nelson', 'hc', 'daring-rebel'], ['Nathan Burdette', 'John Russell', 'vs', 'kingpin'], ['Burdette\'s gunmen', '', 've', 'gunslinger']]),
    M('Spartacus', 1960, 'historical action rebelstate', 'A Thracian slave trained as a gladiator leads a slave army against the Roman Republic.', [
      ['Spartacus', 'Kirk Douglas', 'hs', 'rebel-commander-80s'], ['Antoninus', 'Tony Curtis', 'hc', 'loyal-sidekick'], ['Varinia', 'Jean Simmons', 'hc', 'daring-rebel'],
      ['Rebel slaves', '', 'he', 'warrior'], ['Crassus', 'Laurence Olivier', 'vs', 'corrupt-authority'], ['Batiatus', 'Peter Ustinov', 'vc', 'robber-baron'],
      ['Roman legions', '', 've', 'soldier']]),
    M('The Magnificent Seven', 1960, 'historical action hiredhelp', 'A Mexican village hires seven gunfighters to defend it from a bandit army.', [
      ['Chris Adams', 'Yul Brynner', 'hs', 'mysterious-stranger'], ['Vin Tanner', 'Steve McQueen', 'hc', 'hardened-grunt-80s'], ['Britt', 'James Coburn', 'hc', 'loyal-sidekick'],
      ['Calvera', 'Eli Wallach', 'vs', 'warmonger'], ['Calvera\'s bandits', '', 've', 'raider'], ['Villagers', '', 'he', 'militia']]),
    M('Lawrence of Arabia', 1962, 'historical adventure rebelstate', 'A British officer unites the Arab tribes against the Ottoman Turks and loses himself in the desert war.', [
      ['T.E. Lawrence', 'Peter O\'Toole', 'hs', 'rebel-commander-80s'], ['Sherif Ali', 'Omar Sharif', 'hc', 'mythic-champion'], ['Auda abu Tayi', 'Anthony Quinn', 'nc', 'hardened-grunt-80s'],
      ['The Turkish Bey', 'José Ferrer', 'vs', 'corrupt-authority'], ['Turkish soldiers', '', 've', 'soldier'], ['Arab irregulars', '', 'he', 'warrior']]),
    M('The Longest Day', 1962, 'historical action', 'The D-Day landings, from paratroopers in the night to the Normandy beaches, told from both sides.', [
      ['Lt. Col. Vandervoort', 'John Wayne', 'hs', 'grizzled-veteran'], ['Brig. Gen. Cota', 'Robert Mitchum', 'hc', 'hardened-grunt-80s'], ['Allied paratroopers', '', 'he', 'soldier'],
      ['German defenders', '', 've', 'soldier']]),
    M('Jason and the Argonauts', 1963, 'fantasy adventure historical', 'Jason sails the Argo to the edge of the world for the Golden Fleece, battling a bronze giant, harpies and an army of skeletons.', [
      ['Jason', 'Todd Armstrong', 'hs', 'bold-blade'], ['Hercules', 'Nigel Green', 'hc', 'mythic-champion'], ['Medea', 'Nancy Kovack', 'hc', 'daring-rebel'],
      ['King Aeëtes', 'Jack Gwillim', 'vs', 'corrupt-authority'], ['Talos', '', 'vc', 'unstoppable-beast'], ['Skeleton warriors', '', 've', 'skeleton']]),
    M('A Fistful of Dollars', 1964, 'historical action hiredhelp', 'A nameless gunslinger plays two rival families against each other in a Mexican border town.', [
      ['The Man with No Name', 'Clint Eastwood', 'hs', 'mysterious-stranger'], ['Silvanito', 'José Calvo', 'hc', 'loyal-sidekick'], ['Ramón Rojo', 'Gian Maria Volonté', 'vs', 'kingpin'],
      ['The Rojo gang', '', 've', 'gunslinger']]),
    M('Zulu', 1964, 'historical action', 'About 150 British soldiers defend the mission station at Rorke\'s Drift against an army of 4,000 Zulu warriors.', [
      ['Lt. John Chard', 'Stanley Baker', 'hs', 'grizzled-veteran'], ['Lt. Gonville Bromhead', 'Michael Caine', 'hc', 'loyal-sidekick'], ['Colour Sgt. Bourne', 'Nigel Green', 'hc', 'hardened-grunt-80s'],
      ['British redcoats', '', 'he', 'soldier'], ['Zulu impi', '', 'ne', 'warrior']]),
    M('The Good, the Bad and the Ugly', 1966, 'historical action hiredhelp', 'Three gunslingers race and betray each other across the Civil War to find a fortune in buried Confederate gold.', [
      ['Blondie', 'Clint Eastwood', 'hs', 'mysterious-stranger'], ['Tuco', 'Eli Wallach', 'nc', 'ex-con-80s'], ['Angel Eyes', 'Lee Van Cleef', 'vs', 'mastermind'],
      ['Union soldiers', '', 'ne', 'soldier']]),
    M('The Dirty Dozen', 1967, 'action historical rebelstate', 'A rebellious major turns twelve condemned soldiers into a suicide squad for a raid on a Nazi château before D-Day.', [
      ['Maj. Reisman', 'Lee Marvin', 'hs', 'grizzled-veteran'], ['Victor Franko', 'John Cassavetes', 'hc', 'ex-con-80s'], ['Robert Jefferson', 'Jim Brown', 'hc', 'hardened-grunt-80s'],
      ['Archer Maggott', 'Telly Savalas', 'vc', 'psycho-killer-80s'], ['German officers', '', 've', 'soldier']]),
    M('Night of the Living Dead', 1968, 'horror frightmare', 'Strangers barricade a Pennsylvania farmhouse against the recently dead, who have risen to eat the living.', [
      ['Ben', 'Duane Jones', 'hs', 'grizzled-veteran'], ['Barbra', 'Judith O\'Dea', 'hc', 'final-girl'], ['Harry Cooper', 'Karl Hardman', 'vc', 'cruel-bully'],
      ['Ghouls', '', 've', 'zombie'], ['The sheriff\'s posse', '', 'ne', 'militia']]),
    M('Once Upon a Time in the West', 1968, 'historical action hiredhelp', 'A harmonica-playing stranger, a widow and an outlaw stand in the way of a railroad baron\'s hired killer.', [
      ['Harmonica', 'Charles Bronson', 'hs', 'mysterious-stranger'], ['Jill McBain', 'Claudia Cardinale', 'hc', 'daring-rebel'], ['Cheyenne', 'Jason Robards', 'nc', 'ex-con-80s'],
      ['Frank', 'Henry Fonda', 'vs', 'kingpin'], ['Morton', 'Gabriele Ferzetti', 'vc', 'robber-baron'], ['Frank\'s gunmen', '', 've', 'gunslinger']]),
    M('Planet of the Apes', 1968, 'scifi adventure rebelstate', 'An astronaut crash-lands on a planet where intelligent apes rule and humans are hunted like animals.', [
      ['George Taylor', 'Charlton Heston', 'hs', 'grizzled-veteran'], ['Zira', 'Kim Hunter', 'hc', 'quirky-investigator'], ['Cornelius', 'Roddy McDowall', 'hc', 'everyman'],
      ['Dr. Zaius', 'Maurice Evans', 'vs', 'corrupt-authority'], ['Gorilla soldiers', '', 've', 'brutish-footsoldier']]),
    M('Where Eagles Dare', 1968, 'action historical coldwar', 'Allied commandos parachute into the Alps to rescue a general from a mountaintop Nazi fortress, but one of them is a traitor.', [
      ['Maj. Smith', 'Richard Burton', 'hs', 'secret-agent'], ['Lt. Schaffer', 'Clint Eastwood', 'hc', 'hardened-grunt-80s'], ['Mary Ellison', 'Mary Ure', 'hc', 'daring-rebel'],
      ['Col. Kramer', 'Anton Diffring', 'vs', 'warmonger'], ['German mountain troops', '', 've', 'soldier']]),
    M('The Italian Job', 1969, 'action adventure greedglamour hiredhelp', 'A cockney crook fresh out of prison plans a gold heist in Turin built around a traffic jam and three Mini Coopers.', [
      ['Charlie Croker', 'Michael Caine', 'hs', 'loveable-scoundrel'], ['Mr. Bridger', 'Noël Coward', 'nc', 'organised-criminal-80s'], ['Professor Peach', 'Benny Hill', 'nc', 'whiz-kid-80s'],
      ['Altabani', 'Raf Vallone', 'vs', 'kingpin'], ['Mafia heavies', '', 've', 'thug'], ['The Minis', '', 'nv', 'sports-car']]),
    M('The Wild Bunch', 1969, 'historical action hiredhelp', 'Ageing outlaws on the Mexican border take one last job for a brutal general, with bounty hunters on their trail.', [
      ['Pike Bishop', 'William Holden', 'hs', 'grizzled-veteran'], ['Dutch Engstrom', 'Ernest Borgnine', 'hc', 'loyal-sidekick'], ['Deke Thornton', 'Robert Ryan', 'nc', 'relentless-pursuer-80s'],
      ['Gen. Mapache', 'Emilio Fernández', 'vs', 'warmonger'], ['Mapache\'s federales', '', 've', 'soldier'], ['Bounty hunters', '', 'ne', 'bounty-hunter-80s']]),
    M('Kelly\'s Heroes', 1970, 'action historical greedglamour hiredhelp', 'A band of GIs goes AWOL behind German lines to rob a bank holding a fortune in Nazi gold.', [
      ['Kelly', 'Clint Eastwood', 'hs', 'loveable-scoundrel'], ['Oddball', 'Donald Sutherland', 'hc', 'practical-mechanic-80s'], ['Big Joe', 'Telly Savalas', 'hc', 'hardened-grunt-80s'],
      ['Crapgame', 'Don Rickles', 'nc', 'rogue-trader-80s'], ['Tiger tank crew', '', 've', 'soldier']]),
    M('Dirty Harry', 1971, 'action greedglamour hiredhelp', 'A San Francisco inspector with a .44 Magnum and no patience for procedure hunts a sniper holding the city to ransom.', [
      ['Harry Callahan', 'Clint Eastwood', 'hs', 'grizzled-veteran'], ['Chico Gonzalez', 'Reni Santoni', 'hc', 'maverick-cop-80s'], ['Scorpio', 'Andy Robinson', 'vs', 'sadistic-slasher'],
      ['SFPD officers', '', 'he', 'cop']]),
    M('Shaft', 1971, 'action greedglamour hiredhelp', 'A Harlem private detective is hired by a crime boss to find his kidnapped daughter.', [
      ['John Shaft', 'Richard Roundtree', 'hs', 'loveable-scoundrel'], ['Ben Buford', 'Christopher St. John', 'hc', 'daring-rebel'], ['Bumpy Jonas', 'Moses Gunn', 'nc', 'organised-criminal-80s'],
      ['Lt. Vic Androzzi', 'Charles Cioffi', 'he', 'cop'], ['Mafia hitmen', '', 've', 'assassin']]),
    M('The Godfather', 1972, 'action historical greedglamour', 'The youngest son of a Mafia patriarch is drawn into the family business and becomes its ruthless new don.', [
      ['Vito Corleone', 'Marlon Brando', 'vs', 'kingpin'], ['Michael Corleone', 'Al Pacino', 'vs', 'mastermind'], ['Sonny Corleone', 'James Caan', 'vc', 'red-right-hand'],
      ['Tom Hagen', 'Robert Duvall', 'vc', 'white-collar-80s'], ['Virgil Sollozzo', 'Al Lettieri', 'vc', 'organised-criminal-80s'], ['Corleone soldiers', '', 've', 'enforcer']]),
    M('Enter the Dragon', 1973, 'action adventure coldwar hiredhelp', 'A Shaolin martial artist enters a tournament on a crime lord\'s island fortress to gather evidence and avenge his sister.', [
      ['Lee', 'Bruce Lee', 'hs', 'wonder-warrior-80s'], ['Roper', 'John Saxon', 'hc', 'rogue-trader-80s'], ['Williams', 'Jim Kelly', 'hc', 'loyal-sidekick'],
      ['Han', 'Shih Kien', 'vs', 'kingpin'], ['O\'Hara', 'Bob Wall', 'vc', 'red-right-hand'], ['Han\'s guards', '', 've', 'martial-artist-80s']]),
    M('The Wicker Man', 1973, 'horror historical frightmare', 'A devout police sergeant searches a Hebridean island for a missing girl and finds a pagan community with plans for him.', [
      ['Sgt. Neil Howie', 'Edward Woodward', 'hs', 'innocent-soul'], ['Lord Summerisle', 'Christopher Lee', 'vs', 'corrupt-authority'], ['Willow', 'Britt Ekland', 'vc', 'sinister-mystic'],
      ['Islanders', '', 've', 'cultist']]),
    M('Westworld', 1973, 'scifi historical silicondream frightmare', 'Two businessmen on holiday in an adult theme park are hunted when a robot gunslinger malfunctions.', [
      ['Peter Martin', 'Richard Benjamin', 'hs', 'unlikely-interloper-80s'], ['John Blane', 'James Brolin', 'hc', 'everyman'], ['The Gunslinger', 'Yul Brynner', 'vs', 'cybernetic-organism-80s'],
      ['Park robots', '', 'ne', 'android-80s']]),
    M('The Texas Chain Saw Massacre', 1974, 'horror frightmare', 'Friends driving through rural Texas stumble on a family of cannibals and their chainsaw-wielding son.', [
      ['Sally Hardesty', 'Marilyn Burns', 'hs', 'innocent-soul'], ['Leatherface', 'Gunnar Hansen', 'vs', 'sadistic-slasher'], ['The Hitchhiker', 'Edwin Neal', 'vc', 'psycho-killer-80s'],
      ['The Cook', 'Jim Siedow', 'vc', 'cruel-bully']]),
    M('Jaws', 1975, 'horror adventure frightmare', 'A police chief, a shark scientist and a salty fisherman go to sea to kill a great white terrorising a beach town.', [
      ['Chief Martin Brody', 'Roy Scheider', 'hs', 'unlikely-interloper-80s'], ['Matt Hooper', 'Richard Dreyfuss', 'hc', 'quirky-investigator'], ['Quint', 'Robert Shaw', 'nc', 'hardened-grunt-80s'],
      ['Mayor Vaughn', 'Murray Hamilton', 'vc', 'white-collar-80s'], ['The shark', '', 'vs', 'great-monstrosity']]),
    M('Carrie', 1976, 'horror frightmare', 'A shy, bullied teenager with telekinetic powers takes revenge on the night of her senior prom.', [
      ['Carrie White', 'Sissy Spacek', 'ns', 'psychic-prodigy-80s'], ['Sue Snell', 'Amy Irving', 'hc', 'final-girl'], ['Margaret White', 'Piper Laurie', 'vc', 'sinister-mystic'],
      ['Chris Hargensen', 'Nancy Allen', 'vc', 'cruel-bully'], ['Prom crowd', '', 'ne', 'schoolkid-80s']]),
    M('Logan\'s Run', 1976, 'scifi rebelstate silicondream', 'In a domed city where everyone dies at thirty, an enforcer sent to hunt runners becomes one.', [
      ['Logan 5', 'Michael York', 'hs', 'unlikely-interloper-80s'], ['Jessica 6', 'Jenny Agutter', 'hc', 'daring-rebel'], ['Francis 7', 'Richard Jordan', 'nc', 'relentless-pursuer-80s'],
      ['The Computer', '', 'vs', 'stern-authoritarian-80s'], ['Box', 'Roscoe Lee Browne', 'vc', 'unstoppable-beast'], ['Sandmen', '', 've', 'secret-police-80s']]),
    M('The Outlaw Josey Wales', 1976, 'historical action rebelstate', 'A Missouri farmer whose family was murdered by Union raiders becomes a hunted outlaw heading west.', [
      ['Josey Wales', 'Clint Eastwood', 'hs', 'grizzled-veteran'], ['Lone Watie', 'Chief Dan George', 'hc', 'wise-mentor'], ['Laura Lee', 'Sondra Locke', 'hc', 'everyman'],
      ['Fletcher', 'John Vernon', 'nc', 'relentless-pursuer-80s'], ['Capt. Terrill', 'Bill McKinney', 'vs', 'warmonger'], ['Redlegs', '', 've', 'raider']]),
    M('A Bridge Too Far', 1977, 'historical action', 'Allied paratroopers drop deep into occupied Holland to seize the Rhine bridges in a plan that goes badly wrong.', [
      ['Lt. Col. John Frost', 'Anthony Hopkins', 'hs', 'grizzled-veteran'], ['Maj. Julian Cook', 'Robert Redford', 'hc', 'hardened-grunt-80s'], ['Sgt. Eddie Dohun', 'James Caan', 'hc', 'loyal-sidekick'],
      ['Lt. Gen. Bittrich', 'Maximilian Schell', 'vs', 'warmonger'], ['SS panzer troops', '', 've', 'soldier']]),
    M('Close Encounters of the Third Kind', 1977, 'scifi silicondream', 'An electrical lineman becomes obsessed with a vision after a UFO encounter and races to a meeting with the visitors.', [
      ['Roy Neary', 'Richard Dreyfuss', 'hs', 'unlikely-interloper-80s'], ['Jillian Guiler', 'Melinda Dillon', 'hc', 'everyman'], ['Claude Lacombe', 'François Truffaut', 'hc', 'quirky-investigator'],
      ['The visitors', '', 'ne', 'timid-alien-80s'], ['Government agents', '', 'ne', 'agent']]),
    M('Smokey and the Bandit', 1977, 'action hiredhelp rebelstate', 'The Bandit and a trucker race to bootleg 400 cases of beer across state lines, with a Texas sheriff on their tail.', [
      ['The Bandit', 'Burt Reynolds', 'hs', 'loveable-scoundrel'], ['Cledus', 'Jerry Reed', 'hc', 'loyal-sidekick'], ['Carrie', 'Sally Field', 'hc', 'daring-rebel'],
      ['Sheriff Buford T. Justice', 'Jackie Gleason', 'nc', 'relentless-pursuer-80s'], ['Highway patrol', '', 'ne', 'state-trooper-80s'], ['The Trans Am', '', 'nv', 'sports-car']]),
    M('Star Wars', 1977, 'scifi adventure rebelstate silicondream', 'A farm boy joins a smuggler, a princess and an old Jedi to destroy the Empire\'s planet-killing battle station.', [
      ['Luke Skywalker', 'Mark Hamill', 'hs', 'innocent-soul'], ['Han Solo', 'Harrison Ford', 'hs', 'loveable-scoundrel'], ['Princess Leia', 'Carrie Fisher', 'hc', 'daring-rebel'],
      ['Obi-Wan Kenobi', 'Alec Guinness', 'hc', 'wise-mentor'], ['C-3PO and R2-D2', '', 'ne', 'service-droid-80s'], ['Darth Vader', 'David Prowse', 'vs', 'legendary-paragon-80s'],
      ['Grand Moff Tarkin', 'Peter Cushing', 'vs', 'stern-authoritarian-80s'], ['Stormtroopers', '', 've', 'imperial-trooper'], ['The Millennium Falcon', '', 'nv', 'shuttlecraft']]),
    M('Dawn of the Dead', 1978, 'horror frightmare rebelstate', 'Four survivors of a zombie plague barricade themselves inside a shopping mall.', [
      ['Peter', 'Ken Foree', 'hs', 'grizzled-veteran'], ['Francine', 'Gaylen Ross', 'hc', 'lone-survivor'], ['Stephen', 'David Emge', 'hc', 'everyman'],
      ['Roger', 'Scott Reiniger', 'hc', 'hardened-grunt-80s'], ['Zombies', '', 've', 'zombie'], ['Biker gang', '', 've', 'raider']]),
    M('Halloween', 1978, 'horror frightmare', 'Fifteen years after murdering his sister, Michael Myers escapes an asylum and comes home to stalk babysitters.', [
      ['Laurie Strode', 'Jamie Lee Curtis', 'hs', 'innocent-soul'], ['Dr. Loomis', 'Donald Pleasence', 'hc', 'relentless-pursuer-80s'], ['Annie and Lynda', '', 'he', 'babysitter-80s'],
      ['Michael Myers', '', 'vs', 'sadistic-slasher']]),
    M('Invasion of the Body Snatchers', 1978, 'scifi horror frightmare rebelstate', 'A San Francisco health inspector realises people are being replaced by emotionless duplicates grown from alien pods.', [
      ['Matthew Bennell', 'Donald Sutherland', 'hs', 'unlikely-interloper-80s'], ['Elizabeth Driscoll', 'Brooke Adams', 'hc', 'everyman'], ['Jack Bellicec', 'Jeff Goldblum', 'hc', 'loyal-sidekick'],
      ['Dr. David Kibner', 'Leonard Nimoy', 'vs', 'corrupt-authority'], ['Pod people', '', 've', 'undercover-alien-80s']]),
    M('Alien', 1979, 'scifi horror frightmare silicondream', 'The crew of a deep-space tug answer a distress call and bring an alien killer aboard.', [
      ['Ellen Ripley', 'Sigourney Weaver', 'hs', 'unlikely-interloper-80s'], ['Dallas', 'Tom Skerritt', 'hc', 'hardened-grunt-80s'], ['Parker', 'Yaphet Kotto', 'hc', 'practical-mechanic-80s'],
      ['The Alien', '', 'vs', 'hunter-alien-80s'], ['Ash', 'Ian Holm', 've', 'android-80s']]),
    M('Apocalypse Now', 1979, 'historical action horror rebelstate', 'A US Army captain is sent up a Cambodian river to kill a renegade colonel who has made himself a god.', [
      ['Capt. Willard', 'Martin Sheen', 'hs', 'secret-agent'], ['Chief Phillips', 'Albert Hall', 'hc', 'practical-mechanic-80s'], ['Lt. Col. Kilgore', 'Robert Duvall', 'nc', 'hardened-grunt-80s'],
      ['Col. Kurtz', 'Marlon Brando', 'vs', 'warmonger'], ['Kurtz\'s Montagnard army', '', 've', 'jungle-fighter-80s']]),
    M('Mad Max', 1979, 'scifi action rebelstate hiredhelp', 'A highway patrolman in a decaying Australia takes revenge on the biker gang that killed his family.', [
      ['Max Rockatansky', 'Mel Gibson', 'hs', 'grizzled-veteran'], ['Jim Goose', 'Steve Bisley', 'hc', 'maverick-cop-80s'], ['Jessie Rockatansky', 'Joanne Samuel', 'hc', 'everyman'],
      ['The Toecutter', 'Hugh Keays-Byrne', 'vs', 'warmonger'], ['Johnny the Boy', 'Tim Burns', 'vc', 'cruel-bully'], ['The Toecutter\'s gang', '', 've', 'raider'],
      ['The Interceptor', '', 'nv', 'supercar']]),
    M('The Amityville Horror', 1979, 'horror frightmare', 'A young family moves into a bargain house where a mass murder took place, and the house wants them gone.', [
      ['George Lutz', 'James Brolin', 'hs', 'unlikely-interloper-80s'], ['Kathy Lutz', 'Margot Kidder', 'hc', 'everyman'], ['Father Delaney', 'Rod Steiger', 'hc', 'quirky-investigator'],
      ['The house', '', 'vs', 'dark-shadow']]),
    M('The Warriors', 1979, 'action rebelstate hiredhelp', 'A Coney Island gang framed for killing a gang leader must fight its way home across New York.', [
      ['Swan', 'Michael Beck', 'hs', 'grizzled-veteran'], ['Mercy', 'Deborah Van Valkenburgh', 'hc', 'daring-rebel'], ['Ajax', 'James Remar', 'hc', 'hardened-grunt-80s'],
      ['Luther', 'David Patrick Kelly', 'vc', 'psycho-killer-80s'], ['The Baseball Furies', '', 've', 'street-punk-80s'], ['The Riffs', '', 'ne', 'urban-guerrilla-80s']]),
    M('9 to 5', 1980, 'adventure greedglamour', 'Three secretaries kidnap their sexist, egotistical boss and run the company better without him.', [
      ['Violet Newstead', 'Lily Tomlin', 'hs', 'unlikely-interloper-80s'], ['Judy Bernly', 'Jane Fonda', 'hc', 'everyman'], ['Doralee Rhodes', 'Dolly Parton', 'hc', 'daring-rebel'],
      ['Franklin Hart Jr.', 'Dabney Coleman', 'vs', 'corrupt-authority'], ['Roz Keith', 'Elizabeth Wilson', 'vc', 'red-right-hand']]),
    M('Airplane!', 1980, 'adventure hiredhelp', 'A traumatised ex-fighter pilot must land a passenger jet after the crew go down with food poisoning.', [
      ['Ted Striker', 'Robert Hays', 'hs', 'unlikely-interloper-80s'], ['Elaine Dickinson', 'Julie Hagerty', 'hc', 'everyman'], ['Dr. Rumack', 'Leslie Nielsen', 'hc', 'quirky-investigator'],
      ['Steve McCroskey', 'Lloyd Bridges', 'nc', 'white-collar-80s']]),
    M('Flash Gordon', 1980, 'scifi adventure fantasy silicondream rebelstate', 'A New York Jets quarterback is shot into space to stop Ming the Merciless from destroying Earth.', [
      ['Flash Gordon', 'Sam J. Jones', 'hs', 'intrepid-adventurer'], ['Dale Arden', 'Melody Anderson', 'hc', 'everyman'], ['Dr. Hans Zarkov', 'Topol', 'hc', 'quirky-investigator'],
      ['Prince Vultan', 'Brian Blessed', 'hc', 'mythic-champion'], ['Ming the Merciless', 'Max von Sydow', 'vs', 'evil-overlord'], ['Ming\'s guards', '', 've', 'imperial-trooper']]),
    M('Friday the 13th', 1980, 'horror frightmare', 'Counsellors reopening a cursed summer camp are picked off one by one by an unseen killer.', [
      ['Alice Hardy', 'Adrienne King', 'hs', 'innocent-soul'], ['Camp counsellors', '', 'he', 'youth'], ['Mrs. Voorhees', 'Betsy Palmer', 'vs', 'sadistic-slasher']]),
    M('The Blues Brothers', 1980, 'action adventure hiredhelp', 'Two blues musicians on a mission from God reunite their band to save their childhood orphanage.', [
      ['Jake Blues', 'John Belushi', 'hs', 'loveable-scoundrel'], ['Elwood Blues', 'Dan Aykroyd', 'hc', 'loyal-sidekick'], ['The Mystery Woman', 'Carrie Fisher', 'vc', 'psycho-killer-80s'],
      ['Illinois Nazis', '', 've', 'goon'], ['Illinois state police', '', 'ne', 'state-trooper-80s'], ['The Bluesmobile', '', 'nv', 'squad-car']]),
    M('The Fog', 1980, 'horror frightmare', 'On a coastal town\'s centenary, a glowing fog rolls in carrying the ghosts of murdered sailors.', [
      ['Stevie Wayne', 'Adrienne Barbeau', 'hs', 'innocent-soul'], ['Nick Castle', 'Tom Atkins', 'hc', 'everyman'], ['Father Malone', 'Hal Holbrook', 'hc', 'quirky-investigator'],
      ['Captain Blake', '', 'vs', 'dark-shadow'], ['Ghost sailors', '', 've', 'phantom']]),
    M('The Long Good Friday', 1980, 'action greedglamour', 'A London gangster planning a deal with the American Mafia is hit by a wave of bombings over one Easter weekend.', [
      ['Harold Shand', 'Bob Hoskins', 'vs', 'kingpin'], ['Victoria', 'Helen Mirren', 'nc', 'white-collar-80s'], ['Razors', 'P.H. Moriarty', 'vc', 'red-right-hand'],
      ['Charlie', 'Eddie Constantine', 'nc', 'organised-criminal-80s'], ['IRA gunmen', '', 've', 'urban-guerrilla-80s']]),
    M('An American Werewolf in London', 1981, 'horror frightmare', 'An American backpacker bitten on the Yorkshire moors starts turning into a wolf in London.', [
      ['David Kessler', 'David Naughton', 'ns', 'raging-brute-80s'], ['Alex Price', 'Jenny Agutter', 'hc', 'everyman'], ['Jack Goodman', 'Griffin Dunne', 'nc', 'incorporeal-advisor-80s'],
      ['Dr. Hirsch', 'John Woodvine', 'hc', 'quirky-investigator'], ['London police', '', 'he', 'cop']]),
    M('Clash of the Titans', 1981, 'fantasy adventure historical', 'Perseus, son of Zeus, must slay Medusa to save Princess Andromeda from the Kraken.', [
      ['Perseus', 'Harry Hamlin', 'hs', 'bold-blade'], ['Andromeda', 'Judi Bowker', 'hc', 'everyman'], ['Ammon', 'Burgess Meredith', 'hc', 'wise-mentor'],
      ['The Kraken', '', 'vs', 'great-monstrosity'], ['Calibos', 'Neil McCarthy', 'vc', 'ruthless-nemesis'], ['Medusa', '', 'vc', 'unstoppable-beast'],
      ['Giant scorpions', '', 've', 'monster-of-the-week']]),
    M('Excalibur', 1981, 'fantasy historical', 'The rise and fall of King Arthur, from the sword in the stone to the last battle with Mordred.', [
      ['King Arthur', 'Nigel Terry', 'hs', 'bold-blade'], ['Lancelot', 'Nicholas Clay', 'hc', 'mythic-champion'], ['Merlin', 'Nicol Williamson', 'hc', 'wise-mentor'],
      ['Morgana', 'Helen Mirren', 'vs', 'dark-shadow'], ['Mordred', 'Robert Addie', 'vc', 'ruthless-nemesis'], ['Knights of the Round Table', '', 'he', 'knight']]),
    M('For Your Eyes Only', 1981, 'action coldwar', 'Bond races the KGB to recover a missile command system from a sunken British spy ship.', [
      ['James Bond', 'Roger Moore', 'hs', 'special-agent-80s'], ['Melina Havelock', 'Carole Bouquet', 'hc', 'daring-rebel'], ['Milos Columbo', 'Topol', 'nc', 'rogue-trader-80s'],
      ['Aristotle Kristatos', 'Julian Glover', 'vs', 'mastermind'], ['Emile Locque', 'Michael Gothard', 'vc', 'red-right-hand'], ['Kristatos\'s thugs', '', 've', 'thug']]),
    M('Mad Max 2: The Road Warrior', 1981, 'scifi action rebelstate hiredhelp', 'A drifter agrees to haul a tanker of fuel for a besieged desert compound in return for petrol.', [
      ['Max', 'Mel Gibson', 'hs', 'nam-vet-80s'], ['The Gyro Captain', 'Bruce Spence', 'hc', 'practical-mechanic-80s'], ['Pappagallo', 'Michael Preston', 'hc', 'daring-rebel'],
      ['The Feral Kid', 'Emil Minty', 'he', 'kid'], ['Lord Humungus', 'Kjell Nilsson', 'vs', 'warmonger'], ['Wez', 'Vernon Wells', 'vc', 'unstoppable-beast'],
      ['Humungus\'s marauders', '', 've', 'raider'], ['The Mack tanker', '', 'nv', 'truck']]),
    M('Scanners', 1981, 'horror scifi frightmare silicondream', 'A drifter with telepathic powers is recruited to stop a renegade scanner building an underground army.', [
      ['Cameron Vale', 'Stephen Lack', 'hs', 'psychic-prodigy-80s'], ['Kim Obrist', 'Jennifer O\'Neill', 'hc', 'daring-rebel'], ['Dr. Paul Ruth', 'Patrick McGoohan', 'hc', 'wise-mentor'],
      ['Darryl Revok', 'Michael Ironside', 'vs', 'mastermind'], ['Revok\'s scanners', '', 've', 'scanner-80s']]),
    M('The Cannonball Run', 1981, 'adventure greedglamour hiredhelp', 'Racers in disguise cheat and smash their way across the country in an illegal coast-to-coast road race.', [
      ['J.J. McClure', 'Burt Reynolds', 'hs', 'loveable-scoundrel'], ['Victor Prinzim', 'Dom DeLuise', 'hc', 'loyal-sidekick'], ['Pamela Glover', 'Farrah Fawcett', 'hc', 'everyman'],
      ['Jamie Blake and Morris Fenderbaum', '', 'nc', 'rogue-trader-80s'], ['Rival racers', '', 'ne', 'driver-80s'], ['The Lamborghini Countach', '', 'nv', 'sports-car']]),
    M('The Evil Dead', 1981, 'horror frightmare', 'Five college students at a cabin in the woods play a recording from the Book of the Dead and unleash demons.', [
      ['Ash', 'Bruce Campbell', 'hs', 'unlikely-interloper-80s'], ['Cheryl', 'Ellen Sandweiss', 'hc', 'final-girl'], ['Scott', 'Richard DeManincor', 'hc', 'everyman'],
      ['The Evil', '', 'vs', 'dark-shadow'], ['Deadites', '', 've', 'deadite-80s']]),
    M('The Howling', 1981, 'horror frightmare', 'A shaken TV news anchor is sent to a coastal retreat to recover, not knowing the resort is run by werewolves.', [
      ['Karen White', 'Dee Wallace', 'hs', 'innocent-soul'], ['Chris Halloran', 'Dennis Dugan', 'hc', 'everyman'], ['Dr. George Waggner', 'Patrick Macnee', 'vs', 'dark-shadow'],
      ['Eddie Quist', 'Robert Picardo', 'vc', 'unstoppable-beast'], ['The colony', '', 've', 'cursed-creature']]),
    M('48 Hrs.', 1982, 'action hiredhelp', 'A tough San Francisco cop springs a smart-mouthed convict for 48 hours to catch two escaped killers.', [
      ['Jack Cates', 'Nick Nolte', 'hs', 'grizzled-veteran'], ['Reggie Hammond', 'Eddie Murphy', 'hc', 'ex-con-80s'], ['SFPD officers', '', 'he', 'cop'],
      ['Albert Ganz', 'James Remar', 'vc', 'psycho-killer-80s'], ['Billy Bear', 'Sonny Landham', 'vc', 'unstoppable-beast']]),
    M('Conan the Barbarian', 1982, 'fantasy action historical', 'A slave turned warrior hunts the snake cult leader who slaughtered his village.', [
      ['Conan', 'Arnold Schwarzenegger', 'hs', 'bold-blade'], ['Valeria', 'Sandahl Bergman', 'hc', 'mythic-champion'], ['Subotai', 'Gerry Lopez', 'hc', 'loyal-sidekick'],
      ['Thulsa Doom', 'James Earl Jones', 'vs', 'evil-overlord'], ['Rexor', 'Ben Davidson', 'vc', 'red-right-hand'], ['Snake cultists', '', 've', 'cultist']]),
    M('E.T. the Extra-Terrestrial', 1982, 'scifi silicondream', 'A lonely boy hides a stranded alien from the government and helps it phone home.', [
      ['Elliott', 'Henry Thomas', 'hs', 'innocent-soul'], ['Michael', 'Robert MacNaughton', 'hc', 'brat-packer-80s'], ['Gertie', 'Drew Barrymore', 'he', 'kid'],
      ['E.T.', '', 'ne', 'timid-alien-80s'], ['Keys', 'Peter Coyote', 'nc', 'spy-catcher-80s'], ['Government agents', '', 've', 'agent']]),
    M('Firefox', 1982, 'action coldwar silicondream', 'A US pilot is smuggled into the Soviet Union to steal a mind-controlled stealth fighter.', [
      ['Mitchell Gant', 'Clint Eastwood', 'hs', 'nam-vet-80s'], ['Pavel Upenskoy', 'Warren Clarke', 'hc', 'quirky-investigator'], ['Col. Kontarsky', 'Kai Wulff', 'vc', 'spy-catcher-80s'],
      ['KGB agents', '', 've', 'foreign-agent-80s']]),
    M('First Blood', 1982, 'action coldwar rebelstate', 'A drifting Vietnam vet is pushed too far by a small-town sheriff and turns the forest into a war zone.', [
      ['John Rambo', 'Sylvester Stallone', 'hs', 'nam-vet-80s'], ['Col. Trautman', 'Richard Crenna', 'hc', 'wise-mentor'], ['Sheriff Teasle', 'Brian Dennehy', 'vs', 'corrupt-authority'],
      ['Deputy Galt', 'Jack Starrett', 'vc', 'cruel-bully'], ['Deputies', '', 've', 'state-trooper-80s'], ['National Guard', '', 'ne', 'soldier']]),
    M('Poltergeist', 1982, 'horror frightmare', 'A suburban family\'s youngest daughter is taken by spirits that speak to her through the TV.', [
      ['Steve Freeling', 'Craig T. Nelson', 'hs', 'unlikely-interloper-80s'], ['Diane Freeling', 'JoBeth Williams', 'hc', 'everyman'], ['Tangina', 'Zelda Rubinstein', 'hc', 'wise-mentor'],
      ['The Beast', '', 'vs', 'dark-shadow'], ['Spirits', '', 've', 'phantom']]),
    M('Rocky III', 1982, 'action greedglamour', 'A complacent heavyweight champion loses his title to a hungry challenger and retrains with his old rival Apollo Creed.', [
      ['Rocky Balboa', 'Sylvester Stallone', 'hs', 'wonder-warrior-80s'], ['Apollo Creed', 'Carl Weathers', 'hc', 'loyal-sidekick'], ['Mickey', 'Burgess Meredith', 'hc', 'wise-mentor'],
      ['Clubber Lang', 'Mr. T', 'vc', 'boss-monster-80s'], ['Thunderlips', 'Hulk Hogan', 'ne', 'athlete-80s']]),
    M('Star Trek II: The Wrath of Khan', 1982, 'scifi adventure silicondream', 'Admiral Kirk faces an old enemy, the genetically engineered Khan, who has stolen a device that can remake worlds.', [
      ['Admiral Kirk', 'William Shatner', 'hs', 'grizzled-veteran'], ['Spock', 'Leonard Nimoy', 'hc', 'wise-mentor'], ['Dr. McCoy', 'DeForest Kelley', 'hc', 'quirky-investigator'],
      ['Starfleet crew', '', 'he', 'space-commando'], ['Khan Noonien Singh', 'Ricardo Montalbán', 'vs', 'warmonger'], ['Khan\'s followers', '', 've', 'raider']]),
    M('Tron', 1982, 'scifi silicondream', 'A video game programmer is digitised into a computer and fights the Master Control Program from inside.', [
      ['Kevin Flynn', 'Jeff Bridges', 'hs', 'unlikely-interloper-80s'], ['Tron', 'Bruce Boxleitner', 'hc', 'mythic-champion'], ['Yori', 'Cindy Morgan', 'hc', 'everyman'],
      ['The Master Control Program', 'David Warner', 'vs', 'digital-avatar-80s'], ['Sark', 'David Warner', 'vc', 'red-right-hand'], ['MCP warriors', '', 've', 'electron-guard-80s'],
      ['Light cycles', '', 'nv', 'electron-bike-80s']]),
    M('Blue Thunder', 1983, 'action silicondream greedglamour', 'An LAPD helicopter pilot test-flying a hi-tech surveillance gunship uncovers a government conspiracy.', [
      ['Frank Murphy', 'Roy Scheider', 'hs', 'nam-vet-80s'], ['Richard Lymangood', 'Daniel Stern', 'hc', 'whiz-kid-80s'], ['Kate', 'Candy Clark', 'hc', 'everyman'],
      ['Col. F.E. Cochrane', 'Malcolm McDowell', 'vs', 'warmonger'], ['Blue Thunder', '', 'nv', 'chopper']]),
    M('Flashdance', 1983, 'greedglamour hiredhelp', 'A Pittsburgh welder who dances in a bar at night dreams of getting into a top ballet school.', [
      ['Alex Owens', 'Jennifer Beals', 'hs', 'innocent-soul'], ['Nick Hurley', 'Michael Nouri', 'hc', 'everyman'], ['Hanna Long', 'Lilia Skala', 'hc', 'wise-mentor'],
      ['Johnny C.', 'Lee Ving', 'vc', 'career-criminal']]),
    M('National Lampoon\'s Vacation', 1983, 'adventure hiredhelp', 'Clark Griswold drives his family across America to Walley World, and everything goes wrong.', [
      ['Clark Griswold', 'Chevy Chase', 'hs', 'unlikely-interloper-80s'], ['Ellen Griswold', 'Beverly D\'Angelo', 'hc', 'everyman'], ['Cousin Eddie', 'Randy Quaid', 'nc', 'rogue-trader-80s'],
      ['Rusty and Audrey', '', 'he', 'kid'], ['Roy Walley', 'Eddie Bracken', 'ns', 'millionaire-meddler-80s'], ['Walley World security', '', 'ne', 'security-guard']]),
    M('Octopussy', 1983, 'action coldwar adventure', 'Bond follows a fake Fabergé egg to an exiled Afghan prince, a circus and a Soviet general\'s plan to bomb NATO.', [
      ['James Bond', 'Roger Moore', 'hs', 'special-agent-80s'], ['Octopussy', 'Maud Adams', 'ns', 'seductive-schemer-80s'], ['Kamal Khan', 'Louis Jourdan', 'vs', 'mastermind'],
      ['Gen. Orlov', 'Steven Berkoff', 'vs', 'warmonger'], ['Gobinda', 'Kabir Bedi', 'vc', 'red-right-hand'], ['Mischka and Grischka', '', 've', 'assassin']]),
    M('Risky Business', 1983, 'greedglamour', 'A teenager left home alone wrecks his dad\'s Porsche and turns the family house into a brothel for one night.', [
      ['Joel Goodsen', 'Tom Cruise', 'hs', 'innocent-soul'], ['Lana', 'Rebecca De Mornay', 'hc', 'daring-rebel'], ['Miles', 'Curtis Armstrong', 'nc', 'brat-packer-80s'],
      ['Guido', 'Joe Pantoliano', 'vs', 'kingpin'], ['The Porsche 928', '', 'nv', 'sports-car']]),
    M('The Outsiders', 1983, 'rebelstate', 'Rival gangs of poor greasers and rich Socs clash in 1960s Oklahoma.', [
      ['Ponyboy Curtis', 'C. Thomas Howell', 'hs', 'innocent-soul'], ['Johnny Cade', 'Ralph Macchio', 'hc', 'loyal-sidekick'], ['Darry Curtis', 'Patrick Swayze', 'hc', 'everyman'],
      ['Dallas Winston', 'Matt Dillon', 'nc', 'ex-con-80s'], ['The greasers', '', 'he', 'youth'], ['Bob Sheldon', 'Leif Garrett', 'vc', 'cruel-bully'],
      ['The Socs', '', 've', 'thug']]),
    M('Trading Places', 1983, 'greedglamour', 'Two Philadelphia commodities brokers swap a blue-blood trader and a street hustler for a one-dollar bet.', [
      ['Louis Winthorpe III', 'Dan Aykroyd', 'hs', 'unlikely-interloper-80s'], ['Billy Ray Valentine', 'Eddie Murphy', 'hc', 'ex-con-80s'], ['Ophelia', 'Jamie Lee Curtis', 'hc', 'everyman'],
      ['Randolph and Mortimer Duke', '', 'vs', 'millionaire-meddler-80s'], ['Clarence Beeks', 'Paul Gleason', 'vc', 'red-right-hand']]),
    M('WarGames', 1983, 'scifi coldwar silicondream', 'A teenage hacker breaks into a military supercomputer and nearly starts World War III.', [
      ['David Lightman', 'Matthew Broderick', 'hs', 'innocent-soul'], ['Jennifer Mack', 'Ally Sheedy', 'hc', 'everyman'], ['Dr. Stephen Falken', 'John Wood', 'hc', 'wise-mentor'],
      ['WOPR', '', 'vs', 'digital-avatar-80s'], ['McKittrick', 'Dabney Coleman', 'vc', 'white-collar-80s'], ['NORAD officers', '', 'ne', 'soldier']]),
    M('Children of the Corn', 1984, 'horror frightmare', 'A couple driving through Nebraska stumble into a town where the children have killed every adult.', [
      ['Burt', 'Peter Horton', 'hs', 'unlikely-interloper-80s'], ['Vicky', 'Linda Hamilton', 'hc', 'everyman'], ['He Who Walks Behind the Rows', '', 'vs', 'dark-shadow'],
      ['Isaac', 'John Franklin', 'vc', 'sinister-mystic'], ['Malachai', 'Courtney Gains', 'vc', 'cruel-bully'], ['The children', '', 've', 'cultist']]),
    M('Dune', 1984, 'scifi adventure rebelstate', 'Paul Atreides survives his family\'s betrayal on the desert planet Arrakis and leads the Fremen against the Harkonnens.', [
      ['Paul Atreides', 'Kyle MacLachlan', 'hs', 'innocent-soul'], ['Lady Jessica', 'Francesca Annis', 'hc', 'wise-mentor'], ['Duncan Idaho', 'Richard Jordan', 'hc', 'mythic-champion'],
      ['Fremen', '', 'he', 'freedom-fighter'], ['Baron Harkonnen', 'Kenneth McMillan', 'vs', 'evil-overlord'], ['Feyd-Rautha', 'Sting', 'vc', 'ruthless-nemesis'],
      ['Sardaukar', '', 've', 'imperial-trooper']]),
    M('Footloose', 1984, 'rebelstate', 'A city teenager moves to a small town where dancing has been banned and takes on the preacher behind it.', [
      ['Ren McCormack', 'Kevin Bacon', 'hs', 'innocent-soul'], ['Ariel Moore', 'Lori Singer', 'hc', 'daring-rebel'], ['Willard Hewitt', 'Chris Penn', 'hc', 'loyal-sidekick'],
      ['Rev. Shaw Moore', 'John Lithgow', 'vs', 'stern-authoritarian-80s'], ['Chuck Cranston', 'Jim Youngs', 'vc', 'cruel-bully']]),
    M('Gremlins', 1984, 'horror fantasy frightmare', 'A teenager\'s unusual Christmas present breaks every rule and fills the town with murderous little monsters.', [
      ['Billy Peltzer', 'Zach Galligan', 'hs', 'innocent-soul'], ['Kate Beringer', 'Phoebe Cates', 'hc', 'everyman'], ['Gizmo', '', 'ne', 'furkin-80s'],
      ['Stripe', '', 'vc', 'boss-monster-80s'], ['Gremlins', '', 've', 'gribbly-80s']]),
    M('Indiana Jones and the Temple of Doom', 1984, 'adventure fantasy horror frightmare hiredhelp', 'Indy, a nightclub singer and a young sidekick crash in India and uncover a Thuggee cult enslaving children in a palace mine.', [
      ['Indiana Jones', 'Harrison Ford', 'hs', 'intrepid-adventurer'], ['Short Round', 'Ke Huy Quan', 'hc', 'whiz-kid-80s'], ['Willie Scott', 'Kate Capshaw', 'hc', 'everyman'],
      ['Mola Ram', 'Amrish Puri', 'vs', 'dark-shadow'], ['Chattar Lal', 'Roshan Seth', 'vc', 'red-right-hand'], ['Thuggee guards', '', 've', 'cultist']]),
    M('Missing in Action', 1984, 'action coldwar rebelstate', 'A former POW returns to Vietnam to free American prisoners still held in the jungle.', [
      ['Col. James Braddock', 'Chuck Norris', 'hs', 'nam-vet-80s'], ['Jack Tucker', 'M. Emmet Walsh', 'nc', 'rogue-trader-80s'], ['Gen. Trau', 'James Hong', 'vs', 'warmonger'],
      ['Vietnamese soldiers', '', 've', 'soldier']]),
    M('Nineteen Eighty-Four', 1984, 'scifi rebelstate', 'Winston Smith rewrites history for the Party and risks everything on a forbidden love affair.', [
      ['Winston Smith', 'John Hurt', 'hs', 'innocent-soul'], ['Julia', 'Suzanna Hamilton', 'hc', 'daring-rebel'], ['O\'Brien', 'Richard Burton', 'vs', 'stern-authoritarian-80s'],
      ['Mr. Charrington', 'Cyril Cusack', 'vc', 'red-right-hand'], ['The Thought Police', '', 've', 'secret-police-80s']]),
    M('Red Dawn', 1984, 'action coldwar rebelstate', 'High-school kids in Colorado fight a guerrilla war after Soviet and Cuban troops invade the United States.', [
      ['Jed Eckert', 'Patrick Swayze', 'hs', 'rebel-commander-80s'], ['Matt Eckert', 'Charlie Sheen', 'hc', 'loyal-sidekick'], ['Lt. Col. Andy Tanner', 'Powers Boothe', 'hc', 'hardened-grunt-80s'],
      ['The Wolverines', '', 'he', 'freedom-fighter'], ['Col. Strelnikov', 'William Smith', 'vc', 'spy-catcher-80s'], ['Soviet troops', '', 've', 'kold-warrior-80s']]),
    M('Revenge of the Nerds', 1984, 'rebelstate', 'Bullied college freshmen form their own fraternity to fight back against the jocks.', [
      ['Lewis Skolnick', 'Robert Carradine', 'hs', 'innocent-soul'], ['Gilbert Lowe', 'Anthony Edwards', 'hc', 'whiz-kid-80s'], ['Booger', 'Curtis Armstrong', 'nc', 'brat-packer-80s'],
      ['Stan Gable', 'Ted McGinley', 'vc', 'cruel-bully'], ['The Alpha Betas', '', 've', 'bully-80s']]),
    M('Romancing the Stone', 1984, 'adventure greedglamour hiredhelp', 'A romance novelist flies to Colombia to save her kidnapped sister and is rescued by a bird-smuggling soldier of fortune.', [
      ['Jack Colton', 'Michael Douglas', 'hs', 'loveable-scoundrel'], ['Joan Wilder', 'Kathleen Turner', 'hc', 'quirky-investigator'], ['Ralph', 'Danny DeVito', 'nc', 'rogue-trader-80s'],
      ['Col. Zolo', 'Manuel Ojeda', 'vs', 'warmonger'], ['Zolo\'s soldiers', '', 've', 'soldier']]),
    M('The Adventures of Buckaroo Banzai Across the 8th Dimension', 1984, 'scifi adventure silicondream', 'A neurosurgeon, physicist and rock star leads his band against evil aliens from the 8th dimension.', [
      ['Buckaroo Banzai', 'Peter Weller', 'hs', 'intrepid-adventurer'], ['Penny Priddy', 'Ellen Barkin', 'hc', 'everyman'], ['New Jersey', 'Jeff Goldblum', 'hc', 'quirky-investigator'],
      ['Dr. Emilio Lizardo', 'John Lithgow', 'vs', 'mastermind'], ['Red Lectroids', '', 've', 'undercover-alien-80s']]),
    M('The Karate Kid', 1984, 'action coldwar hiredhelp', 'A bullied new kid in the Valley learns karate, and balance, from his apartment block\'s handyman.', [
      ['Daniel LaRusso', 'Ralph Macchio', 'hs', 'innocent-soul'], ['Mr. Miyagi', 'Pat Morita', 'hc', 'wise-mentor'], ['John Kreese', 'Martin Kove', 'vs', 'warmonger'],
      ['Johnny Lawrence', 'William Zabka', 'vc', 'cruel-bully'], ['Cobra Kai students', '', 've', 'thug']]),
    M('The Last Starfighter', 1984, 'scifi silicondream', 'A trailer-park teenager\'s high score on an arcade game gets him recruited to fight a real space war.', [
      ['Alex Rogan', 'Lance Guest', 'hs', 'innocent-soul'], ['Grig', 'Dan O\'Herlihy', 'hc', 'loyal-sidekick'], ['Centauri', 'Robert Preston', 'nc', 'rogue-trader-80s'],
      ['Xur', 'Norman Snow', 'vs', 'mastermind'], ['Lord Kril', '', 'vc', 'ruthless-nemesis'], ['The Ko-Dan Armada', '', 've', 'alien-invader']]),
    M('The NeverEnding Story', 1984, 'fantasy adventure', 'A bullied boy reading a stolen book is pulled into the fight to save Fantasia from the Nothing.', [
      ['Atreyu', 'Noah Hathaway', 'hs', 'innocent-soul'], ['Bastian', 'Barret Oliver', 'hc', 'everyman'], ['Falkor', '', 'hc', 'loyal-sidekick'],
      ['The Nothing', '', 'vs', 'great-monstrosity'], ['Gmork', '', 'vc', 'unstoppable-beast']]),
    M('A View to a Kill', 1985, 'action coldwar greedglamour silicondream', 'Bond takes on a microchip tycoon who plans to flood Silicon Valley and corner the world market.', [
      ['James Bond', 'Roger Moore', 'hs', 'special-agent-80s'], ['Stacey Sutton', 'Tanya Roberts', 'hc', 'everyman'], ['Max Zorin', 'Christopher Walken', 'vs', 'millionaire-meddler-80s'],
      ['May Day', 'Grace Jones', 'vc', 'ruthless-nemesis'], ['Zorin\'s guards', '', 've', 'private-security-80s']]),
    M('Brazil', 1985, 'scifi rebelstate', 'A daydreaming clerk in a bureaucratic dystopia tries to fix a fatal clerical error and falls for a woman on a watch list.', [
      ['Sam Lowry', 'Jonathan Pryce', 'hs', 'unlikely-interloper-80s'], ['Jill Layton', 'Kim Greist', 'hc', 'daring-rebel'], ['Harry Tuttle', 'Robert De Niro', 'hc', 'practical-mechanic-80s'],
      ['Mr. Helpmann', 'Peter Vaughan', 'vs', 'stern-authoritarian-80s'], ['Jack Lint', 'Michael Palin', 'vc', 'cruel-bully'], ['Ministry stormtroopers', '', 've', 'secret-police-80s']]),
    M('Day of the Dead', 1985, 'horror scifi frightmare', 'Scientists and soldiers trapped in an underground bunker turn on each other while the dead mass outside.', [
      ['Sarah', 'Lori Cardille', 'hs', 'unlikely-interloper-80s'], ['John', 'Terry Alexander', 'hc', 'practical-mechanic-80s'], ['Capt. Rhodes', 'Joseph Pilato', 'vs', 'warmonger'],
      ['Dr. Logan', 'Richard Liberty', 'vc', 'mad-scientist'], ['The dead', '', 've', 'zombie']]),
    M('Enemy Mine', 1985, 'scifi adventure', 'A human pilot and a reptilian alien soldier stranded on a hostile planet learn to survive together.', [
      ['Willis Davidge', 'Dennis Quaid', 'hs', 'grizzled-veteran'], ['Jeriba Shigan', 'Louis Gossett Jr.', 'hc', 'loyal-sidekick'], ['Stubbins', 'Brion James', 'vc', 'cruel-bully'],
      ['Scavenger miners', '', 've', 'raider']]),
    M('Fletch', 1985, 'adventure greedglamour hiredhelp', 'A wisecracking undercover reporter is offered a fortune to kill a millionaire who says he is dying.', [
      ['Irwin "Fletch" Fletcher', 'Chevy Chase', 'hs', 'unlikely-interloper-80s'], ['Gail Stanwyk', 'Dana Wheeler-Nicholson', 'hc', 'everyman'], ['Alan Stanwyk', 'Tim Matheson', 'vs', 'bold-planner-80s'],
      ['Chief Jerry Karlin', 'Joe Don Baker', 'vc', 'cruel-bully'], ['Karlin\'s cops', '', 've', 'enforcer']]),
    M('Ladyhawke', 1985, 'fantasy adventure historical', 'A young thief helps a knight and a woman, cursed to be a hawk by day and a wolf by night, break a bishop\'s spell.', [
      ['Etienne Navarre', 'Rutger Hauer', 'hs', 'bold-blade'], ['Phillipe Gaston', 'Matthew Broderick', 'hc', 'rogue-trader-80s'], ['Isabeau', 'Michelle Pfeiffer', 'hc', 'daring-rebel'],
      ['The Bishop of Aquila', 'John Wood', 'vs', 'corrupt-authority'], ['Captain Marquet', 'Ken Hutchison', 'vc', 'red-right-hand'], ['The Bishop\'s guards', '', 've', 'guard']]),
    M('Legend', 1985, 'fantasy', 'A forest boy must rescue a princess and the last unicorns from the Lord of Darkness, who wants to end daylight forever.', [
      ['Jack', 'Tom Cruise', 'hs', 'innocent-soul'], ['Princess Lili', 'Mia Sara', 'hc', 'daring-rebel'], ['Gump', 'David Bennent', 'hc', 'loyal-sidekick'],
      ['Darkness', 'Tim Curry', 'vs', 'evil-overlord'], ['Blix', 'Alice Playten', 'vc', 'cruel-bully'], ['Goblins', '', 've', 'henchman']]),
    M('Mad Max Beyond Thunderdome', 1985, 'scifi action rebelstate hiredhelp', 'Max is exiled from Bartertown into the desert and found by a tribe of lost children who think he is their saviour.', [
      ['Max', 'Mel Gibson', 'hs', 'nam-vet-80s'], ['Savannah Nix', 'Helen Buday', 'hc', 'daring-rebel'], ['The lost tribe', '', 'he', 'kid'],
      ['Aunty Entity', 'Tina Turner', 'vs', 'stern-authoritarian-80s'], ['Master Blaster', '', 'vc', 'unstoppable-beast'], ['Ironbar', 'Angry Anderson', 'vc', 'red-right-hand'],
      ['Bartertown guards', '', 've', 'thug']]),
    M('Pale Rider', 1985, 'historical action hiredhelp', 'A mysterious preacher rides into a California mining camp and takes on the company trying to drive the prospectors out.', [
      ['The Preacher', 'Clint Eastwood', 'hs', 'mysterious-stranger'], ['Hull Barret', 'Michael Moriarty', 'hc', 'everyman'], ['Coy LaHood', 'Richard Dysart', 'vs', 'kingpin'],
      ['Marshal Stockburn', 'John Russell', 'vc', 'ruthless-nemesis'], ['Stockburn\'s deputies', '', 've', 'gunslinger']]),
    M('Ran', 1985, 'historical action', 'An ageing warlord divides his realm among his three sons and watches it tear itself apart.', [
      ['Lord Hidetora', 'Tatsuya Nakadai', 'ns', 'legendary-paragon-80s'], ['Saburo', 'Daisuke Ryû', 'hc', 'mythic-champion'], ['Lady Kaede', 'Mieko Harada', 'vs', 'seductive-schemer-80s'],
      ['Taro and Jiro', '', 'vc', 'cruel-bully'], ['Ichimonji samurai', '', 'ne', 'warrior']]),
    M('Re-Animator', 1985, 'horror scifi frightmare', 'A medical student brings the dead back to life with a glowing green serum, with gruesome results.', [
      ['Dan Cain', 'Bruce Abbott', 'hs', 'innocent-soul'], ['Megan Halsey', 'Barbara Crampton', 'hc', 'final-girl'], ['Dr. Carl Hill', 'David Gale', 'vs', 'mastermind'],
      ['Herbert West', 'Jeffrey Combs', 'vc', 'mad-scientist'], ['Re-animated corpses', '', 've', 'zombie']]),
    M('Rocky IV', 1985, 'action coldwar', 'Rocky Balboa travels to the Soviet Union to fight Ivan Drago, the boxer who killed Apollo Creed in the ring.', [
      ['Rocky Balboa', 'Sylvester Stallone', 'hs', 'wonder-warrior-80s'], ['Adrian', 'Talia Shire', 'hc', 'everyman'], ['Paulie', 'Burt Young', 'hc', 'loyal-sidekick'],
      ['Ivan Drago', 'Dolph Lundgren', 'vc', 'unstoppable-beast'], ['Soviet trainers', '', 've', 'kold-warrior-80s']]),
    M('Silverado', 1985, 'historical action hiredhelp', 'Four drifters ride into a frontier town run by a crooked sheriff and a land-grabbing rancher.', [
      ['Emmett', 'Scott Glenn', 'hs', 'grizzled-veteran'], ['Paden', 'Kevin Kline', 'hc', 'loyal-sidekick'], ['Jake', 'Kevin Costner', 'hc', 'daring-rebel'],
      ['Mal', 'Danny Glover', 'hc', 'hardened-grunt-80s'], ['Sheriff Cobb', 'Brian Dennehy', 'vs', 'corrupt-authority'], ['McKendrick\'s men', '', 've', 'gunslinger']]),
    M('Spies Like Us', 1985, 'adventure coldwar', 'Two bumbling government employees are sent into Soviet Central Asia as decoys for a real spy mission.', [
      ['Emmett Fitz-Hume', 'Chevy Chase', 'hs', 'unlikely-interloper-80s'], ['Austin Millbarge', 'Dan Aykroyd', 'hc', 'whiz-kid-80s'], ['Karen Boyer', 'Donna Dixon', 'hc', 'daring-rebel'],
      ['Ruby', 'Bernie Casey', 'vc', 'spy-catcher-80s'], ['Soviet missile crew', '', 've', 'kold-warrior-80s']]),
    M('Teen Wolf', 1985, 'fantasy frightmare hiredhelp', 'A high-school basketball player finds out he is a werewolf and becomes the most popular kid in school.', [
      ['Scott Howard', 'Michael J. Fox', 'hs', 'raging-brute-80s'], ['Stiles', 'Jerry Levine', 'hc', 'brat-packer-80s'], ['Boof', 'Susan Ursitti', 'hc', 'everyman'],
      ['Coach Finstock', 'Jay Tarses', 'ne', 'coach-80s'], ['Mick McAllister', 'Mark Arnold', 'vc', 'cruel-bully']]),
    M('The Breakfast Club', 1985, 'rebelstate', 'Five students from different cliques spend a Saturday detention together.', [
      ['Brian Johnson', 'Anthony Michael Hall', 'hs', 'innocent-soul'], ['John Bender', 'Judd Nelson', 'nc', 'brat-packer-80s'], ['Claire Standish', 'Molly Ringwald', 'nc', 'brat-packer-80s'],
      ['Allison Reynolds', 'Ally Sheedy', 'nc', 'scream-teen-80s'], ['Andrew Clark', 'Emilio Estevez', 'ne', 'athlete-80s'], ['Principal Vernon', 'Paul Gleason', 'vs', 'stern-authoritarian-80s']]),
    M('The Goonies', 1985, 'adventure hiredhelp', 'A gang of kids about to lose their homes follow a pirate\'s treasure map through booby-trapped caves.', [
      ['Mikey Walsh', 'Sean Astin', 'hs', 'innocent-soul'], ['Data', 'Ke Huy Quan', 'hc', 'whiz-kid-80s'], ['Brand Walsh', 'Josh Brolin', 'hc', 'brat-packer-80s'],
      ['Sloth', 'John Matuszak', 'hc', 'missing-link-80s'], ['Mama Fratelli', 'Anne Ramsey', 'vs', 'kingpin'], ['Jake and Francis Fratelli', '', 'vc', 'career-criminal']]),
    M('The Return of the Living Dead', 1985, 'horror frightmare', 'Two warehouse workers release a gas that raises the dead, and the dead want brains.', [
      ['Frank', 'James Karen', 'hs', 'unlikely-interloper-80s'], ['Burt', 'Clu Gulager', 'hc', 'practical-mechanic-80s'], ['Ernie', 'Don Calfa', 'hc', 'wise-mentor'],
      ['The punks', '', 'ne', 'street-punk-80s'], ['Tarman', '', 'vc', 'unstoppable-beast'], ['Zombies', '', 've', 'zombie']]),
    M('Weird Science', 1985, 'scifi silicondream', 'Two teenage nerds build the perfect woman on their computer, and she sets about fixing their lives.', [
      ['Gary Wallace', 'Anthony Michael Hall', 'hs', 'innocent-soul'], ['Wyatt Donnelly', 'Ilan Mitchell-Smith', 'hc', 'whiz-kid-80s'], ['Lisa', 'Kelly LeBrock', 'hc', 'daring-rebel'],
      ['Chet Donnelly', 'Bill Paxton', 'vc', 'cruel-bully'], ['Mutant bikers', '', 've', 'raider']]),
    M('Critters', 1986, 'horror scifi frightmare', 'Furry, ravenous alien escapees land on a Kansas farm, with two shape-shifting bounty hunters right behind them.', [
      ['Brad Brown', 'Scott Grimes', 'hs', 'innocent-soul'], ['Charlie McFadden', 'Don Opper', 'hc', 'everyman'], ['Ug and Lee', '', 'nc', 'relentless-pursuer-80s'],
      ['The Krites', '', 've', 'gribbly-80s']]),
    M('Crocodile Dundee', 1986, 'adventure greedglamour hiredhelp', 'An outback hunter famous for surviving a crocodile attack follows a New York reporter home.', [
      ['Mick Dundee', 'Paul Hogan', 'hs', 'intrepid-adventurer'], ['Sue Charlton', 'Linda Kozlowski', 'hc', 'quirky-investigator'], ['Walter Reilly', 'John Meillon', 'hc', 'loyal-sidekick'],
      ['Richard Mason', 'Mark Blum', 'vc', 'white-collar-80s'], ['Street punks', '', 've', 'street-punk-80s']]),
    M('Ferris Bueller\'s Day Off', 1986, 'adventure rebelstate', 'A high-school senior fakes sick and takes his best friend and girlfriend on a day off in Chicago.', [
      ['Ferris Bueller', 'Matthew Broderick', 'hs', 'loveable-scoundrel'], ['Cameron Frye', 'Alan Ruck', 'hc', 'loyal-sidekick'], ['Sloane Peterson', 'Mia Sara', 'hc', 'everyman'],
      ['Jeanie Bueller', 'Jennifer Grey', 'nc', 'brat-packer-80s'], ['Ed Rooney', 'Jeffrey Jones', 'vs', 'stern-authoritarian-80s'], ['The Ferrari', '', 'nv', 'sports-car']]),
    M('Flight of the Navigator', 1986, 'scifi silicondream', 'A boy wakes up eight years in the future after being taken by an alien ship, and escapes NASA on board it.', [
      ['David Freeman', 'Joey Cramer', 'hs', 'innocent-soul'], ['Max', 'Paul Reubens', 'nc', 'incorporeal-advisor-80s'], ['Dr. Faraday', 'Howard Hesseman', 'vc', 'mad-scientist'],
      ['NASA security', '', 've', 'agent']]),
    M('Highlander', 1986, 'fantasy action greedglamour frightmare', 'An immortal Scottish swordsman faces the last of his kind in modern New York, where there can be only one.', [
      ['Connor MacLeod', 'Christopher Lambert', 'hs', 'bold-blade'], ['Ramírez', 'Sean Connery', 'hc', 'wise-mentor'], ['Brenda Wyatt', 'Roxanne Hart', 'hc', 'quirky-investigator'],
      ['The Kurgan', 'Clancy Brown', 'vs', 'sadistic-slasher'], ['NYPD detectives', '', 'he', 'plainclothes-cop-80s']]),
    M('Platoon', 1986, 'historical action rebelstate', 'A college dropout volunteers for Vietnam and is caught between two sergeants fighting for the soul of his platoon.', [
      ['Chris Taylor', 'Charlie Sheen', 'hs', 'innocent-soul'], ['Sgt. Elias', 'Willem Dafoe', 'hc', 'hardened-grunt-80s'], ['Sgt. Barnes', 'Tom Berenger', 'vc', 'ruthless-nemesis'],
      ['Viet Cong', '', 've', 'jungle-fighter-80s']]),
    M('Pretty in Pink', 1986, 'greedglamour rebelstate', 'A working-class teen falls for a rich kid while her best friend Duckie pines for her.', [
      ['Andie Walsh', 'Molly Ringwald', 'hs', 'innocent-soul'], ['Duckie Dale', 'Jon Cryer', 'hc', 'loyal-sidekick'], ['Blane McDonnagh', 'Andrew McCarthy', 'hc', 'everyman'],
      ['Iona', 'Annie Potts', 'hc', 'wise-mentor'], ['Steff McKee', 'James Spader', 'vc', 'cruel-bully']]),
    M('Short Circuit', 1986, 'scifi silicondream', 'A military robot struck by lightning comes alive and runs away from the defence company that built it.', [
      ['Stephanie Speck', 'Ally Sheedy', 'hs', 'innocent-soul'], ['Newton Crosby', 'Steve Guttenberg', 'hc', 'whiz-kid-80s'], ['Ben Jabituya', 'Fisher Stevens', 'hc', 'loyal-sidekick'],
      ['Number 5', '', 'he', 'prototype-pal-80s'], ['Skroeder', 'G.W. Bailey', 'vc', 'cruel-bully'], ['NOVA robots', '', 've', 'military-robot-80s']]),
    M('Stand by Me', 1986, 'adventure hiredhelp', 'Four boys in 1959 Oregon walk the railway tracks to find a missing kid\'s body, with the town\'s teenage hoods on their trail.', [
      ['Gordie Lachance', 'Wil Wheaton', 'hs', 'innocent-soul'], ['Chris Chambers', 'River Phoenix', 'hc', 'loyal-sidekick'], ['Teddy Duchamp', 'Corey Feldman', 'nc', 'brat-packer-80s'],
      ['Vern Tessio', 'Jerry O\'Connell', 'hc', 'everyman'], ['Ace Merrill', 'Kiefer Sutherland', 'vc', 'cruel-bully'], ['Ace\'s gang', '', 've', 'bully-80s']]),
    M('The Fly', 1986, 'horror scifi frightmare silicondream', 'A brilliant scientist\'s teleporter merges him with a housefly, and he slowly turns into something else.', [
      ['Seth Brundle', 'Jeff Goldblum', 'ns', 'raging-brute-80s'], ['Veronica Quaife', 'Geena Davis', 'hc', 'quirky-investigator'], ['Stathis Borans', 'John Getz', 'nc', 'white-collar-80s']]),
    M('The Golden Child', 1986, 'fantasy adventure frightmare hiredhelp', 'A Los Angeles social worker who finds lost children is chosen to rescue a mystical boy from a demon.', [
      ['Chandler Jarrell', 'Eddie Murphy', 'hs', 'unlikely-interloper-80s'], ['Kee Nang', 'Charlotte Lewis', 'hc', 'daring-rebel'], ['The Golden Child', '', 'he', 'kid'],
      ['Sardo Numspa', 'Charles Dance', 'vs', 'dark-shadow'], ['Sardo\'s thugs', '', 've', 'henchman']]),
    M('Top Gun', 1986, 'action coldwar', 'A hotshot naval aviator competes for the top spot at the Navy\'s elite fighter weapons school.', [
      ['Maverick', 'Tom Cruise', 'hs', 'special-agent-80s'], ['Goose', 'Anthony Edwards', 'hc', 'loyal-sidekick'], ['Charlie Blackwood', 'Kelly McGillis', 'hc', 'quirky-investigator'],
      ['Iceman', 'Val Kilmer', 'nc', 'hardened-grunt-80s'], ['MiG pilots', '', 've', 'pilot-80s']]),
    M('Evil Dead II', 1987, 'horror fantasy frightmare', 'Trapped at the cabin again, Ash fights his possessed hand, a family of researchers and the forces of the Necronomicon.', [
      ['Ash', 'Bruce Campbell', 'hs', 'unlikely-interloper-80s'], ['Annie Knowby', 'Sarah Berry', 'hc', 'quirky-investigator'], ['The Kandarian demon', '', 'vs', 'dark-shadow'],
      ['Henrietta', '', 'vc', 'unstoppable-beast'], ['Deadites', '', 've', 'deadite-80s']]),
    M('Full Metal Jacket', 1987, 'historical action rebelstate', 'Marine recruits are broken by a brutal drill instructor and then sent into the Battle of Hue.', [
      ['Pvt. Joker', 'Matthew Modine', 'hs', 'unlikely-interloper-80s'], ['Animal Mother', 'Adam Baldwin', 'nc', 'hardened-grunt-80s'], ['Gunnery Sgt. Hartman', 'R. Lee Ermey', 'vs', 'stern-authoritarian-80s'],
      ['Pvt. Pyle', 'Vincent D\'Onofrio', 'vc', 'psycho-killer-80s'], ['The sniper', '', 've', 'sharpshooter'], ['Viet Cong', '', 've', 'jungle-fighter-80s']]),
    M('Good Morning, Vietnam', 1987, 'historical rebelstate', 'A motor-mouthed DJ shakes up Armed Forces Radio in Saigon in 1965.', [
      ['Adrian Cronauer', 'Robin Williams', 'hs', 'unlikely-interloper-80s'], ['Edward Garlick', 'Forest Whitaker', 'hc', 'loyal-sidekick'], ['Sgt. Maj. Dickerson', 'J.T. Walsh', 'vc', 'cruel-bully'],
      ['Lt. Steven Hauk', 'Bruno Kirby', 'vc', 'white-collar-80s']]),
    M('Hellraiser', 1987, 'horror frightmare', 'A man who opened a puzzle box escapes Hell, and his lover lures victims home to rebuild his body.', [
      ['Kirsty Cotton', 'Ashley Laurence', 'hs', 'innocent-soul'], ['Larry Cotton', 'Andrew Robinson', 'hc', 'everyman'], ['Pinhead', 'Doug Bradley', 'vs', 'dream-stalker-80s'],
      ['Julia', 'Clare Higgins', 'vc', 'psycho-killer-80s'], ['Frank Cotton', 'Sean Chapman', 'vc', 'unstoppable-beast'], ['Cenobites', '', 've', 'hellion-80s']]),
    M('Masters of the Universe', 1987, 'scifi fantasy silicondream', 'He-Man and his allies chase Skeletor\'s army to small-town America to recover the Cosmic Key.', [
      ['He-Man', 'Dolph Lundgren', 'hs', 'super-human-80s'], ['Teela', 'Chelsea Field', 'hc', 'daring-rebel'], ['Man-At-Arms', 'Jon Cypher', 'hc', 'hardened-grunt-80s'],
      ['Gwildor', 'Billy Barty', 'hc', 'practical-mechanic-80s'], ['Skeletor', 'Frank Langella', 'vs', 'legendary-paragon-80s'], ['Evil-Lyn', 'Meg Foster', 'vc', 'sinister-mystic'],
      ['Skeletor\'s troopers', '', 've', 'imperial-trooper']]),
    M('The Living Daylights', 1987, 'action coldwar', 'Bond helps a KGB general defect and is drawn into an arms deal between a Soviet renegade and an American dealer.', [
      ['James Bond', 'Timothy Dalton', 'hs', 'special-agent-80s'], ['Kara Milovy', 'Maryam d\'Abo', 'hc', 'everyman'], ['Kamran Shah', 'Art Malik', 'hc', 'hardened-grunt-80s'],
      ['Gen. Georgi Koskov', 'Jeroen Krabbé', 'vs', 'mastermind'], ['Brad Whitaker', 'Joe Don Baker', 'vs', 'warmonger'], ['Necros', 'Andreas Wisniewski', 'vc', 'red-right-hand'],
      ['KGB agents', '', 've', 'foreign-agent-80s']]),
    M('The Lost Boys', 1987, 'horror frightmare', 'Two brothers move to a California beach town and find the local gang of bikers are vampires.', [
      ['Sam Emerson', 'Corey Haim', 'hs', 'innocent-soul'], ['Michael Emerson', 'Jason Patric', 'hc', 'lost-boy-80s'], ['The Frog Brothers', '', 'hc', 'quirky-investigator'],
      ['Max', 'Edward Herrmann', 'vs', 'dark-shadow'], ['David', 'Kiefer Sutherland', 'vc', 'lost-boy-80s'], ['David\'s gang', '', 've', 'vampire']]),
    M('Wall Street', 1987, 'greedglamour', 'A young stockbroker becomes the protégé of a ruthless corporate raider and sells out his father\'s airline.', [
      ['Bud Fox', 'Charlie Sheen', 'hs', 'innocent-soul'], ['Carl Fox', 'Martin Sheen', 'hc', 'wise-mentor'], ['Darien Taylor', 'Daryl Hannah', 'nc', 'white-collar-80s'],
      ['Gordon Gekko', 'Michael Douglas', 'vs', 'bold-planner-80s'], ['Brokers', '', 'ne', 'yuppie-80s']]),
    M('Akira', 1988, 'scifi action rebelstate silicondream', 'In Neo-Tokyo, a biker gang leader must stop his best friend, whose psychic powers are growing out of control.', [
      ['Kaneda', 'Mitsuo Iwata', 'hs', 'loveable-scoundrel'], ['Kei', 'Mami Koyama', 'hc', 'daring-rebel'], ['Tetsuo', 'Nozomu Sasaki', 'ns', 'psychic-prodigy-80s'],
      ['Colonel Shikishima', 'Tarō Ishida', 'nc', 'hardened-grunt-80s'], ['The Clowns', '', 've', 'street-punk-80s'], ['Army soldiers', '', 'ne', 'soldier']]),
    M('Alien Nation', 1988, 'scifi action silicondream', 'An LA cop is partnered with the first alien detective after a shipload of refugees settles on Earth.', [
      ['Sgt. Matthew Sykes', 'James Caan', 'hs', 'grizzled-veteran'], ['Sam Francisco', 'Mandy Patinkin', 'hc', 'maverick-cop-80s'], ['William Harcourt', 'Terence Stamp', 'vs', 'kingpin'],
      ['Harcourt\'s thugs', '', 've', 'thug']]),
    M('Bloodsport', 1988, 'action coldwar hiredhelp', 'An American soldier goes AWOL to fight in the Kumite, a secret full-contact tournament in Hong Kong.', [
      ['Frank Dux', 'Jean-Claude Van Damme', 'hs', 'wonder-warrior-80s'], ['Ray Jackson', 'Donald Gibb', 'hc', 'loyal-sidekick'], ['Janice Kent', 'Leah Ayres', 'hc', 'quirky-investigator'],
      ['Chong Li', 'Bolo Yeung', 'vc', 'boss-monster-80s'], ['Army CID agents', '', 'ne', 'agent']]),
    M('Child\'s Play', 1988, 'horror frightmare', 'A strangled serial killer transfers his soul into a talking doll and goes after the boy who owns it.', [
      ['Karen Barclay', 'Catherine Hicks', 'hs', 'innocent-soul'], ['Det. Mike Norris', 'Chris Sarandon', 'hc', 'maverick-cop-80s'], ['Andy Barclay', 'Alex Vincent', 'he', 'kid'],
      ['Chucky', 'Brad Dourif', 'vs', 'dream-stalker-80s']]),
    M('Cocktail', 1988, 'greedglamour hiredhelp', 'An ambitious ex-soldier learns flair bartending from a cynical mentor and chases money from Manhattan to Jamaica.', [
      ['Brian Flanagan', 'Tom Cruise', 'hs', 'unlikely-interloper-80s'], ['Jordan Mooney', 'Elisabeth Shue', 'hc', 'everyman'], ['Doug Coughlin', 'Bryan Brown', 'nc', 'rogue-trader-80s'],
      ['Rich clientele', '', 'ne', 'yuppie-80s']]),
    M('Midnight Run', 1988, 'action hiredhelp', 'A bounty hunter must get a mob accountant from New York to LA in five days, with the FBI and the Mafia on their tail.', [
      ['Jack Walsh', 'Robert De Niro', 'hs', 'grizzled-veteran'], ['Jonathan Mardukas', 'Charles Grodin', 'hc', 'white-collar-80s'], ['Alonzo Mosely', 'Yaphet Kotto', 'nc', 'spy-catcher-80s'],
      ['Marvin Dorfler', 'John Ashton', 'nc', 'relentless-pursuer-80s'], ['Jimmy Serrano', 'Dennis Farina', 'vs', 'kingpin'], ['Serrano\'s hitmen', '', 've', 'assassin']]),
    M('Red Heat', 1988, 'action coldwar greedglamour', 'A Moscow police captain teams up with a wisecracking Chicago cop to catch a Georgian drug lord.', [
      ['Capt. Ivan Danko', 'Arnold Schwarzenegger', 'hs', 'grizzled-veteran'], ['Det. Art Ridzik', 'Jim Belushi', 'hc', 'maverick-cop-80s'], ['Viktor Rostavili', 'Ed O\'Ross', 'vs', 'kingpin'],
      ['The Cleanheads', '', 've', 'drug-runner-80s']]),
    M('Scrooged', 1988, 'fantasy frightmare greedglamour', 'A cold-hearted TV executive is visited by three ghosts on Christmas Eve.', [
      ['Frank Cross', 'Bill Murray', 'hs', 'millionaire-meddler-80s'], ['Claire Phillips', 'Karen Allen', 'hc', 'everyman'], ['The Ghost of Christmas Past', 'David Johansen', 'nc', 'incorporeal-advisor-80s'],
      ['The Ghost of Christmas Present', 'Carol Kane', 'nc', 'incorporeal-advisor-80s'], ['Brice Cummings', 'John Glover', 'vc', 'white-collar-80s']]),
    M('The Blob', 1988, 'horror scifi frightmare', 'A small-town rebel and a cheerleader fight a government-made organism that devours everything it touches.', [
      ['Meg Penny', 'Shawnee Smith', 'hs', 'innocent-soul'], ['Brian Flagg', 'Kevin Dillon', 'hc', 'brat-packer-80s'], ['The Blob', '', 'vs', 'horrific-thing-80s'],
      ['Dr. Meddows', 'Joe Seneca', 'vc', 'mad-scientist'], ['Government troops', '', 've', 'soldier']]),
    M('Willow', 1988, 'fantasy adventure', 'A farmer and would-be sorcerer must carry a baby prophesied to topple an evil queen across a war-torn land.', [
      ['Willow Ufgood', 'Warwick Davis', 'hs', 'innocent-soul'], ['Madmartigan', 'Val Kilmer', 'hc', 'mythic-champion'], ['Sorsha', 'Joanne Whalley', 'hc', 'daring-rebel'],
      ['Queen Bavmorda', 'Jean Marsh', 'vs', 'evil-overlord'], ['General Kael', 'Pat Roach', 'vc', 'ruthless-nemesis'], ['Nockmaar soldiers', '', 've', 'brutish-footsoldier']]),
    M('Working Girl', 1988, 'greedglamour', 'A Staten Island secretary takes over her scheming boss\'s deal while the boss is laid up with a broken leg.', [
      ['Tess McGill', 'Melanie Griffith', 'hs', 'innocent-soul'], ['Jack Trainer', 'Harrison Ford', 'hc', 'everyman'], ['Cyn', 'Joan Cusack', 'hc', 'loyal-sidekick'],
      ['Katharine Parker', 'Sigourney Weaver', 'vs', 'seductive-schemer-80s'], ['Wall Street executives', '', 'ne', 'executive-80s']]),
    M('Glory', 1989, 'historical action rebelstate', 'A young Union colonel leads the first all-Black volunteer regiment of the Civil War into battle.', [
      ['Col. Robert Gould Shaw', 'Matthew Broderick', 'hs', 'innocent-soul'], ['Pvt. Trip', 'Denzel Washington', 'hc', 'hardened-grunt-80s'], ['Sgt. Maj. Rawlins', 'Morgan Freeman', 'hc', 'wise-mentor'],
      ['54th Massachusetts', '', 'he', 'soldier'], ['Confederate soldiers', '', 've', 'soldier']]),
    M('Indiana Jones and the Last Crusade', 1989, 'adventure historical fantasy hiredhelp', 'Indy and his estranged father race the Nazis across Europe and the desert to find the Holy Grail.', [
      ['Indiana Jones', 'Harrison Ford', 'hs', 'intrepid-adventurer'], ['Henry Jones Sr.', 'Sean Connery', 'hc', 'wise-mentor'], ['Sallah', 'John Rhys-Davies', 'hc', 'loyal-sidekick'],
      ['Walter Donovan', 'Julian Glover', 'vs', 'mastermind'], ['Elsa Schneider', 'Alison Doody', 'vc', 'ruthless-nemesis'], ['Col. Vogel', 'Michael Byrne', 'vc', 'cruel-bully'],
      ['Nazi soldiers', '', 've', 'soldier']]),
    M('Kickboxer', 1989, 'action hiredhelp', 'A young American trains with a Thai master to avenge his brother, paralysed in the ring by a brutal champion.', [
      ['Kurt Sloane', 'Jean-Claude Van Damme', 'hs', 'wonder-warrior-80s'], ['Xian Chow', 'Dennis Chan', 'hc', 'wise-mentor'], ['Winston Taylor', 'Haskell Anderson', 'hc', 'loyal-sidekick'],
      ['Freddy Li', 'Ka Ting Lee', 'vs', 'kingpin'], ['Tong Po', 'Michel Qissi', 'vc', 'boss-monster-80s'], ['Freddy Li\'s thugs', '', 've', 'thug']]),
    M('Licence to Kill', 1989, 'action greedglamour hiredhelp', 'Bond resigns from MI6 to take revenge on a drug lord who maimed his friend Felix Leiter.', [
      ['James Bond', 'Timothy Dalton', 'hs', 'special-agent-80s'], ['Pam Bouvier', 'Carey Lowell', 'hc', 'daring-rebel'], ['Q', 'Desmond Llewelyn', 'hc', 'whiz-kid-80s'],
      ['Franz Sanchez', 'Robert Davi', 'vs', 'kingpin'], ['Dario', 'Benicio del Toro', 'vc', 'psycho-killer-80s'], ['Sanchez\'s men', '', 've', 'drug-runner-80s']]),
    M('Road House', 1989, 'action hiredhelp', 'A philosophical cooler is hired to clean up a rowdy Missouri bar and runs into the businessman who owns the town.', [
      ['Dalton', 'Patrick Swayze', 'hs', 'wonder-warrior-80s'], ['Wade Garrett', 'Sam Elliott', 'hc', 'hardened-grunt-80s'], ['Dr. Elizabeth Clay', 'Kelly Lynch', 'hc', 'everyman'],
      ['Brad Wesley', 'Ben Gazzara', 'vs', 'kingpin'], ['Jimmy Reno', 'Marshall Teague', 'vc', 'red-right-hand'], ['Wesley\'s goons', '', 've', 'thug']]),
    M('The \'Burbs', 1989, 'horror frightmare greedglamour', 'A suburban man on holiday at home becomes convinced his creepy new neighbours are murderers.', [
      ['Ray Peterson', 'Tom Hanks', 'hs', 'unlikely-interloper-80s'], ['Art Weingartner', 'Rick Ducommun', 'hc', 'loyal-sidekick'], ['Lt. Mark Rumsfield', 'Bruce Dern', 'nc', 'hardened-grunt-80s'],
      ['Dr. Werner Klopek', 'Henry Gibson', 'vc', 'mad-scientist']]),
    M('Arachnophobia', 1990, 'horror frightmare', 'A new town doctor with a fear of spiders faces a deadly South American spider breeding in his barn.', [
      ['Dr. Ross Jennings', 'Jeff Daniels', 'hs', 'unlikely-interloper-80s'], ['Molly Jennings', 'Harley Jane Kozak', 'hc', 'everyman'], ['Delbert McClintock', 'John Goodman', 'ne', 'pest-exterminator-80s'],
      ['The General', '', 'vs', 'great-monstrosity'], ['Spiders', '', 've', 'swarm']]),
    M('Goodfellas', 1990, 'action greedglamour', 'A Brooklyn kid grows up inside the Mafia, from teenage errand boy to cocaine-addled informant.', [
      ['Henry Hill', 'Ray Liotta', 'vc', 'career-criminal'], ['Jimmy Conway', 'Robert De Niro', 'vs', 'kingpin'], ['Tommy DeVito', 'Joe Pesci', 'vc', 'psycho-killer-80s'],
      ['Paulie Cicero', 'Paul Sorvino', 'vc', 'organised-criminal-80s'], ['The crew', '', 've', 'criminal-80s']]),
    M('Robin Hood: Prince of Thieves', 1991, 'historical adventure action rebelstate', 'Robin of Locksley returns from the Crusades to find his father dead and Nottingham under a tyrant sheriff.', [
      ['Robin Hood', 'Kevin Costner', 'hs', 'bold-blade'], ['Azeem', 'Morgan Freeman', 'hc', 'mythic-champion'], ['Maid Marian', 'Mary Elizabeth Mastrantonio', 'hc', 'daring-rebel'],
      ['The Merry Men', '', 'he', 'militia'], ['The Sheriff of Nottingham', 'Alan Rickman', 'vs', 'corrupt-authority'], ['Guy of Gisborne', 'Michael Wincott', 'vc', 'red-right-hand'],
      ['The Sheriff\'s soldiers', '', 've', 'soldier']]),
    M('The Rocketeer', 1991, 'adventure action historical silicondream', 'A stunt pilot finds a stolen rocket pack and is hunted by gangsters, the FBI and a Nazi spy posing as a movie star.', [
      ['Cliff Secord', 'Billy Campbell', 'hs', 'innocent-soul'], ['Peevy', 'Alan Arkin', 'hc', 'practical-mechanic-80s'], ['Jenny Blake', 'Jennifer Connelly', 'hc', 'everyman'],
      ['Neville Sinclair', 'Timothy Dalton', 'vs', 'seductive-schemer-80s'], ['Lothar', 'Tiny Ron', 'vc', 'unstoppable-beast'], ['Eddie Valentine\'s gang', '', 've', 'thug']]),
    M('The Last of the Mohicans', 1992, 'historical action adventure', 'A frontiersman raised by Mohicans escorts two British sisters through the French and Indian War.', [
      ['Hawkeye', 'Daniel Day-Lewis', 'hs', 'grizzled-veteran'], ['Cora Munro', 'Madeleine Stowe', 'hc', 'daring-rebel'], ['Chingachgook', 'Russell Means', 'hc', 'wise-mentor'],
      ['Magua', 'Wes Studi', 'vs', 'warmonger'], ['Huron warriors', '', 've', 'primal-warrior']]),
    M('Jurassic Park', 1993, 'scifi adventure horror silicondream frightmare', 'A billionaire\'s island theme park of cloned dinosaurs breaks down during a preview tour.', [
      ['Dr. Alan Grant', 'Sam Neill', 'hs', 'intrepid-adventurer'], ['Dr. Ellie Sattler', 'Laura Dern', 'hc', 'quirky-investigator'], ['Dr. Ian Malcolm', 'Jeff Goldblum', 'hc', 'everyman'],
      ['Robert Muldoon', 'Bob Peck', 'he', 'sharpshooter'], ['John Hammond', 'Richard Attenborough', 'ns', 'millionaire-meddler-80s'], ['Dennis Nedry', 'Wayne Knight', 'vc', 'career-criminal'],
      ['The T. rex', '', 'vs', 'great-monstrosity'], ['Velociraptors', '', 've', 'monster-of-the-week']]),
    M('Tombstone', 1993, 'historical action hiredhelp', 'Wyatt Earp tries to retire in Tombstone, Arizona, until the Cowboys gang forces him to pin on a badge.', [
      ['Wyatt Earp', 'Kurt Russell', 'hs', 'grizzled-veteran'], ['Doc Holliday', 'Val Kilmer', 'hc', 'loyal-sidekick'], ['Curly Bill Brocius', 'Powers Boothe', 'vs', 'kingpin'],
      ['Johnny Ringo', 'Michael Biehn', 'vc', 'ruthless-nemesis'], ['The Cowboys', '', 've', 'gunslinger']]),
    M('The Crow', 1994, 'action horror fantasy frightmare', 'A murdered rock musician rises from the grave a year later to hunt the gang that killed him and his fiancée.', [
      ['Eric Draven', 'Brandon Lee', 'hs', 'masked-crusader'], ['Sgt. Albrecht', 'Ernie Hudson', 'hc', 'maverick-cop-80s'], ['Top Dollar', 'Michael Wincott', 'vs', 'kingpin'],
      ['Myca', 'Bai Ling', 'vc', 'sinister-mystic'], ['T-Bird\'s gang', '', 've', 'thug']]),
    M('Braveheart', 1995, 'historical action rebelstate', 'William Wallace leads a Scottish rising against the English king who had his wife killed.', [
      ['William Wallace', 'Mel Gibson', 'hs', 'rebel-commander-80s'], ['Hamish', 'Brendan Gleeson', 'hc', 'loyal-sidekick'], ['Robert the Bruce', 'Angus Macfadyen', 'hc', 'mythic-champion'],
      ['Edward Longshanks', 'Patrick McGoohan', 'vs', 'corrupt-authority'], ['English soldiers', '', 've', 'soldier'], ['Highland clansmen', '', 'he', 'warrior']]),
    M('Ghost in the Shell', 1995, 'scifi action silicondream', 'A cyborg security agent hunts a hacker called the Puppet Master, who can hack into human minds.', [
      ['Major Motoko Kusanagi', 'Atsuko Tanaka', 'hs', 'cybernetic-organism-80s'], ['Batou', 'Akio Ōtsuka', 'hc', 'hardened-grunt-80s'], ['Section 9 agents', '', 'he', 'agent'],
      ['The Puppet Master', 'Iemasa Kayumi', 'vs', 'digital-avatar-80s'], ['Garbage man', '', 've', 'cyborg-assassin-sj']]),
    M('Heat', 1995, 'action greedglamour hiredhelp', 'An obsessive LAPD detective and a disciplined master thief circle each other across Los Angeles before one last score.', [
      ['Lt. Vincent Hanna', 'Al Pacino', 'hs', 'grizzled-veteran'], ['Neil McCauley', 'Robert De Niro', 'vs', 'bold-planner-80s'], ['Chris Shiherlis', 'Val Kilmer', 'vc', 'career-criminal'],
      ['Waingro', 'Kevin Gage', 'vc', 'psycho-killer-80s'], ['Robbery-Homicide detectives', '', 'he', 'plainclothes-cop-80s']]),
    M('Mortal Kombat', 1995, 'fantasy action silicondream', 'Earth\'s champions travel to a sorcerer\'s island for a tournament that decides the fate of the realm.', [
      ['Liu Kang', 'Robin Shou', 'hs', 'wonder-warrior-80s'], ['Sonya Blade', 'Bridgette Wilson', 'hc', 'daring-rebel'], ['Johnny Cage', 'Linden Ashby', 'hc', 'loyal-sidekick'],
      ['Raiden', 'Christopher Lambert', 'hc', 'wise-mentor'], ['Shang Tsung', 'Cary-Hiroyuki Tagawa', 'vs', 'dark-shadow'], ['Goro', '', 'vc', 'unstoppable-beast'],
      ['Scorpion and Sub-Zero', '', 've', 'ninja-80s']]),
    M('Austin Powers: International Man of Mystery', 1997, 'action adventure coldwar greedglamour', 'A swinging 60s spy is thawed out in the 90s to stop his old nemesis, Dr. Evil, from holding the world to ransom.', [
      ['Austin Powers', 'Mike Myers', 'hs', 'secret-agent'], ['Vanessa Kensington', 'Elizabeth Hurley', 'hc', 'daring-rebel'], ['Dr. Evil', 'Mike Myers', 'vs', 'mastermind'],
      ['Number Two', 'Robert Wagner', 'vc', 'red-right-hand'], ['Fembots', '', 've', 'killer-robot'], ['Evil henchmen', '', 've', 'henchman']]),
    M('Saving Private Ryan', 1998, 'historical action', 'After D-Day, a Ranger captain leads his squad behind German lines to find one paratrooper and send him home.', [
      ['Capt. John Miller', 'Tom Hanks', 'hs', 'grizzled-veteran'], ['Sgt. Mike Horvath', 'Tom Sizemore', 'hc', 'hardened-grunt-80s'], ['Pvt. Jackson', 'Barry Pepper', 'he', 'sharpshooter'],
      ['Pvt. James Ryan', 'Matt Damon', 'he', 'soldier'], ['German troops', '', 've', 'soldier']]),
    M('Galaxy Quest', 1999, 'scifi adventure silicondream', 'The washed-up cast of a cult space show are mistaken by real aliens for heroes and drafted into a war.', [
      ['Jason Nesmith', 'Tim Allen', 'hs', 'unlikely-interloper-80s'], ['Gwen DeMarco', 'Sigourney Weaver', 'hc', 'everyman'], ['Alexander Dane', 'Alan Rickman', 'hc', 'loyal-sidekick'],
      ['Thermians', '', 'ne', 'timid-alien-80s'], ['Sarris', 'Robin Sachs', 'vs', 'evil-overlord'], ['Sarris\'s soldiers', '', 've', 'alien-invader']]),
    M('Sleepy Hollow', 1999, 'horror historical fantasy frightmare', 'A New York constable who trusts only science investigates beheadings blamed on a headless horseman.', [
      ['Ichabod Crane', 'Johnny Depp', 'hs', 'unlikely-interloper-80s'], ['Katrina Van Tassel', 'Christina Ricci', 'hc', 'daring-rebel'], ['Young Masbath', 'Marc Pickering', 'he', 'kid'],
      ['Lady Van Tassel', 'Miranda Richardson', 'vs', 'dark-shadow'], ['The Headless Horseman', 'Christopher Walken', 'vc', 'unstoppable-beast']]),
    M('The 13th Warrior', 1999, 'historical fantasy horror action', 'An Arab envoy is drafted into a band of Norse warriors sent to fight a cannibal tribe that comes with the mist.', [
      ['Ahmad ibn Fadlan', 'Antonio Banderas', 'hs', 'unlikely-interloper-80s'], ['Buliwyf', 'Vladimir Kulich', 'hc', 'mythic-champion'], ['Herger', 'Dennis Störhoi', 'hc', 'loyal-sidekick'],
      ['The Mother of the Wendol', '', 'vs', 'dark-shadow'], ['The Wendol', '', 've', 'primal-warrior']]),
    M('Three Kings', 1999, 'historical action greedglamour hiredhelp', 'After the Gulf War, four US soldiers go after Saddam\'s stolen gold and end up protecting Iraqi rebels.', [
      ['Maj. Archie Gates', 'George Clooney', 'hs', 'grizzled-veteran'], ['Sgt. Troy Barlow', 'Mark Wahlberg', 'hc', 'hardened-grunt-80s'], ['Chief Elgin', 'Ice Cube', 'hc', 'loyal-sidekick'],
      ['Capt. Said', 'Saïd Taghmaoui', 'vc', 'cruel-bully'], ['Republican Guard', '', 've', 'soldier']]),
    M('American Psycho', 2000, 'horror greedglamour frightmare', 'A Wall Street investment banker leads a double life as a serial killer.', [
      ['Patrick Bateman', 'Christian Bale', 'vs', 'sadistic-slasher'], ['Det. Donald Kimball', 'Willem Dafoe', 'nc', 'private-investigator-80s'], ['Jean', 'Chloë Sevigny', 'he', 'secretary-80s'],
      ['Paul Allen and friends', '', 'ne', 'yuppie-80s']]),
    M('Crouching Tiger, Hidden Dragon', 2000, 'action fantasy historical', 'A legendary swordsman and a warrior woman chase a stolen sword and the young noblewoman secretly trained by a notorious thief.', [
      ['Li Mu Bai', 'Chow Yun-fat', 'hs', 'bold-blade'], ['Yu Shu Lien', 'Michelle Yeoh', 'hc', 'mythic-champion'], ['Jade Fox', 'Cheng Pei-pei', 'vs', 'mastermind'],
      ['Jen Yu', 'Zhang Ziyi', 'vc', 'ruthless-nemesis']]),
    M('Harry Potter and the Philosopher\'s Stone', 2001, 'fantasy adventure', 'An orphan learns on his eleventh birthday that he is a wizard, and starts at a school where a dark lord\'s servant is hiding.', [
      ['Harry Potter', 'Daniel Radcliffe', 'hs', 'innocent-soul'], ['Hermione Granger', 'Emma Watson', 'hc', 'whiz-kid-80s'], ['Ron Weasley', 'Rupert Grint', 'hc', 'loyal-sidekick'],
      ['Rubeus Hagrid', 'Robbie Coltrane', 'hc', 'wise-mentor'], ['Lord Voldemort', '', 'vs', 'evil-overlord'], ['Professor Quirrell', 'Ian Hart', 'vc', 'sinister-mystic'],
      ['Draco Malfoy', 'Tom Felton', 'vc', 'cruel-bully']]),
    M('Ocean\'s Eleven', 2001, 'action greedglamour hiredhelp', 'A charming ex-con assembles eleven specialists to rob three Las Vegas casinos owned by the man dating his ex-wife.', [
      ['Danny Ocean', 'George Clooney', 'hs', 'loveable-scoundrel'], ['Rusty Ryan', 'Brad Pitt', 'hc', 'ex-con-80s'], ['Linus Caldwell', 'Matt Damon', 'hc', 'loyal-sidekick'],
      ['Tess Ocean', 'Julia Roberts', 'hc', 'everyman'], ['Terry Benedict', 'Andy Garcia', 'vs', 'kingpin'], ['Casino security', '', 've', 'security-guard']]),
    M('Gangs of New York', 2002, 'historical action', 'A young Irish immigrant joins the gang of the nativist boss who killed his father in the Five Points.', [
      ['Amsterdam Vallon', 'Leonardo DiCaprio', 'hs', 'loveable-scoundrel'], ['Jenny Everdeane', 'Cameron Diaz', 'hc', 'daring-rebel'], ['Boss Tweed', 'Jim Broadbent', 'nc', 'white-collar-80s'],
      ['Bill the Butcher', 'Daniel Day-Lewis', 'vs', 'kingpin'], ['The Natives', '', 've', 'thug']]),
    M('Minority Report', 2002, 'scifi action silicondream rebelstate', 'A Precrime police chief is predicted to commit a murder and goes on the run to prove his innocence.', [
      ['John Anderton', 'Tom Cruise', 'hs', 'grizzled-veteran'], ['Agatha', 'Samantha Morton', 'ns', 'psychic-prodigy-80s'], ['Danny Witwer', 'Colin Farrell', 'nc', 'spy-catcher-80s'],
      ['Lamar Burgess', 'Max von Sydow', 'vs', 'corrupt-authority'], ['Precrime officers', '', 'ne', 'swat-officer-80s']]),
    M('The Last Samurai', 2003, 'historical action', 'A burned-out US Army captain hired to train Japan\'s new army is captured by the samurai he was sent to destroy.', [
      ['Nathan Algren', 'Tom Cruise', 'hs', 'grizzled-veteran'], ['Katsumoto', 'Ken Watanabe', 'hc', 'mythic-champion'], ['Samurai', '', 'he', 'warrior'],
      ['Omura', 'Masato Harada', 'vs', 'corrupt-authority'], ['Col. Bagley', 'Tony Goldwyn', 'vc', 'cruel-bully'], ['Imperial army', '', 've', 'soldier']]),
    M('National Treasure', 2004, 'adventure historical greedglamour', 'A treasure hunter steals the Declaration of Independence to keep the map on its back away from a rival.', [
      ['Ben Gates', 'Nicolas Cage', 'hs', 'intrepid-adventurer'], ['Riley Poole', 'Justin Bartha', 'hc', 'whiz-kid-80s'], ['Abigail Chase', 'Diane Kruger', 'hc', 'quirky-investigator'],
      ['Agent Sadusky', 'Harvey Keitel', 'nc', 'spy-catcher-80s'], ['Ian Howe', 'Sean Bean', 'vs', 'mastermind'], ['Howe\'s mercenaries', '', 've', 'mercenary']]),
    M('Shaun of the Dead', 2004, 'horror frightmare', 'A London slacker tries to win back his girlfriend and save his mum during a zombie apocalypse.', [
      ['Shaun', 'Simon Pegg', 'hs', 'unlikely-interloper-80s'], ['Ed', 'Nick Frost', 'hc', 'loyal-sidekick'], ['Liz', 'Kate Ashfield', 'hc', 'everyman'],
      ['Zombies', '', 've', 'zombie']]),
    M('Kingdom of Heaven', 2005, 'historical action', 'A French blacksmith becomes a knight and defends Jerusalem against Saladin\'s army.', [
      ['Balian', 'Orlando Bloom', 'hs', 'bold-blade'], ['Tiberias', 'Jeremy Irons', 'hc', 'wise-mentor'], ['Sibylla', 'Eva Green', 'hc', 'daring-rebel'],
      ['Saladin', 'Ghassan Massoud', 'ns', 'legendary-paragon-80s'], ['Guy de Lusignan', 'Marton Csokas', 'vs', 'corrupt-authority'], ['Reynald de Châtillon', 'Brendan Gleeson', 'vc', 'cruel-bully'],
      ['Crusader knights', '', 'ne', 'knight']]),
    M('Sin City', 2005, 'action horror greedglamour hiredhelp', 'Three stories of revenge and murder play out in the rain-soaked streets of Basin City.', [
      ['Hartigan', 'Bruce Willis', 'hs', 'grizzled-veteran'], ['Marv', 'Mickey Rourke', 'ns', 'raging-brute-80s'], ['Dwight', 'Clive Owen', 'hs', 'loveable-scoundrel'],
      ['Senator Roark', 'Powers Boothe', 'vs', 'corrupt-authority'], ['Kevin', 'Elijah Wood', 'vc', 'psycho-killer-80s'], ['Roark Junior', 'Nick Stahl', 'vc', 'cruel-bully']]),
    M('The Chronicles of Narnia: The Lion, the Witch and the Wardrobe', 2005, 'fantasy adventure', 'Four evacuee children step through a wardrobe into a frozen land and join a lion\'s war against the White Witch.', [
      ['Peter Pevensie', 'William Moseley', 'hs', 'innocent-soul'], ['Lucy Pevensie', 'Georgie Henley', 'hc', 'everyman'], ['Aslan', 'Liam Neeson', 'hc', 'mythic-champion'],
      ['Edmund Pevensie', 'Skandar Keynes', 'nc', 'brat-packer-80s'], ['The White Witch', 'Tilda Swinton', 'vs', 'evil-overlord'], ['The Witch\'s army', '', 've', 'brutish-footsoldier']]),
    M('The Descent', 2005, 'horror frightmare', 'Six friends exploring an uncharted cave system are trapped underground with blind, flesh-eating crawlers.', [
      ['Sarah', 'Shauna Macdonald', 'hs', 'unlikely-interloper-80s'], ['Juno', 'Natalie Mendoza', 'hc', 'daring-rebel'], ['Beth', 'Alex Reid', 'hc', 'everyman'],
      ['Crawlers', '', 've', 'mutant']]),
    M('V for Vendetta', 2006, 'action scifi rebelstate', 'A masked anarchist wages a one-man war on Britain\'s fascist regime, helped by a young woman he saves from the secret police.', [
      ['V', 'Hugo Weaving', 'hs', 'masked-crusader'], ['Evey Hammond', 'Natalie Portman', 'hc', 'daring-rebel'], ['Inspector Finch', 'Stephen Rea', 'nc', 'maverick-cop-80s'],
      ['Chancellor Sutler', 'John Hurt', 'vs', 'corrupt-authority'], ['Peter Creedy', 'Tim Pigott-Smith', 'vc', 'ruthless-nemesis'], ['Fingermen', '', 've', 'secret-police-80s']]),
    M('The Mist', 2007, 'horror scifi frightmare', 'Townsfolk trapped in a supermarket by a monster-filled mist turn on each other under a doomsday preacher.', [
      ['David Drayton', 'Thomas Jane', 'hs', 'unlikely-interloper-80s'], ['Amanda Dumfries', 'Laurie Holden', 'hc', 'everyman'], ['Ollie Weeks', 'Toby Jones', 'hc', 'loyal-sidekick'],
      ['Mrs. Carmody', 'Marcia Gay Harden', 'vc', 'sinister-mystic'], ['The Behemoth', '', 'vs', 'great-monstrosity'], ['Creatures in the mist', '', 've', 'swarm']]),
    M('Avatar', 2009, 'scifi action rebelstate', 'A paralysed marine in an alien body is sent to win over the Na\'vi, and switches sides.', [
      ['Jake Sully', 'Sam Worthington', 'hs', 'rebel-commander-80s'], ['Neytiri', 'Zoe Saldaña', 'hc', 'mythic-champion'], ['Dr. Grace Augustine', 'Sigourney Weaver', 'hc', 'quirky-investigator'],
      ['Na\'vi warriors', '', 'he', 'primal-warrior'], ['Col. Quaritch', 'Stephen Lang', 'vs', 'warmonger'], ['Parker Selfridge', 'Giovanni Ribisi', 'vc', 'white-collar-80s'],
      ['RDA mercenaries', '', 've', 'mercenary']]),
    M('The Book of Eli', 2010, 'scifi action rebelstate', 'A lone wanderer carries a book west across a post-apocalyptic America, and a town boss will kill to get it.', [
      ['Eli', 'Denzel Washington', 'hs', 'mysterious-stranger'], ['Solara', 'Mila Kunis', 'hc', 'daring-rebel'], ['Carnegie', 'Gary Oldman', 'vs', 'kingpin'],
      ['Redridge', 'Ray Stevenson', 'vc', 'red-right-hand'], ['Carnegie\'s gang', '', 've', 'raider']]),
    M('The Hunger Games', 2012, 'scifi action rebelstate', 'A girl from District 12 volunteers for a televised fight to the death to save her younger sister.', [
      ['Katniss Everdeen', 'Jennifer Lawrence', 'hs', 'innocent-soul'], ['Peeta Mellark', 'Josh Hutcherson', 'hc', 'everyman'], ['Haymitch Abernathy', 'Woody Harrelson', 'hc', 'wise-mentor'],
      ['President Snow', 'Donald Sutherland', 'vs', 'corrupt-authority'], ['Caesar Flickerman', 'Stanley Tucci', 'vs', 'darrin-killjoy-sj'], ['Cato', 'Alexander Ludwig', 'vc', 'ruthless-nemesis'],
      ['Peacekeepers', '', 've', 'secret-police-80s']]),
    M('Fury', 2014, 'historical action', 'A battle-hardened tank commander and his crew push into Germany in April 1945 in a Sherman called Fury.', [
      ['Don "Wardaddy" Collier', 'Brad Pitt', 'hs', 'grizzled-veteran'], ['Norman Ellison', 'Logan Lerman', 'hc', 'everyman'], ['Boyd "Bible" Swan', 'Shia LaBeouf', 'hc', 'hardened-grunt-80s'],
      ['SS battalion', '', 've', 'soldier']]),
    M('It', 2017, 'horror frightmare', 'A gang of misfit kids in 1989 Derry face a shape-shifting clown that feeds on fear.', [
      ['Bill Denbrough', 'Jaeden Martell', 'hs', 'innocent-soul'], ['Beverly Marsh', 'Sophia Lillis', 'hc', 'daring-rebel'], ['Richie Tozier', 'Finn Wolfhard', 'nc', 'brat-packer-80s'],
      ['Pennywise', 'Bill Skarsgård', 'vs', 'dream-stalker-80s'], ['Henry Bowers', 'Nicholas Hamilton', 'vc', 'cruel-bully']]),
    M('Tomb Raider', 2018, 'adventure action historical', 'Lara Croft goes looking for her missing father on a lost island and finds a paramilitary order hunting an ancient tomb.', [
      ['Lara Croft', 'Alicia Vikander', 'hs', 'intrepid-adventurer'], ['Lu Ren', 'Daniel Wu', 'hc', 'loyal-sidekick'], ['Lord Richard Croft', 'Dominic West', 'hc', 'wise-mentor'],
      ['Mathias Vogel', 'Walton Goggins', 'vs', 'warmonger'], ['Trinity mercenaries', '', 've', 'mercenary']]),
    M('Midsommar', 2019, 'horror historical frightmare', 'A grieving student joins her boyfriend\'s trip to a Swedish midsummer festival run by a pagan cult.', [
      ['Dani Ardor', 'Florence Pugh', 'hs', 'innocent-soul'], ['Christian', 'Jack Reynor', 'hc', 'everyman'], ['The Hårga elders', '', 'vs', 'dark-shadow'],
      ['Pelle', 'Vilhelm Blomgren', 'vc', 'sinister-mystic'], ['The Hårga', '', 've', 'cultist']]),
    M('All Quiet on the Western Front', 2022, 'historical action', 'A German teenager signs up in 1917 and learns what the trenches do to the young men sent into them.', [
      ['Paul Bäumer', 'Felix Kammerer', 'hs', 'innocent-soul'], ['Stanislaus "Kat" Katczinsky', 'Albrecht Schuch', 'hc', 'hardened-grunt-80s'], ['Gen. Friedrichs', 'Devid Striesow', 'vs', 'warmonger'],
      ['French infantry', '', 've', 'soldier']]),
    M('Uncharted', 2022, 'adventure action greedglamour hiredhelp', 'A young bartender and pickpocket teams up with a seasoned fortune hunter to find Magellan\'s lost gold.', [
      ['Nathan Drake', 'Tom Holland', 'hs', 'loveable-scoundrel'], ['Victor Sullivan', 'Mark Wahlberg', 'hc', 'rogue-trader-80s'], ['Chloe Frazer', 'Sophia Ali', 'hc', 'daring-rebel'],
      ['Santiago Moncada', 'Antonio Banderas', 'vs', 'millionaire-meddler-80s'], ['Braddock', 'Tati Gabrielle', 'vc', 'ruthless-nemesis'], ['Moncada\'s mercenaries', '', 've', 'mercenary']])
  ];
})();
