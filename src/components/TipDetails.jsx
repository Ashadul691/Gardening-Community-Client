import { useLoaderData, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Mail, Heart, Leaf } from "lucide-react";

const TipDetails = () => {
  const tip = useLoaderData();
  const navigate = useNavigate();

  if (!tip || !tip._id) {
    return (
      <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
        <p className="text-center text-gray-600 dark:text-gray-300">Loading tip details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/tips")}
          className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to All Tips</span>
        </button>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Image Section */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={tip.imageUrl}
              alt={tip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                  tip.difficultyLevel === "Easy"
                    ? "bg-blue-500 text-white"
                    : tip.difficultyLevel === "Medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {tip.difficultyLevel}
              </span>
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {tip.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Title and Plant Type */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-3">
                {tip.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-lg font-semibold">{tip.plantType}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                {tip.description}
              </p>
            </div>

            {/* Author Information */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Author Information
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Name:</strong> {tip.userName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> {tip.userEmail}
                  </span>
                </div>
                {tip.createdAt && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Posted:</strong>{" "}
                      {new Date(tip.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {tip.totalLiked !== undefined && (
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Likes:</strong> {tip.totalLiked}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;