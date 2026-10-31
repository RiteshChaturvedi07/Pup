export interface Polaroid {
  id: number;
  caption: string;
  image: string;
  fallbackImage: string;
  alt: string;
  tilt: string;
  tapeColor: string;
  tapePos: 'left' | 'right' | 'center';
  delay: string;
  bgColor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  petName?: string;
  petBreed?: string;
}

export const MAIN_TESTIMONIAL: Testimonial = {
  id: '1225a1b4-d939-4516-8994-97add526093f',
  quote: 'TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.',
  author: 'Sarah M.',
  location: 'Dubai, UAE',
  petBreed: 'Maltipoo'
};

export const POLAROIDS: Polaroid[] = [
  {
    id: 1,
    caption: 'Maltipoo cuddles 🤍',
    image: '/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg',
    fallbackImage: '/media/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '-1.8deg',
    tapeColor: '#f6d79a',
    tapePos: 'left',
    delay: '0ms',
    bgColor: 'rgb(120, 88, 56)'
  },
  {
    id: 2,
    caption: 'First walk ✨',
    image: '/media/TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg',
    fallbackImage: '/media/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '2.1deg',
    tapeColor: '#cfe5f6',
    tapePos: 'right',
    delay: '110ms',
    bgColor: 'rgb(248, 216, 184)'
  },
  {
    id: 3,
    caption: 'Best decision ever 🥰',
    image: '/media/j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg',
    fallbackImage: '/media/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '-2.4deg',
    tapeColor: '#f9cdbf',
    tapePos: 'center',
    delay: '330ms',
    bgColor: 'rgb(232, 232, 232)'
  },
  {
    id: 4,
    caption: 'Happy together 💕',
    image: '/media/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg',
    fallbackImage: '/media/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '1.5deg',
    tapeColor: '#fbe3b4',
    tapePos: 'left',
    delay: '550ms',
    bgColor: 'rgb(216, 216, 216)'
  },
  {
    id: 5,
    caption: 'New puppy 🧸😍',
    image: '/media/uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg',
    fallbackImage: '/media/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '-1.1deg',
    tapeColor: '#cfe5f6',
    tapePos: 'right',
    delay: '220ms',
    bgColor: 'rgb(232, 216, 184)'
  },
  {
    id: 6,
    caption: 'Gang of 3 😍🧸',
    image: '/media/pRJubyqHw8p7/d58c4c07ee/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg',
    fallbackImage: '/media/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '0.8deg',
    tapeColor: '#f6d79a',
    tapePos: 'right',
    delay: '770ms',
    bgColor: 'rgb(184, 152, 120)'
  },
  {
    id: 7,
    caption: 'So happy 😍😍',
    image: '/media/4wOJk9azop_-/65ecf66bf0/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg',
    fallbackImage: '/media/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '-2.6deg',
    tapeColor: '#f9cdbf',
    tapePos: 'left',
    delay: '440ms',
    bgColor: 'rgb(88, 56, 56)'
  },
  {
    id: 8,
    caption: 'New pup 🤗💫',
    image: '/media/3h20rIasJCOa/10c307cb1c/27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpg',
    fallbackImage: '/media/27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpeg',
    alt: 'A happy TeddyPups family with their new puppy',
    tilt: '1.2deg',
    tapeColor: '#cfe5f6',
    tapePos: 'center',
    delay: '660ms',
    bgColor: 'rgb(24, 40, 72)'
  }
];
