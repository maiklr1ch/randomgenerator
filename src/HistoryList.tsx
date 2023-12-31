import {HistoryRecord} from "./App.tsx";

interface HistoryListProps {
    data: HistoryRecord[],
    total: number
}

const HistoryList = ({ data, total }: HistoryListProps) => {
    const listContent = data.length
        ?
        <>
            <h3>history:</h3>
            <ol>
                {data.map((value, index) => {
                    if(typeof value.current === 'number')
                        return <li key={Math.random()}>
                            {index + 1 == data.length ? <b>{value.current}</b> : value.current}
                            <b> | total: {value.total}</b>
                        </li>
                    else
                        return <li key={Math.random()}>
                            {index + 1 == data.length ? <b>{value.current.join(' ')}</b> : value.current.join(' ')}
                            <b> | total: {value.total}</b>
                        </li>
                })}
            </ol>
            <b className="total-count">total count is {total}</b>
        </>
        : <h3>no history</h3>;

    return (
        <div className="history-list">
            {listContent}
        </div>
    );
};

export default HistoryList;