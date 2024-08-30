import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return source ? builder.image(source).url() : ""; // Handles images
}

function fileUrl(source: any) {
  return source ? source.url : ""; // Handles videos
}

export interface MediaData {
  src: string;
  heading: string;
  description: string;
  type: "image" | "video"; // Field to indicate media type
}

export async function fetchMedia(): Promise<MediaData[]> {
  const mediaItems = await client.fetch(`
    *[_type == "blogPost"]{
      media {
        type,
        "src": src.asset->url // Directly fetch the URL for video files
      },
      heading,
      description
    }
  `);

  console.log("Fetched media items:", mediaItems); // Debugging log

  // Map over the fetched mediaItems
  return mediaItems.map((item: any) => ({
    src: item.media.src, // Use the directly fetched URL
    heading: item.heading,
    description: item.description,
    type: item.media.type,
  }));
}
