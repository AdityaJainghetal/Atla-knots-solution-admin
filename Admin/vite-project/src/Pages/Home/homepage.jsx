

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const API_BASE = 'http://localhost:8000/api/home';

// function Homepage({ isEdit = false }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isEdit && id) {
//       fetchHomeData();
//     }
//   }, [id, isEdit]);

//   const fetchHomeData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/gethome`);
//       const item = res.data.data.find((item) => item._id === id);

//       if (item) {
//         setTitle(item.title);
//         setDescription(item.description);
//         setPreview(item.image); // ImageKit URL
//       }
//     } catch (err) {
//       setError('Failed to load home data');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);

//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       if (isEdit) {
//         await axios.put(`${API_BASE}/updatehome/${id}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert('Updated successfully!');
//       } else {
//         await axios.post(`${API_BASE}/homepost`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert('Added successfully!');
//       }

//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">
//         {isEdit ? 'Edit Home Content' : 'Add New Home Content'}
//       </h2>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* TITLE */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="w-full p-3 border rounded"
//           />
//         </div>

//         {/* DESCRIPTION - CKEDITOR */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Description
//           </label>

//           <CKEditor
//             editor={ClassicEditor}
//             data={description}
//             config={{
//               toolbar: [
//                 'heading',
//                 '|',
//                 'bold',
//                 'italic',
//                 'link',
//                 'bulletedList',
//                 'numberedList',
//                 '|',
//                 'undo',
//                 'redo',
//               ],
//             }}
//             onChange={(event, editor) => {
//               const data = editor.getData();
//               setDescription(data);
//             }}
//           />
//         </div>

//         {/* IMAGE */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             {isEdit ? 'New Image (optional)' : 'Image'}
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             required={!isEdit}
//             className="w-full p-2 border rounded"
//           />

//           {preview && (
//             <div className="mt-3">
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="max-h-48 object-contain border rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* BUTTON */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 text-white font-semibold rounded ${
//             loading
//               ? 'bg-gray-400'
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading
//             ? 'Uploading...'
//             : isEdit
//             ? 'Update'
//             : 'Add'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Homepage;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const API_BASE = 'http://localhost:8000/api/home';

// function Homepage({ isEdit = false }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isEdit && id) {
//       fetchHomeData();
//     }
//   }, [id, isEdit]);

//   const fetchHomeData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/gethome`);
//       const item = res.data.data.find((item) => item._id === id);

//       if (item) {
//         setTitle(item.title || '');
//         setDescription(item.description || '');
//         setPreview(item.image || ''); // ImageKit or any URL
//       }
//     } catch (err) {
//       setError('Failed to load home data');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       if (isEdit) {
//         await axios.put(`${API_BASE}/updatehome/${id}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert('Updated successfully!');
//       } else {
//         await axios.post(`${API_BASE}/homepost`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert('Added successfully!');
//       }

//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Card */}
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//             <h2 className="text-2xl md:text-3xl font-bold text-white">
//               {isEdit ? 'Edit Home Content' : 'Create New Home Content'}
//             </h2>
//             <p className="mt-2 text-blue-100 text-sm md:text-base">
//               {isEdit
//                 ? 'Update the existing content'
//                 : 'Add beautiful content for your homepage'}
//             </p>
//           </div>

//           {/* Form Content */}
//           <div className="p-8 md:p-10">
//             {error && (
//               <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-red-700 text-sm">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-7">
//               {/* Title */}
//               <div>
//                 <label
//                   htmlFor="title"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="title"
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   placeholder="Enter a catchy title..."
//                 />
//               </div>

//               {/* Description - CKEditor */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={description}
//                     config={{
//                       toolbar: [
//                         'heading',
//                         '|',
//                         'bold',
//                         'italic',
//                         'link',
//                         'bulletedList',
//                         'numberedList',
//                         '|',
//                         'undo',
//                         'redo',
//                       ],
//                     }}
//                     onChange={(event, editor) => {
//                       const data = editor.getData();
//                       setDescription(data);
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   {isEdit ? 'New Image (optional)' : 'Image'} 
//                   {!isEdit && <span className="text-red-500">*</span>}
//                 </label>

//                 <div className="flex items-center justify-center w-full">
//                   <label className="flex flex-col w-full h-40 md:h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition group">
//                     <div className="flex flex-col items-center justify-center pt-10">
//                       <svg
//                         className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                       <p className="mt-3 text-sm text-gray-500 group-hover:text-blue-600">
//                         <span className="font-semibold">Click to upload</span> or drag & drop
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
//                     </div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       required={!isEdit}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>

//                 {/* Preview */}
//                 {preview && (
//                   <div className="mt-5">
//                     <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
//                     <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
//                       <img
//                         src={preview}
//                         alt="Preview"
//                         className="w-full h-64 object-cover"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-3.5 px-6 text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2
//                     ${loading
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
//                     }`}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       </svg>
//                       <span>Please wait...</span>
//                     </>
//                   ) : isEdit ? (
//                     'Update Content'
//                   ) : (
//                     'Add Content'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const API_BASE = 'http://localhost:8000/api/home';

// function Homepage({ isEdit = false }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch data in edit mode
//   useEffect(() => {
//     if (isEdit && id) {
//       fetchHomeData();
//     }
//   }, [isEdit, id]);

//   // 🔹 Cleanup preview URL (avoid memory leak)
//   useEffect(() => {
//     return () => {
//       if (preview && preview.startsWith('blob:')) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);

//   const fetchHomeData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/gethome`);
//       const item = res.data?.data?.find((i) => i._id === id);

//       if (!item) {
//         setError('Home content not found');
//         return;
//       }

//       setTitle(item.title || '');
//       setDescription(item.description || '');
//       setPreview(item.image || '');
//     } catch (err) {
//       setError('Failed to load home data');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);

//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       if (isEdit) {
//         await axios.put(`${API_BASE}/updatehome/${id}`, formData);
//         alert('Updated successfully!');
//       } else {
//         await axios.post(`${API_BASE}/homepost`, formData);
//         alert('Added successfully!');
//       }

//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//             <h2 className="text-2xl md:text-3xl font-bold text-white">
//               {isEdit ? 'Edit Home Content' : 'Create New Home Content'}
//             </h2>
//             <p className="mt-2 text-blue-100 text-sm md:text-base">
//               {isEdit
//                 ? 'Update the existing content'
//                 : 'Add beautiful content for your homepage'}
//             </p>
//           </div>

//           {/* Form */}
//           <div className="p-8 md:p-10">
//             {error && (
//               <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-red-700 text-sm">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-7">
//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter a catchy title..."
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <div className="border border-gray-300 rounded-lg overflow-hidden">
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={description}
//                     onChange={(event, editor) => {
//                       setDescription(editor.getData());
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   {isEdit ? 'New Image (optional)' : 'Image'}
//                   {!isEdit && <span className="text-red-500">*</span>}
//                 </label>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   required={!isEdit}
//                 />

//                 {preview && (
//                   <div className="mt-4">
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="w-full h-64 object-cover rounded-lg border"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 text-white font-semibold rounded-lg
//                   ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//               >
//                 {loading ? 'Please wait...' : isEdit ? 'Update Content' : 'Add Content'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;
// src/components/CreateHomeContent.jsx


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateHomeContent = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchHomeData();
    }
  }, [isEdit, id]);

  const fetchHomeData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/gtehome');
      const item = res.data.data.find((i) => i._id === id);
      if (item) {
        setTitle(item.title || '');
        setDescription(item.description || '');
        setPreview(item.image || '');
      }
    } catch (err) {
      setError('Failed to load home data');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:8000/api/home/updatehome/${id}`, formData);
        alert('Updated successfully!');
      }
      else {
        await axios.post('http://localhost:8000/api/home/homepost', formData);
        alert('Added successfully!');
      }
      navigate('/');
    }
    catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Home Content' : 'Add New Home Content'}</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border rounded h-32"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">{isEdit ? 'New Image (optional)' : 'Image'}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!isEdit}
            className="w-full p-2 border rounded"
          />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 object-contain border rounded"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        > 
          {loading ? 'Uploading...' : isEdit ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default CreateHomeContent;