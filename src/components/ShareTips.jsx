import { Leaf, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const ShareTip = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficultyLevel: "Easy",
    description: "",
    imageUrl: "",
    category: "Plant Care",
    availability: "Public"
  });

  const categories = [
    "Composting",
    "Plant Care",
    "Vertical Gardening",
    "Hydroponics",
    "Balcony Gardens",
    "Pest Control",
    "Organic Gardening"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTip = {
      ...formData,
      userName: user.displayName,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
      totalLiked: 0
    };

    fetch("https://gardening-community-server-five.vercel.app/tips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTip)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your gardening tip has been shared with the community!",
            icon: "success",
            confirmButtonColor: "#16a34a"
          });
          navigate("/my-tips");
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to share tip. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626"
        });
      });
  };

  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <Plus className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-4">
            Share a Garden Tip
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Help fellow gardeners by sharing your knowledge and experience
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
              Tip Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., How to Make Compost at Home"
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
              Plant Type/Topic *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Tomatoes, Roses, Indoor Plants"
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              value={formData.plantType}
              onChange={(e) =>
                setFormData({ ...formData, plantType: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
                Difficulty Level *
              </label>
              <select
                className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                value={formData.difficultyLevel}
                onChange={(e) =>
                  setFormData({ ...formData, difficultyLevel: e.target.value })
                }
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
                Category *
              </label>
              <select
                className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
              Image URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
              Availability *
            </label>
            <select
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
            >
              <option>Public</option>
              <option>Hidden</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
              Description *
            </label>
            <textarea
              required
              rows={8}
              placeholder="Share your gardening tip in detail... Include steps, materials needed, and any helpful advice."
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {formData.description.length} characters
            </p>
          </div>

          {/* Read-only user info */}
          <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <strong>Posted by:</strong> {user.displayName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Leaf className="w-6 h-6" />
            Share Tip with Community
          </button>
        </div>

        <div className="mt-8 bg-green-50 dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-lg p-6">
          <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 text-lg">
            💡 Tips for Writing Great Garden Tips:
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Be specific and detailed</li>
            <li>• Include step-by-step instructions when applicable</li>
            <li>• Share what worked for you and why</li>
            <li>• Mention any challenges and how you overcame them</li>
            <li>• Use clear, easy-to-understand language</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShareTip;