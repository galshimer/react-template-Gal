
export function BookPreview({ book }) {

    const { title, listPrice } = book
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Book Price: {listPrice}</h4>
            <img src={book.thumbnail} alt="" />
        </article>
    )
}