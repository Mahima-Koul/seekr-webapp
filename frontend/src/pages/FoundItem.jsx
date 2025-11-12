import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function FoundItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    date: "",
    contactInfo: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    if (!form.title || !form.description || !form.type || !form.location || !form.date || !form.contactInfo) {
      return toast.error("Please fill all fields");
    }

    const itemData = {
      ...form,
      category: "Found",
    };

    const formData = new FormData();
    formData.append("item", JSON.stringify(itemData));
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const { data } = await axios.post("/api/item/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Found item reported!");
        setForm({ title: "", description: "", type: "", location: "", date: "", contactInfo: "" });
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Found Item</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Found something? Help reunite it with its owner!
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Item Name"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Description"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          required
        >
          <option value="">Select Type</option>
          <option value="Electronics">Electronics</option>
          <option value="ID & Cards">ID & Cards</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Found location"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          required
        />

        <input
          name="contactInfo"
          value={form.contactInfo}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Contact Info (phone/email)"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-gray-300 p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white rounded-md py-2 font-semibold hover:bg-gray-700 transition disabled:opacity-50"
        >
          {loading ? "Reporting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
