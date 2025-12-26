

'use client'

import { DashboardPage } from '@/components/dashboard/dashboard-page';
import type { User } from '@/lib/types';

type HomePageProps = {
  user?: User | null;
  setImportSyllabusOpen?: (open: boolean) => void;
};

export default function Home({ user, setImportSyllabusOpen }: HomePageProps) {
  return (
    <DashboardPage user={user} setImportSyllabusOpen={setImportSyllabusOpen} />
  );
}

    