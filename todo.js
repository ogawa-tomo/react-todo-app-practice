// "use strict";

const e = React.createElement;

class ToDos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, name: "本を買う" },
        { id: 2, name: "クリーニング屋に行く" },
        { id: 3, name: "床屋に行く" },
      ],
    };
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return <li key={todo.id}>{todo.name}</li>;
    });
    return (
      <div>
        <ul>{todos}</ul>
      </div>
    );
  }
}

const domContainer = document.querySelector("#react_todo_app");
const root = ReactDOM.createRoot(domContainer);
root.render(e(ToDos));
