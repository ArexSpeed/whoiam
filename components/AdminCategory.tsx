import { FC, useState } from 'react';
import Link from 'next/link';
import subcategories from 'data/subcategories.json';
import words from 'data/words.json';
import Icon from './Icon';

interface Props {
  category: string;
}

const AdminCategory: FC<Props> = ({ category }) => {
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
              .map((item) => (
                <div
                  key={item.subId}
                  className="flex flex-row w-full justify-between items-center p-2 border-b-2 border-blue-500 border-opacity-20">
                  <p className="text-sm">
                    {item.subcategory}
                    <span className="text-xs ml-1">
                      ({words.filter((word) => word.subId == item.subId).length})
                    </span>
                  </p>
                  <div className="flex flex-row justify-around items-center">
                    <Link href="/admin/add" passHref>
                      <button className="p-2 rounded-full" onClick={() => console.log('add')}>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </Link>
                    <Link href="/admin/edit" passHref>
                      <button className="p-2 rounded-full" onClick={() => console.log('edit')}>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
