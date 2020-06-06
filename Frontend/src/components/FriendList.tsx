import React from 'react';

const FriendList = () => {
    const friends = ['friend1', 'friend2', 'friend3', 'friend4'];
    return (
        <div className='friend-list'>
            <ol>
                {friends.map(f =>
                    <li>
                        {f}
                    </li>
                )}
            </ol>
        </div>
    )
}

export default FriendList;