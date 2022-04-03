interface Task {
  _id: string;
  content: string;
  state: "completed" | "active";
}

interface TaskContent {
  _id?: string;
  content?: string;
  state?: "completed" | "active";
}

interface EditMode {
  active: boolean;
  id: string;
}

interface FormValues {
  email?: string;
  password?: string;
}

interface User {
  _id: string;
  email: string;
  password: string;
  todo: Task[];
  token?: string;
  error?: string;
}

type Filter = "all" | "active" | "completed";

export { Task, TaskContent, EditMode, Filter, FormValues, User };
