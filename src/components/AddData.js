import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddData = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name === "price" && name]: parseInt(value),
      [name === "name" && name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => console.log(res.status));
    return navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 rounded-lg shadow shadow-gray-300">
      <div className="">
        <Link
          to="/"
          className="border border-slate-400 px-4 py-2 bg-green-200 hover:bg-green-400 outline-none"
        >
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Product name</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              className="w-full py-2 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500"
              placeholder="Product"
              required
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Price</label>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              className="w-full py-2 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500"
              placeholder="Price"
              required
            />
          </div>
          <button
            type="submit"
            className="my-5 font-bold border border-slate-500 bg-blue-400 rounded-lg py-2 "
            disabled={!data}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddData;
