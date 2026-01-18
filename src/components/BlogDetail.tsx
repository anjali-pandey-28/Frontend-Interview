import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Blog } from "../types";

export function BlogDetail({ id }: { id: number }) {
  const { data: blog, isLoading } = useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/blogs/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse text-slate-400">
        Loading content...
      </div>
    );
  if (!blog) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <img
        src={blog.coverImage}
        alt=""
        className="w-full h-64 object-cover rounded-2xl mb-8"
      />
      <div className="flex gap-2 mb-4">
        {blog.category.map((c) => (
          <span
            key={c}
            className="px-2 py-1 bg-slate-100 text-[10px] font-bold rounded uppercase"
          >
            {c}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
        {blog.title}
      </h1>
      <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
        {blog.content}
      </p>
    </div>
  );
}