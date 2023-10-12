import { useEffect, useState } from "react";

function useLoader(initialLoading: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);

  useEffect(() => {
    const loader = document.querySelector(".loader") as HTMLDivElement | null;
    const bodyTag = document.querySelector("body") as HTMLBodyElement | null;

    if (loader && bodyTag) {
      if (isLoading) {
        loader.classList.remove("loader--hide");
        bodyTag.classList.add("loader-added");
      } else {
        loader.classList.add("loader--hide");
        bodyTag.classList.remove("loader-added");
      }
    }
  }, [isLoading]);

  return { isLoading, setIsLoading };
}

export default useLoader;
