export const scrollToElement = (id: string) => {
  const el = document.getElementById(id);
  console.log(id);
  console.log(el);
  el?.scrollIntoView();
};
