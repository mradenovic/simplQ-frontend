import React, { useEffect, useCallback } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router';
import { useFetchQueues, useDeleteQueue, selectQueues } from 'store/queues';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.scss';

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const queues = useSelector(selectQueues);
  const fetchQueues = useCallback(useFetchQueues(), []);
  const deleteQueue = useDeleteQueue();

  useEffect(() => {
    dispatch(fetchQueues());
  }, [dispatch, fetchQueues]);

  const handleDelete = (e, queue) => {
    // Don't trigger parent's onClick
    e.stopPropagation();

    dispatch(deleteQueue({ queueId: queue.queueId }))
      // waht is the next line?
      .then(() => history.push('/'));
  };

  return (
    <div className={styles['my-queue']}>
      <p>
        {queues.length === 0
          ? "Looks like you don't have any active queues. Start by creating one..."
          : 'What would you like to do today? Here are your active queues:'}
      </p>
      {queues.map((queue) => {
        const handler = () => history.push(`/queue/${queue.queueId}`);
        return (
          <div
            key={queue.queueId}
            tabIndex="0"
            role="button"
            onKeyDown={handler}
            onClick={handler}
            className={styles['my-queue-item']}
          >
            <div>{queue.queueName}</div>
            <IconButton onClick={(e) => handleDelete(e, queue)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      })}
    </div>
  );
};
