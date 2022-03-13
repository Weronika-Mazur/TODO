interface typeTask {
  _id: string;
  content: string;
  state: "completed" | "active";
}

interface typeTaskContent {
  _id?: string;
  content?: string;
  state?: "completed" | "active";
}

interface typeEditMode {
  active: boolean;
  id: string;
}

type typeFilter = "all" | "active" | "completed";

export { typeTask, typeTaskContent, typeEditMode, typeFilter };
