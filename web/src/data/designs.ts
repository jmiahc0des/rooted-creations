export type DesignTheme = 'spurs' | 'sa' | 'texas' | 'hispanic';

export type Design = {
  id: string;
  slug: string;
  name: string;
  /** Absolute path under /public (no basePath; consumers should pass to asset()). */
  image: string;
  caption: string;
  theme?: DesignTheme;
};

export const designs: Design[] = [
  { id: 'd01', slug: 'spurs-palm',          name: 'Spurs × Palm Trees',  image: '/images/designs/spurs-palm.png',          caption: 'Sunset Spurs',                          theme: 'spurs' },
  { id: 'd02', slug: 'shes-from-texas',     name: "She's from Texas",    image: '/images/designs/shes-from-texas.png',     caption: 'I can tell.',                           theme: 'texas' },
  { id: 'd03', slug: 'crazy-hispanic-fan',  name: 'Crazy Hispanic Fan',  image: '/images/designs/crazy-hispanic-fan.png',  caption: 'Papel picado + Spurs',                  theme: 'hispanic' },
  { id: 'd04', slug: 'icon-set',            name: 'Icon Set',            image: '/images/designs/icon-set.png',            caption: 'Fox · Alien · Castle · Harp' },
  { id: 'd05', slug: 'wemby-alien',         name: 'Wemby Alien',         image: '/images/designs/wemby-alien.png',         caption: '#1 from the cosmos',                    theme: 'spurs' },
  { id: 'd06', slug: 'nombre-shut-up',      name: 'Nombre, Shut Up',     image: '/images/designs/nombre-shut-up.png',      caption: 'Go Spurs Go.',                          theme: 'spurs' },
  { id: 'd07', slug: 'elbows-up',           name: 'Elbows Up San Anto',  image: '/images/designs/elbows-up.png',           caption: 'Coyote graffiti',                       theme: 'sa' },
  { id: 'd08', slug: 'the-coyote',          name: 'The Coyote',          image: '/images/designs/the-coyote.png',          caption: 'Mascot tag',                            theme: 'sa' },
  { id: 'd09', slug: 'spurs-snoopy',        name: 'Spurs × Snoopy',      image: '/images/designs/spurs-snoopy.png',        caption: 'Crossover edition',                     theme: 'spurs' },
  { id: 'd10', slug: 'wembanyama-2023',     name: 'Wembanyama · Since 2023', image: '/images/designs/wembanyama-2023.png', caption: 'Retro wave',                           theme: 'spurs' },
  { id: 'd11', slug: 'spurs-boots',         name: 'Spurs Boots',         image: '/images/designs/spurs-boots.png',         caption: 'Custom cowgirl illustration',           theme: 'texas' },
];
