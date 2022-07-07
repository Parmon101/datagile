import React from 'react';
import { connect } from 'react-redux';
import styles from './counter.module.css';

import { decrement, increment, removeCounter } from '../../redux/counterSlice';
import { useAppDispatch } from '../../redux/hooks';

type CounterType = {
    id: number;
    value: number;
    index: number;
};

export const Counter: React.FC<CounterType> = ({ id, value, index }) => {
    const dispatch = useAppDispatch();

    const onClickIncrement = () => {
        dispatch(increment({ id } as CounterType));
    };
    const onClickDecrement = () => {
        dispatch(decrement({ id } as CounterType));
    };

    const onClickRemoveCounter = () => {
        dispatch(removeCounter({ id } as CounterType));
    };

    const isFour = (index + 1) % 4 !== 0;

    React.useEffect(() => {
        if (!isFour) {
            const interval = setInterval(() => onClickIncrement(), 1000);

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.split}>
                {isFour ? (
                    <button className={styles.btn} onClick={onClickIncrement}>
                        +
                    </button>
                ) : null}
                <h2>{value}</h2>
                {isFour ? (
                    <button className={styles.btn} onClick={onClickDecrement}>
                        -
                    </button>
                ) : null}
            </div>
            <button className={styles.btnRemove} onClick={onClickRemoveCounter}>
                remove counter
            </button>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        count: state.count,
    };
};

export default connect(mapStateToProps)(Counter);
