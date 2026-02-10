import { useState } from "react";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { CreateBlogForm } from "./components/CreateBlogForm";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-10">
      {/* HEADER */}

      <div className="relative flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">
          Blog<span className="text-[#ffde00] text-4xl">L</span>y
        </h1>

        <div className="flex items-center gap-3">
          <CreateBlogForm />

          {/* MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-xl px-3 py-2 rounded-lg hover:bg-slate-100"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {/* DROPDOWN MENU */}
        {menuOpen && (
          <div
            className="absolute right-0 top-14 w-56 bg-white border rounded-xl shadow-lg p-4 z-50"
            onMouseLeave={() => setMenuOpen(false)}
          >
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">
              Connect
            </p>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/anjali-pandey-28"
                  target="_blank"
                  className="block px-3 py-2 rounded hover:bg-slate-100"
                >
                  <FaGithub className="inline mr-2" size={24} /> GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/anjali-pandey-36b757381/"
                  target="_blank"
                  className="block px-3 py-2 rounded hover:bg-slate-100"
                >
                  <FaLinkedin className="inline mr-2" size={24} /> LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="mailto:pandeyanjali.2807@gmail.com"
                  className="block px-3 py-2 rounded hover:bg-slate-100"
                >
                  <MdEmail className="inline mr-2" size={24} /> Email
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mt-6 md:mt-10">
        {/* BLOG LIST */}
        <div
          className={`
            md:col-span-4 md:border-r md:pr-5
            ${selectedId ? "hidden md:block" : "block"}
          `}
        >
          <BlogList onSelect={setSelectedId} />
        </div>

        {/* BLOG DETAIL */}
        <div
          className={`
            md:col-span-8
            ${!selectedId ? "hidden md:block" : "block"}
          `}
        >
          {selectedId ? (
            <>
              {/* MOBILE BACK BUTTON */}
              <button
                className="mb-4 text-sm text-blue-600 md:hidden"
                onClick={() => setSelectedId(null)}
              >
                ← Back to blogs
              </button>

              <BlogDetail id={selectedId} />
            </>
          ) : (
            <div className="hidden md:block pt-16">
              <div className="max-w-md mx-auto border-2 border-dashed border-slate-300 rounded-2xl px-10 py-12 text-center bg-slate-50">
                <p className="text-3xl font-semibold text-slate-700">
                  Select a blog to view
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Click a post from the list on the left
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}