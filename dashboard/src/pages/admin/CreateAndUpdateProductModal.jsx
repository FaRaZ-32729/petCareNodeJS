import React, { useState, useEffect } from "react";

const CreateAndUpdateProductModal = ({ type, product, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        category: "food",
        price: 0.0,
        stock: 0,
        status: "Active",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                category: product.category || "food",
                price: product.price || 0.0,
                stock: product.stock || 0,
                status: product.status || "Active",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {type === "create" ? "Create New Product" : "Edit Product"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        >
                            <option value="food">Food</option>
                            <option value="grooming">Grooming</option>
                            <option value="toys">Toys</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        >
                            <option value="Active">Active</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            {type === "create" ? "Create Product" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAndUpdateProductModal;
