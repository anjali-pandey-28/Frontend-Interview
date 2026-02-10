import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CreateBlogForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newBlog: any) =>
      axios.post(`${import.meta.env.VITE_API_BASE_URL}`, newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsOpen(false);
      setTags([]);
      setImage(null);
      setTagInput("");
    },
  });

  /* ---------------- TAG HANDLERS ---------------- */

  const addTag = () => {
    const value = tagInput.trim().toUpperCase();
    if (!value || tags.includes(value)) return;

    setTags([...tags, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  /* ---------------- IMAGE HANDLERS ---------------- */

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImage(file);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!tags.length) {
      alert("Please add at least one tag");
      return;
    }

    if (!image) {
      alert("Please upload a cover image");
      return;
    }

    const formData = new FormData(e.target);

    mutation.mutate({
      title: formData.get("title"),
      description: formData.get("description"),
      content: "Sample content for " + formData.get("title"),
      tags,
      coverImage: image,
      date: new Date().toISOString(),
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
        <h2 className="text-2xl font-bold">New Article</h2>

        <Input name="title" placeholder="Article Title" required />
        <Input name="description" placeholder="Short Summary" required />

        {/* TAG INPUT */}
        <div>
          <label className="text-sm font-medium">Tags</label>
          <div className="flex gap-2 mt-1">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Type tag & click Add"
            />
            <Button type="button" onClick={addTag}>
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                {tag} ✕
              </span>
            ))}
          </div>
        </div>

        {/* IMAGE DROP ZONE */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer"
        >
          {image ? (
            <img
              src={image}
              alt="preview"
              className="h-40 w-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-500">
              Drag & drop cover image here or click to upload
            </p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleImage(e.target.files[0])}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-red-700 text-white hover:bg-red-500"
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
