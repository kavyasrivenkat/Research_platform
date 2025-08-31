const express = require('express');
const Group = require('../models/Group');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create group
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    
    const group = new Group({
      name,
      description,
      isPrivate,
      owner: req.user._id,
      members: [req.user._id]
    });
    
    await group.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { groups: group._id } });
    
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's groups
router.get('/my-groups', auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id })
      .populate('owner', 'name email')
      .populate('members', 'name email');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get public groups
router.get('/public', auth, async (req, res) => {
  try {
    const groups = await Group.find({ isPrivate: false })
      .populate('owner', 'name email')
      .populate('members', 'name email');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Join group
router.post('/:id/join', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    if (group.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already a member' });
    }
    
    group.members.push(req.user._id);
    await group.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { groups: group._id } });
    
    res.json({ message: 'Joined group successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Leave group
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    if (group.owner.equals(req.user._id)) {
      return res.status(400).json({ message: 'Owner cannot leave group' });
    }
    
    group.members = group.members.filter(member => !member.equals(req.user._id));
    await group.save();
    await User.findByIdAndUpdate(req.user._id, { $pull: { groups: group._id } });
    
    res.json({ message: 'Left group successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;