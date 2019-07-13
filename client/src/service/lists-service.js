const lists = [
  {
    id: 1,
    name: "Week 1",
    listItems: [
      {
        text: "Git bash",
        children: [
          {
            text:
              "What's the difference between Windows powershell, bash and zsh? ",
            children: [],
            display: false
          }
        ],
        display: false
      },
      { text: "VSCode shortcuts", children: [], display: false },
      {
        text: "Users Groups and Others permission",
        children: [],
        display: false
      },
      {
        text: "CSS",
        children: [
          {
            text: "What are the CSS selectors?",
            children: [],
            display: false
          },
          {
            text: "What are the CSS combinators?",
            children: [
              {
                text: "Adjacent sibling combinator: A + B",
                children: [],
                display: false
              },
              {
                text: "General sibling combinator: A ~ B",
                children: [],
                display: false
              }
            ],
            display: false
          },
          {
            text: "What are the CSS Pseudo-classes?",
            children: [],
            display: false
          },
          {
            text: "What are the CSS Pseudo-elements?",
            children: [],
            display: false
          }
        ],
        display: false
      }
    ],
    display: false
  },
  {
    id: 2,
    name: "Week 2",
    listItems: [
      {
        text: "this, ES6, error handling",
        children: [],
        display: false
      },
      {
        text: "Promise, async/await, testing with Jest",
        children: [],
        display: false
      }
    ],
    display: false
  }
];

const getList = () => {
  return lists;
};

export default getList;
