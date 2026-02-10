import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api/home';

function HomeList() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/gethome`);
      setHomes(res.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete(`${API_BASE}/deletehome/${id}`); // Note: Add this route in backend if needed
      setHomes(homes.filter((item) => item._id !== id));
      alert('Deleted successfully');
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (error) return <div className="text-red-600 text-center py-10">{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Home Content List</h2>

      {homes.length === 0 ? (
        <p className="text-center text-gray-600">No items found. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homes.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/400?text=No+Image')}
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                <div className="flex justify-between">
                  <Link
                    to={`/edit/${item._id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeList;