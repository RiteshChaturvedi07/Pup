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
    <>
      {/* 1. Hero (#FBF6EE -> #F5E8D3) */}
      <HeroScene />

      {/* 2. Meet the Pups Door Corridor (#F5E8D3 -> #fbe3b4) */}
      <MeetPupsScene />

      {/* 3. Two Ways to Meet Your Puppy (#fbe3b4 -> #ECA861) */}
      <TwoWaysScene />

      {/* 4. Concierge Journey & WhatsApp Mockup (#ECA861 -> #e89a4b) */}
      <JourneyScene />

      {/* 5. Passport & Trust Guarantee (#e89a4b -> #7A3616) */}
      <PassportScene />

      {/* 6. Happy Families & Testimonials (#7A3616 -> #4a2311) */}
      <HappyFamiliesScene />

      {/* 7. Questions Answered & FAQ (#4a2311 -> #2f1a10) */}
      <QuestionsScene />

      {/* 8. Closing Welcome Home CTA (#2f1a10 -> #2A1208) */}
      <ClosingCtaScene />
    </>
  );
}
