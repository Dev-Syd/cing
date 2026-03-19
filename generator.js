// ── Name Component Data ──
// Each genre has syllable pools, prefixes, suffixes, and flavor patterns
// that get mixed together based on user inputs.

const DATA = {
    fantasy: {
        prefixes: ['Ara', 'Thal', 'Eld', 'Gal', 'Mor', 'Sil', 'Fen', 'Dra', 'Lor', 'Val', 'Ath', 'Cel', 'Nym', 'Ori', 'Zan'],
        middles: ['ad', 'or', 'in', 'ar', 'el', 'an', 'ir', 'on', 'eth', 'al', 'un', 'is', 'yr', 'ae'],
        suffixes: ['ion', 'iel', 'orn', 'wen', 'dor', 'mir', 'thas', 'ris', 'grim', 'vyn', 'riel', 'dur', 'aine', 'orin', 'iel'],
        titles: ['the Wise', 'the Bold', 'Shadowmane', 'Brightforge', 'Stormborn', 'Ironhand', 'Nightwhisper', 'Flameheart', 'Dawnbringer', 'Starweaver']
    },
    scifi: {
        prefixes: ['Zyx', 'Kael', 'Nex', 'Vor', 'Ry', 'Axi', 'Cyr', 'Pho', 'Xen', 'Jax', 'Qor', 'Vy', 'Tez', 'Ari', 'Zho'],
        middles: ['an', 'ix', 'os', 'ar', 'on', 'ev', 'ul', 'az', 'ek', 'or', 'is', 'yn'],
        suffixes: ['tron', 'ius', 'ex', 'ara', 'ion', 'ax', 'is', 'ux', 'enn', 'ova', 'yx', 'ari', 'eon', 'alis'],
        titles: ['Prime', 'of Sector 7', 'the Navigator', 'Zero', 'Nova', 'Unit-X', 'the Synthetic', 'Voidwalker', 'the Architect', 'Lightspeed']
    },
    cyberpunk: {
        prefixes: ['Neon', 'Gl1', 'Raz', 'Bl4', 'Hex', 'Zer0', 'Chr', 'Pix', 'Sw1', 'Rk', 'Vex', 'D4t', 'Sk8', 'Cr0', 'Syn'],
        middles: ['tch', 'x', 'zz', 'rk', 'ft', 'ck', 'sh', 'nd', 'ke', 'r0'],
        suffixes: ['wire', 'jack', 'punk', 'byte', 'crash', 'burn', 'spike', 'edge', 'ghost', 'shade', 'glitch', 'chrome'],
        titles: ['the Hacker', 'Blackout', 'NetRunner', 'the Ghost', 'Chrome', 'Wired', 'the Fixer', 'Flatline', 'the Ripper', '404']
    },
    steampunk: {
        prefixes: ['Cog', 'Bras', 'Wick', 'Ash', 'Pip', 'Gear', 'Flint', 'Rust', 'Cob', 'Boil', 'Tin', 'Smog', 'Ratch', 'Soot', 'Valve'],
        middles: ['worth', 'er', 'ing', 'ley', 'ton', 'wick', 'ber', 'ford', 'mond', 'ston'],
        suffixes: ['sworth', 'bottom', 'well', 'gear', 'spring', 'croft', 'wright', 'wick', 'lock', 'brass', 'ton', 'mill'],
        titles: ['the Inventor', 'Gearmaster', 'Steamwright', 'Clockwork', 'the Tinkerer', 'Ironcoil', 'the Machinist', 'Brasshand', 'the Engineer', 'Coppertop']
    },
    horror: {
        prefixes: ['Mor', 'Dre', 'Nox', 'Gri', 'Sha', 'Rav', 'Mal', 'Cor', 'Hel', 'Bane', 'Vex', 'Cru', 'Wraith', 'Phan', 'Scar'],
        middles: ['ak', 'ul', 'os', 'av', 'eth', 'orn', 'ig', 'an', 'ur', 'ax'],
        suffixes: ['lock', 'bane', 'shade', 'moor', 'grave', 'thorn', 'fang', 'blood', 'mort', 'ghast', 'crypt', 'veil'],
        titles: ['the Undying', 'Hollowborn', 'the Pale', 'Nightcrawler', 'of the Abyss', 'the Forsaken', 'Dreadlord', 'Bonechewer', 'the Whisperer', 'the Damned']
    },
    mythology: {
        prefixes: ['Aur', 'Hel', 'Pyr', 'Thy', 'Nym', 'Ach', 'Per', 'Cal', 'Ath', 'Ori', 'Bal', 'Tyr', 'Fre', 'Idr', 'Anu'],
        middles: ['io', 'ae', 'os', 'is', 'ys', 'on', 'an', 'eus', 'ias', 'al'],
        suffixes: ['eus', 'ira', 'onas', 'aia', 'ius', 'ene', 'ora', 'andros', 'adia', 'yllis', 'acles', 'ithea'],
        titles: ['the Eternal', 'Godslayer', 'the Titan', 'Sunforged', 'the Oracle', 'Thunderborn', 'the Fateweaver', 'of the Pantheon', 'Skyrender', 'the Blessed']
    },
    superhero: {
        prefixes: ['Max', 'Blaze', 'Storm', 'Nova', 'Bolt', 'Steel', 'Shadow', 'Viper', 'Titan', 'Pulse', 'Apex', 'Zen', 'Flux', 'Onyx', 'Echo'],
        middles: ['a', 'o', 'i', 'er', 'ar', 'ix', 'us', 'on', 'en'],
        suffixes: ['hawk', 'strike', 'fury', 'force', 'star', 'fist', 'blade', 'wing', 'shield', 'fire', 'surge', 'bolt'],
        titles: ['the Invincible', 'the Vigilante', 'Omega', 'Prime', 'Ultra', 'the Sentinel', 'the Destroyer', 'the Protector', 'the Avenger', 'Supreme']
    },
    western: {
        prefixes: ['Dust', 'Buck', 'Colt', 'Spur', 'Red', 'Slim', 'Wild', 'Gun', 'Iron', 'Sher', 'Clay', 'Wyatt', 'Hank', 'Jeb', 'Boon'],
        middles: ['e', 'y', 'ie', 'o', 'ey', 'ton', 'son', 'en', 'er'],
        suffixes: ['wood', 'ridge', 'stone', 'creek', 'field', 'horn', 'draw', 'ford', 'well', 'dale', 'canyon', 'dust'],
        titles: ['the Kid', 'Dead-Eye', 'Quickdraw', 'the Outlaw', 'the Drifter', 'No-Name', 'the Marshal', 'Six-Shooter', 'the Ranger', 'Sundown']
    }
};

// Inspiration keywords that shift the name style
const INSPIRATION_MODIFIERS = {
    // Fantasy
    'tolkien': { prefixes: ['Eär', 'Gil', 'Glor', 'Tar', 'Cel', 'Fin'], suffixes: ['dil', 'fin', 'wen', 'nor', 'las', 'born'] },
    'lord of the rings': { prefixes: ['Eär', 'Gil', 'Glor', 'Tar', 'Cel', 'Fin'], suffixes: ['dil', 'fin', 'wen', 'nor', 'las', 'born'] },
    'lotr': { prefixes: ['Eär', 'Gil', 'Glor', 'Tar', 'Cel', 'Fin'], suffixes: ['dil', 'fin', 'wen', 'nor', 'las', 'born'] },
    'witcher': { prefixes: ['Ger', 'Yen', 'Tris', 'Dan', 'Viz', 'Reg'], suffixes: ['alt', 'efer', 'imir', 'ard', 'gon', 'is'] },
    'elder scrolls': { prefixes: ['Dov', 'Mer', 'Dwe', 'Fal', 'Ald', 'Ash'], suffixes: ['mer', 'kiin', 'eri', 'duin', 'uin', 'ris'] },
    'skyrim': { prefixes: ['Dov', 'Ulf', 'Bjar', 'Hron', 'Frod', 'Gal'], suffixes: ['kiin', 'ric', 'gar', 'mund', 'mar', 'ald'] },
    'd&d': { prefixes: ['Driz', 'Vol', 'Min', 'Elmin', 'Tas', 'Rag'], suffixes: ['zt', 'thur', 'sc', 'ster', 'nar', 'nok'] },
    'dungeons': { prefixes: ['Driz', 'Vol', 'Min', 'Elmin', 'Tas', 'Rag'], suffixes: ['zt', 'thur', 'sc', 'ster', 'nar', 'nok'] },
    'game of thrones': { prefixes: ['Ae', 'Rha', 'Dae', 'Bra', 'Ty', 'Jon'], suffixes: ['gon', 'rys', 'eron', 'ndon', 'rion', 'arys'] },
    'got': { prefixes: ['Ae', 'Rha', 'Dae', 'Bra', 'Ty', 'Jon'], suffixes: ['gon', 'rys', 'eron', 'ndon', 'rion', 'arys'] },

    // Sci-fi
    'star wars': { prefixes: ['Obi', 'Mav', 'Ky', 'Ahso', 'Ree', 'Baz'], suffixes: ['lo', 'kan', 'ren', 'ka', 'wan', 'ine'] },
    'star trek': { prefixes: ['Th\'', 'Vor', 'T\'P', 'Dax', 'Wor', 'Saa'], suffixes: ['ok', 'rik', 'al', 'rax', 'rek', 'vik'] },
    'dune': { prefixes: ['Mua', 'Stil', 'Har', 'Cha', 'Fey', 'Let'], suffixes: ['dib', 'gar', 'onnen', 'ni', 'd', 'an'] },
    'mass effect': { prefixes: ['Gar', 'Tal', 'Lia', 'Tha', 'Mor', 'Wre'], suffixes: ['rus', 'i', 'ra', 'ne', 'din', 'ex'] },
    'halo': { prefixes: ['Cor', 'Ath', 'Spar', 'Rec', 'Arb', 'Hal'], suffixes: ['tana', 'ox', 'tan', 'laimer', 'iter', 'sey'] },
    'expanse': { prefixes: ['Hol', 'Nag', 'Bob', 'Cam', 'Dru', 'Ava'], suffixes: ['den', 'ata', 'bie', 'ina', 'mmer', 'ala'] },
    'foundation': { prefixes: ['Har', 'Sal', 'Bay', 'Gal', 'Mul', 'Dan'], suffixes: ['din', 'vor', 'ta', 'eel', 'le', 'eel'] },

    // Cyberpunk
    'blade runner': { prefixes: ['Dek', 'Roy', 'Rach', 'Pris', 'Zhora', 'Neo'], suffixes: ['ard', 'ael', 'el', 'is', 'a', 'x'] },
    'neuromancer': { prefixes: ['Cas', 'Mol', 'Arm', 'Win', 'Dix', 'Riv'], suffixes: ['e', 'ly', 'itage', 'termute', 'ie', 'iera'] },
    'matrix': { prefixes: ['Neo', 'Mor', 'Trin', 'Cy', 'Ser', 'Nir'], suffixes: ['o', 'pheus', 'ity', 'pher', 'aph', 'obe'] },

    // General modifiers
    'japanese': { prefixes: ['Ake', 'Hiro', 'Kat', 'Ren', 'Shi', 'Yuk'], suffixes: ['chi', 'shi', 'suna', 'to', 'ko', 'ra'] },
    'norse': { prefixes: ['Thor', 'Fen', 'Bald', 'Frey', 'Lok', 'Sig'], suffixes: ['ir', 'rir', 'ur', 'ja', 'i', 'mund'] },
    'celtic': { prefixes: ['Bri', 'Fia', 'Cael', 'Mor', 'Nia', 'Rhi'], suffixes: ['gid', 'nna', 'an', 'rigan', 'mh', 'annon'] },
    'arabic': { prefixes: ['Zah', 'Kal', 'Nas', 'Sal', 'Far', 'Has'], suffixes: ['ir', 'id', 'im', 'ah', 'rid', 'san'] },
    'african': { prefixes: ['Ama', 'Kwab', 'Oba', 'Chi', 'Zan', 'Ayo'], suffixes: ['ra', 'ena', 'femi', 'ndi', 'de', 'la'] }
};

// Trait modifiers — shift toward certain syllable sounds
const TRAIT_MODIFIERS = {
    'mysterious': { prefixes: ['Sha', 'Nyx', 'Umb', 'Veil'], suffixes: ['shade', 'mist', 'veil', 'shroud'] },
    'noble': { prefixes: ['Val', 'Rex', 'Cor', 'Aur'], suffixes: ['wyn', 'mund', 'heim', 'court'] },
    'dark': { prefixes: ['Mor', 'Nox', 'Dre', 'Mal'], suffixes: ['bane', 'mort', 'grave', 'void'] },
    'ancient': { prefixes: ['Arch', 'Prim', 'Eld', 'Aeon'], suffixes: ['born', 'root', 'stone', 'dust'] },
    'fierce': { prefixes: ['Rag', 'Gor', 'Blaz', 'Wrath'], suffixes: ['fang', 'claw', 'fury', 'maul'] },
    'wise': { prefixes: ['Sag', 'Lum', 'Ori', 'Eld'], suffixes: ['sage', 'lore', 'mind', 'sight'] },
    'wild': { prefixes: ['Fen', 'Bri', 'Thorn', 'Storm'], suffixes: ['wild', 'thorn', 'root', 'howl'] },
    'holy': { prefixes: ['Cel', 'Div', 'Hal', 'San'], suffixes: ['light', 'grace', 'hallow', 'dawn'] },
    'evil': { prefixes: ['Mal', 'Viz', 'Sar', 'Dae'], suffixes: ['doom', 'ruin', 'rot', 'scourge'] },
    'battle': { prefixes: ['War', 'Iron', 'Steel', 'Scar'], suffixes: ['blade', 'hammer', 'shield', 'strike'] },
    'elegant': { prefixes: ['Sil', 'Lyr', 'Aur', 'Cel'], suffixes: ['aire', 'wyn', 'elle', 'aine'] },
    'rogueish': { prefixes: ['Dex', 'Sly', 'Quick', 'Shade'], suffixes: ['step', 'hand', 'blade', 'fox'] }
};

// Category-specific name patterns
const CATEGORY_PATTERNS = {
    character: (parts) => parts.name,
    place: (parts) => {
        const placeWords = ['Haven', 'Reach', 'Hold', 'Keep', 'Spire', 'Hollow', 'Falls', 'Gate', 'Peak', 'Crossing', 'Watch', 'Citadel'];
        return parts.prefix + parts.middle + ' ' + pick(placeWords);
    },
    weapon: (parts) => {
        const weaponNames = ['Bane', 'Edge', 'Fury', 'Wrath', 'Fang', 'Sting', 'Doom', 'Bite', 'Reaver', 'Splitter', 'Piercer', 'Rend'];
        const materials = ['Shadow', 'Storm', 'Blood', 'Star', 'Void', 'Dawn', 'Frost', 'Soul', 'Iron', 'Crystal'];
        return pick(materials) + pick(weaponNames);
    },
    species: (parts) => {
        const speciesSuffixes = ['ari', 'kin', 'born', 'folk', 'idae', 'oni', 'ren', 'vai', 'zari', 'oth'];
        return parts.prefix + parts.middle + pick(speciesSuffixes);
    },
    ship: (parts) => {
        const shipPrefixes = ['HMS', 'SS', 'ISV', 'The', 'ARC', 'NSC'];
        const shipNames = ['Horizon', 'Tempest', 'Valiant', 'Serenity', 'Phoenix', 'Eclipse', 'Harbinger', 'Defiant', 'Nebula', 'Odyssey'];
        if (Math.random() > 0.5) {
            return pick(shipPrefixes) + ' ' + pick(shipNames);
        }
        return pick(shipPrefixes) + ' ' + parts.prefix + parts.suffix;
    },
    team: (parts) => {
        const teamFormats = [
            () => 'The ' + parts.prefix + parts.suffix + 's',
            () => 'Order of the ' + pick(['Iron', 'Silver', 'Shadow', 'Crimson', 'Azure', 'Ember']) + ' ' + pick(['Dawn', 'Flame', 'Shield', 'Crown', 'Star', 'Blade']),
            () => pick(['Brotherhood', 'Guild', 'Clan', 'Legion', 'Circle', 'Covenant']) + ' of ' + parts.prefix + parts.middle,
            () => pick(['The', '']) + ' ' + pick(['Black', 'Red', 'Phantom', 'Iron', 'Storm', 'Void']) + ' ' + pick(['Wolves', 'Hawks', 'Vipers', 'Ravens', 'Lions', 'Foxes', 'Dragons'])
        ];
        return pick(teamFormats)().trim();
    }
};

// ── Utilities ──

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Core Generator ──

function generateName(genre, category, inspirations, traits) {
    const data = DATA[genre];
    if (!data) return 'Unknown';

    // Build pools — start with base genre data then mix in modifiers
    let prefixPool = [...data.prefixes];
    let middlePool = [...data.middles];
    let suffixPool = [...data.suffixes];
    let titlePool = [...data.titles];

    // Mix in inspiration modifiers
    for (const insp of inspirations) {
        const key = insp.toLowerCase().trim();
        for (const [keyword, mod] of Object.entries(INSPIRATION_MODIFIERS)) {
            if (key.includes(keyword) || keyword.includes(key)) {
                if (mod.prefixes) prefixPool.push(...mod.prefixes, ...mod.prefixes); // weight them higher
                if (mod.suffixes) suffixPool.push(...mod.suffixes, ...mod.suffixes);
                if (mod.middles) middlePool.push(...mod.middles);
            }
        }
    }

    // Mix in trait modifiers
    for (const trait of traits) {
        const key = trait.toLowerCase().trim();
        for (const [keyword, mod] of Object.entries(TRAIT_MODIFIERS)) {
            if (key.includes(keyword) || keyword.includes(key)) {
                if (mod.prefixes) prefixPool.push(...mod.prefixes, ...mod.prefixes);
                if (mod.suffixes) suffixPool.push(...mod.suffixes, ...mod.suffixes);
            }
        }
    }

    const prefix = pick(prefixPool);
    const middle = pick(middlePool);
    const suffix = pick(suffixPool);
    const title = pick(titlePool);

    const parts = { prefix, middle, suffix, title, name: '' };

    // Build the base name with variety
    const patterns = [
        () => prefix + middle + suffix,
        () => prefix + suffix,
        () => prefix + middle,
        () => capitalize(middle) + suffix,
        () => prefix + middle + suffix + ' ' + title,
        () => prefix + suffix + ' ' + title
    ];

    parts.name = pick(patterns)();

    // Apply category pattern
    const formatter = CATEGORY_PATTERNS[category] || CATEGORY_PATTERNS.character;
    return formatter(parts);
}

function generateNames(count, genre, category, inspirations, traits) {
    const names = new Set();
    let attempts = 0;
    while (names.size < count && attempts < count * 5) {
        names.add(generateName(genre, category, inspirations, traits));
        attempts++;
    }
    return [...names];
}

// ── UI Logic ──

const countSlider = document.getElementById('count');
const countDisplay = document.getElementById('count-display');
const generateBtn = document.getElementById('generate-btn');
const resultsGrid = document.getElementById('results-grid');
const emptyState = document.getElementById('empty-state');
const favoritesList = document.getElementById('favorites-list');
const favCount = document.getElementById('fav-count');
const clearFavBtn = document.getElementById('clear-favorites');
const copyFavBtn = document.getElementById('copy-favorites');

let favorites = JSON.parse(localStorage.getItem('nameforge-favorites') || '[]');

countSlider.addEventListener('input', () => {
    countDisplay.textContent = countSlider.value;
});

generateBtn.addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const genre = document.getElementById('genre').value;
    const inspirationsRaw = document.getElementById('inspirations').value;
    const traitsRaw = document.getElementById('traits').value;

    const inspirations = inspirationsRaw ? inspirationsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    const traits = traitsRaw ? traitsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    const count = parseInt(countSlider.value);

    const names = generateNames(count, genre, category, inspirations, traits);
    renderResults(names);
});

function renderResults(names) {
    resultsGrid.innerHTML = '';
    emptyState.style.display = 'none';

    names.forEach((name, i) => {
        const card = document.createElement('div');
        card.className = 'name-card';
        card.style.animationDelay = `${i * 0.05}s`;

        const isFav = favorites.includes(name);

        card.innerHTML = `
            <span class="name-text">${escapeHtml(name)}</span>
            <span class="actions">
                <button class="copy-name-btn" title="Copy">&#128203;</button>
                <button class="fav-btn ${isFav ? 'active' : ''}" title="Save">${isFav ? '\u2605' : '\u2606'}</button>
            </span>
        `;

        card.querySelector('.copy-name-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(name);
            const btn = card.querySelector('.copy-name-btn');
            btn.textContent = '\u2713';
            setTimeout(() => btn.innerHTML = '&#128203;', 1000);
        });

        card.querySelector('.fav-btn').addEventListener('click', () => {
            toggleFavorite(name);
            const btn = card.querySelector('.fav-btn');
            const isFavNow = favorites.includes(name);
            btn.textContent = isFavNow ? '\u2605' : '\u2606';
            btn.classList.toggle('active', isFavNow);
        });

        resultsGrid.appendChild(card);
    });
}

function toggleFavorite(name) {
    const idx = favorites.indexOf(name);
    if (idx >= 0) {
        favorites.splice(idx, 1);
    } else {
        favorites.push(name);
    }
    saveFavorites();
    renderFavorites();
}

function saveFavorites() {
    localStorage.setItem('nameforge-favorites', JSON.stringify(favorites));
}

function renderFavorites() {
    favoritesList.innerHTML = '';
    favCount.textContent = favorites.length ? `(${favorites.length})` : '';
    clearFavBtn.style.display = favorites.length ? 'inline-block' : 'none';
    copyFavBtn.style.display = favorites.length ? 'inline-block' : 'none';

    favorites.forEach(name => {
        const tag = document.createElement('span');
        tag.className = 'fav-tag';
        tag.innerHTML = `${escapeHtml(name)} <span class="remove-fav">\u2715</span>`;
        tag.querySelector('.remove-fav').addEventListener('click', () => {
            toggleFavorite(name);
            // Also update any visible result cards
            document.querySelectorAll('.name-card').forEach(card => {
                const text = card.querySelector('.name-text').textContent;
                if (text === name) {
                    const btn = card.querySelector('.fav-btn');
                    btn.textContent = '\u2606';
                    btn.classList.remove('active');
                }
            });
        });
        favoritesList.appendChild(tag);
    });
}

clearFavBtn.addEventListener('click', () => {
    favorites = [];
    saveFavorites();
    renderFavorites();
    // Reset all star buttons
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.textContent = '\u2606';
        btn.classList.remove('active');
    });
});

copyFavBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(favorites.join('\n'));
    copyFavBtn.textContent = 'Copied!';
    setTimeout(() => copyFavBtn.textContent = 'Copy All to Clipboard', 1500);
});

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Initialize favorites display
renderFavorites();
