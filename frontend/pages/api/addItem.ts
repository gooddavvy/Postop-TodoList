import type { NextApiRequest, NextApiResponse } from "next"
import type { TodoItem } from "@/types"

type Data = TodoItem[]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let id = 0;
    let name = "test todo";
    let description = "just a test todo";
    let completed = false;
    res.status(200).json([{ id, name, description, completed }])
}
