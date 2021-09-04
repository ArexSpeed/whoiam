import Link from 'next/link';

const RulesPage = () => (
  <div className="w-screen min-h-screen bg-primary flex flex-col relative font-poppins">
    <header className="w-full flex justify-center items-center relative">
      <Link href="/" passHref>
        <button className="absolute top-0 left-0 m-2 inline-flex bg-blue-500 text-white p-1 rounded-sm">
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
          Wróć
        </button>
      </Link>
      <h3 className="py-2">Zasady</h3>
    </header>
    <main className="w-full">
      <section className="m-2">
        <article className="w-full text-center font-bold">Zasady gry Kim jestem?</article>
        <article>
          <p>
            Gra <i>Kim jestem</i> jest grą towarzyską dla nieograniczonej liczby graczy. Polega na
            odgadnięciu słowa które zostało dla Ciebie wylosowane. Dane hasło możesz odgadnąć
            poprzez zadawanie pytań na które odpowiedź może być{' '}
            <span className="text-green-500">Tak</span> lub{' '}
            <span className="text-red-500">Nie</span>. Jeśli kiedykolwiek grałeś w tą grę szukając
            kartek do wypisywania haseł i przyklejenia na czole to już nie musisz wystarczy smartfon
            i ta aplikacja. W grze jest do wyboru ponad 1000 haseł.
          </p>
          <p className="font-semibold">Jak Grać?</p>
          <p>1. Wybierz jedną z dostępnych kategorii</p>
          <p>2. Wybierz zestaw haseł do danej kategorii</p>
          <p>
            3. Klikając na Start twoje hasło zostanie wylosowane od tego czasu masz 5 sekund żeby
            odwrócić ekran i pokazać hasło znajomym. Pamiętaj by nie podglądać!
          </p>
          <p>
            4. Każdy z graczy zadaje pytania do swojego hasła najlepiej w ustalonej kolejności.
            Kiedy nadejdzie Twoja kolejka pamietaj żeby zadać właściwe pytanie na które można
            odpowiedzieć <span className="text-green-500">Tak</span> lub{' '}
            <span className="text-red-500">Nie</span> i które pozwoli Cie nakierować na odgadnięcie
            hasła.
          </p>
          <p>
            Przykłady (hasło: Polska):{' '}
            <p>
              <i>Czy jestem z Europy?</i> - Tak
            </p>{' '}
            <p>
              <i>Czy należę do UE?</i> - Tak
            </p>{' '}
            <p>
              <i>Czy leże nad morzem śródziemnym?</i> - Nie
            </p>{' '}
            <p>
              <i>Czy jestem krajem skandynawskim?</i> - Nie
            </p>
          </p>
          <p>
            5. Zapisz swoje pytanie. Wystarczy że klikniesz na ekran w dowolnym miejscu i zostaniesz
            przeniesiony do zestawu swoich pytań gdzie możesz zapisać pytanie i odpowiedź.
          </p>
          <p>
            6. Po zapisaniu pytania kliknij przycisk <i className="text-blue-500">Pokaż słowo</i>{' '}
            gdzie znów masz 5 sekund na odwrócenie ekranu. Pamiętaj że zawsze możesz wrócić i
            przejrzeć swoje pytania klikając w dowolnym miejscu na ekranie z hasłem
          </p>
        </article>
        <article className="w-full text-center">
          To wszystko, możesz zacząć zabawę. Powodzenia!
        </article>
        <article className="w-full text-center">
          <Link href="/" passHref>
            <button className="m-2 inline-flex bg-blue-500 text-white p-2 rounded-sm">START</button>
          </Link>
        </article>
      </section>
    </main>
  </div>
);

export default RulesPage;
