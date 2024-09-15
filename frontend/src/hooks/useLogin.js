import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "Login failed");
        return;
      }

      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred during login");
    }
  };

  return { login, isLoading, error };
};
