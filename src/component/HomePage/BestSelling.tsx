import { Link } from "@/i18n/navigation";

import { getTranslations } from "next-intl/server";
import { BsHeartFill } from "react-icons/bs";

export default async function BestSelling() {
  const t = await getTranslations("HomePage.BestSelling");

  return (
    <div className="bg-white py-24 flex flex-col gap-18 justify-center">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase">
          {t("title")}
        </h2>
        <p className="text-paragraph text-sm md:text-shadow-md font-medium w-10/12 md:w-6/12 lg:w-4/12 mx-auto">
          {t("subtitle")}
        </p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mx-auto">
        {products.map(({ id, name, category, price, image }) => (
          <Link
            href={`/products/${category}/${id}`}
            key={id}
            className="bg-background rounded-2xl p-4 flex flex-col gap-3 h-full"
          >
            <div className="relative">
              <button className="absolute z-10 top-4 right-4 w-10 h-10 rounded-full flex justify-center items-center bg-gray-200 group  cursor-pointer">
                {" "}
                <BsHeartFill
                  size={18}
                  className="text-gray-600 group-hover:text-title duration-200 group-active:text-red-500"
                />{" "}
              </button>

              <figure className="overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={name}
                  className="w-full object-cover object-center h-70 hover:scale-110 :scale-110 duration-300"
                />
              </figure>
            </div>
            <div className="flex justify-between gap-5 grow">
              <h4 className="md:text-lg text-title font-bold">{name}</h4>
              <p className="bg-title text-white font-medium rounded-full px-2 py-1 w-fit h-fit text-xs">
                {t(`category.${category.toLowerCase()}`)}
              </p>
            </div>

            <h4 className="text-lg md:text-xl text-primary font-semibold">
              ${price}{" "}
            </h4>
          </Link>
        ))}
      </div> */}
    </div>
  );
}
