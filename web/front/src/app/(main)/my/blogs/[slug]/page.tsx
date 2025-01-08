

export default async function BlogPost({ params }: { params: { slug: string } }) {

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Post: {params.slug}</h1>
      {/* Add your blog post content here */}
    </div>
  );
}