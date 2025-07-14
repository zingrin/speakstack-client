import { Link } from "react-router";

const blogPosts = [
  {
    id: 1,
    title: "5 Essential Tips for First-Time Pet Owners",
    image: "https://i.ibb.co/gDPpz94/pet-tip.jpg",
    date: "July 12, 2025",
    excerpt: "New to pet parenting? Here are 5 essential tips to get you started on the right paw...",
  },
  {
    id: 2,
    title: "How to Handle Pet Anxiety During Thunderstorms",
    image: "https://i.ibb.co/zs9tFyG/pet-anxiety.jpg",
    date: "July 9, 2025",
    excerpt: "Thunderstorms can be terrifying for pets. Discover simple ways to keep them calm and safe...",
  },
  {
    id: 3,
    title: "Best Homemade Pet Treat Recipes",
    image: "https://i.ibb.co/3CmN7fF/pet-treats.jpg",
    date: "July 5, 2025",
    excerpt: "Want to spoil your furry friend with love and food? Here are 3 healthy treat recipes...",
  },
];

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">🐾 PawTrack Blog</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-700 text-base mb-3">{post.excerpt}</p>
              <Link
                to="#"
                className="text-blue-600 hover:underline font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
