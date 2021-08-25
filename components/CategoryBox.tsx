import { FC, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from 'redux/hooks';
import { setCategory } from 'redux/slice';
import subcategories from 'data/subcategories.json';
import Icon from './Icon';

interface Props {
  category: string;
}

const CategoryBox: FC<Props> = ({ category }) => {
  const [active, setActive] = useState(false);
  const [subcategory, setSubcategory] = useState('');
  const dispatch = useAppDispatch();

  const handleSubcategory = (e: { target: HTMLInputElement | any }) => {
    setSubcategory(e.target.value);
  };

  const handleStart = () => {
    dispatch(
      setCategory({
        category,
        subcategory
      })
    );
  };

  return (
    <div className="flex flex-col h-auto items-center m-2 bg-white text-black rounded-lg shadow-sm">
      <button
        className="flex flex-row w-full h-[50px] items-center transition ease-in outline-none"
        onClick={() => {
          setActive(!active);
          setSubcategory('');
        }}>
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
                  key={item.id}
                  className={`${
                    subcategory === item.subcategory && 'border border-green-500'
                  } p-1 m-2 bg-primary rounded-full`}>
                  <input
                    type="radio"
                    name={category}
                    id={item.subcategory}
                    value={item.subcategory}
                    onClick={handleSubcategory}
                  />
                  <label htmlFor={item.subcategory}>
                    <span className="mx-2">{item.subcategory}</span>
                  </label>
                </div>
              ))}
          </section>
          <section>
            <Link href="/play" passHref>
              <button className="p-2 m-2 bg-green-500 rounded-md" onClick={handleStart}>
                START
              </button>
            </Link>
          </section>
        </div>
      )}
    </div>
  );
};

export default CategoryBox;
