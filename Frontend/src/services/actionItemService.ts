
import { axiosClient as axios } from './axiosClient';
import { ActionItem } from '../models/Goal';

export const putActionItem = (actionItem: ActionItem) =>
    axios.put(`/actionItems/${actionItem.id}`, {
        ...actionItem
    }).then(res => actionItem);

export const postActionItem = (actionItem: Partial<ActionItem>) => 
    axios.post('/actionItems', actionItem).then(res => res.data);