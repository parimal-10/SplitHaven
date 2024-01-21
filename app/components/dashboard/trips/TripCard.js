"use client"
import React, { useState } from "react"
import DatePicker from "react-datepicker"
import Modal from "@mui/material/Modal"
import "react-datepicker/dist/react-datepicker.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"

export default function TripPage({ trip, userID }) {
  const tripID = trip.trip_id;
  const friends = trip.trips.user_trips;
  const transactions = trip.trips.trip_transactions;
  let balance = 0;

  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState(null);
  const data = {};

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function calcBalance() {
    transactions.forEach(transaction => {
      if (transaction.payer_id === userID) {
        balance += Number(transaction.amount);
      } else {
        balance -= Number(transaction.amount);
      }
    });
  }

  function handleInputChange(event, friendId) {
    data[friendId] = event.target.value;
  }

  async function addExpense() {
    try {

      const response = await axios.post("/api/dashboard/trips/addExpense", { tripID, userID, description, startDate, data });
      toast("Transaction Added");
      setStartDate(new Date());
      setDescription(null);

    } catch (err) {
      console.log("Error adding transaction", err);
    }

  }

  calcBalance();

  return (
    <div>
      <div
        className="bg-neededCyan p-4 shadow-md rounded-md mb-4 flex items-center max-w-sm min-w-fit cursor-pointer"
        onClick={handleOpen}
      >

        <h1>{trip.trips.name}</h1>

        <div className="ml-auto">
          {balance >= 0 && (
            <span className="text-green-600">{`+ ₹${balance}`}</span>
          )}
          {balance < 0 && (
            <span className="text-red-600">{`- ₹${Math.abs(balance)}`}</span>
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
            <h1 className="text-2xl font-semibold">{trip.trips.name}</h1>
          </div>

          <ToastContainer />

          <div className="mb-4 flex flex-col w-72 sm:w-96 xl:w-80">
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full outline-none mb-2"
            />

            <DatePicker
              showIcon
              withPortal
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border p-2 rounded bg-white border-gray-300 mb-2"
            />

            {friends.length === 0 ? (
              <p>No friends added yet to the trip.</p>
            ) : (
              <ul>

                {friends.map((friend) => (
                  friend.user_id !== userID && (
                    <div key={friend.user_id} className="flex mb-2 w-full items-center">

                      <h2>
                        {friend.users.email.slice(0, friend.users.email.lastIndexOf("@"))} ({friend.users.name})
                      </h2>

                      <div className="p-2 border bg-white border-gray-300 rounded flex ml-auto">
                        <img src="/rupee-symbol.svg" style={{ height: "20px" }} />

                        <input
                          type="number"
                          key={friend.user_id}
                          required
                          onChange={(e) => handleInputChange(e, friend.user_id)}
                          className="remove-arrow outline-none w-9 ml-2"
                          min={1}
                        />
                      </div>
                    </div>
                  )))}
              </ul>
            )}

            <button
              type="button"
              onClick={addExpense}
              className="bg-neededBlue text-white py-2 px-4 rounded hover:bg-neededPurple"
            >
              Add Expense
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

                    <h2>{transaction?.time.toString().slice(0, 10)}</h2>

                    <h2>{transaction?.users_trip_transactions_payer_idTousers?.email.slice(0, transaction?.users_trip_transactions_payer_idTousers?.email.lastIndexOf("@"))} ({transaction?.users_trip_transactions_payer_idTousers?.name})</h2>

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
};

