import { useState } from "react";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { CreateBlogForm } from "./components/CreateBlogForm";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <div className="flex justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">CA Monk Blog</h1>
        <CreateBlogForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-10">
        <div className="md:col-span-4 border-r pr-5">
          <BlogList onSelect={setSelectedId} />
        </div>
        <div className="md:col-span-8">
          {selectedId ? (
            <BlogDetail id={selectedId} />
          ) : (
            <p>Select a blog to view</p>
          )}
        </div>
      </div>
    </div>
  );
}