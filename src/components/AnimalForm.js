import React from 'react'
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup'; // Yup is for validation. 

const AnimalForm = (values, touched) => { // Touched 
  console.log(values);
  return (
    <Form>
    {values.touched.species && values.errors.species && <p>{values.errors.species}</p>}
      <Field type="text" name="species" placeholder="Species" />

    {values.errors.age && <p>{values.errors.age}</p>}
      <Field type="number" name="age" placeholder="age" />

    {values.errors.diet && <p>{values.errors.diet}</p>}  
      <Field component='select' name='diet'>
        <option value='' disabled>Select Diet</option>
        <option value='omnivore'>Omnivore</option>
        <option value='Herbivore'>Herbivore</option>
      </Field>
      
    {values.errors.vacinations && <p>{values.errors.vacinations}</p>}
      <label>
        <Field type='checkbox' name='vacinations' />
        <span>vacinations</span>
      </label>

      <Field component='textarea' name='notes' placeholder='notes' />
      <button type="submit">Submit</button>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: (values) => { // values object is being passed in from Formik. Can use any word we want. 
    // this makes the inputs 'controlled'
    return {
      // These keys line up with the 'name' attribute on our Fields.
      species: values.species || '',// This is placeholder text after ||. AKA, default value.
      age: values.age || '', 
      diet: values.diet || '',
      vacinations: values.vacinations || false
    }
  },
  // Yup validation, check the yup docs for more information. 
  validationSchema: yup.object().shape({
    species: yup.string().required('Species is required!'),
    age: yup.number().positive().required('Age is required!'),
    diet: yup.string().required('Diet is required!'),
    vacinations: yup.boolean().required('vacinations are required!') // Strings are custom error messages. Yup does have a default error message. 
  }),
  handleSumbit: (values) => {
    console.log(values)
  }
})(AnimalForm)
