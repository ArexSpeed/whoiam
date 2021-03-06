import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Icon from './Icon';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setCategory } from 'redux/slices/adminSlice';
import { adminWords } from 'redux/slices/adminSlice';
import type { SubcategoryType } from 'types';

interface Props {
  category: string;
  subcategories: SubcategoryType[];
  userName: string;
  isAdmin: boolean;
}

const AdminCategory: FC<Props> = ({ category, subcategories, userName, isAdmin }) => {
  const words = useAppSelector(adminWords);
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectCategory = (subcategory: string, subId: string, link: 'add' | 'edit') => {
    const addBy = userName;
    const createdAt = Date.now();
    if (isAdmin) {
      dispatch(setCategory({ category, subcategory, subId, addBy, createdAt }));
      if (link === 'add') {
        router.push('/admin/add');
      }
      if (link === 'edit') {
        router.push('/admin/edit');
      }
    } else {
      alert('You are not Admin yet! Wait until you will get access!');
    }
  };

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
                    <button
                      className="p-2 rounded-full"
                      onClick={() => selectCategory(item.subcategory, item.subId, 'add')}>
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
                    <button
                      className="p-2 rounded-full"
                      onClick={() => selectCategory(item.subcategory, item.subId, 'edit')}>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
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
