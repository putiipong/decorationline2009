"use client";
import AboutUsSection from "@/components/AboutUsSection";
import FeaturedRemodelsSection from "@/components/FeaturedRemodelsSection";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";

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
