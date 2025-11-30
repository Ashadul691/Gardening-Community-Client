import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Trash2, Edit, Plus, Eye } from "lucide-react";
import Swal from "sweetalert2";

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/tips/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setTips(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/tips/${id}`, {
          method: "DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setTips(tips.filter((tip) => tip._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your tip has been deleted.",
                icon: "success",
                confirmButtonColor: "#16a34a"
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete tip.",
              icon: "error",
              confirmButtonColor: "#dc2626"
            });
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-4">My Garden Tips</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Manage all the gardening tips you've shared with the community
        </p>
      </div>

      {tips.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-green-100 dark:bg-green-900 rounded-full mb-6">
            <Plus className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            No Tips Yet
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            You haven't shared any gardening tips yet. Start sharing your knowledge with the community!
          </p>
          <Link
            to="/share-tip"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            Share Your First Tip
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              You have shared <span className="font-bold text-green-600 dark:text-green-400">{tips.length}</span> {tips.length === 1 ? "tip" : "tips"}
            </p>
            <Link
              to="/share-tip"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add New Tip
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-600 dark:bg-green-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Image</th>
                    <th className="px-6 py-4 text-left">Title</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Likes</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tips.map((tip, index) => (
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
                            tip.availability === "Public"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {tip.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
                        ❤️ {tip.totalLiked || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/tips/${tip._id}`}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          

                          <Link
                              to={`/tips/${tip._id}/edit`}
                              className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                              title="Update"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>

                          <button
                            onClick={() => handleDelete(tip._id, tip.title)}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTips;