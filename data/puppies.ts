export interface Puppy {
  id: number;
  slug: string;
  name: string;
  breed: 'maltipoo' | 'pomeranian' | 'poodle' | 'cavapoo' | 'shih-tzu';
  breedLabel: string;
  sex: 'male' | 'female' | 'both';
  sexLabel: string;
  age: string;
  metaText: string;
  origin: 'local' | 'imported';
  originLabel: string;
  hasVideo: boolean;
  videoUrl?: string;
  image: string;
  fallbackImage: string;
  alt: string;
  objectPosition: string;
  bgColor: string;
  tag: string;
  description: string;
  details: {
    microchipped: boolean;
    vaccinated: boolean;
    dewormed: boolean;
    healthCertificate: boolean;
    pedigreeCertificate?: boolean;
    location: string;
    estimatedAdultWeight?: string;
  };
}

export const PUPPIES: Puppy[] = [
  {
    id: 1,
    slug: 'maltipoo-max-male',
    name: 'Max',
    breed: 'maltipoo',
    breedLabel: 'Maltipoo',
    sex: 'male',
    sexLabel: 'Boy',
    age: '3 months',
    metaText: 'Maltipoo, boy, 3 months, with video',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: true,
    videoUrl: '/media/showroom-video.mp4',
    image: '/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
    fallbackImage: '/media/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.jpeg',
    alt: 'Max, male Maltipoo puppy',
    objectPosition: '53.8% 44.3%',
    bgColor: 'rgb(120, 88, 56)',
    tag: 'Available',
    description: 'Max is a playful, affectionate apricot Maltipoo with an irresistibly sweet teddy bear face. He loves cuddles and makes the perfect companion for families and apartments.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '2.5 - 3.2 kg'
    }
  },
  {
    id: 2,
    slug: 'korean-teacup-maltipoo-female',
    name: 'Korean Teacup Maltipoo',
    breed: 'maltipoo',
    breedLabel: 'Korean Teacup Maltipoo',
    sex: 'female',
    sexLabel: 'Girl',
    age: '2 months',
    metaText: 'girl, 2 months, with video',
    origin: 'imported',
    originLabel: 'Flown from Korea',
    hasVideo: true,
    image: '/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
    fallbackImage: '/media/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpeg',
    alt: 'Female Korean Teacup Maltipoo puppy',
    objectPosition: '52.5% 42.6%',
    bgColor: 'rgb(232, 232, 232)',
    tag: 'Available',
    description: 'An exquisite Korean teacup Maltipoo with big glassy eyes, a tiny muzzle, and pristine curly coat. Extremely gentle and calm temperament.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      pedigreeCertificate: true,
      location: 'Seoul / VIP Delivery to Dubai',
      estimatedAdultWeight: '1.8 - 2.2 kg'
    }
  },
  {
    id: 3,
    slug: 'korean-teacup-poodle-female',
    name: 'Korean Teacup Poodle',
    breed: 'poodle',
    breedLabel: 'Korean Teacup Poodle',
    sex: 'female',
    sexLabel: 'Girl',
    age: '2 months',
    metaText: 'girl, 2 months',
    origin: 'imported',
    originLabel: 'Flown from Korea',
    hasVideo: false,
    image: '/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
    fallbackImage: '/media/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpeg',
    alt: 'Female Korean Teacup Poodle puppy',
    objectPosition: '54.5% 45.7%',
    bgColor: 'rgb(248, 216, 184)',
    tag: 'Available',
    description: 'A pocket-sized apricot teacup poodle with hypoallergenic non-shedding coat and intelligent, devoted personality.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      pedigreeCertificate: true,
      location: 'Seoul / VIP Delivery to Dubai',
      estimatedAdultWeight: '1.5 - 2.0 kg'
    }
  },
  {
    id: 4,
    slug: 'maltipoo-cavapoo-male',
    name: 'Maltipoo & Cavapoo',
    breed: 'cavapoo',
    breedLabel: 'Cavapoo & Maltipoo',
    sex: 'male',
    sexLabel: 'Boy',
    age: '3 months',
    metaText: 'boy, 3 months Maltipoo & 2 months Cavapoo, with video',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: true,
    image: '/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
    fallbackImage: '/media/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpeg',
    alt: 'Male Maltipoo & Cavapoo puppy',
    objectPosition: '44.7% 29.5%',
    bgColor: 'rgb(184, 168, 168)',
    tag: 'Available',
    description: 'Pair of delightful brothers available together or separately. Soft silky curls with charming soulful eyes.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '2.8 - 3.5 kg'
    }
  },
  {
    id: 5,
    slug: 'toy-poodle-male-female',
    name: 'Toy Poodle',
    breed: 'poodle',
    breedLabel: 'Toy Poodle',
    sex: 'both',
    sexLabel: 'Boy & Girl',
    age: '2 months',
    metaText: 'boy & girl, 2 months',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: false,
    image: '/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
    fallbackImage: '/media/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpeg',
    alt: 'Toy Poodle puppy',
    objectPosition: '65.4% 44.7%',
    bgColor: 'rgb(200, 200, 200)',
    tag: 'Available',
    description: 'Energetic and inquisitive toy poodle puppies. Highly trainable, hypoallergenic and joyful.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '2.5 - 3.0 kg'
    }
  },
  {
    id: 6,
    slug: 'maltipoo-female-2',
    name: 'Maltipoo',
    breed: 'maltipoo',
    breedLabel: 'Maltipoo',
    sex: 'female',
    sexLabel: 'Girl',
    age: '3 months',
    metaText: 'girl, 3 months, with video',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: true,
    image: '/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
    fallbackImage: '/media/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpeg',
    alt: 'Female Maltipoo puppy',
    objectPosition: '64.6% 42.3%',
    bgColor: 'rgb(8, 8, 8)',
    tag: 'Available',
    description: 'Stunning cream Maltipoo girl with fluffy teddy bear paws and very quiet, gentle disposition.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '2.4 - 3.0 kg'
    }
  },
  {
    id: 7,
    slug: 'pomeranian-female',
    name: 'Pomeranian',
    breed: 'pomeranian',
    breedLabel: 'Pomeranian',
    sex: 'female',
    sexLabel: 'Girl',
    age: '3 months',
    metaText: 'girl, 3 months',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: false,
    image: '/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg',
    fallbackImage: '/media/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpeg',
    alt: 'Female Pomeranian puppy',
    objectPosition: '40.3% 44.3%',
    bgColor: 'rgb(8, 8, 8)',
    tag: 'Available',
    description: 'Fluffy cloud of joy! Pure white Pom girl with button eyes and a perpetual smile.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '2.0 - 2.5 kg'
    }
  },
  {
    id: 8,
    slug: 'copper-male',
    name: 'Copper',
    breed: 'cavapoo',
    breedLabel: 'Cavapoo',
    sex: 'male',
    sexLabel: 'Boy',
    age: '2 months',
    metaText: 'Cavapoo, boy, 2 months',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: false,
    image: '/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg',
    fallbackImage: '/media/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpeg',
    alt: 'Copper, male Cavapoo puppy',
    objectPosition: '43% 50.5%',
    bgColor: 'rgb(232, 216, 200)',
    tag: 'Available',
    description: 'Copper is a rich ruby red Cavapoo boy who loves following you around and curling up in your lap.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '3.0 - 3.8 kg'
    }
  },
  {
    id: 9,
    slug: 'shitzu-female',
    name: 'Shih Tzu',
    breed: 'shih-tzu',
    breedLabel: 'Shih Tzu',
    sex: 'female',
    sexLabel: 'Girl',
    age: '2 months',
    metaText: 'girl, 2 months',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: false,
    image: '/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg',
    fallbackImage: '/media/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg',
    alt: 'Female Shih Tzu puppy',
    objectPosition: '44.8% 42.5%',
    bgColor: 'rgb(56, 56, 72)',
    tag: 'Available',
    description: 'Adorable tricolor Shih Tzu girl with silky double coat and calm, royal demeanor.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '3.2 - 4.0 kg'
    }
  },
  {
    id: 10,
    slug: 'shitzu-male',
    name: 'Shih Tzu',
    breed: 'shih-tzu',
    breedLabel: 'Shih Tzu',
    sex: 'male',
    sexLabel: 'Boy',
    age: '2 months',
    metaText: 'boy, 2 months',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: false,
    image: '/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg',
    fallbackImage: '/media/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpeg',
    alt: 'Male Shih Tzu puppy',
    objectPosition: '40.3% 43.6%',
    bgColor: 'rgb(120, 120, 136)',
    tag: 'Available',
    description: 'Charming boy with bold mask markings. Very friendly with children and other pets.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '3.5 - 4.2 kg'
    }
  },
  {
    id: 11,
    slug: 'maltipoo-female-1',
    name: 'Maltipoo',
    breed: 'maltipoo',
    breedLabel: 'Maltipoo',
    sex: 'female',
    sexLabel: 'Girl',
    age: '2.5 months',
    metaText: 'girl, 2.5 months',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: false,
    image: '/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg',
    fallbackImage: '/media/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpeg',
    alt: 'Female Maltipoo puppy',
    objectPosition: '47.5% 50.5%',
    bgColor: 'rgb(232, 216, 200)',
    tag: 'Available',
    description: 'Tiny apricot girl with super curly ears and a tail that wags non-stop. Ready for immediate adoption.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '2.2 - 2.8 kg'
    }
  },
  {
    id: 12,
    slug: 'maltipoo-female',
    name: 'Maltipoo',
    breed: 'maltipoo',
    breedLabel: 'Maltipoo',
    sex: 'female',
    sexLabel: 'Girl',
    age: '2 months',
    metaText: 'girl, 2 months',
    origin: 'local',
    originLabel: 'Available in Dubai',
    hasVideo: false,
    image: '/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg',
    fallbackImage: '/media/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpeg',
    alt: 'Female Maltipoo puppy',
    objectPosition: '56.9% 49.2%',
    bgColor: 'rgb(232, 216, 200)',
    tag: 'Available',
    description: 'Sweet honey-apricot girl. Soft fluffy coat, curious eyes and tender heart.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      location: 'Downtown Dubai Showroom',
      estimatedAdultWeight: '2.3 - 2.9 kg'
    }
  },
  {
    id: 13,
    slug: 'korean-teacup-pomeranian-1',
    name: 'Korean Teacup Pomeranian',
    breed: 'pomeranian',
    breedLabel: 'Korean Teacup Pomeranian',
    sex: 'female',
    sexLabel: 'Girl',
    age: '2 months',
    metaText: 'girl, 2 months',
    origin: 'imported',
    originLabel: 'Flown from Korea',
    hasVideo: false,
    image: '/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg',
    fallbackImage: '/media/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpeg',
    alt: 'Female Korean Teacup Pomeranian puppy',
    objectPosition: '49.9% 51.3%',
    bgColor: 'rgb(216, 216, 216)',
    tag: 'Available',
    description: 'Ultra-rare Korean micro teacup Pomeranian with short bear snout and enormous fluffy coat.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      pedigreeCertificate: true,
      location: 'Seoul / VIP Delivery to Dubai',
      estimatedAdultWeight: '1.6 - 2.0 kg'
    }
  },
  {
    id: 14,
    slug: 'korean-teacup-pomeranian',
    name: 'Korean Teacup Pomeranian',
    breed: 'pomeranian',
    breedLabel: 'Korean Teacup Pomeranian',
    sex: 'female',
    sexLabel: 'Girl',
    age: '2 months',
    metaText: 'girl, 2 months',
    origin: 'imported',
    originLabel: 'Flown from Korea',
    hasVideo: false,
    image: '/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg',
    fallbackImage: '/media/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpeg',
    alt: 'Female Korean Teacup Pomeranian puppy',
    objectPosition: '49.9% 48.6%',
    bgColor: 'rgb(72, 72, 72)',
    tag: 'Available',
    description: 'Pure snow-white teacup Pomeranian. High-tier bloodline from award-winning Korean heritage kennels.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      pedigreeCertificate: true,
      location: 'Seoul / VIP Delivery to Dubai',
      estimatedAdultWeight: '1.7 - 2.1 kg'
    }
  },
  {
    id: 15,
    slug: 'korean-teacup-pomeranian-male',
    name: 'Korean Teacup Pomeranian',
    breed: 'pomeranian',
    breedLabel: 'Korean Teacup Pomeranian',
    sex: 'male',
    sexLabel: 'Boy',
    age: '2 months',
    metaText: 'boy, 2 months',
    origin: 'imported',
    originLabel: 'Flown from Korea',
    hasVideo: false,
    image: '/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg',
    fallbackImage: '/media/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpeg',
    alt: 'Male Korean Teacup Pomeranian puppy',
    objectPosition: '48.9% 44.1%',
    bgColor: 'rgb(8, 8, 8)',
    tag: 'Available',
    description: 'Handsome micro boy with thick plush coat and teddy-bear round ears. True show quality.',
    details: {
      microchipped: true,
      vaccinated: true,
      dewormed: true,
      healthCertificate: true,
      pedigreeCertificate: true,
      location: 'Seoul / VIP Delivery to Dubai',
      estimatedAdultWeight: '1.8 - 2.2 kg'
    }
  }
];

export function getPuppyBySlug(slug: string): Puppy | undefined {
  return PUPPIES.find(p => p.slug === slug);
}

export function getPuppiesByFilter(breed?: string, origin?: string): Puppy[] {
  return PUPPIES.filter(p => {
    if (breed && p.breed !== breed) return false;
    if (origin && p.origin !== origin) return false;
    return true;
  });
}
