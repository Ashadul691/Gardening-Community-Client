import { useLoaderData } from "react-router-dom";
import { Users, MapPin, Star, Leaf } from "lucide-react";

const ExploreGardeners = () => {
  const data = useLoaderData();
  const gardeners = Array.isArray(data) ? data : [];

  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-4">
          Explore Local Gardeners
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect with experienced gardeners in your community and learn from their expertise
        </p>
      </div>

      {gardeners.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            No gardeners found yet. Be the first to join!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardeners.map((gardener) => (
            <div
              key={gardener._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 h-32"></div>
              <div className="p-6 -mt-16 relative">
                <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                  {gardener.photoURL ? (
                    <img
                      src={gardener.photoURL}
                      alt={gardener.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Users className="w-12 h-12 text-green-600 dark:text-green-400" />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-center mb-2 text-green-700 dark:text-green-400">
                  {gardener.name}
                </h3>

                {/* Age, Gender, Status */}
                <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {gardener.age} years
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {gardener.gender}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {gardener.status}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{gardener.location}</span>
                </div>

                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-3 mb-3">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 text-center">
                    🌱 {gardener.specialty}
                  </p>
                </div>

                {/* Experience */}
                <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-3 mb-3">
                  <p className="text-sm text-center text-purple-700 dark:text-purple-300">
                    <strong>{gardener.experience}</strong> years of experience
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
                  {gardener.bio}
                </p>

                {/* Total Shared Tips */}
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <Leaf className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-700 dark:text-blue-300 font-bold">
                      {gardener.totalSharedTips || 0} Tips Shared
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (gardener.rating || 5) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreGardeners;