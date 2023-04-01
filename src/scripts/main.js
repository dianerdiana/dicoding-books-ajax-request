function main() {
  const BASE_URL = 'https://books-api.dicoding.dev'

  const getBook = () => {
    const xhr = new XMLHttpRequest()

    // callback when success or error

    xhr.onload = function () {
      const response = JSON.parse(this.responseText)

      if (response.error) {
        showResponseMessage(response.message)
      } else {
        renderAllBooks(response.books)
      }
    }

    xhr.onerror = function () {
      showResponseMessage()
    }

    xhr.open('GET', `${BASE_URL}/list`)
    xhr.send()
  }

  const insertBook = (book) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = function () {
      const response = JSON.parse(this.responseText)
      showResponseMessage(response.message)
      getBook()
    }

    xhr.onerror = function () {
      showResponseMessage()
    }

    xhr.open('POST', `${BASE_URL}/add`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('X-Auth-Token', '12345')

    xhr.send(JSON.stringify(book))
  }

  const updateBook = (book) => {
    const xhr = new XMLHttpRequest()
  }

  const removeBook = (bookId) => {
    // tuliskan kode di sini!
  }

  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook')
    listBookElement.innerHTML = ''

    books.forEach((book) => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `
    })

    const buttons = document.querySelectorAll('.button-delete')
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const bookId = event.target.id

        removeBook(bookId)
      })
    })
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message)
  }

  document.addEventListener('DOMContentLoaded', () => {
    const inputBookId = document.querySelector('#inputBookId')
    const inputBookTitle = document.querySelector('#inputBookTitle')
    const inputBookAuthor = document.querySelector('#inputBookAuthor')
    const buttonSave = document.querySelector('#buttonSave')
    const buttonUpdate = document.querySelector('#buttonUpdate')

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      }

      insertBook(book)
    })

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      }

      updateBook(book)
    })
    getBook()
  })
}

export default main
