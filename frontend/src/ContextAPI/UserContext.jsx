import React, { createContext, useContext, useState } from "react";

// Create the User Context
const UserContext = createContext();

// Create a custom hook to use the User Context
export const useUser = () => {
  return useContext(UserContext);
};

// Create a provider component
export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);  // Clear previous errors
    setMessage("");  // Clear previous messages

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Show success message
      } else {
        // Handle specific error cases
        if (data.error === "User already exists") {
          setError("User already exists!");
        } else {
          setError(data.message || "Something went wrong");
        }
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ registerUser, loading, error, message }}>
      {children}
    </UserContext.Provider>
  );
};
