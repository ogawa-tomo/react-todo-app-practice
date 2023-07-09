// "use strict";

const e = React.createElement;

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
      todos: [
        { id: 1, name: "本を買う" },
        { id: 2, name: "クリーニング屋に行く" },
        { id: 3, name: "床屋に行く" },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  addTodo(event) {
    const newId =
      this.state.todos.length === 0
        ? 1
        : Math.max(...this.state.todos.map((todo) => todo.id)) + 1;
    this.setState((state) => {
      return {
        todos: [...state.todos, { id: newId, name: this.state.newTodo }],
      };
    });
    this.setState({ newTodo: "" });
    event.preventDefault();
  }

  deleteTodo(todo) {
    const newTodo = [...this.state.todos];
    newTodo.splice(this.state.todos.indexOf(todo), 1);
    this.setState({ todos: newTodo });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.newTodo}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="登録" />
        </form>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              <Todo todo={todo} deleteTodo={this.deleteTodo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Todo extends React.Component {
  render() {
    return (
      <div>
        {this.props.todo.name}
        <button onClick={() => this.props.deleteTodo(this.props.todo)}>
          削除
        </button>
      </div>
    );
  }
}

const domContainer = document.querySelector("#react_todo_app");
const root = ReactDOM.createRoot(domContainer);
root.render(e(ToDoApp));
