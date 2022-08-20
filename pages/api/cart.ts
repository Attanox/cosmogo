import { getCartId } from "lib/cart.client";
import { NextApiResponse, NextApiRequest } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ cartId: string }>
) {
  const cartId = getCartId({ req, res });

  return res.status(200).json({ cartId });
}
