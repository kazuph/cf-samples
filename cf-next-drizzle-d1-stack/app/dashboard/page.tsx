"use client"

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Todo from '@/components/Todo';
import Footer from '@/components/Footer';
import { useSession } from '@hono/auth-js/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied. Please sign in.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container flex-grow px-4 py-8 mx-auto">
        <Todo />
      </main>
      <Footer />
    </div>
  );
}
