

const Page = ({ params }: { params: { slug: string } }) => {
    return (
        <h2>Blog Post{params.slug} </h2>
    );
}

export default Page;