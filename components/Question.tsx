import { FC } from 'react';

interface Props {
  question: string;
  answer: string;
}

const Question: FC<Props> = ({ question, answer }) => {
  return (
    <div className="flex flex-row min-h-[50px] justify-between items-center m-2 bg-white text-black rounded-lg shadow-sm">
      <span className="mx-2 text-sm">{question}</span>
      <button
        className={`${
          answer === 'Tak' ? 'bg-green-500' : 'bg-red-500'
        } h-[20px] w-[40px] mx-2 text-white flex justify-center items-center rounded-sm`}>
        {answer.toUpperCase()}
      </button>
    </div>
  );
};

export default Question;
