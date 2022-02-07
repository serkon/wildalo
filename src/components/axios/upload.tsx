/*
const [progress, setProgress] = useState(0);

//Logic to show upload progress

const config = {
  'onUploadProgress': (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    setProgress(percentCompleted);
  },
};

const data = {};

try {
  const updatedData = axios.put('/upload/server', data, config);
  return updatedData.response.data;
} catch (error) {
  console.log(error);
}
*/
export default {};
