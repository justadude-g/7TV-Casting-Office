# 7TV Casting Office

A free, static web app for designing custom profile cards for **7TV 2nd Edition** by Crooked Dice. No installs, no accounts, no build step. Open `index.html` locally through a web server, or host the repo on GitHub Pages.

It replaces the 1st edition casting tool ([jorgerobles/7tv2](https://github.com/jorgerobles/7tv2)) with one built around the 2e card layout, including presence attacks and the Core and 80s genre sets.

## What it does

- **Both genre sets on the card.** The Genres panel shows the Core genres (Action, Adventure, Fantasy, Historical, Horror, Sci-Fi) on top and the 80s genres (Cold War, Frightmare, Greed & Glamour, Hired Help, Rebel State, Silicon Dream) below. Pick a row to make it the card's set, then light its genres. The other row previews the matching genres from the 80s guide's alignment table: Cold War is Action, Hired Help is Adventure, Greed & Glamour is Fantasy, Rebel State is Historical, Frightmare is Horror and Silicon Dream is Sci-Fi. Switching rows converts the lit genres with that table, and switching back restores them. The genre row on the card uses that set's six icons.
- **229 official baseline profiles.** Every Star, Co-Star, Extra and vehicle from the Core Rulebook and 80s Central Casting chapters, with stats, attacks (fight, shoot, presence), health, genres and the full back of the card. Pick one and customise it, or start from a blank profile of any type.
- **Official errata applied.** Grizzled Veteran's Quickdraw is Power Behind The Throne (passive), and Hardened Grunt (80s) has Military Training in place of the Unit Leader text printed on its card. Karl Perrotto of Crooked Dice confirmed both on 24 July 2026. The profile summary and the About page note the errata.
- **Browse archetypes by type.** The profile picker opens straight on the list, with a filter for both books, Core or 80s, and tabs for Stars, Co-Stars, Extras and vehicles, grouped by affiliation. A profile starts in its own book's genre set. Selecting a profile shows its summary: the example archetypes from the cast building tables (pp. 30-33), lit genres, description, colour-coded statistics and health, attacks, and the names of its star quality and special effects, next to a preview of the card. Click a profile to preview it, then press Select on its row or Select this profile in the bar along the bottom. Arrow keys move through the list; Enter or a double-click also selects.
- **Find by role.** Type a character idea into Find by role in the profile picker ("immoral capitalists", "vampires", "CEOs", "spy") and the picker lists every matching example role with the profile that plays it, such as Immoral Capitalists for Corrupt Authority. Roles come from the Cast Members tables: Core Rulebook pp. 30-33 and 80s book pp. 30-37, plus the examples on the cards. Extras and vehicles match by name. Click a role to open that profile's summary.
- **Light and dark mode.** Light is the default. The switch in the top bar remembers your choice.
- **Everything is editable.** Name, affiliation, profile type, the type label, ratings with an optional note ("or 5 for 3 models"), all six statistics or the four vehicle statistics, health pips, genres, every attack and every entry on the back.
- **Reset.** Reset statistics puts the statistics and health back to the starting profile (or the blank values for a blank card); the button is greyed out until something changes. Reset whole card restores the name, ratings, genres, statistics, attacks and back of the card, and keeps the portrait, badge and card look.
- **Strikes follow the statistics.** Each attack stores a modifier on top of its formula: fight is Fight + Body, shoot is Shoot, presence is Mind + Spirit. Raise Fight and every fight strike rises with it. Type a strike value to set the modifier, or type text (such as `+4*`) for a fixed value.
- **Attack tables.** Add any weapon from the fight and shoot tables (pp. 48-49), with genre limits shown.
- **Vehicles.** All 16 official vehicles (13 Core, 3 80s) are in the picker. A blank vehicle starts with the standard Vehicle special effect and an empty Stunts section, and the library has a tab with every effect and stunt from the official vehicles; stunts go straight into the Stunts section.
- **Special effects library.** The 59 effects Stars and Co-Stars may add or swap (pp. 40-46), plus every effect, star quality and stunt that appears on a profile in the current genre set. Typing a library name into a blank entry fills in its cost and text.
- **Customisation cost.** For Stars and Co-Stars started from a baseline profile, the app prices each change with the rules on pp. 38-47 and shows the breakdown: statistics (+1/-1, Defence +2), the genre swap (+1), special effect swaps (free, +1 per plot point) and additions or removals, Move and Magic User levels, plus attack swaps and additions. Tick Auto to keep the card's ratings in step. Rule limits (two statistics up, one genre swap, two effect swaps) appear as warnings, never blocks.
- **Card badge.** The round badge at the top left shows a small TV set in the card's colour. Upload your own image under Card look, either for one card or once for every card. The app trims plain margins, crops it to a circle and keeps it in your browser and your backup file. No logo artwork ships with the app.
- **Portraits.** Upload or drop an image, drag it on the card to move it, scroll or use the slider to zoom, mirror it. Cut-out PNGs with transparent backgrounds sit behind the stat boxes and attack table like the miniatures on the official cards.
- **Back text fits itself.** Star quality, special effects and stunts flow down two columns and shrink only when needed. You can also pick a fixed text size.
- **Call Sheet (cast builder).** Build casts from official profiles and your own cards. Mix Core and 80s profiles freely. Set the affiliation, ratings limit (with presets from 25 to 100) and the cast genre for the episode. The builder totals the ratings, including group prices such as "2, or 5 for 3", and counts Stars, Co-Stars, Extras, vehicles and models per genre. It checks the casting rules (pp. 21-25): heroic, villainous and neutral casts, Extras and vehicles sharing a genre with your Stars and Co-Stars (80s genres matched to Core ones through the alignment table), Unique profiles, and the ratings limit. Problems are flagged on each row, never blocked. Casts save in the browser, go into the backup file, and can be sent straight to the print sheet. On a phone, a bar along the bottom keeps the ratings total in view and flips between your cast and the list of profiles to add.
- **Units.** The Call Sheet's Units tab lists the 8 Core units (p. 37) and the 12 80s units (p. 29). Adding one puts the unit leader and a block of member slots into the cast, each with its maximum (1-6 Thugs, 1 Getaway Car), a picker for "or" choices (1 Jeep or Truck) and a ratings subtotal. Steppers stop at the most models the leader can activate; add extra models from Official profiles. Units count towards the cast total, genre and affiliation checks, and the print sheet.
- **Save, back up, print.** Cards save in your browser (IndexedDB). Export and import a JSON backup. Select cards to see a cast ratings total, set copies, and make a PDF of 63.5 x 88 mm cards in one of two layouts. Fold-over (the default) prints each front beside its back on a landscape page, four cards to a sheet, with CUT and FOLD marks: print one-sided, cut round each pair and fold. Nine-up prints nine fronts to a portrait page with optional mirrored back pages for double-sided printing. Both work on A4 or Letter, with optional crop marks. Single cards export as front, back, or front-and-back PNGs at 300 dpi.

- **Props and Maguffins.** The Props page designs Prop and Maguffin cards: name, item image (drag and zoom), play timing with its action symbol, cost in plot points, and effect text (Maguffins add a bold flavour paragraph). A Maguffin shows its image on both faces. Every Prop card shares one back: a drawn prop-store back, or your own image uploaded once and kept in this browser. Saved cards go into My Cards and print with the other cards.
- **Genres.** All twelve genres, Core and 80s, with their symbols, sub-genres and a short summary of each. Click a genre to filter the film list below. Film inspiration lists 100 films, 20 a decade from the 1980s to now (no superhero films), filterable by genre, decade and a search of titles, characters, actors and profiles. Open a film to see its main characters as 7TV cast members (John Matrix, Heroic Star; Bennett, Villainous Star) with a suggested official profile; click it to start a card named after the character.
- **Reference.** A quick reference for play: the 10 setup steps, the turn sequence, plot points, victory points, actions, defence and strike rolls, statistic tests and statuses, with Core Rulebook page numbers. It reads on screen in light or dark mode, on a phone or desktop, and Download the PDF gives two A4 landscape pages with embedded fonts for printing (`assets/7TV-Quick-Reference.pdf`). Each status shows its token icon (`assets/status/`), from the Statuses page of the Core Rulebook.
- **About.** Credits Crooked Dice, links to their shop for the official books, cards, miniatures and tokens, and links to this repository's Issues page for feedback.

## Feedback

Report a wrong stat, a layout glitch or an idea on the [Issues page](https://github.com/justadude-g/7TV/issues/new/choose). The templates ask for the profile name, where in the app it happened, and a screenshot.

## Text markup on the back

| Type | Result |
| --- | --- |
| `*Robot*` | italic, used for special effect and keyword references |
| `**Golden Age**` | bold, used for option names |
| `{PP}` | plot point symbol |
| `{F}` `{P}` `{S}` `{1}` | action symbols: free, passive, special, once per turn |
| `\*` | a literal asterisk |
| new line | new paragraph |

## Run it locally

Browsers block some canvas features on `file://` pages, so serve the folder:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Host it on GitHub Pages

In the repository settings, open **Pages**, set the source to **Deploy from a branch**, pick `main` and `/ (root)`, and save. The app appears at `https://<user>.github.io/<repo>/` a minute later.

## Project layout

```
index.html              app shell
css/                    fonts.css (self-hosted fonts), styles.css
js/card-render.js       canvas renderer; every position is in the LAYOUT object
js/app.js               editor, wizard, library, My cards, print view
js/ratings.js           customisation pricing (pp. 38-47)
js/cast-rules.js        cast building rules and group pricing (pp. 21-25)
js/cast.js              Cast builder view
js/card-store.js        IndexedDB storage and JSON backup
js/print.js             PDF print sheets (jsPDF)
js/data/profiles.js     baseline profiles extracted from the Central Casting chapters
js/data/rules.js        genre sets, colours, statistics, attack tables, weapon effects
js/data/special-effects.js  customisation special effects list
js/data/units.js        units from Core p. 37 and 80s p. 29
js/data/roles.js        example roles for the 80s Stars and Co-Stars (80s pp. 30-37)
js/data/genres-info.js  genre sub-genres and summaries
js/data/movies.js       film inspiration for the Genres page
js/genres.js            Genres page
js/prop-render.js       Prop and Maguffin card renderer
js/props.js             Props page
assets/genres/          Core and 80s genre icons
assets/fonts/           League Gothic, Anton and PT Sans Narrow (SIL Open Font License)
test/                   Playwright checks
```

## Releasing an update

Run `npm run stamp` before committing. It adds a version to every CSS and JS link in `index.html`, so browsers (Safari in particular) load the new files instead of cached copies.

## Tests

```sh
npm install
npm start            # serves on port 8765 for the tests
npm test             # in a second terminal
```

`test/verify1.js` renders all 229 profiles and checks that each one fits and prices at zero change. `test/verify2.js` walks through the app: choosing a profile, editing stats, adding effects and attacks, a portrait, saving, reloading, the print preview, the PDF and the backup file. `test/verify3.js` checks cast pricing and the casting rules, then builds, prints and reloads a cast. `test/verify4.js` checks units, the find-by-role filter and the Reference tab. `test/verify5.js` checks the Genres page data and filters. `test/verify6.js` checks Prop and Maguffin cards.

## Fonts and artwork

League Gothic stands in for the Veneer headings on the official cards, Anton for the Veneer numbers, and PT Sans Narrow for Trade Gothic Condensed. The card frame, stat boxes, attack icons and the default TV badge are drawn in code. The genre icons are the 7TV genre symbols, and the status icons are the 7TV status tokens.

## Notice

This is an unofficial fan tool. 7TV is a trademark of Crooked Dice Game Design Studio. Profile data comes from the 7TV 2nd Edition rulebooks; buy them from Crooked Dice to play.

## Public and private builds

The 80s genre guide and the Steel Justice Feature Pack are paid material, so their profile cards live in `js/data/private/` and only ship in the private repository. Everything else, including the units, example roles, index and episode summaries, is shared.

To update the public site, clone the public repository next to this one and run:

```
node tools/publish-public.js ../7TV-public --push
```

The script copies every tracked file except `js/data/private/` and writes name-only stubs in their place (`js/data/profiles-stubs.js`: name, type, affiliation, ratings and lit genres, no stats, attacks, rules text or descriptions). It refuses to run if any 80s or Steel Justice card data is left in the copy, then commits and pushes.

In the public build the stubs never reach Casting: the picker shows Core only, and no stub can be opened, edited or printed. The Call Sheet lists them with a "Card not included" tag, so players who own the books can still build and cost their casts. The Genres page names them without a link.

