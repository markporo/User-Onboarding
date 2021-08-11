import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required("Please Enter Your Name."),
    email: yup.string().email().required("Please Enter Your Email."),
    password: yup.string().required("Passwords must be at least 8 characters and contain a special character."),
    terms: yup.boolean(true).required('You must accept the terms to continue.'),
})

export default schema;