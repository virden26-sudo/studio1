import { Megaphone, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { announcements } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function AnnouncementsCard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
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
          {announcements.map((announcement) => (
            <div key={announcement.id} className="flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium">{announcement.title}</p>
                <p className="text-sm text-muted-foreground">
                  {announcement.content}
                </p>
                <div className="flex items-center gap-2 pt-1">
                    <Badge variant="secondary">{announcement.course}</Badge>
                    <p className="text-xs text-muted-foreground">{announcement.date.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
