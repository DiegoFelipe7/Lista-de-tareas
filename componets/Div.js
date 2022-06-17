export const Div = (clases) => {
  const div = document.createElement("div");
  clases.forEach((element) => {
    div.classList.add(element);
  });
  return div;
};
