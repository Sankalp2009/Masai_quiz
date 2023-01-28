const Quiz = require('.././Model/QuizModel')
class APIFeatures
{
    constructor(query,queryString)
    {
        this.query = query;
        this.queryString = queryString;
    }
    search()
    {
        const keyword = this.queryString.keyword ? {
            name : {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword})
        return this    
    }
    filter()
    {
        const queryObject = {...this.queryString};

        //Remove fields from the query
        const RemoveFields = ['page', 'sort', 'limit', 'keyword'];
        RemoveFields.forEach(el => delete queryObject[el]);
        
        //Advance Filter
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace('/\b(gte|gt|lte|lt|\b/g)', match => `$${match}`);


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    paginate()
    {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page-1)*limit;
        this.query  = this.query.skip(skip).limit(limit);
        return this;
    }
}
exports.GetQuiz= async (req, res) => 
{
    try {
        
        const features = new APIFeatures(Quiz.find(),req.query)
        .search()
        .filter()
        .paginate()
            console.log(features);
        const GetQuizData = await features.query;
    return res.status(202).json({
        status: 'Success',
        data: {
            result : GetQuizData
        }
    });
}    
    catch (error) 
    {
        return res.status(404).json({
            status: 'Error',
            message: 'Invalid Quiz'
        })  
    } 
  }