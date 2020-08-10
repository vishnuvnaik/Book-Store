module.exports = {
    staticHTTPErrorMessages: {
        INTERNAL_SERVER_ERROR: {
            errorCategory: 'INTERNAL SERVER ERROR',
            errorResponseCode: 500,
            errorResponseMessage: 'Unexpected internal server error.',
        },
        MULTIPLE_CHOICES: {
            errorCategory: 'MULTIPLE CHOICES',
            errorResponseCode: 300,
            errorResponseMessage: 'The requested resource corresponds to any one of a set of representations, each with its own specific location.',
        },
        MOVED_PERMANENTLY: {
            errorCategory: 'MOVED PERMANENTLY',
            errorResponseCode: 301,
            errorResponseMessage: 'The resource has moved permanently. Please refer to the documentation.',
        },
        NOT_MODIFIED: {
            errorCategory: 'NOT MODIFIED',
            errorResponseCode: 304,
            errorResponseMessage: 'The resource is available and not modified.',
        },
        UNAUTHORIZED: {
            errorCategory: 'UNAUTHORIZED',
            errorResponseCode: 401,
            errorResponseMessage: 'You are unauthorized to access the requested resource. Please log in.',
        },
        BAD_REQUEST: {
            errorCategory: 'BAD REQUEST',
            errorResponseCode: 400,
            errorResponseMessage: 'Invalid syntax for this request was provided.',
        },
        FORBIDDEN: {
            errorCategory: 'FORBIDDEN',
            errorResponseCode: 403,
            errorResponseMessage: 'Your account is not authorized to access the requested resource.',
        },
        NOT_FOUND: {
            errorCategory: 'NOT FOUND',
            errorResponseCode: 404,
            errorResponseMessage: 'We could not find the resource you requested. Please refer to the documentation for the list of resources.',
        },
        CONFLICT: {
            errorCategory: 'CONFLICT',
            errorResponseCode: 409,
            errorResponseMessage: 'The request could not be completed due to a conflict with the current state of the resource.',
        },
        UNPROCESSABLE_ENTITY: {
            errorCategory: 'CONFLICT',
            errorResponseCode: 422,
            errorResponseMessage: 'The request is unable to process.',
        }
    },
    staticHTTPSuccessMessages: {
        OK: {
            successCategory: 'OK',
            successResponseCode: 200,
            successResponseMessage: 'The request has succeeded.',
        },
        CREATED: {
            successCategory: 'CREATED',
            successResponseCode: 201,
            successResponseMessage: 'The request has been fulfilled and resulted in a new resource being created.',
        }
    }

}