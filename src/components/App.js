import React from "react";
import Input from "./Input";
import Button from "./Button";
import ToDoList from "./ToDoList";
import "../styles/App.css";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// Responsive(Bonus): No

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: "week 1" },
        { id: 2, text: "week 2" },
        { id: 3, text: "week 3" },
        { id: 4, text: "week 4" },
        { id: 5, text: "A veryyyyy longgggggggggggggggggggg word testing123" }
      ],
      searchField: ""
    };
  }

  searchField = event => {
    this.setState({
      searchField: event.target.value
    });
  };

  createObjectSetState = () => {
    const newObject = {
      id: this.state.items.length + 1,
      text: this.state.searchField
    };

    this.setState({
      items: [...this.state.items, newObject],
      searchField: ""
    });
  };

  handleKeyDown = event => {
    const enterCondition =
      event.key === "Enter" && this.state.searchField !== "";

    if (enterCondition) {
      this.createObjectSetState();

      // set input value empty string
      event.target.value = "";
    }
  };

  addItem = event => {
    const enterCondition = this.state.searchField !== "";

    if (enterCondition) {
      this.createObjectSetState();

      // set input value empty string
      event.currentTarget.previousSibling.value = "";
    }
  };

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
    console.log(this.state.items);

    return (
      <div className="todo">
        <DragDropContextProvider backend={HTML5Backend}>
          <h1>My To-Do List</h1>
          <div className="todo-inputAndBtn">
            <Input
              searchField={this.searchField}
              handleKeyDown={this.handleKeyDown}
            />
            <Button addItem={this.addItem} />
          </div>
          <ToDoList items={this.state.items} removeItem={this.removeItem} />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
