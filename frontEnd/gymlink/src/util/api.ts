import http from "./https";

// Example function to get user data
export const getUser = async (userId: string) => {
  try {
    const response = await http.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Example function to create a new user
export const createUser = async (userData: any) => {
  try {
    const response = await http.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Example function to update user data
export const updateUser = async (userId: string, userData: any) => {
  try {
    const response = await http.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// Example function to delete a user
export const deleteUser = async (userId: string) => {
  try {
    const response = await http.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to log in a user
export const logInUser = async (email: string, password: string) => {
  console.log("Logging in user with email:", email);
  try {
    const requestData = { email, password };
    console.log("Request Body:", JSON.stringify(requestData)); // Log request data

    const response = await http.post("/user/login", requestData);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Function to register a new user
export const registerUser = async (userData: any) => {
  try {
    const response = await http.post("/user/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
