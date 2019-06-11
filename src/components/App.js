import React from "react";
import Input from "./Input";
import Button from "./Button";
import ToDoList from "./ToDoList";
import "../styles/App.css";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// Responsive(Bonus): No

// UI Usability Review:
// Add style to increase the size of the todo list so that it makes better use of the white space.
// Keep the list items and the input field aligned to be more tidy.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        "week 1",
        "week 2",
        "week 3",
        "week 4",
        "A veryyyyy longgggggggggggggggggggg word testing123"
      ],
      searchField: ""
    };
  }

  haveDuplicates = event => {
    if (this.state.items.includes(event.target.value)) {
      return true;
    }
    return false;
  };

  searchField = event => {
    this.setState({
      searchField: event.target.value
    });
  };

  handleKeyDown = event => {
    const enterCondition =
      event.key === "Enter" &&
      this.state.searchField !== "" &&
      !this.haveDuplicates(event);

    if (enterCondition) {
      this.setState({
        items: [...this.state.items, this.state.searchField],
        searchField: ""
      });
      // set input value empty string
      event.target.value = "";
    }
  };

  addItem = event => {
    // console.log(event.currentTarget.previousSibling);

    const enterCondition =
      this.state.searchField !== "" && !this.haveDuplicates(event);

    if (enterCondition) {
      this.setState({
        items: [...this.state.items, this.state.searchField],
        searchField: ""
      });
      // set input value empty string
      event.currentTarget.previousSibling.value = "";
    }
  };

  removeItem = event => {
    // parent = div todo-item-content that contains span {item} and img cross
    const textContent = event.target.parentNode.textContent;

    const items = [...this.state.items];
    const index = items.indexOf(textContent);
    items.splice(index, 1);

    this.setState({
      items
    });
  };

  render() {
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
