import React from "react";
import Input from "./Input";
import Button from "./Button";
import ToDoList from "./ToDoList";
import "../styles/App.css";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// Able to handle very long todo item(Bonus): No

// Responsive(Bonus): No
// Cannot have two of the same items (strings)

// UI Usability Review:
// Add style to increase the size of the todo list so that it makes better use of the white space.
// Keep the list items and the input field aligned to be more tidy.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["buy milk", "eat dinner", "nail javascript", "give feedback"],
      searchField: ""
    };
  }

  checkDuplicates = () => {};

  searchField = event => {
    this.setState({
      searchField: event.target.value
    });
  };

  handleKeyDown = event => {
    const enterCondition =
      event.key === "Enter" && this.state.searchField !== "";

    if (enterCondition) {
      this.setState({
        items: [...this.state.items, this.state.searchField]
      });
      event.target.value = "";
    }
  };

  addItem = () => {
    if (this.state.searchField !== "") {
      this.setState({
        items: [...this.state.items, this.state.searchField]
      });
    }
  };

  removeItem = event => {
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
          <div>
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
