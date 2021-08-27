import { FC, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import type { SubcategoryType } from 'types';
import AdminSubcategory from './AdminSubcategory';

interface Props {
  category: string;
  subcategories: SubcategoryType[];
}

const AdminCategory: FC<Props> = ({ category, subcategories }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col h-auto items-center m-2 bg-white text-black rounded-lg shadow-sm">
      <button
        className="flex flex-row w-full h-[50px] items-center transition ease-in outline-none"
        onClick={() => setActive(!active)}>
        <Icon name={category} />
        <span className="mx-2 text-md">{category}</span>
      </button>
      {active && (
        <div className="flex flex-col justify-center items-center">
          <section className="flex flex-row flex-wrap justify-center">
            {subcategories
              .filter((sub) => sub.category === category)
              .map((item, i) => (
                <AdminSubcategory key={i} category={category} subName={item.subcategory} subId={item.subId} />
              ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
