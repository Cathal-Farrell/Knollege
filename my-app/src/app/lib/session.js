//https://nextjs.org/docs/app/guides/authentication#authorization

import { cookies } from 'next/headers';

export async function login(formData) {

  const user = { email: formData.get('email'), name: 'User' };

  const expires = new Date(Date.now() + 9999999999); 

  const session = JSON.stringify({ user, expires }); 

  
  
  const cookiesStore = await cookies();
  cookiesStore.set('session', session, { expires, httpOnly: true });
}

export async function logout() {
const cookiesStore = await cookies();
  cookiesStore.set('session', '', { expires: new Date(0) });
}

export async function getSession() {
const cookiesStore = await cookies();
  const sessionString = cookiesStore.get('session').value;
  if (!sessionString) return null;

 return JSON.parse(sessionString);
}
