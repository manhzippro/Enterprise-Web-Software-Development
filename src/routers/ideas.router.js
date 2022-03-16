const express = require('express');
const { createIdeas, likeIdeas, dislikeIdeas, commentIdeas, listCommentIdeas, listIdeas, viewSubmitIdeas, downloadIdeas, deleteCommentIdeas } = require('../controllers/ideas.controller');
const { checkLike, checkDislike } = require('../middlerwares/checkLike.middleware');
const { verifyToken, isQA } = require('../middlerwares/jwt.middleware');
const { upload } = require('../utils/uploadFile')

const router = express.Router();

router.post('/upload-ideas',[verifyToken,upload.single('ideasFile')] ,createIdeas)
router.post('/like-ideas/:ideasID',[verifyToken,checkLike], likeIdeas)
router.post('/dislike-ideas/:ideasID',[verifyToken,checkDislike], dislikeIdeas)
router.post('/comment-ideas/:ideasID',[verifyToken], commentIdeas)
router.post('/delete-comment/:commnetID', deleteCommentIdeas)

router.get('/list-comment-ideas/:ideasID',[verifyToken], listCommentIdeas)
router.get('/list-ideas/:page',[verifyToken], listIdeas) 

router.get('/view-submit-ideas/:ideasID', [verifyToken], viewSubmitIdeas) 

router.get('/download-ideas',[verifyToken, isQA], downloadIdeas) 

module.exports = router
