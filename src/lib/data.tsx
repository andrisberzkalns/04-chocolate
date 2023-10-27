enum ChocolateTypes {
  title = "title",
  pergale_dark = "pergale_dark",
  pergale_cranberries = "pergale_cranberries",
  pergale_forestberries = "pergale_forestberries",
  pergale_grilyazh = "pergale_grilyazh",
}

const data = [
  {
    key: ChocolateTypes.title,
    label: "Home",
    title: "Chocolate",
    subtitle: "Challenge",
    description:
      "Adding a new\nchocolate bar\nto this website\nuntil a company\nsends me a box\nof chocolates.",
    source: "/assets/pergale_dark.glb",
    bg: "teal",
  },
  {
    key: ChocolateTypes.pergale_dark,
    label: "Dark Chocolate",
    title: "Pergalė Dark",
    subtitle: "Dark Chocolate",
    description: "27.11.2023",
    source: "/assets/pergale_dark.glb",
    bg: "steelblue",
  },
  {
    key: ChocolateTypes.pergale_cranberries,
    label: "Cranberries",
    title: "Pergalė Dark",
    subtitle: "Chocolate with\nCranberries",
    description: "",
    source: "/assets/pergale_cranberries.glb",
    bg: "crimson",
  },
  {
    key: ChocolateTypes.pergale_forestberries,
    label: "Forest Berries",
    title: "Pergalė Milk",
    subtitle: "Forest Berries",
    description: "",
    source: "/assets/pergale_forestberries.glb",
    bg: "purple",
  },
  {
    key: ChocolateTypes.pergale_grilyazh,
    label: "Grilyazh",
    title: "Pergalė Milk",
    subtitle: "Grilyazh",
    description: "",
    source: "/assets/pergale_grilyazh.glb",
    bg: "maroon",
  },
];

export { data, ChocolateTypes };
