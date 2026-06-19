import { httpClient } from "@/shared/api/http-client";

export type SentenceCardVariant = 1 | 2 | 3;

interface SentenceCardImageParams {
  variant: SentenceCardVariant;
  createdAt: string;
  quote: string;
  title: string;
  author: string;
  coverImageUrl?: string;
}

export const fetchSentenceCardImage = ({
  variant,
  createdAt,
  quote,
  title,
  author,
  coverImageUrl,
}: SentenceCardImageParams): Promise<Blob> => {
  const params = new URLSearchParams({ type: String(variant), createdAt, quote, title, author });
  if (variant === 3 && coverImageUrl) {
    params.set("coverImageUrl", coverImageUrl);
  }
  return httpClient.getBlob(`/images/share/quote?${params.toString()}`);
};
