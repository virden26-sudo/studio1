import { Target, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppLogo } from "../app-logo";

export function OverallProgressCard() {
  const courseName = "CS 101: Intro to Programming"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-gradient">
                    <Target className="h-6 w-6" />
                    Overall Progress
                </CardTitle>
                <CardDescription>{courseName}</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center gap-4">
        <div className="w-40 h-40">
          <AppLogo />
        </div>
      </CardContent>
    </Card>
  );
}
