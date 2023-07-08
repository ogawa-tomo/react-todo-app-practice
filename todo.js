// "use strict";

const e = React.createElement;

class ToDos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todos: [
        { id: 1, name: "本を買う" },
        { id: 2, name: "クリーニング屋に行く" },
        { id: 3, name: "床屋に行く" },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todo: event.target.value });
  }

  handleSubmit(event) {
    const ids = this.state.todos.map((todo) => todo.id);
    this.setState((state) => {
      return {
        todos: [...state.todos, { id: ids + 1, name: this.state.todo }],
      };
    });
    this.setState({ todo: "" });
    event.preventDefault();
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return <li key={todo.id}>{todo.name}</li>;
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.todo}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="登録" />
        </form>
        <ul>{todos}</ul>
      </div>
    );
  }
}

const domContainer = document.querySelector("#react_todo_app");
const root = ReactDOM.createRoot(domContainer);
root.render(e(ToDos));
