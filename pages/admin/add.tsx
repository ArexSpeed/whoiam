import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
// eslint-disable-next-line prettier/prettier
import { adminCategory, adminWords, adminAddInfo, addWordValue, removeWordValue, changeWordValue, setAddInfo, reset, resetWords } from 'redux/slices/adminSlice';

const AddNewWords = () => {
  const category = useAppSelector(adminCategory);
  const words = useAppSelector(adminWords);
  const info = useAppSelector(adminAddInfo);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState(false);

  const addWords = async () => {
    const response = await fetch('/api/words', {
      method: 'POST',
      body: JSON.stringify(words),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      dispatch(setAddInfo('Added correctly'));
      dispatch(resetWords());
      setFeedback(true);
      router.push('/admin');
    } else {
      dispatch(setAddInfo('Something went wrong!'));
      setFeedback(true);
    }
  }

  return (
    <div className="w-screen min-h-screen bg-green-100 flex flex-col relative font-poppins">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">
        Add to {category.category} - {category.subcategory}
      </header>
      <main className="w-full">
        <section className="w-full flex justify-center items-center mt-2">
          <p className="text-md">
            Add{' '}
            <button
              className="w-6 h-6 inline-flex justify-center items-center rounded-full bg-blue-400"
              disabled={words.length === 1}
              onClick={() => dispatch(removeWordValue())}>
              <span>-</span>
            </button>{' '}
            {words.length}{' '}
            <button
              className="w-6 h-6 inline-flex justify-center items-center rounded-full bg-blue-400"
              disabled={words.length === 20}
              onClick={() => dispatch(addWordValue())}>
              <span>+</span>
            </button>{' '}
            words
          </p>
        </section>
        <section className="w-full flex flex-col justify-center items-center p-2">
          {words.map((word, i) => (
            <input
              key={i}
              className="p-2 m-2 w-full bg-white rounded-sm border-blue-300 border-2"
              type="text"
              placeholder={`word ${i + 1}`}
              value={word.value}
              onChange={(e: { target: HTMLInputElement | any }) =>
                dispatch(changeWordValue({ id: i, value: e.target.value }))
              }
            />
          ))}
        </section>
        <section className="w-full flex flex-col justify-center items-center p-2">
          <p>
            {category.category} - {category.subcategory}
          </p>
          <div className="inline-flex">
            <button 
              className="p-2 m-2 items-center bg-green-500 text-white outline-none rounded-sm" 
              onClick={addWords}>
              ADD {words.length} WORDS
            </button>
            <Link href="/admin" passHref>
              <button
                className="p-2 m-2 items-center bg-red-400 text-white outline-none rounded-sm"
                onClick={() => dispatch(reset())}>
                CANCEL
              </button>
            </Link>
          </div>
          {feedback && (
            <div>
              <p>{info}</p>
              <Link href="/admin" passHref>
                <button className="m-2 inline-flex bg-blue-500 text-white p-2 rounded-sm">
                  <svg
                    className="w-6 h-6 mr-1"
                    fill="#FFFFFF"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>{' '}
                  Back
                </button>
              </Link>
            </div>
          )}
            
        </section>
      </main>
    </div>
  );
};

export default AddNewWords;
