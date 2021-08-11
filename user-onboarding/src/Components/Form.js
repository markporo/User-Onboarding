import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Input = styled.input`
  text-align: center;
  margin: 15px auto;
`;

const Label = styled.label`
padding: 10px;
`

export default function Form({ formValues, onChange, onSubmit, disabled }) {


    return (<div>
        <StyledForm onSubmit={onSubmit}>
            <Label>Name:
                <Input
                    value={formValues.name}
                    onChange={onChange}
                    name='name'
                    type='text'
                />
            </Label>

            <Label>Email
                <Input
                    value={formValues.email}
                    onChange={onChange}
                    name='email'
                    type='email'
                />
            </Label>
            <Label>Password:
                <Input
                    value={formValues.password}
                    onChange={onChange}
                    name='password'
                    type='password'
                />
            </Label>
            <Label>Terms of Service:
                <Input
                    type='checkbox'
                    name='terms'
                    onChange={onChange}
                    checked={formValues.terms}
                />
            </Label>
            <button disabled={disabled}>Submit</button>
        </StyledForm>
    </div>)
}