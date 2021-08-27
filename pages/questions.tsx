import { useState } from 'react';
import Link from 'next/link';
import Question from 'components/Question';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setQuestion, selectedQuestions, selectedCategory, reset } from 'redux/slices/gameSlice';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const Questions = () => {
  const questions = useAppSelector(selectedQuestions);
  const category = useAppSelector(selectedCategory);
  const [openModal, setOpenModal] = useState(false);
  const [modalQuestion, setModalQuestion] = useState('');
  const [modalAnswer, setModalAnswer] = useState('');
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const saveQuestion = () => {
    dispatch(
      setQuestion({
        question: modalQuestion,
        answer: modalAnswer
      })
    );
    setModalQuestion('');
    setModalAnswer('');
    setOpenModal(false);
  };

  const handleReset = () => {
    dispatch(reset());
    setModalQuestion('');
    setModalAnswer('');
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins overflow-hidden">
      <header className="w-full text-center text-sm h-[20px] flex-none mt-2">
        {category.category} - {category.subcategory}
      </header>
      <main className="w-full flex-grow">
        <section className="m-2">Pytania:</section>
        <section className="w-full flex flex-col max-h-80 overflow-scroll">
          {questions.map((q, i) => (
            <Question key={i} question={q.question} answer={q.answer} />
          ))}

          <Modal open={openModal} onClose={handleCloseModal} className={classes.modal}>
            <div className="flex flex-col justify-around items-center w-full h-auto m-2 p-2 bg-primary text-black rounded-md">
              <h2>Pytanie</h2>
              <input
                type="text"
                className="p-2 m-2 w-full bg-white rounded-sm"
                placeholder="Napisz pytanie"
                value={modalQuestion}
                onChange={(e) => setModalQuestion(e.target.value)}
              />
              <h2>Odpowiedź</h2>
              <div className="flex flex-row justify-center items-center w-full m-2">
                <button
                  className={`${
                    modalAnswer === 'Tak' ? 'bg-opacity-100' : 'bg-opacity-50'
                  } bg-green-500 h-[30px] w-[60px] mx-2 text-white flex justify-center items-center rounded-sm`}
                  onClick={() => setModalAnswer('Tak')}>
                  TAK
                </button>
                <button
                  className={`${
                    modalAnswer === 'Nie' ? 'bg-opacity-100' : 'bg-opacity-50'
                  } bg-red-500 h-[30px] w-[60px] mx-2 text-white flex justify-center items-center rounded-sm`}
                  onClick={() => setModalAnswer('Nie')}>
                  NIE
                </button>
              </div>
              <button
                className="p-2 m-2 items-center bg-blue-500 text-white outline-none rounded-sm"
                onClick={saveQuestion}>
                ZAPISZ
              </button>
            </div>
          </Modal>
        </section>
      </main>
      <footer className="flex flex-row w-full h-[100px] justify-between items-center">
        <Link href="/play" passHref>
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
        </Link>
        <button
          className="bg-transparent flex flex-col justify-center items-center w-1/3"
          onClick={handleOpenModal}>
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
        <Link href="/" passHref>
          <button
            className="bg-transparent flex flex-col justify-center items-center w-1/3"
            onClick={handleReset}>
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
        </Link>
      </footer>
    </div>
  );
};

export default Questions;
