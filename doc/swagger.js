export default {
  swagger: '2.0',
  info: {
    title: 'WAY_FARER API DOCS',
    version: 'v1.0',
    description: 'Documentation for Way_farer API'
  },
  host: 'localhost:3000',
  basePath: '',
  schemes: ['http', 'https'],
  produces: ['application/json'],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Signup'],
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        summary: 'This route enable\'s users to create new account',
        responses: {
          200: {
            description: 'OK'
          },
          400: {
            description: 'Bad request'
          },
          500: {
            description: 'Server error'
          }
        },
        content: {
          'application/json': {}
        },
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'Specifies details of a user',
            schema: { $ref: '#/definitions/UserSignUp' },
            type: 'object'
          }
        ]
      }
    }
  },
  definitions: {
    UserSignUp: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
          required: true
        },
        last_name: {
          type: 'string',
          required: true
        },
        email: {
          type: 'string',
          required: true
        },
        password: {
          type: 'string',
          required: true
        },
        address: {
          type: 'string',
        },
        sex: {
          type: 'string',
          enum: [
            'male',
            'female'
          ]
        },
        phone_number: {
          type: 'string'
        },
        is_admin: {
          type: 'boolean'
        }
      },
      json: {
        name: 'UserSignUp'
      }
    }
  }
};
