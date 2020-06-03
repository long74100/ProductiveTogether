import React, { MouseEvent } from 'react';
import Spinner from 'react-bootstrap/Spinner'

type Props = {
    loading: boolean,
    text: string,
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    loadingText?: string,
    className?: string,
}

const CustomButton = (props: Props) => (
    <button className={props.className} disabled={props.loading} onClick={props.onClick}>
        {props.loading ?
            <Spinner animation='border' role='status' size='sm'>
                <span className='sr-only'>{props.loadingText ? props.loadingText : 'Loading...'}</span>
            </Spinner> : props.text}
    </button>
);

export default CustomButton;