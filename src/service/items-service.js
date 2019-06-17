const data = [
  {
    id: "1",
    text: "Week 1",
    children: [
      {
        id: "1-1",
        text: "Git bash",
        children: [
          {
            id: "1-1-1",
            text:
              "What's the difference between Windows powershell, bash and zsh? ",
            children: [],
            display: false
          }
        ],
        display: false
      },
      { id: "1-2", text: "VSCode shortcuts", children: [], display: false },
      {
        id: "1-3",
        text: "Users Groups and Others permission",
        children: [],
        display: false
      },
      {
        id: "1-4",
        text: "CSS",
        children: [
          {
            id: "1-4-1",
            text: "What are the CSS selectors?",
            children: [],
            display: false
          },
          {
            id: "1-4-2",
            text: "What are the CSS combinators?",
            children: [
              {
                id: "1-4-2-1",
                text: "Adjacent sibling combinator: A + B",
                children: [],
                display: false
              },
              {
                id: "1-4-2-2",
                text: "General sibling combinator: A ~ B",
                children: [],
                display: false
              },
              {
                id: "1-4-2-3",
                text: "Child combinator: A > B",
                children: [],
                display: false
              },
              {
                id: "1-4-2-4",
                text: "Descendant combinator: A B",
                children: [],
                display: false
              },
              {
                id: "1-4-2-5",
                text: "Column combinator: A || B",
                children: [],
                display: false
              }
            ],
            display: false
          },
          {
            id: "1-4-2",
            text: "What are the CSS Pseudo-classes?",
            children: [],
            display: false
          },
          {
            id: "1-4-3",
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
    id: "2",
    text: "Week 2",
    children: [
      {
        id: "2-1",
        text: "this, ES6, error handling",
        children: [],
        display: false
      },
      {
        id: "2-2",
        text: "Promise, async/await, testing with Jest",
        children: [],
        display: false
      }
    ],
    display: false
  },
  {
    id: "3",
    text: "Week 3",
    children: [
      {
        id: "3-1",
        text:
          "What is React?, Single Page Apps, React.createElement(), JSX, function components, class components, ReactDOM.render(), Virtual DOM",
        children: [],
        display: false
      },
      {
        id: "3-2",
        text: "Promise, async/await, testing with Jest",
        children: [],
        display: false
      }
    ],
    display: false
  },
  { id: "4", text: "Week 4", children: [], display: false },
  {
    id: "5",
    text: "A veryyyyy longgggggggggggggggggggg word testing123",
    children: [],
    display: false
  }
];

const getData = () => {
  return data;
};

export default getData;
