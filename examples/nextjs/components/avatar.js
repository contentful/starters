import ContentfulImage from "./contentful-image";

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <ContentfulImage
          src="https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
