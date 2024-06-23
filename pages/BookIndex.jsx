import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"


const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)


    useEffect(() => {
        loadBooks()
    }, [filterBy])


    function loadBooks() {
        console.log('hi')
        bookService.query(filterBy)
            .then(books => {
                console.log(books)
                setBooks(books)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    
    function onSelectBookId(bookId) {
        onSelectBookId(bookId)
    }

    if (!books || !books.length) return <div> Loading...</div>

    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    {/* <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                    <BookList
                        books={books}
                        // onRemoveCar={onRemoveCar}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
            }

            {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}