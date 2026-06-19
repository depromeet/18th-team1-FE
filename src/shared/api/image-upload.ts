import { httpClient } from "./http-client";

export type ImageUploadType = "DIARY" | "USER_PROFILE" | "REPORT";
export type ImageContentType = "image/jpeg" | "image/png" | "image/webp";

interface PresignedUrlRequest {
  type: ImageUploadType;
  contentType: ImageContentType;
}

interface PresignedUrlResponse {
  presignedUrl: string;
  imageId: number;
}

export const fetchPresignedUrl = (body: PresignedUrlRequest): Promise<PresignedUrlResponse> =>
  httpClient.post<PresignedUrlResponse>("/images/presigned-url", body);

export const uploadImageToGcs = async (presignedUrl: string, file: File): Promise<void> => {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!response.ok) throw new Error(`GCS upload failed: ${response.status}`);
};
