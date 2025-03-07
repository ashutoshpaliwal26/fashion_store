import Product from "../models/Product";

export const data = [
  {
    _id: "64c41e4a1f8b2f0012a84a01",
    title: "Men's Classic Denim Jacket",
    description: "A timeless denim jacket for men, perfect for casual wear.",
    price: "59.99",
    category: "MEN",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a02",
    title: "Men's Leather Chelsea Boots",
    description:
      "Premium leather Chelsea boots offering both style and comfort.",
    price: "120.00",
    category: "MEN",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a03",
    title: "Men's Slim Fit Chinos",
    description: "Comfortable slim-fit chinos suitable for various occasions.",
    price: "45.00",
    category: "MEN",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a04",
    title: "Women's Floral Maxi Dress",
    description: "A beautiful floral maxi dress, ideal for summer outings.",
    price: "75.00",
    category: "WOMEN",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a05",
    title: "Women's Lace-Up Sneakers",
    description: "Trendy lace-up sneakers that combine style and comfort.",
    price: "65.00",
    category: "WOMEN",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a06",
    title: "Women's Crossbody Bag",
    description: "A sleek crossbody bag made from high-quality materials.",
    price: "85.00",
    category: "WOMEN",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a07",
    title: "Unisex Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV protection.",
    price: "25.00",
    category: "ACCESSORIES",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a08",
    title: "Leather Wallet",
    description: "A durable leather wallet with multiple compartments.",
    price: "40.00",
    category: "ACCESSORIES",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a09",
    title: "Silk Scarf",
    description: "Elegant silk scarf available in various patterns.",
    price: "30.00",
    category: "ACCESSORIES",
    __v: 0,
  },
  {
    _id: "64c41e4a1f8b2f0012a84a0a",
    title: "Canvas Backpack",
    description: "A spacious canvas backpack suitable for daily use.",
    price: "70.00",
    category: "ACCESSORIES",
    __v: 0,
  },
];

export const insertProduct = async () => {
  const myAdd = await Product.insertMany(data);
  try {
    if (myAdd) {
      console.log("ALL Product Added Successfull");
    } else console.log("ALL Product Not Added Successfull");
  } catch (err) {
    console.log(err);
  }
};
