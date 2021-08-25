import CategoryBox from 'components/CategoryBox';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen min-h-screen bg-primary flex flex-col relative font-poppins">
      <header className="w-full flex justify-end">
        <button className="flex justify-center m-2 w-6 h-6 bg-white rounded-sm items-center">
          ?
        </button>
      </header>
      <main className="w-full">
        <section className="m-2">Wybierz kategorie:</section>
        <section className="w-full flex flex-col">
          <CategoryBox title="Geography" />
          <CategoryBox title="Sport" />
        </section>
      </main>
    </div>
  );
};

export default Home;
