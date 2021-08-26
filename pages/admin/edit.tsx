import Link from 'next/link';
import words from 'data/words.json';
import { useAppSelector } from 'redux/hooks';
import { adminCategory } from 'redux/slices/adminSlice';

const EditPage = () => {
  const category = useAppSelector(adminCategory);
  return (
    <div className="w-screen min-h-screen bg-green-100 flex flex-col relative font-poppins">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">
        Edit {category.category} - {category.subcategory}
      </header>
      <main className="w-full">
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

        <section className="flex flex-col h-auto items-center m-2 bg-white text-black rounded-lg shadow-sm">
          <p className="text-md">
            {category.category} - {category.subcategory} <span className="text-xs">(20)</span>
          </p>

          {words
            .filter((word) => word.subId === '11')
            .map((item, i) => (
              <div
                key={i}
                className="flex flex-row w-full justify-between items-center p-2 border-b-2 border-blue-500 border-opacity-20">
                <p className="text-sm">{item.word}</p>
                <div className="flex flex-row justify-around items-center">
                  <button className="p-2 rounded-full" onClick={() => console.log('edit')}>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>

                  <button className="p-2 rounded-full" onClick={() => console.log('add')}>
                    <svg
                      className="w-6 h-6"
                      fill="#FF0000"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default EditPage;
