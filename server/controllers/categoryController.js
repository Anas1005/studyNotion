const Course=require('../models/courseModel');
const Category=require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required.."
            });
        }

        const categoryDetails = await Category.create({ name, description });
        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: "Category created Successfully...."
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: "Error in Creating Category.."
        });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        console.log("Aya Ctaegory fetch kene")
        const allCategories = await Category.find({}, { name: true, description: true });
        console.log("Ho Gya Ctaegore fetch kene")
        return res.status(200).json({
            success: true,
            message: "All Categories fetched Successfully....",
            allCategories:allCategories
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: "Error in fetching Categories.."
        });
    }
}

exports.getCategoryPageDetails=async(req,res)=>{
    console.log("ayay jia yuayayayyayay")
    console.log(req.body);
    console.log("ayay jia yuayayayyayay")
    try{
        const{categoryID}=req.body;
        

        const selectedCategory = await Category.findById({ _id: categoryID })
        .populate({
          path: 'courses',
          match: { status: 'Published' },
          populate: [
            {
              path: 'ratingsAndReviews',
            },
            {
              path: 'instructor',
              select: 'firstName lastName image', // Specify the field(s) you want to retrieve
            },
          ],
        })
        .exec();
      

        if(!selectedCategory){
            return res.status(400).json({
                success: false,
                message: "Data Not Found...."
            });
        }


        // const differentCategories=await Category.find({
        //     _id:{$ne:categoryID}
        // }).populate({
        //     path: 'courses',
        //     match: { status: 'Published' },
        //     populate: [
        //       {
        //         path: 'ratingsAndReviews',
        //       },
        //       {
        //         path: 'instructor',
        //         select: 'firstName lastName', // Specify the field(s) you want to retrieve
        //       },
        //     ],
        //   })
        //   .exec();

        const differentCategories = await Course.find({category:{$ne:categoryID}})
        .populate({
          path: 'ratingsAndReviews',
        })
        .populate({
          path: 'instructor',
          select: 'firstName lastName image', // Specify the fields you want to retrieve
        })
        .populate({
            path:'category',
            select:'name'

        })
        .exec();
        


        //Find the top selling Courses...
        const topSellingCourses = await Course.find({})
        .sort({ 'studentsEnrolled.length': -1 }) // Sort by the length of studentsEnrolled in descending order
        .limit(10)
        .populate({
          path: 'ratingsAndReviews',
        })
        .populate({
          path: 'instructor',
          select: 'firstName lastName image', // Specify the fields you want to retrieve
        })
        .populate({
            path:'category',
            select:'name'

        })
        .exec();
      
        res.status(200).json({
            success: true,
            subLinks:{
            selectedCategory,
            differentCategories,
            topSellingCourses,
            },
            message: "Catalog Page details Fecthed SucessFully....",
        });

    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error while fetching data.",
        });
    }
};