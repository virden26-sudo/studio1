
"use client";

import { Megaphone, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { announcements as mockAnnouncements } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/mock-data";

export function AnnouncementsCard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Simulate fetching announcements
    setAnnouncements(mockAnnouncements);
  }, [])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-gradient">
                <Megaphone className="h-6 w-6" />
                Announcements
                </CardTitle>
                <CardDescription>Recent updates from your courses</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          {announcements.length > 0 ? announcements.map((announcement) => (
            <div key={announcement.id} className="flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium">{announcement.title}</p>
                <p className="text-sm text-muted-foreground">
                  {announcement.content}
                </p>
                <div className="flex items-center gap-2 pt-1">
                    <Badge variant="secondary">{announcement.course}</Badge>
                    <p className="text-xs text-muted-foreground">{new Date(announcement.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-muted-foreground text-center">No announcements.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
