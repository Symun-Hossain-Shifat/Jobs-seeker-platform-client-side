import Bannerpage from "@/Components/Banner";
import CTASection from "@/Components/Contact";
import FeaturedJobs from "@/Components/Discover";
import PricingSection from "@/Components/Leverage";
import Subheaderpage from "@/Components/SubHeader";

import JobFeaturesSection from "@/Components/Success";


export default function Home() {
  return (
    <div>
     
    <Bannerpage></Bannerpage>
    <Subheaderpage></Subheaderpage>
    <FeaturedJobs></FeaturedJobs>
    <JobFeaturesSection></JobFeaturesSection>
    <PricingSection></PricingSection>
    <CTASection></CTASection>
   
    </div>
  );
}
