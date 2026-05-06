import { cookies } from 'next/headers';

export async function login(email) {

const user = { email };

const expires = new Date(Date.now() + 9999999999); 

const session = JSON.stringify({ user, expires }); 

  

  const cookiesStore = await cookies();
  cookiesStore.set('session', session, { expires });
}
//log out by expiring cookie
export async function logout() {
const cookiesStore = await cookies();
  cookiesStore.set('session', '', { expires: new Date(0) });
}

//returs session data if it exists
export async function getSession() {
const cookiesStore = await cookies();
  const sessionString = cookiesStore.get('session')?.value;
  if (!sessionString) return null;

  return JSON.parse(sessionString);
}
