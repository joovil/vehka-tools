export const scrollToElement = (id: string) => {
  const el = document.getElementById(id);
  el?.scrollIntoView();
  return el;
};
