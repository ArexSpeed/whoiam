import { useEffect } from 'react';
import CategoryBox from 'components/CategoryBox';
import { useAppDispatch } from 'redux/hooks';
import type { NextPage } from 'next';
import type { CategoryType, SubcategoryType } from 'types';
import { getCategories, getSubcategories } from 'services/getData';
import { setSubcategories } from 'redux/slices/gameSlice';

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
    dispatch(setSubcategories(subcategories))
  }, [subcategories]);
  return (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins">
      <header className="w-full flex justify-end">
        <button className="flex justify-center m-2 w-6 h-6 bg-white rounded-sm items-center">
          ?
        </button>
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
