import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import { selectedCategory, selectedWord } from 'redux/slices/gameSlice';
import MetaHead from 'components/MetaHead';
import NoSleep from 'lib/nosleep';

const Play = () => {
  const category = useAppSelector(selectedCategory);
  const word = useAppSelector(selectedWord);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(3);
  const [showWord, setShowWord] = useState<string[]>([]);
  const noSleep = new NoSleep();
  useEffect(() => {
    //device.allowSleeping();
    noSleep.enabled;
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      setStart(true);
      clearInterval(interval);
    }, 3000);
  }, []);

  useEffect(() => {
    const split = word.split(' ');
    setShowWord(split);
  }, [word]);

  return (
    <div className="relative flex flex-col w-screen h-screen min-h-screen overflow-hidden bg-primary font-poppins">
      <MetaHead />
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">
        {category.category} - {category.subcategory}
      </header>
      <Link href="/questions" passHref>
        <main className="flex flex-wrap items-center justify-center flex-grow w-full overflow-auto cursor-pointer">
          {start ? (
            <div className="flex flex-wrap mx-2 text-xl">
              {showWord.map((item, i) => (
                <span key={i} className="mr-2 break-all">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-lg">
              <p>Słowo wylosowane</p>
              <p>Odwróć telefon za</p>
              <p className="text-xl">{counter}</p>
            </div>
          )}
          <footer className="fixed bottom-0 flex-none w-full h-24 bg-white cursor-pointer">
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-lg">Pytania</span>
            </div>
          </footer>
        </main>
      </Link>
    </div>
  );
};

export default Play;
