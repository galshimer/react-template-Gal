import { BookPreview } from "./BookPreview.jsx"

const { useState } = React

export function BookList({ books, onSelectBookId }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}