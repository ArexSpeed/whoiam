import { useState, useEffect } from 'react';
//import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import { selectedCategory, selectedWord } from 'redux/slices/gameSlice';
import MetaHead from 'components/MetaHead';
import Questions from 'components/Questions';
import { useNoSleep } from 'use-no-sleep';

const Play = () => {
  const category = useAppSelector(selectedCategory);
  const word = useAppSelector(selectedWord);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(3);
  const [showWord, setShowWord] = useState<string[]>([]);
  const [wordScreen, setWordScreen] = useState(true);
  useNoSleep(true);
  useEffect(() => {
    setStart(false);
    setCounter(3);
    let interval: any;
    let timeout: any;
    if (wordScreen) {
      interval = setInterval(() => {
        setCounter((prev) => prev - 1);
        //console.log('counter', counter);
      }, 1000);
      timeout = setTimeout(() => {
        setStart(true);
        clearInterval(interval);
      }, 3000);
    } else {
      clearTimeout(timeout);
    }
    //console.log('counter', counter);
  }, [wordScreen]);

  useEffect(() => {
    const split = word.split(' ');
    setShowWord(split);
  }, [word]);

  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden bg-primary font-poppins">
      <MetaHead />
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">
        {category.category} - {category.subcategory}
      </header>
      {wordScreen ? (
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
          <footer className="fixed bottom-0 w-full h-[100px] bg-white flex-none cursor-pointer">
            <button
              onClick={() => setWordScreen(false)}
              className="flex items-center justify-center w-full h-full">
              <span className="text-lg">Pytania</span>
            </button>
          </footer>
        </main>
      ) : (
        <Questions setWordScreen={setWordScreen} />
      )}
    </div>
  );
};

export default Play;
