import React from 'react';
import { Counter } from '../components/Counter';
import styles from './home.module.css';

import { addCounter } from '../redux/counterSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export const Home = () => {
    const dispatch = useAppDispatch();
    const onClickAddCounter = () => {
        dispatch(addCounter());
    };

    const counters = useAppSelector((state) => state.counter.counters);

    return (
        <>
            <button className={styles.btn} onClick={onClickAddCounter}>
                add counter
            </button>
            <div className={styles.blocks}>
                {counters.map((counter, index) => {
                    return <Counter key={counter.id} {...counter} index={index} />;
                })}
            </div>
        </>
    );
};
