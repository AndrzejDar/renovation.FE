export const parseObjectToUrlQuery = (object: Object | undefined): string => {
  if (!object) {
    return "";
  }
  //   console.log(object);
  let query = "?";
  query += Object.entries(object)
    .map((a) => {
      //   console.log(Array.isArray(a[1]), a[1]);
      if (String(a[1]) === "") return "";
      else if (Array.isArray(a[1])) {
        return a[1]
          .map((el) => {
            // console.log(a[0], "  ", el);
            return `${a[0]}[]=${el}&`;
          })
          .join("");
      } else {
        return a.join("=") + "&";
      }
    })
    .join("");
  return query;
};
