export interface IArticleRandom {
  article_category_id: number;
  article_tags: any;
  content: string;
  created_at: string;
  featured_image: string;
  id: number;
  seo_description: string;
  seo_title: string;
  slug: string;
  status: string;
  superslug: {
    code: string;
    created_at: string;
    description: string;
    id: number;
    label: string;
    updated_at: string;
    value: string;
  };
  superslug_id: number;
  title: string;
  updated_at: string;
}
