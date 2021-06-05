import React, { useEffect, useState } from 'react';
import { api, getIp } from '../../services/api';
import './Styles.css';

const userModel = {
  balance: 0,
  name: 'andre',
  bank: '',
  agencyNumber: 0,
  accountNumber: 0,
  creditCardNumber: 0,
  ip: '',
};

function Account(props) {
  const [selectedUser, setSelectedUser] = useState(userModel);
  const [user, setUser] = useState(userModel);
  const [allUserWithOutMe, setAllUserWithOutMe] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    getAllInfo();
  }, [user.id]);

  async function getAllInfo() {
    const ip = await getIp.get().catch((err) => {
      console.log(err);
    });
    const response = await api.post('/users', ip.data);
    const { me, allUserWithOutMe } = response.data;
    setUser(...me);
    setAllUserWithOutMe(allUserWithOutMe);
  }

  function renderUserList() {
    return allUserWithOutMe.map((user, index) => {
      return (
        <button
          key={index}
          className=''
          type='button'
          onClick={() => {
            handleSetSelectedUser(user);
          }}
        >
          {user.name}
        </button>
      );
    });
  }

  function handleSetSelectedUser(selected) {
    selectedUser.ip === ''
      ? setSelectedUser(selected)
      : setSelectedUser(userModel);
  }

  function checkBalance() {
    user.balance - value > 0 ? transfer() : alert('Saldo insuficiente');
  }

  async function transfer() {
    const data = {
      recipientIP: selectedUser.ip,
      senderIP: user.ip,
      value: value,
    };

    console.log(data);
    const batata = await api
      .post('/deposit', data)
      .then(async () => {
        await getAllInfo();
        alert('Transferencia bem sucedida');
        handleSetSelectedUser(userModel);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(batata);
  }

  return (
    <div className='container-home'>
      <header className='container-header'>
        <h1 className='home-header-title'>
          Bem vindo ao nosso site de transferencias
        </h1>
      </header>

      <body className='container-body'>
        <div className='container-info'>
          <p>Nome : {user.name}</p>
          <p>Saldo : {user.balance}</p>
          <p>Banco : {user.bank}</p>
        </div>
        <div className='container-info'>
          {selectedUser.ip === '' ? (
            <div className='operation'>
              <p>Lista de conhecidos :</p>
              {renderUserList()}
            </div>
          ) : (
            <div className='operation'>
              <div className='container-fields'>
                <div className='key-colunm'>
                  <p>Nome : </p>
                  <p>Saldo :</p>
                  <p>Banco :</p>
                  <label>Valor da transferencia : </label>
                </div>

                <div className='value-colunm'>
                  <p>{selectedUser.name}</p>
                  <p>{selectedUser.balance} R$</p>
                  <p>{selectedUser.bank}</p>
                  <input
                    type='number'
                    min='0'
                    oninput="validity.valid||(value='');"
                    value={value}
                    onChange={(event) => {
                      event.target.value > 0
                        ? setValue(event.target.value)
                        : setValue(0);
                    }}
                  />
                </div>
              </div>

              <div className='buttons-container'>
                <button
                  onClick={() => {
                    checkBalance();
                  }}
                >
                  Transferencia
                </button>
                <button onClick={() => handleSetSelectedUser(selectedUser)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </body>
      <footer className='container-footer'></footer>
    </div>
  );
}

export { Account };
