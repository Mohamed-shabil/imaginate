import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Handle Errors
export const handleError = (error: unknown) => {
    if (error instanceof Error) {
        console.error(error.message);
        throw new Error(`Error: ${error.message}`);
    } else if (typeof error === "string") {
        console.error(error);
        throw new Error(`Error: ${error}`);
    } else {
        console.error(error);
        throw new Error(`Unknown error: ${JSON.stringify(error)}`);
    }
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
    shimmer(1000, 1000)
)}`;

export const download = (url: string) => {
    if (!url) {
        throw new Error("Resource URL not provided! You need to provide one");
    }

    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobURL;
            a.download = `download_imaginate${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
        })
        .catch((error) => console.log({ error }));
};
