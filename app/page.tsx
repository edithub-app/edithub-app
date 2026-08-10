import Navbar from '@/components/site/navbar';
import Hero from '@/components/site/hero';
import FeaturedAssets from '@/components/site/featured-assets';
import FeaturedScenepacks from '@/components/site/featured-scenepacks';
import HowItWorks from '@/components/site/how-it-works';
import SellerCTA from '@/components/site/seller-cta';
import Footer from '@/components/site/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedScenepacks />
        <FeaturedAssets />
        <HowItWorks />
        <SellerCTA />
      </main>
      <Footer />
    </>
  );
}
