
'use client'

import { DashboardPage } from '@/components/dashboard/dashboard-page';
import type { User } from '@/lib/types';
import { useState } from 'react';

// This would typically come from an authentication provider
const mockUser: User = {
  name: 'Jane Doe',
  email: 'jane.doe@university.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc2NDUxOTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
};

export default function Home() {
  const [isImportSyllabusOpen, setImportSyllabusOpen] = useState(false);
  
  return (
    <DashboardPage user={mockUser} setImportSyllabusOpen={setImportSyllabusOpen} />
  );
}
