import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {Record<string, unknown>} */
const base = {
  breadcrumb: {
    autoexec: 'Autoexec',
    binds: 'Binds',
    config: 'Game config',
    crosshair: 'Crosshair',
    guides: 'Guides',
    recommended: 'Recommended',
  },
  home: {
    catalogs: {
      binds: 'Recommended binds',
      config: 'Recommended config',
    },
    catalogsSubtitle:
      'Start from MM-safe 2026 meta presets and keep only what you want.',
    catalogsTitle: 'Curated catalogs',
    console: {
      loaded: 'bindr.lol autoexec loaded',
      tagline: '   bindr.lol  -  browser CS2 config studio',
    },
    ctaAutoexec: 'Compose autoexec',
    ctaCrosshair: 'Start with crosshair',
    eyebrow: 'Counter-Strike 2 config studio',
    leadAfter: 'into your game folder. No downloads, no cheats.',
    leadBefore:
      'Build your crosshair, binds and game cvars in the browser, then copy console commands or drop one',
    steps: {
      customize: {
        detail:
          'Sliders, toggles and a visual keyboard — no syntax to memorize.',
        title: 'Customize',
      },
      export: {
        detail:
          'Copy the share code and console commands, or download one autoexec.cfg.',
        title: 'Export',
      },
      import: {
        detail: 'Paste a share code or start from MM-safe 2026 presets.',
        title: 'Import',
      },
      preview: {
        detail: 'Crosshairs render on real maps; cfg output updates live.',
        title: 'Preview',
      },
    },
    stepsTitle: 'How it works',
    tools: {
      autoexec: {
        cta: 'Compose cfg',
        description:
          'Merge crosshair, config and binds into one autoexec.cfg with per-section toggles.',
        title: 'Autoexec composer',
      },
      binds: {
        cta: 'Build binds',
        description:
          'Assign commands on a visual keyboard and export grouped bind lines or a ready-to-paste cfg.',
        title: 'Bind generator',
      },
      config: {
        cta: 'Tune cvars',
        description:
          'Dial in viewmodel, mouse, radar, network, audio, performance and HUD cvars with sliders.',
        title: 'Game config',
      },
      crosshair: {
        cta: 'Open editor',
        description:
          'Decode CS2 share codes (old CSGO- codes convert), tweak gap, color and style, preview on real maps, export the share code and console commands.',
        title: 'Crosshair editor',
      },
    },
    toolsSubtitle: 'Everything client-side',
    toolsTitle: 'Tools',
    values: {
      browser: {
        detail: 'Parse, preview and export without installing anything.',
        label: 'Browser-only',
      },
      local: {
        detail: 'Edits persist in your browser until cloud save ships.',
        label: 'Local-first',
      },
      mmSafe: {
        detail:
          'Binds and cvars follow current Valve rules — no banned scripts.',
        label: 'MM-safe defaults',
      },
    },
  },
  locale: { en: 'English', es: 'Español' },
  nav: {
    autoexec: {
      description: 'Merge crosshair, config and binds into one cfg.',
      label: 'Autoexec composer',
    },
    binds: {
      description: 'Assign commands on a visual keyboard, export cfg.',
      label: 'Bind generator',
    },
    bindsRecommended: {
      description: 'MM-safe 2026 meta bind templates.',
      label: 'Recommended binds',
    },
    catalogs: 'catalogs',
    config: {
      description: 'Viewmodel, mouse, radar, network, audio, HUD cvars.',
      label: 'Game config',
    },
    configRecommended: {
      description: 'Curated cvar bundles per section.',
      label: 'Recommended config',
    },
    crosshair: {
      description: 'Decode share codes, preview, export code and commands.',
      label: 'Crosshair editor',
    },
    editors: 'editors',
    footer: {
      autoexec: 'autoexec',
      binds: 'binds',
      bindsCatalog: 'binds catalog',
      config: 'config',
      configCatalog: 'config catalog',
      crosshair: 'crosshair',
      guides: 'guides',
    },
    footerAria: 'Footer',
    guides: 'guides',
    localeAria: 'Language',
  },
  pages: {
    autoexec: {
      description:
        'Merge your CS2 crosshair, config and binds into a single autoexec.cfg with per-section toggles and an ASCII banner, then copy or download it.',
      title: 'Autoexec composer',
    },
    binds: {
      description:
        'Build CS2 bind configs on a visual keyboard layout, then export grouped bind lines or a ready-to-paste cfg snippet.',
      title: 'Bind generator',
    },
    bindsRecommended: {
      description:
        'Curated MM-safe CS2 bind templates — grenade slots, knife, drop, lineup release, buy binds and radar toggles. Add individually or take the full set.',
      title: 'Recommended binds',
    },
    config: {
      description:
        'Tune CS2 viewmodel, mouse, radar, network, audio, performance and HUD cvars with sliders, then copy or download a cfg snippet.',
      title: 'Game config editor',
    },
    configRecommended: {
      description:
        'Curated CS2 client cvar bundles — viewmodel, mouse, radar, network, audio, performance and HUD. CS:GO leftovers stripped.',
      title: 'Recommended config',
    },
    crosshair: {
      description:
        'Import CS2 crosshair share codes, tweak gap, color and style, preview on real map backgrounds, and export the share code plus console commands.',
      title: 'Crosshair editor',
    },
    guides: {
      description:
        'Setup guides and tricks for getting the most out of your Counter-Strike 2 config, crosshair, binds and autoexec.',
      title: 'Guides',
    },
    home: {
      description:
        'Free browser tools for Counter-Strike 2: edit crosshairs, generate binds, tune cvars and build one autoexec.cfg. MM-safe, no download.',
      title: 'CS2 crosshair, binds & config tools',
    },
  },
  site: {
    description:
      'Free browser tools for Counter-Strike 2: edit crosshairs, generate binds, tune cvars and build one autoexec.cfg. MM-safe, no download.',
    disclaimer: 'Not affiliated with Valve Corporation.',
    tagline: 'CS2 crosshair, binds & config tools',
    themeHint: 'Press <kbd>t</kbd> for theme',
  },
};

const enExtra = {
  autoexec: {
    banner: 'Console banner',
    copy: 'Copy autoexec.cfg',
    download: 'Download autoexec.cfg',
    include: 'Include',
    includeDescription:
      'Pick which feature slices go into the file. Edit each one in its own tool.',
    preview: 'Preview',
    slices: {
      binds: {
        description: 'Key to command bindings, grouped by category.',
        label: 'Binds',
      },
      config: {
        description:
          'Viewmodel, mouse, radar, network, audio, performance, HUD.',
        label: 'Game config',
      },
      crosshair: {
        description: 'Console commands and the CS2 share code.',
        label: 'Crosshair',
      },
    },
    subtitle:
      'Merge crosshair, config and binds into one autoexec.cfg with an optional console banner.',
    title: 'Autoexec composer',
    toastCopied: 'autoexec.cfg copied',
    toastCopyFailed: 'Could not copy autoexec.cfg',
  },
  binds: {
    addAllDescription:
      'This replaces your entire bind config with the full recommended set. Any custom binds are removed.',
    addAllTitle: 'Add all recommended binds?',
    addBind: 'Add bind',
    assign: 'Assign bind',
    categories: {
      buy: 'Buy binds',
      comms: 'Communication',
      lineups: 'Smoke lineups',
      misc: 'HUD & toggles',
      movement: 'Movement',
      radar: 'Radar',
      utility: 'Grenades & utility',
      weapons: 'Weapons',
    },
    clearDescription:
      'This removes every bind from your config. Saved binds in local storage are cleared too.',
    clearTitle: 'Clear all binds?',
    commandLabel: 'Console command',
    copyCfg: 'Copy cfg',
    copyLines: 'Copy bind lines',
    downloadCfg: 'Download cfg',
    empty: 'No binds yet. Click a key and assign a command.',
    items: {
      'rec-build-info-toggle': {
        description:
          'Hide or show the version/build watermark in the bottom-left corner. Default is on; Valve asks for it in bug clips, so keep a key to bring it back.',
        label: 'Toggle build info text',
      },
      'rec-buy-awp': {
        description: 'AWP with armor and a couple of nades.',
        label: 'AWP buy',
      },
      'rec-buy-force': {
        description: 'Light armor, cheap rifle and two nades for eco breaks.',
        label: 'Force buy',
      },
      'rec-buy-full': {
        description:
          'Rifle, armor, full utility and defuser. Wrong-team weapons are ignored, so it works on T and CT. `buy m4a1` is the M4A4.',
        label: 'Full buy',
      },
      'rec-buy-pistol': {
        description: 'Deagle, full armor and a flash for anti-eco rounds.',
        label: 'Pistol + armor',
      },
      'rec-decoy': {
        description: 'Decoy grenade. CS2 slot 9.',
        label: 'Decoy',
      },
      'rec-drop': {
        description:
          'Drops whatever you are holding. Select the bomb first to drop C4.',
        label: 'Drop item',
      },
      'rec-flash': {
        description:
          'Instant flash. CS2 slot 7 — sits under WASD on Z/X/C row.',
        label: 'Flashbang',
      },
      'rec-fps-toggle': {
        description: 'Show or hide the FPS overlay on demand.',
        label: 'Toggle FPS counter',
      },
      'rec-hand-toggle': {
        description:
          'CS2 hand swap. H is the default bind. Persistent preference is `cl_prefer_lefthanded` in config — `cl_righthand` is gone.',
        label: 'Swap weapon hand',
      },
      'rec-he': {
        description: 'Instant HE. CS2 slot 6.',
        label: 'HE grenade',
      },
      'rec-inspect': {
        description: 'Hold to inspect the equipped weapon or knife.',
        label: 'Inspect weapon',
      },
      'rec-knife': {
        description: 'Fast knife for movement and bhops without scrolling.',
        label: 'Quick knife',
      },
      'rec-lineup-release': {
        description:
          'Press with Space at jump peak for consistent smoke lineups. Single-action bind — safe on Valve MM.',
        label: 'Lineup release',
      },
      'rec-molotov': {
        description:
          'Fire grenade on one key. Slot 10 (T molotov / CT incendiary).',
        label: 'Molotov / Incendiary',
      },
      'rec-mwheel-jump': {
        description:
          'Bind jump to scroll for more consistent bunny hops. Single action — Valve MM safe.',
        label: 'Mouse-wheel jump',
      },
      'rec-ptt': {
        description: 'Hold to talk on team voice without toggling open mic.',
        label: 'Push-to-talk',
      },
      'rec-radar-hud': {
        description: 'Step minimap HUD scale during a match.',
        label: 'Radar HUD size',
      },
      'rec-radar-zoom': {
        description:
          'Cycle radar zoom (0.25–1.0) to see more or less of the map.',
        label: 'Radar zoom',
      },
      'rec-smoke': {
        description:
          'Instant smoke without the scroll wheel. CS2 slot 8 — most-used execute bind.',
        label: 'Smoke',
      },
    },
    navAria: 'Bind generator sections',
    recommendedSubtitle:
      'MM-safe starter set. Add one at a time or replace your whole bind config.',
    recommendedTitle: 'Recommended binds',
    sections: {
      active: 'Active binds',
      command: 'Command',
      export: 'Export',
      keyboard: 'Keyboard',
    },
    selectKey: 'Select a key on the keyboard first.',
    subtitle:
      'Click a key, type a console command, and export bind lines or a cfg snippet.',
    title: 'Bind generator',
    toastCfg: 'CFG snippet copied',
    toastLines: 'Bind lines copied',
  },
  common: {
    add: 'Add',
    addAll: 'Add all',
    addAllCount: 'Add all ({count})',
    added: 'Added',
    cancel: 'Cancel',
    clearAll: 'Clear all',
    confirm: 'Confirm',
    copy: 'Copy',
    copyBoth: 'Copy both',
    copyFailed: 'Could not copy to clipboard',
    custom: 'Custom',
    download: 'Download',
    editor: 'Editor',
    import: 'Import',
    keys: {
      alt: 'Alt',
      backspace: 'Backspace',
      capslock: 'Caps',
      ctrl: 'Ctrl',
      enter: 'Enter',
      esc: 'Esc',
      ralt: 'Alt',
      rctrl: 'Ctrl',
      rshift: 'Shift',
      shift: 'Shift',
      space: 'Space',
      tab: 'Tab',
    },
    recommended: 'Recommended',
    remove: 'Remove',
    reset: 'Reset',
    source: 'Source: {source}',
    valveMm: 'Valve MM',
  },
  config: {
    addAllDescription:
      'This applies the full recommended cvar set and replaces conflicting values. You can still tweak anything afterward.',
    addAllRecommendedDescription:
      'This replaces your entire config with the full recommended set. Custom values and manual edits are removed.',
    addAllRecommendedTitle: 'Add all recommended config?',
    addAllTitle: 'Add all recommended config?',
    addConfig: 'Add config',
    alwaysCentered: 'Always centered',
    alwaysCenteredDescription:
      'cl_radar_always_centered — off shows more of the map.',
    alwaysLoadout: 'Always show loadout',
    alwaysLoadoutDescription:
      'cl_showloadout — always show the weapon loadout panel.',
    autoHelp: 'Auto-help',
    autoHelpDescription: 'cl_autohelp — automatic hint messages.',
    bombBeep: 'Bomb timer beep',
    buffer0: '0 (default, lowest delay)',
    buffer1: '1 (mild jitter)',
    buffer2: '2 (lossy connection)',
    bufferTicks: 'Buffer ticks',
    bufferTicksDescription:
      'cl_net_buffer_ticks — extra snapshot delay. This is what actually drives interp in CS2. Do not set cl_interp or cl_cmdrate.',
    buildInfo: 'Show build info',
    buildInfoDescription:
      'r_show_build_info — version/debug overlay in the corner.',
    categories: {
      audio: 'Audio',
      hud: 'HUD & UI',
      mouse: 'Mouse & sensitivity',
      network: 'Network',
      performance: 'Performance & misc',
      radar: 'Radar & minimap',
      viewmodel: 'Viewmodel',
    },
    colorAqua: 'Aqua',
    colorBlue: 'Blue',
    colorBrightWhite: 'Bright white',
    colorGreen: 'Green',
    colorLightBlue: 'Light blue',
    colorOrange: 'Orange',
    colorPink: 'Pink',
    colorPurple: 'Purple',
    colorRed: 'Red',
    colorTeam: 'Team color',
    colorTeammate: 'Teammate color',
    colorWhite: 'White',
    colorYellow: 'Yellow',
    copyCfg: 'Copy cfg',
    downloadCfg: 'Download cfg',
    fov: 'FOV',
    fpsCap: 'FPS cap (0 = unlimited)',
    hudColor: 'HUD color',
    hudColorDescription: 'cl_hud_color — HUD accent color.',
    hudRadarSize: 'HUD radar size',
    hudScale: 'HUD scale',
    instructor: 'Game instructor',
    instructorDescription: 'gameinstructor_enable — tutorial popups.',
    items: {
      'rec-audio-clean': {
        description:
          'Silences round/menu/MVP music, keeps the bomb timer beep, and tames teammate voice volume. Voice uses `snd_voipvolume` — `voice_scale` is gone.',
        label: 'Mute music, lower voice',
      },
      'rec-hud-classic-sniper-scope': {
        description:
          'Hides the Oct 2025 inaccuracy circle on AWP and SSG 08 — restores the old static overlay. Settings → Game → Sniper Sights → Show Scoped Sniper Rifle Inaccuracy → No.',
        label: 'Classic AWP/Scout scope',
      },
      'rec-hud-hide-build-info': {
        description:
          'Removes the version/debug overlay in the corner — cleaner competitive HUD.',
        label: 'Hide build info text',
      },
      'rec-hud-readable': {
        description:
          'Green accent, slightly smaller HUD, and teammate colors with letters.',
        label: 'Readable competitive HUD',
      },
      'rec-hud-teamid-fade': {
        description:
          'Max fade (1.0) when your crosshair is on a teammate — less name clutter in fights. 0 disables fade.',
        label: 'Fade teammate names at crosshair',
      },
      'rec-mouse-raw': {
        description:
          'Keep scoped sensitivity 1:1 with hip-fire. Raw input is always on in CS2 — `m_rawinput` is gone.',
        label: '1.0 zoom sensitivity ratio',
      },
      'rec-network-competitive': {
        description:
          'Unrestricted rate and zero extra buffer ticks — Valve’s low-latency default. `cl_cmdrate` / `cl_updaterate` / `cl_interp` do not exist as player settings in CS2.',
        label: 'Competitive network',
      },
      'rec-network-ping-cap': {
        description: 'Limits MM search to 80 ms.',
        label: 'Matchmaking ping cap (80)',
      },
      'rec-perf-fps': {
        description: 'Uncapped in-game FPS with 120 fps menu cap.',
        label: 'Uncapped FPS + UI cap',
      },
      'rec-perf-low-latency': {
        description:
          'Moves the Reflex/low-latency sleep after client sim. Pair with a real `fps_max`, not 0.',
        label: 'Engine low-latency sleep',
      },
      'rec-perf-no-clutter': {
        description: 'Turns off auto-help and the game instructor.',
        label: 'Disable help popups',
      },
      'rec-perf-no-tracers': {
        description: 'Less visual noise when spraying — common FPS tweak.',
        label: 'Hide first-person tracers',
      },
      'rec-radar-lineups': {
        description:
          'Zoomed-out minimap with larger HUD element — common execute setup.',
        label: 'Competitive radar (lineups)',
      },
      'rec-radar-pro': {
        description: 'Tighter zoom (0.35) with icon scaling.',
        label: 'Pro radar',
      },
      'rec-vm-valve': {
        description:
          'Stock viewmodel FOV and offsets — baseline before tweaking.',
        label: 'Valve default viewmodel',
      },
      'rec-vm-wide': {
        description:
          'Max FOV (68) with custom offsets. presetpos 0 unlocks the offsets — 1/2/3 override them.',
        label: 'Wide competitive viewmodel',
      },
    },
    leftHanded: 'Left-handed',
    leftHandedDescription:
      'cl_prefer_lefthanded — CS2 replacement for removed cl_righthand. switchhands still toggles mid-round.',
    lowLatency: 'Low-latency sleep',
    lowLatencyDescription:
      'engine_low_latency_sleep_after_client_tick — pair with a real fps_max, not 0.',
    masterVolume: 'Master volume',
    menuFpsCap: 'Menu FPS cap',
    minIconSize: 'Min icon size',
    musicVolume: 'Music volume (round/menu/MVP)',
    muteAltTab: 'Mute when alt-tabbed',
    muteAltTabDescription:
      'snd_mute_losefocus — mute the game when alt-tabbed.',
    navAria: 'Config sections',
    offsetX: 'Offset X',
    offsetY: 'Offset Y',
    offsetZ: 'Offset Z',
    pingCap: 'Matchmaking ping cap',
    preset: 'Preset',
    presets: {
      'valve-default': {
        description: 'Stock CS2 desktop viewmodel (presetpos 1).',
        label: 'Valve default',
      },
      'wide-competitive': {
        description:
          'Max FOV with custom offsets — presetpos 0 so the offsets stick.',
        label: 'Wide competitive',
      },
    },
    radarZoom: 'Radar zoom (cl_radar_scale)',
    rate: 'Rate',
    rate196608: '196608 (1.5 Mbps)',
    rate262144: '262144 (2 Mbps)',
    rate524288: '524288 (4 Mbps)',
    rate786432: '786432 (unrestricted)',
    rateDescription:
      'rate — max bytes/sec from the server. 786432 is Unrestricted in the menu.',
    recommendedSubtitle:
      'Curated cvar bundles. Add one at a time or apply the full set.',
    recommendedTitle: 'Recommended config',
    resetDescription:
      'This restores default cvars. Recommended patches and manual edits are cleared.',
    resetTitle: 'Reset config?',
    rotateRadar: 'Rotate radar',
    rotateRadarDescription:
      'cl_radar_rotate — rotate the radar with your view.',
    sectionNavAria: 'Config sections',
    sensitivity: 'Sensitivity',
    sniperInaccuracy: 'Show scoped sniper inaccuracy',
    sniperInaccuracyDescription:
      'cl_sniper_show_inaccuracy — moving spread circle on AWP/SSG 08. Off restores the classic overlay.',
    squareScoreboard: 'Square with scoreboard',
    squareScoreboardDescription:
      'cl_radar_square_with_scoreboard — square radar on scoreboard.',
    subtitle:
      'Tune viewmodel, mouse, radar, network, audio, performance and HUD, then export a cfg snippet.',
    teammateColors: 'Teammate colors',
    teammateColorsDescription:
      'cl_teammate_colors_show — teammate identification.',
    teammateColorsLetters: 'Colors + letters',
    teammateColorsOnly: 'Colors',
    teammateFade: 'Teammate name fade at crosshair',
    teammateOff: 'Off',
    title: 'Game config',
    toastCopied: 'Config cfg copied',
    tracers: 'First-person tracers',
    tracersDescription:
      'r_drawtracers_firstperson — first-person bullet tracers.',
    voiceVolume: 'Voice volume',
    zoomSensitivity: 'Zoom sensitivity ratio',
  },
  crosshair: {
    alpha: 'Alpha',
    centerDot: 'Center dot',
    color: 'Color',
    consoleCommands: 'Console commands',
    copyBothMenu: 'Share code + commands',
    copyCommands: 'Console commands',
    copyLink: 'Share link',
    copyShareCode: 'Share code',
    dotScale: 'Dot scale',
    followRecoil: 'Follow recoil',
    gap: 'Gap (px)',
    importDescription: '<code>CSGO-…</code> codes are converted automatically.',
    importLabel: 'Share code',
    importTitle: 'Import share code',
    innerSplitAlpha: 'Inner split alpha',
    length: 'Length (px)',
    mapAria: 'Preview map',
    maxSpread: 'Max spread (px)',
    outerSplitAlpha: 'Outer split alpha',
    outlineColor: 'Outline color',
    outlineFull: 'Full (1px around)',
    outlineHalf: 'Half (top & left only)',
    outlineMode: 'Outline',
    outlineOff: 'Off',
    previewAria: 'Crosshair preview',
    quadrantSize: 'Quadrant size',
    resetDescription:
      'This restores the default crosshair. Your current settings will be lost.',
    resetTitle: 'Reset crosshair?',
    screenHeight: 'Made for screen height',
    sections: {
      crosshair: 'Crosshair',
      dynamic: 'Dynamic',
      export: 'Export',
      exportDescription:
        'Share code for in-game settings, plus console commands for autoexec or the console.',
      outline: 'Outline',
      quadrant: 'Quadrant',
      resolution: 'Resolution',
      scopeDot: 'Scope dot',
      split: 'Split',
    },
    shareCode: 'Share code',
    shareCodeHintAfter: 'share dialog.',
    shareCodeHintBefore: 'Paste into the in-game',
    splitDistance: 'Split distance (px)',
    splitSizeRatio: 'Split size ratio',
    style: 'Style',
    styles: {
      0: {
        description: 'Cross that spreads with real weapon inaccuracy.',
        label: 'Dynamic Cross',
      },
      1: {
        description: 'Ring that grows with real weapon inaccuracy.',
        label: 'Dynamic Circle',
      },
      2: {
        description:
          'CS:GO-era dynamic cross with split arms and negative gaps.',
        label: 'Dynamic Cross (Classic)',
      },
      3: {
        description: 'Fixed ring around the center.',
        label: 'Static Circle',
      },
      4: {
        description: 'Fixed cross. Most common in pro configs.',
        label: 'Static Cross',
      },
      5: {
        description: 'Static cross that only reacts when firing.',
        label: 'Dynamic Cross (Legacy/Shot Feedback)',
      },
      6: {
        description: 'Just the center dot. Sized by thickness.',
        label: 'Dot Only',
      },
      7: {
        description: 'Four arcs that spread with inaccuracy. Game default.',
        label: 'Dynamic Quadrant',
      },
      8: {
        description: 'Fixed square around the center.',
        label: 'Static Square',
      },
      9: {
        description: 'Fixed ring split into four arcs. Arc size is adjustable.',
        label: 'Static Quadrant',
      },
    },
    subtitle:
      'Import a CS2 share code, tweak pixel-exact settings, then copy the share code, console commands, or both back into the game.',
    thickness: 'Thickness (px)',
    title: 'Crosshair editor',
    toastBothCopied: 'Share code and commands copied',
    toastCommandsCopied: 'Console commands copied',
    toastLinkCopied: 'Share link copied',
    toastShareCopied: 'Share code copied',
    tStyle: 'T-style',
    useCrosshairColor: 'Use crosshair color',
  },
  guides: {
    eyebrow: 'Guides',
    'share-config-across-accounts': {
      description:
        'Point CS2 at one cfg folder so your binds, crosshair and autoexec follow every Steam account.',
      title: 'Share one config across every CS2 account',
    },
    subtitle:
      "Walkthroughs for getting the most out of your CS2 config — things the in-game menu won't tell you.",
    title: 'Setup guides & tricks',
  },
};

/** @type {Record<string, unknown>} */
const es = {
  breadcrumb: {
    autoexec: 'Autoexec',
    binds: 'Binds',
    config: 'Config del juego',
    crosshair: 'Mira',
    guides: 'Guías',
    recommended: 'Recomendados',
  },
  home: {
    catalogs: {
      binds: 'Binds recomendados',
      config: 'Config recomendada',
    },
    catalogsSubtitle:
      'Parte de presets meta 2026 seguros para MM y quédate solo con lo que quieras.',
    catalogsTitle: 'Catálogos curados',
    console: {
      loaded: 'autoexec de bindr.lol cargado',
      tagline: '   bindr.lol  -  estudio de config CS2 en el navegador',
    },
    ctaAutoexec: 'Componer autoexec',
    ctaCrosshair: 'Empezar con la mira',
    eyebrow: 'Estudio de config para Counter-Strike 2',
    leadAfter: 'en la carpeta del juego. Sin descargas, sin cheats.',
    leadBefore:
      'Crea tu mira, binds y cvars del juego en el navegador; luego copia comandos de consola o deja un',
    steps: {
      customize: {
        detail:
          'Deslizadores, interruptores y un teclado visual — sin memorizar sintaxis.',
        title: 'Personalizar',
      },
      export: {
        detail:
          'Copia el share code y los comandos, o descarga un autoexec.cfg.',
        title: 'Exportar',
      },
      import: {
        detail: 'Pega un share code o parte de presets 2026 seguros para MM.',
        title: 'Importar',
      },
      preview: {
        detail:
          'Las miras se renderizan en mapas reales; el cfg se actualiza en vivo.',
        title: 'Previsualizar',
      },
    },
    stepsTitle: 'Cómo funciona',
    tools: {
      autoexec: {
        cta: 'Componer cfg',
        description:
          'Une mira, config y binds en un autoexec.cfg con interruptores por sección.',
        title: 'Compositor de autoexec',
      },
      binds: {
        cta: 'Crear binds',
        description:
          'Asigna comandos en un teclado visual y exporta líneas de bind agrupadas o un cfg listo para pegar.',
        title: 'Generador de binds',
      },
      config: {
        cta: 'Ajustar cvars',
        description:
          'Ajusta viewmodel, ratón, radar, red, audio, rendimiento y cvars de HUD con deslizadores.',
        title: 'Config del juego',
      },
      crosshair: {
        cta: 'Abrir editor',
        description:
          'Decodifica share codes de CS2 (los CSGO- antiguos se convierten), ajusta gap, color y estilo, previsualiza en mapas reales y exporta el código y los comandos.',
        title: 'Editor de mira',
      },
    },
    toolsSubtitle: 'Todo en el cliente',
    toolsTitle: 'Herramientas',
    values: {
      browser: {
        detail: 'Analiza, previsualiza y exporta sin instalar nada.',
        label: 'Solo navegador',
      },
      local: {
        detail:
          'Los cambios se guardan en tu navegador hasta que llegue el guardado en la nube.',
        label: 'Local primero',
      },
      mmSafe: {
        detail:
          'Binds y cvars siguen las reglas actuales de Valve — sin scripts prohibidos.',
        label: 'Defaults seguros para MM',
      },
    },
  },
  locale: { en: 'English', es: 'Español' },
  nav: {
    autoexec: {
      description: 'Une mira, config y binds en un solo cfg.',
      label: 'Compositor de autoexec',
    },
    binds: {
      description: 'Asigna comandos en un teclado visual y exporta el cfg.',
      label: 'Generador de binds',
    },
    bindsRecommended: {
      description: 'Plantillas meta 2026 seguras para MM.',
      label: 'Binds recomendados',
    },
    catalogs: 'catálogos',
    config: {
      description: 'Viewmodel, ratón, radar, red, audio y cvars de HUD.',
      label: 'Config del juego',
    },
    configRecommended: {
      description: 'Paquetes de cvars curados por sección.',
      label: 'Config recomendada',
    },
    crosshair: {
      description:
        'Decodifica share codes, previsualiza y exporta código y comandos.',
      label: 'Editor de mira',
    },
    editors: 'editores',
    footer: {
      autoexec: 'autoexec',
      binds: 'binds',
      bindsCatalog: 'catálogo binds',
      config: 'config',
      configCatalog: 'catálogo config',
      crosshair: 'mira',
      guides: 'guías',
    },
    footerAria: 'Pie de página',
    guides: 'guías',
    localeAria: 'Idioma',
  },
  pages: {
    autoexec: {
      description:
        'Une tu mira, config y binds de CS2 en un solo autoexec.cfg con interruptores por sección y banner ASCII; luego cópialo o descárgalo.',
      title: 'Compositor de autoexec',
    },
    binds: {
      description:
        'Crea configs de binds de CS2 en un teclado visual y exporta líneas agrupadas o un fragmento de cfg listo para pegar.',
      title: 'Generador de binds',
    },
    bindsRecommended: {
      description:
        'Plantillas de binds CS2 seguras para MM — granadas, cuchillo, drop, lineup, compra y radar. Añade una a una o coge el set completo.',
      title: 'Binds recomendados',
    },
    config: {
      description:
        'Ajusta viewmodel, ratón, radar, red, audio, rendimiento y cvars de HUD con deslizadores; luego copia o descarga un fragmento de cfg.',
      title: 'Editor de config',
    },
    configRecommended: {
      description:
        'Paquetes de cvars de cliente para CS2 — viewmodel, ratón, radar, red, audio, rendimiento y HUD. Sin restos de CS:GO.',
      title: 'Config recomendada',
    },
    crosshair: {
      description:
        'Importa share codes de mira de CS2, ajusta gap, color y estilo, previsualiza sobre mapas reales y exporta el código más los comandos de consola.',
      title: 'Editor de mira',
    },
    guides: {
      description:
        'Guías y trucos para sacar el máximo a tu config, mira, binds y autoexec de Counter-Strike 2.',
      title: 'Guías',
    },
    home: {
      description:
        'Herramientas gratis en el navegador para Counter-Strike 2: edita miras, genera binds, ajusta cvars y crea un autoexec.cfg. Seguro para MM, sin descargas.',
      title: 'Mira, binds y config para CS2',
    },
  },
  site: {
    description:
      'Herramientas gratis en el navegador para Counter-Strike 2: edita miras, genera binds, ajusta cvars y crea un autoexec.cfg. Seguro para MM, sin descargas.',
    disclaimer: 'No estamos afiliados a Valve Corporation.',
    tagline: 'Mira, binds y config para CS2',
    themeHint: 'Pulsa <kbd>t</kbd> para el tema',
  },
};

// Continue in part 2 - write esExtra similarly then merge
writeFileSync(
  join(root, 'messages', 'en.json'),
  `${JSON.stringify({ ...base, ...enExtra }, null, 2)}\n`
);

writeFileSync(join(root, 'scripts', '_en-extra.json'), JSON.stringify(enExtra));
writeFileSync(join(root, 'scripts', '_es-base.json'), JSON.stringify(es));
console.log('wrote en.json + partials');
