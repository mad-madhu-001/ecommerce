import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryShowcase from '@/components/CategoryShowcase';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FreshWear - Premium Fashion for Men, Women & Kids | Latest Trends 2024</title>
        <meta 
          name="description" 
          content="Discover premium fashion at FreshWear. Shop latest trends in ethnic wear, casual & formal clothing for men, women & kids. Free shipping on orders above ₹999. COD available." 
        />
        <meta name="keywords" content="fashion, clothing, ethnic wear, men fashion, women fashion, kids clothing, freshwear, Indian fashion, online shopping" />
        <meta property="og:title" content="FreshWear - Premium Fashion for Men, Women & Kids" />
        <meta property="og:description" content="Discover premium fashion collections with the latest trends. Shop ethnic wear, casual & formal clothing." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>

      <main>
        <Hero />
        <FeaturedProducts />
        <CategoryShowcase />
      </main>
    </>
  );
};

export default Home;