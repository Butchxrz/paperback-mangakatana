import {
  Chapter,
  ChapterDetails,
  ContentRating,
  PagedResults,
  SearchRequest,
  Source,
  SourceInfo
} from "@paperback/types"

import { MangaKatanaParser } from "./MangaKatanaParser"

const MK_DOMAIN = "https://mangakatana.com"

export default class MangaKatana extends Source {

  // Injected by Paperback at runtime
  requestManager!: any

  parser = new MangaKatanaParser()

  // ⚠️ MUST be a PROPERTY, not a getter
  sourceInfo: SourceInfo = {
    version: "1.0.0",
    name: "MangaKatana",
    icon: "icon.png",
    author: "Fabian",
    authorWebsite: "",
    description: "MangaKatana source for Paperback",
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: MK_DOMAIN,
    sourceTags: []
  }

  // 🔍 Search (stub)
  async getSearchResults(
    _query: SearchRequest,
    _metadata?: any
  ): Promise<PagedResults> {
    return {
      results: [],
      metadata: undefined
    }
  }

  // 📖 Manga details (stub)
  async getMangaDetails(_mangaId: string): Promise<any> {
    throw new Error("Not implemented yet")
  }

  // 📚 Chapter list (stub)
  async getChapters(_mangaId: string): Promise<Chapter[]> {
    return []
  }

  // 🖼️ Chapter pages (WORKING)
  async getChapterDetails(chapterId: string): Promise<ChapterDetails> {

    const response = await this.requestManager.schedule(
      {
        url: chapterId,
        method: "GET"
      },
      1
    )

    const html = response.data
    const pages = this.parser.parseChapterDetails(html)

    return {
      id: chapterId,
      mangaId: chapterId, // temporary, fine for now
      pages
    }
  }
}
