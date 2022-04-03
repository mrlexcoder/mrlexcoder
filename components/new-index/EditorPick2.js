import React from "react";
import Image from "next/image";
export default function EditorPick({ post = {} }) {
  const postItem = post?.attributes;
  const {
    title = "",
    excerpt,
    slug,
    date,
    tags,
    legacyFeaturedImage = null,
    author = null,
  } = postItem;
  const tagArr = tags.data;
  return (
    <div className="pb-10">
      <h3 className="text-4xl text-title-1 font-bold leading-6 tracking-wide mb-9">
        Editor’s picks
      </h3>
      <section className="flex flex-col justify-center antialiased bg-white text-gray-900 py-4 lg:py-16 rounded-lg">
        <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
          {/* Blog post */}
          <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            <a className="relative block group" href={`/posts/${slug}`}>
              <div
                className="absolute inset-0 bg-blue-100 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                <div className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={legacyFeaturedImage?.mediaItemUrl}
                    alt="Blog post"
                  />
                </div>
              </figure>
            </a>
            <div>
              <header>
                <div className="mb-3">
                  <ul className="flex flex-wrap text-xs font-medium -m-1">
                    <li className="m-1">
                      <a
                        className="inline-flex text-center text-gray-200 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                        href={`/posts/${slug}`}
                      >
                        #{" "}
                        {tagArr && tagArr.length
                          ? tagArr[0].attributes.slug
                          : "design"}
                      </a>
                    </li>
                    {tagArr && tagArr.length > 1 && (
                      <li className="m-1">
                        <a
                          className="inline-flex text-center text-gray-200 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                          href={`/posts/${slug}`}
                        >
                          #{" "}
                          {tagArr && tagArr.length
                            ? tagArr[1].attributes.slug
                            : "design"}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                  <a
                    className="hover:text-gray-900 transition duration-150 ease-in-out"
                    href={`/posts/${slug}`}
                  >
                    {title}
                  </a>
                </h3>
              </header>
              <div className="text-lg text-gray-400 flex-grow">
                <div
                  className="text-base font-medium text-gray-3 leading-normal mt-4 clamp-2 overflow-hidden text-ellipsis"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                ></div>
              </div>
              <footer className="flex items-center mt-4">
                <a href={`/posts/${slug}`}>
                  <div className="mr-4 relative flex-shrink-0">
                    <Image
                      className="rounded-full"
                      src={author?.data?.attributes?.avatar}
                      width={40}
                      height={40}
                      objectFit="cover"
                      alt="Author 04"
                    />
                  </div>
                </a>
                <div>
                  <a
                    className="font-medium text-gray-900 hover:text-gray-900 transition duration-150 ease-in-out"
                    href={`/posts/${slug}`}
                  >
                    Display Name
                  </a>
                  <span className="text-gray-700"> - </span>
                  <span className="text-gray-500">{date}</span>
                </div>
              </footer>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}