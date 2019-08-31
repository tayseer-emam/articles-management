import { uuid } from '@/services/Utilities';

const users = JSON.parse(localStorage.getItem('am_users')) || [];

export default {
  register(accountInfo) {
    return new Promise((resolve, reject) =>{
      const newUser = { id: uuid(), ...accountInfo };
      const isEmailTaken = !!users.filter(user => user.email === accountInfo.email).length;
      if(isEmailTaken) {
        reject({ message: 'Email already exist' });
      } else {
        users.push(newUser);
        localStorage.setItem('am_users', JSON.stringify(users));
        resolve(newUser);
      }
    });
  },
  login({email, password}) {
    return new Promise((resolve, reject) =>{
      const isUserExist = users.filter(user => user.email === email && user.password === password);
      if(!isUserExist.length) {
        reject({ message: 'Email or password not correct' });
      } else {
        resolve(isUserExist[0]);
      }
    });
  }
}