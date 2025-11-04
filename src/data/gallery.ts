export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  eventDate: string;
  description: string;
  cover: string;
  tags: string[];
  images: GalleryImage[];
};

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: 'annual-day-2024',
    title: 'Annual Day Showcase 2024',
    eventDate: '2024-02-14',
    description: 'Highlights from our cultural extravaganza with student-led performances and awards.',
    cover: '/images/gallery/annual-day-cover.svg',
    tags: ['Annual Day', 'Performing Arts'],
    images: [
      { src: '/images/gallery/annual-1.svg', alt: 'Students performing on stage', caption: 'Grade 5 fusion dance' },
      { src: '/images/gallery/annual-2.svg', alt: 'Parents cheering', caption: 'Parents applauding in the audience' },
      { src: '/images/gallery/annual-3.svg', alt: 'Award ceremony', caption: 'Leadership awards ceremony' }
    ]
  },
  {
    slug: 'sports-day-2024',
    title: 'Sports Day Finals 2024',
    eventDate: '2024-01-28',
    description: 'Athletes showcased teamwork and determination across track and field events.',
    cover: '/images/gallery/sports-day-cover.svg',
    tags: ['Sports Day', 'Athletics'],
    images: [
      { src: '/images/gallery/sports-1.svg', alt: 'Relay race', caption: 'House relay teams sprint to the finish' },
      { src: '/images/gallery/sports-2.svg', alt: 'Medal ceremony', caption: 'Students receiving medals from chief guest' }
    ]
  },
  {
    slug: 'science-fair-2024',
    title: 'Innovation Science Fair 2024',
    eventDate: '2023-12-10',
    description: 'Young scientists demonstrated robotics, sustainability models, and coding prototypes.',
    cover: '/images/gallery/science-fair-cover.svg',
    tags: ['Science Fair', 'STEM'],
    images: [
      { src: '/images/gallery/science-1.svg', alt: 'Robotics demo', caption: 'Robotics club presenting automated helper bot' },
      { src: '/images/gallery/science-2.svg', alt: 'Judges feedback', caption: 'Industry mentors sharing feedback with students' }
    ]
  }
];
