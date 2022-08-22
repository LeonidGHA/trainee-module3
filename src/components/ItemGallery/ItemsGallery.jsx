import { Component } from "react";

class ItemsGallery extends Component {
  state = {
    items: [],
    page: 1,
  };

  componentDidMount() {
    this.fetchRespose();
  }

  componentDidUpdate(_, prevState) {
    const { page } = this.state;
    if (page !== prevState.page) {
      this.fetchRespose();
    }
  }

  fetchRespose() {
    const { page } = this.state;
    fetch(`https://jsonplaceholder.typicode.com/users/${page}/albums`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        this.setState((prevState) => ({
          items: page > 1 ? [...prevState.items, ...data] : data,
        }));
      })
      .catch(console.error);
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <ul>
          {items.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() =>
            this.setState((prevState) => ({ page: prevState.page + 1 }))
          }
        >
          Load more
        </button>
      </div>
    );
  }
}

export default ItemsGallery;
