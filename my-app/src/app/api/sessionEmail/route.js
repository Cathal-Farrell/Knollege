import { getSession } from '../../lib/session';

export async function GET(req) {


  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page");

  // get the values

  // that were sent across to us.

  const session = await getSession();

  // =================================================
  
  if (!session) {
    return Response.json({ email: "Not Logged In" });
  }
  
  // database call goes here

  // at the end of the process we need to send something back.

  return Response.json({ email: session.user.email }); 
}