import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { id: '', title: '', listPrice: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    // getNextBookId,
    // getFilterBy,
    setFilterBy,
    getDefaultFilter
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.title) {
                const regex = new RegExp(gFilterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.listPrice) {
                books = books.filter(book => book.listPrice >= gFilterBy.listPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = 0) {
    return { id: '', title, listPrice}
}

// function getFilterBy() {
//     return { ...gFilterBy }
// }

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.id = filterBy.id
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.listPrice !== undefined) gFilterBy.listPrice = filterBy.listPrice
    return gFilterBy
}

// function getNextCarId(carId) {
//     return storageService.query(CAR_KEY)
//         .then(cars => {
//             let nextCarIdx = cars.findIndex(car => car.id === carId) + 1
//             if (nextCarIdx === cars.length) nextCarIdx = 0
//             return cars[nextCarIdx].id
//         })
// }

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('booka', 10))
        books.push(_createBook('bookb', 120))
        books.push(_createBook('bookc', 100))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook( title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}

function getDefaultFilter(){
    return gFilterBy
}


