const data = {
  items: [
    {
      id: "1",
      text: "Week 1",
      children: [
        { id: "1-1", text: "Git bash", children: [] },
        { id: "1-2", text: "Jest", children: [] }
      ]
    },
    {
      id: "2",
      text: "Week 2",
      children: [
        { id: "2-1", text: "this, ES6, error handling", children: [] },
        {
          id: "2-2",
          text: "Promise, async/await, testing with Jest",
          children: []
        }
      ]
    },
    {
      id: "3",
      text: "Week 3",
      children: [
        {
          id: "3-1",
          text:
            "What is React?, Single Page Apps, React.createElement(), JSX, function components, class components, ReactDOM.render(), Virtual DOM",
          children: []
        },
        {
          id: "3-2",
          text: "Promise, async/await, testing with Jest",
          children: []
        }
      ]
    },
    { id: "4", text: "Week 4", children: [] },
    {
      id: "5",
      text: "A veryyyyy longgggggggggggggggggggg word testing123",
      children: []
    }
  ],
  keyInItem: ""
  // title: "My To-Do List"
};

const getData = () => {
  return data;
};

export default getData;
