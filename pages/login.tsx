import { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

const Login = () => {
  const [session, loading] = useSession();
  const loginForm = useRef<HTMLFormElement>(null!);
  const [error, setError] = useState<string | null>(null);
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  // if (session) {
  //   router.push('/');
  // }
  console.log(session, 'session');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(loginForm.current);
    const ok = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    if (ok) {
      router.push('/');
    } else {
      setError('Wrong password or login');
      setFormProcessing(false);
    }
  };

  return session ? (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins">
      <p>Loggin as {session.user?.name}</p>
      <button className="m-2 inline-flex bg-blue-500 text-white p-2 rounded-sm" onClick={() => signOut()}>
        Log out
      </button>
    </div>
  ) : (
    !session && !loading && (
      <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins">
        <header className="w-full flex justify-center h-6">
          <p className="py-2">Login to Admin Panel</p>
        </header>
        <main className="w-full">
          <form
            className="flex flex-col justify-center items-center p-4 w-full"
            onSubmit={handleSubmit}
            ref={loginForm}>
            <input
              className="h-16 p-2 m-2 w-full bg-white rounded-sm"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className="h-16 p-2 m-2 w-full bg-white rounded-sm"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />

            <button
              className="m-2 inline-flex bg-blue-500 text-white p-2 rounded-sm"
              type="submit"
              disabled={formProcessing}>
              {formProcessing ? 'Process...' : 'Login'}
            </button>
            {error && (
              <div className="w-full h-12 my-2 text-center text-md bg-red-500 text-white flex flex-row justify-center items-center shadow-md rounded-md">
                {error}
              </div>
            )}
          </form>
        </main>
      </div>
    )
  );
};

export default Login;
