'use client'

import React from 'react'

import { AnnouncementsCard } from '@/components/dashboard/announcements-card'
import { AssignmentsCard } from '@/components/dashboard/assignments-card'
import { QuizzesCard } from '@/components/dashboard/quizzes-card'
import { DiscussionsCard } from '@/components/dashboard/discussions-card'
import { GradesCard } from '@/components/dashboard/grades-card'
import { OverallProgressCard } from '@/components/dashboard/overall-progress-card'
import type { User } from '@/lib/types'

type DashboardPageProps = {
  user?: User | null;
  setImportSyllabusOpen?: (open: boolean) => void;
};


export function DashboardPage({ user, setImportSyllabusOpen }: DashboardPageProps) {
  return (
    <div className="flex-1 animate-in fade-in-50 duration-500">
      <div className="grid gap-6 auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-4">
            <AssignmentsCard />
        </div>
        <div className="lg:col-span-2">
            <OverallProgressCard />
        </div>
        <div className="lg:col-span-3">
            <AnnouncementsCard />
        </div>
        <div className="lg:col-span-3">
            <QuizzesCard />
        </div>
        <div className="lg:col-span-3">
            <DiscussionsCard />
        </div>
        <div className="lg:col-span-3">
            <GradesCard />
        </div>
      </div>
    </div>
  )
}
