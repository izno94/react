import React, { Component } from "react";
import http from "../services/httpService";
import config from "../config";

class Commentaires extends Component {
  state = {
    commentaires: []
  };

  async componentDidMount() {
    const { data: commentaires } = await http.get(config.urlCommentaire);

    this.setState({ commentaires: commentaires });
  }

  handleAdd = async () => {
    const newPost = { name: "nouveau commentaire" };

    const { data } = await http.post(config.urlCommentaire, newPost);
    const newList = [data, ...this.state.commentaires];

    this.setState({ commentaires: newList });
    console.log("Ajouter");
  };

  handleUpdate = async commentaire => {
    const postModifie = { name: `${commentaire.name} modifié !` };

    const { data } = await http.put(
      `${config.urlCommentaire}/${commentaire.id}`,
      postModifie
    );

    const clonePosts = [...this.state.commentaires];

    const index = clonePosts.indexOf(commentaire);
    clonePosts[index] = data;

    this.setState({ commentaires: clonePosts });

    console.log("Mis à jour", commentaire);
  };

  handleDelete = async commentaire => {
    try {
      const result = await http.delete(
        `${config.urlCommentaire}/${commentaire.id}`
      );
      const listPost = this.state.commentaires.filter(
        p => p.id !== commentaire.id
      );
      this.setState({ commentaires: listPost });
      console.log("tout s'est bien passé", result);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(
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
            Nouvel Commentaire
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
              {this.state.commentaires.map(commentaire => (
                <tr key={commentaire.id}>
                  <td>{commentaire.name}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.handleUpdate(commentaire)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(commentaire)}
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

export default Commentaires;
