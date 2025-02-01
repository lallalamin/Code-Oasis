import { atom } from 'recoil';

const tasksAtom = atom({
    key: 'postsAtom',
    default: [],
});

export default tasksAtom