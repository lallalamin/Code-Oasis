import {atom} from 'recoil';

const repliesAtom = atom({
    key: 'repliesAtom',
    default: [],
});

export default repliesAtom