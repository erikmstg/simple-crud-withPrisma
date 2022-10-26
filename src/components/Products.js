import { Link } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

const Products = () => {
  const { mutate } = useSWRConfig();
  const Product = async () => {
    const req = await fetch("/product", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })
      .then((result) => result.json())
      .catch((error) => console.log(error));
    return req;
  };

  const { data } = useSWR("product", Product);
  if (!data) return;
  console.log(data);

  const handleDelete = async (id) => {
    await fetch(`/product/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    });
    return mutate("product");
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="w-full">
        <div className="flex justify-end">
          <Link
            to="/add"
            className="bg-green-400 hover:bg-green-700 border border-black text-xs rounded-sm font-bold py-2 px-3"
          >
            Add Data
          </Link>
        </div>
        <div className="relative shadow mt-3">
          <table className="w-full text-sm text-left rounded-3xl">
            <thead className="text-xs uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, i) => (
                <tr key={value.id}>
                  <td className="py-3 px-1 text-center">{i + 1}</td>
                  <td className="py-3 px-6">{value.name}</td>
                  <td className="py-3 px-6">{value.price}</td>
                  <td className="py-3 px-1 text-center space-x-2">
                    <Link
                      to={`/product/${value.id}`}
                      className="font-medium bg-blue-300 hover:bg-blue-500 px-2 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(value.id)}
                      className="font-medium bg-red-300 hover:bg-red-500 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
