import Question from 'components/Question';
import React from 'react';

const Questions = () => {
  return (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins overflow-hidden">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">Sport - Kluby</header>
      <main className="w-full flex-grow">
        <section className="m-2">Pytania:</section>
        <section className="w-full flex flex-col max-h-80 overflow-scroll">
          <Question question="Czy jestem z Europy" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question question="Czy mam zielone oczy z czerwonymi zrenicami" answer="Tak" />
          <Question
            question="Czy mam zielone oczy z czerwonymi zrenicami i kolorowymi kredkami pod oczami z rozowa torebka"
            answer="Nie"
          />
        </section>
      </main>
      <footer className="flex flex-row w-full h-[100px] justify-between items-center">
        <button className="bg-transparent flex flex-col justify-center items-center w-1/3">
          <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-blue-500">
            <svg
              className="w-8 h-8"
              fill="white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm">Pokaż słowo</span>
        </button>
        <button className="bg-transparent flex flex-col justify-center items-center w-1/3">
          <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-green-500">
            <svg
              className="w-8 h-8"
              fill="white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm">Dodaj pytanie</span>
        </button>
        <button className="bg-transparent flex flex-col justify-center items-center w-1/3">
          <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-red-400">
            <svg
              className="w-8 h-8"
              fill="white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm">Koniec gry</span>
        </button>
      </footer>
    </div>
  );
};

export default Questions;
