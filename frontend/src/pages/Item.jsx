import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Moment from "moment";
import Loader from "../components/Loader.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Item = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [resolving, setResolving] = React.useState(false);

  const fetchItemData = async () => {
    try {
      const { data } = await axios.get(`/api/item/${id}`);
      if (data.success) {
        setData(data.item);
        setComments(data.item.comments || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/item/add-comment", {
        item: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchItemData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resolveItem = async () => {
    setResolving(true);
    try {
      const { data } = await axios.patch(`/api/item/resolve/${id}`);
      if (data.success) {
        toast.success("Item marked as resolved");
        fetchItemData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setResolving(false);
    }
  };

  React.useEffect(() => {
    fetchItemData();
  }, [id]);

  if (!data) return <Loader />;

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Title & Date */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold">{data.title}</h1>
          <p className="text-gray-500 mt-2">
            Reported on {Moment(data.date).format("MMMM Do YYYY")}
          </p>
        </div>

        {/* Image & Basic Info */}
        <div className="flex flex-col md:flex-row md:gap-10 items-start">
          {data.image && (
            <img
              src={data.image}
              alt={data.title}
              className="w-full md:w-1/3 rounded-xl mb-5 md:mb-0 object-cover border border-gray-300"
            />
          )}
          <div className="flex-1 space-y-3">
            <p>
              <span className="font-semibold">Category:</span> {data.category}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {data.location}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {data.contactInfo}
            </p>
            <p>
              <span className="font-semibold">Resolved:</span>{" "}
              {data.resolved ? "Yes" : "No"}
            </p>
            <div
              className="mt-4 text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
            {!data.resolved && (
              <button
                onClick={resolveItem}
                disabled={resolving}
                className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                {resolving ? "Resolving..." : "Mark as Resolved"}
              </button>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded bg-gray-50"
              >
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-700">{item.content}</p>
                <span className="text-xs text-gray-400">
                  {Moment(item.createdAt).fromNow()}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={addComment} className="flex flex-col gap-4 mt-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="border border-gray-300 rounded px-3 py-2 outline-none"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Comment"
              required
              className="border border-gray-300 rounded px-3 py-2 h-32 outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Item;
