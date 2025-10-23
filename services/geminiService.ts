
import { GoogleGenAI, Type } from "@google/genai";
import type { Book } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const bookSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: 'A unique identifier for the book, like a UUID.' },
        title: { type: Type.STRING, description: 'The title of the book.' },
        author: { type: Type.STRING, description: 'The name of the author.' },
        coverImageUrl: { type: Type.STRING, description: 'A placeholder image URL from picsum.photos, e.g., https://picsum.photos/400/600' },
        description: { type: Type.STRING, description: 'A detailed, engaging summary of the book plot (at least 100 words).' },
        genres: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of genre tags for the book.'
        },
        rating: { type: Type.NUMBER, description: 'A rating from 1 to 5, can include one decimal place (e.g., 4.5).' },
        publishedYear: { type: Type.INTEGER, description: 'The year the book was published.' },
    },
    required: ['id', 'title', 'author', 'coverImageUrl', 'description', 'genres', 'rating', 'publishedYear'],
};

export async function generateBookLibrary(): Promise<Book[]> {
  try {
    const prompt = `
      Generate a diverse list of 40 fictional e-books for a digital library.
      - Ensure a mix of genres: Fantasy, Science Fiction, Mystery, Thriller, Romance, Historical Fiction, and Classic Literature.
      - Provide creative and realistic titles and author names.
      - For coverImageUrl, use a unique placeholder image from picsum.photos with a 2:3 aspect ratio (e.g., 'https://picsum.photos/seed/a-unique-seed/400/600'). Use a different seed for each book.
      - Write a detailed, engaging summary for each book's description (at least 100 words).
      - Ratings should be between 3.0 and 5.0 and can have one decimal place.
      - Publication years should range from the 1800s to the present day.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: bookSchema,
        },
      },
    });

    const jsonString = response.text.trim();
    const generatedBooks: Book[] = JSON.parse(jsonString);

    // Basic validation
    if (!Array.isArray(generatedBooks) || generatedBooks.length === 0) {
      throw new Error("Generated data is not a valid book array.");
    }
    
    return generatedBooks;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate book library from Gemini API.");
  }
}
