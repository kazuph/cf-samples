import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <HomeContent />
      </div>
      <Footer />
    </div>
  );
}
