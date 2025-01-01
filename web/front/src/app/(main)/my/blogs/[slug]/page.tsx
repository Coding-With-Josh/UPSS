import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Post: {params.slug}</h1>
      {/* Add your blog post content here */}
    </div>
  );
}