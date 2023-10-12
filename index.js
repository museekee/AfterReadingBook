class BookItem extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute("id")
        const content = this.getAttribute("content")
        const title = this.getAttribute("title")
        const cover = this.getAttribute("cover")
        const writer = this.getAttribute("writer")
        const drawer = this.getAttribute("drawer")
        const publisher = this.getAttribute("publisher")
        const uploadedAt = this.getAttribute("uploadedAt")
        this.attachShadow({ mode: "open" })
        this.shadowRoot.append(document.getElementById("book-item").content.cloneNode(true))
        this.shadowRoot.getElementById("title").innerText = title
        this.shadowRoot.getElementById("book-cover").style.backgroundImage = `url("${cover}")`
        this.shadowRoot.getElementById("writer").innerText = writer
        this.shadowRoot.getElementById("drawer").innerText = drawer
        this.shadowRoot.getElementById("publisher").innerText = publisher
        this.shadowRoot.getElementById("uploadedAt").innerText = uploadedAt
        this.addEventListener("click", () => {
            // this.shadowRoot.getElementById("content").classList.toggle("selected")
            renderARB(id, title, writer, drawer, uploadedAt, publisher, content)
            window.history.pushState(null, null, `${location.pathname}?id=${id}`)
        })
    }
}
customElements.define("book-item", BookItem)

const fetchedDatas = fetch("./data.json").then(async body => await body.json())

window.addEventListener("DOMContentLoaded", async () => {
    const URLSearch = new URLSearchParams(location.search)
    const id = URLSearch.get("id")
    if (!id) return
    const data = (await fetchedDatas)[id]
    renderARB(id, data.title, data.writer, data.drawer, data.uploadedAt, data.publisher, data.content)
})
fetchedDatas.then(data => {
    for (const [id, book] of Object.entries(data)) {
        const item = document.createElement("book-item")
        item.style.height = "400px"
        item.setAttribute("id", id)
        item.setAttribute("content", book.content)
        item.setAttribute("title", book.title)
        item.setAttribute("cover", book.cover)
        item.setAttribute("writer", book.writer)
        item.setAttribute("drawer", book.drawer)
        item.setAttribute("publisher", book.publisher)
        item.setAttribute("uploadedAt", book.uploadedAt)
        document.getElementById("book-list").appendChild(item)
    }
})

function renderARB(_id, title, writer, drawer, uploadedAt, publisher, content) {
    document.getElementById("bv-title").innerText = title
    document.getElementById("bv-writer").innerText = writer
    document.getElementById("bv-drawer").innerText = drawer
    document.getElementById("bv-uploadedAt").innerText = uploadedAt
    document.getElementById("bv-publisher").innerText = publisher
    document.getElementById("bv-content").innerHTML = content.replaceAll("\n", "<br/>")
}