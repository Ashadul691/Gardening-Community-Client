import { useLoaderData, Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { useState } from "react";

const BrowseTips = () => {
  const data = useLoaderData();
  const allTips = Array.isArray(data) ? data : [];
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredTips =
    selectedDifficulty === "All"
      ? allTips
      : allTips.filter((tip) => tip.difficultyLevel === selectedDifficulty);

  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-4">
          Browse Gardening Tips
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover valuable insights and practical advice from our gardening community
        </p>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-8 flex items-center justify-center gap-4 flex-wrap">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          Filter by Difficulty:
        </span>
        {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedDifficulty === difficulty
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-gray-700"
            }`}
          >
            {difficulty}
          </button>
        ))}
      </div>

      {filteredTips.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            No tips found with this difficulty level.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-600 dark:bg-green-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Difficulty</th>
                  <th className="px-6 py-4 text-left">Plant Type</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTips.map((tip, index) => (
                  <tr
                    key={tip._id}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-700"
                        : "bg-white dark:bg-gray-800"
                    } hover:bg-green-50 dark:hover:bg-gray-600 transition`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={tip.imageUrl}
                        alt={tip.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                      {tip.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                        {tip.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          tip.difficultyLevel === "Easy"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : tip.difficultyLevel === "Medium"
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                            : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {tip.difficultyLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {tip.plantType}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/tips/${tip._id}`}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        <Eye className="w-4 h-4" />
                        See More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Total Count */}
      {filteredTips.length > 0 && (
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          Showing {filteredTips.length} {filteredTips.length === 1 ? "tip" : "tips"}
          {selectedDifficulty !== "All" && ` with ${selectedDifficulty} difficulty`}
        </div>
      )}
    </div>
  );
};

export default BrowseTips;