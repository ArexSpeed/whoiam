import { useState, useEffect } from 'react';
import Link from 'next/link';

const Play = () => {
  const [word, setWord] = useState<string[]>([]);
  const haslo = 'Ameryka Południowa';

  useEffect(() => {
    const split = haslo.split(' ');
    setWord(split);
  }, [haslo]);

  return (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins overflow-hidden">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">Sport - Kluby</header>
      <main className="w-full flex flex-wrap flex-grow justify-center items-center overflow-auto">
        <div className="text-xl mx-2 flex flex-wrap">
          {word.map((item, i) => (
            <span key={i} className="break-all mr-2">
              {item}
            </span>
          ))}
        </div>
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
