import { merMerAdminConfig } from "../../constants/config"
export async function imageUploadHandler(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('imageName', image.name)
  formData.append('imageSavedUrl', merMerAdminConfig.kmImageStoreInPublicUrl)
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  try {
    const json = await response.json();
    return json.url;
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
}

