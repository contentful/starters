import ContentfulImage from "./contentful-image";
import Link from "next/link";
import cn from "classnames";

export default function CoverImage({ title, url, slug }) {
  const image = (
    <ContentfulImage
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src="https://images.unsplash.com/photo-1524134132825-dbe30ff69879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
