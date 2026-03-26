import { logout } from '../../lib/session';

export async function GET(req) {
  await logout();

  console.log("logged out");
  return Response.json({ success: true });
}