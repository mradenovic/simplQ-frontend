// Get metadata for all queues creaetd by the current user
export const getUserQueues = () => ({ method: 'get', url: '/queues' });

// Create a new queue
export const create = (queueName) => ({ method: 'post', url: '/queue', data: { queueName } });

// Get a queue by id. Returns all active tokens in the queue
export const get = (queueId) => ({ method: 'get', url: `/queue/${queueId}` });

/**
 *
 * @param {string} queueId
 * @returns {Object} request - partial axios request without baseURL
 */
export const getQueueStatus = (queueId) => ({
  method: 'get',
  url: `/queue/status?queueId=${queueId}`,
});

/**
 * Request creator to fetch queue status by name
 *
 * @param {string} queueName
 * @returns {Object} request - partial axios request without baseURL
 */
export const getQueueStatusByName = (queueName) => ({
  method: 'get',
  url: `/queue/status?queueName=${queueName}`,
});

// Delete a queue by ID
export const deleteQueue = (queueId) => ({ method: 'delete', url: `/queue/${queueId}` });
