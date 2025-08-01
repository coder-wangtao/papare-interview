// "title"  "content" 设置为可选属性(可不传)

interface Article {
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type ArticleOptional = Optional<Article, "title" | "content">;
