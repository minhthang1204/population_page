import React, { useState } from 'react';
import { Button, Input, VStack, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { uploadFile, UploadResponse } from '../../../utils/uploadFile';

export default function UploadFile() {
  const [fileName, setFileName] = useState<string>('');

  const mutation = useMutation<UploadResponse, Error, File>({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log('Upload thành công:', data);
      alert('Upload thành công!');
    },
    onError: (error) => {
      console.error('Lỗi khi upload file:', error.message);
      alert('Upload thất bại!');
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      mutation.mutate(file);
    }
  };

  return (
    <VStack spacing={4} align="center" p={5}>
      <Button as="label" htmlFor="file-upload" colorScheme="teal" size="md" isLoading={mutation.isLoading}>
        {mutation?.isLoading ? 'Uploading...' : 'Upload File'}
      </Button>
      <Input
        id="file-upload"
        type="file"
        display="none"
        onChange={handleFileChange}
      />
      {fileName && (
        <Text fontWeight="bold" color="teal.600">
          Selected File: {fileName}
        </Text>
      )}
      {mutation.isError && (
        <Text color="red.500">Upload failed. Please try again.</Text>
      )}
      {mutation.isSuccess && (
        <Text color="green.500">Upload successful!</Text>
      )}
    </VStack>
  );
}
