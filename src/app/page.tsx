import Header           from "@/components/Header";
import HeroSection      from "@/components/HeroSection";
import BrandsMarquee    from "@/components/BrandsMarquee";
import BeanToCupSection from "@/components/BeanToCupSection";
import CategoriesGrid   from "@/components/CategoriesGrid";
import ProductCarousel  from "@/components/ProductCarousel";
import BialettiSection  from "@/components/BialettiSection";
import SpecsSection     from "@/components/SpecsSection";
import BusinessSection  from "@/components/BusinessSection";
import WhyVeroSection   from "@/components/WhyVeroSection";
import StorySection     from "@/components/StorySection";
import BranchesSection  from "@/components/BranchesSection";
import Footer           from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--espresso)", minHeight: "100svh" }}>
      <Header />
      <HeroSection />
      <BrandsMarquee />
      <BeanToCupSection />
      <CategoriesGrid />
      <ProductCarousel />
      <BialettiSection />
      <SpecsSection />
      <BusinessSection />
      <WhyVeroSection />
      <StorySection />
      <BranchesSection />
      <Footer />
    </main>
  );
}
