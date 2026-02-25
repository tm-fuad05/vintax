import { getBestSellingProducts } from "@/lib/actions/bestSelling";
import { getTranslations } from "next-intl/server";
import { BsHeartFill } from "react-icons/bs";

export default async function BestSelling() {
  //   const bestSelling: BestSelling[] = [
  //     {
  //       id: "men-002",
  //       name: "Casual Oversized T-Shirt",
  //       category: "Men",
  //       price: 29.99,
  //       sizes: ["S", "M", "L", "XL", "XXL"],
  //       colors: ["White", "Beige", "Olive"],
  //       image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23",
  //       description:
  //         "Soft cotton oversized t-shirt designed for everyday comfort.",
  //     },

  //     {
  //       id: "women-002",
  //       name: "High-Waist Wide Leg Pants",
  //       category: "Women",
  //       price: 54.0,
  //       sizes: ["S", "M", "L", "XL"],
  //       colors: ["Cream", "Black"],
  //       image: "/wpant.jpg",
  //       description:
  //         "Chic high-waist wide leg pants with breathable fabric and relaxed fit.",
  //     },
  //     {
  //       id: "men-003",
  //       name: "Slim Fit Chino Pants",
  //       category: "Men",
  //       price: 59.99,
  //       sizes: ["30", "32", "34", "36"],
  //       colors: ["Navy", "Khaki"],
  //       image: "pant.webp",
  //       description:
  //         "Modern slim-fit chino pants suitable for both office and casual wear.",
  //     },
  //     {
  //       id: "women-003",
  //       name: "Minimalist White Blouse",
  //       category: "Women",
  //       price: 39.99,
  //       sizes: ["XS", "S", "M", "L"],
  //       colors: ["White"],
  //       image: "/blouse.jpg",
  //       description:
  //         "Elegant minimalist white blouse made from premium soft fabric.",
  //     },
  //   ];

  const bestSelling = await getBestSellingProducts();
  console.log(bestSelling);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mx-auto">
        {bestSelling.map(({ id, name, category, price, image }) => (
          <div
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
                  className="w-full object-cover object-bottom h-80 hover:scale-110 :scale-110 duration-300"
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
            <button
              className="capitalize w-full rounded-full border-2 border-primary text-primary font-semibold py-2 hover:bg-primary hover:text-white
            active:bg-primary active:text-white duration-200 cursor-pointer"
            >
              {t("addToCart")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
