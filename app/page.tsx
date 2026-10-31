import React from 'react';
import { HeroScene } from '@/components/scenes/HeroScene';
import { MeetPupsScene } from '@/components/scenes/MeetPupsScene';
import { TwoWaysScene } from '@/components/scenes/TwoWaysScene';
import { JourneyScene } from '@/components/scenes/JourneyScene';
import { PassportScene } from '@/components/scenes/PassportScene';
import { HappyFamiliesScene } from '@/components/scenes/HappyFamiliesScene';
import { QuestionsScene } from '@/components/scenes/QuestionsScene';
import { ClosingCtaScene } from '@/components/scenes/ClosingCtaScene';

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Hero */}
      <HeroScene />

      {/* 2. Meet the Pups Door Corridor */}
      <MeetPupsScene />

      {/* 3. Two Ways to Meet Your Puppy */}
      <TwoWaysScene />

      {/* 4. Concierge Journey & WhatsApp Mockup */}
      <JourneyScene />

      {/* 5. Passport & Trust Guarantee */}
      <PassportScene />

      {/* 6. Happy Families & Testimonials */}
      <HappyFamiliesScene />

      {/* 7. Questions Answered & FAQ */}
      <QuestionsScene />

      {/* 8. Closing Welcome Home CTA */}
      <ClosingCtaScene />
    </div>
  );
}
