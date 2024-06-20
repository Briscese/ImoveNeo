import {ADD_POST} from '../actions/actionTypes';

const initialState = {
  posts: [
    {
      tipoImovel: 'Casa',
      rua: 'Pedra',
      bairro: 'Morumbi',
      localizacao: 'Jacarei',
      numero: '14',
      complemento: 'Casa',
      tipoTransacao: 'Aluguel',
      valor: '1000',
      photo: [],
    },
    {
      tipoImovel: 'Apartamento',
      rua: 'Pedra',
      bairro: 'Morumbi',
      localizacao: 'Jacarei',
      numero: '14',
      complemento: 'Casa',
      tipoTransacao: 'Venda',
      valor: '5000',
      photo: [],
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat({
          ...action.payload,
        }),
      };
    default:
      return state;
  }
};

export default reducer;
