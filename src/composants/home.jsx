import React, { Component } from "react";
import http from "../services/httpService";
import config from "../config";
import { toast } from "react-toastify";

class Home extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.urlPost);

    this.setState({ posts: posts });
  }

  handleAdd = async () => {
    const newPost = { title: "nouvel article" };

    const { data } = await http.post(config.urlPost, newPost);
    const newList = [data, ...this.state.posts];

    this.setState({ posts: newList });
    toast.error("oulalala");
    toast.warn("super !");
    toast.success("Ajouter");
  };

  handleUpdate = async post => {
    const postModifie = { title: `${post.title} modifié !` };

    const { data } = await http.put(
      `${config.urlPost}/${post.id}`,
      postModifie
    );

    const clonePosts = [...this.state.posts];

    const index = clonePosts.indexOf(post);
    clonePosts[index] = data;

    this.setState({ posts: clonePosts });

    console.log("Mis à jour", post);
  };

  handleDelete = async post => {
    try {
      const result = await http.delete(`${config.urlPost}`);
      const listPost = this.state.posts.filter(p => p.id !== post.id);
      this.setState({ posts: listPost });
      console.log("tout s'est bien passé", result);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.warn(
          "message pour l'internaute : attention l'article demandé n'existe plus"
        );
      }
    }
  };

  render() {
    return (
      <section className="row">
        <div className="col-sm-8 offset-md-2">
          <button className="btn btn-primary my-3" onClick={this.handleAdd}>
            Nouvel Article
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Mis à jour</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.handleUpdate(post)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default Home;
