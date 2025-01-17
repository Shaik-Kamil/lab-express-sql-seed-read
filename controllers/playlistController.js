const express = require('express');
const playlists = express.Router();
const {
  getAllPlaylists,
  getPlaylist,
  makePlaylist,
  deletePlaylist,
  updatePlaylist,
} = require('../queries/playlist');
const songController = require('./songController');

//! middleware
playlists.use('/:playlistId/songs', songController);

//! Index page

playlists.get('/', async (req, res) => {
  try {
    const allPlaylists = await getAllPlaylists();
    res.status(200).json(allPlaylists);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//! Show

playlists.get('/:id', async (req, res) => {
  const { id } = req.params;
  const onePlaylist = await getPlaylist(id);
  if (!onePlaylist.message) res.status(200).json(onePlaylist);
  else res.status(404).json({ error: 'Not Found' });
});

//! Create
playlists.post('/', async (req, res) => {
  try {
    const playlist = await makePlaylist(req.body);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//! Delete

playlists.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlaylist = await deletePlaylist(id);
    res.status(200).json(deletedPlaylist);
  } catch (error) {
    res.status(404).json({ error: 'Id not found' });
  }
});

//! update playlist

playlists.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlaylist = await updatePlaylist(id, req.body);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(404).json({ error: 'playlist not found!' });
  }
});

module.exports = playlists;
