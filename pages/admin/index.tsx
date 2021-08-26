import React from 'react';
import type { NextPage } from 'next';
import AdminCategory from 'components/AdminCategory';
import { getCategories, getSubcategories } from 'services/categories';

type Categories = {
  catId: string,
  category: string
}
type Subcategories = {
  subId: string,
  category: string,
  subcategory: string
}
interface Props {
  categories: Categories[];
  subcategories: Subcategories[];
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

const AdminPage: NextPage<Props>  = ({ categories, subcategories }) => {
  return (
    <div className="w-screen min-h-screen bg-green-100 flex flex-col relative font-poppins">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">Admin Panel</header>
      <main className="w-full">
        <section className="m-2">Categories:</section>
        <section className="w-full flex flex-col">
          {categories?.map((category) => (
            <AdminCategory key={category.catId} category={category.category} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
