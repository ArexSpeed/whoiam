import { FC, useState } from 'react';
import Link from 'next/link';

interface Props {
  title: string;
}

const CategoryBox: FC<Props> = ({ title }) => {
  const [active, setActive] = useState(false);
  const [subcategory, setSubcategory] = useState('');

  const handleSubcategory = (e: { target: HTMLInputElement | any }) => {
    setSubcategory(e.target.value);
  };

  return (
    <div className="flex flex-col h-auto items-center m-2 bg-white text-black rounded-lg shadow-sm">
      <button
        className="flex flex-row w-full h-[50px] items-center transition ease-in outline-none"
        onClick={() => setActive(!active)}>
        <svg
          className="w-8 h-8 mx-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
        <span className="mx-2 text-md">{title}</span>
      </button>
      {active && (
        <div className="flex flex-col justify-center items-center">
          <section className="flex flex-row flex-wrap justify-center">
            <div
              className={`${
                subcategory === 'Wszystko' && 'border border-green-500'
              } p-1 m-2 bg-primary rounded-full`}>
              <input
                type="radio"
                name="category"
                id="Wszystko"
                value="Wszystko"
                onClick={handleSubcategory}
              />
              <label htmlFor="Wszystko">
                <span className="mx-2">Wszystko</span>
              </label>
            </div>
            <div className="p-1 m-2 bg-primary rounded-full">
              <input
                type="radio"
                name="category"
                id="Kraje"
                value="Kraje"
                onClick={handleSubcategory}
              />
              <label htmlFor="Kraje">
                <span className="mx-2">Kraje</span>
              </label>
            </div>
            <div className="p-1 m-2 bg-primary rounded-full">
              <input
                type="radio"
                name="category"
                id="Miasta"
                value="Miasta"
                onClick={handleSubcategory}
              />
              <label htmlFor="Miasta">
                <span className="mx-2">Miasta</span>
              </label>
            </div>
            <div className="p-1 m-2 bg-primary rounded-full">
              <input
                type="radio"
                name="category"
                id="Miasta"
                value="Miasta"
                onClick={handleSubcategory}
              />
              <label htmlFor="Miasta">
                <span className="mx-2">Miasta</span>
              </label>
            </div>
          </section>
          <section>
            <Link href="/play" passHref>
              <button className="p-2 m-2 bg-green rounded-md">START</button>
            </Link>
          </section>
        </div>
      )}
    </div>
  );
};

export default CategoryBox;
