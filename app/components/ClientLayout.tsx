"use client";
import { ReactNode } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#0d1117]">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}