export interface TodoItem {
    id: number
    name: string
    description: string
    completed: boolean
}

export interface TodoState {
    isModalOpen: boolean,
    action: "add" | "delete" | "edit",
    currentItem?: TodoItem
    note?: string
}