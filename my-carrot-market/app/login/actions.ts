'use server';

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(formData.get('email'), formData.get('password'));
  console.log(prevState);
  return {
    errors: ['user not found'],
  };
};
