import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../styles.css"

function FriendDetailsPage({ friend }) {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleAddExpense = () => {
    if (newExpense.trim() !== "") {
      setExpenses([...expenses, { description: newExpense, amount: 0 }]);
      setNewExpense("");
    }
  };

  return (
    <div className="mx-auto bg-neededCyan flex flex-col items-center justify-center h-screen">

      <div className="items-center mb-4">
        <h1 className="text-2xl font-semibold">Fr1 (Friend1)</h1>
      </div>

      {/* Add Expense */}
        <div className="mb-4 flex flex-col w-72 sm:w-96 xl:w-80">

          <div className="p-2 border bg-white border-gray-300 rounded flex mb-4">
            <img src="/rupee-symbol.svg" style={{ height: "20px" }} />

            <input
              type="number"
              placeholder="*Amount"
              required
              className="ml-4 remove-arrow outline-none w-full" // Updated classes
              min={1}
              width={100}
            />
          </div>

          <DatePicker showIcon withPortal selected={startDate} onChange={(date) => setStartDate(date)} className="mb-4"/>

          <input
            type="text"
            placeholder="Description"
            className="p-2 border border-gray-300 rounded mr-2 w-full outline-none mb-4"
          />

          <button
            type="button"
            onClick={handleAddExpense}
            className="bg-neededBlue text-white py-2 px-4 rounded hover:bg-neededPurple"
          >
            Add
          </button>

        </div>

      {/* Transaction History */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {expenses.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className="mb-2">
                {expense.description} - ₹{expense.amount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FriendDetailsPage;
