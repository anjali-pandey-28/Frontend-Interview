import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Blog } from "../types";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

export function BlogList({ onSelect }: { onSelect: (id: number) => void }) {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/blogs");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  if (error)
    return <div className="text-red-500 p-4">Error loading blogs.</div>;

  return (
    <div className="space-y-4">
      {blogs?.map((blog) => (
        <Card
          key={blog.id}
          className="cursor-pointer hover:border-blue-400"
          onClick={() => onSelect(blog.id)}
        >
          <CardHeader>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              {blog.category[0]}
            </span>
            <CardTitle className="text-lg">{blog.title}</CardTitle>
            <CardDescription>{blog.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}