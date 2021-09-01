import { useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useSession, signOut, getSession } from 'next-auth/client';
import type { CategoryType, SubcategoryType, WordsType } from 'types';
import AdminCategory from 'components/AdminCategory';
import { getCategories, getSubcategories, getUser, getWords } from 'services/getData';
import { useAppDispatch } from 'redux/hooks';
import { setWords } from 'redux/slices/adminSlice';
import Login from 'components/Login';
import Register from 'components/Register';

type User = {
  name: string;
  email: string;
  isAdmin: boolean;
};
interface Props {
  categories: CategoryType[];
  subcategories: SubcategoryType[];
  words: WordsType[];
  user: User[];
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const categories = await getCategories();
  const subcategories = await getSubcategories();
  const words = await getWords();
  const user = await getUser(session?.user?.email);

  return {
    props: {
      categories,
      subcategories,
      words,
      user
    }
  };
};

const AdminPage: NextPage<Props> = ({ categories, subcategories, words, user }) => {
  const [session, loading] = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useAppDispatch();
  // dispatch words to redux instead in all category, cause of connection number
  useEffect(() => {
    dispatch(setWords(words));
  }, [words, dispatch]);

  useEffect(() => {
    setIsAdmin(user[0]?.isAdmin);
  }, [user]);

  return !session && !loading ? (
    <div className="w-screen min-h-screen bg-green-100 flex flex-col relative font-poppins">
      <header className="w-full flex justify-center h-6">
        <p className="py-2">Login to Admin Panel</p>
      </header>
      <main className="w-full">
        <section className="flex flex-col justify-center items-center m-2 p-4 bg-primary">
          <p className="m-2 text-center">Login to your account:</p>
          <Login />
        </section>
        <p className="m-2 text-center">OR</p>
        <section className="flex flex-col justify-center items-center m-2 p-4 bg-yellow-100">
          <p className="m-2 text-center">Create new account:</p>
          <Register />
        </section>
      </main>
    </div>
  ) : (
    <div className="w-screen min-h-screen bg-green-100 flex flex-col relative font-poppins">
      <header className="w-full flex justify-center items-center relative">
        <p className="py-2">Admin Panel, {user[0]?.name}</p>
        <button
          className="absolute top-0 right-0 flex justify-center m-2 w-6 h-6 bg-white rounded-sm items-center"
          onClick={() => signOut()}>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </header>
      <main className="w-full">
        <section className="m-2">Categories:</section>
        <section className="w-full flex flex-col">
          {categories?.map((category) => (
            <AdminCategory
              key={category.catId}
              category={category.category}
              subcategories={subcategories}
              isAdmin={isAdmin}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
