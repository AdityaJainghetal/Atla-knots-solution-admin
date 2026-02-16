

import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getProductsApi,
  deleteHomeApi,
  updateHomeApi,
} from "./product.api";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductsApi();
      const data = res.data?.data || res.data || [];
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openEditModal = (product) => {
    setEditData(product);
    setPreviewImage(product.images?.[0] || "");
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("description", editData.description);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await updateHomeApi(editData._id, formData);

      toast.success("Product updated successfully");
      setIsModalOpen(false);
      await fetchProducts();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "No.",
        id: "serial",
        enableSorting: false,
        cell: ({ row, table }) => {
          const pageIndex = table.getState().pagination.pageIndex;
          const pageSize = table.getState().pagination.pageSize;
          return pageIndex * pageSize + row.index + 1;
        },
      },
      {
        accessorKey: "images",
        header: "Image",
        enableSorting: false,
        cell: ({ row }) => {
          const img = row.original.images?.[0];
          return img ? (
            <img
              src={img}
              alt="product"
              className="w-14 h-14 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
              No Img
            </div>
          );
        },
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => openEditModal(row.original)}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={async () => {
                if (!window.confirm("Delete this product?")) return;
                try {
                  setLoading(true);
                  await deleteHomeApi(row.original._id);
                  toast.success("Deleted successfully");
                  await fetchProducts();
                } catch (err) {
                  toast.error("Delete failed");
                } finally {
                  setLoading(false);
                }
              }}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter, sorting },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800">
            Product Management
            {loading && (
              <span className="ml-3 text-blue-600 text-lg animate-pulse">
                loading...
              </span>
            )}
          </h1>
        </div>

        {/* Table area with spinner */}
        <div className="relative overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading products...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              No products found.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="py-3 px-4 text-left">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl z-10">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <input
              type="text"
              value={editData?.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Product Name"
              disabled={loading}
            />

            <textarea
              value={editData?.description || ""}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Description"
              disabled={loading}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded mb-3"
              disabled={loading}
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                className="w-24 h-24 object-cover rounded mb-3 border"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
