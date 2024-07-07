type BadgeContainerTypes = {
  list: string[],
remove?: (badgeToRemove: string) => void,
    loadingText:string
};

const BadgeContainer = ({
  list,
  remove,
  loadingText
}: BadgeContainerTypes) => {
  return (
    <div className="w-full flex flex-wrap gap-2 my-4">
        {
            list?.map( (listItem)=> <span className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
            <p className="whitespace-nowrap text-sm">{listItem}</p>
      
            <button className="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:bg-purple-300" onClick={()=>{
                    remove?.(listItem)
                }}>
              <span className="sr-only">Remove badge</span>
      
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
               
            )
        }
    </div>
  );
};

export default BadgeContainer;
