import Link from "next/link";
import Avatar from "../components/avatar";
import DateComponent from "../components/date";
import ContentfulImage from "./contentful-image";
import cn from "classnames";

export default function HeroPost({ title, date, excerpt, author, slug }) {
  return (
    <section>
      <div className="flex justify-center mb-8 w-full">
        <ContentfulImage
          width={1496}
          height={1027}
          alt={`Cover Image for ${title}`}
          className={cn("col-span-2", {
            "hover:shadow-medium transition-shadow duration-200": slug,
          })}
          src="https://images.unsplash.com/photo-1524134132825-dbe30ff69879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`}>
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateComponent dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} />}
        </div>
      </div>
    </section>
  );
}
