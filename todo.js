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
    this.updateTodo = this.updateTodo.bind(this);
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

  updateTodo(todo, newName) {
    const newTodo = { id: todo.id, name: newName };
    const newTodos = [...this.state.todos];
    newTodos[this.state.todos.indexOf(todo)] = newTodo;
    this.setState({ todos: newTodos });
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
              <Todo
                todo={todo}
                updateTodo={this.updateTodo}
                deleteTodo={this.deleteTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.startEdit = this.startEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }
  startEdit() {
    console.log("startEdit");
    this.setState({ editing: true });
  }
  finishEdit(newName) {
    console.log("finishEdit");
    console.log(newName);

    this.setState({ editing: false });
    this.props.updateTodo(this.props.todo, newName);
  }
  render() {
    return (
      <div>
        {this.state.editing ? (
          <EditTodo todo={this.props.todo} finishEdit={this.finishEdit} />
        ) : (
          <ShowTodo
            todo={this.props.todo}
            startEdit={this.startEdit}
            deleteTodo={this.props.deleteTodo}
          />
        )}
      </div>
    );
  }
}

class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: this.props.todo.name,
    };
  }
  render() {
    return (
      <div>
        <form onSubmit={() => this.props.finishEdit(this.state.newName)}>
          <input
            type="text"
            value={this.state.newName}
            onChange={(e) => this.setState({ newName: e.target.value })}
          />
          <input type="submit" value="更新" />
        </form>
      </div>
    );
  }
}

class ShowTodo extends React.Component {
  render() {
    return (
      <div>
        {this.props.todo.name}
        <button onClick={this.props.startEdit}>編集</button>
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
