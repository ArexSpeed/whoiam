/* eslint-disable jsx-a11y/no-onchange */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { adminCategory, adminSortValue, changeSortValue } from 'redux/slices/adminSlice';
import Modal from '@material-ui/core/Modal';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import type { GetServerSideProps } from 'next';
import type { WordsApiType } from 'types';
import { getSession } from 'next-auth/client';

type ModalType = 'edit' | 'delete';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    };
  }
  return {
    props: {
      session
    }
  };
};

const EditPage = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(adminCategory);
  const sortValue = useAppSelector(adminSortValue);
  const [wordsFromApi, setWordsFromApi] = useState<WordsApiType[]>([]);
  const [orderedWords, setOrderedWords] = useState<WordsApiType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editValue, setEditValue] = useState({
    id: '',
    value: ''
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState('');
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/words?subId=${category.subId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json());
      setWordsFromApi(data);
      setIsLoaded(true);
    })();
    return setIsUpdated(false);
  }, [isUpdated, category]);

  //Sorting
  useEffect(() => {
    const order = orderBy(wordsFromApi, sortValue);
    setOrderedWords(order);
  }, [wordsFromApi, sortValue]);

  const orderBy = (array: WordsApiType[], sortBy: string): WordsApiType[] => {
    if (sortBy === 'dateAsc') {
      return [...array].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }
    if (sortBy === 'dateDesc') {
      return [...array].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    }
    if (sortBy === 'nameAsc') {
      return [...array].sort((a, b) => (a.value > b.value ? 1 : -1));
    }
    if (sortBy === 'nameDesc') {
      return [...array].sort((a, b) => (a.value > b.value ? -1 : 1));
    }
    if (sortBy === 'userAsc') {
      return [...array].sort((a, b) => (a.addBy > b.addBy ? 1 : -1));
    }
    if (sortBy === 'userDesc') {
      return [...array].sort((a, b) => (a.addBy > b.addBy ? -1 : 1));
    }

    return array;
  };

  // Modals
  const handleOpenModal = (modal: ModalType) => {
    switch (modal) {
      case 'edit':
        setOpenEditModal(true);
        break;
      case 'delete':
        setOpenDeleteModal(true);
        break;
    }
  };
  const handleCloseModal = () => {
    openEditModal && setOpenEditModal(false);
    openDeleteModal && setOpenDeleteModal(false);
  };

  const handleChangeData = (id: string, value: string, modal: ModalType) => {
    setEditValue({
      id,
      value
    });
    handleOpenModal(modal);
  };

  const updateWord = async () => {
    const response = await fetch(`/api/words?id=${editValue.id}`, {
      method: 'PUT',
      body: JSON.stringify(editValue),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setEditValue({
        id: '',
        value: ''
      });
      handleCloseModal();
      setIsUpdated(true);
      setError('');
    } else {
      setEditValue({
        id: '',
        value: ''
      });
      handleCloseModal();
      setError('Something went wrong! Try again');
    }
  };

  const deleteWord = async () => {
    const response = await fetch(`/api/words?id=${editValue.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setEditValue({
        id: '',
        value: ''
      });
      handleCloseModal();
      setIsUpdated(true);
      setError('');
    } else {
      setEditValue({
        id: '',
        value: ''
      });
      handleCloseModal();
      setError('Something went wrong! Try again');
    }
  };

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
        <section className="w-full flex justify-center items-center">
          {error.length > 1 && (
            <p className="text-sm text-red-500">
              {error}{' '}
              <button
                className="p-1 bg-blue-500 text-white rounded-sm"
                onClick={() => setError('')}>
                Ok
              </button>
            </p>
          )}
        </section>

        <section className="flex flex-col h-auto items-center m-2 bg-white text-black rounded-lg shadow-sm">
          <div className="flex flex-row justify-between items-center w-full px-2">
            <div>
              <p className="text-md">
                {category.category} - {category.subcategory}{' '}
                <span className="text-xs">({wordsFromApi?.length})</span>
              </p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="inline-flex items-center">
                <p className="text-xs mr-2">Order by:</p>
                <select onChange={(e) => dispatch(changeSortValue(e.target.value))}>
                  <option value="dateAsc">Date (asc)</option>
                  <option value="dateDesc">Date (desc)</option>
                  <option value="nameAsc">Name (asc)</option>
                  <option value="nameDesc">Name (desc)</option>
                  <option value="userAsc">User (asc)</option>
                  <option value="userDesc">User (desc)</option>
                </select>
              </div>
              <button className="ml-2" onClick={() => setOpenInfo(!openInfo)}>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          {isLoaded ? (
            orderedWords?.map((item, i) => (
              <div
                key={i}
                className="flex flex-col w-full border-b-2 border-blue-500 border-opacity-20">
                <div className="flex flex-row w-full justify-between items-center p-2">
                  <p className="text-sm">{item.value}</p>
                  <div className="flex flex-row justify-around items-center">
                    <button
                      className="p-2 rounded-full"
                      onClick={() => handleChangeData(item._id, item.value, 'edit')}>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>

                    <button
                      className="p-2 rounded-full"
                      onClick={() => handleChangeData(item._id, item.value, 'delete')}>
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
                {openInfo && (
                  <div className="ml-2 text-xs">
                    by: {item.addBy}, {item.createdAt && new Date(item.createdAt).toDateString()}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>Loading words...</div>
          )}
          <Modal open={openEditModal} onClose={handleCloseModal} className={classes.modal}>
            <div className="flex flex-col justify-around items-center w-full h-auto m-2 p-2 bg-yellow-100 text-black rounded-md">
              <h2>Edit {editValue.value}</h2>
              <input
                type="text"
                className="p-2 m-2 w-full bg-white rounded-sm"
                placeholder="Napisz pytanie"
                value={editValue.value}
                onChange={(e: { target: HTMLInputElement | any }) =>
                  setEditValue({ ...editValue, value: e.target.value })
                }
              />
              <div className="flex flex-row justify-center items-center w-full m-2">
                <button
                  className="bg-green-500 p-2 mx-2 text-white flex justify-center items-center rounded-sm"
                  onClick={updateWord}>
                  Save
                </button>
                <button
                  className="bg-red-500 p-2 mx-2 text-white flex justify-center items-center rounded-sm"
                  onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
          <Modal open={openDeleteModal} onClose={handleCloseModal} className={classes.modal}>
            <div className="flex flex-col justify-around items-center w-full h-auto m-2 p-2 bg-red-100 text-black rounded-md">
              <h2>Do you want to delete {editValue.value}</h2>
              <div className="flex flex-row justify-center items-center w-full m-2">
                <button
                  className="bg-green-500 p-2 mx-2 text-white flex justify-center items-center rounded-sm"
                  onClick={deleteWord}>
                  Yes
                </button>
                <button
                  className="bg-red-500 p-2 mx-2 text-white flex justify-center items-center rounded-sm"
                  onClick={handleCloseModal}>
                  No
                </button>
              </div>
            </div>
          </Modal>
        </section>
      </main>
    </div>
  );
};

export default EditPage;
