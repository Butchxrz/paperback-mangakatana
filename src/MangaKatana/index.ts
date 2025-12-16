import MangaKatana from "./MangaKatana"
import { ContentRating } from "@paperback/types"

export default {
  source: MangaKatana,
  info: {
    name: "MangaKatana",
    icon: "icon.png",
    version: "1.0.0",
    author: "Fabian",
    description: "MangaKatana source for Paperback",
    websiteBaseURL: "https://mangakatana.com",
    contentRating: ContentRating.EVERYONE
  }
}
