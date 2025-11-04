import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";


const CreatePost = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    schedule: "",
    status: "Scheduled",
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { id: Date.now(), ...formData };
    setPosts([...posts, newPost]);
    setFormData({
      title: "",
      platform: "",
      schedule: "",
      status: "Scheduled",
    });
    alert("✅ Post scheduled successfully!");
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-pink-100 text-gray-800 py-16 px-8 mt-18 relative overflow-hidden">
      {/* Decorative blur orbs for glow effect */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 opacity-25 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-13 pt-6 text-center flex items-center justify-center gap-3">
          <FaPen className="text-purple-800" />
          Create Post
        </h1>


        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-purple-800 mb-10 text-center">
            Add a new Post
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-lg mx-auto"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Platform
              </label>
              <select
                id="platform"
                value={formData.platform}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">---Select---</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube">YouTube</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Scheduled At
              </label>
              <input
                type="datetime-local"
                id="schedule"
                value={formData.schedule}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">---select---</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Published">Published</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-purple-700 text-white py-3 px-8 rounded-lg hover:bg-purple-800 transition w-full"
            >
              Schedule Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
