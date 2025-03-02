export interface GlobalResponse<T>{
  message: string;
  status: string;
  code: string;
  data?: T;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

export interface TaskRequest {
  title: string;
  description: string;
  status: 'START' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  dueDate: string;
}
