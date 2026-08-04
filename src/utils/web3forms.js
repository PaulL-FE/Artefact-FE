const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Submits form data to Web3Forms, which emails the submission to whatever
// address the access key is registered to. No backend of our own involved.
//
// Uses FormData (not a JSON body) on purpose: browsers send it as
// multipart/form-data, one of the CORS "safelisted" content types, so no
// preflight OPTIONS request is made. A JSON body forces a preflight, which
// Web3Forms doesn't answer with the right CORS headers for this key/origin.
export const submitToWeb3Forms = async (payload) => {
  const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('Missing REACT_APP_WEB3FORMS_ACCESS_KEY environment variable');
  }

  const formData = new FormData();
  formData.append('access_key', accessKey);
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Web3Forms submission failed');
  }

  return data;
};
