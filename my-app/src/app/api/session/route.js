import { getSession } from '../../lib/session';

export async function GET(req) {
  const session = await getSession();
  
  if (!session) {
    return Response.json({ email: "Not Logged In" });
  }

  return Response.json({ email: session.user.email }); 
}