import { atom } from 'recoil';

const userEventsAtom = atom({
    key: 'userEventsAtom',
    default: [],
});

export default userEventsAtom