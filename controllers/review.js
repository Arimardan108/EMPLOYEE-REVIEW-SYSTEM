const User = require('../models/user');
const AssignedReview = require('../models/assignedReview');
const MyReview = require('../models/myReviews')

module.exports.home= async function(req,res)
{
    try {

        let users =await User.find({});
        res.render('./assignwork',{
            users:users
        }
        )
        
    } catch (error) {
        console.log('Error', error);
    }
}

module.exports.createReview= async function(req,res)
{
    try {

        let review = await AssignedReview.findOne({ fromUser: req.body.reviewer,toUser: req.body.recipient});

        if (review) {
            req.flash('success', 'Review Already Assigned for same Recipient and Reviewer');
            return res.redirect('back');
        }

        review=await AssignedReview.create({
            fromUser: req.body.reviewer,
            toUser: req.body.recipient
        })

        let user = await User.findById(req.body.reviewer);
        
        user.assignedReviews.push(review);
        user.save();



        req.flash('success', 'Review Assigned Successfully');
            return res.redirect('back');

        
    } catch (error) {
        console.log('Error', error);
    }
}