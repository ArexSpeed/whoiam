import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import { selectedCategory, selectedSubcategory } from 'redux/slice';

const Play = () => {
  const [word, setWord] = useState<string[]>([]);
  const category = useAppSelector(selectedCategory);
  const subcategory = useAppSelector(selectedSubcategory);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(5);
  const haslo = 'Ameryka Południowa';

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      setStart(true);
      clearInterval(interval);
    }, 5000);
  }, []);

  useEffect(() => {
    const split = haslo.split(' ');
    setWord(split);
  }, [haslo]);

  return (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins overflow-hidden">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">
        {category} - {subcategory}
        {console.log(counter)}
      </header>
      <main className="w-full flex flex-wrap flex-grow justify-center items-center overflow-auto">
        {start ? (
          <div className="text-xl mx-2 flex flex-wrap">
            {word.map((item, i) => (
              <span key={i} className="break-all mr-2">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-lg">
            <p>Słowo wylosowane</p>
            <p>Odwróć telefon za</p>
            <p className="text-xl">{counter}</p>
          </div>
        )}
      </main>
      <Link href="/questions" passHref>
        <footer className="w-full h-[100px] bg-white flex-none">
          <div className="flex w-full h-full justify-center items-center">
            <span className="text-lg">Pytania</span>
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Play;
