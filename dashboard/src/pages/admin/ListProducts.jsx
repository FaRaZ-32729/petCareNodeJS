import React, { useContext, useState } from "react";
import { ProductContext } from "../../contextApi/productContext";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import CreateAndUpdateProductModal from "./CreateAndUpdateProductModal";

const ListProducts = () => {
  const { products, createProduct, updateProduct, deleteProduct } =
    useContext(ProductContext);

  const [filters, setFilters] = useState({ category: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [currentProduct, setCurrentProduct] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // handlers
  const handleCreateProduct = () => {
    setModalType("create");
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setModalType("edit");
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleAskDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete._id);
        toast.success("Product deleted successfully");
      } catch (err) {
        toast.error("Failed to delete product");
      }
      setProductToDelete(null);
    }
    setIsConfirmOpen(false);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (modalType === "create") {
        await createProduct(formData);
        toast.success("Product created successfully");
      } else if (modalType === "edit" && currentProduct) {
        await updateProduct(currentProduct._id, formData);
        toast.success("Product updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Product Catalog
        </h1>
        <button
          onClick={handleCreateProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add New Product
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full md:w-auto px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="food">Food</option>
          <option value="grooming">Grooming</option>
          <option value="toys">Toys</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {product.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleAskDeleteProduct(product)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CreateAndUpdateProductModal
          type={modalType}
          product={currentProduct}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ListProducts;
