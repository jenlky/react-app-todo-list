const data = [
  {
    id: "1",
    text: "Week 1",
    children: [
      { id: "1-1", text: "Git bash", children: [], display: false },
      { id: "1-2", text: "Jest", children: [], display: false }
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
