import { Formik, Form } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';

const SingleFileUploadMutation = gql`
  mutation singleUpload($file: Upload!, $files: [Upload!]!) {
    singleUpload(file: $file, files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;

const FileUploadDemo = () => {
  const [singeFileUploadMutation, { data, error }] = useMutation(SingleFileUploadMutation);

  return (
    <div>
      <h1>File Upload w/ formik and graphql</h1>
      <Formik
        initialValues={{
          file: null,
          files: null,
        }}
        onSubmit={async (values) => {
          // console.log(values.file);
          await singeFileUploadMutation({
            variables: {
              file: values.file,
              files: values.files,
            },
          });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <input
              id="fileSample"
              name="fileSample"
              required
              type="file"
              onChange={({
                target: {
                  validity,
                  files: [file],
                },
              }) => {
                // console.log(file);
                setFieldValue('file', file);
              }}
            />
            <input
              id="fileSample1"
              name="fileSample1"
              required
              multiple
              type="file"
              onChange={({ target: { validity, files } }) => {
                // console.log(file);
                setFieldValue('files', files);
              }}
            />
            <button type="submit">Submit</button>
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </Form>
        )}
      </Formik>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <pre>{JSON.stringify(error, null, 4)}</pre>

      <Typography variant="h6" gutterBottom>
        Affected files
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        1. apollo/client - URL
      </Typography>
    </div>
  );
};

export default FileUploadDemo;
