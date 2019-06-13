import React from "react";
import Input from "./Input";
import Button from "./Button";
import ToDoParentList from "./ToDoParentList";
import "../styles/App.css";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// Responsive(Bonus): No

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  keyInItemHandler = event => {
    this.setState({
      keyInItem: event.target.value
    });
  };

  findObject = id => {
    const items = this.state.items;

    for (let x = 0; x < items.length; x++) {
      if (id[0] === items[x].id) {
        return x;
      }
    }
  };

  traverseObj = (firstObj, traverse) => {
    let currItem = null;

    for (let address of traverse) {
      currItem = firstObj.children[address];
    }

    return currItem;
  };

  editItem = (value, id, traverse) => {
    console.log(id);

    if (id.length === 1) {
      traverse.push(this.findObject(id[0]));
    } else {
      traverse.push(this.findObject(id[0]));
      id.shift();
      this.editItem(value, id, traverse);
    }

    // when I destructure the inner references are all the same, only the outermost reference is different
    const items = [...this.state.items];

    if (traverse.length === 1) {
      items[traverse[0]].text = value;
    } else {
      const found = this.traverseObj(items[traverse[0]], traverse);
      found.text = value;
    }

    // after I destructure and edit, I setState to trigger a reset
    this.setState({ items });
  };

  createObjectSetState = () => {
    const newObject = {
      id: this.state.items.length + 1,
      text: this.state.keyInItem
    };

    this.setState({
      items: [...this.state.items, newObject],
      keyInItem: ""
    });
  };

  // enter on input adds item
  handleKeyDown = event => {
    const enterCondition = event.key === "Enter" && this.state.keyInItem !== "";

    if (enterCondition) {
      this.createObjectSetState();

      // set input value empty string
      event.target.value = "";
    }
  };

  // add item to parent list item
  addParentItem = event => {
    console.log(event.currentTarget);
    const enterCondition = this.state.keyInItem !== "";

    if (enterCondition) {
      this.createObjectSetState();

      // set input value empty string
      event.currentTarget.previousSibling.value = "";
    }
  };

  findLength = (firstObj, traverse) => {
    traverse.pop();
    let currItem = null;

    for (let address of traverse) {
      currItem = firstObj.children[address];
    }

    return currItem;
  };

  // create a ToDoItem and push it in the children array
  addChildItem = (id, traverse) => {
    console.log(id);

    if (id.length === 1) {
      traverse.push(this.findObject(id[0]));
    } else {
      traverse.push(this.findObject(id[0]));
      id.shift();
      this.addChildItem(id, traverse);
    }

    const items = [...this.state.items];
    // console.log(traverse);

    if (traverse.length === 1) {
      // traverse that layer of items, find the last element id and +1
      // how to traverse? index[0].children[1].children[length - 1] increment by 1
      // to loop through, I have to find the length - 1
      const length = items[traverse[0]].children.length;
      const latestId = items[traverse[0]].children[length - 1].id;
      const splitId = latestId.split("-");
      const lastNum = splitId[splitId.length - 1];
      let newId = Number(lastNum) + 1;
      splitId[splitId.length - 1] = "" + newId;
      const combinedId = splitId.join("-");

      console.log(combinedId);

      const newObj = { id: combinedId, text: "", children: [] };
      items[traverse[0]].children.push(newObj);
    } else {
      const length = this.findLength(items[traverse[0]], traverse);
      console.log(length);

      // const found = this.traverseObj(items[traverse[0]], traverse);
      // found.text = value;
    }

    this.setState({ items });
  };

  // currently only remove item from parent list item
  // insert remove child item into removeItem logic
  // recursively find the object and remove it from the array
  removeItem = id => {
    const { items } = this.state;

    for (let x = 0; x < items.length; x++) {
      if (id === items[x].id) {
        const duplicateItems = [...items];
        duplicateItems.splice(x, 1);

        this.setState({
          items: duplicateItems
        });
      }
    }
  };

  render() {
    // console.log(this.state.items);

    return (
      <div className="todo">
        <DragDropContextProvider backend={HTML5Backend}>
          <h1>My To-Do List</h1>
          <div className="todo-inputAndBtn">
            <Input
              keyInItemHandler={this.keyInItemHandler}
              handleKeyDown={this.handleKeyDown}
            />
            <Button addParentItem={this.addParentItem} />
          </div>
          <ToDoParentList
            items={this.state.items}
            removeItem={this.removeItem}
            addChildItem={this.addChildItem}
            editItem={this.editItem}
          />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
