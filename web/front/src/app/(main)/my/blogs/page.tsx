'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Image as ImageIcon, FileText, Plus, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

const blogs = [
  {
    id: 1,
    title: "Getting Started with Grid",
    description: "Introduction tutorial series",
    type: "Video",
    status: "In Progress",
    progress: 75,
    createdAt: "2024-02-15",
    thumbnail: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Grid Design System",
    description: "Visual design guidelines",
    type: "Document",
    status: "Review",
    progress: 90,
    createdAt: "2024-02-10",
    thumbnail: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Feature Highlights",
    description: "Product feature showcase",
    type: "Image",
    status: "Planning",
    progress: 30,
    createdAt: "2024-02-20",
    thumbnail: "/placeholder.svg",
  },
];

const typeIcons = {
  Video: Video,
  Image: ImageIcon,
  Document: FileText,
};

export default function ContentblogsPage() {

  const router = useRouter();
  return (
    <div className="space-y-6 m-6">
      <div className="flex-col lg:flex-row space-y-3 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => router.push("/my/blogs/new-blog")} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New blog
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              const Icon = typeIcons[blog.type as keyof typeof typeIcons];
              return (
                <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="aspect-video rounded-t-lg bg-secondary/20 relative group">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="outline">
                          View Blog
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{blog.title}</CardTitle>
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>{blog.description}</CardDescription>
                      </div>
                      <div className="flex-col lg:flex-row md:flex-row space-y-3 items-center justify-between">
                        <Badge
                          variant="outline"
                          className={
                            blog.status === "In Progress"
                              ? "border-primary text-primary"
                              : blog.status === "Review"
                              ? "border-yellow-500 text-yellow-500"
                              : "border-muted-foreground"
                          }
                        >
                          {blog.status}
                        </Badge>
                        <span className="lg:block hidden md:hidden text-sm text-muted-foreground">
                          Created on {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="lg:hidden block md:block text-sm text-muted-foreground">
                          Created on {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{blog.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${blog.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {["video", "image", "document"].map((type) => (
          <TabsContent key={type} value={type} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs
                .filter((p) => p.type.toLowerCase() === type)
                .map((blog) => {
                  const Icon = typeIcons[blog.type as keyof typeof typeIcons];
                  return (
                    <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                      {/* Same card content as above */}
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}