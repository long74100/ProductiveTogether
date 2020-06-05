
import { axiosClient as axios } from './axiosClient';
import { ActionItem, ActionItemStatus } from '../models/Goal';

export const putActionItem = (actionItem: ActionItem) =>
    axios.put(`/actionItems/${actionItem.id}`, {
        ...actionItem
    }).then(res => actionItem);