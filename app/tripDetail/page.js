import React, { useState } from "react"
import DatePicker from "react-datepicker"
import Modal from "@mui/material/Modal"
import "react-datepicker/dist/react-datepicker.css"
import "../globals.css"

export default function TripPage () {
  const [expenses, setExpenses] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const friends = [
    { id: 1, name: "Friend1" },
    { id: 2, name: "Friend2" },
  ];

  return (
    <div className="container mx-auto mt-8 bg-neededCyan rounded-md p-8">
      <h1>Trip1</h1>

      <button
        type="button"
        onClick={handleOpen}
        className="bg-neededBlue text-white py-2 px-4 rounded hover:bg-neededPurple"
      >
        Add New Expense
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col justify-center items-center m-2 sm:m-24 lg:m-64 bg-neededLightCyan p-2 rounded-lg">
          <input
            type="text"
            placeholder="Expense Description"
            className="p-2 border border-gray-300 rounded w-full outline-none mb-2"
          />

          <DatePicker
            showIcon
            disabledKeyboardNavigation
            withPortal
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded bg-white border-gray-300 mb-2"
          />

          <div className="flex mb-2 w-2/3 justify-center items-center">
            <img src="" alt="" />
            <h2 className="w-1/3">Friend 1(Fr 1)</h2>
            <input
              type="number"
              placeholder="*Amount"
              required
              className="ml-4 remove-arrow outline-none w-2/3" // Updated classes
              min={1}
              width={100}
            />
          </div>

          <button
            type="button"
            onClick={handleOpen}
            className="bg-neededBlue text-white py-2 px-4 rounded hover:bg-neededPurple"
          >
            Add Expense
          </button>
        </div>
      </Modal>

      {/* Transaction History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {expenses.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className="mb-2">
                {expense.description} - ₹{expense.amount} ({expense.friend.name}
                )
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

