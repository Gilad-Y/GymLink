import http from "./https";

// Example function to get user data
export const getUser = async (userId: string) => {
  try {
    const response = await http.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Example function to update user data
export const updateUser = async (userId: string, userData: any) => {
  if (userData.isNew) {
    delete userData.isNew;
    delete userData.id;
    userData._password = "123456789";
    return registerUser(userData);
  }
  try {
    const response = await http.put(`/user/edit/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// Example function to delete a user
export const deleteUser = async (userId: string) => {
  try {
    const response = await http.delete(`/user/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to log in a user
export const logInUser = async (email: string, password: string) => {
  try {
    const requestData = { email, password };
    const response = await http.post("/user/login", requestData);
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

export const getColumnsByUserId = async (userId: any) => {
  try {
    const response = await http.get(`/column/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
};

export const createColumn = async (columnData: any) => {
  columnData.data = null;
  console.log("Creating column with data:", columnData);
  try {
    const response = await http.post("/column/addColumn", columnData);
    return response.data;
  } catch (error) {
    console.error("Error creating column:", error);
    throw error;
  }
};

export const updateColumn = async (columnId: any, updateData: any) => {
  try {
    const response = await http.put(`/column/${columnId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating column:", error);
    throw error;
  }
};

export const deleteColumn = async (columnId: any) => {
  try {
    const response = await http.delete(`/column/${columnId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting column:", error);
    throw error;
  }
};

export const addTrainees = async (traineeData: any) => {
  try {
    const response = await http.post("trainee/", traineeData);
    return response.data;
  } catch (error) {
    console.error("Error adding trainee:", error);
    throw error;
  }
};

// Function to get trainees by user ID
export const getTraineesByUserId = async (Id: string) => {
  console.log("Fetching trainees for user ID:", Id);
  try {
    const response = await http.get(`/trainee/${Id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trainees:", error);
    throw error;
  }
};

// Function to update trainee data
export const updateTrainee = async (id: string, traineeData: any[]) => {
  try {
    const response = await http.put(`/trainee/${id}`, traineeData);
    return response.data;
  } catch (error) {
    console.error("Error updating trainee:", error);
    throw error;
  }
};

// Function to add a new coach
export const addCoach = async (coachData: any) => {
  try {
    const response = await http.post("/user/addCoach", coachData);
    return response.data;
  } catch (error) {
    console.error("Error adding coach:", error);
    throw error;
  }
};
export const getCoachesByIds = async (id: string) => {
  try {
    const response = await http.get(`/user/getCoaches/${id}`);
    return response.data.map((coach: any) => {
      const { password, ...coachWithoutPassword } = coach;
      return coachWithoutPassword;
    });
  } catch (error) {
    console.error("Error fetching coaches:", error);
    throw error;
  }
};
export const deleteTrainee = async (id: any) => {
  try {
    const response = await http.delete(`/trainee/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting column:", error);
    throw error;
  }
};
