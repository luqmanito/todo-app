type TaskStatus = 'not_started' | 'on_progress' | 'done' | 'reject';
export interface Task {
  id: number;
  name: string;
  assigne_id: number;
  description: string;
  last_update: string;
  created_at: string;
  status: TaskStatus;
}

interface Metadata {
  total_count: number;
  page_count: number;
  page: number;
  per_page: number;
  sort: string;
  order_by: string;
  keyword: string;
}

export interface ResponseData {
  data: Task[];
  metadata: Metadata;
  _meta: {
    code: number;
    status: string;
    message: string;
  };
}