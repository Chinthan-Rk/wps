import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";

export default function AdhocScanModal({ isOpen, onClose, websites }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    contact: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Starting adhoc scan:", formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto border-1 border-black shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl text-black font-semibold">Adhoc Scan</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website Name
            </label>
            <select
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select Website Name</option>
              {websites.map((website, index) => (
                <option key={index} value={website.name}>
                  {website.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter website description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="contact@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Scan
          </button>
        </form>
      </div>
    </div>
  );
}
