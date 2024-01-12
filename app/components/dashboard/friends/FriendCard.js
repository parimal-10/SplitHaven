"use client"
import React, { useState } from "react"
import { Modal } from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"

export default function FriendCard({ userID, friend }) {
  const username = friend.email.slice(0, friend.email.lastIndexOf("@"));
  const transactions = friend.transactions;
  const friendID = friend.id;

  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    amount: "",
    description: ""
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function addExpense() {
    try {

      const response = await axios.post("/api/dashboard/friends/addExpense", { formData, startDate, userID, friendID });
      console.log(response);

    } catch (err) {
      console.log("Error adding expense", err);
    }
  }

  return (
    <div>
      <div
        className="bg-neededCyan p-4 shadow-md rounded-md mb-4 flex items-center max-w-sm min-w-fit cursor-pointer"
        onClick={handleOpen}
      >

        <img src={`/avatar-${friend.avatar}.jpg`} className="mr-4 h-8 w-8 rounded-full"></img>

        <h3 className="text-xl font-semibold">
          {username} ({friend.name})
        </h3>

        <div className="ml-auto">
          {friend.balance > 0 && (
            <span className="text-green-600">{`+ ₹${friend.balance}`}</span>
          )}
          {friend.balance < 0 && (
            <span className="text-red-600">{`- ₹${Math.abs(friend.balance)}`}</span>
          )}
        </div>

      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="my-4 mx-4 bg-neededCyan flex flex-col items-center justify-center">

          <div className="items-center mb-4 mt-4">
            <h1 className="text-2xl font-semibold">{username} ({friend.name})</h1>
          </div>

          {/* Add Expense */}
          <div className="mb-4 flex flex-col w-72 sm:w-96 xl:w-80">

            <div className="p-2 border bg-white border-gray-300 rounded flex mb-4">
              <img src="/rupee-symbol.svg" style={{ height: "20px" }} />

              <input
                type="number"
                placeholder="*Amount"
                name="amount"
                required
                value={formData.amount}
                onChange={handleChange}
                className="ml-4 remove-arrow outline-none w-full"
                min={1}
                width={100}
              />
            </div>

            <DatePicker showIcon withPortal required selected={startDate} onChange={(date) => setStartDate(date)} className="mb-4" />

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-2 border border-gray-300 rounded mr-2 w-full outline-none mb-4"
            />

            <button
              type="button"
              onClick={addExpense}
              className="bg-neededBlue text-white py-2 px-4 rounded hover:bg-neededPurple"
            >
              Add
            </button>

          </div>

          {/* Transaction History */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
              <p>No transactions yet.</p>
            ) : (
              <ul>
                {transactions.map((transaction) => (
                  <div className="flex gap-2">
                    <h2>{transaction?.time.toString().slice(0, 11)}</h2>
                    <h3>{transaction.description}</h3>
                    {transaction.payer_id === userID && (
                      <span className="text-green-600">{`+ ₹${transaction.amount}`}</span>
                    )}
                    {transaction.payee_id === userID && (
                      <span className="text-red-600">{`- ₹${transaction.amount}`}</span>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

