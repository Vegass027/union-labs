import VSCodeHeader from "@/components/landing/VSCodeHeader";
import HeroSection from "@/components/landing/HeroSection";

export default function MarketingPage() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(155 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(155 100% 50%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <VSCodeHeader tabs={[]} />

      <HeroSection />
    </main>
  );
}
