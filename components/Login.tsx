import { useRef, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

const Login = () => {
  const loginForm = useRef<HTMLFormElement>(null!);
  const [error, setError] = useState<string | null>(null);
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(loginForm.current);
    const response = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    if (response && response.ok) {
      router.push('/admin');
      setFormProcessing(false);
    } else {
      setError('Wrong login or password');
      setFormProcessing(false);
    }
  };

  return (
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
        <div className="w-full p-2 my-2 text-center text-sm bg-red-500 text-white flex flex-row justify-center items-center shadow-md rounded-md">
          {error}
        </div>
      )}
    </form>
  );
};

export default Login;
