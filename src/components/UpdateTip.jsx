import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Edit, Leaf } from "lucide-react";
import Swal from "sweetalert2";

const UpdateTip = () => {
  const tipData = useLoaderData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => ({
    _id: tipData?._id ?? "",
    title: tipData?.title ?? "",
    plantType: tipData?.plantType ?? "",
    difficultyLevel: tipData?.difficultyLevel ?? "Easy",
    description: tipData?.description ?? "",
    imageUrl: tipData?.imageUrl ?? "",
    category: tipData?.category ?? "Composting",
    availability: tipData?.availability ?? "Public"
  }));

  // If loader data updates (HMR or navigation), sync the form
  useEffect(() => {
    if (tipData && tipData._id && tipData._id !== formData._id) {
      setFormData({
        _id: tipData._id,
        title: tipData.title ?? "",
        plantType: tipData.plantType ?? "",
        difficultyLevel: tipData.difficultyLevel ?? "Easy",
        description: tipData.description ?? "",
        imageUrl: tipData.imageUrl ?? "",
        category: tipData.category ?? "Composting",
        availability: tipData.availability ?? "Public"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipData]);

  const categories = [
    "Composting",
    "Plant Care",
    "Vertical Gardening",
    "Hydroponics",
    "Balcony Gardens",
    "Pest Control",
    "Organic Gardening"
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const updatedTip = {
  //     ...formData,
  //     userName: tipData.userName,
  //     userEmail: tipData.userEmail,
  //     createdAt: tipData.createdAt,
  //     totalLiked: tipData.totalLiked || 0,
  //     updatedAt: new Date().toISOString()
  //   };

  //   const url = `http://localhost:5000/tips/${tipData._id}`;
  //   console.log('UpdateTip submit', { url, updatedTip });

  //   fetch(url, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedTip)
  //   })
  //     .then(async (res) => {
  //       const data = await res.json().catch(() => null);
  //       if (res.ok) {
  //         // Accept several success shapes returned by different backends
  //         const success =
  //           (data && (data.modifiedCount > 0 || data.upsertedCount > 0 || data.matchedCount > 0)) ||
  //           (data && data.acknowledged) ||
  //           res.status === 200 ||
  //           res.status === 201;

  //         if (success) {
  //           Swal.fire({
  //             title: "Success!",
  //             text: "Your tip has been updated successfully!",
  //             icon: "success",
  //             confirmButtonColor: "#16a34a"
  //           });
  //           navigate("/my-tips");
  //           return;
  //         }
  //       }

  //       console.error('Update failed', res.status, data);
  //       Swal.fire({
  //         title: "Error!",
  //         text: data?.message || "Failed to update tip. Please try again.",
  //         icon: "error",
  //         confirmButtonColor: "#dc2626"
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Network or parsing error', error);
  //       Swal.fire({
  //         title: "Error!",
  //         text: "Failed to update tip due to network error. Please try again.",
  //         icon: "error",
  //         confirmButtonColor: "#dc2626"
  //       });
  //     });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTip = {
      title: formData.title,
      plantType: formData.plantType,
      difficultyLevel: formData.difficultyLevel,
      description: formData.description,
      imageUrl: formData.imageUrl,
      category: formData.category,
      availability: formData.availability,
      userName: tipData.userName,
      userEmail: tipData.userEmail,
      createdAt: tipData.createdAt,
      totalLiked: tipData.totalLiked || 0,
      updatedAt: new Date().toISOString()
    };

    // Don't include _id in the body
    const url = `http://localhost:5000/tips/${tipData._id}`;
    console.log('Submitting update to:', url);
    console.log('Update data:', updatedTip);

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTip)
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('Response status:', res.status);
        console.log('Response data:', data);
        
        if (res.ok && data.success) {
          Swal.fire({
            title: "Success!",
            text: "Your tip has been updated successfully!",
            icon: "success",
            confirmButtonColor: "#16a34a"
          });
          navigate("/my-tips");
        } else {
          throw new Error(data.message || 'Update failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to update tip. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626"
        });
      });
  };

  if (!tipData || !tipData._id) {
    return (
      <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
        <p className="text-center text-gray-600 dark:text-gray-300">Loading tip data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
            <Edit className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-4">
            Update Garden Tip
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Edit your gardening tip information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
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
              placeholder="Share your gardening tip in detail..."
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Read-only user info */}
          <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <strong>Posted by:</strong> {tipData.userName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {tipData.userEmail}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Leaf className="w-6 h-6" />
              Update Tip
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-tips")}
              className="px-8 bg-gray-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTip;