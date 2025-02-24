import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUserAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  name: yup.string().required('Required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  confirmpassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  dateOfBirth: yup.date().required('Required'),
  phoneNumber: yup.string().required('Required')
});

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmpassword: '',
      name: '',
      phoneNumber: '',
      dateOfBirth: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          navigate('/login');
          alert('Registration successful! Please check your email to confirm your account.');
        } else {
          const errorData = await response.json();
          // Ensure errorData.detail is handled as a string or array of strings
          if (errorData.detail) {
            if (typeof errorData.detail === 'string') {
              setErrors({ submit: errorData.detail });
            } else if (Array.isArray(errorData.detail)) {
              setErrors({ submit: errorData.detail.map(err => err.msg).join(', ') });
            } else {
              setErrors({ submit: 'Registration failed!' });
            }
          } else {
            setErrors({ submit: 'Registration failed!' });
          }
        }
      } catch (error) {
        setErrors({ submit: 'An error occurred. Please try again later.' });
      }
      setSubmitting(false);
    }
  });

  return (
    <div className="register-background">
      <Container className="register-container">
        <div className="bg-white p-3 rounded w-100">
          <h2>Sign-Up</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formEmail">
              <InputGroup>
                <InputGroup.Text className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                  className="form-control"
                />
              </InputGroup>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formName">
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faUserAlt} /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  {...formik.getFieldProps('name')}
                  className="form-control"
                />
              </InputGroup>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  {...formik.getFieldProps('dateOfBirth')}
                  className="form-control"
                />
              </InputGroup>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="text-danger">{formik.errors.dateOfBirth}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps('password')}
                  className="form-control"
                />
              </InputGroup>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <InputGroup>
                <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  {...formik.getFieldProps('confirmpassword')}
                  className="form-control"
                />
              </InputGroup>
              {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                <div className="text-danger">{formik.errors.confirmpassword}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <PhoneInput
                placeholder="Enter phone number"
                value={formik.values.phoneNumber}
                onChange={value => formik.setFieldValue('phoneNumber', value)}
                className="form-control PhoneInputInput"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-danger">{formik.errors.phoneNumber}</div>
              ) : null}
            </Form.Group>
            {formik.errors.submit && (
              <div className="text-danger">{formik.errors.submit}</div>
            )}
            <Button variant="success" type="submit" className="w-100 rounded-0" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Signing up...' : 'Sign up'}
            </Button>
            <div className="signin-link">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Register;
