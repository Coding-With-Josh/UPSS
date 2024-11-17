import { Card, CardContent } from "@/components/ui/card";

export const Events = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg lg:text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <h3 className="font-medium">Live Session {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">
                Join the interactive live session with your instructor.
              </p>
              <button className="mt-3 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Join Session
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
