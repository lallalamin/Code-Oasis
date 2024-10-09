import { atom } from 'recoil';

const authScreenAtom = atom({
    key: 'authScreenAtom',
    default: "login", //by default we want to show the login page
});

export default authScreenAtom;

