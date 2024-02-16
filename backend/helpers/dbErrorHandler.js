
/**
 * Get unique error field name
 * 
 * this method to parse the unique constraint-related error object and 
 * construct an appropriate error message.
 */
const getUniqueErrorMessage = (err) => {
    let output
    try {
        // Trying to calculate the unique field name from the error message
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
        // Rebuilds the error message with the unique name
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
    } catch (ex) {
        output = 'Unique field already exists'
    }

    return output
}

/**
 * Get the error message from error object
 * 
 *  this method will parse and return the error message associated with the 
 *  specific validation error or other error that can occur while querying MongoDB using Mongoose
 */
const getErrorMessage = (err) => {
    let message = ''
    console.log("err")
    if (err.code) {
        // this error can be "duplicate key" 
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message
        }
    }

    return message
}

module.exports = {getErrorMessage}