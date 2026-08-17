import Navbar from '@/components/site/navbar';
import Hero from '@/components/site/hero';
import FeaturedPresets from '@/components/site/featured-presets';
import FeaturedScenepacks from '@/components/site/featured-scenepacks';
import FeaturedAssets from '@/components/site/featured-assets';
import HowItWorks from '@/components/site/how-it-works';
import SellerCTA from '@/components/site/seller-cta';
import Footer from '@/components/site/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedPresets />
        <FeaturedScenepacks />
        <FeaturedAssets />
        <HowItWorks />
        <SellerCTA />
      </main>
      <Footer />
    </>
  );
}
