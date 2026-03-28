export interface Author {
  id: string;
  name: string;
  credentials: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  website?: string;
}

export const authors: Author[] = [
  {
    id: 'editorial-team',
    name: 'GummyGuide Editorial Team',
    credentials: '',
    role: 'Editorial Team',
    bio: 'Our editorial team researches and tests gummy supplements to help you make informed choices. Every product is evaluated based on ingredient quality, third-party testing, taste, value, and real-world results.',
    image: '/images/authors/editorial-team.webp',
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getDefaultAuthor(): Author {
  return authors[0];
}
