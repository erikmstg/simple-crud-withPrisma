import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditData = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const ProductId = async () => {
      const dataProduct = await fetch(`/product/${id}`, {
        method: "GET",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const result = await dataProduct.json();
      setName(result.name);
      setPrice(result.price);
    };
    ProductId();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();

    await fetch(`/product/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseInt(price) }),
    }).then((res) => res.json());

    return navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 rounded-lg shadow shadow-gray-300">
      <div className=""></div>
      <form className="my-10" onSubmit={updateData}>
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Product name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              type="text"
              className="w-full py-2 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500"
              placeholder="Product"
              required
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              name="price"
              type="number"
              className="w-full py-2 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500"
              placeholder="Price"
              required
            />
          </div>
          <button
            type="submit"
            className="my-5 font-bold border border-slate-500 bg-green-400 rounded-lg py-2 "
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditData;
