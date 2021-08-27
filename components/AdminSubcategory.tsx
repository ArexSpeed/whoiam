import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch } from 'redux/hooks';
import { setCategory } from 'redux/slices/adminSlice';

interface Props {
  category: string;
  subName: string;
  subId: string;
}

//created because of words length, but rest working the same
const AdminSubcategory: FC<Props> = ({ category, subName, subId }) => {
  const [words, setWords] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/words?subId=${subId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json());
      console.log(data, 'data in async');
      setWords(data);
    })();
    console.log('effect words');
    }, [subName]);

  const selectCategory = (subcategory: string, subId: string) => {
    dispatch(setCategory({ category, subcategory, subId }));
  };
  return (
    <div className="flex flex-row w-full justify-between items-center p-2 border-b-2 border-blue-500 border-opacity-20">
      <p className="text-sm">
        {subName}
        <span className="text-xs ml-1">({words?.length})</span>
      </p>
      <div className="flex flex-row justify-around items-center">
        <Link href="/admin/add" passHref>
          <button className="p-2 rounded-full" onClick={() => selectCategory(subName, subId)}>
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
          <button className="p-2 rounded-full" onClick={() => selectCategory(subName, subId)}>
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
        </Link>
      </div>
    </div>
  );
};

export default AdminSubcategory;
