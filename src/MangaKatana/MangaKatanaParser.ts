export class MangaKatanaParser {

  parseChapterDetails(html: string): string[] {

    const document = new DOMParser().parseFromString(html, "text/html")

    const images = document.querySelectorAll("img.img-responsive")

    const pages: string[] = []

    images.forEach(img => {
      const src = img.getAttribute("src")
      if (src) {
        pages.push(src)
      }
    })

    return pages
  }
}
