export interface Task {
    task_id: number;

    project_id: number;

    task_owner: number;

    assigned_to: number;

    parent_task:number;

    task_name: string;

    task_description: string;

    task_status: string;

    task_creation:Date;

    task_target:Date;
}