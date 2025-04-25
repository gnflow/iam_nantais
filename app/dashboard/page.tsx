import Header from '@/components/UI/header';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-8">
        <h1 className="text-white text-4xl sm:text-6xl font-bold mb-4">Dashboard Temlpate Users/Admin Login!</h1>
        <p className="text-white text-lg sm:text-xl mb-6">A définir...</p>
      </section>
      
      
    </div>
  );
}
