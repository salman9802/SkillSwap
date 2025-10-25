export type LogResponse = {
  logs: {
    id: string;
    type: string;
    route: string;
    metadata: JSON;
    timestamp: string;
    userId: string | null;
    user: { name: string } | null;
  }[];

  total: number;
};

export type LogData = {
  logs: {
    id: string;
    type: string;
    route: string;
    metadata: JSON;
    timestamp: Date;
    userId: string | null;
    user: { name: string } | null;
  }[];
  total: number;
};
