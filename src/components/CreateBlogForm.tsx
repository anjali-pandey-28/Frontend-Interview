import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CreateBlogForm() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newBlog: any) =>
      axios.post("http://localhost:3001/blogs", newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsOpen(false);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate({
      title: formData.get("title"),
      description: formData.get("description"),
      content: "Sample content for " + formData.get("title"),
      category: ["FINANCE"],
      date: new Date().toISOString(),
      coverImage:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
    });
  };

  if (!isOpen)
    return <Button onClick={() => setIsOpen(true)}>Create New Post</Button>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">New Article</h2>
        <Input name="title" placeholder="Article Title" required />
        <Input name="description" placeholder="Short Summary" required />
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-slate-200 text-slate-800 hover:bg-slate-300"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Posting..." : "Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}