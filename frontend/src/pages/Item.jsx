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
  const [showContact, setShowContact] = React.useState(false);

  const fetchItemData = async () => {
    try {
      const { data } = await axios.get(`/api/item/${id}`);
      if (data.success) {
        setData(data.item);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchItemData();
  }, [id]);

  if (!data) return <Loader />;

  const isLost = data.type === "LOST"; // or however you store this

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

        {/* Image & Info */}
        <div className="flex flex-col md:flex-row md:gap-10 items-start">
          {data.image && (
            <img
              src={data.image}
              alt={data.title}
              className="w-full md:w-1/3 rounded-xl mb-5 md:mb-0 object-cover border"
            />
          )}

          <div className="flex-1 space-y-3">
            <p>
              <span className="font-semibold">Category:</span> {data.category}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {data.location}
            </p>

            <div className="mt-4">
              <p className="font-semibold text-gray-700">Description:</p>
              <div
                className="text-gray-800 leading-relaxed mt-2"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>

            {/* CLAIM BUTTON */}
            <button
              onClick={() => setShowContact(true)}
              className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              {isLost ? "I Found This Item" : "Claim This Item"}
            </button>
          </div>
        </div>
      </div>

      {/* CONTACT MODAL */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">
              Contact Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {data.createdBy?.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {data.contactInfo}
              </p>
            </div>

            <button
              onClick={() => setShowContact(false)}
              className="mt-6 w-full px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Close 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
