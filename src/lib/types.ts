export type Category = 'residential' | 'commercial' | 'hotel' | 'exterior' | 'highlights';
export type PublicProject = {
  id: string;
  name: string;
  category: Category;
  photos: string[];
  cover: string;
  available: boolean;
};
// Folder IDs are server/build-only metadata. Do not serialize them to the client.
export type Project = PublicProject & { folderId: string };

export const categoryLabels: Record<Category, string> = {
  residential: 'ที่พักอาศัย',
  commercial: 'เชิงพาณิชย์',
  hotel: 'โรงแรม',
  exterior: 'งานภายนอก',
  highlights: 'ภาพไฮไลต์',
};
