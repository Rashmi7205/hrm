import React from "react";

const FilterBox = ({
  title,
  list,
  search,
  onclick
}: {
  title: string;
  list: [string];
  search: [string];
  onclick?:()=>{}
}) => {
  return (
    <div className="w-full py-1 px-2 ">
      <p className="font-semibold">{title}</p>
      <div className="flex flex-wrap gap-0.5">
        <span
          className={
            "text-xs border rounded-xl  px-2 py-2 cursor-pointer " +
            (search.length ? "" : "bg-blue-500 text-white")
          }
        >
          All {title}s
        </span>
        {
          //@ts-ignore
          list &&
            list
              .splice(0, 5)
              .map((listItem) => (
                <span
                  className={
                    "text-xs border rounded-xl  px-2 py-2 cursor-pointer " +
                    (search.includes(listItem) ? "bg-blue-500 text-white" : "")
                  }
                  onClick={onclick}
                >
                  {listItem}
                </span>
              ))
        }
      </div>
    </div>
  );
};

export default FilterBox;
