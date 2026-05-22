import { Hero } from '../components/Hero';
import { SystemPillars } from '../components/SystemPillars';
import { TrendingRadar } from '../components/TrendingRadar';
import { KnowledgeGraph } from '../components/KnowledgeGraph';
import { HowBigTechBuilds } from '../components/HowBigTechBuilds';
import { AIGenerator } from '../components/AIGenerator';
import { LearningModes } from '../components/LearningModes';
import { IntelligenceFeed } from '../components/IntelligenceFeed';
import { Community } from '../components/Community';
import { Footer } from '../components/Footer';
import { CapacityCalculator } from '../components/CapacityCalculator';
import { DailyChallenges } from '../components/DailyChallenges';

import { useEffect } from 'react';

export function Home() {
  useEffect(() => {
    document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Hero />
      <SystemPillars />
      <TrendingRadar />
      <CapacityCalculator />
      <KnowledgeGraph />
      <DailyChallenges />
      <HowBigTechBuilds />
      <AIGenerator />
      <LearningModes />
      <IntelligenceFeed />
      <Community />
      <Footer />
    </>
  )
}
