let ep = {
  tag: "DIV",
  data: [
    "\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n        Curabitur metus ex, tempor vel leo vel, aliquam mollis nisl.\n        In lacus justo, finibus eget neque sed, vulputate egestas ipsum.\n        Sed rhoncus vestibulum est et pharetra.\n        In pharetra convallis sem dapibus suscipit.\n        Nam dui mauris, varius vel tempus a, efficitur a lorem.\n        Integer vehicula turpis at hendrerit ultricies.\n        Donec sollicitudin arcu in tempus varius.\n        Cras bibendum euismod porta.\n        Suspendisse molestie id felis in congue.\n        Morbi sed dolor mi.\n        ",
  ],
  attributes: { contenteditable: "true" },
  class: ["textbox"],
};

let eu = unpack_element(ep);
console.log(eu);