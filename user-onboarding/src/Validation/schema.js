import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string("Please Enter Your Name.").required(),
    email: yup.string("Please Enter Your Email.").email().required(),
    password: yup.string().min(8).required(),
    terms: yup.boolean().required(),
})

export default schema;