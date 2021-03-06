import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setCategory, setWord, allSubcategories } from 'redux/slices/gameSlice';
import Icon from './Icon';

interface Props {
  category: string;
}

const CategoryBox: FC<Props> = ({ category }) => {
  const subcategories = useAppSelector(allSubcategories);
  const [active, setActive] = useState(false);
  const [subcategory, setSubcategory] = useState('');
  const [subId, setSubId] = useState('');
  const [start, setStart] = useState('START');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubcategory = (e: { target: HTMLInputElement | any }) => {
    setSubcategory(e.target.value);
    setSubId(e.target.id);
  };

  const handleStart = () => {
    dispatch(
      setCategory({
        category,
        subcategory,
        subId
      })
    );
    drawWord();
    setStart('LOSUJE...');
  };

  const drawWord = async () => {
    const words = await fetch(`/api/words?subId=${subId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());

    const rand = Math.floor(Math.random() * words.length);
    const randWord = words[rand].value;
    dispatch(setWord(randWord));
    router.push('/play');
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
                  key={item.subId}
                  className={`${
                    subcategory === item.subcategory && 'border border-green-500'
                  } p-1 m-2 bg-primary rounded-full`}>
                  <input
                    type="radio"
                    className="cursor-pointer"
                    name={category}
                    id={item.subId}
                    value={item.subcategory}
                    onClick={handleSubcategory}
                  />
                  <label htmlFor={item.subId} className="cursor-pointer">
                    <span className="mx-2">{item.subcategory}</span>
                  </label>
                </div>
              ))}
          </section>
          <section>
            {subcategory &&
              subcategories
                .filter((sub) => sub.category === category && sub.subcategory === subcategory)
                .map((item, i) => (
                  <p key={i} className="text-xs">
                    <i>Przyk??ad:</i> {item.example[0]}, {item.example[1]}, {item.example[2]}
                  </p>
                ))}
          </section>
          <section>
            <button className="p-2 m-2 bg-green-500 rounded-md" onClick={handleStart}>
              {start}
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default CategoryBox;
