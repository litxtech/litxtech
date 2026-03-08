export function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we build web applications.",
      date: "2024-01-15",
      author: "LitxTech Team"
    },
    {
      id: 2,
      title: "Modern React Patterns for 2024",
      excerpt: "Best practices and patterns for building scalable React applications.",
      date: "2024-01-10",
      author: "LitxTech Team"
    },
    {
      id: 3,
      title: "Digital Transformation Strategies",
      excerpt: "How businesses can successfully navigate digital transformation with the right technology stack.",
      date: "2024-01-05",
      author: "LitxTech Team"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
