

// // // // // import { useEffect, useMemo, useState } from "react";
// // // // // import DataTable from "react-data-table-component";
// // // // // import {
// // // // //   getProductsApi,
// // // // //   updateHomeApi,
// // // // //   deleteHomeApi,
// // // // // } from "./product.api";

// // // // // const ProductList = () => {
// // // // //   const [products, setProducts] = useState([]);
// // // // //   const [filteredProducts, setFilteredProducts] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [selectedRows, setSelectedRows] = useState([]);
// // // // //   const [clearRows, setClearRows] = useState(false);
// // // // //   const [editingProduct, setEditingProduct] = useState(null);

// // // // //   // ================= GET =================
// // // // //   const fetchProducts = async () => {
// // // // //     try {
// // // // //       const res = await getProductsApi();
// // // // //       const data = res.data.data || res.data;
// // // // //       setProducts(data);
// // // // //       setFilteredProducts(data);
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       alert("Failed to fetch data");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchProducts();
// // // // //   }, []);

// // // // //   // ================= SEARCH =================
// // // // //   useEffect(() => {
// // // // //     const result = products.filter((item) =>
// // // // //       item.name?.toLowerCase().includes(search.toLowerCase())
// // // // //     );
// // // // //     setFilteredProducts(result);
// // // // //   }, [search, products]);

// // // // //   // ================= UPDATE =================
// // // // //   const handleUpdate = async () => {
// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("name", editingProduct.name);
// // // // //       formData.append("description", editingProduct.description);

// // // // //       // if new image selected
// // // // //       if (editingProduct.newImage) {
// // // // //         formData.append("image", editingProduct.newImage);
// // // // //       }

// // // // //       await updateHomeApi(editingProduct._id, formData);

// // // // //       alert("Updated Successfully");
// // // // //       setEditingProduct(null);
// // // // //       fetchProducts();
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       alert("Update Failed");
// // // // //     }
// // // // //   };

// // // // //   // ================= DELETE =================
// // // // //   const handleDelete = async (id) => {
// // // // //     if (!window.confirm("Are you sure to delete?")) return;
// // // // //     try {
// // // // //       await deleteHomeApi(id);
// // // // //       fetchProducts();
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       alert("Delete Failed");
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteSelected = async () => {
// // // // //     if (!window.confirm("Delete selected products?")) return;
// // // // //     try {
// // // // //       for (let row of selectedRows) {
// // // // //         await deleteHomeApi(row._id);
// // // // //       }
// // // // //       setClearRows(!clearRows);
// // // // //       fetchProducts();
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       alert("Bulk Delete Failed");
// // // // //     }
// // // // //   };

// // // // //   // ================= TABLE COLUMNS =================
// // // // //   const columns = useMemo(
// // // // //     () => [
// // // // //       {
// // // // //         name: "Image",
// // // // //         cell: (row) => (
// // // // //           <img
// // // // //             src={row.images?.[0]}
// // // // //             alt="product"
// // // // //             className="w-16 h-16 object-cover rounded"
// // // // //           />
// // // // //         ),
// // // // //       },
// // // // //       {
// // // // //         name: "Product",
// // // // //         selector: (row) => row.name,
// // // // //         sortable: true,
// // // // //       },
// // // // //       {
// // // // //         name: "Description",
// // // // //         selector: (row) => row.description,
// // // // //         wrap: true,
// // // // //       },
// // // // //       {
// // // // //         name: "Actions",
// // // // //         cell: (row) => (
// // // // //           <div className="flex gap-2">
// // // // //             <button
// // // // //               onClick={() => setEditingProduct(row)}
// // // // //               className="px-3 py-1 bg-blue-500 text-white rounded"
// // // // //             >
// // // // //               Edit
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => handleDelete(row._id)}
// // // // //               className="px-3 py-1 bg-red-500 text-white rounded"
// // // // //             >
// // // // //               Delete
// // // // //             </button>
// // // // //           </div>
// // // // //         ),
// // // // //       },
// // // // //     ],
// // // // //     [selectedRows]
// // // // //   );

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-100 p-10">
// // // // //       <div className="bg-white p-6 rounded-xl shadow-lg">

// // // // //         <div className="flex justify-between mb-4">
// // // // //           <h2 className="text-xl font-bold">Product Management</h2>

// // // // //           {selectedRows.length > 0 && (
// // // // //             <button
// // // // //               onClick={handleDeleteSelected}
// // // // //               className="bg-red-600 text-white px-4 py-2 rounded"
// // // // //             >
// // // // //               Delete Selected ({selectedRows.length})
// // // // //             </button>
// // // // //           )}
// // // // //         </div>

// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search..."
// // // // //           className="border px-3 py-2 rounded mb-4 w-64"
// // // // //           value={search}
// // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // //         />

// // // // //         <DataTable
// // // // //           columns={columns}
// // // // //           data={filteredProducts}
// // // // //           progressPending={loading}
// // // // //           pagination
// // // // //           selectableRows
// // // // //           highlightOnHover
// // // // //           striped
// // // // //           responsive
// // // // //           clearSelectedRows={clearRows}
// // // // //           onSelectedRowsChange={({ selectedRows }) =>
// // // // //             setSelectedRows(selectedRows)
// // // // //           }
// // // // //         />
// // // // //       </div>

// // // // //       {/* ================= EDIT MODAL ================= */}
// // // // //       {editingProduct && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
// // // // //           <div className="bg-white p-6 rounded-xl w-96">
// // // // //             <h3 className="text-lg font-bold mb-4">Edit Product</h3>

// // // // //             {/* Current Image */}
// // // // //             <img
// // // // //               src={editingProduct.images?.[0]}
// // // // //               alt="preview"
// // // // //               className="w-24 h-24 object-cover mb-3 rounded"
// // // // //             />

// // // // //             <input
// // // // //               type="file"
// // // // //               onChange={(e) =>
// // // // //                 setEditingProduct({
// // // // //                   ...editingProduct,
// // // // //                   newImage: e.target.files[0],
// // // // //                 })
// // // // //               }
// // // // //               className="mb-3"
// // // // //             />

// // // // //             <input
// // // // //               type="text"
// // // // //               value={editingProduct.name}
// // // // //               onChange={(e) =>
// // // // //                 setEditingProduct({
// // // // //                   ...editingProduct,
// // // // //                   name: e.target.value,
// // // // //                 })
// // // // //               }
// // // // //               className="w-full border px-3 py-2 mb-3 rounded"
// // // // //             />

// // // // //             <textarea
// // // // //               value={editingProduct.description}
// // // // //               onChange={(e) =>
// // // // //                 setEditingProduct({
// // // // //                   ...editingProduct,
// // // // //                   description: e.target.value,
// // // // //                 })
// // // // //               }
// // // // //               className="w-full border px-3 py-2 mb-3 rounded"
// // // // //             />

// // // // //             <div className="flex justify-end gap-2">
// // // // //               <button
// // // // //                 onClick={() => setEditingProduct(null)}
// // // // //                 className="px-4 py-2 bg-gray-400 text-white rounded"
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>

// // // // //               <button
// // // // //                 onClick={handleUpdate}
// // // // //                 className="px-4 py-2 bg-green-600 text-white rounded"
// // // // //               >
// // // // //                 Update
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ProductList;


// // // // // ProductTable.jsx
// // // // import { useMemo, useState } from "react";
// // // // import {
// // // //   useReactTable,
// // // //   getCoreRowModel,
// // // //   getFilteredRowModel,
// // // //   getPaginationRowModel,
// // // //   getSortedRowModel,
// // // //   flexRender,
// // // // } from "@tanstack/react-table";

// // // // import { ToastContainer, toast } from "react-toastify";
// // // // import "react-toastify/dist/ReactToastify.css";

// // // // import {
// // // //   getProductsApi,
// // // //   updateHomeApi,
// // // //   deleteHomeApi,
// // // // } from "./product.api"; // your api file

// // // // export default function ProductTable() {
// // // //   const [products, setProducts] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [globalFilter, setGlobalFilter] = useState("");
// // // //   const [rowSelection, setRowSelection] = useState({});

// // // //   // Fetch products
// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await getProductsApi();
// // // //       const data = res.data?.data || res.data || [];
// // // //       setProducts(data);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       toast.error("Failed to load products");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useMemo(() => {
// // // //     fetchProducts();
// // // //   }, []);

// // // //   // Columns definition
// // // //   const columns = useMemo(
// // // //     () => [
// // // //       {
// // // //         id: "select",
// // // //         header: ({ table }) => (
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={table.getIsAllPageRowsSelected()}
// // // //             onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
// // // //           />
// // // //         ),
// // // //         cell: ({ row }) => (
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={row.getIsSelected()}
// // // //             onChange={(e) => row.toggleSelected(!!e.target.checked)}
// // // //           />
// // // //         ),
// // // //         enableSorting: false,
// // // //       },
// // // //       {
// // // //         accessorKey: "images",
// // // //         header: "Image",
// // // //         cell: ({ row }) => {
// // // //           const img = row.original.images?.[0];
// // // //           return img ? (
// // // //             <img
// // // //               src={img}
// // // //               alt="product"
// // // //               className="w-14 h-14 object-cover rounded-md border"
// // // //               onError={(e) => (e.target.src = "https://via.placeholder.com/56?text=?")}
// // // //             />
// // // //           ) : (
// // // //             <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
// // // //               No Img
// // // //             </div>
// // // //           );
// // // //         },
// // // //       },
// // // //       {
// // // //         accessorKey: "name",
// // // //         header: "Product Name",
// // // //       },
// // // //       {
// // // //         accessorKey: "description",
// // // //         header: "Description",
// // // //         cell: ({ getValue }) => (
// // // //           <div className="max-w-xs truncate" title={getValue()}>
// // // //             {getValue() || "-"}
// // // //           </div>
// // // //         ),
// // // //       },
// // // //       {
// // // //         id: "actions",
// // // //         header: "Actions",
// // // //         cell: ({ row }) => (
// // // //           <div className="flex gap-2">
// // // //             <button
// // // //               onClick={() => alert("Edit coming soon...")} // ← replace with your modal logic
// // // //               className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
// // // //             >
// // // //               Edit
// // // //             </button>
// // // //             <button
// // // //               onClick={async () => {
// // // //                 if (!window.confirm("Delete this product?")) return;
// // // //                 try {
// // // //                   await deleteHomeApi(row.original._id);
// // // //                   toast.success("Deleted successfully");
// // // //                   fetchProducts();
// // // //                 } catch (err) {
// // // //                   toast.error("Delete failed");
// // // //                 }
// // // //               }}
// // // //               className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
// // // //             >
// // // //               Delete
// // // //             </button>
// // // //           </div>
// // // //         ),
// // // //       },
// // // //     ],
// // // //     []
// // // //   );

// // // //   const table = useReactTable({
// // // //     data: products,
// // // //     columns,
// // // //     state: {
// // // //       globalFilter,
// // // //       rowSelection,
// // // //     },
// // // //     enableRowSelection: true,
// // // //     onGlobalFilterChange: setGlobalFilter,
// // // //     onRowSelectionChange: setRowSelection,
// // // //     getCoreRowModel: getCoreRowModel(),
// // // //     getFilteredRowModel: getFilteredRowModel(),
// // // //     getSortedRowModel: getSortedRowModel(),
// // // //     getPaginationRowModel: getPaginationRowModel(),
// // // //   });

// // // //   const selectedCount = table.getSelectedRowModel().flatRows.length;

// // // //   const handleBulkDelete = async () => {
// // // //     if (selectedCount === 0) return;
// // // //     if (!window.confirm(`Delete ${selectedCount} products?`)) return;

// // // //     try {
// // // //       const promises = table
// // // //         .getSelectedRowModel()
// // // //         .flatRows.map((row) => deleteHomeApi(row.original._id));

// // // //       await Promise.all(promises);
// // // //       toast.success(`${selectedCount} products deleted`);
// // // //       table.resetRowSelection();
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       toast.error("Some deletes failed");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
// // // //       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border">

// // // //         {/* Header */}
// // // //         <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //           <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>

// // // //           {selectedCount > 0 && (
// // // //             <button
// // // //               onClick={handleBulkDelete}
// // // //               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
// // // //             >
// // // //               Delete Selected ({selectedCount})
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         {/* Search */}
// // // //         <div className="p-6 pb-4">
// // // //           <input
// // // //             placeholder="Search by name..."
// // // //             value={globalFilter ?? ""}
// // // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // // //             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //           />
// // // //         </div>

// // // //         {/* Table */}
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full text-sm text-left">
// // // //             <thead className="bg-gray-100 text-gray-700">
// // // //               {table.getHeaderGroups().map((headerGroup) => (
// // // //                 <tr key={headerGroup.id}>
// // // //                   {headerGroup.headers.map((header) => (
// // // //                     <th
// // // //                       key={header.id}
// // // //                       className="px-6 py-4 font-medium cursor-pointer select-none"
// // // //                       onClick={header.column.getToggleSortingHandler()}
// // // //                     >
// // // //                       {flexRender(
// // // //                         header.column.columnDef.header,
// // // //                         header.getContext()
// // // //                       )}
// // // //                       {{
// // // //                         asc: " ↑",
// // // //                         desc: " ↓",
// // // //                       }[header.column.getIsSorted()] ?? null}
// // // //                     </th>
// // // //                   ))}
// // // //                 </tr>
// // // //               ))}
// // // //             </thead>

// // // //             <tbody>
// // // //               {loading ? (
// // // //                 <tr>
// // // //                   <td colSpan={columns.length} className="text-center py-20 text-gray-500">
// // // //                     Loading products...
// // // //                   </td>
// // // //                 </tr>
// // // //               ) : table.getRowModel().rows.length === 0 ? (
// // // //                 <tr>
// // // //                   <td colSpan={columns.length} className="text-center py-20 text-gray-500">
// // // //                     No products found {globalFilter && `for "${globalFilter}"`}
// // // //                   </td>
// // // //                 </tr>
// // // //               ) : (
// // // //                 table.getRowModel().rows.map((row) => (
// // // //                   <tr
// // // //                     key={row.id}
// // // //                     className={`border-b hover:bg-gray-50 transition-colors ${
// // // //                       row.getIsSelected() ? "bg-blue-50" : ""
// // // //                     }`}
// // // //                   >
// // // //                     {row.getVisibleCells().map((cell) => (
// // // //                       <td key={cell.id} className="px-6 py-4">
// // // //                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
// // // //                       </td>
// // // //                     ))}
// // // //                   </tr>
// // // //                 ))
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         {/* Pagination */}
// // // //         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t text-sm text-gray-600">
// // // //           <div>
// // // //             Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
// // // //             {Math.min(
// // // //               (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
// // // //               table.getFilteredRowModel().rows.length
// // // //             )}{" "}
// // // //             of {table.getFilteredRowModel().rows.length} products
// // // //           </div>

// // // //           <div className="flex items-center gap-3">
// // // //             <button
// // // //               onClick={() => table.previousPage()}
// // // //               disabled={!table.getCanPreviousPage()}
// // // //               className="px-4 py-2 border rounded disabled:opacity-40"
// // // //             >
// // // //               Previous
// // // //             </button>

// // // //             <span>
// // // //               Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
// // // //             </span>

// // // //             <button
// // // //               onClick={() => table.nextPage()}
// // // //               disabled={!table.getCanNextPage()}
// // // //               className="px-4 py-2 border rounded disabled:opacity-40"
// // // //             >
// // // //               Next
// // // //             </button>

// // // //             <select
// // // //               value={table.getState().pagination.pageSize}
// // // //               onChange={(e) => table.setPageSize(Number(e.target.value))}
// // // //               className="border rounded px-3 py-1.5"
// // // //             >
// // // //               {[10, 20, 30, 50].map((size) => (
// // // //                 <option key={size} value={size}>
// // // //                   {size} rows
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <ToastContainer position="top-right" autoClose={4000} theme="colored" limit={3} />
// // // //     </div>
// // // //   );
// // // // }

// // // // ProductTable.jsx
// // // import { useEffect, useMemo, useState } from "react";
// // // import {
// // //   useReactTable,
// // //   getCoreRowModel,
// // //   getFilteredRowModel,
// // //   getPaginationRowModel,
// // //   getSortedRowModel,
// // //   flexRender,
// // // } from "@tanstack/react-table";

// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // import { getProductsApi, deleteHomeApi } from "./product.api";

// // // export default function ProductTable() {
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [globalFilter, setGlobalFilter] = useState("");
// // //   const [sorting, setSorting] = useState([]);

// // //   // Fetch
// // //   const fetchProducts = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await getProductsApi();
// // //       const data = res.data?.data || res.data || [];
// // //       setProducts(data);
// // //     } catch (err) {
// // //       toast.error("Failed to load products");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // Columns
// // //   const columns = useMemo(
// // //     () => [
// // //       {
// // //         accessorKey: "images",
// // //         header: "Image",
// // //         enableSorting: false,
// // //         cell: ({ row }) => {
// // //           const img = row.original.images?.[0];
// // //           return img ? (
// // //             <img
// // //               src={img}
// // //               alt="product"
// // //               className="w-14 h-14 object-cover rounded-md border"
// // //             />
// // //           ) : (
// // //             <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
// // //               No Img
// // //             </div>
// // //           );
// // //         },
// // //       },
// // //       {
// // //         accessorKey: "name",
// // //         header: "Product Name",
// // //       },
// // //       {
// // //         accessorKey: "description",
// // //         header: "Description",
// // //         cell: ({ getValue }) => (
// // //           <div className="max-w-xs truncate">
// // //             {getValue() || "-"}
// // //           </div>
// // //         ),
// // //       },
// // //       {
// // //         id: "actions",
// // //         header: "Actions",
// // //         enableSorting: false,
// // //         cell: ({ row }) => (
// // //           <button
// // //             onClick={async () => {
// // //               if (!window.confirm("Delete this product?")) return;
// // //               await deleteHomeApi(row.original._id);
// // //               toast.success("Deleted successfully");
// // //               fetchProducts();
// // //             }}
// // //             className="px-3 py-1 bg-red-600 text-white text-sm rounded"
// // //           >
// // //             Delete
// // //           </button>
// // //         ),
// // //       },
// // //     ],
// // //     []
// // //   );

// // //   const table = useReactTable({
// // //     data: products,
// // //     columns,
// // //     state: { globalFilter, sorting },
// // //     onSortingChange: setSorting,
// // //     onGlobalFilterChange: setGlobalFilter,
// // //     getCoreRowModel: getCoreRowModel(),
// // //     getFilteredRowModel: getFilteredRowModel(),
// // //     getSortedRowModel: getSortedRowModel(),
// // //     getPaginationRowModel: getPaginationRowModel(),
// // //   });

// // //   return (
// // //     <div className="p-8 bg-gray-50 min-h-screen">
// // //       <div className="bg-white rounded-xl shadow border">

// // //         {/* Header */}
// // //         <div className="p-6 border-b">
// // //           <h1 className="text-2xl font-bold">
// // //             Product Management
// // //           </h1>
// // //         </div>

// // //         {/* Search */}
// // //         <div className="p-6">
// // //           <input
// // //             placeholder="Search..."
// // //             value={globalFilter ?? ""}
// // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // //             className="border px-4 py-2 rounded w-80"
// // //           />
// // //         </div>

// // //         {/* Table */}
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-sm">
// // //             <thead className="bg-gray-100">
// // //               {table.getHeaderGroups().map((headerGroup) => (
// // //                 <tr key={headerGroup.id}>
// // //                   {headerGroup.headers.map((header) => (
// // //                     <th
// // //                       key={header.id}
// // //                       onClick={header.column.getToggleSortingHandler()}
// // //                       className="px-6 py-4 cursor-pointer select-none"
// // //                     >
// // //                       {flexRender(
// // //                         header.column.columnDef.header,
// // //                         header.getContext()
// // //                       )}

// // //                       {/* Proper Sorting Icon */}
// // //                       {header.column.getIsSorted() === "asc" && " 🔼"}
// // //                       {header.column.getIsSorted() === "desc" && " 🔽"}
// // //                     </th>
// // //                   ))}
// // //                 </tr>
// // //               ))}
// // //             </thead>

// // //             <tbody>
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan={columns.length} className="text-center py-20">
// // //                     Loading...
// // //                   </td>
// // //                 </tr>
// // //               ) : table.getRowModel().rows.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan={columns.length} className="text-center py-20">
// // //                     No products found
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 table.getRowModel().rows.map((row) => (
// // //                   <tr key={row.id} className="border-b hover:bg-gray-50">
// // //                     {row.getVisibleCells().map((cell) => (
// // //                       <td key={cell.id} className="px-6 py-4">
// // //                         {flexRender(
// // //                           cell.column.columnDef.cell,
// // //                           cell.getContext()
// // //                         )}
// // //                       </td>
// // //                     ))}
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Pagination */}
// // //         <div className="p-6 flex justify-between items-center border-t">
// // //           <div>
// // //             Page {table.getState().pagination.pageIndex + 1} of{" "}
// // //             {table.getPageCount()}
// // //           </div>

// // //           <div className="flex gap-3">
// // //             <button
// // //               onClick={() => table.previousPage()}
// // //               disabled={!table.getCanPreviousPage()}
// // //               className="px-3 py-1 border rounded"
// // //             >
// // //               Prev
// // //             </button>

// // //             <button
// // //               onClick={() => table.nextPage()}
// // //               disabled={!table.getCanNextPage()}
// // //               className="px-3 py-1 border rounded"
// // //             >
// // //               Next
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <ToastContainer />
// // //     </div>
// // //   );
// // // }


// // // ProductTable.jsx



// // // import { useEffect, useMemo, useState } from "react";
// // // import {
// // //   useReactTable,
// // //   getCoreRowModel,
// // //   getFilteredRowModel,
// // //   getPaginationRowModel,
// // //   getSortedRowModel,
// // //   flexRender,
// // // } from "@tanstack/react-table";

// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import { getProductsApi, deleteHomeApi } from "./product.api";

// // // export default function ProductTable() {
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [globalFilter, setGlobalFilter] = useState("");
// // //   const [sorting, setSorting] = useState([]);

// // //   // Fetch products
// // //   const fetchProducts = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await getProductsApi();
// // //       const data = res.data?.data || res.data || [];
// // //       setProducts(data);
// // //     } catch (err) {
// // //       toast.error("Failed to load products");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // Columns
// // //   const columns = useMemo(
// // //     () => [
// // //       {
// // //         header: "No.",
// // //         id: "serial",
// // //         enableSorting: false,
// // //         cell: ({ row, table }) => {
// // //           const pageIndex = table.getState().pagination.pageIndex;
// // //           const pageSize = table.getState().pagination.pageSize;
// // //           return pageIndex * pageSize + row.index + 1;
// // //         },
// // //       },
// // //       {
// // //         accessorKey: "images",
// // //         header: "Image",
// // //         enableSorting: false,
// // //         cell: ({ row }) => {
// // //           const img = row.original.images?.[0];
// // //           return img ? (
// // //             <img
// // //               src={img}
// // //               alt="product"
// // //               className="w-14 h-14 object-cover rounded-lg border shadow-sm"
// // //             />
// // //           ) : (
// // //             <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
// // //               No Img
// // //             </div>
// // //           );
// // //         },
// // //       },
// // //       {
// // //         accessorKey: "name",
// // //         header: "Product Name",
// // //       },
// // //       {
// // //         accessorKey: "description",
// // //         header: "Description",
// // //         cell: ({ getValue }) => (
// // //           <div className="max-w-xs truncate" title={getValue()}>
// // //             {getValue() || "-"}
// // //           </div>
// // //         ),
// // //       },
// // //       {
// // //         id: "actions",
// // //         header: "Actions",
// // //         enableSorting: false,
// // //         cell: ({ row }) => (
// // //           <button
// // //             onClick={async () => {
// // //               if (!window.confirm("Delete this product?")) return;
// // //               await deleteHomeApi(row.original._id);
// // //               toast.success("Deleted successfully");
// // //               fetchProducts();
// // //             }}
// // //             className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition"
// // //           >
// // //             Delete
// // //           </button>
// // //         ),
// // //       },
// // //     ],
// // //     []
// // //   );

// // //   const table = useReactTable({
// // //     data: products,
// // //     columns,
// // //     state: { globalFilter, sorting },
// // //     onSortingChange: setSorting,
// // //     onGlobalFilterChange: setGlobalFilter,
// // //     getCoreRowModel: getCoreRowModel(),
// // //     getFilteredRowModel: getFilteredRowModel(),
// // //     getSortedRowModel: getSortedRowModel(),
// // //     getPaginationRowModel: getPaginationRowModel(),
// // //   });

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
// // //       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border overflow-hidden">

// // //         {/* Header */}
// // //         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b bg-gray-50">
// // //           <h1 className="text-2xl font-bold text-gray-800">
// // //             Product Management
// // //           </h1>

// // //           <input
// // //             type="text"
// // //             placeholder="Search products..."
// // //             value={globalFilter ?? ""}
// // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // //             className="w-full md:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// // //           />
// // //         </div>

// // //         {/* Table */}
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-sm text-left">
// // //             <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
// // //               {table.getHeaderGroups().map((headerGroup) => (
// // //                 <tr key={headerGroup.id}>
// // //                   {headerGroup.headers.map((header) => (
// // //                     <th
// // //                       key={header.id}
// // //                       onClick={header.column.getToggleSortingHandler()}
// // //                       className="px-6 py-4 cursor-pointer select-none"
// // //                     >
// // //                       <div className="flex items-center gap-1">
// // //                         {flexRender(
// // //                           header.column.columnDef.header,
// // //                           header.getContext()
// // //                         )}

// // //                         {header.column.getIsSorted() === "asc" && (
// // //                           <span className="text-blue-600">▲</span>
// // //                         )}
// // //                         {header.column.getIsSorted() === "desc" && (
// // //                           <span className="text-blue-600">▼</span>
// // //                         )}
// // //                       </div>
// // //                     </th>
// // //                   ))}
// // //                 </tr>
// // //               ))}
// // //             </thead>

// // //             <tbody>
// // //               {loading ? (
// // //                 <tr>
// // //                   <td
// // //                     colSpan={columns.length}
// // //                     className="text-center py-16 text-gray-500"
// // //                   >
// // //                     Loading products...
// // //                   </td>
// // //                 </tr>
// // //               ) : table.getRowModel().rows.length === 0 ? (
// // //                 <tr>
// // //                   <td
// // //                     colSpan={columns.length}
// // //                     className="text-center py-16 text-gray-400"
// // //                   >
// // //                     No products found
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 table.getRowModel().rows.map((row) => (
// // //                   <tr
// // //                     key={row.id}
// // //                     className="border-b hover:bg-blue-50 transition duration-150"
// // //                   >
// // //                     {row.getVisibleCells().map((cell) => (
// // //                       <td key={cell.id} className="px-6 py-4">
// // //                         {flexRender(
// // //                           cell.column.columnDef.cell,
// // //                           cell.getContext()
// // //                         )}
// // //                       </td>
// // //                     ))}
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Pagination */}
// // //         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-t bg-gray-50 text-sm">
// // //           <div>
// // //             Page {table.getState().pagination.pageIndex + 1} of{" "}
// // //             {table.getPageCount()}
// // //           </div>

// // //           <div className="flex items-center gap-3">
// // //             <button
// // //               onClick={() => table.previousPage()}
// // //               disabled={!table.getCanPreviousPage()}
// // //               className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
// // //             >
// // //               Previous
// // //             </button>

// // //             <button
// // //               onClick={() => table.nextPage()}
// // //               disabled={!table.getCanNextPage()}
// // //               className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
// // //             >
// // //               Next
// // //             </button>

// // //             <select
// // //               value={table.getState().pagination.pageSize}
// // //               onChange={(e) =>
// // //                 table.setPageSize(Number(e.target.value))
// // //               }
// // //               className="border rounded-lg px-3 py-1.5"
// // //             >
// // //               {[10, 20, 30, 50].map((size) => (
// // //                 <option key={size} value={size}>
// // //                   {size} rows
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
// // //     </div>
// // //   );
// // // }


// // import { useEffect, useMemo, useState } from "react";
// // import {
// //   useReactTable,
// //   getCoreRowModel,
// //   getFilteredRowModel,
// //   getPaginationRowModel,
// //   getSortedRowModel,
// //   flexRender,
// // } from "@tanstack/react-table";

// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import {
// //   getProductsApi,
// //   deleteHomeApi,
// //   updateHomeApi,
// // } from "./product.api";

// // export default function ProductTable() {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [globalFilter, setGlobalFilter] = useState("");
// //   const [sorting, setSorting] = useState([]);

// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editData, setEditData] = useState(null);

// //   // Fetch products
// //   const fetchProducts = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getProductsApi();
// //       const data = res.data?.data || res.data || [];
// //       setProducts(data);
// //     } catch (err) {
// //       toast.error("Failed to load products");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   // Open edit modal
// //   const openEditModal = (product) => {
// //     setEditData({ ...product });
// //     setIsModalOpen(true);
// //   };

// //   // Update submit
// //   const handleUpdate = async () => {
// //     try {
// //       await updateHomeApi(editData._id, editData);
// //       toast.success("Product updated successfully");
// //       setIsModalOpen(false);
// //       fetchProducts();
// //     } catch (err) {
// //       toast.error("Update failed");
// //     }
// //   };

// //   const columns = useMemo(
// //     () => [
// //       {
// //         header: "No.",
// //         id: "serial",
// //         enableSorting: false,
// //         cell: ({ row, table }) => {
// //           const pageIndex = table.getState().pagination.pageIndex;
// //           const pageSize = table.getState().pagination.pageSize;
// //           return pageIndex * pageSize + row.index + 1;
// //         },
// //       },
// //       {
// //         accessorKey: "images",
// //         header: "Image",
// //         enableSorting: false,
// //         cell: ({ row }) => {
// //           const img = row.original.images?.[0];
// //           return img ? (
// //             <img
// //               src={img}
// //               alt="product"
// //               className="w-14 h-14 object-cover rounded-lg"
// //             />
// //           ) : (
// //             <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
// //               No Img
// //             </div>
// //           );
// //         },
// //       },
// //       {
// //         accessorKey: "name",
// //         header: "Product Name",
// //       },
// //       {
// //         accessorKey: "description",
// //         header: "Description",
// //       },
// //       {
// //         id: "actions",
// //         header: "Actions",
// //         enableSorting: false,
// //         cell: ({ row }) => (
// //           <div className="flex gap-2">
// //             <button
// //               onClick={() => openEditModal(row.original)}
// //               className="px-3 py-1 bg-blue-600 text-white text-xs rounded"
// //             >
// //               Edit
// //             </button>

// //             <button
// //               onClick={async () => {
// //                 if (!window.confirm("Delete this product?")) return;
// //                 await deleteHomeApi(row.original._id);
// //                 toast.success("Deleted successfully");
// //                 fetchProducts();
// //               }}
// //               className="px-3 py-1 bg-red-600 text-white text-xs rounded"
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         ),
// //       },
// //     ],
// //     []
// //   );

// //   const table = useReactTable({
// //     data: products,
// //     columns,
// //     state: { globalFilter, sorting },
// //     onSortingChange: setSorting,
// //     onGlobalFilterChange: setGlobalFilter,
// //     getCoreRowModel: getCoreRowModel(),
// //     getFilteredRowModel: getFilteredRowModel(),
// //     getSortedRowModel: getSortedRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //   });

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <div className="bg-white rounded-xl shadow border overflow-hidden">

// //         {/* Header */}
// //         <div className="p-6 border-b flex justify-between">
// //           <h1 className="text-2xl font-bold">Product Management</h1>
// //           <input
// //             placeholder="Search..."
// //             value={globalFilter ?? ""}
// //             onChange={(e) => setGlobalFilter(e.target.value)}
// //             className="border px-3 py-2 rounded"
// //           />
// //         </div>

// //         {/* Table */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead className="bg-gray-100">
// //               {table.getHeaderGroups().map((headerGroup) => (
// //                 <tr key={headerGroup.id}>
// //                   {headerGroup.headers.map((header) => (
// //                     <th
// //                       key={header.id}
// //                       onClick={header.column.getToggleSortingHandler()}
// //                       className="px-6 py-4 cursor-pointer"
// //                     >
// //                       {flexRender(
// //                         header.column.columnDef.header,
// //                         header.getContext()
// //                       )}
// //                       {header.column.getIsSorted() === "asc" && " ▲"}
// //                       {header.column.getIsSorted() === "desc" && " ▼"}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </thead>

// //             <tbody>
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan={columns.length} className="text-center py-16">
// //                     Loading...
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 table.getRowModel().rows.map((row) => (
// //                   <tr key={row.id} className="border-b hover:bg-gray-50">
// //                     {row.getVisibleCells().map((cell) => (
// //                       <td key={cell.id} className="px-6 py-4">
// //                         {flexRender(
// //                           cell.column.columnDef.cell,
// //                           cell.getContext()
// //                         )}
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         <div className="p-6 flex justify-between border-t">
// //           <button
// //             onClick={() => table.previousPage()}
// //             disabled={!table.getCanPreviousPage()}
// //             className="px-3 py-1 border rounded"
// //           >
// //             Previous
// //           </button>

// //           <button
// //             onClick={() => table.nextPage()}
// //             disabled={!table.getCanNextPage()}
// //             className="px-3 py-1 border rounded"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //       {/* EDIT MODAL */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-md">
// //             <h2 className="text-xl font-bold mb-4">Edit Product</h2>

// //             <input
// //               type="text"
// //               value={editData.name}
// //               onChange={(e) =>
// //                 setEditData({ ...editData, name: e.target.value })
// //               }
// //               className="w-full border px-3 py-2 rounded mb-3"
// //               placeholder="Product Name"
// //             />

// //             <textarea
// //               value={editData.description}
// //               onChange={(e) =>
// //                 setEditData({ ...editData, description: e.target.value })
// //               }
// //               className="w-full border px-3 py-2 rounded mb-3"
// //               placeholder="Description"
// //             />

// //             <input
// //               type="text"
// //               value={editData.images?.[0] || ""}
// //               onChange={(e) =>
// //                 setEditData({
// //                   ...editData,
// //                   images: [e.target.value],
// //                 })
// //               }
// //               className="w-full border px-3 py-2 rounded mb-3"
// //               placeholder="Image URL"
// //             />

// //             <div className="flex justify-end gap-3">
// //               <button
// //                 onClick={() => setIsModalOpen(false)}
// //                 className="px-4 py-2 border rounded"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={handleUpdate}
// //                 className="px-4 py-2 bg-blue-600 text-white rounded"
// //               >
// //                 Update
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <ToastContainer />
// //     </div>
// //   );
// // }


// // import { useEffect, useMemo, useState } from "react";
// // import {
// //   useReactTable,
// //   getCoreRowModel,
// //   getFilteredRowModel,
// //   getPaginationRowModel,
// //   getSortedRowModel,
// //   flexRender,
// // } from "@tanstack/react-table";

// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import {
// //   getProductsApi,
// //   deleteHomeApi,
// //   updateHomeApi,
// // } from "./product.api";

// // export default function ProductTable() {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [globalFilter, setGlobalFilter] = useState("");
// //   const [sorting, setSorting] = useState([]);

// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editData, setEditData] = useState(null);

// //   const fetchProducts = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getProductsApi();
// //       const data = res.data?.data || res.data || [];
// //       setProducts(data);
// //     } catch (err) {
// //       toast.error("Failed to load products");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const openEditModal = (product) => {
// //     setEditData({ ...product });
// //     setIsModalOpen(true);
// //   };

// //   const handleUpdate = async () => {
// //     try {
// //       await updateHomeApi(editData._id, editData);
// //       toast.success("Product updated successfully");
// //       setIsModalOpen(false);
// //       fetchProducts();
// //     } catch (err) {
// //       toast.error("Update failed");
// //     }
// //   };

// //   const columns = useMemo(
// //     () => [
// //       {
// //         header: "No.",
// //         id: "serial",
// //         enableSorting: false,
// //         cell: ({ row, table }) => {
// //           const pageIndex = table.getState().pagination.pageIndex;
// //           const pageSize = table.getState().pagination.pageSize;
// //           return pageIndex * pageSize + row.index + 1;
// //         },
// //       },
// //       {
// //         accessorKey: "images",
// //         header: "Image",
// //         enableSorting: false,
// //         cell: ({ row }) => {
// //           const img = row.original.images?.[0];
// //           return img ? (
// //             <img
// //               src={img}
// //               alt="product"
// //               className="w-14 h-14 object-cover rounded-lg border"
// //             />
// //           ) : (
// //             <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
// //               No Img
// //             </div>
// //           );
// //         },
// //       },
// //       {
// //         accessorKey: "name",
// //         header: "Product Name",
// //       },
// //       {
// //         accessorKey: "description",
// //         header: "Description",
// //         cell: ({ getValue }) => (
// //           <div className="max-w-xs truncate" title={getValue()}>
// //             {getValue() || "-"}
// //           </div>
// //         ),
// //       },
// //       {
// //         id: "actions",
// //         header: "Actions",
// //         enableSorting: false,
// //         cell: ({ row }) => (
// //           <div className="flex gap-2 justify-center">
// //             <button
// //               onClick={() => openEditModal(row.original)}
// //               className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
// //             >
// //               Edit
// //             </button>

// //             <button
// //               onClick={async () => {
// //                 if (!window.confirm("Delete this product?")) return;
// //                 await deleteHomeApi(row.original._id);
// //                 toast.success("Deleted successfully");
// //                 fetchProducts();
// //               }}
// //               className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         ),
// //       },
// //     ],
// //     []
// //   );

// //   const table = useReactTable({
// //     data: products,
// //     columns,
// //     state: { globalFilter, sorting },
// //     onSortingChange: setSorting,
// //     onGlobalFilterChange: setGlobalFilter,
// //     getCoreRowModel: getCoreRowModel(),
// //     getFilteredRowModel: getFilteredRowModel(),
// //     getSortedRowModel: getSortedRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //   });

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <div className="bg-white rounded-2xl shadow-xl border overflow-hidden max-w-7xl mx-auto">

// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b bg-gray-50">
// //           <h1 className="text-2xl font-bold text-gray-800">
// //             Product Management
// //           </h1>

// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={globalFilter ?? ""}
// //             onChange={(e) => setGlobalFilter(e.target.value)}
// //             className="w-full md:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //           />
// //         </div>

// //         {/* Table */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm table-fixed">
// //             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
// //               {table.getHeaderGroups().map((headerGroup) => (
// //                 <tr key={headerGroup.id}>
// //                   {headerGroup.headers.map((header, index) => (
// //                     <th
// //                       key={header.id}
// //                       onClick={header.column.getToggleSortingHandler()}
// //                       className={`py-3 cursor-pointer select-none
// //                         ${index === 0 ? "w-16 text-center px-2" : ""}
// //                         ${index === 1 ? "w-24 text-center px-3" : ""}
// //                         ${index > 1 ? "px-4 text-left" : ""}
// //                       `}
// //                     >
// //                       <div className="flex items-center justify-center gap-1">
// //                         {flexRender(
// //                           header.column.columnDef.header,
// //                           header.getContext()
// //                         )}
// //                         {header.column.getIsSorted() === "asc" && " ▲"}
// //                         {header.column.getIsSorted() === "desc" && " ▼"}
// //                       </div>
// //                     </th>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </thead>

// //             <tbody>
// //               {loading ? (
// //                 <tr>
// //                   <td
// //                     colSpan={columns.length}
// //                     className="text-center py-16 text-gray-500"
// //                   >
// //                     Loading products...
// //                   </td>
// //                 </tr>
// //               ) : table.getRowModel().rows.length === 0 ? (
// //                 <tr>
// //                   <td
// //                     colSpan={columns.length}
// //                     className="text-center py-16 text-gray-400"
// //                   >
// //                     No products found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 table.getRowModel().rows.map((row) => (
// //                   <tr
// //                     key={row.id}
// //                     className="border-b hover:bg-blue-50 transition"
// //                   >
// //                     {row.getVisibleCells().map((cell, index) => (
// //                       <td
// //                         key={cell.id}
// //                         className={`py-3
// //                           ${index === 0 ? "text-center px-2 font-medium" : ""}
// //                           ${index === 1 ? "text-center px-3" : ""}
// //                           ${index > 1 ? "px-4 text-left" : ""}
// //                         `}
// //                       >
// //                         {flexRender(
// //                           cell.column.columnDef.cell,
// //                           cell.getContext()
// //                         )}
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-t bg-gray-50 text-sm">
// //           <div>
// //             Page {table.getState().pagination.pageIndex + 1} of{" "}
// //             {table.getPageCount()}
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => table.previousPage()}
// //               disabled={!table.getCanPreviousPage()}
// //               className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
// //             >
// //               Previous
// //             </button>

// //             <button
// //               onClick={() => table.nextPage()}
// //               disabled={!table.getCanNextPage()}
// //               className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
// //             >
// //               Next
// //             </button>

// //             <select
// //               value={table.getState().pagination.pageSize}
// //               onChange={(e) =>
// //                 table.setPageSize(Number(e.target.value))
// //               }
// //               className="border rounded-lg px-3 py-1.5"
// //             >
// //               {[10, 20, 30, 50].map((size) => (
// //                 <option key={size} value={size}>
// //                   {size} rows
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Edit Modal */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
// //           <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
// //             <h2 className="text-xl font-bold mb-4">Edit Product</h2>

// //             <input
// //               type="text"
// //               value={editData.name}
// //               onChange={(e) =>
// //                 setEditData({ ...editData, name: e.target.value })
// //               }
// //               className="w-full border px-3 py-2 rounded mb-3"
// //               placeholder="Product Name"
// //             />

// //             <textarea
// //               value={editData.description}
// //               onChange={(e) =>
// //                 setEditData({ ...editData, description: e.target.value })
// //               }
// //               className="w-full border px-3 py-2 rounded mb-3"
// //               placeholder="Description"
// //             />

// //             <input
// //               type="text"
// //               value={editData.images?.[0] || ""}
// //               onChange={(e) =>
// //                 setEditData({
// //                   ...editData,
// //                   images: [e.target.value],
// //                 })
// //               }
// //               className="w-full border px-3 py-2 rounded mb-3"
// //               placeholder="Image URL"
// //             />

// //             <div className="flex justify-end gap-3">
// //               <button
// //                 onClick={() => setIsModalOpen(false)}
// //                 className="px-4 py-2 border rounded"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={handleUpdate}
// //                 className="px-4 py-2 bg-blue-600 text-white rounded"
// //               >
// //                 Update
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
// //     </div>
// //   );
// // }


// import { useEffect, useMemo, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   getProductsApi,
//   deleteHomeApi,
//   updateHomeApi,
// } from "./product.api";

// export default function ProductTable() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [sorting, setSorting] = useState([]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await getProductsApi();
//       const data = res.data?.data || res.data || [];
//       setProducts(data);
//     } catch (err) {
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const openEditModal = (product) => {
//     setEditData({ ...product });
//     setIsModalOpen(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateHomeApi(editData._id, editData);
//       toast.success("Product updated successfully");
//       setIsModalOpen(false);
//       fetchProducts();
//     } catch (err) {
//       toast.error("Update failed");
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         header: "No.",
//         id: "serial",
//         enableSorting: false,
//         cell: ({ row, table }) => {
//           const pageIndex = table.getState().pagination.pageIndex;
//           const pageSize = table.getState().pagination.pageSize;
//           return pageIndex * pageSize + row.index + 1;
//         },
//       },
//       {
//         accessorKey: "images",
//         header: "Image",
//         enableSorting: false,
//         cell: ({ row }) => {
//           const img = row.original.images?.[0];
//           return img ? (
//             <img
//               src={img}
//               alt="product"
//               className="w-14 h-14 object-cover rounded-lg border"
//             />
//           ) : (
//             <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
//               No Img
//             </div>
//           );
//         },
//       },
//       {
//         accessorKey: "name",
//         header: "Product Name",
//       },
//       {
//         accessorKey: "description",
//         header: "Description",
//         cell: ({ getValue }) => (
//           <div className="max-w-xs truncate" title={getValue()}>
//             {getValue() || "-"}
//           </div>
//         ),
//       },
//       {
//         id: "actions",
//         header: "Actions",
//         enableSorting: false,
//         cell: ({ row }) => (
//           <div className="flex gap-2 justify-center">
//             <button
//               onClick={() => openEditModal(row.original)}
//               className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
//             >
//               Edit
//             </button>

//             <button
//               onClick={async () => {
//                 if (!window.confirm("Delete this product?")) return;
//                 await deleteHomeApi(row.original._id);
//                 toast.success("Deleted successfully");
//                 fetchProducts();
//               }}
//               className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
//             >
//               Delete
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: products,
//     columns,
//     state: { globalFilter, sorting },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="bg-white rounded-2xl shadow-xl border overflow-hidden max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b bg-gray-50">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Product Management
//           </h1>

//           <input
//             type="text"
//             placeholder="Search products..."
//             value={globalFilter ?? ""}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             className="w-full md:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm table-fixed">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header, index) => (
//                     <th
//                       key={header.id}
//                       onClick={header.column.getToggleSortingHandler()}
//                       className={`py-3 cursor-pointer select-none
//                         ${index === 0 ? "w-16 text-center px-2" : ""}
//                         ${index === 1 ? "w-24 text-center px-3" : ""}
//                         ${index > 1 ? "px-4 text-left" : ""}
//                       `}
//                     >
//                       <div className="flex items-center justify-center gap-1">
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                         {header.column.getIsSorted() === "asc" && " ▲"}
//                         {header.column.getIsSorted() === "desc" && " ▼"}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan={columns.length}
//                     className="text-center py-16 text-gray-500"
//                   >
//                     Loading products...
//                   </td>
//                 </tr>
//               ) : table.getRowModel().rows.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={columns.length}
//                     className="text-center py-16 text-gray-400"
//                   >
//                     No products found
//                   </td>
//                 </tr>
//               ) : (
//                 table.getRowModel().rows.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="border-b hover:bg-blue-50 transition"
//                   >
//                     {row.getVisibleCells().map((cell, index) => (
//                       <td
//                         key={cell.id}
//                         className={`py-3
//                           ${index === 0 ? "text-center px-2 font-medium" : ""}
//                           ${index === 1 ? "text-center px-3" : ""}
//                           ${index > 1 ? "px-4 text-left" : ""}
//                         `}
//                       >
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-t bg-gray-50 text-sm">
//           <div>
//             Page {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//               className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
//             >
//               Previous
//             </button>

//             <button
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//               className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
//             >
//               Next
//             </button>

//             <select
//               value={table.getState().pagination.pageSize}
//               onChange={(e) =>
//                 table.setPageSize(Number(e.target.value))
//               }
//               className="border rounded-lg px-3 py-1.5"
//             >
//               {[10, 20, 30, 50].map((size) => (
//                 <option key={size} value={size}>
//                   {size} rows
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
//             <h2 className="text-xl font-bold mb-4">Edit Product</h2>

//             <input
//               type="text"
//               value={editData.name}
//               onChange={(e) =>
//                 setEditData({ ...editData, name: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded mb-3"
//               placeholder="Product Name"
//             />

//             <textarea
//               value={editData.description}
//               onChange={(e) =>
//                 setEditData({ ...editData, description: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded mb-3"
//               placeholder="Description"
//             />

//             <input
//               type="text"
//               value={editData.images?.[0] || ""}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   images: [e.target.value],
//                 })
//               }
//               className="w-full border px-3 py-2 rounded mb-3"
//               placeholder="Image URL"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleUpdate}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
//     </div>
//   );
// }
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
  const [loading, setLoading] = useState(false);
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
      // const formData = new FormData();

    const formData = new FormData();
formData.append("name", editData.name);
formData.append("description", editData.description);

if (selectedFile) {
  formData.append("image", selectedFile); // must be "image"
}

      await updateHomeApi(editData._id, formData);

      toast.success("Product updated successfully");
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error("Update failed");
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
                await deleteHomeApi(row.original._id);
                toast.success("Deleted successfully");
                fetchProducts();
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800">
            Product Management
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
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
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Product Name"
            />

            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Description"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded mb-3"
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
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
