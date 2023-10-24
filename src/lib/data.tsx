enum ChocolateTypes {
  pergale_dark = "pergale_dark",
  pergale_cranberries = "pergale_cranberries",
  pergale_forestberries = "pergale_forestberries",
  pergale_grilyazh = "pergale_grilyazh",
}

const data = [
  {
    isSelected: false,
    key: ChocolateTypes.pergale_dark,
    label: "1",
    title: "Pergalė Dark",
    subtitle: "Dark Chocolate",
    description: "",
    source: "/assets/pergale_dark.glb",
  },
  {
    isSelected: false,
    key: ChocolateTypes.pergale_cranberries,
    label: "2",
    title: "Pergalė Dark",
    subtitle: "Chocolate with\nCranberries",
    description: "",
    source: "/assets/pergale_cranberries.glb",
  },
  {
    isSelected: false,
    key: ChocolateTypes.pergale_forestberries,
    label: "3",
    title: "Pergalė Milk",
    subtitle: "Forest Berries",
    description: "",
    source: "/assets/pergale_forestberries.glb",
  },
  {
    isSelected: false,
    key: ChocolateTypes.pergale_grilyazh,
    label: "4",
    title: "Pergalė Milk",
    subtitle: "Grilyazh",
    description: "",
    source: "/assets/pergale_grilyazh.glb",
  },
];

export { data, ChocolateTypes };
