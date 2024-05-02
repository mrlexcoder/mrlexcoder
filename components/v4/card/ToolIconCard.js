import Link from "next/link";
import { usePlausible } from "next-plausible";

import Image from "next/image";
const {
  default: gumletLoader,
} = require("@/components/new-index/gumletLoader");

const ToolIconCard = ({ tool, withBackground, small }) => {
  let { slug, title, tags } = tool;

  if (!tags?.data?.length) {
    tags.data = tags;
  }
  const plausible = usePlausible();

  let coverImage =
    // tool.legacyMedia?.logoNew?tool.legacyMedia?.logoNew:
    // tool.legacyMedia?.mediaItemUrl?tool.legacyMedia?.mediaItemUrl:
    // tool.legacyMedia?.imgUrl?tool.legacyMedia?.imgUrl:
    tool.featuredImage?.data?.attributes?.url
      ? tool.featuredImage.data.attributes.url
      : tool.legacyFeaturedImage
        ? tool.legacyFeaturedImage
        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  coverImage =
    tool?.legacyMedia?.logoNew ||
    coverImage?.logoNew ||
    tool.legacyMedia?.mediaItemUrl ||
    tool.legacyFeaturedImage?.mediaItemUrl;

  return (
    <div>
      <Link
        href={`/toolbox/${slug}`}
        onClick={() => {
          plausible("toolIconCard", {
            props: {
              location: "discoverSection",
              page: "home",
            },
          });
        }}
        className="flex"
      >
        <div
          className={`${withBackground ? "hover:shadow-md hover:scale-[1.005] transition transition-all duration-400 bg-white p-3 shadow-sm border border-gray-200/70 border-1 rounded-2xl" : ""} w-full h-auto cursor-pointer flex flex-col group`}
        >
          <div className="flex flex-row rounded-xl justify-between gap-3">
            <div className="flex justify-start w-full">
              <div
                className={`${small ? "h-12 w-12" : "w-[56px] h-[56px]"} border border-gray-300/30 mr-2 relative rounded-xl overflow-hidden group-hover:scale-[1.03] group-hover:shadow-sm flex-none transition transition-all duration-700`}
              >
                <Image
                  tabIndex={0}
                  lazy={true}
                  loader={gumletLoader}
                  width="100"
                  height="100"
                  objectFit="cover"
                  src={
                    coverImage ||
                    "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/176d3d79cb9ad1acc057fb0eb3fe72d0.jpeg"
                  }
                  className="object-cover w-full h-full"
                  alt="Author profile picture"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className=" overflow-hidden tracking-tight line-clamp-1 inline font-semibold py-0 mb-0 font-inter text-base">
                  {title}
                  {/* <span className="text-xs ml-2 capitalize bg-gray-100 font-inter px-2 text-blue-800 py-0.5 border border-black border-opacity-5 text-black rounded-full">
                  Promoted
                </span> */}
                </div>
                <div className="text-sm text-gray-500">
                  {/* <Link href={tags?.data[0]?.attributes?.name ? `/toolbox/${tags?.data[0]?.attributes?.slug}/page/1` : '#'}> */}
                    <span className="text-xs capitalize text-gray-500">
                      {tags?.data[0]?.attributes?.name || 'Tool'}
                    </span>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            <div className="flex flex-col z-10 justify-center">
              <span className="text-xs font-semibold uppercase bg-gray-100 font-medium py-0.5 px-3 text-blue-600 border border-black border-opacity-5 rounded-full">
                Get
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ToolIconCard;
