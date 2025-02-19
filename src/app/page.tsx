"use client";
import AboutUsSection from "@/components/AboutUsSection";
import FeaturedRemodelsSection from "@/components/FeaturedRemodelsSection";
import LandingPage from "@/components/LandingPage";

export default function HomePage() {
  return (
    <>
      {/* Navbar */}
      <LandingPage/>
      <AboutUsSection />
      <FeaturedRemodelsSection/>
      {/* Hero Section */}
    </>
  );
}
