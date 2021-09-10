import { useEffect } from 'react';
import CategoryBox from 'components/CategoryBox';
import { useAppDispatch } from 'redux/hooks';
import type { NextPage } from 'next';
import Link from 'next/link';
import type { CategoryType, SubcategoryType } from 'types';
import { getCategories, getSubcategories } from 'services/getData';
import { setSubcategories } from 'redux/slices/gameSlice';
import MetaHead from 'components/MetaHead';

interface Props {
  categories: CategoryType[];
  subcategories: SubcategoryType[];
}

export const getServerSideProps = async () => {
  const categories = await getCategories();
  const subcategories = await getSubcategories();

  return {
    props: {
      categories,
      subcategories
    }
  };
};

const Home: NextPage<Props> = ({ categories, subcategories }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSubcategories(subcategories));
  }, [subcategories, dispatch]);
  return (
    <div className="w-screen min-h-screen bg-primary flex flex-col relative font-poppins">
      <MetaHead />
      <header className="w-full flex justify-center items-center relative">
        <p className="py-2 mt-2">Zgadnij kim jesteś? - Gra</p>
        <Link href="/rules" passHref>
          <button className="absolute top-0 right-0 flex justify-center m-2 p-1 bg-white rounded-sm items-center">
            Zasady
          </button>
        </Link>
      </header>
      <main className="w-full">
        <section className="m-2">Wybierz kategorie:</section>
        <section className="w-full flex flex-col">
          {categories?.map((category) => (
            <CategoryBox key={category.catId} category={category.category} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
