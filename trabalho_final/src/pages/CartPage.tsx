import React from "react";
import { useCartContext } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCartContext();

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {cart.map(({ item, quantity }) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded shadow-sm">
              <div>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p>{item.description}</p>
                <p>
                  <strong>Preço:</strong> R$ {item.price.toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <strong>Quantidade:</strong>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="w-12 text-center border rounded"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, quantity + 1)}
                    className="text-green-500 hover:text-green-700 font-bold px-2"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center text-red-500 hover:text-red-700 mt-2"
                >
                  <FaTrashAlt className="mr-1" /> Remover
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <h2 className="text-xl font-bold">
              Total: R$ {getTotal().toFixed(2)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
