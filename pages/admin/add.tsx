import { useEffect, useState } from 'react';
import Link from 'next/link';
type ValuesType = {
  [key: string]: string;
};

const AddNewWords = () => {
  const [inputsQty, setInputsQty] = useState(1);
  const [values, setValues] = useState<ValuesType[]>([]);

  useEffect(() => {
    setValues([]);
    for (let i = 1; i <= inputsQty; i++) {
      setValues((prev) => [...prev, { id: i.toString(), word: '' }]);
    }
  }, [inputsQty]);

  return (
    <div className="w-screen min-h-screen bg-primary flex flex-col relative font-poppins">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">
        Add to Sport - Dyscypliny
      </header>
      <main className="w-full">
        <section className="w-full flex justify-center items-center mt-2">
          <p className="text-md">
            Add{' '}
            <button
              className="w-6 h-6 inline-flex justify-center items-center rounded-full bg-blue-400"
              disabled={inputsQty === 1}
              onClick={() => setInputsQty((prev) => prev - 1)}>
              <span>-</span>
            </button>{' '}
            {inputsQty}{' '}
            <button
              className="w-6 h-6 inline-flex justify-center items-center rounded-full bg-blue-400"
              disabled={inputsQty === 20}
              onClick={() => setInputsQty((prev) => prev + 1)}>
              <span>+</span>
            </button>{' '}
            words
          </p>
        </section>
        <section className="w-full flex flex-col justify-center items-center p-2">
          {values.map((value) => (
            <input
              key={value.id}
              className="p-2 m-2 w-full bg-white rounded-sm border-blue-300 border-2"
              type="text"
              placeholder={`word ${value.id}`}
              value={value.word}
            />
          ))}
        </section>
        <section className="w-full flex flex-col justify-center items-center p-2">
          <p>Sport - Dyscypliny</p>
          <div className="inline-flex">
            <button className="p-2 m-2 items-center bg-green-500 text-white outline-none rounded-sm">
              ADD {inputsQty} WORDS
            </button>
            <Link href="/admin" passHref>
              <button className="p-2 m-2 items-center bg-red-400 text-white outline-none rounded-sm">
                CANCEL
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddNewWords;
