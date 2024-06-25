"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from '@hono/auth-js/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleAuth = () => {
    router.push('/auth');
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold text-blue-600">SaaSLogo</Link>
      {!session && (
        <nav className="hidden space-x-4 md:flex">
          <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
          <Link href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
          <Link href="#contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
        </nav>
      )}
      <div className="flex items-center space-x-4">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                  <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <span>{session.user?.name || session.user?.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={handleAuth}>ログイン / サインアップ</Button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="md:hidden">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="#features">Features</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#pricing">Pricing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#contact">Contact</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
