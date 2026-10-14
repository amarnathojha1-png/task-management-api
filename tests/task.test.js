
import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import app from '../src/app.js';

test('Task Management API', async (t) => {
  let taskId;

  await t.test('GET all tasks returns 200', async () => {
    const response = await request(app)
      .get('/api/v1/tasks');

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(Array.isArray(response.body.data));
  });

  await t.test('POST creates a task', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .send({
        title: 'Learn Express',
        description: 'Complete backend assignment',
        status: 'pending',
        priority: 'high'
      });

    assert.equal(response.status, 201);
    assert.equal(response.body.data.title, 'Learn Express');

    taskId = response.body.data.id;

    assert.ok(taskId);
    assert.ok(response.body.data.createdAt);
    assert.ok(response.body.data.updatedAt);
  });

  await t.test('GET task by ID returns the task', async () => {
    const response = await request(app)
      .get(`/api/v1/tasks/${taskId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.data.id, taskId);
  });

  await t.test('PATCH updates a task', async () => {
    const response = await request(app)
      .patch(`/api/v1/tasks/${taskId}`)
      .send({
        status: 'completed'
      });

    assert.equal(response.status, 200);
    assert.equal(response.body.data.status, 'completed');
  });

  await t.test('POST rejects a missing title', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .send({
        description: 'No title provided'
      });

    assert.equal(response.status, 400);
  });

  await t.test('POST rejects an invalid status', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .send({
        title: 'Invalid task',
        status: 'started'
      });

    assert.equal(response.status, 400);
  });

  await t.test('PATCH rejects an empty body', async () => {
    const response = await request(app)
      .patch(`/api/v1/tasks/${taskId}`)
      .send({});

    assert.equal(response.status, 400);
  });

  await t.test('GET rejects an invalid task ID', async () => {
    const response = await request(app)
      .get('/api/v1/tasks/abc');

    assert.equal(response.status, 400);
  });

  await t.test('GET returns 404 for a missing task', async () => {
    const response = await request(app)
      .get('/api/v1/tasks/999999');

    assert.equal(response.status, 404);
  });

  await t.test('Unknown endpoint returns 404', async () => {
    const response = await request(app)
      .get('/api/v1/unknown');

    assert.equal(response.status, 404);
  });

  await t.test('Malformed JSON returns 400', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Content-Type', 'application/json')
      .send('{"title":');

    assert.equal(response.status, 400);
    assert.equal(
      response.body.error.message,
      'Malformed JSON request body'
    );
  });

  await t.test('DELETE removes the task', async () => {
    const response = await request(app)
      .delete(`/api/v1/tasks/${taskId}`);

    assert.equal(response.status, 204);
    assert.equal(response.text, '');
  });

  await t.test('Deleted task returns 404', async () => {
    const response = await request(app)
      .get(`/api/v1/tasks/${taskId}`);

    assert.equal(response.status, 404);
  });
});
