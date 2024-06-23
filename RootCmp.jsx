import { Home } from "./pages/HomePage.jsx"
import { About } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

const { useState } = React

export function App() {

    const [page, setPage] = useState('home')


    return (
        <section className="app">
            <header className="app-header">
            <section>
                    <h1>Gal's App</h1>
                    <nav className="app-nav">
                        <a onClick={() => setPage('home')} href="#">Home Page</a>
                        <a onClick={() => setPage('about')} href="#">About Us</a>
                        <a onClick={() => setPage('book')} href="#">Books</a>
                    </nav>
                </section>
            </header>
            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}