import { useEffect, useState } from "react";
import { getProductsApi } from "./product.api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getProductsApi();
      setProducts(res.data.data || res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Product List
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              {product.images?.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
