import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
// eslint-disable-next-line prettier/prettier
import { adminCategory, adminWords, addValue, removeValue, changeValue, reset } from 'redux/slices/adminSlice';

const AddNewWords = () => {
  const category = useAppSelector(adminCategory);
  const words = useAppSelector(adminWords);
  const dispatch = useAppDispatch();

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
              onClick={() => dispatch(removeValue())}>
              <span>-</span>
            </button>{' '}
            {words.length}{' '}
            <button
              className="w-6 h-6 inline-flex justify-center items-center rounded-full bg-blue-400"
              disabled={words.length === 20}
              onClick={() => dispatch(addValue())}>
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
                dispatch(changeValue({ id: i, value: e.target.value }))
              }
            />
          ))}
        </section>
        <section className="w-full flex flex-col justify-center items-center p-2">
          <p>
            {category.category} - {category.subcategory}
          </p>
          <div className="inline-flex">
            <button className="p-2 m-2 items-center bg-green-500 text-white outline-none rounded-sm">
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
        </section>
      </main>
    </div>
  );
};

export default AddNewWords;
