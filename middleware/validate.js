// const validator = require('../helpers/validate');

// const saveContact = (req, res, next) => {
//     const validationRule = {
//       firstName: "required|string",
//       lastName: "required|string",
//       birthDate: "required|string",
//       homeAddress: "required|string",
//       contactInformation: "required|string",
//       email: "required|string",
//       studentID: "required|string",
//       enrollmentStatus: "required|string",
//       academicProgram: "required|string"
//     };
//     validator(req.body, validationRule, {}, (err, status) => {
//         console.log(req.body);
//         if (!status) {
//             res.status(412).send({
//                 success: false,
//                 message: 'Validation failed',
//                 data: err
//             });
//         } else {
//             next();
//         }
//     });
// };

// module.exports = {
//     saveContact
// };