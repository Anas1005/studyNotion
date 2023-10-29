const express=require('express');
const router=express.Router();
const multer = require('multer');



const storage = multer.memoryStorage(); // Use memory storage to handle files in memory
const upload = multer({ storage: storage });


const{createCourse,updateCourse,deleteCourse,deRegisterCourse,updatee,updateCourseProgress,getAllCourses,getCourseDetails,getCourseProgress,getThumbnailURL,publishCourse}=require('../controllers/courseController');
const{createCategory,getAllCategories,getCategoryPageDetails}=require('../controllers/categoryController');
const{createRatingAndReview,getAverageRating,getAllRatingsAndReviews}=require('../controllers/ratingAndReviewController')
const {isValidToken,renewToken,isAdmin,isInstructor,isStudent}= require('../middlewares/auth')
const{createSection,updateSection,deleteSection}=require('../controllers/sectionController');
const{createSubSection,deleteMOVVideos}=require('../controllers/subSectionController');

  



router.get('/getAllCategories', getAllCategories);
router.post('/getCategoryPageDetails',getCategoryPageDetails);
router.post('/getCourseDetails',getCourseDetails);
router.put('/updatee',updatee)

router.use(isValidToken); // Validates token for all routes
router.use(renewToken);   // Renews token if close to expiration

// Now define your routes without directly mentioning renewToken middleware
router.post('/createCourse',isInstructor,createCourse);
router.post('/updateCourse',isInstructor,updateCourse);
router.post('/deleteCourse',isInstructor,deleteCourse);
router.post('/deRegisterCourse',isStudent,deRegisterCourse);
// router.post('/createCourseProgress',isStudent,createCourseProgress);
router.post('/getCourseProgress',isStudent,getCourseProgress);
router.post('/updateCourseProgress',isStudent,updateCourseProgress);
router.post('/getThumbnailURL',isInstructor,getThumbnailURL);
router.get('/getAllCourses', getAllCourses);

router.post('/createCategory', isAdmin,createCategory);


router.post('/createSection', isInstructor,createSection);
router.post('/updateSection', isInstructor,updateSection);
router.post('/deleteSection', isInstructor,deleteSection);

router.post('/createSubSection', isInstructor,createSubSection);
router.post('/delete', isInstructor,deleteMOVVideos);

router.post('/publishCourse',isInstructor,publishCourse);

router.post('/createRatingAndReview',isStudent,createRatingAndReview);
router.post('/getAverageRating', getAverageRating);
router.get('/getAllRatingsAndReviews',getAllRatingsAndReviews)

module.exports = router;


