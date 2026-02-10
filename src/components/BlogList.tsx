import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Blog } from "../types";
import { MdDeleteForever } from "react-icons/md";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";

export function BlogList({ onSelect }: { onSelect: (id: number) => void }) {
  const queryClient = useQueryClient();

  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 p-4">Error loading blogs.</div>;

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // prevent opening blog

    const ok = window.confirm("Delete this blog?");
    if (!ok) return;

    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-4">
      {blogs?.map((blog) => (
        <Card
          key={blog.id}
          className="cursor-pointer hover:border-blue-400"
          onClick={() => onSelect(blog.id)}
        >
          <CardHeader className="relative">
            {/* DELETE BUTTON */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 text-red-600 hover:bg-slate-600"
              onClick={(e) => handleDelete(e, blog.id)}
            >
              <MdDeleteForever size={18} />
            </Button>

            {/* TAG */}
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              {blog.tags?.[0] ?? "UNTAGGED"}
            </span>

            <CardTitle className="text-lg">{blog.title}</CardTitle>
            <CardDescription>{blog.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
