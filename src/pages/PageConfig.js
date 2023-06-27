import React, { Component } from 'react';

export default class PageConfig extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">
          Configurações
        </h1>
        <p>
          Em breve na proxima atualização você podera configurar o jogo como quiser!
        </p>
        <button>
          <a href="/">Voltar</a>
        </button>
      </div>
    );
  }
}
