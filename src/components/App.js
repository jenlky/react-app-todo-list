import React from "react";
import Input from "./Input";
import Button from "./Button";
import ToDoList from "./ToDoList";
import "../styles/App.css";

// Can Remove Item(Bonus): No
// Able to handle very long todo item(Bonus): No

// Responsive(Bonus): No
// Prevent adding empty task(Bonus): Yes
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

  searchField = event => {
    this.setState({
      searchField: event.target.value
    });
  };

  handleClick = () => {
    if (this.state.searchField !== "") {
      const items = [...this.state.items];
      items.push(this.state.searchField);

      this.setState({
        items
      });
    }
  };

  handleKeyDown = event => {
    const enterCondition =
      event.key === "Enter" && this.state.searchField !== "";
    if (enterCondition) {
      const items = [...this.state.items];
      items.push(this.state.searchField);

      this.setState({
        items
      });
      event.target.value = "";
    }
  };

  /* toDoList.addEventListener("click", event => {
    event.target.classList.toggle("done");
  }); */

  render() {
    return (
      <div className="app">
        <h1>My To-Do List</h1>
        <Input
          searchField={this.searchField}
          handleKeyDown={this.handleKeyDown}
        />
        <Button handleClick={this.handleClick} />
        <ToDoList items={this.state.items} />
      </div>
    );
  }
}

export default App;
