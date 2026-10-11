import React, { Suspense } from 'react';
import Footer from './components/Footer';
import BannerPage from './components/Banner';
import PriceRising from './components/PriceRising';
import PriceFalling from './components/PriceFalling';
import AllProducts from './components/AllProducts';
export const instant = false;

const page = () => {
  return (
    <div className='bg-[#eef8ee]'>
      
      <main className="container mx-auto px-4 py-6">
      <BannerPage />
      
    <Suspense fallback={<p>Loading...</p>}>
<PriceRising />
</Suspense>

<Suspense fallback={<p>Loading...</p>}>
<PriceFalling />
</Suspense>

<Suspense fallback={<p>Loading...</p>}>
<AllProducts />
</Suspense>
    </main>
    </div>
  );
};

export default page;