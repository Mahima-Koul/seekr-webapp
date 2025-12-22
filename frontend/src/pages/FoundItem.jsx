import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function FoundItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",          // Electronics / ID & Cards etc
    location: "",
    date: "",
    contactInfo: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.type ||
      !form.location ||
      !form.date ||
      !form.contactInfo
    ) {
      return toast.error("Please fill all fields");
    }

    const itemData = {
      title: form.title,
      description: form.description,
      category: "Found",      
      type: form.type,        
      location: form.location,
      date: form.date,
      contactInfo: form.contactInfo
    };

    const formData = new FormData();
    formData.append("item", JSON.stringify(itemData));
    if (image) formData.append("image", image);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      const { data } = await axios.post("/api/item/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      if (data.success) {
        toast.success("Found item reported!");
        setForm({
          title: "",
          description: "",
          type: "",
          location: "",
          date: "",
          contactInfo: ""
        });
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
      <h2 className="text-2xl font-bold mb-4">Report Found Item</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Item Name"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Description"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-3 rounded-md"
        >
          <option value="">Select Item Type</option>
          <option value="Electronics">Electronics</option>
          <option value="ID & Cards">ID & Cards</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Found location"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />

        <input
          name="contactInfo"
          value={form.contactInfo}
          onChange={handleChange}
          className="border p-3 rounded-md"
          placeholder="Contact info"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Reporting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
