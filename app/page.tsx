import {
  FreelancerHeroSection,
  FreelancerFeaturesSection,
  FreelancerHowItWorksSection,
  FreelancerTestimonialsSection,
  FreelancerCTASection,
} from "@/components/freelancer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 w-full">
      <FreelancerHeroSection />
      <FreelancerFeaturesSection />
      <FreelancerHowItWorksSection />
      <FreelancerTestimonialsSection />
      <FreelancerCTASection />
    </div>
  );
}
