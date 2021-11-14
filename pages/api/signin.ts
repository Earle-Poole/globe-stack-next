// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export interface SignInRequest {
  username: string;
  password: string;
}
export interface SignInResponse {
  isSuccess: boolean;
}

const validCredentials = { username: 'admin', password: 'admin' };

const handler = (req: NextApiRequest, res: NextApiResponse<SignInResponse>) => {
  const { username, password } = req.body as SignInRequest;
  if (username === validCredentials.username && password === validCredentials.password) {
    res.status(200).json({ isSuccess: true });
  } else {
    res.status(401).json({ isSuccess: false });
  }
};

export default handler;
