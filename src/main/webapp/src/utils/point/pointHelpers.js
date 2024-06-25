export const textFloat = (textArray, setTexts) => {
  const text = textArray[Math.floor(Math.random() * textArray.length)];
  const id = Date.now(); // Unique ID
  // console.log("Generated text:", text); // Debug log
  setTexts((prevTexts) => [...prevTexts, { id, text }]);

  // 텍스트를 2초 후 제거
  setTimeout(() => {
    setTexts((prevTexts) => {
      const updatedTexts = prevTexts.filter((t) => t.id !== id);
      // console.log("Updated texts after removal:", updatedTexts); // Debug log
      return updatedTexts;
    });
  }, 2000);
};

export const handleKoriClick = (setTexts, textArray) => {
  const koriElement = document.querySelector(".kori");
  koriElement.classList.add("jump");
  koriElement.addEventListener(
    "animationend",
    () => {
      koriElement.classList.remove("jump");
    },
    { once: true }
  );

  textFloat(textArray, setTexts);
};
