
import type { NextApiRequest, NextApiResponse } from 'next';
import {StoreType} from "@/interface";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreType[]>
) {
  const stores = (await import("../../data/store_data.json"))[
    "DATA"
] as StoreType[];

res.status(200).json(stores); 

}