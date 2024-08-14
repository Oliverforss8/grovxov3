import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: string) {
  return builder.image(source).url();
}

export interface ImageData {
  src: string;
  heading: string;
  description: string;
}

export async function fetchImages(): Promise<ImageData[]> {
  const images = await client.fetch(`
    *[_type == "blogPost"]{
      "src": image.asset->_ref,
      heading,
      description
    }
  `);

  return images.map((image: any) => ({
    src: urlFor(image.src),
    heading: image.heading,
    description: image.description,
  }));
}
