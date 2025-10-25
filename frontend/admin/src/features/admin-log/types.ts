export type LogResponse = {
  logs: {
    id: string;
    type: string;
    route: string;
    metadata: JSON;
    timestamp: string;
    adminId: string | null;
    admin: { name: string } | null;
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
    adminId: string | null;
    admin: { name: string } | null;
  }[];
  total: number;
};
