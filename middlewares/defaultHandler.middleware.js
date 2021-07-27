const defaultRouteHandler = (req,res,next)=>{
  res.status(404).json({success:false, message:"The Requested route is not there, please verify it again"})
}

const defaultErrorHandler = (err, req, res, next)=>{
  console.log(err.stack) // log a console at scale
  res.status(500).json({success:false, message:err.message})
}

const pagination = (model) => {
  return (req,res,next) => {
    next()
  }
}

module.exports = { defaultRouteHandler, defaultErrorHandler, pagination}