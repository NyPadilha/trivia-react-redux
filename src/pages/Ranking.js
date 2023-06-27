import { Component } from 'react';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <p>
          Em breve na proxima atualização você podera ver o ranking!
        </p>
        <button
          data-testid="btn-go-home"
        >
          <a href="/">Voltar</a>
        </button>
      </div>
    );
  }
}
