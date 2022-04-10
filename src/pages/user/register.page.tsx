// Render Prop
import { Button, Container, FormLabel, Heading, Stack } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRef } from 'react';
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

const PageRegister = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslate();
  return (
    <>
      <Heading as="h3" size="lg" variant="center" isTruncated className="page-banner">
        {t('main.slogan')}
      </Heading>
      <Container maxWidth="container.xl" className="dashboard-page">
        <Formik
          initialValues={{ email: 'john1@doe.com', password: '1234567', username: 'srknc', files: [] }}
          validate={(values) => {
            const errors: User | Record<string, string> = {};
            Object.entries(values).map(([, value]) => {
              if (typeof value !== 'object') {
                value = value.trim();
              }
            });
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
              if (inputRef.current?.files?.length) {
                const formData = new FormData();
                formData.append('email', values.email);
                formData.append('password', values.password);
                formData.append('username', values.username);
                for (let i = 0; i < inputRef.current.files.length; i++) {
                  formData.append('file', inputRef.current.files[i]);
                }
                api
                  .post('/user/register', formData)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((error) => {
                    console.log(error);
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }

              /**
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
               */
            }, 200);
          }}
        >
          {({ isSubmitting }) => (
            <>
              {JSON.stringify(isSubmitting)}
              <Container maxW="container.lg" flexDirection="column">
                <Form>
                  <Stack backgroundColor="whiteAlpha.300" padding="24px" borderRadius="3px">
                    <Stack>
                      <FormLabel htmlFor="email" color="white">
                        Email
                      </FormLabel>
                      <Field type="email" name="email" />
                      <ErrorMessage name="email" component="div" />
                    </Stack>
                    <Stack>
                      <FormLabel htmlFor="name" color="white">
                        Password
                      </FormLabel>
                      <Field type="password" name="password" />
                      <ErrorMessage name="password" component="div" />
                    </Stack>
                    <Stack>
                      <FormLabel htmlFor="name" color="white">
                        Username
                      </FormLabel>
                      <Field type="text" name="username" validate={validateUserName} />
                      <ErrorMessage name="username" component="div" />
                    </Stack>
                    <Stack>
                      <FormLabel htmlFor="image" color="white">
                        Files
                      </FormLabel>
                      <Field type="file" name="files" innerRef={inputRef} multiple />
                      <ErrorMessage name="files" component="div" />
                    </Stack>
                    <Button type="submit" disabled={isSubmitting} marginTop="40px!important">
                      Submit
                    </Button>
                  </Stack>
                </Form>
              </Container>
            </>
          )}
        </Formik>
      </Container>
    </>
  );
};

export { PageRegister };
