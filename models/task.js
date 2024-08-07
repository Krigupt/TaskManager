import mongoose from "mongoose";


// Define the schema for a Task
const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true, // Ensures that 'task' field is required
  },
  completed: {
    type: Boolean,
    default: false, // Default value for 'completed' field
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Ensures that 'createdBy' field is required
  },
}, {
  timestamps: true, // Automatically includes createdAt and updatedAt timestamps
});

// Export the Task model
export default mongoose.model('Task', TaskSchema);
