const express = require('express');
const { createIdeas, likeIdeas, dislikeIdeas, commentIdeas, listCommentIdeas, listIdeas,
    viewDetailIdeas, downloadIdeas, deleteCommentIdeas,  filter,
     myIdeas, 
     downloadZip} = require('../controllers/ideas.controller');
const { checkClosureDate } = require('../middlerwares/checkClosureDate.middleware');
const { checkLike, checkDislike } = require('../middlerwares/checkLike.middleware');
const { checkView } = require('../middlerwares/checkView.middleware');
const { verifyToken, isQA } = require('../middlerwares/jwt.middleware');
const { upload } = require('../utils/uploadFile')

const router = express.Router();

router.post('/upload-ideas', [verifyToken, upload.single('ideasFile')], createIdeas)
router.post('/like-ideas/:ideasID', [verifyToken, checkLike], likeIdeas)
router.post('/dislike-ideas/:ideasID', [verifyToken, checkDislike], dislikeIdeas)
router.post('/comment-ideas/:ideasID', [verifyToken, checkClosureDate], commentIdeas)
//router.post('/delete-comment/:commnetID', deleteCommentIdeas)

//router.get('/list-comment-ideas/:ideasID', [verifyToken], listCommentIdeas)
router.get('/list-ideas', [verifyToken], listIdeas)
router.get('/list-my-ideas', [verifyToken], myIdeas)

router.get('/view-detail-ideas/:ideasID', [verifyToken, checkView], viewDetailIdeas)

router.get('/download-ideas', [verifyToken, isQA], downloadIdeas)
router.get('/download-zip',[verifyToken, isQA], downloadZip)

//filter
router.get('/filter', [verifyToken], filter)


module.exports = router
