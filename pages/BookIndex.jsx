import { bookService } from "../services/book.service.js"


const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

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
if(!books || !books.length) return <div> Loading...</div> 
    return (
        <div>
        <h1>Books</h1>
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    {book.title} - ${book.listPrice}
                </li>
            ))}
        </ul>
    </div>
    )
}