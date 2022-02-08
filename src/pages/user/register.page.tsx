// Render Prop
import { Container, FormLabel, Heading } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { api } from 'src/components/axios/axios.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { User } from './user.dto';

const validateUserName = (value: string) => {
  let error;
  if (!value) {
    error = 'Name is required';
  } else if (value.length < 3) {
    error = '😱 Your name is too short!';
  }
  return error;
};

const RegisterPage = () => {
  const { t } = useTranslate();
  return (
    <>
      <Heading as="h3" size="lg" variant="center" isTruncated className="page-banner">
        {t('main.slogan')}
      </Heading>
      <Container maxWidth="container.xl" className="dashboard-page">
        <Formik
          initialValues={{ 'email': '', 'password': '', 'username': '' }}
          validate={(values) => {
            const errors: User | Record<string, string> = {};
            Object.entries(values).map(([, value]) => (value = value.trim()));
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              api
                .post('/register', values)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }, 200);
          }}>
          {({ isSubmitting }) => (
            <>
              {JSON.stringify(isSubmitting)}
              <Form>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <FormLabel htmlFor="name">Password</FormLabel>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <FormLabel htmlFor="name">Username</FormLabel>
                <Field type="text" name="username" validate={validateUserName} />
                <ErrorMessage name="username" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            </>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default RegisterPage;
