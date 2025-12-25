import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
  });

  // fetch item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`/api/item/${id}`);

        const item = data.item;

        // 🔐 owner check
        if (String(user?.id) !== String(item.createdBy?._id)) {
          toast.error("Not authorized");
          return navigate(`/item/${id}`);
        }

        setForm({
          title: item.title,
          description: item.description,
          location: item.location,
          category: item.category,
        });

        setLoading(false);
      } catch (err) {
        toast.error("Failed to load item");
        navigate("/");
      }
    };

    fetchItem();
  }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `/api/item/update/${id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Item updated");
    navigate(`/item/${id}`);
  } catch (err) {
    toast.error(err.response?.data?.message || "Update failed");
  }
};


  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white">
     

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Edit Item</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Title"
            required
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Description"
            required
          />

          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Location"
            required
          />

          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Category"
            required
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
