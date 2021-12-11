import { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import Question from 'components/Question';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setQuestion, selectedQuestions, reset } from 'redux/slices/gameSlice';

interface Props {
  setWordScreen: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const Questions = ({ setWordScreen }: Props) => {
  const questions = useAppSelector(selectedQuestions);
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
    <div className="relative flex flex-col w-screen h-screen overflow-hidden bg-primary font-poppins">
      <main className="flex-grow w-full">
        <section className="m-2">Pytania:</section>
        <section className="flex flex-col w-full pb-12 overflow-scroll max-h-80">
          {questions.length === 0 && (
            <div className="flex flex-col items-center justify-center p-2 m-2 bg-white rounded-lg shadow-sm">
              <p>Brak zapisanych pytań</p>{' '}
              <button
                className="flex flex-col items-center justify-center p-2 mt-2 bg-green-500 rounded-sm"
                onClick={handleOpenModal}>
                Dodaj pytanie
              </button>
            </div>
          )}
          {questions.map((q, i) => (
            <Question key={i} question={q.question} answer={q.answer} />
          ))}

          <Modal open={openModal} onClose={handleCloseModal} className={classes.modal}>
            <div className="flex flex-col items-center justify-around w-full h-auto p-2 m-2 text-black rounded-md bg-primary">
              <h2>Pytanie</h2>
              <input
                type="text"
                className="w-full p-2 m-2 bg-white rounded-sm"
                placeholder="Napisz pytanie"
                value={modalQuestion}
                onChange={(e) => setModalQuestion(e.target.value)}
              />
              <h2>Odpowiedź</h2>
              <div className="flex flex-row items-center justify-center w-full m-2">
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
                className="items-center p-2 m-2 text-white bg-blue-500 rounded-sm outline-none"
                onClick={saveQuestion}>
                ZAPISZ
              </button>
            </div>
          </Modal>
        </section>
        <section className="fixed bottom-0 flex flex-row w-full h-[100px] justify-between items-center">
          <button
            className="flex flex-col items-center justify-center w-1/3 bg-transparent"
            onClick={() => setWordScreen(true)}>
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
          <button
            className="flex flex-col items-center justify-center w-1/3 bg-transparent"
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
              className="flex flex-col items-center justify-center w-1/3 bg-transparent"
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
        </section>
      </main>
    </div>
  );
};

export default Questions;
