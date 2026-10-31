export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const HOME_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.'
  },
  {
    id: 'faq-2',
    question: 'Can I meet a puppy before I decide?',
    answer: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.'
  },
  {
    id: 'faq-3',
    question: 'Can I take my puppy home the same day?',
    answer: 'Local puppies are available immediately, so you can take your puppy home the same day.'
  }
];

export const ALL_FAQS: FAQItem[] = [
  ...HOME_FAQS,
  {
    id: 'faq-4',
    question: 'How does the import process from Korea work?',
    answer: 'We partner with accredited, ethical heritage breeders in South Korea. After you select your puppy, we coordinate microchipping, rabies titer documentation, UAE import permits, and VIP flight delivery with climate-controlled pet travel.'
  },
  {
    id: 'faq-5',
    question: 'What breeds do you specialize in?',
    answer: 'We specialize in teacup and miniature breeds: Maltipoos, Korean Teacup Pomeranians, Toy & Teacup Poodles, Cavapoos, and Shih Tzus.'
  },
  {
    id: 'faq-6',
    question: 'What aftercare support do you offer after adoption?',
    answer: 'Our dedicated puppy concierge provides 24/7 post-delivery guidance covering diet, vaccination schedules, potty training, grooming recommendations, and vet partner discounts across Dubai and Abu Dhabi.'
  },
  {
    id: 'faq-7',
    question: 'Do you deliver across the entire UAE?',
    answer: 'Yes, we provide door-to-door temperature-controlled delivery throughout Dubai, Abu Dhabi, Sharjah, Ajman, RAK, and Fujairah.'
  }
];
