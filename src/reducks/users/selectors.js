import { createSelector } from 'reselect';

// useSelectorにより現在のstateの情報が引数として渡される
const usersSelector = (state) => state.users;

// 現在のstateのuidを返す　stateが変更された時実行される
export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)
