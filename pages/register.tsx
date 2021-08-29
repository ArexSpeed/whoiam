import { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

type PayloadData = {
  email: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  password: FormDataEntryValue | null
}

export default function UserNew() {
  const [session, loading] = useSession();
  const registerForm = useRef<HTMLFormElement>(null!);
  const [error, setError] = useState<string | null>('');
  const [createInfo, setCreateInfo] = useState('');
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  // if (session) {
  //   router.push('/register');
  // }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(registerForm.current);
    const payload: PayloadData = {
      email: form.get('email'),
      name: form.get('name'),
      password: form.get('password')
    };

    if (payload.password !== null && payload.password.toString().length < 6) {
      setError('Password is too short. Min. 6 characters');
      setFormProcessing(false);
      return;
    }

    if (payload.password !== form.get('passwordConfirm')) {
      setError('Given passwords not match');
      setFormProcessing(false);
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setCreateInfo('Account is created. Now you can login');
      setFormProcessing(false);
      await signIn('credentials', {
        redirect: false,
        email: form.get('email'),
        password: form.get('password')
      });
      router.push('/');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins">
      <header className="w-full flex justify-center h-6">
        <p className="py-2">Register to Admin Panel</p>
      </header>
      <main className="w-full">
        <form
          className="flex flex-col justify-center items-center p-4 w-full"
          onSubmit={handleSubmit}
          ref={registerForm}>
          <input
            className="h-16 p-2 m-2 w-full bg-white rounded-sm"
            type="name"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
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
          <input
            className="h-16 p-2 m-2 w-full bg-white rounded-sm"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Confirm Password"
            required
          />
          <button
            className="m-2 inline-flex bg-blue-500 text-white p-2 rounded-sm"
            type="submit"
            disabled={formProcessing}>
            {formProcessing ? 'Creating...' : 'Register'}
          </button>
          {error && (
            <div className="w-full h-12 my-2 text-center text-md bg-red-500 text-white flex flex-row justify-start items-center shadow-md rounded-md">
              Account not created {error}
            </div>
          )}
          <p className="flex flex-row justify-center items-center">
            Have already account?
            <Link href="/login">
              <button className="m-2 inline-flex bg-blue-500 text-white p-2 rounded-sm">
                Login
              </button>
            </Link>
          </p>
          {createInfo && <p>{createInfo}</p>}
        </form>
      </main>
    </div>
  );
}
