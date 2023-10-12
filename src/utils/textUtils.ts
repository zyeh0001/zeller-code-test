export const capitalizeFirstLetter = (text: string) => {
  if (text.length === 0) {
    return text; // Return empty string if input is empty
  }

  return text[0].toUpperCase() + text.slice(1).toLowerCase();
};
