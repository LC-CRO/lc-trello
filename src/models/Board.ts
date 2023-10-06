export interface Board {
    id?: string;
    name: string;
    columns: Column[];
}

export interface Column {
    id?: string;
    name: string;
    tasks: Task[];
}

export interface Task {
    id?: string;
    name: string;
    description?: string;
    images?: string[]; // URLs of images
}
