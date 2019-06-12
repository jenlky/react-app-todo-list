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
          text: "week 1",
          children: [
            { id: "1-1", text: "git bash", children: [] },
            { id: "1-2", text: "jest", children: [] }
          ]
        },
        { id: "2", text: "week 2", children: [] },
        { id: "3", text: "week 3", children: [] },
        { id: "4", text: "week 4", children: [] },
        {
          id: "5",
          text: "A veryyyyy longgggggggggggggggggggg word testing123",
          children: []
        }
      ],
      keyInItem: ""
    };
  }

  keyInItemHandler = event => {
    this.setState({
      keyInItem: event.target.value
    });
  };

  editItem = (event, id) => {
    const editedValue = event.target.value;
    const items = [...this.state.items];

    if (id.length === 1) {
      for (let x = 0; x < items.length; x++) {
        if (id === items[x].id) {
          items[x].text = editedValue;
        }
      }
    } else {
      const splitId = id.split("-");
      console.log(splitId);

      let layerIndex = 0;

      while (layerIndex < splitId.length) {
        for (let x = 0; x < items.length; x++) {
          if (splitId[layerIndex] === items[x].id) {
            console.log("before loop: ", layerIndex);

            for (let y = 0; y < items[x].children.length; y++) {
              console.log("after loop: ", layerIndex);

              // id is hardcoded, not a good idea
              if (id === items[x].children[y].id) {
                // console.log(splitId[layerIndex]);
                items[x].children[y].text = editedValue;
              }
            }
          }
        }
        layerIndex++;
      }
    }

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

  // enter on input adds i tem
  handleKeyDown = event => {
    const enterCondition = event.key === "Enter" && this.state.keyInItem !== "";

    if (enterCondition) {
      this.createObjectSetState();

      // set input value empty string
      event.target.value = "";
    }
  };

  // add item to parent list item
  addItem = event => {
    console.log(event.currentTarget);
    const enterCondition = this.state.keyInItem !== "";

    if (enterCondition) {
      this.createObjectSetState();

      // set input value empty string
      event.currentTarget.previousSibling.value = "";
    }
  };

  // remove item from parent list item
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
            <Button addItem={this.addItem} />
          </div>
          <ToDoParentList
            items={this.state.items}
            removeItem={this.removeItem}
            addItem={this.addItem}
            editItem={this.editItem}
          />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
