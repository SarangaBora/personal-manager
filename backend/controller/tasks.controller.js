import Task from "../models/userTasks.model";

export const getTasksByDate = async (req, res) => {
  try {
    const { selectedDate } = req.query; //from query in api
    const userId = req.user._id; //get from middleware authenticate

    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    // Retrieve the tasks via thsi
    const tasks = await Task.find({
      _id: userId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: `Error retrieving tasks : ${e}` });
  }
};
