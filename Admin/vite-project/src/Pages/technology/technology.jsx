
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createTechApi,
  getTechApi,
  updateTechApi,
  deleteTechApi,
  getCategoriesApi,
} from "./TechnoApi";

const Technology = () => {
  const [techs, setTechs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(false);           // for form submit
  const [tableLoading, setTableLoading] = useState(true);  // for initial fetch
  const [deleteLoading, setDeleteLoading] = useState({});  // per row delete

  // Fetch Tech Data
  const fetchTech = async () => {
    try {
      setTableLoading(true);
      const res = await getTechApi();
      setTechs(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load tech news");
    } finally {
      setTableLoading(false);
    }
  };

  // Fetch Categories + Tech on mount
  useEffect(() => {
    fetchTech();

    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data?.data || []);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Already submitting → prevent multiple calls
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      if (editId) {
        await updateTechApi(editId, formData);
        toast.success("Tech news updated successfully!");
        setEditId(null);
      } else {
        await createTechApi(formData);
        toast.success("Tech news created successfully!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setImages([]);

      fetchTech();
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditId(row._id);
    setTitle(row.title);
    setDescription(row.description);
    setCategory(row.category?._id || row.category);
    toast.info("Now editing: " + row.title);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    if (deleteLoading[id]) return; // prevent multiple clicks

    setDeleteLoading((prev) => ({ ...prev, [id]: true }));

    try {
      await deleteTechApi(id);
      toast.success("Deleted successfully");
      fetchTech();
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // DataTable Columns
  const columns = useMemo(
    () => [
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row.category?.name || "No Category",
      },
      {
        name: "Images",
        cell: (row) => (
          <div className="flex gap-2 flex-wrap">
            {row.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="tech"
                className="w-12 h-12 object-cover rounded shadow-sm"
              />
            ))}
          </div>
        ),
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row)}
              disabled={loading || deleteLoading[row._id]}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row._id)}
              disabled={loading || deleteLoading[row._id]}
              className={`px-3 py-1 rounded text-white transition flex items-center gap-2 ${
                deleteLoading[row._id]
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {deleteLoading[row._id] ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        ),
      },
    ],
    [loading, deleteLoading]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg mb-10 space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editId ? "Update Tech News" : "Add New Tech News"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
          required
          disabled={loading}
        />

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium text-white transition duration-200 flex items-center justify-center gap-2 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              {editId ? "Updating..." : "Creating..."}
            </>
          ) : editId ? (
            "Update News"
          ) : (
            "Create News"
          )}
        </button>
      </form>

      {/* DATA TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {tableLoading ? (
          <div className="p-10 flex justify-center items-center min-h-[300px]">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
              <p className="text-gray-600">Loading tech news...</p>
            </div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={techs}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noDataComponent="No tech news found"
          />
        )}
      </div>
    </div>
  );
};

export default Technology;