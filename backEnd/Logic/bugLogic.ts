import Bug from "../Models/bug";
export const uploadBug = async (bug: any) => {
  const bugToSave = new Bug({
    title: bug.title,
    description: bug.description,
    user: bug.user,
    img: bug.img,
    createdAt: new Date(),
  });
  const res = bugToSave.save();
  // Save the bug to the database

  return (await res)._id;
};
