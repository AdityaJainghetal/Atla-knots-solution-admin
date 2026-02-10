
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