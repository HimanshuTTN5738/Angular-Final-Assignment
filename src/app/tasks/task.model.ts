export interface Task {
    id: number;
    name: string;
    dueDate: Date;
    priority: 'High' | 'Medium' | 'Low';
    notes?: string;
    completed: boolean;
  }
  