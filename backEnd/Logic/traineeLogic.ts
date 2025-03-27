import Trainee from "../Models/trainee";

// Function to fetch all trainees
export const getAllTrainees = async (userId: string) => {
  try {
    const trainees = await Trainee.find({ belongsTo: userId }).populate(
      "belongsTo"
    );
    return trainees;
  } catch (error) {
    console.error("Error fetching trainees:", error);
    throw new Error("Error fetching trainees");
  }
};

// Function to add a new trainee
export const addTrainee = async (traineeData: any) => {
  const belongsTo = traineeData.belongsTo;
  delete traineeData.belongsTo;
  const newTraineeToSave = { data: traineeData, belongsTo: belongsTo };

  try {
    const newTrainee = new Trainee(newTraineeToSave);
    await newTrainee.save();
    return newTrainee._id;
  } catch (error) {
    console.error("Error adding trainee:", error);
    throw new Error("Error adding trainee");
  }
};

// Function to edit a trainee
export const editTrainee = async (traineeId: string, updateData: any) => {
  const belongsTo = updateData.belongsTo;
  delete updateData.belongsTo;
  const newTraineeToSave = { data: updateData, belongsTo: belongsTo };

  try {
    const updatedTrainee = await Trainee.findByIdAndUpdate(
      traineeId,
      newTraineeToSave
    );
    return updatedTrainee;
  } catch (error) {
    console.error("Error editing trainee:", error);
    throw new Error("Error editing trainee");
  }
};

// Function to delete a trainee
export const deleteTrainee = async (traineeId: string) => {
  try {
    await Trainee.findByIdAndDelete(traineeId);
  } catch (error) {
    console.error("Error deleting trainee:", error);
    throw new Error("Error deleting trainee");
  }
};
export const getExpiredTrainees = async (userId: string, dateField: string) => {
  try {
    const trainees = await Trainee.find({ belongsTo: userId });

    // Filter trainees where the expiration date (from the nested dateField) has passed
    const expiredTrainees = trainees.filter((trainee) => {
      // Access the nested dateField inside trainee.date
      const expirationDate = new Date(
        trainee.data[dateField as keyof typeof trainee.data]
      );
      return expirationDate < new Date(); // Check if expired
    });

    return expiredTrainees.length;
  } catch (error) {
    console.error("Error fetching expired trainees:", error);
    throw new Error("Error fetching expired trainees");
  }
};

export const getExpiringTrainees = async (
  userId: string,
  dateField: string
) => {
  try {
    // Get the current date and the date 30 days from now
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight UTC

    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    thirtyDaysFromNow.setHours(23, 59, 59, 999); // Set to end of day UTC

    // Convert both dates to ISO strings
    const todayISOString = today.toISOString();
    const thirtyDaysFromNowISOString = thirtyDaysFromNow.toISOString();
    // Fetch trainees whose expiration date is within the next 30 days
    const trainees = await Trainee.find({
      belongsTo: userId,
      [`data.${dateField}`]: {
        $gte: todayISOString, // Expiration date after today
        $lte: thirtyDaysFromNowISOString, // Expiration date before or on 30 days from today
      },
    }).populate("belongsTo");

    return trainees.length;
  } catch (error) {
    console.error("Error fetching expiring trainees:", error);
    throw new Error("Error fetching expiring trainees");
  }
};

export const getGrowthTrainees = async (userId: string) => {
  try {
    // Get the date 30 days ago from today
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Subtract 30 days from today

    // Fetch trainees with createdAt within the last 30 days
    const trainees = await Trainee.find({
      belongsTo: userId,
      createdAt: {
        $gte: thirtyDaysAgo, // createdAt within the last 30 days
      },
    }).populate("belongsTo");

    // Return the number of trainees that match the criteria

    return trainees.length;
  } catch (error) {
    console.error("Error fetching growth trainees:", error);
    throw new Error("Error fetching growth trainees");
  }
};
