export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'completed';
  due_date: string | null;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface PasswordEntry {
  id: number;
  user_id: number;
  site_name: string;
  site_url: string | null;
  username: string;
  password: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string | null;
  date: string;
  location: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface Artist {
  id: number;
  name: string;
  genre: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  relatedArtistId?: string;
  relatedEventId?: string;
  todos: ProjectTodo[];
  transactions: ProjectTransaction[];
}

export interface ProjectTodo {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export interface ProjectTransaction {
  id: string;
  projectId: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
}