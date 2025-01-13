import {atom} from 'recoil';

export const conversationsAtom = atom({
    key: 'conversationsAtom',
    default: [],
});

export const selectedConversationAtom = atom({
    key: 'selectedConversationAtom',
    default: {
        id: "",
        userId: "",
        userName: "",
        userProfilePic: "",
    }
});

export default conversationsAtom