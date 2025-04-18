import React, { useState } from "react";
import axios from "axios";

const Product: React.FC = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const handleCreateProduct = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8081/product/create",
        {
          name,
          code,
          description,
          category,
          stock,
          price,
          image,
          isAvailable,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Produk berhasil dibuat!");
      console.log("Response:", response);
    } catch (error) {
      console.error("Create error:", error);
      alert("Gagal membuat produk.");
    }
  };

  return (
    <div>
      <h2>Buat Produk</h2>
      <input
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Kode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="Stok"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <input
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <label>
        Tersedia:
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={() => setIsAvailable(!isAvailable)}
        />
      </label>
      <button onClick={handleCreateProduct}>Buat Produk</button>
    </div>
  );
};

export default Product;
