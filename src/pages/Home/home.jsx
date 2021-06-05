import React, { useEffect, useState } from 'react';
import { getIp, api } from '../../services/api';
import { useHistory } from 'react-router-dom';
import './Styles.css';

function Home(props) {
  const history = useHistory();

  const [ip, setIp] = useState();
  const [user, setUser] = useState(false);
  const [name, setName] = useState();
  const [bank, setBank] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [agencyNumber, setAgencyNumber] = useState();
  const [creditCardNumber, setCreditCardNumber] = useState();
  const [senha, setSenha] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    handleRegistered();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(user);

    user ? await login() : await createUser();
  }

  async function createUser() {
    const data = {
      name: name,
      bank: bank,
      agencyNumber: agencyNumber,
      accountNumber: accountNumber,
      creditCardNumber: creditCardNumber,
      password: senha,
      balance: balance,
      ...ip,
    };
    await api.post('register', data);

    alert('Cadastro realizado com sucesso');
    history.push('/account');
  }

  async function login() {
    const data = {
      password: senha,
      ...ip,
    };
    const login = await api.post('login', data);
    console.log(login);
    login.data.isRegister ? history.push('/account') : alert('Senha incorreta');
  }

  async function handleRegistered() {
    const aux = await getIp.get().catch((err) => {
      console.log(err);
    });

    setIp(aux.data);

    api
      .post('isUser', aux.data)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='container-home'>
      <header className='container-header'>
        <h1 className='home-header-title'>
          Bem vindo ao nosso site de transferencias
        </h1>
      </header>

      <body className='container-body'>
        <form onSubmit={handleSubmit} className='user-form'>
          <fieldset>
            {user ? (
              <div>
                <legend>Ola {user.name} , por favor insira sua senha</legend>
                <div className='input-block'>
                  <label>Senha</label>
                  <input
                    id='senha'
                    type='password'
                    onChange={(event) => {
                      setSenha(event.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <legend>
                  Vimos que voce ainda não é cliente , vamos criar uma conta ?
                </legend>
                <div className='input-block'>
                  <label>Nome</label>
                  <input
                    id='name'
                    value={name}
                    type='text'
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className='input-block'>
                  <label>Banco</label>
                  <input
                    id='bank'
                    value={bank}
                    type='text'
                    onChange={(event) => {
                      setBank(event.target.value);
                    }}
                  />
                </div>
                <div className='input-block'>
                  <label>Numero da agencia</label>
                  <input
                    id='agencyNumber'
                    type='number'
                    onChange={(event) => {
                      setAgencyNumber(event.target.value);
                    }}
                  />
                </div>
                <div className='input-block'>
                  <label>Numero da conta</label>
                  <input
                    id='accountNumber'
                    type='number'
                    onChange={(event) => {
                      setAccountNumber(event.target.value);
                    }}
                  />
                </div>
                <div className='input-block'>
                  <label>Numero do cartão</label>
                  <input
                    id='creditCardNumber'
                    type='number'
                    onChange={(event) => {
                      setCreditCardNumber(event.target.value);
                    }}
                  />
                </div>
                <div className='input-block'>
                  <label>Senha</label>
                  <input
                    id='senha'
                    type='password'
                    onChange={(event) => {
                      setSenha(event.target.value);
                    }}
                  />
                </div>
                <div className='input-block'>
                  <label>Deposito inicial</label>
                  <input
                    id='balance'
                    type='number'
                    onChange={(event) => {
                      setBalance(event.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </fieldset>

          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </body>

      <footer className='container-footer'></footer>
    </div>
  );
}

export { Home };
