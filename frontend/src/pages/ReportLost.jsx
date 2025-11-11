import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReportLost() {
  const [form, setForm] = useState({
    title: "",
    description: "",
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

    if (!form.title || !form.description || !form.location || !form.date || !form.contactInfo) {
      return toast.error("Please fill all fields");
    }

    const itemData = {
      ...form,
      category: "Lost",
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
        toast.success("Lost item reported!");
        setForm({ title: "", description: "", location: "", date: "", contactInfo: "" });
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
      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Report Lost Item</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Fill the details below to report your lost item.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Item Name"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Description"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Last seen location"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-3 rounded-md"
          required
        />
        <input
          name="contactInfo"
          value={form.contactInfo}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Contact Info (phone/email)"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white rounded-md py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Reporting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
