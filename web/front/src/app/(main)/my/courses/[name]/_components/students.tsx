import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const students = [
  {
    name: "John Smith",
    joinDate: "2024-01-15",
    progress: 75,
    avatar: require("@/assets/images/avatars/avatar1.png"),
  },
  {
    name: "Sarah Johnson",
    joinDate: "2024-01-16",
    progress: 60,
    avatar: require("@/assets/images/avatars/avatar1.png"),
  },
  {
    name: "Michael Brown",
    joinDate: "2024-01-17",
    progress: 45,
    avatar: require("@/assets/images/avatars/avatar1.png"),
  },
  {
    name: "Emily Davis",
    joinDate: "2024-01-18",
    progress: 30,
    avatar: require("@/assets/images/avatars/avatar1.png"),
  },
  {
    name: "David Wilson",
    joinDate: "2024-01-19",
    progress: 15,
    avatar: require("@/assets/images/avatars/avatar1.png"),
  },
];

export const Students = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg lg:text-2xl font-semibold mb-4">Enrolled Students</h2>
        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-4">
            {students.map((student, i) => (
              <div
                key={i}
                className="cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative size-10 rounded-full overflow-hidden">
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Joined on {new Date(student.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{student.progress}% Complete</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
