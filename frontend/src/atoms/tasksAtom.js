import { atom } from 'recoil';

const tasksAtom = atom({
    key: 'tasksAtom',
    default: [],
});

export default tasksAtom