
"use client";

import { MessageSquare, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { discussions as mockDiscussions } from "@/lib/mock-data";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import type { Discussion } from "@/lib/mock-data";


export function DiscussionsCard() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    // Simulate fetching discussions
    setDiscussions(mockDiscussions);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-gradient">
                <MessageSquare className="h-6 w-6" />
                Active Discussions
                </CardTitle>
                <CardDescription>Join the conversation</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          {discussions.length > 0 ? discussions.map((discussion) => (
            <div key={discussion.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={discussion.authorAvatarUrl} alt={discussion.author} data-ai-hint="person face" />
                <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{discussion.title}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{discussion.author}</span> replied in <span className="font-medium text-foreground">{discussion.course}</span>
                </p>
                <div className="flex items-center gap-2 pt-1">
                    {discussion.unreadReplies > 0 && <Badge className="bg-primary/20 text-primary hover:bg-primary/30">{discussion.unreadReplies} unread</Badge>}
                    <p className="text-xs text-muted-foreground">{new Date(discussion.lastReply).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-muted-foreground text-center">No active discussions.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
